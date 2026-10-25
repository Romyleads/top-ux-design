# Catalog rules

- Keep offer IDs, images and price tiers stable when refreshing content, so existing links and selected offers remain compatible.
- Store reviewed multilingual offer content and tool mappings in a dedicated catalog review module; apply it to both catalog data and translation keys so cards, details, search and checkout use the same revision.
- Apply catalog audit overrides before deriving service fallback/search text, so corrected localized scopes cannot coexist with stale raw claims.
- Parse only complete integer EUR price strings with the shared catalog pricing helper; quote-only tiers have no numeric structured price and mixed carts identify partial totals.
- Record research sources with a verification date and distinguish observed product capabilities from unverified release dates.