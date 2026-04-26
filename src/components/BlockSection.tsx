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
      {/* Block Header — premium minimal, tightly grouped */}
      <div className="category-header-static flex items-center gap-2.5 mb-8 pl-5">
        {IconComponent && (
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ring-1 ring-primary/20"
            style={{
              background: 'linear-gradient(135deg, hsl(142, 76%, 48% / 0.20), hsl(142, 76%, 48% / 0.08))',
            }}
          >
            <IconComponent
              className="w-[16px] h-[16px] text-primary-dark"
              strokeWidth={2.25}
              style={{ fill: 'hsl(142 76% 48% / 0.18)' }}
            />
          </div>
        )}
        <h2 className="category-title-static text-[15px] sm:text-[17px] leading-[20px] sm:leading-[22px] font-semibold text-foreground">{blockTitle}</h2>
        <span className="text-[11px] font-bold text-primary-foreground bg-primary px-2 rounded-full tabular-nums leading-none inline-flex items-center justify-center min-w-[20px] h-[18px]">{cards.length}</span>
        <div className="flex-1 h-px bg-gradient-to-r from-border/60 to-transparent ml-1" />
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
