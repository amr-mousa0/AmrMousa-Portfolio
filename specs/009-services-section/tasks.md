---
description: "Task list for Services Section implementation"
---

# Tasks: Services Section

**Input**: Design documents from `/specs/009-services-section/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui-components.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `index.html` at repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Setup empty script block or locate existing script area for services data in index.html

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Add the base `<section id="services">` wrapper structure below the experience section in index.html
- [x] T003 Add the base `.service-modal-overlay` structure (hidden) at the end of the body in index.html

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Viewing Available Services (Priority: P1) 🎯 MVP

**Goal**: Users visiting the portfolio want to see what specific professional services Amr Mousa offers so they can determine if he matches their business needs.

**Independent Test**: Navigate to the Services section and verify all service cards render correctly on both mobile and desktop with hover effects.

### Implementation for User Story 1

- [x] T004 [US1] Create service card HTML markup for all 6 services inside the grid in index.html
- [x] T005 [US1] Add CSS for `.services-grid` and `.service-card` basic layout in index.html
- [x] T006 [US1] Add CSS for glassmorphism, hover effects (`transform: translateY(-5px)`), and `blur-others` interaction in index.html

**Checkpoint**: At this point, User Story 1 should be fully functional with visible cards and styling.

---

## Phase 4: User Story 2 - Inquiring About a Service (Priority: P1)

**Goal**: Users interested in a specific service want to easily inquire about it via a detailed modal and quick contact CTA.

**Independent Test**: Click a service card to see the modal open with the correct data, and click "Discuss Your Project" to scroll to the contact form.

### Implementation for User Story 2

- [x] T007 [US2] Define `servicesData` JavaScript object array containing details (deliverables, type) for all 6 services in index.html
- [x] T008 [US2] Add CSS styling for the `.service-modal` (overlay, content box, typography, animations) in index.html
- [x] T009 [US2] Implement JavaScript logic to open modal, populate content from `servicesData`, handle modal closing, and handle the Contact CTA scroll in index.html

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T010 Adjust mobile responsiveness (media queries) for services grid (single column) and modal sizing in index.html
- [x] T011 Verify and add accessibility attributes (`tabindex`, `role`, `aria-label`, `aria-hidden`) on service cards and modal controls in index.html
- [x] T012 Add explicit "Explore Details" CTA and implement semantic category color themes
- [x] T013 Optimize performance with `will-change` and refine interactive focus states

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - US1 and US2 are somewhat sequential here because US2 (Modal) depends on clicking the cards generated in US1.
- **Polish (Final Phase)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P1)**: Should ideally start after US1 is complete, as it requires the cards to be clickable.

### Implementation Strategy

#### Incremental Delivery

1. Complete Setup + Foundational (Structure ready).
2. Add User Story 1 (Cards visible & styled) -> Test visual grid.
3. Add User Story 2 (Modal & Data logic) -> Test interactions and CTA.
4. Polish (Mobile & Accessibility).
