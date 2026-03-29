import { useState } from "react";
import { 
  ChevronDown, BarChart3, BookOpen, Package, FileText, Globe, Clapperboard, 
  Smartphone, Image, Pencil, CreditCard, PackageOpen, BookMarked, PenLine, 
  Trophy, GraduationCap, Mail, Droplets, Newspaper, Video, Home, Star, 
  Target, RefreshCw, Rocket, Theater, Bot, Map, Briefcase, Zap, Gamepad2, 
  Mic, Flame, ChevronRight
} from "lucide-react";
import type { ServiceCard } from "@/data/services";
import FeatureIcon from "./FeatureIcon";
import { useLanguage } from "@/i18n/LanguageContext";

const serviceIcons: Record<string, React.ElementType> = {
  "presentation": BarChart3, "brochure": BookOpen, "catalog": Package, "flyer": FileText,
  "landing-page": Globe, "video-ad": Clapperboard, "smm": Smartphone, "banners": Image,
  "logo": Pencil, "business-card": CreditCard, "packaging": PackageOpen, "brandbook": BookMarked,
  "blog-post": PenLine, "infographic": BarChart3, "white-paper": FileText, "case-study": Trophy,
  "ebook": GraduationCap, "email-campaign": Mail, "drip-campaign": Droplets, "newsletter": Newspaper,
  "webinar": Video, "product-tour": Home, "testimonials": Star, "ppc-google": Target,
  "retargeting": RefreshCw, "native-ads": Newspaper, "landing-ad": Rocket, "ugc": Theater,
  "ai-content": Bot, "saas-onboarding": Map, "linkedin-brand": Briefcase, "micro-saas": Zap,
  "interactive-content": Gamepad2, "podcast": Mic,
};

function tList(t: (key: string) => string, prefix: string): string[] {
  const result: string[] = [];
  for (let i = 0; i < 20; i++) {
    const key = `${prefix}.${i}`;
    const val = t(key);
    if (val === key) break;
    result.push(val);
  }
  return result;
}

interface ServiceCardProps {
  service: ServiceCard;
  isOrdered: boolean;
  onAddToCart: (id: string, emoji: string, price: string, tierName: string) => void;
}

export default function ServiceCardComponent({ service, isOrdered, onAddToCart }: ServiceCardProps) {
  const [activeTier, setActiveTier] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [fading, setFading] = useState(false);
  const { t } = useLanguage();

  const features = service.tierFeatures[activeTier] || [];
  const tier = service.tiers[activeTier];

  const handleTierChange = (idx: number) => {
    if (idx === activeTier) return;
    setFading(true);
    setTimeout(() => {
      setActiveTier(idx);
      setFading(false);
    }, 150);
  };

  const serviceName = t(`service.${service.id}.name`);
  const serviceSubtitle = t(`service.${service.id}.subtitle`);
  const serviceGoal = t(`service.${service.id}.goal`);

  const handleAdd = () => {
    onAddToCart(service.id, service.emoji, tier.price, tier.name);
  };

  const SvcIcon = serviceIcons[service.id];

  return (
    <div
      className={`rounded-[20px] overflow-hidden flex flex-col relative transition-all duration-500 hover:-translate-y-3 group ${
        isOrdered 
          ? "ring-[2.5px] ring-primary glow-green" 
          : ""
      }`}
      style={{ 
        background: 'hsl(0 0% 100%)',
        boxShadow: isOrdered 
          ? '0 0 30px -8px rgba(34, 197, 94, 0.35)' 
          : '0 8px 40px -12px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* Hover glow effect — matches card rounding */}
      <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" style={{
        boxShadow: '0 20px 60px -15px rgba(34, 197, 94, 0.2), 0 8px 24px rgba(0,0,0,0.08)',
        borderRadius: 'inherit',
      }} />

      {isOrdered && (
        <div className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full gradient-primary text-primary-foreground text-xs font-bold flex items-center justify-center z-20" style={{
          boxShadow: '0 4px 12px rgba(34, 197, 94, 0.4)',
        }}>
          ✓
        </div>
      )}

      {/* Photo with cinematic overlay */}
      <div className="relative h-[200px] overflow-hidden flex-shrink-0">
        <img
          src={service.photo}
          alt={serviceName}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
        />
        {/* Cinematic gradient */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 20%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.65) 85%, rgba(0,0,0,0.8) 100%)'
        }} />
        
        {/* Icon floating on photo */}
        <div className="absolute bottom-4 left-4 z-[3]">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/20 transition-transform duration-300 group-hover:scale-110" style={{
            background: 'rgba(255,255,255,0.9)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          }}>
            {SvcIcon ? <SvcIcon className="w-5 h-5 text-primary" strokeWidth={1.8} /> : <span className="text-xl">{service.emoji}</span>}
          </div>
        </div>

        {/* Title on photo */}
        <div className="absolute bottom-4 left-[68px] right-4 z-[3]">
          <h3 className="text-[18px] font-extrabold text-white leading-tight tracking-tight mb-0.5" style={{
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}>{serviceName}</h3>
          <p className="text-[12px] text-white/70 leading-snug font-medium">{serviceSubtitle}</p>
        </div>

        {/* HOT badge */}
        {service.hot && (
          <div className="absolute top-3.5 left-3.5 z-[3]">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider text-white animate-pulse-subtle" style={{
              background: 'linear-gradient(135deg, hsl(38 92% 50%), hsl(25 95% 55%))',
              boxShadow: '0 4px 16px rgba(245, 158, 11, 0.4)',
            }}>
              <Flame className="w-3 h-3" strokeWidth={2.5} /> HOT
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="px-5 pt-5 flex-1 flex flex-col relative z-[1]">
        {/* Goal block — premium accent */}
        <div className="flex items-start gap-3 rounded-2xl px-4 py-3.5 mb-5" style={{
          background: 'linear-gradient(135deg, hsl(142 76% 48% / 0.06), hsl(142 76% 48% / 0.02))',
          border: '1px solid hsl(142 71% 42% / 0.12)',
        }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{
            background: 'linear-gradient(135deg, hsl(142 76% 48% / 0.15), hsl(142 76% 48% / 0.05))',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="2.5" fill="currentColor" />
              <path d="M21 3L13.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M17 3H21V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-[13px] text-foreground leading-[1.45] font-semibold">{serviceGoal}</span>
        </div>

        {/* Tier Picker — elevated */}
        <div className="rounded-2xl p-1.5 mb-5" style={{
          background: 'hsl(220 14% 96%)',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.04)',
        }}>
          <div className="grid grid-cols-3 gap-1">
            {service.tiers.map((tierItem, i) => (
              <button
                key={i}
                onClick={() => handleTierChange(i)}
                className={`flex flex-col items-center py-3 px-2 rounded-xl cursor-pointer transition-all duration-250 select-none ${
                  i === activeTier
                    ? "shadow-lg"
                    : "hover:bg-card/60"
                }`}
                style={i === activeTier ? {
                  background: 'hsl(0 0% 100%)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)',
                  border: '1px solid hsl(142 71% 42% / 0.25)',
                } : undefined}
              >
                <span className={`text-[11px] font-semibold leading-none mb-2 transition-colors ${
                  i === activeTier ? "text-primary font-bold" : "text-t4"
                }`}>
                  {tierItem.name}
                </span>
                <span className={`text-[17px] font-extrabold leading-none transition-colors ${
                  i === activeTier ? "text-foreground" : "text-t3"
                }`}>
                  {tierItem.price}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Features — clean lines */}
        <div className={`transition-opacity duration-150 mb-4 space-y-0 ${fading ? "opacity-0" : "opacity-100"}`}>
          {features.map((feat, i) => {
            const tierFeatText = t(`service.${service.id}.tier.${activeTier}.${i}`);
            return (
              <div key={`${activeTier}-${i}`} className="flex items-center gap-3 py-2.5 border-b border-border/20 last:border-b-0">
                <FeatureIcon icon={feat.icon} />
                <span className="text-[13px] text-t2 leading-snug [&>b]:text-foreground [&>b]:font-semibold" dangerouslySetInnerHTML={{ __html: tierFeatText }} />
              </div>
            );
          })}
        </div>

        {/* CTA Button — premium */}
        <div className="mt-auto pt-3 pb-4">
          <button
            onClick={handleAdd}
            className={`block w-full rounded-2xl text-[14px] font-bold py-4 px-6 text-center relative overflow-hidden transition-all duration-300 ${
              isOrdered
                ? "bg-green-light text-green-text ring-[1.5px] ring-green-border"
                : "text-primary-foreground gradient-shine hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.98]"
            }`}
            style={!isOrdered ? {
              background: 'linear-gradient(135deg, hsl(142, 76%, 46%) 0%, hsl(152, 60%, 36%) 100%)',
              boxShadow: '0 8px 28px -4px rgba(22, 163, 74, 0.45), 0 2px 6px rgba(22, 163, 74, 0.2)',
            } : undefined}
          >
            {isOrdered ? t("card.inCart") : `${t("card.add")} ${tier.name} — ${tier.price}`}
          </button>
        </div>

        {/* Details — minimal bottom link */}
        <div className="border-t border-border/20 py-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-center gap-2 bg-transparent border-none text-t4 text-[12px] font-medium cursor-pointer transition-all hover:text-primary hover:gap-3"
          >
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
            <span>{t("card.details")}</span>
            <ChevronRight className="w-3 h-3 opacity-40" />
          </button>

          <div className={`overflow-hidden transition-all duration-400 ease-out ${expanded ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="pt-4 space-y-3">
              {service.info.map((section, i) => {
                const sectionLabel = t(`info.${section.kind}`);
                const isContentList = section.kind === "content";
                const sectionText = section.kind !== "content"
                  ? t(`service.${service.id}.info.${section.kind}`)
                  : undefined;
                const contentItems = isContentList
                  ? tList(t, `service.${service.id}.info.content`)
                  : undefined;
                const textKey = `service.${service.id}.info.${section.kind}`;
                if (!isContentList && sectionText === textKey) return null;
                if (isContentList && (!contentItems || contentItems.length === 0)) return null;

                return (
                  <div key={i} className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-primary">{sectionLabel}</span>
                    {isContentList && contentItems ? (
                      <ul className="list-none p-0 m-0 flex flex-col gap-1">
                        {contentItems.map((item, j) => (
                          <li key={j} className="text-[12px] text-t2 leading-snug pl-3.5 relative before:content-['›'] before:absolute before:left-0 before:text-primary before:font-bold">
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-[12.5px] text-t2 leading-relaxed">{sectionText}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
