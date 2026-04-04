import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string; // e.g. "/services/logo"
  type?: "website" | "product" | "article";
  jsonLd?: Record<string, unknown>;
}

const LOCALES = ["en", "de", "uk"] as const;
const BASE_URL = "https://promovisions.com";

export default function SEOHead({ title, description, path, type = "website", jsonLd }: SEOHeadProps) {
  const { locale } = useLanguage();

  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", type, "property");
    setMeta("og:url", `${BASE_URL}/${locale}${path}`, "property");
    setMeta("og:locale", locale === "uk" ? "uk_UA" : locale === "de" ? "de_DE" : "en_US", "property");

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${BASE_URL}/${locale}${path}`;

    // Hreflang tags
    const existingHreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflangs.forEach((el) => el.remove());

    LOCALES.forEach((loc) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = loc === "uk" ? "uk" : loc;
      link.href = `${BASE_URL}/${loc}${path}`;
      document.head.appendChild(link);
    });

    const xDefault = document.createElement("link");
    xDefault.rel = "alternate";
    xDefault.hreflang = "x-default";
    xDefault.href = `${BASE_URL}/en${path}`;
    document.head.appendChild(xDefault);

    // JSON-LD
    const existingLd = document.querySelector('script[data-seo-ld]');
    if (existingLd) existingLd.remove();

    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-ld", "true");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    // HTML lang attribute
    document.documentElement.lang = locale;

    return () => {
      const hreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
      hreflangs.forEach((el) => el.remove());
      const ld = document.querySelector('script[data-seo-ld]');
      if (ld) ld.remove();
    };
  }, [title, description, path, type, locale, jsonLd]);

  return null;
}
