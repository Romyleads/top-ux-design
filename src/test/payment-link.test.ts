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
    expect(url.searchParams.get("cartVersion")).toBe("1");
    expect(JSON.parse(url.searchParams.get("cart") ?? "[]")).toEqual([
      { serviceId: "google-maps", tierId: "start", plan: "google_maps_start", quantity: 2 },
    ]);
  });
  it("preserves every cart selection and quantity without passing trusted prices", () => {
    const url = new URL(buildCartCabinetUrl([
      { id: "presentation", tierName: "Lite", price: "69 €", qty: 2 },
      { id: "brochure", tierName: "Pro", price: "149 €", qty: 1 },
    ]) ?? "http://invalid");
    expect(JSON.parse(url.searchParams.get("cart") ?? "[]")).toEqual([
      { serviceId: "presentation", tierId: "lite", plan: "presentation_lite", quantity: 2 },
      { serviceId: "brochure", tierId: "pro", plan: "brochure_pro", quantity: 1 },
    ]);
    expect(url.searchParams.has("plan")).toBe(false);
  });
  it("keeps separate tiers of one service and replaces stale selection parameters", () => {
    const url = new URL(buildCartCabinetUrl([
      { id: "brochure", tierName: "Lite", price: "69 €", qty: 1 },
      { id: "brochure", tierName: "Standard", price: "199 €", qty: 3 },
    ], "https://cabinet.example/account?lang=de&plan=old&quantity=9&cart=old&cartVersion=0") ?? "http://invalid");
    expect(url.searchParams.get("lang")).toBe("de");
    expect(url.searchParams.has("plan")).toBe(false);
    expect(url.searchParams.has("quantity")).toBe(false);
    expect(url.searchParams.get("cartVersion")).toBe("1");
    const selections = JSON.parse(url.searchParams.get("cart") ?? "[]");
    expect(selections.map((item: { tierId: string; quantity: number }) => [item.tierId, item.quantity])).toEqual([["lite", 1], ["standard", 3]]);
    expect(selections.every((item: object) => !('price' in item) && !('email' in item))).toBe(true);
  });
  it("rejects missing identifiers and noninteger quantities", () => {
    const item = { id: "brochure", tierName: "Lite", price: "69 €", qty: 1 };
    expect(buildCartCabinetUrl([{ ...item, id: "" }])).toBeNull();
    expect(buildCartCabinetUrl([{ ...item, tierName: "" }])).toBeNull();
    expect(buildCartCabinetUrl([{ ...item, qty: 1.5 }])).toBeNull();
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
