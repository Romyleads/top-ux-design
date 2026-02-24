import { Search, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  resultCount?: number;
}

const plural = (n: number, one: string, few: string, many: string) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
};

export default function HeroSection({ searchQuery, onSearchChange, resultCount }: HeroSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <section className="text-center pt-20 pb-10 px-6">
      <span className="inline-flex items-center gap-1.5 bg-green-light border border-green-border text-green-text text-[11px] font-bold px-3.5 py-1 rounded-full mb-5 tracking-wider uppercase">
        📋 Маркетинговий арсенал
      </span>
      <h1 className="text-[clamp(28px,4vw,50px)] font-extrabold text-foreground leading-[1.08] mb-3.5 tracking-tight">
        Офер <span className="text-primary">Концепти</span>
      </h1>
      <p className="text-t3 text-base max-w-[500px] mx-auto mb-6 leading-relaxed">
        Повна бібліотека маркетингових матеріалів — від друкованої продукції до трендових цифрових форматів 2024–2025
      </p>

      {/* Premium Search */}
      <div className={`relative max-w-[520px] mx-auto aurora-border ${focused ? "focus-within" : ""}`}>
        <div
          className={`relative z-[1] flex items-center bg-card rounded-full py-[7px] pl-[22px] pr-[7px] gap-2.5 border-[1.5px] transition-all duration-200 ${
            focused
              ? "border-transparent shadow-[0_8px_32px_-4px_rgba(22,163,74,0.2),0_2px_8px_rgba(22,163,74,0.1)]"
              : "border-border shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1),0_1px_4px_rgba(0,0,0,0.04)]"
          }`}
        >
          <Search
            className={`flex-shrink-0 w-[18px] h-[18px] transition-all duration-300 ${
              focused ? "text-primary scale-115 -rotate-[5deg]" : "text-t4"
            }`}
          />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Пошук концепту, формату, ключового слова..."
            className="flex-1 border-none outline-none text-[15px] text-foreground bg-transparent font-sans tracking-tight min-w-0 placeholder:text-t4 placeholder:font-normal"
          />
          {searchQuery.length > 0 && (
            <button
              onClick={() => onSearchChange("")}
              className="flex-shrink-0 flex items-center justify-center w-[22px] h-[22px] rounded-full bg-transparent text-t4 hover:text-t2 hover:bg-secondary transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          {!searchQuery && !focused && (
            <div className="flex-shrink-0 flex items-center gap-[3px] opacity-55">
              <kbd className="bg-secondary border border-border rounded-[5px] px-1.5 py-0.5 text-[10.5px] font-semibold text-t3 leading-snug">Ctrl</kbd>
              <kbd className="bg-secondary border border-border rounded-[5px] px-1.5 py-0.5 text-[10.5px] font-semibold text-t3 leading-snug">K</kbd>
            </div>
          )}
          <button
            onClick={() => inputRef.current?.focus()}
            className="flex-shrink-0 gradient-primary border-none text-primary-foreground w-[42px] h-[42px] rounded-full flex items-center justify-center shadow-green hover:scale-[1.08] hover:shadow-green-hover active:scale-95 transition-all duration-200"
          >
            <Search className="w-[17px] h-[17px]" />
          </button>
        </div>
      </div>
      {searchQuery && resultCount !== undefined && (
        <p className="text-center mt-3.5 text-xs text-t4 font-medium animate-fade-in">
          {resultCount > 0 ? (
            <>
              Знайдено <strong className="text-primary-dark font-bold">{resultCount}</strong>{" "}
              {plural(resultCount, "концепт", "концепти", "концептів")}
            </>
          ) : (
            "Нічого не знайдено"
          )}
        </p>
      )}
    </section>
  );
}
