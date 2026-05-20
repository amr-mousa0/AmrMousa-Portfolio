# Tasks: Enhance Hero Section Polish

**Feature**: `005-featurename-enhance-hero-polish`
**Input**: `specs/005-featurename-enhance-hero-polish/plan.md`, `spec.md`, `research.md`

---

## Phase 1: Setup

- [ ] T001 Read and confirm current CSS selectors: `.idea-text`, `.idea-text p`, `.idea-text p::before`, `.sub-heading`, `.hero-main-name`, `.hero-skills-text`, `.hero-intro-text`, `.available-badge` in `index.html` to verify line numbers before editing

---

## Phase 2: Foundational

*(N/A — all changes are isolated CSS and minimal HTML within the hero section of `index.html`)*

---

## Phase 3: User Story 1 — Elegant Quote Section (P1) 🎯 MVP

**Goal**: Give the left-panel quote a cinematic, intentional look using Playfair Display italic, a slim accent left bar, and per-word emphasis on "trust" and "revenue".

**Independent Test**: Open `index.html` in browser. Verify the quote uses Playfair Display italic, has a visible left accent bar, and the words "trust" and "revenue" appear in the accent color `#00b4d8`.

- [ ] T002 [US1] Update `.idea-text` CSS in `index.html`: remove `padding-left` and add `4px` left accent bar via `border-left: 4px solid #00b4d8` and `padding-left: 20px`
- [ ] T003 [US1] Update `.idea-text p` CSS in `index.html`: set `font-family: 'Playfair Display', serif`, `font-style: italic`, `font-size: 1.25rem`, `font-weight: 700`, `line-height: 1.9`, remove `padding-left: 70px`
- [ ] T004 [US1] Remove the `.idea-text p::before` floating quote-mark CSS block entirely from `index.html`
- [ ] T005 [US1] Update `.idea-text > p` HTML in `index.html`: wrap the word `trust` (appearing in line 2) in `<em class="quote-em">` and the word `revenue` (appearing in line 3) in `<em class="quote-em">`
- [ ] T006 [US1] Add `.quote-em` CSS rule in `index.html` desktop styles: `font-style: normal; color: #00b4d8; font-weight: 700;`

**Checkpoint**: US1 complete — quote is cinematic and elegant with emphasis.

---

## Phase 4: User Story 2 — Refined Information Hierarchy (P1)

**Goal**: Polish the right-panel typography and spacing so the hierarchy from role → name → skills → intro → CTA flows with premium visual rhythm.

**Independent Test**: Open `index.html` in browser at 1200px+ width. Verify consistent spacing between all right-panel elements, accent-colored sub-heading, and bolder name.

- [ ] T007 [P] [US2] Update `.available-badge` CSS in `index.html`: reduce `margin-bottom` from `24px` to `16px`
- [ ] T008 [P] [US2] Update `.sub-heading` CSS in `index.html`: set `color: #00b4d8`, `letter-spacing: 0.18em`, `margin-bottom: 6px`
- [ ] T009 [US2] Update `.hero-main-name` CSS in `index.html`: change `font-weight` to `800`, `letter-spacing: -0.03em`, `margin: 4px 0 14px 0`
- [ ] T010 [US2] Update `.hero-skills-text` CSS in `index.html`: set `margin-top: 0`, `margin-bottom: 20px`, `line-height: 1.9`
- [ ] T011 [US2] Update `.hero-intro-text` CSS in `index.html`: set `font-size: 16px !important`, `max-width: 520px`, `margin-bottom: 28px`

**Checkpoint**: US2 complete — right panel has a clean, premium visual hierarchy.

---

## Phase 5: User Story 3 — Organized Skills Layout (P2)

**Goal**: Split the skills list into two visually balanced lines.

**Independent Test**: Open `index.html` in browser. Verify the skills text displays on two lines: "SQL • Power BI • Python" on line 1 and "Media Buying • Content Strategy" on line 2.

- [ ] T012 [US3] Update `.hero-skills-text` HTML in `index.html`: insert `<br>` between `Python` and `Media Buying` to create two balanced lines

**Checkpoint**: US3 complete — skills are organized and readable.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T013 Visual audit on desktop (1200px+): verify all spacing, colors, and emphasis look premium and balanced in `index.html`
- [ ] T014 Verify mobile layout is unaffected: `.idea-text` remains hidden, right-panel text remains centered and readable in `index.html`

---

## Dependencies & Execution Order

- **Setup (T001)**: Required first
- **US1 (T002–T006)**: Sequential — CSS must come before HTML `<em>` wrapping
- **US2 (T007–T011)**: T007 and T008 can run in parallel, T009–T011 are sequential
- **US3 (T012)**: Independent of US1 and US2
- **Polish (T013–T014)**: After all user stories

### Parallel Opportunities

```
After T001:
  US1: T002 → T003 → T004 → T005 → T006 (sequential, same CSS block)
  US3: T012 (independent, HTML only — can run with US2)
  US2: T007 + T008 in parallel → T009 → T010 → T011
```

---

## Implementation Strategy

### MVP (US1 + US2 only)
T001 → T002–T006 (quote polish) → T007–T011 (hierarchy polish)

### Full Delivery
T001 → US1 → US2 → T012 (skills split) → T013 + T014
