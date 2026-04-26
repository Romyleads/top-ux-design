import { useState, useMemo, useCallback, useEffect } from "react";
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
import SEOHead from "@/components/SEOHead";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeBlock, setActiveBlock] = useState("all");
  const cart = useCart();
  const { t } = useLanguage();

  useEffect(() => {
    const preloadImages = () => {
      services.forEach((service) => {
        const img = new Image();
        img.src = service.photo;
      });
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(preloadImages, { timeout: 1200 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(preloadImages, 250);
    return () => window.clearTimeout(timeoutId);
  }, []);

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
      const q = searchQuery.trim().toLowerCase();
      // Match only at the start of a standalone word.
      // Hyphenated fragments count as the same word, so "cat" won't match "eye-catching".
      const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const wordRe = new RegExp(`(?:^|[^\\p{L}\\p{N}-])${escaped}`, "iu");
      result = result.filter((s) => {
        const translatedName = t(`service.${s.id}.name`);
        const translatedSubtitle = t(`service.${s.id}.subtitle`);
        const translatedGoal = t(`service.${s.id}.goal`);
        const translatedInfo: string[] = [];
        s.info.forEach((section) => {
          if (section.kind === "content") {
            for (let i = 0; i < 20; i++) {
              const key = `service.${s.id}.info.content.${i}`;
              const val = t(key);
              if (val === key) break;
              translatedInfo.push(val);
            }
          } else {
            const val = t(`service.${s.id}.info.${section.kind}`);
            translatedInfo.push(val);
          }
        });
        const translatedTiers: string[] = [];
        s.tierFeatures.forEach((tier, ti) => {
          tier.forEach((_, fi) => {
            translatedTiers.push(t(`service.${s.id}.tier.${ti}.${fi}`));
          });
        });
        const searchable = [
          s.name, s.subtitle, s.tag, translatedName, translatedSubtitle, translatedGoal,
          ...s.info.flatMap((i) => [i.text || "", ...(i.items || [])]),
          ...s.tierFeatures.flat().map((f) => f.text),
          ...translatedInfo,
          ...translatedTiers,
        ].join(" ");
        return wordRe.test(searchable);
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
      <SEOHead
        title="PromoVisions — Ready-made Marketing Concepts"
        description={t("hero.subtitle")}
        path=""
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "PromoVisions",
          url: "https://promovisions.com",
        }}
      />
      {/* Dark hero zone with animated background */}
      <div className="relative">
        <AnimatedBackground />
        
        {/* Neon accent bar */}
        <div className="h-[2px] w-full relative z-10" style={{
          background: `linear-gradient(90deg, transparent 0%, hsl(142, 76%, 48%) 30%, hsl(160, 80%, 55%) 50%, hsl(142, 76%, 48%) 70%, transparent 100%)`,
          boxShadow: `0 0 20px rgba(74, 222, 128, 0.4), 0 0 60px rgba(74, 222, 128, 0.1)`
        }} />

        <div className="max-w-[1320px] mx-auto px-7 max-sm:px-3.5 relative z-10">
          <HeroSection
            searchQuery={searchQuery}
            onSearchChange={handleSearch}
            resultCount={searchQuery ? filteredServices.length : undefined}
          />
        </div>
      </div>

      {/* Content area — light background */}
      <div className="max-w-[1320px] mx-auto px-7 max-sm:px-3.5 relative z-10">
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
              disableReveal={Boolean(searchQuery.trim())}
            />
          ))}

        {filteredServices.length === 0 && (
          <div className="text-center py-16 text-t4 text-[15px] animate-fade-in">
            {t("search.nothingFor")} «{searchQuery}»
          </div>
        )}

        <footer className="relative mt-20 -mx-7 max-sm:-mx-3.5 px-7 max-sm:px-3.5 py-14 text-center overflow-hidden border-t border-primary/10" style={{
          background: `linear-gradient(180deg, hsl(220,14%,92%) 0%, hsl(145,20%,88%) 50%, hsl(150,18%,84%) 100%)`
        }}>
          {/* Soft glow */}
          <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full opacity-20" style={{
            background: `radial-gradient(ellipse, hsl(142, 71%, 65%) 0%, transparent 70%)`
          }} />
          {/* Top neon accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px]" style={{
            background: `linear-gradient(90deg, transparent 0%, hsl(142, 76%, 48%) 30%, hsl(160, 80%, 55%) 50%, hsl(142, 76%, 48%) 70%, transparent 100%)`,
            boxShadow: `0 0 12px rgba(74, 222, 128, 0.3)`
          }} />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2.5 mb-2">
              <div className="w-2 h-2 rounded-full gradient-primary animate-pulse-subtle" />
              <span className="text-primary-dark font-bold tracking-[0.2em] text-[15px]">PROMOVISIONS.COM</span>
            </div>
            <p className="text-t3 text-[12px] tracking-wide">© 2026 {t("footer.copy")}</p>
          </div>
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
