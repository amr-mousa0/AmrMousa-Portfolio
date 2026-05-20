---
description: "Task list for Horizontal Services Slider feature implementation"
---

# Tasks: Horizontal Services Slider

**Input**: Design documents from `/specs/014-horizontal-services-slider/`
**Prerequisites**: plan.md (required), spec.md (required)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Review `src/components/astro/ServicesGrid.astro` current layout to understand existing DOM structure.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

*(No foundational tasks required, as we are modifying an existing Astro component using native CSS)*

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Browse Services Horizontally (Priority: P1) 🎯 MVP

**Goal**: Convert vertical grid to horizontal native scroll-snap slider

**Independent Test**: Can be fully tested by navigating to the Services section and scrolling/swiping horizontally to see all service cards.

### Implementation for User Story 1

- [x] T002 [US1] Update `.services-grid` container in `src/components/astro/ServicesGrid.astro` to use flex layout with `overflow-x: auto` and `scroll-snap-type: x mandatory`.
- [x] T003 [US1] Update CSS in `src/components/astro/ServicesGrid.astro` to ensure gig cards have a fixed minimum width and `scroll-snap-align: start` (or center).
- [x] T004 [US1] Add CSS to hide scrollbars (`::-webkit-scrollbar { display: none; }`) in `src/components/astro/ServicesGrid.astro` to maintain the luxury aesthetic.
- [x] T005 [US1] Add left/right navigation arrow buttons for desktop in `src/components/astro/ServicesGrid.astro` using simple inline JS to scroll the container horizontally.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect the final experience

- [x] T006 Ensure the slider scroll direction adapts perfectly to LTR and RTL layouts (`dir="rtl"` vs `dir="ltr"`).

---

## Dependencies & Execution Order

### Phase Dependencies

- **User Stories (Phase 3+)**: Depend on Setup phase.
- **Polish (Final Phase)**: Depends on Phase 3 completion.

### Parallel Opportunities

- The tasks are highly sequential as they modify the same component file (`ServicesGrid.astro`).
