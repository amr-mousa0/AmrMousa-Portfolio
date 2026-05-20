# Tasks: Light Theme Color Harmonization

**Input**: Design documents from `/specs/020-fix-light-theme-colors/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Running Playwright E2E tests and manual browser inspections.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Paths assume single project structure: `src/styles/tailwind.css`, `tests/` at repository root.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize branch 020-fix-light-theme-colors and set up specification references in AGENTS.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Verify the theme toggle logic and application hooks

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T002 Verify theme toggle hook and local test page in src/layouts/Layout.astro and public/js/main.js

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Brand Identity & Accent Harmonization (Priority: P1) 🎯 MVP

**Goal**: Align light theme accents with Teal and Maroon brand identity.

**Independent Test**: Switch to light theme and verify accents are Teal and Maroon.

### Implementation for User Story 1

- [ ] T003 [US1] Update Accent A (Teal `#006679`) and Accent B (Maroon `#9b2e68`) CSS variables in src/styles/tailwind.css
- [ ] T004 [US1] Update RGB color variables `--light-accent-a-rgb` (`0, 102, 121`) and `--light-accent-b-rgb` (`155, 46, 104`) in src/styles/tailwind.css

**Checkpoint**: User Story 1 is fully functional and testable independently.

---

## Phase 4: User Story 2 - Accessibility & Readability Compliance (Priority: P1)

**Goal**: Ensure all text and components in light mode pass WCAG AA contrast ratio of at least 4.5:1.

**Independent Test**: Run contrast checker/Lighthouse audits on light theme.

### Implementation for User Story 2

- [ ] T005 [P] [US2] Update main text (`--light-text: #071026;`) and muted text (`--light-muted: #4a5568;`) variables in src/styles/tailwind.css
- [ ] T006 [US2] Refactor primary gradient button `.btn-primary` and hover state `.btn-ghost:hover` text visibility in src/styles/tailwind.css
- [ ] T007 [US2] Implement frosted-glass light theme styles for mobile drawer menu (`.drawer`, `.menu-item`, `.icon-box`, `.label`) in src/styles/tailwind.css
- [ ] T008 [US2] Audit and adjust input field text and placeholder colors in the contact form in src/styles/tailwind.css

**Checkpoint**: User Story 2 is fully functional and testable.

---

## Phase 5: User Story 3 - Unified Hover and Elevation States (Priority: P2)

**Goal**: Elegant visual feedback (shadows, borders, elevations) on hover for cards in light theme.

**Independent Test**: Hover over card components in light theme and verify shadows.

### Implementation for User Story 3

- [ ] T009 [P] [US3] Override component card backgrounds, borders, and hover elevations for light theme in src/styles/tailwind.css
- [ ] T010 [US3] Verify double-quote icon opacity in testimonials section spotlight in src/styles/tailwind.css

**Checkpoint**: All user stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T011 Run Playwright E2E tests using `npx playwright test`
- [ ] T012 Run local production build using `npm run build`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion.
- **Polish (Final Phase)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories.
- **User Story 2 (P2)**: Can start after US1 is implemented.
- **User Story 3 (P3)**: Can start after US2 is implemented.

---

## Parallel Opportunities

- All Setup tasks marked [P] can run in parallel.
- All Foundational tasks marked [P] can run in parallel.
- Card hover overrides (T009) and main text colors (T005) can run in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently in browser.
