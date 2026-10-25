import { describe, expect, it } from "vitest";
import { services } from "@/data/services";
import profiles from "@/data/catalogReviewProfiles.json";
import { catalogReview } from "@/data/catalogReview";
import { translations } from "@/i18n/translations";

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
});