# Tasks: Fix Python Icon Visibility in Skills Scroller

**Input**: Design documents from `/specs/006-fix-python-icon-scroller/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and initial audit

- [x] T001 Create project structure per implementation plan (Completed)
- [x] T002 Audit `index.html` to identify all instances of Python, SQL, and Power BI icons in the scroller

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core definitions that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 [P] Extract and verify the standard high-quality Python SVG paths
- [x] T004 [P] Document a globally unique naming convention for SVG IDs in `index.html` (e.g., skill-id-instance)
- [x] T005 Identify all `mask0` and `paint_linear` collisions in `index.html`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Python Icon Visibility (Priority: P1) 🎯 MVP

**Goal**: Ensure the standard Python icon is visible and correctly colored without clipping.

**Independent Test**: Verify the first and second Python icons in the scroller render correctly without gradients "leaking" or paths being cut off.

### Implementation for User Story 1

- [x] T006 [US1] Correct `viewBox` attribute to `0 0 110 110` for first Python icon instance in `index.html`
- [x] T007 [US1] Rename gradient IDs (e.g., `python_gradient_1_1`) for first Python icon instance in `index.html`
- [x] T008 [US1] Update `fill="url(#...)"` references for first Python icon instance in `index.html`
- [x] T009 [US1] Correct `viewBox` attribute to `0 0 110 110` for second Python icon instance in `index.html`
- [x] T010 [US1] Rename gradient IDs (e.g., `python_gradient_1_2`) for second Python icon instance in `index.html`
- [x] T011 [US1] Update `fill="url(#...)"` references for second Python icon instance in `index.html`

**Checkpoint**: User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Consistent Icon Aesthetics (Priority: P2)

**Goal**: Standardize the style of all Python icons in the scroller.

**Independent Test**: Verify that the third Python icon (previously circular) now matches the first two in style and size.

### Implementation for User Story 2

- [x] T012 [US2] Replace the circular Python icon markup (starting line 3408) with the standard path-based logo in `index.html`
- [x] T013 [US2] Apply unique IDs to the third Python icon instance in `index.html`
- [x] T014 [US2] Verify the visual alignment and sizing match the SQL and Excel icons in `index.html`

**Checkpoint**: User Stories 1 and 2 should both work independently

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final audit and verification

- [x] T015 [P] Audit SQL and Power BI icons in `index.html` for similar ID collision risks and fix where necessary
- [x] T016 Run manual verification per `quickstart.md`
- [x] T017 Validate the fix using TestSprite visual regression

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all user stories being complete

### Parallel Example: User Story 1

```bash
# Instances can be updated in parallel if handled carefully to avoid merge conflicts
Task: "Correct viewBox and IDs for instance 1"
Task: "Correct viewBox and IDs for instance 2"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2
2. Complete Phase 3: User Story 1
3. **STOP and VALIDATE**: Verify first two icons are visible.

### Incremental Delivery

1. Fix first two icons (US1) → Visible and colored correctly.
2. Replace third icon (US2) → Aesthetic consistency achieved.
3. Final Audit → Global ID collision safety.
