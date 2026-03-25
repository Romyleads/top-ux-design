

## Plan: Extract All Remaining Hardcoded Ukrainian into i18n

### Summary
Add `kind` field to `InfoSection` interface, extract all info section content and tier feature strings into 3 language files (`uk.ts`, `en.ts`, `de.ts`), and wire up `ServiceCardComponent.tsx` to use `t()` for everything.

### Files to Create

**`src/i18n/uk.ts`** — ~700 keys, fully populated with Ukrainian content extracted from `services.ts`:
- 4 info label keys: `info.description`, `info.content`, `info.goal`, `info.formats`
- Per service (34 services): `service.{id}.info.description`, `service.{id}.info.goal`, `service.{id}.info.formats`, `service.{id}.info.content.0` through `.N`
- Per service per tier (34 × 3 tiers × 4 features): `service.{id}.tier.0.0` through `service.{id}.tier.2.3`

**`src/i18n/en.ts`** — identical key structure, all values `""`

**`src/i18n/de.ts`** — identical key structure, all values `""`

### Files to Edit

**`src/data/services.ts`**
- Add `kind` field to `InfoSection` interface:
```ts
export interface InfoSection {
  kind: "description" | "content" | "goal" | "formats";
  label: string;
  text?: string;
  items?: string[];
  type: "text" | "list";
}
```
- Add `kind` to every info section object in all 34 services (map "Опис"→`"description"`, "Зміст"→`"content"`, "Мета"→`"goal"`, "Формати"→`"formats"`)

**`src/i18n/translations.ts`**
- Import `uk`, `en`, `de` from the new files
- Merge them into the existing `translations` object:
```ts
import { uk } from "./uk";
import { en } from "./en";
import { de } from "./de";

// After existing translations object, merge:
Object.keys(uk).forEach(key => {
  translations[key] = { uk: uk[key], en: en[key] || "", de: de[key] || "" };
});
```

**`src/components/ServiceCardComponent.tsx`**
- Add `tList` helper function:
```ts
function tList(t: (key: string) => string, prefix: string): string[] {
  const result: string[] = [];
  for (let i = 0; i < 20; i++) {
    const val = t(`${prefix}.${i}`);
    if (val === `${prefix}.${i}`) break;
    result.push(val);
  }
  return result;
}
```
- In the info sections rendering, replace `section.label` with `t("info." + section.kind)` using the new `kind` field
- Replace `section.text` with `t("service.{id}.info.{kind}")` for text-type sections
- Replace `section.items` with `tList(t, "service.{id}.info.content")` for list-type sections
- Replace `feat.text` with `t("service.{id}.tier.{tierIdx}.{featIdx}")` — render via `dangerouslySetInnerHTML` as before to preserve `<b>` tags and `·` separators

### Key Counts
- 4 info label keys
- 34 services × ~4 info text keys = ~136 keys
- 34 services × variable content items (avg ~5) = ~170 keys  
- 34 services × 3 tiers × 4 features = 408 keys
- **Total: ~718 new keys**

### Constraints Honored
- `kind` field used instead of label-text mapping
- Consistent naming: `info.description` not `desc`, `info.goal` not `goalText`
- `tList` helper with key-miss detection (no hardcoded loop count)
- All HTML markup (`<b>`, `·`) preserved exactly in tier feature strings
- `services.ts` data unchanged except adding `kind`
- EN/DE files are empty-string mirrors ready to fill later
- Ukrainian UI remains visually identical (fallback chain: locale → uk → key)

