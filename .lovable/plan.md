

## Plan: Fix i18n, Update Branding, Dynamic Marketing Background

### 1. Fix Language Switching for Block Titles

**Problem:** When switching languages, block titles/subtitles may not update reactively. The `BlockSection` and `FilterBar` components use a redundant fallback pattern that could cause issues.

**Fix:**
- Simplify the translation logic in `BlockSection.tsx` and `FilterBar.tsx` to always use `t()` directly without the `!== key` fallback pattern
- Ensure `useLanguage()` hook triggers re-renders correctly on locale change
- Update `SocialProof.tsx` to also translate city names and person names for EN/DE locales
- Add any missing translation keys

**Files:** `BlockSection.tsx`, `FilterBar.tsx`, `SocialProof.tsx`, `translations.ts`

### 2. Update Footer Branding

**Change:** Replace footer text from "Офер Концепти · Маркетингові матеріали" to "PROMOVISIONS.COM MARKETING" with (c) 2026.

**Files:** `translations.ts` (update `footer.copy` for all 3 languages), `Index.tsx` (ensure year is 2026 or uses the translation directly)

### 3. Dynamic Marketing-Themed Background Animation

**Replace** the current simple floating gradient orbs with a rich, marketing-themed animated background featuring:

- **Floating SVG icons** — clocks, growth charts, metrics, bar graphs, trend arrows, target icons — rendered as semi-transparent, slowly drifting elements with varying sizes, rotation, and opacity
- **Animated growth lines** — subtle rising trend lines that draw themselves across the background
- **Particle-like metrics** — small floating numbers (%, +, arrows) that drift upward
- All elements at very low opacity (3-8%) so they don't compete with content

**Implementation:**
- Create `src/components/AnimatedBackground.tsx` — a full-screen fixed component with ~15-20 floating SVG marketing icons, each with unique animation (CSS keyframes for drift, rotate, fade)
- Add new keyframes in `tailwind.config.ts`: `drift-up`, `drift-diagonal`, `rotate-slow`, `pulse-fade`
- Replace the current 3 orb divs in `Index.tsx` with the new `AnimatedBackground` component
- Keep some gradient orbs but add the marketing icons on top

**Files to create:** `src/components/AnimatedBackground.tsx`
**Files to edit:** `Index.tsx`, `tailwind.config.ts`, `translations.ts`, `BlockSection.tsx`, `FilterBar.tsx`

