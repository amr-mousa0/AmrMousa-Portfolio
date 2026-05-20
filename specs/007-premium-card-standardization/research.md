# Research: Premium Card Design Standardization

**Feature**: `007-premium-card-standardization`  
**Phase**: 0 — Research & Decision Log  
**Date**: 2026-05-14

## Overview

All design decisions for the unified premium card system are documented here, with rationale and rejected alternatives.

---

## Decision 1: Blur "Others" Interaction Technique

- **Decision**: CSS parent-hover sibling targeting — `.wrapper:hover .card` + `.wrapper .card:hover { override }`
- **Rationale**: Zero JavaScript. Pure CSS sibling-dimming is GPU-composited via `filter: blur()` and `opacity`, which means it never triggers layout recalculation. Works on all target browsers.
- **Alternatives Considered**:
  - JS `mouseover/mouseout` events: adds runtime overhead, harder to maintain alongside CSS, risk of "stuck" states on mobile
  - CSS `:has()` selector: not supported in Firefox < 121; too risky for broad compatibility

---

## Decision 2: Glow Effect Implementation

- **Decision**: `::before` pseudo-element with `background: linear-gradient(135deg, rgba(--accent-a-rgb, 0.05), transparent)` + `opacity: 0 → 1` on hover
- **Rationale**: Pseudo-elements don't exist in the DOM — no extra HTML nodes, no extra reflow cost. The opacity transition is the only property animated, keeping GPU usage minimal.
- **Alternatives Considered**:
  - Animated `box-shadow`: cannot be gradient, and animating box-shadow causes paint, not composite
  - Background-image change on hover: triggers repaint on every frame

---

## Decision 3: Mobile Hover Disable Strategy

- **Decision**: `@media (max-width: 768px)` block that resets `.wrapper:hover .card` to `opacity: 1; transform: none; filter: none`
- **Rationale**: Touch screens fire `mouseover` events inconsistently, causing cards to appear "stuck" in the dimmed/blurred state after a tap. The reset block cleanly neutralizes all parent-hover effects.
- **Alternatives Considered**:
  - JS touch detection (`'ontouchstart' in window`): works but adds script dependency
  - `pointer: coarse` media query: more precise but less broadly understood; 768px breakpoint already used everywhere in this project

---

## Decision 4: Animation Entry System

- **Decision**: Reuse existing `anim-child` class with inline `style="transition-delay: Xs"` per card
- **Rationale**: The portfolio already has an IntersectionObserver-based scroll reveal system that adds `is-visible` class to `.anim-child` elements. Adding new JS or a separate animation library would violate the constitution's "Minimal Bloat" principle.
- **Alternatives Considered**:
  - AOS (Animate on Scroll) library: 13kB added, not needed
  - CSS-only `@keyframes` + `animation-delay`: does not respect scroll position — animations fire on page load, not when element enters viewport

---

## Decision 5: Sequential Delay Values

- **Decision**: Delays applied as `0.1s, 0.2s, 0.3s, 0.4s, 0.5s, 0.6s` increments on `anim-child` wrappers in HTML
- **Rationale**: Inline style on the wrapper gives per-card granular control. The 0.1s increment is small enough to feel fluid, large enough to be perceptible as a sequence.
- **Alternatives Considered**:
  - CSS `:nth-child(n)` delay selectors: requires knowing the exact DOM structure; breaks when `anim-child` wrappers are present as siblings to the card (different structure per section)
  - JavaScript-computed delays: unnecessarily dynamic for static content

---

## Resolved Clarifications

All requirements from `spec.md` were fully specified. **No NEEDS CLARIFICATION markers were present.** No further research required.

---

## Browser Compatibility Matrix

| Feature Used | Chrome | Firefox | Safari | Edge |
|---|---|---|---|---|
| `filter: blur()` | ✅ 18+ | ✅ 35+ | ✅ 9.1+ | ✅ 79+ |
| `backdrop-filter` | ✅ 76+ | ✅ 103+ | ✅ 9+ | ✅ 79+ |
| `will-change` | ✅ 36+ | ✅ 36+ | ✅ 9.1+ | ✅ 79+ |
| CSS Custom Properties | ✅ 49+ | ✅ 31+ | ✅ 9.1+ | ✅ 16+ |
| `::before` pseudo | ✅ All | ✅ All | ✅ All | ✅ All |

**All features are within the target browser support range (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+). No polyfills required.**
