import { describe, expect, it } from "vitest";
import { buildCabinetUrl, planSlug, CABINET_URL } from "@/config/payment";

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
});
