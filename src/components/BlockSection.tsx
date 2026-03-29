import { useRef, useState, useEffect } from "react";
import type { Block, ServiceCard } from "@/data/services";
import ServiceCardComponent from "./ServiceCardComponent";
import { useLanguage } from "@/i18n/LanguageContext";

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
  const blockSubtitle = t(`block.${block.id}.subtitle`);

  return (
    <section ref={sectionRef} className="mb-16">
      {/* Block Header */}
      <div className={`flex items-center gap-4 mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-border/60" />
        <h2 className="text-[17px] font-bold text-foreground tracking-tight whitespace-nowrap">
          {block.icon} {blockTitle}
        </h2>
        <span className="text-[11px] font-medium text-t3 bg-muted/60 px-2 py-0.5 rounded-full">
          {cards.length}
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-border/60" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(272px,1fr))] gap-[22px] items-start">
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
