import { 
  ShoppingCart, X, ArrowRight, Minus, Plus, Trash2, 
  ShoppingBag, AlertTriangle, CheckCircle2, User, MessageCircle, 
  Mail, MessageSquare, Shield, Sparkles, Package
} from "lucide-react";
import type { CartItem } from "@/hooks/useCart";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  hasPrice: boolean;
  formatEur: (n: number) => string;
  step: 1 | 2;
  setStep: (s: 1 | 2) => void;
  onClose: () => void;
  onChangeQty: (id: string, tierName: string, delta: number) => void;
  onRemove: (id: string, tierName: string) => void;
  onClear: () => void;
}

export default function CartDrawer({
  isOpen, items, totalItems, totalPrice, hasPrice, formatEur, step, setStep,
  onClose, onChangeQty, onRemove, onClear,
}: CartDrawerProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [dsgvo, setDsgvo] = useState(false);
  const { t } = useLanguage();

  const isEmpty = items.length === 0;

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const handleSubmit = () => {
    if (!name.trim()) { alert(t("alert.name")); return; }
    if (!email.trim() || !emailRe.test(email.trim())) { alert(t("alert.email")); return; }
    if (!dsgvo) { alert(t("alert.dsgvo")); return; }
    if (isEmpty) { alert(t("alert.empty")); return; }
    setSubmitted(true);
  };

  const getDisplayName = (item: CartItem) => {
    const translated = t(`service.${item.id}.name`);
    return `${translated} (${item.tierName})`;
  };

  const inputClass = "w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-[13px] text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/10";

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-foreground/40 backdrop-blur-[2px] z-[799] transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[3000] bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-5" onClick={() => setShowConfirm(false)}>
          <div className="bg-card rounded-2xl p-6 max-w-[320px] w-full text-center shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <div className="text-[15px] font-bold text-foreground mb-1.5">{t("confirm.title")}</div>
            <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">{t("confirm.msg")}</p>
            <div className="flex gap-2.5">
              <button onClick={() => setShowConfirm(false)} className="flex-1 bg-secondary text-foreground text-[13px] font-medium py-2.5 rounded-xl hover:bg-accent transition-colors">
                {t("confirm.no")}
              </button>
              <button onClick={() => { onClear(); setShowConfirm(false); }} className="flex-1 bg-destructive text-destructive-foreground text-[13px] font-bold py-2.5 rounded-xl hover:bg-destructive/90 transition-colors">
                {t("confirm.yes")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 bottom-0 w-[420px] max-w-[100vw] bg-card z-[2001] transition-transform duration-300 ease-out flex flex-col overflow-hidden shadow-2xl ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between flex-shrink-0 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-green/30 shadow-md">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-foreground text-background text-[9px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 border-2 border-card shadow-sm">
                  {totalItems}
                </span>
              )}
            </div>
            <div>
              <span className="text-sm font-bold text-foreground block leading-tight">{t("cart.step")} {step} / 2</span>
              <span className="text-[10px] text-muted-foreground">{step === 1 ? t("cart.selected") : t("cart.contact")}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground w-8 h-8 rounded-xl flex items-center justify-center hover:bg-secondary hover:text-foreground transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 1 ? (
          <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Price summary */}
            {!isEmpty && (
              <div className="mx-5 mt-4 p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/[.02] flex-shrink-0">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">{t("cart.estCost")}</span>
                </div>
                <div className="text-[28px] font-extrabold tracking-tight leading-none">
                  {hasPrice ? <span className="text-primary">{formatEur(totalPrice)}</span> : <span className="text-[14px] text-muted-foreground">{t("cart.priceTbd")}</span>}
                </div>
                <div className="text-[11px] text-muted-foreground mt-1.5">{t("cart.priceNote")}</div>
              </div>
            )}

            {isEmpty ? (
              <div className="text-center py-16 px-6 flex-1 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-muted-foreground/50" />
                </div>
                <p className="text-muted-foreground text-[13px] leading-relaxed">
                  {t("cart.empty")}<br />{t("cart.emptyHint")}<br />
                  <strong className="text-foreground">{t("cart.addBtn")}</strong>
                </p>
              </div>
            ) : (
              <div className="px-5 py-4 flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{t("cart.selected")}</span>
                  <button onClick={() => setShowConfirm(true)} className="text-destructive/50 hover:text-destructive text-[11px] font-medium transition-colors flex items-center gap-1">
                    <Trash2 className="w-3 h-3" />
                    {t("cart.clearAll")}
                  </button>
                </div>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={`${item.id}__${item.tierName}`} className="group bg-background rounded-xl p-3 flex items-center gap-3 hover:shadow-md transition-all duration-200">
                      <div className="w-9 h-9 rounded-lg bg-primary/[.06] flex items-center justify-center flex-shrink-0">
                        <Package className="w-4.5 h-4.5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12.5px] font-semibold text-foreground truncate">{getDisplayName(item)}</div>
                        <div className="text-[11px] text-muted-foreground">{item.price}</div>
                      </div>
                      <div className="flex items-center bg-card rounded-lg overflow-hidden flex-shrink-0 shadow-sm border border-border/50">
                        <button onClick={() => onChangeQty(item.id, item.tierName, -1)} className="text-muted-foreground w-7 h-7 flex items-center justify-center hover:bg-secondary hover:text-foreground transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-foreground min-w-[24px] text-center">{item.qty}</span>
                        <button onClick={() => onChangeQty(item.id, item.tierName, 1)} className="text-muted-foreground w-7 h-7 flex items-center justify-center hover:bg-secondary hover:text-foreground transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button onClick={() => onRemove(item.id, item.tierName)} className="text-muted-foreground/30 p-1.5 rounded-lg flex-shrink-0 opacity-0 group-hover:opacity-100 hover:text-destructive hover:bg-destructive/10 transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            {!isEmpty && (
              <div className="px-5 py-4 pb-6 flex-shrink-0">
                <button onClick={() => setStep(2)} className="w-full flex items-center justify-center gap-2 gradient-primary text-primary-foreground text-[14px] font-bold py-3.5 rounded-xl shadow-green hover:shadow-green-hover hover:-translate-y-0.5 active:translate-y-0 transition-all">
                  {t("cart.proceed")} <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-[11px] text-muted-foreground mt-2">{t("cart.noObligation")}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Order summary chip */}
            <div className="mx-5 mt-4 p-3 bg-secondary/60 rounded-xl flex items-center justify-between gap-3 flex-shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                  <Package className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] text-muted-foreground truncate block">
                    {items.map((i) => getDisplayName(i)).join(", ")}
                  </span>
                  <span className="text-[13px] font-bold text-foreground">{hasPrice ? formatEur(totalPrice) : ""}</span>
                </div>
              </div>
              <button onClick={() => setStep(1)} className="text-muted-foreground text-[11px] font-medium px-3 py-1.5 rounded-lg hover:bg-background hover:text-foreground transition-colors flex-shrink-0">
                {t("cart.edit")}
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-12 px-6 animate-scale-in flex-1 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <div className="text-lg font-extrabold text-foreground mb-1">{t("cart.sent")}</div>
                <p className="text-muted-foreground text-[13px] leading-relaxed max-w-[260px]">{t("cart.sentMsg")}</p>
              </div>
            ) : (
              <div className="px-5 py-4 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <span className="text-[15px] font-bold text-foreground">{t("cart.contact")}</span>
                </div>
                <p className="text-muted-foreground text-[12px] mb-4">{t("cart.contactSub")}</p>

                <div className="space-y-3">
                  <div>
                    <label className="flex items-center gap-1.5 text-[11.5px] font-semibold text-foreground/70 mb-1.5">
                      <User className="w-3 h-3" /> {t("cart.name")} *
                    </label>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ivan Muster" className={inputClass} />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-[11.5px] font-semibold text-foreground/70 mb-1.5">
                      <MessageSquare className="w-3 h-3" /> {t("cart.slackTg")} *
                    </label>
                    <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="@slack or @telegram" className={inputClass} />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-[11.5px] font-semibold text-foreground/70 mb-1.5">
                      <Mail className="w-3 h-3" /> {t("cart.email")}
                    </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" className={inputClass} />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-[11.5px] font-semibold text-foreground/70 mb-1.5">
                      <MessageSquare className="w-3 h-3" /> {t("cart.comment")} <span className="font-normal text-muted-foreground">({t("cart.optional")})</span>
                    </label>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="..." className={`${inputClass} h-[72px] resize-none`} />
                  </div>
                  <label className="flex items-start gap-3 p-3 bg-secondary/50 rounded-xl cursor-pointer hover:bg-secondary transition-colors">
                    <input type="checkbox" checked={dsgvo} onChange={(e) => setDsgvo(e.target.checked)} className="w-4 h-4 mt-0.5 accent-primary flex-shrink-0 rounded" />
                    <div className="flex items-start gap-2">
                      <Shield className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-[11.5px] text-muted-foreground leading-relaxed">{t("cart.dsgvo")} *</span>
                    </div>
                  </label>
                  <button onClick={handleSubmit} className="w-full gradient-primary text-primary-foreground text-[14px] font-bold py-3.5 rounded-xl shadow-green hover:shadow-green-hover hover:-translate-y-0.5 active:translate-y-0 transition-all mt-1 flex items-center justify-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    {t("cart.submit")}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
