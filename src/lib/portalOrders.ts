import { supabase } from "@/lib/supabase";
import { parseCatalogPrice } from "@/lib/catalogPricing";
import type { CartItem } from "@/hooks/useCart";

/** Saves the cart as an order for the signed-in client. Returns false when not signed in or on error. */
export async function saveCartAsOrder(items: CartItem[], titleOf: (i: CartItem) => string, note: string): Promise<boolean> {
  if (!supabase || !items.length) return false;
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return false;
  const priced = items.map((i) => ({ i, eur: parseCatalogPrice(i.price) }));
  const total = priced.every((p) => p.eur !== null) ? priced.reduce((s, p) => s + (p.eur as number) * 100 * p.i.qty, 0) : null;
  const { data: order, error } = await supabase.from("orders")
    .insert({ user_id: auth.user.id, total_cents: total, note: note.slice(0, 2000) || null }).select("id").single();
  if (error || !order) return false;
  const { error: itemsError } = await supabase.from("order_items").insert(priced.map(({ i, eur }) => ({
    order_id: order.id, service_id: i.id, tier_name: i.tierName, title: titleOf(i),
    unit_price_cents: eur === null ? null : eur * 100, quantity: i.qty,
  })));
  return !itemsError;
}
