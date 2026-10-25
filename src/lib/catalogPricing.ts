/** Parse only a complete integer EUR price; quote markers and ranges are not prices. */
export function parseCatalogPrice(display: string): number | null {
  const match = display.trim().match(/^(\d+|\d{1,3}(?:[ .\u00a0\u202f]\d{3})+)\s*€$/);
  if (!match) return null;
  const amount = Number(match[1].replace(/[ .\u00a0\u202f]/g, ""));
  return Number.isSafeInteger(amount) && amount >= 0 ? amount : null;
}

export function structuredTierOffer(tier: { name: string; price: string }) {
  const price = parseCatalogPrice(tier.price);
  return {
    "@type": "Offer",
    name: tier.name,
    ...(price === null ? {} : { price, priceCurrency: "EUR", priceSpecification: { "@type": "PriceSpecification", price, priceCurrency: "EUR" } }),
  };
}