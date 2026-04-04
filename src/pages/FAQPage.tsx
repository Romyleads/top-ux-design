import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqData = {
  en: {
    title: "FAQ — PromoVisions",
    desc: "Frequently asked questions about PromoVisions marketing concepts, pricing and delivery.",
    h1: "Frequently Asked Questions",
    items: [
      { q: "How long does delivery take?", a: "Most concepts are delivered within 1–7 business days depending on the tier you choose." },
      { q: "Can I customize a concept?", a: "Yes! Every concept is tailored to your brand. We discuss details after you submit a request." },
      { q: "What formats do I receive?", a: "Depending on the service: PDF, PSD, AI, Figma, MP4, HTML — all specified in the service card." },
      { q: "How does pricing work?", a: "Each service has 3 tiers (Lite, Standard, Premium) with transparent pricing. Final cost is confirmed after consultation." },
      { q: "Do you offer revisions?", a: "Yes, the number of revision rounds depends on the selected tier." },
      { q: "Which languages do you support?", a: "We create materials in English, German and Ukrainian. Other languages available on request." },
    ],
  },
  de: {
    title: "FAQ — PromoVisions",
    desc: "Häufig gestellte Fragen zu PromoVisions Marketingkonzepten, Preisen und Lieferung.",
    h1: "Häufig gestellte Fragen",
    items: [
      { q: "Wie lange dauert die Lieferung?", a: "Die meisten Konzepte werden innerhalb von 1–7 Werktagen geliefert." },
      { q: "Kann ich ein Konzept anpassen?", a: "Ja! Jedes Konzept wird auf Ihre Marke zugeschnitten." },
      { q: "Welche Formate erhalte ich?", a: "Je nach Service: PDF, PSD, AI, Figma, MP4, HTML — alle in der Servicekarte angegeben." },
      { q: "Wie funktioniert die Preisgestaltung?", a: "Jeder Service hat 3 Stufen (Lite, Standard, Premium) mit transparenter Preisgestaltung." },
      { q: "Bieten Sie Revisionen an?", a: "Ja, die Anzahl der Revisionsrunden hängt von der gewählten Stufe ab." },
      { q: "Welche Sprachen unterstützen Sie?", a: "Wir erstellen Materialien auf Englisch, Deutsch und Ukrainisch." },
    ],
  },
  uk: {
    title: "FAQ — PromoVisions",
    desc: "Часті запитання про маркетингові концепти PromoVisions, ціни та доставку.",
    h1: "Часті запитання",
    items: [
      { q: "Скільки часу займає виконання?", a: "Більшість концептів доставляються за 1–7 робочих днів залежно від обраного тарифу." },
      { q: "Чи можна кастомізувати концепт?", a: "Так! Кожен концепт адаптується під ваш бренд. Деталі обговорюємо після запиту." },
      { q: "Які формати я отримаю?", a: "Залежно від послуги: PDF, PSD, AI, Figma, MP4, HTML — все вказано у картці послуги." },
      { q: "Як працює ціноутворення?", a: "Кожна послуга має 3 тарифи (Lite, Standard, Premium) з прозорими цінами." },
      { q: "Чи є ревізії?", a: "Так, кількість раундів ревізій залежить від обраного тарифу." },
      { q: "Які мови ви підтримуєте?", a: "Ми створюємо матеріали англійською, німецькою та українською." },
    ],
  },
};

export default function FAQPage() {
  const { locale } = useLanguage();
  const c = faqData[locale];
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={c.title} description={c.desc} path="/faq" jsonLd={jsonLd} />
      <div className="max-w-[800px] mx-auto px-6 py-10">
        <Link to={`/${locale}`} className="inline-flex items-center gap-1.5 text-[13px] text-t3 hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          {locale === "uk" ? "На головну" : locale === "de" ? "Zur Startseite" : "Back to home"}
        </Link>

        <h1 className="text-[32px] font-black text-foreground mb-8">{c.h1}</h1>

        <div className="space-y-2">
          {c.items.map((item, i) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ border: '1px solid hsl(220 13% 91% / 0.5)' }}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
              >
                <span className="text-[14px] font-semibold text-foreground pr-4">{item.q}</span>
                <ChevronDown className={`w-4 h-4 text-t4 flex-shrink-0 transition-transform duration-300 ${openIdx === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="px-5 pb-5 text-[13px] text-t2 leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
