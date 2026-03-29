import { useRef, useState, useEffect } from "react";
import type { Block, ServiceCard } from "@/data/services";
import ServiceCardComponent from "./ServiceCardComponent";
import { useLanguage } from "@/i18n/LanguageContext";
import { Printer, Monitor, Palette, PenLine, Mail, Clapperboard, Megaphone, TrendingUp } from "lucide-react";

const blockIcons: Record<string, React.ElementType> = {
  b1: Printer,
  b2: Monitor,
  b3: Palette,
  b4: PenLine,
  b5: Mail,
  b6: Clapperboard,
  b7: Megaphone,
  b8: TrendingUp,
};

interface BlockSectionProps {
  block: Block;
  cards: ServiceCard[];
  orderedNames: Set<string>;
  onAddToCart: (id: string, emoji: string, price: string, tierName: string) => void;
}

export default function BlockSection({ block, cards, orderedNames, onAddToCart }: BlockSectionProps) {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (cards.length === 0) return null;

  const blockTitle = t(`block.${block.id}.title`);
  const IconComponent = blockIcons[block.id];

  return (
    <section ref={sectionRef} className="mb-24">
      {/* Block Header */}
      <div className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="inline-flex items-center gap-5">
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-primary/30" />
          <div className="w-10 h-10 rounded-xl bg-primary/[.06] border border-primary/[.12] flex items-center justify-center">
            {IconComponent && <IconComponent className="w-[18px] h-[18px] text-primary" strokeWidth={1.7} />}
          </div>
          <h2 className="text-lg font-bold text-foreground tracking-[0.14em] uppercase">{blockTitle}</h2>
          <div className="w-6 h-6 rounded-full bg-primary/[.06] flex items-center justify-center">
            <span className="text-[11px] font-bold text-primary">{cards.length}</span>
          </div>
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-primary/30" />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(272px,1fr))] gap-7 items-start">
        {cards.map((card, i) => (
          <div
            key={card.id}
            className={`transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: visible ? `${i * 80}ms` : "0ms" }}
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
