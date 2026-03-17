

## Plan: Premium Redesign with WOW Effects + 3-Language Support (UK/EN/DE)

### 1. Internationalization System

**Create `src/i18n/translations.ts`** — a structured translations object with keys for all UI strings across 3 languages (uk, en, de). Covers: hero section, filter bar labels, block titles/subtitles, stats bar labels, cart drawer (all labels, form fields, buttons), social proof text, service card UI (buttons, "details", goal label), footer.

**Create `src/i18n/LanguageContext.tsx`** — React context + provider with `locale` state (default `uk`), `t(key)` helper function, and `setLocale`. Persists choice to `localStorage`.

**Note on service data:** Service card content (name, subtitle, goal, descriptions, features) stays in Ukrainian only — translating 34 full cards x3 languages would be massive. Only UI chrome gets translated.

### 2. Language Switcher Component

**Create `src/components/LanguageSwitcher.tsx`** — a sleek pill-shaped toggle with 3 flags (🇺🇦 🇬🇧 🇩🇪) placed in the top-right of the hero area. Animated sliding indicator behind the active language. Smooth transitions on switch with a subtle scale effect.

### 3. StatsBar — Animated Counting Numbers

Upgrade `StatsBar.tsx` with:
- **Counting animation** using `useEffect` + `requestAnimationFrame` — numbers count up from 0 to target over ~1.5s with easing
- **Intersection Observer** to trigger only when scrolled into view
- Larger, bolder styling with gradient text on the primary stat
- Subtle decorative icons or sparkle accents

### 4. Premium Visual Enhancements

**`index.css` upgrades:**
- Subtle floating gradient orbs animation in the background (CSS `@keyframes float`)
- Glass-morphism effects on key UI elements
- Micro-interaction keyframes: `count-up`, `shimmer`, `float`

**`HeroSection.tsx` upgrades:**
- Animated gradient text on "Концепти" word (shimmer effect)
- Subtle floating decorative elements (blurred gradient circles)
- Badge with pulse animation

**`BlockSection.tsx`:**
- Staggered fade-in animation for cards (each card delays slightly)
- Intersection Observer to animate cards on scroll into view

**`ServiceCardComponent.tsx`:**
- Enhanced hover: slight 3D tilt or perspective shift
- Shimmer effect on CTA button

### 5. Wire Up Language Context

- Wrap `App.tsx` with `LanguageProvider`
- Update all components to use `useLanguage().t('key')` for UI text
- Add `LanguageSwitcher` to `HeroSection` or as a fixed top-bar element

### Files to Create
- `src/i18n/translations.ts`
- `src/i18n/LanguageContext.tsx`
- `src/components/LanguageSwitcher.tsx`

### Files to Edit
- `src/App.tsx` — wrap with LanguageProvider
- `src/pages/Index.tsx` — add LanguageSwitcher, use t() for footer
- `src/components/HeroSection.tsx` — animated gradient text, floating elements, t() for UI text
- `src/components/StatsBar.tsx` — animated counting numbers, t() for labels
- `src/components/FilterBar.tsx` — t() for "All" button
- `src/components/BlockSection.tsx` — staggered scroll animations, t() for "concepts" label
- `src/components/ServiceCardComponent.tsx` — enhanced hover effects, t() for button text
- `src/components/CartDrawer.tsx` — t() for all form labels/buttons
- `src/components/CartFab.tsx` — minor
- `src/components/SocialProof.tsx` — t() for notification text
- `src/index.css` — new keyframes (shimmer, float), gradient orb backgrounds
- `tailwind.config.ts` — new animation entries

