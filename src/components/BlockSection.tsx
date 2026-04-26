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
      {/* Block Header — premium minimal */}
      <div className={`flex items-center gap-4 mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{
          background: 'linear-gradient(135deg, hsl(142, 76%, 48% / 0.12), hsl(142, 76%, 48% / 0.04))',
          boxShadow: '0 0 0 1px hsl(142 76% 48% / 0.1)',
        }}>
          {IconComponent && <IconComponent className="w-[18px] h-[18px] text-primary" strokeWidth={1.7} />}
        </div>
        <h2 className="text-xl font-extrabold text-foreground tracking-tight">{blockTitle}</h2>
        <span className="text-[11px] font-bold text-primary bg-primary/[.07] px-2.5 py-1 rounded-full">{cards.length}</span>
        <div className="flex-1 bg-gradient-to-r from-border/60 to-transparent" style={{ height: '1px', maxHeight: '1px', minHeight: '1px', flexShrink: 0 }} />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 items-start">
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
