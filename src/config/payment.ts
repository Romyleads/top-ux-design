import { parseCatalogPrice } from "@/lib/catalogPricing";

// Payments are handled by the owner's external cabinet (Node.js + Stripe on their own server).
// This site never talks to Stripe: it only redirects to CABINET_URL with the chosen plan.
// Change the address via VITE_CABINET_URL in .env or the fallback below.
export const CABINET_URL: string =
  (import.meta.env.VITE_CABINET_URL as string | undefined) || "http://localhost:3000/account";

/** "google-maps" + "Start" -> "google_maps_start" */
export function planSlug(serviceId: string, tierName: string): string {
  return `${serviceId}_${tierName}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

/** Returns the cabinet link with ?plan=..., or null when the configured address is invalid. */
export function buildCabinetUrl(plan: string, base: string = CABINET_URL): string | null {
  try {
    const url = new URL(base);
    url.searchParams.set("plan", plan);
    return url.toString();
  } catch {
    return null;
  }
}

export interface CabinetCartSelection {
  serviceId: string;
  tierId: string;
  plan: string;
  quantity: number;
}

/** Existing nonlocalized tier names are the source of cabinet tier IDs. */
export function tierId(tierName: string): string {
  return tierName.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

/** Version 1: selections only, never customer data or authoritative prices. */
export function buildCartCabinetUrl(
  items: readonly { id: string; tierName: string; qty: number; price: string }[],
  base: string = CABINET_URL,
): string | null {
  if (!items.length || items.some((item) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id) || !tierId(item.tierName) || parseCatalogPrice(item.price) === null || !Number.isSafeInteger(item.qty) || item.qty < 1)) return null;
  try {
    const url = new URL(base);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    url.searchParams.delete("plan");
    url.searchParams.delete("quantity");
    url.searchParams.delete("cart");
    const selections: CabinetCartSelection[] = items.map((item) => ({
      serviceId: item.id,
      tierId: tierId(item.tierName),
      plan: planSlug(item.id, item.tierName),
      quantity: item.qty,
    }));
    url.searchParams.set("cartVersion", "1");
    url.searchParams.set("cart", JSON.stringify(selections));
    if (selections.length === 1) {
      url.searchParams.set("plan", selections[0].plan);
      url.searchParams.set("quantity", String(selections[0].quantity));
    }
    return url.toString();
  } catch {
    return null;
  }
}
