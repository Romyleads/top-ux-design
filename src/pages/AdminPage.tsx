import { useState, type FormEvent } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { backendConfigured, supabase, formatCents, ORDER_STATUSES, SUBSCRIPTION_STATUSES, INVOICE_STATUSES } from "@/lib/supabase";
import { usePortalAuth } from "@/hooks/usePortalAuth";
import { pt, st } from "@/i18n/portal";
import { AuthForm, Badge, Table, TicketThread, useRows } from "@/components/portal/PortalTabs";
import { PortalShell, TabBar } from "./AccountPage";
import { toast } from "sonner";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Row = Record<string, any>;
const TABS = ["tab_clients", "tab_orders", "tab_subs", "tab_invoices", "tab_support"] as const;
const db = () => supabase!;
const fmtDate = (v?: string | null) => (v ? new Date(v).toLocaleDateString("de-DE") : "—");
const sel = "h-8 px-2 rounded-md bg-background border border-border text-[13px]";
const inp = "h-9 px-2 rounded-md bg-background border border-border text-[13px]";
const btn = "h-8 px-3 rounded-md bg-primary text-primary-foreground text-[13px] font-semibold";
const fail = (e: { message?: string } | null) => { if (e) toast.error(e.message); return Boolean(e); };

function useClients() {
  const [rows] = useRows("profiles");
  const name = (id: string) => { const p = rows.find((r) => r.id === id); return p ? (p.company || p.full_name || p.email) : id.slice(0, 8); };
  return { clients: rows, name };
}

function StatusSelect({ value, options, onChange }: { value: string; options: readonly string[]; onChange: (v: string) => void }) {
  const { locale } = useLanguage();
  return <select className={sel} value={value} onChange={(e) => onChange(e.target.value)}>{options.map((o) => <option key={o} value={o}>{st(o, locale)}</option>)}</select>;
}

const nextInvoiceNumber = (count: number) => `PV-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;

function Orders() {
  const { locale } = useLanguage();
  const { name } = useClients();
  const [rows, reload] = useRows("orders", "*, order_items(*)");
  const [invCount] = useRows("invoices", "id");
  const setStatus = async (id: string, status: string) => { if (!fail((await db().from("orders").update({ status }).eq("id", id)).error)) reload(); };
  const invoice = async (o: Row) => {
    const raw = prompt(pt("total", locale) + " (EUR)", o.total_cents != null ? String(o.total_cents / 100) : "");
    const amount = raw ? Math.round(Number(raw.replace(",", ".")) * 100) : NaN;
    if (!Number.isFinite(amount) || amount <= 0) return;
    const due = new Date(Date.now() + 14 * 864e5).toISOString().slice(0, 10);
    const { error } = await db().from("invoices").insert({ number: nextInvoiceNumber(invCount.length), user_id: o.user_id, order_id: o.id, amount_cents: amount, status: "issued", issued_at: new Date().toISOString().slice(0, 10), due_at: due });
    if (fail(error)) return;
    await setStatus(o.id, "invoiced");
  };
  return <Table head={[pt("number", locale), pt("client", locale), pt("tab_orders", locale), pt("total", locale), pt("status", locale), ""]}
    rows={rows.map((o) => [`#${o.number}`, name(o.user_id), (o.order_items ?? []).map((i: Row) => `${i.title} · ${i.tier_name}`).join(", "), formatCents(o.total_cents),
      <StatusSelect key="s" value={o.status} options={ORDER_STATUSES} onChange={(v) => setStatus(o.id, v)} />,
      o.status === "new" ? <button key="i" className={btn} onClick={() => invoice(o)}>{pt("createInvoice", locale)}</button> : null])} />;
}

function Subscriptions() {
  const { locale } = useLanguage();
  const { clients, name } = useClients();
  const [rows, reload] = useRows("subscriptions");
  const [f, setF] = useState({ user_id: "", plan_name: "", price: "", period: "monthly", next_payment_at: "" });
  const add = async (e: FormEvent) => {
    e.preventDefault();
    const price_cents = Math.round(Number(f.price.replace(",", ".")) * 100);
    if (!f.user_id || !f.plan_name || !Number.isFinite(price_cents)) return;
    if (!fail((await db().from("subscriptions").insert({ user_id: f.user_id, plan_name: f.plan_name, price_cents, period: f.period, next_payment_at: f.next_payment_at || null })).error)) reload();
  };
  const setStatus = async (id: string, status: string) => { if (!fail((await db().from("subscriptions").update({ status }).eq("id", id)).error)) reload(); };
  return (
    <div className="space-y-5">
      <form onSubmit={add} className="flex flex-wrap gap-2 items-center">
        <select className={inp} value={f.user_id} onChange={(e) => setF({ ...f, user_id: e.target.value })}><option value="">{pt("client", locale)}</option>{clients.map((c) => <option key={c.id} value={c.id}>{c.company || c.full_name || c.email}</option>)}</select>
        <input className={inp} placeholder={pt("plan", locale)} value={f.plan_name} onChange={(e) => setF({ ...f, plan_name: e.target.value })} />
        <input className={`${inp} w-24`} placeholder="EUR" value={f.price} onChange={(e) => setF({ ...f, price: e.target.value })} />
        <select className={inp} value={f.period} onChange={(e) => setF({ ...f, period: e.target.value })}>{["monthly", "quarterly", "yearly"].map((p) => <option key={p} value={p}>{st(p, locale)}</option>)}</select>
        <input className={inp} type="date" value={f.next_payment_at} onChange={(e) => setF({ ...f, next_payment_at: e.target.value })} />
        <button className={btn}>{pt("addSub", locale)}</button>
      </form>
      <Table head={[pt("client", locale), pt("plan", locale), pt("price", locale), pt("period", locale), pt("next_payment", locale), pt("status", locale)]}
        rows={rows.map((s) => [name(s.user_id), s.plan_name, formatCents(s.price_cents), st(s.period, locale), fmtDate(s.next_payment_at),
          <StatusSelect key="s" value={s.status} options={SUBSCRIPTION_STATUSES} onChange={(v) => setStatus(s.id, v)} />])} />
    </div>
  );
}

function Invoices({ adminId }: { adminId: string }) {
  const { locale } = useLanguage();
  const { name } = useClients();
  const [rows, reload] = useRows("invoices");
  const setStatus = async (id: string, status: string) => { if (!fail((await db().from("invoices").update({ status }).eq("id", id)).error)) reload(); };
  const markPaid = async (i: Row) => {
    const reference = prompt("Reference / Verwendungszweck", i.number) ?? i.number;
    if (fail((await db().from("payments").insert({ invoice_id: i.id, amount_cents: i.amount_cents, method: "bank_transfer", reference, recorded_by: adminId })).error)) return;
    if (fail((await db().from("invoices").update({ status: "paid", paid_at: new Date().toISOString() }).eq("id", i.id)).error)) return;
    if (i.order_id) await db().from("orders").update({ status: "paid" }).eq("id", i.order_id);
    reload();
  };
  return <Table head={[pt("number", locale), pt("client", locale), pt("total", locale), pt("due", locale), pt("status", locale), ""]}
    rows={rows.map((i) => [i.number, name(i.user_id), formatCents(i.amount_cents, i.currency), fmtDate(i.due_at),
      <StatusSelect key="s" value={i.status} options={INVOICE_STATUSES} onChange={(v) => setStatus(i.id, v)} />,
      i.status !== "paid" && i.status !== "cancelled" ? <button key="p" className={btn} onClick={() => markPaid(i)}>{pt("markPaid", locale)}</button> : null])} />;
}

function Clients() {
  const { locale } = useLanguage();
  const { clients } = useClients();
  return <Table head={[pt("email", locale), pt("full_name", locale), pt("company", locale), pt("vat_id", locale), pt("country", locale), pt("phone", locale)]}
    rows={clients.map((c) => [c.email, c.full_name ?? "—", c.company ?? "—", c.vat_id ?? "—", c.country ?? "—", c.phone ?? "—"])} />;
}

function Tickets({ user }: { user: any }) {
  const { locale } = useLanguage();
  const { name } = useClients();
  const [rows, reload] = useRows("tickets");
  const [open, setOpen] = useState<Row | null>(null);
  if (open) return <TicketThread ticket={open} user={user} staff onBack={() => { setOpen(null); reload(); }} />;
  return <Table head={[pt("number", locale), pt("client", locale), pt("subject", locale), pt("date", locale), pt("status", locale)]}
    rows={rows.map((t) => [`#${t.number}`, name(t.user_id), <button key="o" className="text-left hover:text-primary" onClick={() => setOpen(t)}>{t.subject}</button>, fmtDate(t.updated_at), <Badge key="s" s={t.status} />])} />;
}

export default function AdminPage() {
  const { locale } = useLanguage();
  const { user, isAdmin, loading } = usePortalAuth();
  const [tab, setTab] = useState<(typeof TABS)[number]>("tab_orders");
  const title = pt("admin", locale);
  if (!backendConfigured) return <PortalShell title={title}><p className="text-t2">{pt("notConnected", locale)}</p></PortalShell>;
  if (loading) return <PortalShell title={title}><div /></PortalShell>;
  if (!user) return <PortalShell title={title}><AuthForm /></PortalShell>;
  if (!isAdmin) return <PortalShell title={title}><p className="text-t2">{pt("noAccess", locale)}</p></PortalShell>;
  return (
    <PortalShell title={title}>
      <TabBar tabs={TABS} active={tab} onChange={setTab} />
      {tab === "tab_clients" && <Clients />}
      {tab === "tab_orders" && <Orders />}
      {tab === "tab_subs" && <Subscriptions />}
      {tab === "tab_invoices" && <Invoices adminId={user.id} />}
      {tab === "tab_support" && <Tickets user={user} />}
    </PortalShell>
  );
}
