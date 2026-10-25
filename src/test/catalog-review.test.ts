import { describe, expect, it } from "vitest";
import { services } from "@/data/services";
import profiles from "@/data/catalogReviewProfiles.json";
import { catalogReview } from "@/data/catalogReview";
import { translations } from "@/i18n/translations";
import priceBaseline from "./catalog-prices.fixture.json";
import { parseCatalogPrice, structuredTierOffer } from "@/lib/catalogPricing";
import { refreshLegacyText } from "@/data/catalogReview";
import { en } from "@/i18n/en";
import { de } from "@/i18n/de";
import { uk } from "@/i18n/uk";

describe("Autumn 2026 catalog requirements", () => {
  it("reserves HOT exclusively for the five new researched offers", () => {
    expect(services.filter((s) => s.hot).map((s) => s.id)).toEqual([...catalogReview.newOfferIds]);
    expect(services.filter((s) => !s.hot)).toHaveLength(47);
  });
  it("reviews every existing offer and preserves the 52 unique service routes", () => {
    expect(Object.keys(profiles)).toHaveLength(47);
    expect(services).toHaveLength(52);
    expect(new Set(services.map((s) => s.id)).size).toBe(52);
    expect(services.find((s) => s.id === "landing-page")?.tiers.map((t) => t.price)).toEqual(["99 €", "349 €", "690 €"]);
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
  it("matches the approved October 2026 price grid and leaves all new prices quote-only", () => {
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
  it("prices MVP-on-Demand by spec size with no per-character surcharge", () => {
    const rawDescriptions = [en["service.mvp-on-demand.info.description"], de["service.mvp-on-demand.info.description"], uk["service.mvp-on-demand.info.description"]];
    const rawSubtitles = [en["service.mvp-on-demand.subtitle"], de["service.mvp-on-demand.subtitle"], uk["service.mvp-on-demand.subtitle"]];
    for (const text of [...rawDescriptions, ...rawSubtitles]) {
      expect(text).not.toMatch(/0[.,]08/);
      expect(text).not.toMatch(/per character|per symbol|за символ|Zeichengebühr|pro Zeichen/i);
    }
    expect(rawDescriptions[0]).toMatch(/assessed individually/i);
    expect(rawDescriptions[1]).toMatch(/individuell bewertet/i);
    expect(rawDescriptions[2]).toMatch(/оцінюється індивідуально/i);
    for (const locale of ["en", "de", "uk"] as const) {
      const description = translations["service.mvp-on-demand.info.description"][locale];
      expect(description).not.toMatch(/0[.,]08/);
      expect(description).toMatch(/confirmed before the order is placed|vor Auftragsbestätigung|до підтвердження замовлення/i);
    }
    expect(translations["service.mvp-on-demand.info.description"].en).toMatch(/assessed individually/i);
    expect(translations["service.mvp-on-demand.info.description"].de).toMatch(/individuell bewertet/i);
    expect(translations["service.mvp-on-demand.info.description"].uk).toMatch(/оцінюється індивідуально/i);
  });
});