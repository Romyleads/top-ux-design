import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, LogOut, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import { backendConfigured, supabase } from "@/lib/supabase";
import { usePortalAuth } from "@/hooks/usePortalAuth";
import { pt, type PortalKey } from "@/i18n/portal";
import { AuthForm, ProfileTab, OrdersTab, SubscriptionsTab, InvoicesTab, FilesTab, SupportTab, AiChatTab } from "@/components/portal/PortalTabs";

const TABS = ["tab_profile", "tab_orders", "tab_subs", "tab_invoices", "tab_files", "tab_support", "tab_ai"] as const;

export function PortalShell({ title, children }: { title: string; children: React.ReactNode }) {
  const { locale } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={`${title} | PromoVisions`} description={title} path="/account" />
      <div className="max-w-[1100px] mx-auto px-6 py-10">
        <Link to={`/${locale}`} className="inline-flex items-center gap-1.5 text-[13px] text-t3 hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />PromoVisions
        </Link>
        <h1 className="text-foreground mb-6">{title}</h1>
        {children}
      </div>
    </div>
  );
}

export function TabBar<T extends PortalKey>({ tabs, active, onChange }: { tabs: readonly T[]; active: NoInfer<T>; onChange: (t: NoInfer<T>) => void }) {
  const { locale } = useLanguage();
  return (
    <div className="flex flex-wrap gap-1 border-b border-border mb-6">
      {tabs.map((t) => (
        <button key={t} onClick={() => onChange(t)}
          className={`px-3 h-10 text-[14px] -mb-px border-b ${active === t ? "border-primary text-foreground font-semibold" : "border-transparent text-t3 hover:text-foreground"}`}>
          {pt(t, locale)}
        </button>
      ))}
    </div>
  );
}

export default function AccountPage() {
  const { locale } = useLanguage();
  const { user, isAdmin, loading } = usePortalAuth();
  const [tab, setTab] = useState<(typeof TABS)[number]>("tab_profile");

  if (!backendConfigured) return <PortalShell title={pt("account", locale)}><p className="text-[15px] text-t2">{pt("notConnected", locale)}</p></PortalShell>;
  if (loading) return <PortalShell title={pt("account", locale)}><div /></PortalShell>;
  if (!user) return <PortalShell title={pt("account", locale)}><AuthForm /></PortalShell>;

  return (
    <PortalShell title={pt("account", locale)}>
      <div className="flex items-center gap-4 mb-4 text-[13px] text-t3">
        <span>{user.email}</span>
        {isAdmin && <Link to={`/${locale}/admin`} className="inline-flex items-center gap-1 hover:text-foreground"><ShieldCheck className="w-4 h-4" />{pt("admin", locale)}</Link>}
        <button onClick={() => supabase!.auth.signOut()} className="inline-flex items-center gap-1 hover:text-foreground"><LogOut className="w-4 h-4" />{pt("signOut", locale)}</button>
      </div>
      <TabBar tabs={TABS} active={tab} onChange={setTab} />
      {tab === "tab_profile" && <ProfileTab user={user} />}
      {tab === "tab_orders" && <OrdersTab user={user} />}
      {tab === "tab_subs" && <SubscriptionsTab user={user} />}
      {tab === "tab_invoices" && <InvoicesTab user={user} />}
      {tab === "tab_files" && <FilesTab user={user} />}
      {tab === "tab_support" && <SupportTab user={user} />}
      {tab === "tab_ai" && <AiChatTab user={user} onHandover={() => setTab("tab_support")} />}
    </PortalShell>
  );
}
