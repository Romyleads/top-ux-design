import { useState, useMemo, useCallback } from "react";
import { services, blocks } from "@/data/services";
import { useCart } from "@/hooks/useCart";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import FilterBar from "@/components/FilterBar";
import BlockSection from "@/components/BlockSection";
import CartFab from "@/components/CartFab";
import CartDrawer from "@/components/CartDrawer";
import SocialProof from "@/components/SocialProof";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeBlock, setActiveBlock] = useState("all");
  const cart = useCart();

  // Track ordered card base names
  const orderedNames = useMemo(() => {
    const names = new Set<string>();
    cart.items.forEach((item) => {
      // Extract base name from "Name (Tier)" format
      const match = item.name.match(/^(.+?)\s*\(/);
      if (match) names.add(match[1]);
    });
    return names;
  }, [cart.items]);

  // Filter logic
  const filteredServices = useMemo(() => {
    let result = services;
    if (activeBlock !== "all") {
      result = result.filter((s) => s.blockId === activeBlock);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((s) => {
        const searchable = [
          s.name,
          s.subtitle,
          s.tag,
          ...s.info.flatMap((i) => [i.text || "", ...(i.items || [])]),
          ...s.tierFeatures.flat().map((f) => f.text),
        ].join(" ").toLowerCase();
        return searchable.includes(q);
      });
    }
    return result;
  }, [searchQuery, activeBlock]);

  // Group by block
  const groupedByBlock = useMemo(() => {
    const groups: Record<string, typeof services> = {};
    filteredServices.forEach((s) => {
      if (!groups[s.blockId]) groups[s.blockId] = [];
      groups[s.blockId].push(s);
    });
    return groups;
  }, [filteredServices]);

  const handleAddToCart = useCallback(
    (name: string, emoji: string, price: string) => {
      cart.addItem({ name, emoji, price });
    },
    [cart.addItem]
  );

  const handleSearch = useCallback((q: string) => {
    setSearchQuery(q);
  }, []);

  const handleFilter = useCallback((blockId: string) => {
    setActiveBlock(blockId);
    setSearchQuery("");
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Premium top accent bar */}
      <div className="h-1 w-full gradient-primary" />

      <div className="max-w-[1320px] mx-auto px-7 max-sm:px-3.5">
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          resultCount={searchQuery ? filteredServices.length : undefined}
        />
        <StatsBar />
        <FilterBar activeBlock={activeBlock} onFilter={handleFilter} />

        {/* Blocks */}
        {blocks
          .filter((b) => activeBlock === "all" || b.id === activeBlock)
          .map((block) => (
            <BlockSection
              key={block.id}
              block={block}
              cards={groupedByBlock[block.id] || []}
              orderedNames={orderedNames}
              onAddToCart={handleAddToCart}
            />
          ))}

        {filteredServices.length === 0 && (
          <div className="text-center py-16 text-t4 text-[15px] animate-fade-in">
            Нічого не знайдено за запитом «{searchQuery}»
          </div>
        )}

        {/* Footer */}
        <footer className="border-t border-border py-8 mt-20 text-center text-t4 text-[13px]">
          © {new Date().getFullYear()} Офер Концепти · Маркетингові матеріали
        </footer>
      </div>

      <CartFab totalItems={cart.totalItems} onOpen={cart.openCart} />
      <SocialProof />
      <CartDrawer
        isOpen={cart.isOpen}
        items={cart.items}
        totalItems={cart.totalItems}
        totalPrice={cart.totalPrice}
        hasPrice={cart.hasPrice}
        formatEur={cart.formatEur}
        step={cart.step}
        setStep={cart.setStep}
        onClose={cart.closeCart}
        onChangeQty={cart.changeQty}
        onRemove={cart.removeItem}
        onClear={cart.clearCart}
      />
    </div>
  );
}
