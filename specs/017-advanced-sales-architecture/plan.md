# Implementation Plan: Advanced Sales Architecture

**Branch**: `017-advanced-sales-architecture` | **Date**: 2026-05-18 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/017-advanced-sales-architecture/spec.md`

## Summary

Restructure the portfolio into a high-converting, Zero-JS Astro application tailored for lead generation in the MENA and global markets. This involves injecting advanced SEO/JSON-LD, strictly adhering to existing color palettes while utilizing Tailwind CSS for layout, and building purely CSS-based scroll-snap carousels for mobile to guarantee flawless Core Web Vitals (98-100 PageSpeed scores, 0 CLS).

## Technical Context

**Language/Version**: Astro / HTML / CSS / TypeScript  
**Primary Dependencies**: Tailwind CSS, Astro  
**Storage**: Static Data (`.json` files)  
**Testing**: Chrome DevTools (Lighthouse), Google Rich Results Test  
**Target Platform**: Web (Mobile-First)  
**Project Type**: Static Site / Portfolio  
**Performance Goals**: PageSpeed Insights Mobile Score: 98-100, CLS: 0.0, LCP: < 2.5s  
**Constraints**: Zero JavaScript for primary UI components (CSS-only carousels), strict adherence to existing color variables (`var(--light-accent-a)`).  
**Scale/Scope**: Single page application (SPA-like feel) with global reach capabilities (i18n).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- High Performance / Zero-JS Constraint: Passed.
- Mobile First Design: Passed.

## Project Structure

### Documentation (this feature)

```text
specs/017-advanced-sales-architecture/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
└── quickstart.md        # Phase 1 output
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── ui/
│   │   └── TrustBar.astro
│   ├── sections/
│   │   ├── Hero.astro
│   │   ├── ServicesCarousel.astro
│   │   └── Projects.astro
│   └── BaseHead.astro
├── layouts/
│   └── Layout.astro
└── pages/
    └── index.astro
```

**Structure Decision**: The Astro-standard component architecture perfectly suits this static, modular rebuild. We will modularize sections (`Hero.astro`, `ServicesCarousel.astro`) to keep `index.astro` clean.
