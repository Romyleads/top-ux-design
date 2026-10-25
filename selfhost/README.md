# PromoVisions — self-hosted backend

Everything the client portal needs runs on your own server: PostgreSQL, login,
file storage and the AI-chat function (open-source Supabase stack in Docker).
No external database provider is required.

## 1. Start the stack (once)

```bash
git clone --depth 1 https://github.com/supabase/supabase
cp -r supabase/docker ./promovisions-backend && cd promovisions-backend
cp .env.example .env
# Edit .env: POSTGRES_PASSWORD, JWT_SECRET, ANON_KEY, SERVICE_ROLE_KEY,
# SITE_URL=https://your-domain, API_EXTERNAL_URL=https://api.your-domain,
# SMTP_* (for login e-mails), DASHBOARD_PASSWORD
docker compose pull && docker compose up -d
```

Put it behind HTTPS (Caddy / nginx) — e.g. `api.your-domain` → port 8000.

## 2. Create the tables

```bash
docker compose exec -T db psql -U postgres -d postgres < ../selfhost/migrations/0001_client_portal.sql
```

## 3. AI chat function

```bash
mkdir -p volumes/functions/ai-chat
cp ../selfhost/functions/ai-chat/index.ts volumes/functions/ai-chat/index.ts
# add to .env (passed to the "functions" service):
#   AI_API_URL=...  AI_API_KEY=...  AI_MODEL=...
docker compose up -d functions
```

## 4. Connect the website

Create `.env` in the website project (build-time, safe to be public):

```
VITE_SUPABASE_URL=https://api.your-domain
VITE_SUPABASE_ANON_KEY=<ANON_KEY from step 1>
```

Then `npm run build` and serve `dist/` (any static host or the same server).

## 5. Make yourself admin

Sign up on `/en/account`, then:

```sql
insert into public.user_roles (user_id, role)
select id, 'admin' from auth.users where email = 'you@example.com'
on conflict do nothing;
```

Admin panel: `/en/admin`.

## Payments workflow (now)

1. Client places a request → order `new`.
2. Admin creates an invoice (bank transfer) → order `invoiced`, invoice `issued`.
3. Money arrives → admin records payment → invoice `paid`, order `paid`.
4. Work delivered → order `completed`.

Stripe columns (`stripe_*`) are already in the tables for a later integration.

## Backups

```bash
docker compose exec -T db pg_dump -U postgres postgres | gzip > backup-$(date +%F).sql.gz
```
