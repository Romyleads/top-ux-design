import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import { Paperclip, Download, Send, LifeBuoy, ArrowLeft } from "lucide-react";
import { supabase, formatCents } from "@/lib/supabase";
import { pt, st } from "@/i18n/portal";
import { useLanguage } from "@/i18n/LanguageContext";
import { services } from "@/data/services";
import { toast } from "sonner";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Row = Record<string, any>;
const db = () => supabase!;
const fmtDate = (v?: string | null) => (v ? new Date(v).toLocaleDateString("de-DE") : "—");
const inputCls = "w-full h-10 px-3 rounded-lg bg-background border border-border text-[14px] text-foreground focus:outline-none focus:ring-1 focus:ring-primary";
const btnCls = "inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-primary text-primary-foreground text-[14px] font-semibold disabled:opacity-50";

export function Badge({ s }: { s: string }) {
  const { locale } = useLanguage();
  return <span className="inline-block px-2 py-0.5 rounded-md bg-muted text-[12px] text-t2 whitespace-nowrap">{st(s, locale)}</span>;
}

export function Empty() {
  const { locale } = useLanguage();
  return <p className="text-[14px] text-t3 py-6">{pt("empty", locale)}</p>;
}

export function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  if (!rows.length) return <Empty />;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[14px]">
        <thead><tr className="text-left text-t3 text-[12px] uppercase tracking-wide">{head.map((h) => <th key={h} className="py-2 pr-4 font-medium">{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i} className="border-t border-border align-top">{r.map((c, j) => <td key={j} className="py-2.5 pr-4 text-foreground">{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

const reportError = (locale: "en" | "de" | "uk", e: { message?: string } | null) => {
  if (e) toast.error(`${pt("error", locale)}: ${e.message ?? ""}`);
  return Boolean(e);
};

/* ── Auth ───────────────────────────────────────────── */
export function AuthForm() {
  const { locale } = useLanguage();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = mode === "in"
      ? await db().auth.signInWithPassword({ email, password })
      : await db().auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/${locale}/account` } });
    setBusy(false);
    if (reportError(locale, res.error)) return;
    if (mode === "up" && !res.data.session) setSent(true);
  };

  if (sent) return <p className="text-[15px] text-t2">{pt("checkEmail", locale)}</p>;
  return (
    <form onSubmit={submit} className="max-w-sm space-y-3">
      <input className={inputCls} type="email" required placeholder={pt("email", locale)} value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className={inputCls} type="password" required minLength={8} placeholder={pt("password", locale)} value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className={btnCls} disabled={busy}>{pt(mode === "in" ? "signIn" : "signUp", locale)}</button>
      <button type="button" className="block text-[13px] text-t3 hover:text-foreground" onClick={() => setMode(mode === "in" ? "up" : "in")}>
        {pt(mode === "in" ? "noAccount" : "haveAccount", locale)}
      </button>
    </form>
  );
}

/* ── Profile ────────────────────────────────────────── */
const PROFILE_FIELDS = ["full_name", "company", "address_line", "postal_code", "city", "country", "vat_id", "phone"] as const;
export function ProfileTab({ user }: { user: User }) {
  const { locale } = useLanguage();
  const [p, setP] = useState<Row>({});
  useEffect(() => { db().from("profiles").select("*").eq("id", user.id).maybeSingle().then(({ data }) => setP(data ?? {})); }, [user.id]);
  const save = async (e: FormEvent) => {
    e.preventDefault();
    const patch = Object.fromEntries(PROFILE_FIELDS.map((f) => [f, (p[f] ?? "").trim() || null]));
    const { error } = await db().from("profiles").update(patch).eq("id", user.id);
    if (!reportError(locale, error)) toast.success(pt("saved", locale));
  };
  return (
    <form onSubmit={save} className="grid sm:grid-cols-2 gap-3 max-w-2xl">
      <label className="sm:col-span-2 text-[13px] text-t3">{pt("email", locale)}: <span className="text-foreground">{user.email}</span></label>
      {PROFILE_FIELDS.map((f) => (
        <input key={f} className={inputCls} maxLength={200} placeholder={pt(f, locale)} value={p[f] ?? ""} onChange={(e) => setP({ ...p, [f]: e.target.value })} />
      ))}
      <div className="sm:col-span-2"><button className={btnCls}>{pt("save", locale)}</button></div>
    </form>
  );
}

/* ── Orders / Subscriptions / Invoices (client read-only) ─ */
function useRows(table: string, select = "*", userId?: string) {
  const [rows, setRows] = useState<Row[]>([]);
  const load = useCallback(() => {
    let q = db().from(table).select(select).order("created_at", { ascending: false });
    if (userId) q = q.eq("user_id", userId);
    q.then(({ data }) => setRows((data as Row[]) ?? []));
  }, [table, select, userId]);
  useEffect(load, [load]);
  return [rows, load] as const;
}
export { useRows };

export function OrdersTab({ user }: { user: User }) {
  const { locale } = useLanguage();
  const [rows] = useRows("orders", "*, order_items(*)", user.id);
  return <Table head={[pt("number", locale), pt("date", locale), pt("tab_orders", locale), pt("total", locale), pt("status", locale)]}
    rows={rows.map((o) => [`#${o.number}`, fmtDate(o.created_at),
      <ul key="i">{o.order_items?.map((i: Row) => <li key={i.id}>{i.title} · {i.tier_name} · {formatCents(i.unit_price_cents)}</li>)}</ul>,
      formatCents(o.total_cents, o.currency), <Badge key="s" s={o.status} />])} />;
}

export function SubscriptionsTab({ user }: { user: User }) {
  const { locale } = useLanguage();
  const [rows] = useRows("subscriptions", "*", user.id);
  return <Table head={[pt("plan", locale), pt("price", locale), pt("period", locale), pt("date", locale), pt("next_payment", locale), pt("status", locale)]}
    rows={rows.map((s) => [s.plan_name, formatCents(s.price_cents, s.currency), st(s.period, locale), fmtDate(s.started_at), fmtDate(s.next_payment_at), <Badge key="s" s={s.status} />])} />;
}

async function downloadFile(path: string) {
  const { data } = await db().storage.from("client-files").createSignedUrl(path, 120);
  if (data?.signedUrl) window.open(data.signedUrl, "_blank", "noopener");
}

export function InvoicesTab({ user }: { user: User }) {
  const { locale } = useLanguage();
  const [rows] = useRows("invoices", "*", user.id);
  return (
    <div className="space-y-3">
      <p className="text-[13px] text-t3">{pt("bankNote", locale)}</p>
      <Table head={[pt("number", locale), pt("date", locale), pt("due", locale), pt("total", locale), pt("status", locale), ""]}
        rows={rows.map((i) => [i.number, fmtDate(i.issued_at), fmtDate(i.due_at), formatCents(i.amount_cents, i.currency), <Badge key="s" s={i.status} />,
          i.pdf_path ? <button key="d" onClick={() => downloadFile(i.pdf_path)} className="text-primary inline-flex items-center gap-1"><Download className="w-4 h-4" />PDF</button> : null])} />
    </div>
  );
}

/* ── Files ──────────────────────────────────────────── */
export async function uploadFile(file: File, ownerId: string, uploaderId: string, link: { order_id?: string; ticket_id?: string; ticket_message_id?: string } = {}) {
  const path = `${ownerId}/${crypto.randomUUID()}-${file.name.replace(/[^\w.-]+/g, "_")}`;
  const up = await db().storage.from("client-files").upload(path, file);
  if (up.error) return up.error;
  const { error } = await db().from("files").insert({ user_id: ownerId, uploaded_by: uploaderId, storage_path: path, file_name: file.name, mime_type: file.type, size_bytes: file.size, ...link });
  return error;
}

export function FilesTab({ user }: { user: User }) {
  const { locale } = useLanguage();
  const [rows, reload] = useRows("files", "*", user.id);
  const onPick = async (f?: File) => {
    if (!f) return;
    if (!reportError(locale, await uploadFile(f, user.id, user.id))) reload();
  };
  return (
    <div className="space-y-4">
      <label className={`${btnCls} cursor-pointer w-fit`}><Paperclip className="w-4 h-4" />{pt("upload", locale)}
        <input type="file" className="hidden" onChange={(e) => onPick(e.target.files?.[0])} /></label>
      <Table head={[pt("tab_files", locale), pt("date", locale), ""]}
        rows={rows.map((f) => [f.file_name, fmtDate(f.created_at), <button key="d" onClick={() => downloadFile(f.storage_path)} className="text-primary"><Download className="w-4 h-4" /></button>])} />
    </div>
  );
}

/* ── Support tickets (shared by client and admin) ─── */
export function TicketThread({ ticket, user, staff, onBack }: { ticket: Row; user: User; staff: boolean; onBack: () => void }) {
  const { locale } = useLanguage();
  const [msgs, setMsgs] = useState<Row[]>([]);
  const [files, setFiles] = useState<Row[]>([]);
  const [body, setBody] = useState("");
  const [attach, setAttach] = useState<File | null>(null);
  const [status, setStatus] = useState<string>(ticket.status);
  const load = useCallback(() => {
    db().from("ticket_messages").select("*").eq("ticket_id", ticket.id).order("created_at").then(({ data }) => setMsgs(data ?? []));
    db().from("files").select("*").eq("ticket_id", ticket.id).then(({ data }) => setFiles(data ?? []));
  }, [ticket.id]);
  useEffect(load, [load]);

  const send = async (e: FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    const { data, error } = await db().from("ticket_messages").insert({ ticket_id: ticket.id, author_id: user.id, is_staff: staff, body: body.trim() }).select().single();
    if (reportError(locale, error)) return;
    if (attach) reportError(locale, await uploadFile(attach, ticket.user_id, user.id, { ticket_id: ticket.id, ticket_message_id: data.id }));
    setBody(""); setAttach(null); load();
  };
  const changeStatus = async (s: string) => {
    const { error } = await db().from("tickets").update({ status: s }).eq("id", ticket.id);
    if (!reportError(locale, error)) setStatus(s);
  };

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="inline-flex items-center gap-1 text-[13px] text-t3 hover:text-foreground"><ArrowLeft className="w-4 h-4" />{pt("back", locale)}</button>
      <div className="flex items-center gap-3 flex-wrap">
        <h3 className="text-[17px] font-semibold text-foreground">#{ticket.number} · {ticket.subject}</h3>
        {staff ? (
          <select value={status} onChange={(e) => changeStatus(e.target.value)} className="h-8 px-2 rounded-md bg-background border border-border text-[13px]">
            {["open", "in_progress", "waiting_client", "closed"].map((s) => <option key={s} value={s}>{st(s, locale)}</option>)}
          </select>
        ) : <Badge s={status} />}
      </div>
      <div className="space-y-3">
        {msgs.map((m) => (
          <div key={m.id} className={`p-3 rounded-lg ${m.is_staff ? "bg-primary/10" : "bg-muted/50"}`}>
            <div className="text-[12px] text-t3 mb-1">{m.is_staff ? pt("staff", locale) : staff ? pt("client", locale) : pt("you", locale)} · {new Date(m.created_at).toLocaleString("de-DE")}</div>
            <p className="text-[14px] text-foreground whitespace-pre-wrap">{m.body}</p>
            {files.filter((f) => f.ticket_message_id === m.id).map((f) => (
              <button key={f.id} onClick={() => downloadFile(f.storage_path)} className="mt-2 inline-flex items-center gap-1 text-[13px] text-primary"><Paperclip className="w-3.5 h-3.5" />{f.file_name}</button>
            ))}
          </div>
        ))}
      </div>
      {(status !== "closed" || staff) && (
        <form onSubmit={send} className="space-y-2">
          <textarea className={`${inputCls} h-28 py-2`} maxLength={10000} placeholder={pt("message", locale)} value={body} onChange={(e) => setBody(e.target.value)} />
          <div className="flex items-center gap-3">
            <button className={btnCls}><Send className="w-4 h-4" />{pt(staff ? "reply" : "send", locale)}</button>
            <label className="inline-flex items-center gap-1 text-[13px] text-t3 cursor-pointer"><Paperclip className="w-4 h-4" />{attach?.name ?? pt("attach", locale)}
              <input type="file" className="hidden" onChange={(e) => setAttach(e.target.files?.[0] ?? null)} /></label>
          </div>
        </form>
      )}
    </div>
  );
}

export function SupportTab({ user }: { user: User }) {
  const { locale } = useLanguage();
  const [rows, reload] = useRows("tickets", "*", user.id);
  const [open, setOpen] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const create = async (e: FormEvent) => {
    e.preventDefault();
    const { data, error } = await db().from("tickets").insert({ user_id: user.id, subject: subject.trim() }).select().single();
    if (reportError(locale, error)) return;
    const m = await db().from("ticket_messages").insert({ ticket_id: data.id, author_id: user.id, body: body.trim() });
    if (reportError(locale, m.error)) return;
    setCreating(false); setSubject(""); setBody(""); reload(); setOpen(data);
  };

  if (open) return <TicketThread ticket={open} user={user} staff={false} onBack={() => { setOpen(null); reload(); }} />;
  if (creating) return (
    <form onSubmit={create} className="space-y-3 max-w-2xl">
      <input className={inputCls} required maxLength={200} placeholder={pt("subject", locale)} value={subject} onChange={(e) => setSubject(e.target.value)} />
      <textarea className={`${inputCls} h-32 py-2`} required maxLength={10000} placeholder={pt("message", locale)} value={body} onChange={(e) => setBody(e.target.value)} />
      <div className="flex gap-3"><button className={btnCls}>{pt("send", locale)}</button>
        <button type="button" onClick={() => setCreating(false)} className="text-[14px] text-t3">{pt("back", locale)}</button></div>
    </form>
  );
  return (
    <div className="space-y-4">
      <button onClick={() => setCreating(true)} className={btnCls}><LifeBuoy className="w-4 h-4" />{pt("newTicket", locale)}</button>
      <Table head={[pt("number", locale), pt("subject", locale), pt("date", locale), pt("status", locale)]}
        rows={rows.map((t) => [`#${t.number}`, <button key="o" className="text-left hover:text-primary" onClick={() => setOpen(t)}>{t.subject}</button>, fmtDate(t.created_at), <Badge key="s" s={t.status} />])} />
    </div>
  );
}

/* ── AI chat (one conversation, kept only for this visit) ─ */
const catalogSummary = () => services.map((s) => `${s.name}: ${s.tiers.map((t) => `${t.name} ${t.price}`).join(", ")}`).join("\n");

export function AiChatTab({ user, onHandover }: { user: User; onHandover: () => void }) {
  const { locale } = useLanguage();
  const [msgs, setMsgs] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => inputRef.current?.focus(), [busy]);

  const send = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim() || busy) return;
    const next = [...msgs, { role: "user" as const, content: text.trim() }];
    setMsgs(next); setText(""); setBusy(true);
    const { data, error } = await db().functions.invoke("ai-chat", { body: { messages: next, catalog: catalogSummary() } });
    setBusy(false);
    if (error || data?.error) { toast.error(data?.error ?? error?.message ?? pt("error", locale)); return; }
    setMsgs([...next, { role: "assistant", content: data.reply }]);
  };

  const handover = async () => {
    const { data, error } = await db().from("tickets").insert({ user_id: user.id, subject: pt("aiChatSubject", locale), source: "ai_chat" }).select().single();
    if (reportError(locale, error)) return;
    const transcript = msgs.map((m) => `${m.role === "user" ? "Client" : "AI"}: ${m.content}`).join("\n\n") || "—";
    const m = await db().from("ticket_messages").insert({ ticket_id: data.id, author_id: user.id, body: transcript.slice(0, 10000) });
    if (reportError(locale, m.error)) return;
    toast.success(pt("aiHandedOver", locale));
    onHandover();
  };

  return (
    <div className="max-w-2xl space-y-4">
      <div className="space-y-3 min-h-[160px]">
        {!msgs.length && <p className="text-[14px] text-t3">{pt("aiHello", locale)}</p>}
        {msgs.map((m, i) => (
          <div key={i} className={m.role === "user" ? "ml-auto max-w-[85%] w-fit px-3 py-2 rounded-lg bg-primary text-primary-foreground text-[14px]" : "text-[14px] text-foreground whitespace-pre-wrap"}>{m.content}</div>
        ))}
        {busy && <div className="text-[14px] text-t3">…</div>}
      </div>
      <form onSubmit={send} className="flex gap-2">
        <textarea ref={inputRef} rows={2} className={`${inputCls} h-auto py-2`} value={text} onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) send(e); }} />
        <button className={btnCls} disabled={busy}><Send className="w-4 h-4" /></button>
      </form>
      <button onClick={handover} className="inline-flex items-center gap-2 text-[13px] text-t3 hover:text-foreground"><LifeBuoy className="w-4 h-4" />{pt("aiHandover", locale)}</button>
    </div>
  );
}
