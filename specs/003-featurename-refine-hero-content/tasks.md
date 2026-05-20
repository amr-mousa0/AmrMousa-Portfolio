# Tasks: Refine Hero Content

**Input**: Design documents from `/specs/003-featurename-refine-hero-content/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to

---

## Phase 1: Setup

**Purpose**: Verify target file is accessible before making any edits.

- [x] T001 Confirm Hero section structure is intact in `index.html` (locate `.hero-skills-text`, `.hero-intro-text`, and `.idea-text` elements)

---

## Phase 2: Foundational

**Purpose**: No shared infrastructure needed — skip directly to user stories.

*(N/A — all changes are isolated to the hero section of `index.html`)*

---

## Phase 3: User Story 1 - Simplify Hero Content for Readability (Priority: P1) 🎯 MVP

**Goal**: Replace the long skills list and intro paragraph with the concise, focused versions the user specified.

**Independent Test**: Load `index.html`, verify skills list reads "SQL • Power BI • Python • Media Buying" and intro text reads "I analyze data to understand systems, and marketing to understand people."

### Implementation for User Story 1

- [x] T002 [US1] Update `.hero-skills-text` content in `index.html` to: "SQL • Power BI • Python • Media Buying"
- [x] T003 [US1] Replace `.hero-intro-text` paragraph content in `index.html` with: "I analyze data to understand systems, and marketing to understand people."

**Checkpoint**: US1 complete — hero text is clean and concise.

---

## Phase 4: User Story 2 - Fix Text and Image Overlap (Priority: P1)

**Goal**: Shift the `.idea-text` quote block further left so it no longer overlaps the profile image.

**Independent Test**: Load `index.html` on desktop, verify the quote block has a clear visible gap from the profile image.

### Implementation for User Story 2

- [x] T004 [US2] Adjust `.idea-text` CSS in `index.html` — change `right: 60px` to `right: 180px` (or higher) to push the quote block left and away from the profile image

**Checkpoint**: US2 complete — quote no longer overlaps image.

---

## Phase 5: Polish & Cross-Cutting Concerns

- [x] T005 Visual audit on desktop: verify no text/image overlap and readability is improved in `index.html`
- [x] T006 Verify mobile layout is not negatively affected by the `.idea-text` CSS change in `index.html`

---

## Dependencies & Execution Order

- **Setup (Phase 1)**: No dependencies
- **US1 (Phase 3)**: Depends on Phase 1 — T002 and T003 can run in parallel
- **US2 (Phase 4)**: Independent of US1, can run after Phase 1
- **Polish (Phase 5)**: Depends on both US1 and US2

### Parallel Opportunities

```
After T001:
  T002 [US1] and T003 [US1] — run in parallel (same file, non-overlapping targets)
  T004 [US2] — can also run in parallel with T002/T003
```

---

## Implementation Strategy

### MVP (User Story 1 Only)
1. T001 Setup
2. T002 + T003 — text content updates
3. Validate US1 independently

### Full Delivery
4. T004 — CSS fix for overlap
5. T005 + T006 — Polish
