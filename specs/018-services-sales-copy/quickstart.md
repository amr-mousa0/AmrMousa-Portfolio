# Quickstart: Services Sales Copy & Mobile UX Optimization

**Feature**: `018-services-sales-copy`

## What This Feature Does

Transforms the outer service card copy from generic descriptions into high-converting PAS (Problem-Agitate-Solution) sales hooks with A/B/C variant testing. Also hides mobile slider arrows for a cleaner touch UX.

## Files to Modify

| # | File | Change |
|---|------|--------|
| 1 | `src/data/services.json` | Add `hookVariants[]` array with 3 copy variants per service |
| 2 | `src/components/sections/ServicesCarousel.astro` | Bind card copy to variant data + hide mobile arrows CSS |
| 3 | `public/js/translations.js` | Add Arabic translations for all 15 hook variants (5 services × 3) |

## Implementation Order

1. **Data Layer First**: Update `services.json` with all hook variants
2. **CSS Quick Win**: Add `display: none` for `.slider-controls` at `@media (max-width: 768px)`
3. **Component Binding**: Update the carousel template to use `hookVariants[0].copy` as default
4. **Client-Side JS**: Add A/B/C rotation script using `sessionStorage`
5. **Translations**: Add all Arabic hook variant translations

## Key Decisions

- **Variant A** is used as the static SSG fallback (always rendered in HTML)
- Client-side JS swaps to B or C after hydration (if session variant differs)
- `sessionStorage` ensures consistent experience within a single browser session
- Mobile arrows hidden via pure CSS media query (no JS required)
