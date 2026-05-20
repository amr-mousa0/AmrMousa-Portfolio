# Tasks: Refine Hero Content v2

**Feature**: `004-featurename-refine-hero`
**Input**: `specs/004-featurename-refine-hero/plan.md`, `spec.md`, `research.md`

---

## Phase 1: Setup

- [x] T001 Verify current state of `.sub-heading`, `.hero-skills-text`, `.hero-intro-text`, and `.idea-text` elements in `index.html`

---

## Phase 2: Foundational

*(N/A — all changes are isolated within the hero section of `index.html`)*

---

## Phase 3: User Story 1 — Update Hero Identity & Core Skills (P1) 🎯 MVP

**Goal**: Update the right-panel copy to reflect the user's precise professional identity.

**Independent Test**: Load `index.html`, verify sub-heading reads "Data Analyst & Media Buyer", skills reads "SQL • Power BI • Python", and tagline reads "I use data to understand systems, and marketing to understand people."

- [x] T002 [P] [US1] Update `.sub-heading` text in `index.html` to "Data Analyst & Media Buyer"
- [x] T003 [P] [US1] Update `.hero-skills-text` text in `index.html` to "SQL • Power BI • Python"
- [x] T004 [P] [US1] Update `.hero-intro-text` text in `index.html` to "I use data to understand systems, and marketing to understand people."

**Checkpoint**: US1 complete — hero identity copy is correct.

---

## Phase 4: User Story 2 — Redesign Left Quote Block (P1)

**Goal**: Replace the quote text and reformat the `.idea-text` block to display in ≤2 horizontal lines.

**Independent Test**: Load `index.html` on desktop, verify the new quote text is present and fits within 2 lines.

- [x] T005 [US2] Update `.idea-text` paragraph text in `index.html` to: "Content builds relationships. Relationships are built on trust. Trust drives revenue."
- [x] T006 [US2] Update `.idea-text p` CSS in `index.html`: reduce font-size from `1.5rem` to `1rem`
- [x] T007 [US2] Update `.idea-text` CSS in `index.html`: increase max-width from `320px` to `520px`

**Checkpoint**: US2 complete — quote block shows in ≤2 horizontal lines.

---

## Phase 5: Polish & Cross-Cutting Concerns

- [x] T008 Visual audit on desktop: verify quote fits in 2 lines and no text overlaps the profile image in `index.html`
- [x] T009 Verify mobile layout is unaffected (`.idea-text` is already hidden on mobile) in `index.html`

---

## Dependencies & Execution Order

- **Setup (Phase 1)**: No dependencies
- **US1 (Phase 3)**: Depends on Phase 1 — T002, T003, T004 can run in parallel
- **US2 (Phase 4)**: Depends on Phase 1, independent of US1 — T005, T006, T007 run sequentially
- **Polish (Phase 5)**: Depends on US1 and US2

### Parallel Opportunities

```
After T001:
  T002, T003, T004 — in parallel (same file, non-overlapping HTML targets)
  T005 → T006 → T007 — sequential (same CSS/HTML block)
```

---

## Implementation Strategy

### MVP (US1 only)
1. T001 → T002 + T003 + T004

### Full Delivery
4. T005 → T006 → T007
5. T008 + T009
