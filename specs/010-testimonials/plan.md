# Implementation Plan: Testimonials Section

**Branch**: `010-testimonials` | **Date**: 2026-05-15 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/010-testimonials/spec.md`

## Summary

Implement a "Spotlight" Testimonials section in the portfolio. The section will display a single, elegantly typeset review at a time with subtle navigation avatars. It will use a cinematic fade/blur transition to switch between reviews, adhering to the established "Lux Cinematic" aesthetic without adding external dependencies.

## Technical Context

**Language/Version**: HTML5, CSS3, ES6+ (Vanilla)
**Primary Dependencies**: None (Vanilla implementation)
**Storage**: N/A (Data hardcoded in JS array)
**Testing**: Manual Visual Testing (No automated testing framework configured yet)
**Target Platform**: Modern Web Browsers (Mobile & Desktop)
**Project Type**: Portfolio Website Section
**Performance Goals**: 60 fps for animations, zero layout shifts
**Constraints**: Must match existing global CSS variables and responsive breakpoints.
**Scale/Scope**: 3-4 placeholder testimonials.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Visual Harmony**: Uses established typography (Poppins/Playfair) and color variables.
- [x] **Micro-Animations**: Uses CSS `transition` and `will-change` for smooth, performant fade/blur effects.
- [x] **DOM Efficiency**: Minimal DOM nodes; updates text content directly rather than creating/destroying elements.
- [x] **Mobile-First Resilience**: Fluid typography (`clamp()`) and responsive layout to prevent horizontal scroll.

## Project Structure

### Documentation (this feature)

```text
specs/010-testimonials/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (Future)
```

### Source Code (repository root)

```text
# Single project (Vanilla web app)
/
├── index.html        # Add Testimonials HTML markup and inline CSS/JS
└── images/           # Placeholder avatars for reviewers
```

**Structure Decision**: All updates will occur directly in `index.html` to maintain the current single-file architecture of the portfolio sections.
