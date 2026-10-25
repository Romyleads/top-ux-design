import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import { legal, bindingNote, type LegalDoc } from "@/data/legal";

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const { locale } = useLanguage();
  const d = legal[doc][locale];
  const note = bindingNote[locale];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={`${d.title} | PromoVisions`} description={d.title} path={`/${doc}`} />
      <div className="max-w-[800px] mx-auto px-6 py-10">
        <Link to={`/${locale}`} className="inline-flex items-center gap-1.5 text-[13px] text-t3 hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          {locale === "uk" ? "На головну" : locale === "de" ? "Zur Startseite" : "Back to home"}
        </Link>
        <h1 className="text-foreground mb-3">{d.title}</h1>
        {note && <p className="text-[13px] text-t3 mb-8">{note}</p>}
        <div className="space-y-7">
          {d.sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-[17px] font-semibold text-foreground mb-2">{s.h}</h2>
              {s.p.map((line, i) => (
                <p key={i} className="text-[14px] text-t2 leading-relaxed">{line}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
