import { useState } from "react";
import { 
  ChevronDown, BarChart3, BookOpen, Package, FileText, Globe, Clapperboard, 
  Smartphone, Image, Pencil, CreditCard, PackageOpen, BookMarked, PenLine, 
  Trophy, GraduationCap, Mail, Droplets, Newspaper, Video, Home, Star, 
  Target, RefreshCw, Rocket, Theater, Bot, Map, Briefcase, Zap, Gamepad2, 
  Mic, Printer, Monitor, Palette, Megaphone, Flame
} from "lucide-react";
import type { ServiceCard } from "@/data/services";
import FeatureIcon from "./FeatureIcon";
import { useLanguage } from "@/i18n/LanguageContext";

// Premium Lucide icons per service
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

// Premium Lucide icons per tag
const tagIcons: Record<string, React.ElementType> = {
  "tag.print": Printer, "tag.digital": Monitor, "tag.branding": Palette,
  "tag.content": PenLine, "tag.email": Mail, "tag.video": Clapperboard,
  "tag.ads": Megaphone, "tag.trend": Flame,
};

// Map raw Ukrainian tags to translation keys
const tagKeyMap: Record<string, string> = {
  "🖨 Друкована": "tag.print", "💻 Цифрова": "tag.digital", "🎨 Брендинг": "tag.branding",
  "📝 Контент": "tag.content", "📧 Email": "tag.email", "🎬 Відео": "tag.video",
  "📢 Реклама": "tag.ads", "🔥 Тренд": "tag.trend",
};

function tList(t: (key: string) => string, prefix: string): string[] {
  const result: string[] = [];
  for (let i = 0; i < 20; i++) {
    const key = `${prefix}.${i}`;
    const val = t(key);
    if (val === key) break; // key not found, stop
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
  const serviceTag = t(tagKeyMap[service.tag] || service.tag);

  const handleAdd = () => {
    onAddToCart(service.id, service.emoji, tier.price, tier.name);
  };

  return (
    <div
      className={`glass-strong rounded-2xl overflow-hidden flex flex-col relative shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover hover:scale-[1.015] group border border-border/50 ${
        isOrdered ? "ring-[2.5px] ring-primary glow-green" : ""
      }`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {isOrdered && (
        <div className="absolute top-[11px] right-[11px] w-[22px] h-[22px] rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center z-10 shadow-green">
          ✓
        </div>
      )}

      {/* Photo */}
      <div className="relative h-[130px] overflow-hidden flex-shrink-0 bg-border">
        <img
          src={service.photo}
          alt={serviceName}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[550ms] ease-out group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/55" />
        <span className="absolute bottom-[9px] right-[10px] z-[2] bg-card/[.88] backdrop-blur-lg text-t2 text-[10px] font-semibold px-[9px] py-[3px] rounded-full inline-flex items-center gap-1">
          {(() => { const TagIcon = tagIcons[tagKeyMap[service.tag] || ""]; return TagIcon ? <TagIcon className="w-3 h-3" strokeWidth={2} /> : null; })()}
          {serviceTag}
        </span>
        {service.hot && (
          <span className="absolute top-[10px] left-[10px] z-[2] bg-amber text-primary-foreground text-[9.5px] font-bold px-[9px] py-[3px] rounded-full tracking-wider animate-pulse-subtle inline-flex items-center gap-1">
            <Flame className="w-3 h-3" strokeWidth={2.5} /> HOT
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-4 relative">
        <div className="w-[46px] h-[46px] bg-card rounded-xl shadow-[0_4px_16px_rgba(15,23,42,0.14)] border-[1.5px] border-card flex items-center justify-center text-[22px] -mt-[23px] mb-2.5 relative z-[5] transition-all duration-200 group-hover:shadow-[0_6px_22px_rgba(15,23,42,0.18)] group-hover:-translate-y-[1px]">
          {service.emoji}
        </div>
        <h3 className="text-[17px] font-extrabold text-foreground leading-[1.15] tracking-tight mb-[3px]">{serviceName}</h3>
        <p className="text-xs text-t4 leading-snug mb-1.5">{serviceSubtitle}</p>

        {/* Goal */}
        <div className="flex items-start gap-1.5 bg-primary/[.06] border border-primary/[.12] rounded-lg px-2.5 py-2 mb-1">
          <span className="text-primary text-[11px] mt-[1px] flex-shrink-0">🎯</span>
          <span className="text-[11px] text-t2 leading-snug font-medium">{serviceGoal}</span>
        </div>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1 bg-transparent border-none pt-[3px] text-primary-dark text-[11.5px] font-semibold cursor-pointer transition-opacity hover:opacity-70 mb-[2px]"
        >
          <span>{t("card.details")}</span>
          <ChevronDown className={`w-[11px] h-[11px] transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
        </button>

        {/* Expandable section */}
        <div className={`overflow-hidden transition-all duration-400 ease-out ${expanded ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="pt-2 pb-1.5 border-t border-secondary mt-1.5">
            {service.info.map((section, i) => {
              const sectionLabel = t(`info.${section.kind}`);
              const isContentList = section.kind === "content";
              
              // For text sections, look up translation
              const sectionText = section.kind !== "content"
                ? t(`service.${service.id}.info.${section.kind}`)
                : undefined;
              
              // For content list, use tList helper
              const contentItems = isContentList
                ? tList(t, `service.${service.id}.info.content`)
                : undefined;

              // Skip if translated value is the key itself (no translation)
              const textKey = `service.${service.id}.info.${section.kind}`;
              if (!isContentList && sectionText === textKey) return null;
              if (isContentList && (!contentItems || contentItems.length === 0)) return null;

              return (
                <div key={i} className="flex flex-col gap-[3px] mb-2.5 last:mb-0">
                  <span className="text-[9.5px] font-bold tracking-wider uppercase text-primary-dark opacity-75">{sectionLabel}</span>
                  {isContentList && contentItems ? (
                    <ul className="list-none p-0 m-0 flex flex-col gap-0.5">
                      {contentItems.map((item, j) => (
                        <li key={j} className="text-[11px] text-t3 leading-snug pl-3 relative before:content-['›'] before:absolute before:left-0 before:text-primary before:font-bold">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-[11.5px] text-t2 leading-relaxed">{sectionText}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tier Picker */}
      <div className="grid grid-cols-3 bg-secondary rounded-[11px] p-[3px] mx-4 mt-3 gap-[2px]">
        {service.tiers.map((tierItem, i) => (
          <button
            key={i}
            onClick={() => handleTierChange(i)}
            className={`flex flex-col items-center py-2 px-1 rounded-[7px] cursor-pointer transition-all duration-200 select-none ${
              i === activeTier
                ? "bg-card border border-primary/40 shadow-sm"
                : "hover:bg-foreground/[.03]"
            }`}
          >
            <span className={`text-[10.5px] font-semibold leading-none mb-[5px] transition-colors ${i === activeTier ? "text-primary-dark font-bold" : "text-t4"}`}>
              {tierItem.name}
            </span>
            <span className={`text-[15px] font-extrabold leading-none transition-colors ${i === activeTier ? "text-foreground" : "text-t3"}`}>
              {tierItem.price}
            </span>
          </button>
        ))}
      </div>

      {/* Features */}
      <div className={`px-4 pt-[2px] transition-opacity duration-150 ${fading ? "opacity-0" : "opacity-100"}`}>
        {features.map((feat, i) => {
          const tierFeatText = t(`service.${service.id}.tier.${activeTier}.${i}`);
          return (
            <div key={`${activeTier}-${i}`} className="flex items-center gap-2.5 py-[7px]">
              <FeatureIcon icon={feat.icon} />
              <span className="text-xs text-t3 leading-snug [&>b]:text-t2 [&>b]:font-semibold" dangerouslySetInnerHTML={{ __html: tierFeatText }} />
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="px-4 pt-2.5 pb-3.5 mt-auto">
        <button
          onClick={handleAdd}
          className={`block w-full rounded-[14px] text-[13.5px] font-bold py-[13px] px-5 text-center relative overflow-hidden transition-all duration-200 ${
            isOrdered
              ? "bg-green-light text-green-text ring-[1.5px] ring-green-border"
              : "gradient-primary text-primary-foreground shadow-green gradient-shine hover:-translate-y-[2px] hover:shadow-green-hover hover:brightness-[1.04] active:translate-y-0 active:scale-[0.98]"
          }`}
        >
          {isOrdered ? t("card.inCart") : `${t("card.add")} ${tier.name} — ${tier.price}`}
        </button>
      </div>
    </div>
  );
}
