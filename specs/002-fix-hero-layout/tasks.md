# Tasks: Fix Hero Section Layout

**Input**: Design documents from `/specs/002-fix-hero-layout/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Verify project structure and `index.html` accessibility

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T002 Verify existence of `images/Amr-Mousa.JPG` in `index.html`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Fix Hero Typography and Visual Hierarchy (Priority: P1) 🎯 MVP

**Goal**: Make "Amr Mousa" the primary focal point with supporting text smaller.

**Independent Test**: Load `index.html` and verify "Amr Mousa" is the largest text element in the Hero section.

### Implementation for User Story 1

- [x] T003 [US1] Update `.hero-main-name` font size and weight in `index.html` to be the largest element.
- [x] T004 [US1] Reduce `.sub-heading` and `.hero-skills-text` font sizes in `index.html` to be smaller than the name.
- [x] T005 [US1] Adjust line heights and margins for name and surrounding text in `index.html` to fix visual hierarchy.

**Checkpoint**: User Story 1 fully functional and testable independently.

---

## Phase 4: User Story 2 - Adjust Layout Spacing and Positioning (Priority: P1)

**Goal**: Shift text content further left away from the image.

**Independent Test**: Load `index.html` and verify horizontal spacing between text and image on desktop.

### Implementation for User Story 2

- [x] T006 [US2] Adjust `.hero-text-content` or `.split-hero` layout (margin-left/padding-left) in `index.html` to shift text left.
- [x] T007 [US2] Verify `.idea-text` placement in `index.html` to ensure it doesn't overlap or clutter the adjusted layout.

**Checkpoint**: User Stories 1 AND 2 work independently.

---

## Phase 5: User Story 3 - Restore Missing Visual Elements (Priority: P1)

**Goal**: Restore profile image and add "Learn More" arrow.

**Independent Test**: Load `index.html` and see the image and the Learn More button.

### Implementation for User Story 3

- [x] T008 [US3] Restore original `src="images/Amr-Mousa.JPG"` if modified in `index.html`.
- [x] T009 [US3] Fix CSS masking/mask-image properties on `.hero-photo` or `.hero-image-container` in `index.html` if it was hiding the image.
- [x] T010 [US3] Add "Learn More" element with downward arrow icon at the bottom of the Hero section in `index.html`.
- [x] T011 [US3] Add scroll-to-next-section functionality for the "Learn More" button in `index.html`.

**Checkpoint**: All user stories functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Visual refinements and responsiveness

- [x] T012 Verify mobile responsiveness of shifted layout and adjusted font sizes in `index.html`.
- [x] T013 Final visual audit of heat map compatibility with new typography in `index.html`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup completion
- **User Stories (Phase 3+)**: All depend on Foundational phase completion

### User Story Dependencies

- **User Story 1 (P1)**: Priority 1
- **User Story 2 (P2)**: Priority 2
- **User Story 3 (P3)**: Priority 3
