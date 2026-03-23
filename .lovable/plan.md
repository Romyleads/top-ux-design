

## Plan: Translate Service Cards & Fix Cart Language

### Problem
1. **Card content** (name, subtitle, goal, tag) is hardcoded in Ukrainian in `services.ts` — doesn't change when switching languages
2. **Cart items** store the Ukrainian display name — stays Ukrainian regardless of locale

### Solution

#### 1. Add translation keys for all 34 service cards (`translations.ts`)

Add ~170 new keys following the pattern:
```
"service.presentation.name": { uk: "Презентація", en: "Presentation", de: "Präsentation" },
"service.presentation.subtitle": { uk: "Переконлива слайд-колода...", en: "Compelling slide deck...", de: "Überzeugende Folienpräsentation..." },
"service.presentation.goal": { uk: "Перетворити увагу аудиторії...", en: "Convert audience attention...", de: "Die Aufmerksamkeit des Publikums..." },
```

Also translate tags (6 unique): "🖨 Друкована", "💻 Цифрова", "🎨 Бренд", "📝 Контент", "📧 Email", "🎬 Відео", "📣 Реклама", "🚀 Тренд"

#### 2. Update `ServiceCardComponent.tsx` to use translations

Replace hardcoded `service.name`, `service.subtitle`, `service.goal`, `service.tag` with `t(`service.${service.id}.name`)` etc.

#### 3. Fix cart to use translated names

- Change `onAddToCart` to pass `service.id` instead of display name
- Update `CartItem` interface in `useCart.ts` to store `serviceId` 
- In `CartDrawer.tsx`, resolve display name via `t(`service.${item.serviceId}.name`)`
- This way cart items automatically show in the current language

#### 4. Update `BlockSection.tsx` card key

Ensure `onAddToCart` passes `service.id` through to the cart system.

### Files to Edit
- `src/i18n/translations.ts` — add ~170 translation keys for 34 services (name, subtitle, goal, tag)
- `src/components/ServiceCardComponent.tsx` — use `t()` for name, subtitle, goal, tag; pass `id` to cart
- `src/hooks/useCart.ts` — update `CartItem` to use `id` as key instead of `name`
- `src/components/CartDrawer.tsx` — resolve translated names from cart item IDs
- `src/components/BlockSection.tsx` — update `onAddToCart` signature
- `src/pages/Index.tsx` — update `onAddToCart` handler

