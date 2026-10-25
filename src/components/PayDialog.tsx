import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, AlertCircle, CreditCard, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/i18n/LanguageContext";
import { buildCartCabinetUrl } from "@/config/payment";
import type { CartItem } from "@/hooks/useCart";
import { parseCatalogPrice } from "@/lib/catalogPricing";
import { Button } from "@/components/ui/button";

type L = "en" | "de" | "uk";
const txt = {
  pay: { en: "Pay", de: "Bezahlen", uk: "Оплатити" },
  title: { en: "Checkout", de: "Zur Zahlung", uk: "Оплата замовлення" },
  desc: { en: "You will be redirected to your secure client account to complete the payment.", de: "Sie werden zur sicheren Zahlung in Ihr Kundenkonto weitergeleitet.", uk: "Вас буде переспрямовано до захищеного кабінету клієнта для оплати." },
  plan: { en: "Plan", de: "Tarif", uk: "Тариф" },
  total: { en: "Total", de: "Gesamt", uk: "Разом" },
  vat: { en: "No VAT charged (§19 UStG, small business)", de: "Kein Ausweis der USt. (§19 UStG, Kleinunternehmer)", uk: "Без ПДВ (§19 UStG, Kleinunternehmer)" },
  go: { en: "Continue to payment", de: "Weiter zur Zahlung", uk: "Перейти до оплати" },
  loading: { en: "Redirecting…", de: "Weiterleitung…", uk: "Переспрямування…" },
  cancel: { en: "Cancel", de: "Abbrechen", uk: "Скасувати" },
  errTitle: { en: "Payment unavailable", de: "Zahlung nicht verfügbar", uk: "Оплата недоступна" },
  errBody: { en: "The payment page could not be opened. Please try again later or contact us.", de: "Die Zahlungsseite konnte nicht geöffnet werden. Bitte später erneut versuchen oder uns kontaktieren.", uk: "Не вдалося відкрити сторінку оплати. Спробуйте пізніше або зв'яжіться з нами." },
  retry: { en: "Try again", de: "Erneut versuchen", uk: "Спробувати знову" },
  okTitle: { en: "Payment received", de: "Zahlung erhalten", uk: "Оплату отримано" },
  okBody: { en: "Thank you! We will confirm your order by email.", de: "Vielen Dank! Wir bestätigen Ihre Bestellung per E-Mail.", uk: "Дякуємо! Ми підтвердимо замовлення електронною поштою." },
  cancelTitle: { en: "Payment cancelled", de: "Zahlung abgebrochen", uk: "Оплату скасовано" },
  cancelBody: { en: "No money was charged. You can pay again at any time.", de: "Es wurde nichts abgebucht. Sie können jederzeit erneut bezahlen.", uk: "Кошти не списано. Ви можете оплатити будь-коли." },
  close: { en: "Close", de: "Schließen", uk: "Закрити" },
};
const tr = (k: keyof typeof txt, l: string) => txt[k][(l as L)] ?? txt[k].en;

const primaryBtn = "w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 px-5 text-[13px] font-bold text-primary-foreground bg-primary transition-opacity duration-300 hover:opacity-90 disabled:opacity-70";
const ghostBtn = "w-full rounded-xl py-2.5 text-[13px] font-semibold text-muted-foreground hover:text-foreground transition-colors duration-300";

export function CartPaymentStep({ items, total, onBack }: {
  items: CartItem[]; total: string; onBack: () => void;
}) {
  const { locale, t } = useLanguage();
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");

  const go = () => {
    setState("loading");
    const url = buildCartCabinetUrl(items);
    if (!url) { setState("error"); return; }
    window.setTimeout(() => {
      try { window.location.assign(url); } catch { setState("error"); }
    }, 350);
  };

  return (
    <div className="px-5 py-5 space-y-5">
        {state === "error" ? (
          <div role="alert" className="space-y-3">
            <AlertCircle className="w-7 h-7 text-destructive" strokeWidth={1.5} />
            <h2 className="text-lg font-bold">{tr("errTitle", locale)}</h2>
            <p className="text-sm text-muted-foreground">{tr("errBody", locale)}</p>
            <Button className={primaryBtn} onClick={go}>{tr("retry", locale)}</Button>
            <Button variant="ghost" className={ghostBtn} onClick={onBack}>{t("cart.edit")}</Button>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <h2 className="text-lg font-bold flex items-center gap-2"><CreditCard className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />{tr("title", locale)}</h2>
              <p className="text-sm text-muted-foreground">{tr("desc", locale)}</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-4 space-y-2 text-[13.5px]">
              {items.map((item) => (
                <div key={`${item.id}__${item.tierName}`} className="flex justify-between gap-4">
                  <span className="font-semibold min-w-0 break-words">{t(`service.${item.id}.name`)} · {item.tierName} × {item.qty}</span>
                  <span className="shrink-0">{item.price}</span>
                </div>
              ))}
              <div className="h-px bg-border" />
              <div className="flex justify-between gap-4"><span className="text-muted-foreground">{tr("total", locale)}</span><span className="font-bold text-[15px]">{total}</span></div>
              <p className="text-[11.5px] text-muted-foreground">{tr("vat", locale)}</p>
            </div>
            <Button className={primaryBtn} onClick={go} disabled={state === "loading" || !items.length || items.some((item) => parseCatalogPrice(item.price) === null)}>
              {state === "loading" ? <><Loader2 className="w-4 h-4 animate-spin" />{tr("loading", locale)}</> : <><ShieldCheck className="w-4 h-4" strokeWidth={1.5} />{tr("pay", locale)} — {total}</>}
            </Button>
            <Button variant="ghost" className={ghostBtn} onClick={onBack} disabled={state === "loading"}>{t("cart.edit")}</Button>
          </>
        )}
    </div>
  );
}

function StatusView({ icon, title, body, children }: { icon: React.ReactNode; title: string; body: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center text-center gap-3 pt-2">
      <div className="w-14 h-14 rounded-full bg-muted/60 flex items-center justify-center">{icon}</div>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>{body}</DialogDescription>
      <div className="w-full space-y-1 mt-2">{children}</div>
    </div>
  );
}

/** Shows the result when the cabinet sends the client back with ?payment=success|cancelled. */
export function PaymentReturnDialog() {
  const { locale } = useLanguage();
  const [status, setStatus] = useState<"success" | "cancelled" | null>(null);
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("payment");
    if (p === "success" || p === "cancelled") setStatus(p);
  }, []);
  const close = () => {
    setStatus(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("payment");
    window.history.replaceState(null, "", url.toString());
  };
  const ok = status === "success";
  return (
    <Dialog open={status !== null} onOpenChange={(o) => !o && close()}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <StatusView
          icon={ok ? <CheckCircle2 className="w-7 h-7 text-primary" strokeWidth={1.5} /> : <AlertCircle className="w-7 h-7 text-muted-foreground" strokeWidth={1.5} />}
          title={tr(ok ? "okTitle" : "cancelTitle", locale)}
          body={tr(ok ? "okBody" : "cancelBody", locale)}
        >
          <button className={primaryBtn} onClick={close}>{tr("close", locale)}</button>
        </StatusView>
      </DialogContent>
    </Dialog>
  );
}
