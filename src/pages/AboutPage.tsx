import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import { ArrowLeft, Zap, Users, Globe, Shield } from "lucide-react";

const content = {
  en: {
    title: "About PromoVisions",
    desc: "PromoVisions delivers turnkey marketing concepts for businesses. From print to digital, branding to paid ads — 38+ ready-made formats.",
    h1: "About Us",
    intro: "PromoVisions is a marketing concept studio that helps businesses launch faster with ready-made, professionally designed marketing materials.",
    features: [
      { icon: Zap, title: "Fast Delivery", text: "Concepts delivered in 1–7 business days with no compromises on quality." },
      { icon: Users, title: "Experienced Team", text: "Designers, copywriters and strategists working together on every concept." },
      { icon: Globe, title: "Multilingual", text: "All materials available in English, German and Ukrainian." },
      { icon: Shield, title: "Turnkey Solutions", text: "From brief to final delivery — we handle everything." },
    ],
  },
  de: {
    title: "Über PromoVisions",
    desc: "PromoVisions liefert schlüsselfertige Marketingkonzepte für Unternehmen. Über 38 Formate verfügbar.",
    h1: "Über uns",
    intro: "PromoVisions ist ein Marketingkonzept-Studio, das Unternehmen hilft, schneller mit professionell gestalteten Materialien zu starten.",
    features: [
      { icon: Zap, title: "Schnelle Lieferung", text: "Konzepte in 1–7 Werktagen ohne Qualitätskompromisse." },
      { icon: Users, title: "Erfahrenes Team", text: "Designer, Texter und Strategen arbeiten an jedem Konzept." },
      { icon: Globe, title: "Mehrsprachig", text: "Alle Materialien auf Englisch, Deutsch und Ukrainisch." },
      { icon: Shield, title: "Schlüsselfertig", text: "Vom Briefing bis zur Lieferung — wir kümmern uns um alles." },
    ],
  },
  uk: {
    title: "Про PromoVisions",
    desc: "PromoVisions створює готові маркетингові концепти для бізнесу. 38+ форматів від друку до цифрових медіа.",
    h1: "Про нас",
    intro: "PromoVisions — студія маркетингових концептів, яка допомагає бізнесу швидше стартувати з професійно розробленими матеріалами.",
    features: [
      { icon: Zap, title: "Швидка доставка", text: "Концепти за 1–7 робочих днів без компромісів у якості." },
      { icon: Users, title: "Досвідчена команда", text: "Дизайнери, копірайтери та стратеги працюють над кожним концептом." },
      { icon: Globe, title: "Мультимовність", text: "Усі матеріали англійською, німецькою та українською." },
      { icon: Shield, title: "Під ключ", text: "Від брифу до фінальної доставки — ми беремо на себе все." },
    ],
  },
};

export default function AboutPage() {
  const { locale } = useLanguage();
  const c = content[locale];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={c.title} description={c.desc} path="/about" />
      <div className="max-w-[800px] mx-auto px-6 py-10">
        <Link to={`/${locale}`} className="inline-flex items-center gap-1.5 text-[13px] text-t3 hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          {locale === "uk" ? "На головну" : locale === "de" ? "Zur Startseite" : "Back to home"}
        </Link>

        <h1 className="text-[32px] font-black text-foreground mb-4">{c.h1}</h1>
        <p className="text-[15px] text-t2 leading-relaxed mb-10">{c.intro}</p>

        <div className="grid sm:grid-cols-2 gap-5">
          {c.features.map((f, i) => (
            <div key={i} className="p-5 rounded-xl" style={{ background: 'hsl(220 14% 97%)', border: '1px solid hsl(220 13% 91% / 0.5)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: 'hsl(142 76% 48% / 0.1)' }}>
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-[15px] font-bold text-foreground mb-1">{f.title}</h3>
              <p className="text-[13px] text-t3 leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
