import { describe, expect, it } from "vitest";
import { canContinueToPayment } from "@/lib/cartCheckout";

describe("contacts before payment", () => {
  const contact = { name: "Test Client", email: "client@example.com", consent: true };
  it("allows payment after valid contacts for a nonempty cart", () => {
    expect(canContinueToPayment(contact, 1)).toBe(true);
  });
  it("requires name, valid email and consent before payment", () => {
    expect(canContinueToPayment({ ...contact, name: " " }, 1)).toBe(false);
    expect(canContinueToPayment({ ...contact, email: "invalid" }, 1)).toBe(false);
    expect(canContinueToPayment({ ...contact, consent: false }, 1)).toBe(false);
  });
  it("does not advance an empty cart", () => {
    expect(canContinueToPayment(contact, 0)).toBe(false);
  });
});