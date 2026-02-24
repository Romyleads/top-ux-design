import type { Block, ServiceCard } from "@/data/services";
import ServiceCardComponent from "./ServiceCardComponent";

interface BlockSectionProps {
  block: Block;
  cards: ServiceCard[];
  orderedNames: Set<string>;
  onAddToCart: (name: string, emoji: string, price: string) => void;
}

export default function BlockSection({ block, cards, orderedNames, onAddToCart }: BlockSectionProps) {
  if (cards.length === 0) return null;

  return (
    <section className="mb-24 animate-fade-in">
      {/* Block Header */}
      <div className="text-center mb-10 relative">
        <span className="text-[34px] leading-none block mx-auto mb-3.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:scale-[1.08] hover:-translate-y-[2px]">
          {block.icon}
        </span>
        <span className="text-[26px] font-extrabold text-foreground tracking-tight leading-[1.1] block mb-1.5">{block.title}</span>
        <span className="text-sm text-t4 block">{block.subtitle}</span>
        <span className="inline-block mt-3.5 text-[11px] font-semibold text-primary-dark bg-gradient-to-br from-primary/[.08] to-primary/[.06] border border-primary/[.18] px-3 py-[3px] rounded-full tracking-wider">
          {cards.length} концептів
        </span>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mx-auto mt-3.5" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(272px,1fr))] gap-[22px] items-start">
        {cards.map((card) => (
          <ServiceCardComponent
            key={card.id}
            service={card}
            isOrdered={orderedNames.has(card.name)}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
