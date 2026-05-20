# Implementation Plan: Services Sales Copy & Mobile UX Optimization

**Branch**: `018-services-sales-copy` | **Date**: May 19, 2026 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/018-services-sales-copy/spec.md`

## Summary

Replace the current descriptive service card copy on the homepage carousel with high-converting, psychologically-driven sales hooks using the PAS (Problem-Agitate-Solution) framework. Implement an A/B/C testing data architecture to rotate three hook variants per service. Additionally, hide mobile slider navigation arrows to embrace native touch swiping on mobile viewports.

## Technical Context

**Language/Version**: Astro 5.x (HTML/CSS/JS), JSON data  
**Primary Dependencies**: Astro SSG, Tailwind CSS v4, FontAwesome  
**Storage**: Static JSON (`src/data/services.json`), JS dictionary (`public/js/translations.js`)  
**Testing**: Manual visual inspection, browser DevTools responsive mode  
**Target Platform**: Web (all modern browsers, desktop + mobile)  
**Project Type**: Static portfolio website (Astro SSG)  
**Performance Goals**: 60fps scroll, <100ms interaction latency, zero CLS  
**Constraints**: No external dependencies, bilingual EN/AR(Egyptian), LTR/RTL  
**Scale/Scope**: 5 service cards, 3 hook variants × 5 services × 2 languages = 30 copy strings

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution is a template with no project-specific principles defined. No gates to check. **PASS**.

## Project Structure

### Documentation (this feature)

```text
specs/018-services-sales-copy/
├── plan.md              # This file
├── research.md          # Phase 0 output — copywriting research
├── data-model.md        # Phase 1 output — data schema for A/B/C hooks
├── quickstart.md        # Phase 1 output — implementation quickstart
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── data/
│   └── services.json            # Add hookVariants[] per service (A/B/C copy)
├── components/
│   └── sections/
│       └── ServicesCarousel.astro  # Update card copy binding + hide mobile arrows
└── (no new files required)

public/
└── js/
    └── translations.js           # Add AR translations for all hook variants
```

**Structure Decision**: No new files/directories needed. The feature modifies existing data and component files only. The A/B/C rotation logic is a lightweight client-side JS addition to the existing carousel script.

## Complexity Tracking

> No constitution violations. No complexity justification needed.
