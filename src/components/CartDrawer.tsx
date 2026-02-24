import { ShoppingCart, X, ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "@/hooks/useCart";
import { useState } from "react";

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
  onChangeQty: (name: string, delta: number) => void;
  onRemove: (name: string) => void;
  onClear: () => void;
}

export default function CartDrawer({
  isOpen,
  items,
  totalItems,
  totalPrice,
  hasPrice,
  formatEur,
  step,
  setStep,
  onClose,
  onChangeQty,
  onRemove,
  onClear,
}: CartDrawerProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [dsgvo, setDsgvo] = useState(false);

  const isEmpty = items.length === 0;

  const handleSubmit = () => {
    if (!name.trim()) { alert("Введіть ім'я"); return; }
    if (!contact.trim() && !email.trim()) { alert("Вкажіть Slack/Telegram або Email"); return; }
    if (!dsgvo) { alert("Погодьтесь з умовами"); return; }
    if (isEmpty) { alert("Кошик порожній"); return; }
    setSubmitted(true);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-foreground/35 z-[799] transition-opacity duration-250 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[3000] bg-foreground/40 flex items-center justify-center p-5" onClick={() => setShowConfirm(false)}>
          <div className="bg-card rounded-2xl p-7 max-w-[300px] w-full text-center shadow-card-hover animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="text-4xl mb-3">🗑️</div>
            <div className="text-[15px] font-extrabold text-foreground mb-2">Очистити кошик?</div>
            <p className="text-[13px] text-t2 leading-relaxed mb-5">Ви впевнені, що хочете повністю видалити свій вибір?</p>
            <div className="flex gap-2">
              <button onClick={() => setShowConfirm(false)} className="flex-1 bg-secondary border border-border text-foreground text-[13px] font-medium py-2.5 rounded-[10px] hover:bg-border transition-colors">
                Ні, залишити
              </button>
              <button onClick={() => { onClear(); setShowConfirm(false); }} className="flex-1 bg-destructive/10 border border-destructive/30 text-destructive text-[13px] font-bold py-2.5 rounded-[10px] hover:bg-destructive/20 transition-colors">
                Так, видалити
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 bottom-0 w-[400px] max-w-[100vw] bg-card border-l border-border z-[2001] transition-transform duration-300 ease-out flex flex-col overflow-hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Head */}
        <div className="px-4 py-3.5 border-b border-border flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 bg-background border-[1.5px] border-border rounded-[9px] flex items-center justify-center text-foreground">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[9px] font-bold min-w-[17px] h-[17px] rounded-full flex items-center justify-center px-[3px] border-2 border-card">
                {totalItems}
              </span>
            </div>
            <span className="text-sm font-bold text-foreground">Крок {step} / 2</span>
          </div>
          <button onClick={onClose} className="bg-transparent border border-border text-t2 w-[30px] h-[30px] rounded-lg flex items-center justify-center hover:bg-background transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {step === 1 ? (
          <div className="flex-1 flex flex-col overflow-y-auto">
            {!isEmpty && (
              <div className="px-4 py-4 border-b border-border bg-secondary/50 flex-shrink-0">
                <div className="text-[10px] text-t4 uppercase tracking-wider mb-1 font-semibold">Орієнтовна вартість замовлення</div>
                <div className="text-[26px] font-extrabold text-foreground tracking-tight mb-[3px]">
                  {hasPrice ? <strong className="text-primary">{formatEur(totalPrice)}</strong> : <span className="text-[15px] text-t4">Ціна уточнюється</span>}
                </div>
                <div className="text-[11px] text-t4">ℹ Базова версія · фінальна ціна уточнюється після консультації</div>
              </div>
            )}

            {isEmpty ? (
              <div className="text-center py-12 px-5 text-t4 text-[13px] leading-relaxed flex-1 flex flex-col items-center justify-center">
                <div className="text-[40px] mb-3">🛍</div>
                <p>Кошик порожній.<br />Оберіть послуги та натисніть<br /><strong className="text-foreground">Додати</strong></p>
              </div>
            ) : (
              <div className="px-4 py-3 flex-1">
                <div className="text-[10px] text-t4 uppercase tracking-wider mb-2 font-bold flex items-center justify-between">
                  Обрані послуги
                  <button onClick={() => setShowConfirm(true)} className="text-destructive/60 hover:text-destructive text-[10px] font-semibold transition-colors">
                    Очистити все
                  </button>
                </div>
                <div className="space-y-1.5">
                  {items.map((item) => (
                    <div key={item.name} className="bg-background border border-border rounded-[10px] p-[9px] px-[11px] flex items-center gap-2">
                      <span className="text-lg flex-shrink-0">{item.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12.5px] font-semibold text-foreground whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</div>
                        <div className="text-[11px] text-t4">{item.price}</div>
                      </div>
                      <div className="flex items-center bg-card border border-border rounded-[7px] overflow-hidden flex-shrink-0">
                        <button onClick={() => onChangeQty(item.name, -1)} className="bg-transparent border-none text-t4 text-base w-[26px] h-[26px] flex items-center justify-center hover:bg-background hover:text-foreground transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-foreground min-w-[22px] text-center">{item.qty}</span>
                        <button onClick={() => onChangeQty(item.name, 1)} className="bg-transparent border-none text-t4 text-base w-[26px] h-[26px] flex items-center justify-center hover:bg-background hover:text-foreground transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button onClick={() => onRemove(item.name)} className="bg-transparent border-none text-border text-[13px] p-1 rounded-[5px] flex-shrink-0 hover:text-destructive hover:bg-destructive/10 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!isEmpty && (
              <div className="px-4 py-3 pb-5 flex-shrink-0 border-t border-border">
                <button onClick={() => setStep(2)} className="w-full flex items-center justify-center gap-[7px] gradient-primary-dark border-none text-primary-foreground text-[13.5px] font-bold py-3.5 rounded-[10px] shadow-[0_6px_16px_-6px_rgba(31,107,69,0.45)] hover:brightness-[1.08] transition-all">
                  Перейти до оформлення <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-[11px] text-t4 mt-1.5">Запит на розрахунок — без зобов'язань</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Summary */}
            <div className="mx-4 mt-3 p-2.5 px-3 bg-secondary/80 border border-border rounded-[10px] flex items-center justify-between gap-2.5 flex-shrink-0">
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[11px] text-t4 whitespace-nowrap overflow-hidden text-ellipsis">
                  {items.map((i) => `${i.emoji} ${i.name}`).join(", ")}
                </span>
                <span className="text-[13px] font-bold text-foreground">{hasPrice ? formatEur(totalPrice) : ""}</span>
              </div>
              <button onClick={() => setStep(1)} className="bg-transparent border border-border text-t2 text-[11.5px] px-2.5 py-1 rounded-[7px] hover:bg-background transition-colors flex-shrink-0">
                ✏ Змінити
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-10 px-5 animate-scale-in">
                <div className="text-[44px] mb-3">✅</div>
                <div className="text-base font-extrabold text-primary mb-2">Запит надіслано!</div>
                <p className="text-t3 text-[13px] leading-relaxed">Ми зв'яжемося у Slack або Telegram протягом 24 годин. Дякуємо!</p>
              </div>
            ) : (
              <div className="px-4 py-3.5 flex-1">
                <div className="text-[15px] font-extrabold text-foreground mb-[3px]">Контактні дані</div>
                <p className="text-t4 text-xs mb-3.5">Відповідаємо у Slack або Telegram — без телефонних дзвінків</p>

                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[11.5px] font-semibold text-t2 mb-1">Ім'я *</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ivan Muster" className="w-full bg-secondary/80 border-[1.5px] border-border rounded-[10px] px-3 py-[9px] text-[13px] text-foreground outline-none transition-all focus:border-primary focus:bg-card focus:ring-[3px] focus:ring-primary/[.08]" />
                  </div>
                  <div>
                    <label className="block text-[11.5px] font-semibold text-t2 mb-1">Slack або Telegram *</label>
                    <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="@slack або @telegram" className="w-full bg-secondary/80 border-[1.5px] border-border rounded-[10px] px-3 py-[9px] text-[13px] text-foreground outline-none transition-all focus:border-primary focus:bg-card focus:ring-[3px] focus:ring-primary/[.08]" />
                  </div>
                  <div>
                    <label className="block text-[11.5px] font-semibold text-t2 mb-1">E-Mail</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" className="w-full bg-secondary/80 border-[1.5px] border-border rounded-[10px] px-3 py-[9px] text-[13px] text-foreground outline-none transition-all focus:border-primary focus:bg-card focus:ring-[3px] focus:ring-primary/[.08]" />
                  </div>
                  <div>
                    <label className="block text-[11.5px] font-semibold text-t2 mb-1">Коментар <span className="font-normal">(необов'язково)</span></label>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Деталі, дедлайн, питання..." className="w-full bg-secondary/80 border-[1.5px] border-border rounded-[10px] px-3 py-[9px] text-[13px] text-foreground outline-none transition-all focus:border-primary focus:bg-card focus:ring-[3px] focus:ring-primary/[.08] h-[68px] resize-none" />
                  </div>
                  <label className="flex items-start gap-[9px] p-2.5 px-3 bg-secondary/80 border border-border rounded-lg cursor-pointer">
                    <input type="checkbox" checked={dsgvo} onChange={(e) => setDsgvo(e.target.checked)} className="w-3.5 h-3.5 mt-0.5 accent-primary flex-shrink-0" />
                    <span className="text-[11.5px] text-t3 leading-relaxed">Я погоджуюся з обробкою моїх даних згідно з політикою конфіденційності. *</span>
                  </label>
                  <button onClick={handleSubmit} className="w-full gradient-primary-dark border-none text-primary-foreground text-sm font-bold py-[13px] rounded-[10px] shadow-[0_6px_16px_-6px_rgba(31,107,69,0.4)] hover:brightness-[1.08] transition-all mt-1">
                    Надіслати запит →
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
