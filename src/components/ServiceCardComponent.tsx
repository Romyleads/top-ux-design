import { useState } from "react";
import { 
  ChevronDown, BarChart3, BookOpen, Package, FileText, Globe, Clapperboard, 
  Smartphone, Image, Pencil, CreditCard, PackageOpen, BookMarked, PenLine, 
  Trophy, GraduationCap, Mail, Droplets, Newspaper, Video, Home, Star, 
  Target, RefreshCw, Rocket, Theater, Bot, Map, Briefcase, Zap, Gamepad2, 
  Mic, Flame
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
      className={`rounded-[22px] overflow-hidden flex flex-col relative transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl group ${
        isOrdered ? "ring-[2.5px] ring-primary glow-green" : ""
      }`}
      style={{ 
        background: 'hsl(0 0% 100%)',
        boxShadow: isOrdered 
          ? '0 0 30px -8px rgba(34, 197, 94, 0.35)' 
          : '0 2px 8px rgba(0,0,0,0.04), 0 12px 48px -16px rgba(0,0,0,0.10)',
        border: '1px solid hsl(220 13% 91% / 0.7)',
      }}
    >
      {isOrdered && (
        <div className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full gradient-primary text-primary-foreground text-xs font-bold flex items-center justify-center z-20" style={{
          boxShadow: '0 4px 12px rgba(34, 197, 94, 0.4)',
        }}>
          ✓
        </div>
      )}

      {/* Title + Subtitle — above photo */}
      <div className="flex items-start gap-3 px-5 pt-4 pb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-border/40 bg-primary/[.06]">
          {SvcIcon ? <SvcIcon className="w-5 h-5 text-primary" strokeWidth={1.8} /> : <span className="text-lg">{service.emoji}</span>}
        </div>
        <div className="min-w-0">
          <h3 className="text-[16px] font-extrabold text-foreground leading-tight tracking-tight mb-0.5">{serviceName}</h3>
          <p className="text-[12px] text-t3 leading-snug">{serviceSubtitle}</p>
        </div>
      </div>

      {/* Photo with curved bottom mask */}
      <div className="relative h-[160px] flex-shrink-0 overflow-hidden" style={{
        clipPath: 'ellipse(120% 100% at 50% 0%)',
      }}>
        <img
          src={service.photo}
          alt={serviceName}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
        />
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
      <div className="px-5 pt-4 flex-1 flex flex-col relative z-[1]">

        {/* Goal */}
        <div className="flex items-start gap-2.5 rounded-xl px-3.5 py-3 mb-3 border border-primary/10 bg-primary/[.03]">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{
            background: 'linear-gradient(145deg, hsl(145 60% 96%), hsl(145 40% 90%))',
            boxShadow: '0 2px 8px rgba(34,197,94,0.15), inset 0 1px 2px rgba(255,255,255,0.8)',
          }}>
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
              {/* 3D target base shadow */}
              <ellipse cx="16" cy="17" rx="11" ry="11" fill="hsl(142,50%,35%)" opacity="0.12" />
              {/* Outer ring with gradient */}
              <circle cx="16" cy="16" r="11" fill="url(#goalGradOuter)" />
              <circle cx="16" cy="16" r="9.5" fill="hsl(145,60%,96%)" />
              {/* Middle ring */}
              <circle cx="16" cy="16" r="8" fill="url(#goalGradMid)" />
              <circle cx="16" cy="16" r="6.5" fill="hsl(145,60%,96%)" />
              {/* Inner ring */}
              <circle cx="16" cy="16" r="5" fill="url(#goalGradInner)" />
              <circle cx="16" cy="16" r="3.5" fill="hsl(145,60%,96%)" />
              {/* Bullseye */}
              <circle cx="16" cy="16" r="2.2" fill="url(#goalBullseye)" />
              {/* 3D highlight on bullseye */}
              <ellipse cx="15.3" cy="15" rx="1" ry="0.7" fill="white" opacity="0.5" />
              {/* Arrow shaft */}
              <line x1="16" y1="16" x2="25" y2="7" stroke="hsl(0,75%,48%)" strokeWidth="1.8" strokeLinecap="round" />
              {/* Arrow tip */}
              <polygon points="25.5,5.5 27,7 25,8.5 23.5,7" fill="hsl(0,75%,48%)" />
              {/* Arrow fletching */}
              <line x1="24.2" y1="7.8" x2="26" y2="9.5" stroke="hsl(0,65%,55%)" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="24.2" y1="7.8" x2="22.5" y2="6" stroke="hsl(0,65%,55%)" strokeWidth="1.2" strokeLinecap="round" />
              {/* 3D shine */}
              <ellipse cx="12" cy="12" rx="4" ry="2.5" fill="white" opacity="0.15" transform="rotate(-30 12 12)" />
              <defs>
                <radialGradient id="goalGradOuter" cx="40%" cy="35%">
                  <stop offset="0%" stopColor="hsl(142,76%,56%)" />
                  <stop offset="100%" stopColor="hsl(142,71%,38%)" />
                </radialGradient>
                <radialGradient id="goalGradMid" cx="40%" cy="35%">
                  <stop offset="0%" stopColor="hsl(142,76%,56%)" />
                  <stop offset="100%" stopColor="hsl(142,71%,40%)" />
                </radialGradient>
                <radialGradient id="goalGradInner" cx="40%" cy="35%">
                  <stop offset="0%" stopColor="hsl(142,76%,52%)" />
                  <stop offset="100%" stopColor="hsl(142,71%,36%)" />
                </radialGradient>
                <radialGradient id="goalBullseye" cx="40%" cy="35%">
                  <stop offset="0%" stopColor="hsl(0,80%,58%)" />
                  <stop offset="100%" stopColor="hsl(0,75%,42%)" />
                </radialGradient>
              </defs>
            </svg>
          </div>
          <span className="text-[12.5px] text-foreground leading-[1.45] font-medium">{serviceGoal}</span>
        </div>

        {/* Details expand — between goal and tier picker */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 mb-3 text-t4 text-[11.5px] font-medium cursor-pointer transition-colors hover:text-primary self-start"
        >
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          <span>{t("card.details")}</span>
        </button>

        <div className={`overflow-hidden transition-all duration-400 ease-out ${expanded ? "max-h-[420px] opacity-100 mb-3" : "max-h-0 opacity-0"}`}>
          <div className="space-y-2.5 pb-1">
            {service.info
              .filter((section) => section.kind !== "goal") /* skip goal — already shown above */
              .map((section, i) => {
                const sectionLabel = t(`info.${section.kind}`);
                const isContentList = section.kind === "content";
                const sectionText = !isContentList ? t(`service.${service.id}.info.${section.kind}`) : undefined;
                const contentItems = isContentList ? tList(t, `service.${service.id}.info.content`) : undefined;
                const textKey = `service.${service.id}.info.${section.kind}`;
                if (!isContentList && sectionText === textKey) return null;
                if (isContentList && (!contentItems || contentItems.length === 0)) return null;

                return (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-primary">{sectionLabel}</span>
                    {isContentList && contentItems ? (
                      <ul className="list-none p-0 m-0 flex flex-col gap-0.5">
                        {contentItems.map((item, j) => (
                          <li key={j} className="text-[11.5px] text-t2 leading-snug pl-3 relative before:content-['›'] before:absolute before:left-0 before:text-primary before:font-bold">
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-[12px] text-t2 leading-relaxed">{sectionText}</span>
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        {/* Tier Picker */}
        <div className="rounded-2xl p-1.5 mb-4" style={{
          background: 'hsl(220 14% 96%)',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.04)',
        }}>
          <div className="grid grid-cols-3 gap-1">
            {service.tiers.map((tierItem, i) => (
              <button
                key={i}
                onClick={() => handleTierChange(i)}
                className={`flex flex-col items-center py-2.5 px-2 rounded-xl cursor-pointer transition-all duration-200 select-none ${
                  i === activeTier ? "" : "hover:bg-card/60"
                }`}
                style={i === activeTier ? {
                  background: 'hsl(0 0% 100%)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)',
                  border: '1px solid hsl(142 71% 42% / 0.25)',
                } : undefined}
              >
                <span className={`text-[11px] font-semibold leading-none mb-1.5 transition-colors ${
                  i === activeTier ? "text-primary font-bold" : "text-t4"
                }`}>
                  {tierItem.name}
                </span>
                <span className={`text-[16px] font-extrabold leading-none transition-colors ${
                  i === activeTier ? "text-foreground" : "text-t3"
                }`}>
                  {tierItem.price}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className={`transition-opacity duration-150 mb-3 ${fading ? "opacity-0" : "opacity-100"}`}>
          {features.map((feat, i) => {
            const tierFeatText = t(`service.${service.id}.tier.${activeTier}.${i}`);
            return (
              <div key={`${activeTier}-${i}`} className="flex items-center gap-3 py-2">
                <FeatureIcon icon={feat.icon} />
                <span className="text-[13px] text-t2 leading-snug [&>b]:text-foreground [&>b]:font-semibold" dangerouslySetInnerHTML={{ __html: tierFeatText }} />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-auto pt-2 pb-4">
          <button
            onClick={handleAdd}
            className={`block w-full rounded-2xl text-[14px] font-bold py-3.5 px-6 text-center relative overflow-hidden transition-all duration-300 ${
              isOrdered
                ? "bg-green-light text-green-text ring-[1.5px] ring-green-border"
                : "text-primary-foreground gradient-shine hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98]"
            }`}
            style={!isOrdered ? {
              background: 'linear-gradient(135deg, hsl(142, 76%, 46%) 0%, hsl(152, 60%, 36%) 100%)',
              boxShadow: '0 8px 28px -4px rgba(22, 163, 74, 0.45), 0 2px 6px rgba(22, 163, 74, 0.2)',
            } : undefined}
          >
            {isOrdered ? t("card.inCart") : `${t("card.add")} ${tier.name} — ${tier.price}`}
          </button>
        </div>
      </div>
    </div>
  );
}
