import { useState, useMemo, useCallback } from "react";
import { services, blocks } from "@/data/services";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/i18n/LanguageContext";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import FilterBar from "@/components/FilterBar";
import BlockSection from "@/components/BlockSection";
import CartFab from "@/components/CartFab";
import CartDrawer from "@/components/CartDrawer";
import SocialProof from "@/components/SocialProof";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeBlock, setActiveBlock] = useState("all");
  const cart = useCart();
  const { t } = useLanguage();

  const orderedIds = useMemo(() => {
    const ids = new Set<string>();
    cart.items.forEach((item) => ids.add(item.id));
    return ids;
  }, [cart.items]);

  const filteredServices = useMemo(() => {
    let result = services;
    if (activeBlock !== "all") {
      result = result.filter((s) => s.blockId === activeBlock);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((s) => {
        const translatedName = t(`service.${s.id}.name`);
        const translatedSubtitle = t(`service.${s.id}.subtitle`);
        const translatedGoal = t(`service.${s.id}.goal`);
        const searchable = [
          s.name, s.subtitle, s.tag, translatedName, translatedSubtitle, translatedGoal,
          ...s.info.flatMap((i) => [i.text || "", ...(i.items || [])]),
          ...s.tierFeatures.flat().map((f) => f.text),
        ].join(" ").toLowerCase();
        return searchable.includes(q);
      });
    }
    return result;
  }, [searchQuery, activeBlock, t]);

  const groupedByBlock = useMemo(() => {
    const groups: Record<string, typeof services> = {};
    filteredServices.forEach((s) => {
      if (!groups[s.blockId]) groups[s.blockId] = [];
      groups[s.blockId].push(s);
    });
    return groups;
  }, [filteredServices]);

  const handleAddToCart = useCallback(
    (id: string, emoji: string, price: string, tierName: string) => {
      const serviceName = t(`service.${id}.name`);
      cart.addItem({ id, name: serviceName, emoji, price, tierName });
    },
    [cart.addItem, t]
  );

  const handleSearch = useCallback((q: string) => setSearchQuery(q), []);
  const handleFilter = useCallback((blockId: string) => { setActiveBlock(blockId); setSearchQuery(""); }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />

      {/* Premium top accent bar */}
      <div className="h-1 w-full gradient-primary relative z-10" />

      <div className="max-w-[1320px] mx-auto px-7 max-sm:px-3.5 relative z-10">
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          resultCount={searchQuery ? filteredServices.length : undefined}
        />
        <StatsBar />
        <FilterBar activeBlock={activeBlock} onFilter={handleFilter} />

        {blocks
          .filter((b) => activeBlock === "all" || b.id === activeBlock)
          .map((block) => (
            <BlockSection
              key={block.id}
              block={block}
              cards={groupedByBlock[block.id] || []}
              orderedNames={orderedIds}
              onAddToCart={handleAddToCart}
            />
          ))}

        {filteredServices.length === 0 && (
          <div className="text-center py-16 text-t4 text-[15px] animate-fade-in">
            {t("search.nothingFor")} «{searchQuery}»
          </div>
        )}

        <footer className="border-t border-border py-8 mt-20 text-center text-t4 text-[13px]">
          © 2026 {t("footer.copy")}
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
