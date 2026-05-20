# Tasks: Premium Portfolio Design Standardization

**Input**: Design documents from `specs/007-premium-card-standardization/`  
**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅  
**Branch**: `007-premium-card-standardization`

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files/sections, no blocking dependency)
- **[Story]**: Which user story — `[US1]` Desktop Experience · `[US2]` Mobile Experience
- All changes target: `index.html` (single source of truth)

---

## Phase 1: Setup (Audit & Baseline)

**Purpose**: Verify current state of each card section before making changes. Establishes a clear before/after reference.

- [X] T001 Audit `#experience .experience-cards` HTML structure in `index.html` — confirm no extra wrapper `div`s between `.experience-cards` and `.anim-child` elements
- [X] T002 [P] Audit `#education .education-content` HTML structure in `index.html` — confirm `anim-child` wrapping pattern matches contract
- [X] T003 [P] Audit `#achievements .achievements-list` HTML structure in `index.html` — confirm sequential `transition-delay` values (0.1s → 0.6s)
- [X] T004 [P] Audit `.projects-grid` HTML structure in `index.html` — confirm card hierarchy matches `section > wrapper > anim-child > card`
- [X] T005 Verify all CSS Design Tokens (`--accent-a-rgb`, `--accent-b-rgb`, `--surface`, `--radius`, `--ease`) exist in `:root` block of `index.html`

**Checkpoint**: Audit complete — all structural issues logged and ready for fix.

---

## Phase 2: Foundational (Shared CSS Contract)

**Purpose**: Establish the shared interaction model and `::before` glow pattern in CSS. **Must complete before any section-specific work.**

> ⚠️ **CRITICAL**: This phase defines the CSS rules that all four card sections will consume. Complete before Phase 3+.

- [X] T006 Define and verify the standard 3-state hover interaction CSS block for `.experience-cards` in `index.html` — Idle / Others-dimmed (`opacity: 0.6; filter: blur(1px)`) / Focused (`translateY(-10px) scale(1.02)`)
- [X] T007 Verify `.experience-card::before` pseudo-element exists with correct gradient glow template (`linear-gradient(135deg, rgba(var(--accent-a-rgb), 0.05), transparent)` + `opacity: 0 → 1` on hover) in `index.html`
- [X] T008 Verify dark mode card hover background rule (`body:not(.light) .experience-card:hover { background: linear-gradient(145deg, #323232, #292929) }`) is present in `index.html`
- [X] T009 [P] Apply same 3-state hover interaction block to `#education .education-content` / `.education-card` in `index.html` (mirroring T006 pattern)
- [X] T010 [P] Apply same `::before` glow pseudo-element to `#education .education-card` in `index.html` (mirroring T007 pattern)
- [X] T011 [P] Apply same 3-state hover interaction block to `.achievements-list` / `.achievement-card` in `index.html`
- [X] T012 [P] Apply same `::before` glow pseudo-element to `.achievement-card` in `index.html`
- [X] T013 [P] Apply same 3-state hover interaction block to `.projects-grid` / `.project-card` in `index.html` (if not already done)
- [X] T014 [P] Apply same `::before` glow pseudo-element to `.project-card` in `index.html`

**Checkpoint**: All four card types share identical CSS interaction model. Test by hovering cards in each section on desktop.

---

## Phase 3: User Story 1 — Desktop Immersive Exploration (Priority: P1) 🎯 MVP

**Goal**: Every card section on desktop shows smooth sequential entry animations and a unified, premium hover interaction (scale + glow + neighbor-dimming).

**Independent Test**: Open `index.html` on desktop Chrome. Scroll to each section. Verify:
1. Cards appear in a staggered sequence (visible 0.1s apart)
2. Hovering one card dims all others (opacity ~0.6, slight blur)
3. The hovered card lifts (`translateY(-10px)`) and glows
4. The `::before` gradient overlay fades in on hover

### Implementation for User Story 1

- [X] T015 [P] [US1] Fix sequential `transition-delay` on all `anim-child` wrappers in `#experience` section of `index.html` — ensure values run `0.1s, 0.2s, 0.3s, 0.4s, 0.5s` with no gaps or duplicates
- [X] T016 [P] [US1] Fix sequential `transition-delay` on all `anim-child` wrappers in `#education` section of `index.html` — verify 2 cards use `0.1s, 0.2s`
- [X] T017 [P] [US1] Fix sequential `transition-delay` on all `anim-child` wrappers in `#achievements` section of `index.html` — ensure values run `0.1s → 0.7s` for all 7 cards with no duplicates
- [X] T018 [P] [US1] Fix sequential `transition-delay` on all `anim-child` wrappers in `#projects` section of `index.html` — verify cards use unique ascending delays
- [X] T019 [US1] Validate HTML structure of `#achievements .achievements-list` in `index.html` — remove any extra intermediate `div` wrappers between `.achievements-list` and `.anim-child` that would break the CSS sibling `blur-others` selector
- [X] T020 [US1] Validate HTML structure of `#education .education-content` in `index.html` — same check as T019
- [X] T021 [US1] Add `tabindex="0"` to any `.achievement-card` or `.education-card` elements missing it in `index.html` — required for keyboard focus state to trigger hover styles
- [X] T022 [US1] Verify `will-change: transform, opacity, box-shadow` is set on all four card classes (`.experience-card`, `.education-card`, `.achievement-card`, `.project-card`) in `index.html`

**Checkpoint**: Desktop hover and animation for ALL four sections works identically. SC-001 (Visual Uniformity) achieved.

---

## Phase 4: User Story 2 — Seamless Mobile Experience (Priority: P2)

**Goal**: On mobile (≤768px), all card sections display in a stable vertical/grid layout with no horizontal overflow, no hover-triggered blur, and appropriately sized icons.

**Independent Test**: Open `index.html` in Chrome DevTools at 375px width. Verify:
1. No horizontal scrollbar appears in any section
2. Tapping a card does NOT trigger the "dim others" blur effect
3. Experience section icons are visible (40×40px)
4. Achievement badges (`.exp-badge`) display in a grid, not a horizontal scroll

### Implementation for User Story 2

- [X] T023 [US2] In `@media (max-width: 768px)` block of `index.html`, add/verify reset rules for `#education .education-content:hover .education-card` — set `opacity: 1; transform: none; filter: none`
- [X] T024 [US2] In `@media (max-width: 768px)` block of `index.html`, add/verify reset rules for `.achievements-list:hover .achievement-card` — set `opacity: 1; transform: none; filter: none`
- [X] T025 [P] [US2] In `@media (max-width: 768px)` block of `index.html`, add/verify reset rules for `.projects-grid:hover .project-card` — set `opacity: 1; transform: none; filter: none`
- [X] T026 [US2] Verify `#experience .illustration-wrapper` uses `display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr))` at ≤768px in `index.html` (badge grid, no scroll)
- [X] T027 [P] [US2] Verify `#experience .exp-icon` is NOT set to `display: none` at ≤768px in `index.html` — should be visible at `40×40px`
- [X] T028 [P] [US2] Verify `#experience .experience-card` uses `flex-direction: column` at ≤768px in `index.html` for proper stacking
- [X] T029 [US2] Check `#achievements` section at 320px width — confirm `SC-003` (Zero horizontal overflow) passes; fix any `min-width` or `width` properties causing overflow on `.achievement-card` in `index.html`

**Checkpoint**: SC-003 passes — zero horizontal overflow at 320px+. Touch interactions feel clean with no sticky blur states.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, consistency sweep, and documentation update.

- [X] T030 [P] Visual audit — open `index.html` in browser and compare hover effect across all 4 sections side-by-side; confirm `border-radius`, shadow depth, and scale factor are identical (SC-001)
- [X] T031 [P] Dark/Light mode toggle test — switch theme and verify card gradients and glow intensities adjust appropriately (Edge Case from spec.md)
- [X] T032 [P] Variable-length content test — manually expand card descriptions in DevTools and confirm layout holds (Edge Case from spec.md — no card height collapse)
- [X] T033 Keyboard accessibility check — Tab through all four sections and confirm `:focus` state triggers the same premium hover style on all card types
- [X] T034 Update `specs/007-premium-card-standardization/checklists/requirements.md` — mark all FR items as complete with implementation notes

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Audit)         → No dependencies — start immediately
Phase 2 (Foundational)  → Depends on Phase 1 audit findings — blocks Phase 3 & 4
Phase 3 (US1 Desktop)   → Depends on Phase 2 CSS contract being established
Phase 4 (US2 Mobile)    → Can start in parallel with Phase 3 (different CSS rules, same file sections)
Phase 5 (Polish)        → Depends on Phase 3 + Phase 4 completion
```

### User Story Dependencies

- **US1 (P1)**: Can start after Phase 2. All T015–T022 target HTML `transition-delay` values and CSS verification — no cross-story dependencies.
- **US2 (P2)**: Can start after Phase 2 in parallel with US1. All T023–T029 target `@media` block rules — different CSS selectors, no conflicts with US1 tasks.

### Within Each Story

- T015–T018 are all `[P]` — different HTML sections, safe to do in parallel
- T019–T022 depend on T015–T018 (must verify structure after delay fixes)
- T023–T025 are `[P]` — different CSS selectors
- T026–T028 are `[P]` — can run simultaneously

---

## Parallel Example: User Story 1

```text
Parallel batch (different sections, same file):
  T015 — Fix #experience transition-delays
  T016 — Fix #education transition-delays
  T017 — Fix #achievements transition-delays
  T018 — Fix #projects transition-delays

Then sequentially:
  T019 — Validate #achievements HTML structure
  T020 — Validate #education HTML structure
  T021 — Add tabindex to missing cards
  T022 — Verify will-change on all card classes
```

## Parallel Example: User Story 2

```text
Parallel batch:
  T023 — Education mobile hover reset
  T024 — Achievements mobile hover reset
  T025 — Projects mobile hover reset
  T027 — Verify exp-icon visibility
  T028 — Verify experience card flex-direction

Then sequentially:
  T026 — Verify badge grid layout
  T029 — 320px overflow check
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 — Audit
2. Complete Phase 2 — CSS contract (Foundational)
3. Complete Phase 3 — US1 Desktop
4. **STOP & VALIDATE**: Open `index.html`, hover through all 4 sections — all must feel identical
5. Demo/review with user before proceeding to mobile

### Incremental Delivery

1. Phase 1 → Phase 2 → Baseline unified CSS ready
2. Phase 3 (US1) → Desktop experience complete → **MVP checkpoint**
3. Phase 4 (US2) → Mobile stability complete → **Full delivery**
4. Phase 5 → Polish pass → **Production ready**

---

## Notes

- `[P]` = different CSS selectors or HTML sections — safe to tackle simultaneously
- All changes are in a single file: `index.html`
- No JavaScript changes required
- Each checkpoint is immediately verifiable by opening the file in a browser
- Commit after each Phase completion for clean git history
