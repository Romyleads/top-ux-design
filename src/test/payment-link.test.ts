import { describe, expect, it } from "vitest";
import { buildCabinetUrl, buildCartCabinetUrl, planSlug, CABINET_URL } from "@/config/payment";

describe("cabinet payment link", () => {
  it("defaults to the local cabinet address", () => {
    expect(CABINET_URL).toBe("http://localhost:3000/account");
  });
  it("builds plan slugs like google_maps_start", () => {
    expect(planSlug("google-maps", "Start")).toBe("google_maps_start");
  });
  it("appends the plan to the cabinet URL", () => {
    expect(buildCabinetUrl("google_maps_start", "http://localhost:3000/account")).toBe("http://localhost:3000/account?plan=google_maps_start");
  });
  it("returns null for an invalid cabinet address", () => {
    expect(buildCabinetUrl("x", "not a url")).toBeNull();
  });
  it("passes a single cart plan and its quantity", () => {
    const url = new URL(buildCartCabinetUrl([{ id: "google-maps", tierName: "Start", price: "69 €", qty: 2 }]) ?? "http://invalid");
    expect(url.searchParams.get("plan")).toBe("google_maps_start");
    expect(url.searchParams.get("quantity")).toBe("2");
  });
  it("preserves every cart selection and quantity without passing trusted prices", () => {
    const url = new URL(buildCartCabinetUrl([
      { id: "presentation", tierName: "Lite", price: "69 €", qty: 2 },
      { id: "brochure", tierName: "Pro", price: "149 €", qty: 1 },
    ]) ?? "http://invalid");
    expect(JSON.parse(url.searchParams.get("cart") ?? "[]")).toEqual([
      { plan: "presentation_lite", quantity: 2 }, { plan: "brochure_pro", quantity: 1 },
    ]);
    expect(url.searchParams.has("plan")).toBe(false);
  });
  it("does not charge a mixed cart with an unconfirmed quote", () => {
    expect(buildCartCabinetUrl([
      { id: "presentation", tierName: "Lite", price: "69 €", qty: 1 },
      { id: "mvp-on-demand", tierName: "Max", price: "—", qty: 1 },
    ])).toBeNull();
  });
  it("rejects empty carts, invalid quantities and unsafe URLs", () => {
    const item = { id: "brochure", tierName: "Lite", price: "69 €", qty: 1 };
    expect(buildCartCabinetUrl([])).toBeNull();
    expect(buildCartCabinetUrl([{ ...item, qty: 0 }])).toBeNull();
    expect(buildCartCabinetUrl([item], "javascript:alert(1)")).toBeNull();
  });
});
