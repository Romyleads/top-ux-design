import { useState } from "react";
import { 
  ChevronDown, BarChart3, BookOpen, Package, FileText, Globe, Clapperboard, 
  Smartphone, Image, Pencil, CreditCard, PackageOpen, BookMarked, PenLine, 
  Trophy, GraduationCap, Mail, Droplets, Newspaper, Video, Home, Star, 
  Crosshair, Target, RefreshCw, Rocket, Theater, Bot, Map, Briefcase, Zap, Gamepad2, 
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
      className={`rounded-2xl overflow-hidden flex flex-col relative transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] group border ${
        isOrdered 
          ? "ring-[2.5px] ring-primary glow-green border-primary/30" 
          : "border-border/40 hover:border-primary/20"
      }`}
      style={{ 
        background: 'rgba(255,255,255,0.95)',
        boxShadow: '0 4px 32px -8px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      {isOrdered && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center z-20 shadow-lg">
          ✓
        </div>
      )}

      {/* Photo — larger, with overlay */}
      <div className="relative h-[180px] overflow-hidden flex-shrink-0">
        <img
          src={service.photo}
          alt={serviceName}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.6) 100%)'
        }} />
        
        {/* Title overlay on photo */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-[2]">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-9 h-9 rounded-xl bg-card/90 backdrop-blur-sm border border-border/30 flex items-center justify-center shadow-lg">
              {SvcIcon ? <SvcIcon className="w-[18px] h-[18px] text-primary" strokeWidth={1.8} /> : <span className="text-lg">{service.emoji}</span>}
            </div>
            <h3 className="text-lg font-extrabold text-white leading-tight tracking-tight drop-shadow-lg">{serviceName}</h3>
          </div>
          <p className="text-[13px] text-white/75 leading-snug pl-[46px]">{serviceSubtitle}</p>
        </div>

        {/* HOT badge */}
        {service.hot && (
          <span className="absolute top-3 left-3 z-[2] bg-amber text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider animate-pulse-subtle inline-flex items-center gap-1 shadow-lg">
            <Flame className="w-3 h-3" strokeWidth={2.5} /> HOT
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-4 pt-4 flex-1 flex flex-col">
        {/* Goal */}
        <div className="flex items-start gap-2.5 rounded-xl px-3.5 py-3 mb-4" style={{
          background: 'linear-gradient(135deg, hsl(142 76% 48% / 0.08), hsl(160 70% 50% / 0.04))',
          border: '1px solid hsl(142 71% 42% / 0.15)',
        }}>
          <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-[1px]">
            <Crosshair className="w-3.5 h-3.5 text-primary" strokeWidth={2.2} />
          </div>
          <span className="text-[12.5px] text-t1 leading-snug font-semibold">{serviceGoal}</span>
        </div>

        {/* Tier Picker — prominent */}
        <div className="grid grid-cols-3 bg-secondary/80 rounded-xl p-1 gap-1 mb-4">
          {service.tiers.map((tierItem, i) => (
            <button
              key={i}
              onClick={() => handleTierChange(i)}
              className={`flex flex-col items-center py-2.5 px-1 rounded-lg cursor-pointer transition-all duration-200 select-none ${
                i === activeTier
                  ? "bg-card shadow-md border border-primary/30"
                  : "hover:bg-card/50"
              }`}
            >
              <span className={`text-[11px] font-semibold leading-none mb-1.5 transition-colors ${i === activeTier ? "text-primary font-bold" : "text-t4"}`}>
                {tierItem.name}
              </span>
              <span className={`text-base font-extrabold leading-none transition-colors ${i === activeTier ? "text-foreground" : "text-t3"}`}>
                {tierItem.price}
              </span>
            </button>
          ))}
        </div>

        {/* Features */}
        <div className={`transition-opacity duration-150 mb-3 ${fading ? "opacity-0" : "opacity-100"}`}>
          {features.map((feat, i) => {
            const tierFeatText = t(`service.${service.id}.tier.${activeTier}.${i}`);
            return (
              <div key={`${activeTier}-${i}`} className="flex items-center gap-2.5 py-[6px] border-b border-border/30 last:border-b-0">
                <FeatureIcon icon={feat.icon} />
                <span className="text-[12px] text-t3 leading-snug [&>b]:text-t2 [&>b]:font-semibold" dangerouslySetInnerHTML={{ __html: tierFeatText }} />
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="mt-auto pt-2 pb-3">
          <button
            onClick={handleAdd}
            className={`block w-full rounded-xl text-sm font-bold py-3.5 px-5 text-center relative overflow-hidden transition-all duration-200 ${
              isOrdered
                ? "bg-green-light text-green-text ring-[1.5px] ring-green-border"
                : "gradient-primary text-primary-foreground shadow-green gradient-shine hover:-translate-y-[1px] hover:shadow-green-hover active:translate-y-0 active:scale-[0.98]"
            }`}
          >
            {isOrdered ? t("card.inCart") : `${t("card.add")} ${tier.name} — ${tier.price}`}
          </button>
        </div>

        {/* Details toggle — at bottom */}
        <div className="border-t border-border/30 pt-2 pb-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-center gap-1.5 bg-transparent border-none text-t3 text-[12px] font-medium cursor-pointer transition-colors hover:text-primary"
          >
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
            <span>{t("card.details")}</span>
          </button>

          {/* Expandable section */}
          <div className={`overflow-hidden transition-all duration-400 ease-out ${expanded ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="pt-3">
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
                  <div key={i} className="flex flex-col gap-1 mb-3 last:mb-0">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-primary opacity-80">{sectionLabel}</span>
                    {isContentList && contentItems ? (
                      <ul className="list-none p-0 m-0 flex flex-col gap-0.5">
                        {contentItems.map((item, j) => (
                          <li key={j} className="text-[11.5px] text-t3 leading-snug pl-3 relative before:content-['›'] before:absolute before:left-0 before:text-primary before:font-bold">
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
        </div>
      </div>
    </div>
  );
}
