import { useParams, Link } from "react-router-dom";
import { services, blocks } from "@/data/services";
import { useLanguage } from "@/i18n/LanguageContext";
import { useCart } from "@/hooks/useCart";
import SEOHead from "@/components/SEOHead";
import ServiceCardComponent from "@/components/ServiceCardComponent";
import CartFab from "@/components/CartFab";
import CartDrawer from "@/components/CartDrawer";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const { t, locale } = useLanguage();
  const cart = useCart();

  const block = blocks.find((b) => b.id === id);
  const categoryServices = useMemo(() => services.filter((s) => s.blockId === id), [id]);
  const orderedIds = useMemo(() => new Set(cart.items.map((i) => i.id)), [cart.items]);

  if (!block) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <h1 className="text-2xl font-bold">Category not found</h1>
      </div>
    );
  }

  const title = t(`block.${block.id}.title`);
  const subtitle = t(`block.${block.id}.subtitle`);

  const handleAddToCart = (id: string, emoji: string, price: string, tierName: string) => {
    cart.addItem({ id, name: t(`service.${id}.name`), emoji, price, tierName });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${title} — PromoVisions`}
        description={`${subtitle}. ${categoryServices.length} ${t("block.concepts")}.`}
        path={`/category/${block.id}`}
      />

      <div className="max-w-[1320px] mx-auto px-7 max-sm:px-3.5">
        {/* Breadcrumb */}
        <nav className="pt-6 pb-2">
          <ol className="flex items-center gap-1.5 text-[12px] text-t3" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to={`/${locale}`} className="hover:text-primary transition-colors" itemProp="item">
                <span itemProp="name">PromoVisions</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <ChevronRight className="w-3 h-3 text-t4" />
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-foreground font-medium" itemProp="name">{title}</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        <Link to={`/${locale}`} className="inline-flex items-center gap-1.5 text-[13px] text-t3 hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          {locale === "uk" ? "Назад до каталогу" : locale === "de" ? "Zurück zum Katalog" : "Back to catalog"}
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[32px] font-black text-foreground mb-2">{block.icon} {title}</h1>
          <p className="text-[15px] text-t2">{subtitle}</p>
          <p className="text-[13px] text-t4 mt-1">{categoryServices.length} {t("block.concepts")}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-16">
          {categoryServices.map((service) => (
            <ServiceCardComponent
              key={service.id}
              service={service}
              isOrdered={orderedIds.has(service.id)}
              onAddToCart={handleAddToCart}
            />
          ))}
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
