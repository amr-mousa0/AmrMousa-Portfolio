# Implementation Plan: Horizontal Services Slider

**Branch**: `014-horizontal-services-slider` | **Date**: 2026-05-18 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `spec.md`

## Summary

We will transform the vertical/grid layout of `ServicesGrid.astro` into a horizontal scrollable slider. To achieve this while adhering to the "Zero-JS by default" Astro philosophy and the "Quiet Luxury" aesthetic, we will use native CSS Scroll Snapping (similar to the `ProjectSlider` but without requiring React since the Gig Cards don't open complex modals, they just link to `#contact`).

## Technical Context

**Language/Version**: Astro, HTML, CSS
**Primary Dependencies**: Astro
**Storage**: `src/data/gigs.json` (Existing)
**Testing**: Manual testing across Desktop and Mobile viewports
**Target Platform**: Web (Mobile-First, Responsive Desktop)
**Performance Goals**: Native CSS scrolling for 60fps performance without JS bloat.
**Constraints**: Must maintain LTR/RTL support for bilingual display.

## Constitution Check

*GATE: Passed*
- **Code Quality**: Using native CSS scroll snap avoids unnecessary React hydration, adhering to Astro best practices.
- **Testing**: Manual testing of edge cases (mobile screens, RTL/LTR).
- **UX Consistency**: Hover states and "Quiet Luxury" styles will remain untouched.

## Project Structure

### Documentation (this feature)

```text
specs/014-horizontal-services-slider/
├── plan.md              
├── research.md          
├── data-model.md        
├── quickstart.md        
└── tasks.md (to be generated)
```

### Source Code

```text
src/
└── components/
    └── astro/
        └── ServicesGrid.astro (Modified)
```
