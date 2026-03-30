

## Fix hero subtitle: shorten text, remove dashes, hide on mobile

### Problem
- Long dash (—) in all 3 translations
- Text wraps to 2 lines despite available space (constrained by `max-w-[460px]`)
- On mobile this line is unnecessary clutter

### Changes

**1. `src/i18n/translations.ts`** — Shorten all 3 subtitle translations, remove long dashes:
- UK: `"Маркетингові концепти під ключ за 1‑7 днів"`
- EN: `"Marketing concepts delivered turnkey in 1‑7 days"`
- DE: `"Marketingkonzepte schlüsselfertig in 1‑7 Tagen"`

**2. `src/components/HeroSection.tsx`** line 71 — Remove `max-w-[460px]` constraint (text is now short enough), add `hidden sm:block` to hide on mobile:
```
<p className="hidden sm:block text-white/60 text-[13.5px] mx-auto mb-4 leading-relaxed font-medium whitespace-nowrap">
```

