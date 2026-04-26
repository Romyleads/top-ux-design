import { useParams, Link } from "react-router-dom";
import { services, blocks } from "@/data/services";
import { useLanguage } from "@/i18n/LanguageContext";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import FeatureIcon from "@/components/FeatureIcon";
import SEOHead from "@/components/SEOHead";
import ToolsStack from "@/components/ToolsStack";
import CartFab from "@/components/CartFab";
import CartDrawer from "@/components/CartDrawer";
import { ArrowLeft, ChevronRight } from "lucide-react";

function tList(t: (key: string) => string, prefix: string): string[] {
  const result: string[] = [];
  for (let i = 0; i < 20; i++) {
    const key = `${prefix}.${i}`;
    const val = t(key);
    if (val === key) break;
    result.push(val);
  }
  return result;
}

export default function ServicePage() {
  const { id } = useParams<{ id: string }>();
  const { t, locale } = useLanguage();
  const cart = useCart();
  const [activeTier, setActiveTier] = useState(0);

  const service = services.find((s) => s.id === id);
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <Link to={`/${locale}`} className="text-primary hover:underline">← Back to catalog</Link>
        </div>
      </div>
    );
  }

  const block = blocks.find((b) => b.id === service.blockId);
  const name = t(`service.${service.id}.name`);
  const subtitle = t(`service.${service.id}.subtitle`);
  const goal = t(`service.${service.id}.goal`);
  const tier = service.tiers[activeTier];
  const features = service.tierFeatures[activeTier] || [];

  const handleAdd = () => {
    cart.addItem({ id: service.id, name, emoji: service.emoji, price: tier.price, tierName: tier.name });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description: subtitle,
    provider: {
      "@type": "Organization",
      name: "PromoVisions",
      url: "https://promovisions.com",
    },
    offers: service.tiers.map((t) => ({
      "@type": "Offer",
      name: t.name,
      price: t.price.replace(/[^\d]/g, "") || undefined,
      priceCurrency: "EUR",
      priceSpecification: { "@type": "PriceSpecification", price: t.price },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${name} — PromoVisions`}
        description={`${subtitle}. ${goal}`}
        path={`/services/${service.id}`}
        type="product"
        jsonLd={jsonLd}
      />

      {/* Breadcrumb */}
      <nav className="max-w-[1000px] mx-auto px-6 pt-6 pb-2">
        <ol className="flex items-center gap-1.5 text-[12px] text-t3 flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link to={`/${locale}`} className="hover:text-primary transition-colors" itemProp="item">
              <span itemProp="name">PromoVisions</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <ChevronRight className="w-3 h-3 text-t4" />
          {block && (
            <>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to={`/${locale}/category/${block.id}`} className="hover:text-primary transition-colors" itemProp="item">
                  <span itemProp="name">{t(`block.${block.id}.title`)}</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              <ChevronRight className="w-3 h-3 text-t4" />
            </>
          )}
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <span className="text-foreground font-medium" itemProp="name">{name}</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <div className="max-w-[1000px] mx-auto px-6">
        <Link to={`/${locale}`} className="inline-flex items-center gap-1.5 text-[13px] text-t3 hover:text-primary transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          {locale === "uk" ? "Назад до каталогу" : locale === "de" ? "Zurück zum Katalog" : "Back to catalog"}
        </Link>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{
            boxShadow: '0 8px 40px -12px rgba(0,0,0,0.15)',
          }}>
            <img src={service.photo} alt={name} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <h1 className="text-[28px] font-black text-foreground leading-tight mb-2">{name}</h1>
            <p className="text-[15px] text-t2 mb-4 leading-relaxed">{subtitle}</p>

            {/* Goal */}
            <div className="flex items-start gap-3 p-4 rounded-xl mb-6" style={{ background: 'hsl(142 76% 48% / 0.06)', border: '1px solid hsl(142 76% 48% / 0.15)' }}>
              <span className="text-lg">🎯</span>
              <div>
                <div className="text-[11px] font-bold text-primary uppercase tracking-wider mb-1">
                  {t("card.goal")}
                </div>
                <p className="text-[13px] text-foreground leading-relaxed">{goal}</p>
              </div>
            </div>

            {/* Tier picker */}
            <div
              className="rounded-2xl p-1.5 mb-4"
              style={{
                background: 'linear-gradient(180deg, hsl(220 16% 95%) 0%, hsl(220 14% 97%) 100%)',
                border: '1px solid hsl(220 13% 88% / 0.7)',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04), inset 0 -1px 0 rgba(255,255,255,0.6)',
              }}
            >
              <div className="relative grid grid-cols-3 gap-0">
                {/* Soft glow under active */}
                <div
                  className="absolute -inset-y-1 rounded-2xl pointer-events-none transition-all duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                  style={{
                    left: `calc(${activeTier} * (100% / 3))`,
                    width: `calc(100% / 3)`,
                    background: 'radial-gradient(60% 70% at 50% 50%, hsl(142 76% 48% / 0.2), transparent 70%)',
                    filter: 'blur(8px)',
                  }}
                />
                {/* Sliding active indicator */}
                <div
                  className="absolute top-0 bottom-0 rounded-xl pointer-events-none transition-all duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                  style={{
                    left: `calc(${activeTier} * (100% / 3))`,
                    width: `calc(100% / 3)`,
                    background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(142 40% 99%) 100%)',
                    boxShadow:
                      '0 1px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 hsl(142 71% 42% / 0.08) inset, 0 4px 16px -2px hsl(142 71% 42% / 0.2), 0 2px 6px -1px rgba(0,0,0,0.06)',
                    border: '1px solid hsl(142 71% 42% / 0.28)',
                  }}
                />
                {service.tiers.map((tierItem, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTier(i)}
                    className="relative z-[1] flex flex-col items-center py-3 px-2 rounded-xl cursor-pointer select-none"
                  >
                    <span className={`text-[11px] font-semibold leading-none mb-1 tracking-wide uppercase transition-colors duration-300 ${i === activeTier ? "text-primary font-bold" : "text-t4"}`}>
                      {tierItem.name}
                    </span>
                    <span className={`text-[17px] font-extrabold leading-none transition-colors duration-300 ${i === activeTier ? "text-foreground" : "text-t3"}`}>
                      {tierItem.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2 mb-6">
              {features.map((feat, i) => {
                const tierFeatText = t(`service.${service.id}.tier.${activeTier}.${i}`);
                return (
                  <div key={i} className="flex items-center gap-2.5 py-1">
                    <FeatureIcon icon={feat.icon} />
                    <span className="text-[13px] text-t2" dangerouslySetInnerHTML={{ __html: tierFeatText }} />
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <button
              onClick={handleAdd}
              className="w-full rounded-xl text-[14px] font-bold py-3.5 text-primary-foreground transition-all hover:-translate-y-[1px] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, hsl(142, 76%, 46%) 0%, hsl(152, 60%, 36%) 100%)',
                boxShadow: '0 6px 20px -4px rgba(22, 163, 74, 0.4)',
              }}
            >
              {t("card.add")} {tier.name} — {tier.price}
            </button>
          </div>
        </div>

        {/* Detailed info sections */}
        <div className="pb-16">
          <div className="grid md:grid-cols-2 gap-6">
            {service.info
              .filter((section) => section.kind !== "goal")
              .map((section, i) => {
                const sectionLabel = t(`info.${section.kind}`);
                const isContentList = section.kind === "content";
                const sectionText = !isContentList ? t(`service.${service.id}.info.${section.kind}`) : undefined;
                const contentItems = isContentList ? tList(t, `service.${service.id}.info.content`) : undefined;

                return (
                  <div key={i} className="p-5 rounded-xl" style={{ background: 'hsl(220 14% 97%)', border: '1px solid hsl(220 13% 91% / 0.5)' }}>
                    <h3 className="text-[11px] font-bold tracking-[0.1em] uppercase text-primary mb-2.5">{sectionLabel}</h3>
                    {isContentList && contentItems ? (
                      <ul className="space-y-1.5">
                        {contentItems.map((item, j) => (
                          <li key={j} className="text-[13px] text-t2 pl-4 relative before:content-['›'] before:absolute before:left-0 before:text-primary before:font-bold">
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[13px] text-t2 leading-relaxed">{sectionText}</p>
                    )}
                  </div>
                );
              })}
          </div>

          {service.tools && service.tools.length > 0 && (
            <ToolsStack tools={service.tools} variant="page" />
          )}
        </div>
      </div>

      <CartFab totalItems={cart.totalItems} onOpen={cart.openCart} />
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
