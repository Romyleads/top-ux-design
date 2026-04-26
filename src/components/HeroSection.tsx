import { Search, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SearchConstellation from "@/components/SearchConstellation";
import promoLogo from "@/assets/promovisions-hero.png";

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
  const { t, locale } = useLanguage();

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

  const conceptWord = (n: number) =>
    locale === "uk"
      ? plural(n, t("plural.concept.one"), t("plural.concept.few"), t("plural.concept.many"))
      : t("plural.concept.many");

  return (
    <section className="text-center pt-2 pb-4 px-6 relative z-10">
      {/* Language Switcher */}
      <div className="flex justify-end mb-1">
        <LanguageSwitcher />
      </div>

      {/* 3D Logo with glow */}
      <div className="mb-1 relative -mt-2">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[400px] h-[100px] rounded-full opacity-30" style={{
            background: 'radial-gradient(ellipse, hsl(142, 76%, 48%) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }} />
        </div>
        <img 
          src={promoLogo} 
          alt="PromoVisions" 
          className="max-w-[380px] w-full mx-auto relative z-[1] drop-shadow-[0_4px_40px_rgba(74,222,128,0.3)]"
        />
      </div>

      <h1 className="text-[clamp(22px,3vw,32px)] font-black text-white leading-[1.1] mb-2 tracking-tight drop-shadow-[0_2px_20px_rgba(74,222,128,0.15)]">
        {t("hero.title1")}{" "}
        <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-300 bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer">
          {t("hero.title2")}
        </span>
      </h1>
      <p className="hidden sm:block text-white/60 text-[13.5px] mx-auto mb-4 leading-relaxed font-medium whitespace-nowrap">
        {t("hero.subtitle")}
      </p>

      {/* Search */}
      <div className={`relative max-w-[500px] mx-auto beam-border ${focused ? "focus-within" : ""}`}>
        <svg
          aria-hidden="true"
          className="beam-border-svg pointer-events-none absolute inset-0 z-[3] h-full w-full"
          viewBox="0 0 500 56"
          preserveAspectRatio="none"
        >
          <rect
            className="beam-stroke-tail"
            x="0.75"
            y="0.75"
            width="498.5"
            height="54.5"
            rx="27.25"
            ry="27.25"
            pathLength="1000"
          />
          <rect
            className="beam-stroke-mid"
            x="0.75"
            y="0.75"
            width="498.5"
            height="54.5"
            rx="27.25"
            ry="27.25"
            pathLength="1000"
          />
          <rect
            className="beam-stroke-head"
            x="0.75"
            y="0.75"
            width="498.5"
            height="54.5"
            rx="27.25"
            ry="27.25"
            pathLength="1000"
          />
          <rect
            className="beam-stroke-core"
            x="0.75"
            y="0.75"
            width="498.5"
            height="54.5"
            rx="27.25"
            ry="27.25"
            pathLength="1000"
          />
        </svg>
        <div
          className={`relative z-[1] flex items-center rounded-full py-[6px] pl-[20px] pr-[6px] gap-2.5 border-[1.5px] transition-all duration-300 overflow-hidden backdrop-blur-xl ${
            focused
              ? "border-primary/50 shadow-[0_8px_32px_-4px_rgba(74,222,128,0.35),0_0_60px_-10px_rgba(74,222,128,0.2),inset_0_0_0_1px_rgba(74,222,128,0.08)]"
              : "bg-white/[0.07] border-white/[0.12] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.3)]"
          }`}
          style={
            focused
              ? { background: "linear-gradient(135deg, hsl(168, 35%, 7%) 0%, hsl(165, 30%, 9%) 50%, hsl(160, 28%, 8%) 100%)" }
              : undefined
          }
        >
          {/* Animated constellation backdrop — only when focused */}
          {focused && <SearchConstellation active={focused} />}

          {/* Subtle inner gradient sheen — only when focused */}
          {focused && (
            <div className="absolute inset-0 pointer-events-none rounded-full" style={{
              background: "radial-gradient(ellipse at top, rgba(74,222,128,0.06) 0%, transparent 60%)"
            }} />
          )}

          <Search className={`relative z-[2] flex-shrink-0 w-[17px] h-[17px] transition-all duration-300 ${focused ? "text-primary scale-115 -rotate-[5deg] drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]" : "text-white/40"}`} />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={t("hero.search")}
            className="relative z-[2] flex-1 border-none outline-none text-[14px] text-white bg-transparent font-sans tracking-tight min-w-0 placeholder:text-white/40 placeholder:font-normal caret-primary selection:bg-primary/30 selection:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
          />
          {searchQuery.length > 0 && (
            <button onClick={() => onSearchChange("")} className="relative z-[2] flex-shrink-0 flex items-center justify-center w-[22px] h-[22px] rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/15 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          {!searchQuery && !focused && (
            <div className="relative z-[2] flex-shrink-0 flex items-center gap-[3px] opacity-50">
              <kbd className="bg-white/10 border border-white/15 rounded-[5px] px-1.5 py-0.5 text-[10px] font-semibold text-white/70 leading-snug">Ctrl</kbd>
              <kbd className="bg-white/10 border border-white/15 rounded-[5px] px-1.5 py-0.5 text-[10px] font-semibold text-white/70 leading-snug">K</kbd>
            </div>
          )}
          <button
            onClick={() => inputRef.current?.focus()}
            className="relative z-[2] flex-shrink-0 gradient-primary border-none text-primary-foreground w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-green hover:scale-[1.08] hover:shadow-green-hover active:scale-95 transition-all duration-200"
          >
            <Search className="w-[16px] h-[16px]" />
          </button>
        </div>
      </div>
      {searchQuery && resultCount !== undefined && (
        <p className="text-center mt-3 text-xs text-white/50 font-medium animate-fade-in">
          {resultCount > 0 ? (
            <>{t("hero.found")} <strong className="text-primary font-bold">{resultCount}</strong> {conceptWord(resultCount)}</>
          ) : (
            t("hero.nothing")
          )}
        </p>
      )}
    </section>
  );
}
