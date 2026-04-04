import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import { ArrowLeft, Mail, MessageCircle, Clock } from "lucide-react";

const content = {
  en: {
    title: "Contact — PromoVisions",
    desc: "Get in touch with PromoVisions. We reply via Slack or Telegram within 24 hours.",
    h1: "Contact Us",
    intro: "Have a question or ready to start? Reach out — we respond within 24 hours.",
    channels: [
      { icon: MessageCircle, title: "Telegram", text: "Quick responses for project inquiries", link: "https://t.me/promovisions" },
      { icon: Mail, title: "Email", text: "info@promovisions.com", link: "mailto:info@promovisions.com" },
      { icon: Clock, title: "Response Time", text: "Within 24 hours on business days", link: "" },
    ],
  },
  de: {
    title: "Kontakt — PromoVisions",
    desc: "Kontaktieren Sie PromoVisions. Antwort per Slack oder Telegram innerhalb von 24 Stunden.",
    h1: "Kontakt",
    intro: "Haben Sie eine Frage oder möchten starten? Wir antworten innerhalb von 24 Stunden.",
    channels: [
      { icon: MessageCircle, title: "Telegram", text: "Schnelle Antworten für Projektanfragen", link: "https://t.me/promovisions" },
      { icon: Mail, title: "E-Mail", text: "info@promovisions.com", link: "mailto:info@promovisions.com" },
      { icon: Clock, title: "Antwortzeit", text: "Innerhalb von 24 Stunden an Werktagen", link: "" },
    ],
  },
  uk: {
    title: "Контакти — PromoVisions",
    desc: "Зв'яжіться з PromoVisions. Відповідаємо у Slack або Telegram протягом 24 годин.",
    h1: "Контакти",
    intro: "Маєте питання або готові почати? Ми відповідаємо протягом 24 годин.",
    channels: [
      { icon: MessageCircle, title: "Telegram", text: "Швидкі відповіді на запити щодо проєктів", link: "https://t.me/promovisions" },
      { icon: Mail, title: "Email", text: "info@promovisions.com", link: "mailto:info@promovisions.com" },
      { icon: Clock, title: "Час відповіді", text: "Протягом 24 годин у робочі дні", link: "" },
    ],
  },
};

export default function ContactPage() {
  const { locale } = useLanguage();
  const c = content[locale];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={c.title} description={c.desc} path="/contact" />
      <div className="max-w-[800px] mx-auto px-6 py-10">
        <Link to={`/${locale}`} className="inline-flex items-center gap-1.5 text-[13px] text-t3 hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          {locale === "uk" ? "На головну" : locale === "de" ? "Zur Startseite" : "Back to home"}
        </Link>

        <h1 className="text-[32px] font-black text-foreground mb-4">{c.h1}</h1>
        <p className="text-[15px] text-t2 leading-relaxed mb-10">{c.intro}</p>

        <div className="space-y-4">
          {c.channels.map((ch, i) => (
            <div key={i} className="flex items-center gap-4 p-5 rounded-xl" style={{ background: 'hsl(220 14% 97%)', border: '1px solid hsl(220 13% 91% / 0.5)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'hsl(142 76% 48% / 0.1)' }}>
                <ch.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-foreground">{ch.title}</h3>
                {ch.link ? (
                  <a href={ch.link} target="_blank" rel="noopener noreferrer" className="text-[13px] text-primary hover:underline">{ch.text}</a>
                ) : (
                  <p className="text-[13px] text-t3">{ch.text}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
