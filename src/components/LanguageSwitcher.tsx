import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";
import type { Locale } from "@/i18n/translations";

const FlagUA = () => (
  <svg width="18" height="13" viewBox="0 0 18 13" className="rounded-[2px] shadow-sm">
    <rect width="18" height="6.5" fill="#005BBB" />
    <rect y="6.5" width="18" height="6.5" fill="#FFD500" />
  </svg>
);

const FlagGB = () => (
  <svg width="18" height="13" viewBox="0 0 60 30" className="rounded-[2px] shadow-sm">
    <clipPath id="gb"><rect width="60" height="30" /></clipPath>
    <g clipPath="url(#gb)">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#gb)" />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

const FlagDE = () => (
  <svg width="18" height="13" viewBox="0 0 18 13" className="rounded-[2px] shadow-sm">
    <rect width="18" height="4.33" fill="#000" />
    <rect y="4.33" width="18" height="4.33" fill="#DD0000" />
    <rect y="8.66" width="18" height="4.34" fill="#FFCC00" />
  </svg>
);

const langs: { code: Locale; Flag: React.FC; label: string }[] = [
  { code: "en", Flag: FlagGB, label: "EN" },
  { code: "de", Flag: FlagDE, label: "DE" },
  { code: "uk", Flag: FlagUA, label: "UA" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const activeIdx = langs.findIndex((l) => l.code === locale);

  const handleSwitch = (code: Locale) => {
    setLocale(code);
    // Replace the locale prefix in the current path
    const pathWithoutLocale = location.pathname.replace(/^\/(en|de|uk)/, "");
    navigate(`/${code}${pathWithoutLocale || ""}${location.search}`, { replace: true });
  };

  return (
    <div className="relative inline-grid grid-cols-3 items-center bg-white/10 backdrop-blur-xl border border-white/15 rounded-full p-[3px] shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      {/* Sliding indicator */}
      <div
        className="absolute top-[3px] bottom-[3px] rounded-full gradient-primary shadow-green transition-all duration-300 ease-out pointer-events-none"
        style={{
          left: `calc(${activeIdx} * 33.333% + 3px)`,
          right: `calc(${2 - activeIdx} * 33.333% + 3px)`,
        }}
      />
      {langs.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleSwitch(lang.code)}
          className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] font-bold transition-all duration-200 select-none ${
            locale === lang.code
              ? "text-primary-foreground scale-[1.05]"
              : "text-white/60 hover:text-white"
          }`}
        >
          <lang.Flag />
          <span>{lang.label}</span>
        </button>
      ))}
    </div>
  );
}
