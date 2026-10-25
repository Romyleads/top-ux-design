# Catalog rules

- Keep offer IDs, images and price tiers stable when refreshing content, so existing links and selected offers remain compatible.
- Store reviewed multilingual offer content and tool mappings in a dedicated catalog review module; apply it to both catalog data and translation keys so cards, details, search and checkout use the same revision.
- Apply catalog audit overrides before deriving service fallback/search text, so corrected localized scopes cannot coexist with stale raw claims.
- Parse only complete integer EUR price strings with the shared catalog pricing helper; quote-only tiers have no numeric structured price and mixed carts identify partial totals.
- Record research sources with a verification date and distinguish observed product capabilities from unverified release dates.
# Client portal

- The client portal targets the owner's self-hosted Supabase stack: schema lives in `selfhost/migrations`, server functions in `selfhost/functions`, and the browser connects only via `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY`, so the project can move servers without code changes.
- Roles live in `user_roles` and every portal table is protected by RLS via `has_role`; clients may only create `new` orders and `open` tickets, while status changes, invoices and payments are admin-only.
- Status values in `src/lib/supabase.ts` must mirror the SQL enums (covered by `src/test/portal-schema.test.ts`).
- Legal page texts live in `src/data/legal.ts` with bracketed owner placeholders; the German text is binding.
# Payments

- Payments run only in the owner's external cabinet (Node.js + Stripe on their server); this site only redirects to `CABINET_URL` (`src/config/payment.ts`, overridable by `VITE_CABINET_URL`) with `?plan=<service>_<tier>`, and reads `?payment=success|cancelled` on return. Never add Lovable built-in payments, Stripe keys or webhooks here.
- The shared cart uses selection → validated contacts → inline payment steps, with no payment popup or shortcut, so all catalog pages follow one checkout path. Single selections use `plan` plus `quantity`; multiple selections use a JSON `cart` array of `{plan, quantity}`. The external cabinet must support that handoff and resolve authoritative prices; quote-containing carts request an agreed price instead of charging a partial total. Contact data is not placed in payment URLs.
