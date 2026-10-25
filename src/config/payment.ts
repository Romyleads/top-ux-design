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
