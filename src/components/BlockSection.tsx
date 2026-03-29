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
      <div className={`text-center mb-8 relative transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm border border-border/40 rounded-2xl px-6 py-3 mb-3 shadow-sm">
          <span className="text-[28px] leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
            {block.icon}
          </span>
          <div className="text-left">
            <span className="text-[22px] font-extrabold text-foreground tracking-tight leading-[1.1] block">{blockTitle}</span>
            <span className="text-xs text-t4 block">{blockSubtitle}</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-primary/30" />
          <span className="text-[10.5px] font-semibold text-primary-dark bg-primary/[.06] border border-primary/[.15] px-2.5 py-[2px] rounded-full tracking-wider">
            {cards.length} {t("block.concepts")}
          </span>
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-primary/30" />
        </div>
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
