# Implementation Plan: Light Theme Color Harmonization

**Branch**: `020-fix-light-theme-colors` | **Date**: 2026-05-20 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/020-fix-light-theme-colors/spec.md`

## Summary

Harmonize the website's light theme colors with the core brand identity (Teal/Maroon) by updating base CSS custom properties. Additionally, design and implement elegant light-mode visual overrides for structural UI components (frosted-glass light drawer, button states, and card elevations) to resolve readability and contrast issues (WCAG AA compliance).

## Technical Context

**Language/Version**: JavaScript / CSS
**Primary Dependencies**: Astro, Tailwind CSS v4.3.0
**Storage**: localStorage (for active theme state)
**Testing**: Playwright for E2E tests, Lighthouse CI for accessibility audits
**Target Platform**: Web
**Project Type**: Portfolio / Consultancy Website
**Performance/Quality Goals**: WCAG AA Compliance (contrast ratio >= 4.5:1), Lighthouse accessibility score >= 98/100
**Constraints**: Keep changes to CSS files to maintain zero-JS framework overhead for styling.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

No explicit constitution violations. The proposed light-mode enhancements directly align with **Principle III. User Experience (UX) Consistency** ("Lux" aesthetic and accessibility compliance) and **Principle I. Code Quality & Craftsmanship** of the GitHub Spec Kit Constitution.

## Project Structure

### Documentation (this feature)

```text
specs/020-fix-light-theme-colors/
├── plan.md              # This file
├── research.md          # Research findings
├── data-model.md        # CSS custom properties and state model
└── quickstart.md        # Test instructions
```

### Source Code (repository root)

```text
src/
└── styles/
    └── tailwind.css     # CSS custom variables and theme overrides
```

**Structure Decision**: The styling updates are confined to `src/styles/tailwind.css`, modifying the base properties and adding classes scoped under `body.light` to handle interactive component layouts.

## Proposed Changes

### Styles

#### [MODIFY] [tailwind.css](file:///c:/Users/HP/Downloads/AmrMousa%20Portofolio/src/styles/tailwind.css)
- Replace generic blue accents in `:root` light variables block with brand-aligned teal `#006679` and maroon `#9b2e68`.
- Define explicit overrides for `body.light .drawer.expanded`, menu items, and control button states.
- Polish shadow elevations and hover styles for cards under light theme context.

## Verification Plan

### Automated Tests
- Run `npx playwright test` to verify no navigation or layout regression.
- Execute Lighthouse accessibility audit on light theme.

### Manual Verification
- Test language toggle and theme toggle responsiveness.
- Inspect card hover effects, button styling, and mobile menu contrast on emulator.
