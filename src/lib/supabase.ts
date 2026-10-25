import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Points to the owner's self-hosted backend. When not configured, the portal
// shows a "not connected yet" notice instead of failing.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const backendConfigured = Boolean(url && key);
export const supabase: SupabaseClient | null = backendConfigured ? createClient(url!, key!) : null;

export const ORDER_STATUSES = ["new", "invoiced", "paid", "completed", "cancelled"] as const;
export const SUBSCRIPTION_STATUSES = ["active", "paused", "cancelled"] as const;
export const INVOICE_STATUSES = ["draft", "issued", "paid", "overdue", "cancelled"] as const;
export const TICKET_STATUSES = ["open", "in_progress", "waiting_client", "closed"] as const;

export const formatCents = (cents: number | null | undefined, currency = "EUR") =>
  cents == null ? "—" : new Intl.NumberFormat("de-DE", { style: "currency", currency }).format(cents / 100);
