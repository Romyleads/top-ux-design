import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { translations, type Locale } from "./translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem("locale");
    if (saved === "en" || saved === "de" || saved === "uk") return saved;
    const browserLang = navigator.language?.toLowerCase() || "";
    if (browserLang.startsWith("uk") || browserLang.startsWith("ru")) return "uk";
    if (browserLang.startsWith("de")) return "de";
    return "en";
  });

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("locale", l);
  }, []);

  const t = useCallback(
    (key: string) => translations[key]?.[locale] ?? translations[key]?.["en"] ?? key,
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
