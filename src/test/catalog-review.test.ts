import { describe, expect, it } from "vitest";
import { services } from "@/data/services";
import profiles from "@/data/catalogReviewProfiles.json";
import { catalogReview } from "@/data/catalogReview";
import { translations } from "@/i18n/translations";
import priceBaseline from "./catalog-prices.fixture.json";
import { parseCatalogPrice, structuredTierOffer } from "@/lib/catalogPricing";
import { refreshLegacyText } from "@/data/catalogReview";

describe("Autumn 2026 catalog requirements", () => {
  it("reserves HOT exclusively for the five new researched offers", () => {
    expect(services.filter((s) => s.hot).map((s) => s.id)).toEqual([...catalogReview.newOfferIds]);
    expect(services.filter((s) => !s.hot)).toHaveLength(47);
  });
  it("reviews every existing offer and preserves the 52 unique service routes", () => {
    expect(Object.keys(profiles)).toHaveLength(47);
    expect(services).toHaveLength(52);
    expect(new Set(services.map((s) => s.id)).size).toBe(52);
    expect(services.find((s) => s.id === "landing-page")?.tiers.map((t) => t.price)).toEqual(["99 €", "199 €", "399 €"]);
  });
  it("has complete reviewed content and tool purposes in English, German and Ukrainian", () => {
    for (const service of services) {
      const keys = ["name", "subtitle", "goal", "info.description", "info.goal", "info.formats", ...Array.from({ length: 4 }, (_, i) => `info.content.${i}`)].map((k) => `service.${service.id}.${k}`);
      service.tierFeatures.forEach((tier, ti) => tier.forEach((_, fi) => keys.push(`service.${service.id}.tier.${ti}.${fi}`)));
      service.tools?.forEach((_, i) => keys.push(`tool.${service.id}.${i}.purpose`));
      for (const key of keys) for (const locale of ["en", "de", "uk"] as const) expect(translations[key]?.[locale]?.trim(), `${key} / ${locale}`).toBeTruthy();
      expect(service.tools?.length).toBeGreaterThanOrEqual(1);
      expect(service.tools?.length).toBeLessThanOrEqual(4);
    }
  });
  it("uses the requested September–October 2026 review edition", () => {
    expect(catalogReview.period).toBe("September–October 2026");
    expect(catalogReview.checkedOn).toBe("2026-10-25");
  });
  it("preserves every existing tier price and leaves all new prices quote-only", () => {
    for (const [id, prices] of Object.entries(priceBaseline)) expect(services.find((s) => s.id === id)?.tiers.map((t) => t.price)).toEqual(prices);
    for (const id of catalogReview.newOfferIds) expect(services.find((s) => s.id === id)?.tiers.map((t) => t.price)).toEqual(["—", "—", "—"]);
  });
  it("never publishes a dash as a structured numeric price", () => {
    expect(structuredTierOffer({ name: "Start", price: "—" })).toEqual({ "@type": "Offer", name: "Start" });
    expect(structuredTierOffer({ name: "Max", price: "1 199 €" })).toMatchObject({ price: 1199, priceSpecification: { price: 1199, priceCurrency: "EUR" } });
  });
  it("parses complete integer EUR prices and rejects quote markers, ranges and decimals", () => {
    expect(parseCatalogPrice("1 199 €")).toBe(1199);
    expect(parseCatalogPrice("1.199 €")).toBe(1199);
    for (const price of ["—", "99–199 €", "99.50 €", "from 99 €", "2026 quote"]) expect(parseCatalogPrice(price)).toBeNull();
  });
  it("has identical numeric scopes and deadlines across all three languages", () => {
    for (const [key, value] of Object.entries(translations)) {
      if (!/^service\..*\.tier\./.test(key)) continue;
      const numbers = (text: string) => text.replace(/(\d)[ ,.]([\d]{3})(?!\d)/g, "$1$2").match(/\d+/g) ?? [];
      expect(numbers(value.de), key).toEqual(numbers(value.en));
      expect(numbers(value.uk), key).toEqual(numbers(value.en));
    }
  });
  it("keeps raw search and fallback content aligned with audited Ukrainian content", () => {
    for (const service of services) {
      expect(service.name).toBe(translations[`service.${service.id}.name`].uk);
      service.tierFeatures.forEach((tier, ti) => tier.forEach((feature, fi) => expect(feature.text).toBe(translations[`service.${service.id}.tier.${ti}.${fi}`].uk)));
    }
  });
  it("normalizes names without duplicating Kling or silently switching vendors", () => {
    expect(refreshLegacyText("Kling VIDEO 3.0")).toBe("Kling VIDEO 3.0");
    expect(refreshLegacyText("Sora / Midjourney v7 / Google Antigravity / Manus AI")).toBe("Sora / Midjourney / Google Antigravity / Manus AI");
  });
});