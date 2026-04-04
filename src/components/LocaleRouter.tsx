import { useEffect } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Locale } from "@/i18n/translations";

const VALID_LOCALES = new Set<string>(["en", "de", "uk"]);

export default function LocaleRouter() {
  const { locale: urlLocale } = useParams<{ locale: string }>();
  const { locale, setLocale } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (urlLocale && VALID_LOCALES.has(urlLocale) && urlLocale !== locale) {
      setLocale(urlLocale as Locale);
    }
  }, [urlLocale, locale, setLocale]);

  // If URL locale doesn't match context locale (e.g. user switched via switcher), redirect
  useEffect(() => {
    if (urlLocale && VALID_LOCALES.has(urlLocale) && urlLocale !== locale) {
      // locale was just set above, wait for next render
      return;
    }
    if (urlLocale && urlLocale !== locale) {
      const rest = window.location.pathname.replace(`/${urlLocale}`, "");
      navigate(`/${locale}${rest}${window.location.search}`, { replace: true });
    }
  }, [locale, urlLocale, navigate]);

  return <Outlet />;
}
