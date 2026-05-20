# Tasks: Mobile Footer & Contact Layout

**Input**: Design documents from `/specs/021-mobile-footer-contact/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: Tests are manual visual layout checks since this feature concerns markup rendering, CSS transitions, and internationalization.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Configure new localized translation keys for the footer in `public/js/translations.js`
- [ ] T002 Add CSS styling variables and colors for the footer in `src/styles/tailwind.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core layout components that must be complete before any user story can be verified

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T003 Setup the basic file structure and import dependencies in `src/components/ui/Footer.astro`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Instant Mobile Communication (Priority: P1) 🎯 MVP

**Goal**: Implement the global footer layout on both desktop and mobile, with direct Call and WhatsApp quick action buttons visible on mobile screens.

**Independent Test**: Verify that the footer displays correctly on both viewports, and on mobile, the Call/WhatsApp buttons trigger their respective actions in 1 tap.

### Implementation for User Story 1

- [ ] T004 [US1] Create the complete HTML/Astro template and translations in `src/components/ui/Footer.astro`
- [ ] T005 [P] [US1] Implement responsive layout and mobile CTA button styles in `src/styles/tailwind.css`
- [ ] T006 [US1] Import and render the `<Footer />` component in `src/pages/index.astro`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Mobile Contact Section Optimization (Priority: P2)

**Goal**: Make the contact form on mobile screens collapsible to reduce page height, using a smooth expand/collapse transition triggered by a dedicated action button.

**Independent Test**: Verify that on mobile screens (< 768px), the form is collapsed by default and expands smoothly upon clicking the toggle button.

### Implementation for User Story 2

- [ ] T007 [US2] Add the toggle markup and layout containers in `src/components/sections/Contact.astro`
- [ ] T008 [US2] Implement the expanding state toggle script in `src/components/sections/Contact.astro`
- [ ] T009 [P] [US2] Implement CSS transition animations for form expansion in `src/styles/tailwind.css`

**Checkpoint**: At this point, User Stories 1 and 2 should both work independently

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Final visual refinements and verification checks

- [ ] T010 [P] Refine paddings, margins, and bottom offsets to align with the sticky/static bar without overlaps
- [ ] T011 Verify compilation and static build outputs by executing `npm run build`
- [ ] T012 Run the local quickstart verification list to confirm zero CLS and responsive alignment

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User Story 2 can proceed in parallel with User Story 1 since they modify separate files (`Contact.astro` vs `Footer.astro`).
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### Parallel Opportunities

- T001 and T002 can be implemented in parallel.
- Once Phase 2 completes, Developer A can work on US1 (T004, T005, T006) while Developer B works on US2 (T007, T008, T009).

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Verify that the global footer and mobile call/WhatsApp buttons render correctly.

### Incremental Delivery

1. Foundation ready
2. Add User Story 1 → Test → Deploy/Demo (MVP!)
3. Add User Story 2 → Test → Deploy/Demo
