import { useState, useEffect, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Mail,
  MapPin,
  ShieldCheck,
  Lock,
  Globe2,
  ArrowRight,
  Linkedin,
  Instagram,
  Twitter,
  Github,
  CheckCircle2,
} from "lucide-react";

const CONSENT_STORAGE_KEY = "newsletter.gdpr.consent";

export default function SiteFooter() {
  const { t, locale } = useLanguage();
  const lp = (p: string) => `/${locale}${p ? `/${p}` : ""}`;
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  // Restore previous GDPR choice
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.consent === true) setConsent(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const persistConsent = (granted: boolean) => {
    try {
      localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({
          consent: granted,
          locale,
          timestamp: new Date().toISOString(),
          version: "gdpr-v1",
        }),
      );
    } catch {
      /* ignore */
    }
  };

  const handleConsentChange = (checked: boolean) => {
    setConsent(checked);
    if (checked) setConsentError(false);
    persistConsent(checked);
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    if (!consent) {
      setConsentError(true);
      return;
    }
    persistConsent(true);
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <footer
      className="relative mt-24 -mx-7 max-sm:-mx-3.5 overflow-hidden border-t border-primary/15"
      style={{
        background:
          "linear-gradient(180deg, hsl(220,16%,94%) 0%, hsl(150,18%,90%) 55%, hsl(152,22%,84%) 100%)",
      }}
    >
      {/* Top neon accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, hsl(142,76%,48%) 30%, hsl(160,80%,55%) 50%, hsl(142,76%,48%) 70%, transparent 100%)",
          boxShadow: "0 0 14px rgba(74,222,128,0.35)",
        }}
      />
      {/* Soft glows */}
      <div
        className="pointer-events-none absolute -top-32 left-[12%] w-[420px] h-[420px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(142,71%,55%) 0%, transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 right-[8%] w-[520px] h-[520px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(160,80%,55%) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-7 max-sm:px-3.5 pt-16 pb-10">
        {/* Top grid */}
        <div className="grid grid-cols-12 gap-10 max-lg:gap-8 max-md:grid-cols-1">
          {/* Brand + newsletter */}
          <div className="col-span-5 max-lg:col-span-12">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full gradient-primary shadow-green animate-pulse-subtle" />
              <span className="text-primary-darker font-extrabold tracking-[0.22em] text-[15px]">
                PROMOVISIONS
              </span>
            </div>
            <p className="text-t2 text-[14px] leading-relaxed max-w-[380px] mb-6">
              {t("footer.tagline")}
            </p>

            {/* Newsletter */}
            <div className="rounded-2xl bg-white/55 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] p-5 max-w-[440px]">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl gradient-primary shadow-green flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="text-t1 font-bold text-[14px] leading-tight">
                    {t("footer.newsletter.title")}
                  </h4>
                  <p className="text-t3 text-[12px] mt-0.5 leading-snug">
                    {t("footer.newsletter.sub")}
                  </p>
                </div>
              </div>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer.newsletter.placeholder")}
                  className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl bg-white/80 border border-primary/15 text-[13px] text-t1 placeholder:text-t4 outline-none focus:border-primary/50 focus:bg-white transition"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-[13px] font-bold shadow-green hover:shadow-green-hover transition flex items-center gap-1.5 whitespace-nowrap"
                >
                  {subscribed ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> ✓
                    </>
                  ) : (
                    <>
                      {t("footer.newsletter.cta")} <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Links columns */}
          <div className="col-span-7 max-lg:col-span-12 grid grid-cols-3 max-sm:grid-cols-2 gap-6">
            <FooterCol title={t("footer.col.company")}>
              <FooterLink to={lp("about")}>{t("footer.link.about")}</FooterLink>
              <FooterLink to={lp("contact")}>{t("footer.link.contact")}</FooterLink>
              <FooterLink to={lp("faq")}>{t("footer.link.faq")}</FooterLink>
            </FooterCol>
            <FooterCol title={t("footer.col.legal")}>
              <FooterLink to={lp("")}>{t("footer.link.imprint")}</FooterLink>
              <FooterLink to={lp("")}>{t("footer.link.privacy")}</FooterLink>
              <FooterLink to={lp("")}>{t("footer.link.terms")}</FooterLink>
              <FooterLink to={lp("")}>{t("footer.link.cookies")}</FooterLink>
            </FooterCol>
            <FooterCol title={t("footer.col.contact")}>
              <li className="flex items-start gap-2 text-t2 text-[13px]">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-primary flex-shrink-0" />
                <span className="leading-snug">{t("footer.address")}</span>
              </li>
              <li className="flex items-center gap-2 text-t2 text-[13px]">
                <Mail className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <a href="mailto:hello@promovisions.com" className="hover:text-primary transition">
                  hello@promovisions.com
                </a>
              </li>
              <li className="pt-1 flex items-center gap-2">
                <SocialIcon href="https://linkedin.com" label="LinkedIn">
                  <Linkedin className="w-3.5 h-3.5" />
                </SocialIcon>
                <SocialIcon href="https://instagram.com" label="Instagram">
                  <Instagram className="w-3.5 h-3.5" />
                </SocialIcon>
                <SocialIcon href="https://twitter.com" label="X">
                  <Twitter className="w-3.5 h-3.5" />
                </SocialIcon>
                <SocialIcon href="https://github.com" label="GitHub">
                  <Github className="w-3.5 h-3.5" />
                </SocialIcon>
              </li>
            </FooterCol>
          </div>
        </div>

        {/* Trust badges row */}
        <div className="mt-12 pt-6 border-t border-primary/10 flex flex-wrap items-center justify-center gap-3">
          <TrustBadge icon={<ShieldCheck className="w-3.5 h-3.5" />} label={t("footer.badges.gdpr")} />
          <TrustBadge icon={<Globe2 className="w-3.5 h-3.5" />} label={t("footer.badges.eu")} />
          <TrustBadge icon={<Lock className="w-3.5 h-3.5" />} label={t("footer.badges.ssl")} />
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/60 border border-white/70 backdrop-blur-md">
            <span className="text-[11px] font-semibold text-t3 tracking-wide uppercase mr-1">
              {t("footer.payments")}
            </span>
            <PayLogo>VISA</PayLogo>
            <PayLogo>MC</PayLogo>
            <PayLogo>SEPA</PayLogo>
            <PayLogo>PayPal</PayLogo>
            <PayLogo>Klarna</PayLogo>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-primary/10 flex flex-wrap items-center justify-between gap-3 text-[12px] text-t3">
          <div className="flex items-center gap-2 flex-wrap">
            <span>© 2026 PromoVisions GmbH.</span>
            <span>{t("footer.allRights")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse-subtle" />
            <span className="font-medium tracking-wide">{t("footer.vat")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[11px] font-bold tracking-[0.18em] uppercase text-primary-darker mb-3.5">
        {title}
      </h4>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        to={to}
        className="group inline-flex items-center gap-1 text-t2 text-[13px] hover:text-primary transition-colors"
      >
        <span className="border-b border-transparent group-hover:border-primary/40 transition-colors">
          {children}
        </span>
      </Link>
    </li>
  );
}

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/60 border border-white/70 backdrop-blur-md text-[12px] font-semibold text-primary-darker">
      <span className="text-primary">{icon}</span>
      {label}
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="w-8 h-8 rounded-full bg-white/70 border border-white/80 backdrop-blur-md flex items-center justify-center text-t2 hover:text-primary-foreground hover:bg-primary hover:border-primary transition-all hover:-translate-y-0.5"
    >
      {children}
    </a>
  );
}

function PayLogo({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-0.5 rounded-md bg-white text-[10px] font-bold tracking-wide text-t2 border border-border/60 shadow-sm">
      {children}
    </span>
  );
}
