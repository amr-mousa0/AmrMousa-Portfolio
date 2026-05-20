---
description: "Task list for Testimonials Feature implementation"
---

# Tasks: Testimonials Section

**Input**: Design documents from `/specs/010-testimonials/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Verify or download placeholder avatar images into the `images/` directory.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Implement the `testimonialsData` JavaScript array in `index.html` using the structure from data-model.md.
- [x] T003 Create the base HTML structure for the Testimonials section (`<section>`, heading, layout container) in `index.html`.

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Viewing Social Proof (Priority: P1) 🎯 MVP

**Goal**: As a potential client or recruiter, I want to read positive reviews in a clear, highly readable "Spotlight" format to build trust.

**Independent Test**: Can be fully tested by navigating to the Testimonials section and verifying the visual rendering, typography, and interactive fading between quotes.

### Implementation for User Story 1

- [x] T004 [US1] Implement HTML markup for the central active quote and author details in `index.html`.
- [x] T005 [P] [US1] Implement HTML markup for the navigation avatars/controls in `index.html`.
- [x] T006 [P] [US1] Apply CSS grid/flexbox layout styles to position the central quote and navigation correctly in `index.html`.
- [x] T007 [US1] Apply detailed typography (Playfair Display for quote) and Lux Cinematic coloring in `index.html`.
- [x] T008 [US1] Write Vanilla JS logic to render the active testimonial and handle click events on avatars in `index.html`.
- [x] T009 [US1] Implement CSS `transition` (fade/blur) and `will-change` properties for smooth quote switching in `index.html`.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories or general quality

- [x] T010 [P] Validate and adjust responsive breakpoints to ensure the Spotlight layout works flawlessly on mobile devices without overflow in `index.html`.
- [x] T011 [P] Verify and add accessibility attributes (`tabindex`, `role="button"`, `aria-label`) on avatar navigation controls in `index.html`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Parallel Opportunities

- HTML markup tasks and CSS layout tasks within US1 can be planned in parallel.
- Polish tasks for responsiveness and accessibility can be run in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently to ensure the "Spotlight" feel and smooth transitions meet the Lux Cinematic standard.
5. Complete Phase 4: Polish
