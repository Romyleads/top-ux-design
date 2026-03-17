import { useLanguage } from "@/i18n/LanguageContext";
import type { Locale } from "@/i18n/translations";

const langs: { code: Locale; flag: string; label: string }[] = [
  { code: "uk", flag: "🇺🇦", label: "UA" },
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "de", flag: "🇩🇪", label: "DE" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const activeIdx = langs.findIndex((l) => l.code === locale);

  return (
    <div className="relative inline-flex items-center bg-card/80 backdrop-blur-xl border border-border rounded-full p-[3px] shadow-card">
      {/* Sliding indicator */}
      <div
        className="absolute top-[3px] bottom-[3px] rounded-full gradient-primary shadow-green transition-all duration-300 ease-out"
        style={{
          width: `${100 / langs.length}%`,
          left: `calc(${(activeIdx * 100) / langs.length}% + 3px)`,
          width: "calc(33.333% - 2px)",
        }}
      />
      {langs.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLocale(lang.code)}
          className={`relative z-10 flex items-center gap-1 px-3 py-1.5 rounded-full text-[11.5px] font-bold transition-all duration-200 select-none ${
            locale === lang.code
              ? "text-primary-foreground scale-[1.05]"
              : "text-t3 hover:text-foreground"
          }`}
        >
          <span className="text-sm leading-none">{lang.flag}</span>
          <span>{lang.label}</span>
        </button>
      ))}
    </div>
  );
}
