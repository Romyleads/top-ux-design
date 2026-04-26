import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import goalIcon from "@/assets/goal-icon.png";
import { 
  ChevronDown, BarChart3, BookOpen, Package, FileText, Globe, Clapperboard, 
  Smartphone, Image, Pencil, CreditCard, PackageOpen, BookMarked, PenLine, 
  Trophy, GraduationCap, Mail, Droplets, Newspaper, Video, Home, Star, 
  Target, RefreshCw, Rocket, Theater, Bot, Map, Briefcase, Zap, Gamepad2, 
  Mic, Flame, Wallet, Send, Cpu, Blocks
} from "lucide-react";
import type { ServiceCard } from "@/data/services";
import FeatureIcon from "./FeatureIcon";
import ToolsStack from "./ToolsStack";
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
  "saas-builder": Wallet, "telegram-twa": Send, "ai-automation": Cpu, "nocode-mvp": Blocks,
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
  const mediaRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [shouldLoadImage, setShouldLoadImage] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { t, locale } = useLanguage();

  useEffect(() => {
    const mediaEl = mediaRef.current;
    if (!mediaEl) return;

    if (typeof IntersectionObserver !== "function") {
      setShouldLoadImage(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoadImage(true);
        observer.disconnect();
      },
      { rootMargin: "280px 0px", threshold: 0.01 }
    );

    observer.observe(mediaEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [service.photo]);

  useEffect(() => {
    if (!shouldLoadImage) return;
    const imgEl = imgRef.current;
    if (imgEl?.complete && imgEl.naturalWidth > 0) {
      setImageLoaded(true);
      setImageError(false);
    }
  }, [shouldLoadImage, service.photo]);

  const features = service.tierFeatures[activeTier] || [];
  const tier = service.tiers[activeTier];

  const handleTierChange = (idx: number) => {
    if (idx === activeTier) return;
    setActiveTier(idx);
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
      className={`service-card rounded-[20px] overflow-hidden flex flex-col relative transition-[box-shadow] duration-300 ease-out group ${
        isOrdered ? "ring-[2px] ring-primary glow-green" : ""
      }`}
      style={{ 
        background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(0 0% 99%) 100%)',
        boxShadow: isOrdered 
          ? '0 0 30px -8px rgba(34, 197, 94, 0.35)' 
          : '0 1px 2px rgba(0,0,0,0.04), 0 8px 32px -12px rgba(0,0,0,0.08)',
        border: '1px solid hsl(220 13% 91% / 0.5)',
      }}
      onMouseLeave={() => expanded && setExpanded(false)}
    >
      {isOrdered && (
        <div className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full gradient-primary text-primary-foreground text-xs font-bold flex items-center justify-center z-20" style={{
          boxShadow: '0 4px 12px rgba(34, 197, 94, 0.4)',
        }}>
          ✓
        </div>
      )}

      {/* Title + Subtitle — above photo. */}
      <div className="min-h-[88px] px-6 pt-5 pb-3 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-2">
          {SvcIcon ? (
            <span className="icon-premium w-[22px] h-[22px]">
              <SvcIcon size={20} strokeWidth={1.5} absoluteStrokeWidth />
            </span>
          ) : (
            <span className="text-base flex-shrink-0">{service.emoji}</span>
          )}
          <Link to={`/${locale}/services/${service.id}`} className="hover:text-primary transition-colors min-w-0 flex-1">
            <h3
              className="font-card-title text-[17px] text-foreground leading-[1.15] overflow-hidden transition-colors duration-300 group-hover:text-primary"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                fontKerning: 'normal',
                fontFeatureSettings: '"liga" 1, "kern" 1, "ss01" 1',
              }}
            >
              {serviceName}
            </h3>
          </Link>
        </div>
        <p
          className="text-[12px] text-t4 leading-relaxed overflow-hidden transition-colors duration-300 group-hover:text-t2"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {serviceSubtitle}
        </p>
      </div>

      {/* Photo with curved bottom mask */}
      <div ref={mediaRef} className="relative h-[140px] flex-shrink-0 overflow-hidden rounded-b-[28px] bg-muted/60">
        <div className={`absolute inset-0 transition-opacity duration-500 ${imageLoaded || imageError ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/40 to-background" />
          <div
            className="absolute inset-0 opacity-70"
            style={{ background: "radial-gradient(circle at top left, hsl(var(--primary) / 0.14), transparent 48%)" }}
          />
          {/* Shimmer sweep */}
          <div
            className="absolute inset-0 animate-skeleton-sweep"
            style={{
              background: "linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.55) 50%, transparent 100%)",
            }}
          />
        </div>
        {imageError && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: "radial-gradient(circle at 20% 20%, hsl(var(--primary) / 0.14), transparent 42%), linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted) / 0.78) 100%)",
            }}
          >
            <span className="text-[28px] opacity-60 select-none" aria-hidden="true">{service.emoji}</span>
          </div>
        )}
        <img
          ref={imgRef}
          src={shouldLoadImage ? service.photo : undefined}
          alt={serviceName}
          loading="eager"
          decoding="async"
          onLoad={() => {
            setImageLoaded(true);
            setImageError(false);
          }}
          onError={() => {
            setImageLoaded(false);
            setImageError(true);
          }}
          className={`absolute inset-0 block w-full h-full object-cover transition-[transform,opacity] duration-[600ms] ease-out group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          style={{ transform: "translateZ(0)" }}
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
      <div className="px-6 pt-4 flex-1 flex flex-col relative z-[1]">

        {/* Goal — fixed height for vertical alignment across cards */}
        <div className="flex h-[60px] items-start gap-2.5 mb-3 overflow-hidden">
          <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5">
            <img src={goalIcon} alt="" width={32} height={32} className="object-contain" />
          </div>
          <span
            className="text-[12px] text-t4 leading-relaxed overflow-hidden transition-colors duration-300 group-hover:text-t2"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {serviceGoal}
          </span>
        </div>

        {/* Details expand — between goal and tier picker */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 mb-4 text-t4 text-[11.5px] font-medium cursor-pointer transition-colors hover:text-primary self-start"
        >
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          <span>{t("card.details")}</span>
        </button>

        <div className={`grid transition-all duration-400 ease-out ${expanded ? "grid-rows-[1fr] opacity-100 mb-3" : "grid-rows-[0fr] opacity-0"}`} style={{ overflow: "hidden" }}>
          <div className="space-y-2.5 pb-1 min-h-0 overflow-hidden">
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
                    <span className="text-[10px] font-bold tracking-[0.1em] uppercase" style={{ color: 'hsl(0 84% 50%)' }}>{sectionLabel}</span>
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
            {service.tools && service.tools.length > 0 && (
              <ToolsStack tools={service.tools} variant="card" />
            )}
          </div>
        </div>

        {/* Tier Picker */}
        <div
          className="rounded-2xl p-1.5 mb-4"
          style={{
            background: 'hsl(220 15% 96%)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.08), inset 0 -1px 2px rgba(0,0,0,0.04)',
          }}
        >
          <div className="relative grid grid-cols-3 gap-0">
            {/* Sliding active indicator — clean, sharp */}
            <div
              className="absolute top-0 bottom-0 rounded-xl pointer-events-none transition-[left,transform,border-color] duration-500 will-change-transform"
              style={{
                left: `calc(${activeTier} * (100% / 3))`,
                width: `calc(100% / 3)`,
                background: 'hsl(0 0% 100%)',
                border: '1px solid hsl(142 71% 42% / 0.45)',
                transform: 'scale(1)',
              }}
            />
            {service.tiers.map((tierItem, i) => (
              <button
                key={i}
                onClick={() => handleTierChange(i)}
                className="relative z-[1] flex flex-col items-center py-2 px-1.5 rounded-xl cursor-pointer select-none transition-[color,transform,opacity] duration-300"
              >
                <span className={`text-[10px] font-semibold leading-none mb-1 tracking-wide uppercase transition-colors duration-300 ${
                  i === activeTier ? "text-primary font-bold" : "text-t4"
                }`}>
                  {tierItem.name}
                </span>
                <span className={`text-[15px] font-extrabold leading-none transition-colors duration-300 ${
                  i === activeTier ? "text-foreground" : "text-t3"
                }`}>
                  {tierItem.price}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div key={activeTier} className="mb-3 animate-switch-in">
          {features.map((feat, i) => {
            const tierFeatText = t(`service.${service.id}.tier.${activeTier}.${i}`);
            return (
            <div key={`${activeTier}-${i}`} className="flex items-center gap-2.5 py-0.5">
                <FeatureIcon icon={feat.icon} />
                <span className="text-[13px] text-t2 leading-snug [&>b]:font-semibold [&>b]:text-foreground" dangerouslySetInnerHTML={{ __html: feat.icon === "clock" ? tierFeatText.replace(/(\d+)/g, '<span style="color: hsl(0 84% 50%); font-weight: 700;">$1</span>') : tierFeatText }} />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-auto pb-4">
          <button
            onClick={handleAdd}
            className={`block w-full rounded-xl text-[13px] font-bold py-3 px-5 text-center relative overflow-hidden transition-all duration-300 ${
              isOrdered
                ? "bg-green-light text-green-text ring-[1.5px] ring-green-border"
                : "text-primary-foreground gradient-shine hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98]"
            }`}
            style={!isOrdered ? {
              background: 'linear-gradient(135deg, hsl(142, 76%, 46%) 0%, hsl(152, 60%, 36%) 100%)',
              boxShadow: '0 6px 20px -4px rgba(22, 163, 74, 0.4), 0 2px 4px rgba(22, 163, 74, 0.15)',
            } : undefined}
          >
            {isOrdered ? t("card.inCart") : `${t("card.add")} ${tier.name} — ${tier.price}`}
          </button>
        </div>
      </div>
    </div>
  );
}
