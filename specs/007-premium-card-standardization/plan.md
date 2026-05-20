# Implementation Plan: Premium Portfolio Design Standardization

**Branch**: `007-premium-card-standardization` | **Date**: 2026-05-14 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/007-premium-card-standardization/spec.md`

## Summary

Implement a unified, premium "card" design language across all four major content sections of the portfolio — Experience, Projects, Education, and Achievements — using a shared set of CSS design tokens, a reusable hover interaction model (scale + glow + blur-others), sequential entry animations, and a stable mobile grid layout. This work is entirely CSS/HTML-based with no new dependencies.

## Technical Context

**Language/Version**: HTML5, Vanilla CSS (no preprocessors)  
**Primary Dependencies**: None — uses existing FontAwesome 6 icons and CSS Custom Properties already in `index.html`  
**Storage**: N/A  
**Testing**: Visual regression via browser DevTools + TestSprite for layout integrity  
**Target Platform**: Modern desktop and mobile browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)  
**Project Type**: Static HTML/CSS portfolio site — single `index.html` file architecture  
**Performance Goals**: 60fps for all hover and scroll animations; no layout shift (CLS = 0) on load  
**Constraints**: All changes live within `index.html`; no build step; no JavaScript changes required for the design system  
**Scale/Scope**: 4 sections, ~15 cards total, ~5 CSS class selectors to standardize

## Constitution Check

*GATE: Must pass before Phase 0 research.*

| Principle | Status | Notes |
|-----------|--------|-------|
| **I. Code Quality (SDD)** | ✅ PASS | Spec `007` created before any code changes |
| **I. Atomic Logic** | ✅ PASS | Each card class is self-contained; shared tokens via CSS variables |
| **I. Refactor First** | ✅ PASS | Removing intermediate `div` wrappers before adding new effects |
| **III. Visual Harmony** | ✅ PASS | Adheres to Poppins/Inter typography and `--accent-a/b` palette from DESIGN.md |
| **III. Micro-Animations** | ✅ PASS | All transitions use 0.4s duration, within the 200–400ms "tactile" window |
| **III. Mobile-First Resilience** | ✅ PASS | Mobile media queries address ≤768px breakpoint explicitly |
| **IV. DOM Efficiency** | ✅ PASS | Uses `will-change: transform, opacity` and `::before` pseudo-elements to avoid extra DOM nodes |
| **IV. 60fps Animations** | ✅ PASS | Only `transform`, `opacity`, and `filter` are animated — all GPU-composited properties |

**No constitution violations detected. All gates pass.**

## Project Structure

### Documentation (this feature)

```text
specs/007-premium-card-standardization/
├── plan.md              ← This file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
└── tasks.md             ← Phase 2 output (/speckit-tasks command)
```

### Source Code (repository root)

```text
AmrMousa Portfolio/
├── index.html           ← Single source of truth; all CSS and HTML in this file
│   ├── <style> block    ← CSS sections for each card type (lines ~530–1800)
│   │   ├── #education .education-card  (lines ~535–570)
│   │   ├── .experience-card            (lines ~1094–1175)
│   │   ├── .project-card               (lines ~1700–1740)
│   │   └── .achievement-card           (lines ~1746–1800)
│   └── <body>           ← HTML sections for each card instance
│       ├── #education   (lines ~3636–3660)
│       ├── #experience  (lines ~4833–4950)
│       ├── #projects    (lines ~8180–8450)
│       └── #achievements (lines ~8458–8870)
└── specs/
    └── 007-premium-card-standardization/
        └── plan.md
```

**Structure Decision**: This is a single-file static site. All design changes are surgical CSS edits within `index.html`. No separate component files or build pipeline exist.

---

## Phase 0: Research

### Decision Log

| Topic | Decision | Rationale | Alternatives Rejected |
|-------|----------|-----------|----------------------|
| **Blur "others" technique** | CSS sibling selector on parent hover (`.wrapper:hover .card { filter: blur(1px) }`) | Pure CSS, zero JS, GPU-composited | JS `mouseover` events: adds complexity and blocking code |
| **Glow effect on hover** | `::before` pseudo-element with gradient + opacity transition | Allows independent opacity animation without affecting layout | `box-shadow` only: doesn't support gradient glow |
| **Mobile hover disable** | `@media (max-width: 768px)` reset block with `opacity: 1; transform: none; filter: none` | Touch devices don't have hover states; prevents sticky states on tap | JS-based touch detection: over-engineered |
| **Animation entry (scroll-reveal)** | Existing `anim-child` class + `transition-delay` inline styles | Already implemented system; consistent with existing sections | IntersectionObserver JS: already handled globally in the existing script |
| **Sequential delays** | `0.1s, 0.2s, 0.3s, 0.4s, 0.5s, 0.6s` in HTML via `style="transition-delay: Xs"` | Granular, readable, easy to adjust per card | CSS `:nth-child()` selectors: less flexible when wrappers vary |

---

## Phase 1: Design & Contracts

### Data Model (`data-model.md`)

#### Card Component Anatomy

Every "Premium Card" in any section shares this **visual contract**:

```
┌─────────────────────────────────────────────┐
│ [Icon 54x54px] [Date Badge]                  │
│               [Title — 20px, weight 600]     │
│               [Subtitle/Company — 16px muted]│
│               [Description bullets]          │
│                                              │
│ ::before: gradient overlay (opacity 0→1)     │
└─────────────────────────────────────────────┘
```

#### CSS Design Token Contract

All card classes MUST consume these tokens from the root `:root` block:

| Token | Usage | Example Value |
|-------|-------|---------------|
| `--accent-a` | Borders, icon backgrounds, date badges | `#7c6af7` |
| `--accent-b` | Gradient endpoint for glow effects | `#a78bfa` |
| `--accent-a-rgb` | RGBA border/shadow calculations | `124, 106, 247` |
| `--accent-b-rgb` | RGBA gradient calculations | `167, 139, 250` |
| `--surface` | Card background base color | `#1e1e1e` (dark) |
| `--radius` | Border radius of all cards | `16px` |
| `--ease` | Easing function for transitions | `cubic-bezier(0.4, 0, 0.2, 1)` |

#### Interaction State Contract

Every card list wrapper (`.experience-cards`, `.achievements-list`, `.education-content`, `.projects-grid`) MUST implement this interaction model:

```css
/* State 1: Idle — all cards at full opacity */
.wrapper .card { opacity: 1; transform: none; filter: none; }

/* State 2: Any card hovered — others dim */
.wrapper:hover .card {
  opacity: 0.6;
  transform: scale(0.99);
  filter: blur(1px);
}

/* State 3: Focused card — full highlight */
.wrapper .card:hover,
.wrapper .card:focus {
  opacity: 1;
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(var(--accent-a-rgb), 0.2),
              0 0 0 1px rgba(var(--accent-a-rgb), 0.2);
  border-color: rgba(var(--accent-a-rgb), 0.3);
  filter: blur(0);
}

/* Mobile override — disable all blur/scale effects */
@media (max-width: 768px) {
  .wrapper:hover .card { opacity: 1; transform: none; filter: none; }
}
```

#### Animation Delay Contract

```html
<!-- Sequential delay pattern — 0.1s increments, applied to anim-child wrapper -->
<div class="anim-child" style="transition-delay: 0.1s;"> <div class="card"> … </div> </div>
<div class="anim-child" style="transition-delay: 0.2s;"> <div class="card"> … </div> </div>
<div class="anim-child" style="transition-delay: 0.3s;"> <div class="card"> … </div> </div>
```

> **CRITICAL**: The `anim-child` wrapper is the only intermediate `div` permitted between `.wrapper` and `.card`. No additional nesting layers may be inserted.

### Interface Contracts

Since this is a static HTML/CSS portfolio (no API, no backend), the "interface contracts" are **visual contracts** — agreements between the CSS rules and the HTML structure.

**Contract 1: Card Class Hierarchy**

```
section#[name]
  └── .[name]-grid / .[name]-list / .[name]-content  (layout wrapper)
        └── .anim-child[transition-delay]            (animation wrapper — ONLY permitted intermediary)
              └── .[name]-card[tabindex="0"]         (interactive card)
                    ├── .[name]-icon                 (visual identifier)
                    └── .[name]-text / .[name]-info  (content area)
```

**Contract 2: Dark Mode Gradient**

For dark mode (`:not(.light)`), every card on hover MUST apply:
```css
background: linear-gradient(145deg, #323232, #292929);
```

**Contract 3: Mobile Breakpoint**

At `max-width: 768px`:
- All hover interaction effects (blur, scale) are disabled via reset
- Card icons remain visible but are reduced to `40x40px`
- Badge/pill elements switch to `display: grid` (no horizontal scroll)
