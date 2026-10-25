-- PromoVisions client portal schema (self-hosted Supabase / PostgreSQL 15+)
-- Run once after the self-hosted stack is up:  psql "$DATABASE_URL" -f 0001_client_portal.sql

-- ── Enums ──────────────────────────────────────────────────────────────
create type public.app_role as enum ('admin', 'client');
create type public.order_status as enum ('new', 'invoiced', 'paid', 'completed', 'cancelled');
create type public.subscription_status as enum ('active', 'paused', 'cancelled');
create type public.billing_period as enum ('monthly', 'quarterly', 'yearly');
create type public.invoice_status as enum ('draft', 'issued', 'paid', 'overdue', 'cancelled');
create type public.payment_method as enum ('bank_transfer', 'stripe', 'other');
create type public.ticket_status as enum ('open', 'in_progress', 'waiting_client', 'closed');

-- ── Shared trigger ─────────────────────────────────────────────────────
create or replace function public.touch_updated_at() returns trigger
language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end $$;

-- ── Roles (separate table, never on profiles) ──────────────────────────
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "own roles readable" on public.user_roles for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "admins manage roles" on public.user_roles for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- ── Profiles (B2B invoice data; only email is required, via auth) ──────
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  company text,
  address_line text,
  postal_code text,
  city text,
  country text,
  vat_id text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "profile read" on public.profiles for select to authenticated
  using (id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "profile update" on public.profiles for update to authenticated
  using (id = auth.uid() or public.has_role(auth.uid(), 'admin'))
  with check (id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email);
  insert into public.user_roles (user_id, role) values (new.id, 'client');
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── Orders ─────────────────────────────────────────────────────────────
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  number bigint generated always as identity unique,
  user_id uuid not null references auth.users(id) on delete cascade,
  status public.order_status not null default 'new',
  total_cents integer,               -- null when any item is quote-only
  currency text not null default 'EUR',
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  service_id text not null,          -- catalog offer id
  tier_name text not null,
  title text not null,
  unit_price_cents integer,          -- null = quote-only
  quantity integer not null default 1 check (quantity > 0)
);
grant select, insert on public.orders, public.order_items to authenticated;
grant update, delete on public.orders, public.order_items to authenticated;
grant all on public.orders, public.order_items to service_role;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
create policy "orders read" on public.orders for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "orders create own new" on public.orders for insert to authenticated
  with check (user_id = auth.uid() and status = 'new');
create policy "orders admin write" on public.orders for update to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "orders admin delete" on public.orders for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));
create policy "items read" on public.order_items for select to authenticated using (
  exists (select 1 from public.orders o where o.id = order_id
          and (o.user_id = auth.uid() or public.has_role(auth.uid(), 'admin'))));
create policy "items add to own new order" on public.order_items for insert to authenticated with check (
  exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid() and o.status = 'new'));
create policy "items admin write" on public.order_items for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create trigger orders_touch before update on public.orders
  for each row execute function public.touch_updated_at();

-- ── Subscriptions (admin-managed) ──────────────────────────────────────
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  service_id text,
  plan_name text not null,
  price_cents integer not null check (price_cents >= 0),
  currency text not null default 'EUR',
  period public.billing_period not null default 'monthly',
  started_at date not null default current_date,
  next_payment_at date,
  status public.subscription_status not null default 'active',
  stripe_subscription_id text,       -- reserved for future Stripe
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.subscriptions to authenticated;
grant all on public.subscriptions to service_role;
alter table public.subscriptions enable row level security;
create policy "subs read" on public.subscriptions for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "subs admin write" on public.subscriptions for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create trigger subs_touch before update on public.subscriptions
  for each row execute function public.touch_updated_at();

-- ── Invoices & payments (manual bank transfer now, Stripe fields later) ─
create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  number text unique not null,       -- e.g. PV-2026-0001
  user_id uuid not null references auth.users(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  subscription_id uuid references public.subscriptions(id) on delete set null,
  amount_cents integer not null check (amount_cents >= 0),
  currency text not null default 'EUR',
  status public.invoice_status not null default 'draft',
  issued_at date,
  due_at date,
  paid_at timestamptz,
  pdf_path text,                     -- storage path in "client-files"
  stripe_invoice_id text,
  stripe_payment_intent_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (order_id is not null or subscription_id is not null)
);
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  amount_cents integer not null check (amount_cents > 0),
  currency text not null default 'EUR',
  method public.payment_method not null default 'bank_transfer',
  reference text,                    -- bank reference / Verwendungszweck
  received_at timestamptz not null default now(),
  stripe_charge_id text,
  recorded_by uuid references auth.users(id)
);
grant select, insert, update, delete on public.invoices, public.payments to authenticated;
grant all on public.invoices, public.payments to service_role;
alter table public.invoices enable row level security;
alter table public.payments enable row level security;
create policy "invoices read" on public.invoices for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "invoices admin write" on public.invoices for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "payments read" on public.payments for select to authenticated using (
  exists (select 1 from public.invoices i where i.id = invoice_id
          and (i.user_id = auth.uid() or public.has_role(auth.uid(), 'admin'))));
create policy "payments admin write" on public.payments for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create trigger invoices_touch before update on public.invoices
  for each row execute function public.touch_updated_at();

-- ── Support tickets ────────────────────────────────────────────────────
create table public.tickets (
  id uuid primary key default gen_random_uuid(),
  number bigint generated always as identity unique,
  user_id uuid not null references auth.users(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  subject text not null check (length(subject) between 1 and 200),
  status public.ticket_status not null default 'open',
  source text not null default 'portal',   -- 'portal' | 'ai_chat'
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table public.ticket_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.tickets(id) on delete cascade,
  author_id uuid not null references auth.users(id),
  is_staff boolean not null default false,
  body text not null check (length(body) between 1 and 10000),
  created_at timestamptz not null default now()
);
grant select, insert, update on public.tickets, public.ticket_messages to authenticated;
grant all on public.tickets, public.ticket_messages to service_role;
alter table public.tickets enable row level security;
alter table public.ticket_messages enable row level security;
create policy "tickets read" on public.tickets for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "tickets create own" on public.tickets for insert to authenticated
  with check (user_id = auth.uid() and status = 'open');
create policy "tickets admin update" on public.tickets for update to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "messages read" on public.ticket_messages for select to authenticated using (
  exists (select 1 from public.tickets t where t.id = ticket_id
          and (t.user_id = auth.uid() or public.has_role(auth.uid(), 'admin'))));
create policy "messages write" on public.ticket_messages for insert to authenticated with check (
  author_id = auth.uid()
  and ((is_staff = false and exists (select 1 from public.tickets t where t.id = ticket_id and t.user_id = auth.uid() and t.status <> 'closed'))
    or (is_staff = true and public.has_role(auth.uid(), 'admin'))));
create trigger tickets_touch before update on public.tickets
  for each row execute function public.touch_updated_at();

-- Client reply moves a "waiting for client" ticket back to "open"
create or replace function public.ticket_on_client_reply() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if not new.is_staff then
    update public.tickets set status = 'open' where id = new.ticket_id and status = 'waiting_client';
  end if;
  return new;
end $$;
create trigger ticket_messages_client_reply after insert on public.ticket_messages
  for each row execute function public.ticket_on_client_reply();

-- ── Files (metadata; binaries in storage bucket "client-files") ─────────
create table public.files (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  ticket_id uuid references public.tickets(id) on delete set null,
  ticket_message_id uuid references public.ticket_messages(id) on delete set null,
  storage_path text not null unique,  -- "<user_id>/<uuid>-<filename>"
  file_name text not null,
  mime_type text,
  size_bytes bigint,
  uploaded_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);
grant select, insert, delete on public.files to authenticated;
grant all on public.files to service_role;
alter table public.files enable row level security;
create policy "files read" on public.files for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "files add" on public.files for insert to authenticated
  with check (uploaded_by = auth.uid() and (user_id = auth.uid() or public.has_role(auth.uid(), 'admin')));
create policy "files delete" on public.files for delete to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

-- Private storage bucket; first path segment must be the owner's user id
insert into storage.buckets (id, name, public, file_size_limit)
values ('client-files', 'client-files', false, 52428800)
on conflict (id) do nothing;
create policy "client files read" on storage.objects for select to authenticated using (
  bucket_id = 'client-files' and ((storage.foldername(name))[1] = auth.uid()::text or public.has_role(auth.uid(), 'admin')));
create policy "client files upload" on storage.objects for insert to authenticated with check (
  bucket_id = 'client-files' and ((storage.foldername(name))[1] = auth.uid()::text or public.has_role(auth.uid(), 'admin')));
create policy "client files delete" on storage.objects for delete to authenticated using (
  bucket_id = 'client-files' and ((storage.foldername(name))[1] = auth.uid()::text or public.has_role(auth.uid(), 'admin')));

-- Promote yourself to admin after first sign-up:
--   insert into public.user_roles (user_id, role)
--   select id, 'admin' from auth.users where email = 'YOUR@EMAIL' on conflict do nothing;
