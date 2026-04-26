import { useRef, useState, useEffect } from "react";
import type { Block, ServiceCard } from "@/data/services";
import ServiceCardComponent from "./ServiceCardComponent";
import { useLanguage } from "@/i18n/LanguageContext";
import { Printer, Monitor, Palette, PenLine, Mail, Clapperboard, Megaphone, TrendingUp } from "lucide-react";

const blockIcons: Record<string, React.ElementType> = {
  b1: Printer, b2: Monitor, b3: Palette, b4: PenLine,
  b5: Mail, b6: Clapperboard, b7: Megaphone, b8: TrendingUp,
};

interface BlockSectionProps {
  block: Block;
  cards: ServiceCard[];
  orderedNames: Set<string>;
  onAddToCart: (id: string, emoji: string, price: string, tierName: string) => void;
  disableReveal?: boolean;
}

export default function BlockSection({ block, cards, orderedNames, onAddToCart, disableReveal = false }: BlockSectionProps) {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (disableReveal) return;
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [disableReveal]);

  if (cards.length === 0) return null;

  const blockTitle = t(`block.${block.id}.title`);
  const IconComponent = blockIcons[block.id];
  const isVisible = disableReveal || visible;

  return (
    <section ref={sectionRef} className="mb-20">
      {/* Block Header — premium, oversized */}
      <div className={`flex items-center gap-3.5 mb-10 pl-5 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        {IconComponent && (
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, hsl(142 76% 48% / 0.14), hsl(142 76% 48% / 0.04))',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 4px 14px -6px hsl(142 71% 42% / 0.25)',
            }}
          >
            <IconComponent className="w-[22px] h-[22px] text-primary" strokeWidth={2} />
          </div>
        )}
        <h2
          className="text-[32px] md:text-[38px] font-black text-foreground leading-none"
          style={{
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            letterSpacing: '-0.035em',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
            background: 'linear-gradient(180deg, hsl(220 25% 10%) 0%, hsl(220 25% 28%) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {blockTitle}
        </h2>
        <span
          className="text-[12px] font-bold text-primary-foreground tabular-nums leading-none inline-flex items-center justify-center min-w-[26px] h-[24px] px-2 rounded-full ml-2"
          style={{
            background: 'linear-gradient(135deg, hsl(142 76% 46%), hsl(152 60% 36%))',
            boxShadow: '0 4px 12px -3px hsl(142 71% 42% / 0.45), inset 0 1px 0 rgba(255,255,255,0.25)',
          }}
        >
          {cards.length}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-border/70 via-border/30 to-transparent ml-4" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 items-stretch">
        {cards.map((card, i) => (
          <div
            key={card.id}
            className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: isVisible ? `${i * 60}ms` : "0ms" }}
          >
            <ServiceCardComponent
              service={card}
              isOrdered={orderedNames.has(card.id)}
              onAddToCart={onAddToCart}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
