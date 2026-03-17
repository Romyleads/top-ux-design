import { useRef, useState, useEffect } from "react";
import type { Block, ServiceCard } from "@/data/services";
import ServiceCardComponent from "./ServiceCardComponent";
import { useLanguage } from "@/i18n/LanguageContext";

interface BlockSectionProps {
  block: Block;
  cards: ServiceCard[];
  orderedNames: Set<string>;
  onAddToCart: (name: string, emoji: string, price: string) => void;
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

  const blockTitle = t(`block.${block.id}.title`) !== `block.${block.id}.title` ? t(`block.${block.id}.title`) : block.title;
  const blockSubtitle = t(`block.${block.id}.subtitle`) !== `block.${block.id}.subtitle` ? t(`block.${block.id}.subtitle`) : block.subtitle;

  return (
    <section ref={sectionRef} className="mb-24">
      {/* Block Header */}
      <div className={`text-center mb-10 relative transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <span className="text-[34px] leading-none block mx-auto mb-3.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:scale-[1.08] hover:-translate-y-[2px]">
          {block.icon}
        </span>
        <span className="text-[26px] font-extrabold text-foreground tracking-tight leading-[1.1] block mb-1.5">{blockTitle}</span>
        <span className="text-sm text-t4 block">{blockSubtitle}</span>
        <span className="inline-block mt-3.5 text-[11px] font-semibold text-primary-dark bg-gradient-to-br from-primary/[.08] to-primary/[.06] border border-primary/[.18] px-3 py-[3px] rounded-full tracking-wider">
          {cards.length} {t("block.concepts")}
        </span>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mx-auto mt-3.5" />
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
              isOrdered={orderedNames.has(card.name)}
              onAddToCart={onAddToCart}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
