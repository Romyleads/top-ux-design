import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { ORDER_STATUSES, SUBSCRIPTION_STATUSES, TICKET_STATUSES } from "@/lib/supabase";

const sql = readFileSync("selfhost/migrations/0001_client_portal.sql", "utf8");
const enumValues = (name: string) =>
  [...(sql.match(new RegExp(`create type public\\.${name} as enum \\(([^)]*)\\)`))?.[1] ?? "").matchAll(/'([^']+)'/g)].map((m) => m[1]);

describe("client portal schema", () => {
  it("order statuses: new, invoiced, paid, completed, cancelled", () => {
    expect(enumValues("order_status")).toEqual(["new", "invoiced", "paid", "completed", "cancelled"]);
    expect([...ORDER_STATUSES]).toEqual(enumValues("order_status"));
  });
  it("subscription statuses: active, paused, cancelled", () => {
    expect([...SUBSCRIPTION_STATUSES]).toEqual(enumValues("subscription_status"));
  });
  it("ticket statuses: open, in_progress, waiting_client, closed", () => {
    expect([...TICKET_STATUSES]).toEqual(enumValues("ticket_status"));
  });
  it("roles are client and admin only", () => {
    expect(enumValues("app_role").sort()).toEqual(["admin", "client"]);
  });
  it("every portal table has row-level security", () => {
    for (const t of ["profiles", "user_roles", "orders", "order_items", "subscriptions", "invoices", "payments", "tickets", "ticket_messages", "files"]) {
      expect(sql).toContain(`alter table public.${t} enable row level security`);
    }
  });
});
