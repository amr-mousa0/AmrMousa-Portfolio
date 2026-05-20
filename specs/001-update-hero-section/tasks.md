---
description: "Task list for updating the hero section"
---

# Tasks: Update Hero Section

**Input**: Design documents from `/specs/001-update-hero-section/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

*(No setup required for this static HTML update)*

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

*(No foundational tasks required for this static HTML update)*

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Update HTML Layout (Priority: P1) 🎯 MVP

**Goal**: Update the hero section of `index.html` to reflect the updated design in `code.html`, while retaining the existing URLs and references so that the updated design works seamlessly without broken links.

**Independent Test**: Visually verify `index.html` renders the new hero layout.

### Implementation for User Story 1

- [x] T001 [US1] Extract clean text content (subheading, skills, intro) from the AI-generated markup in `code.html`
- [x] T002 [US1] Apply the updated text to the `.split-right` container in `index.html` while preserving existing layout, URLs, and references
- [x] T003 [US1] Verify that `code.html` style classes are compatible and display correctly in `index.html`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T004 Run manual validation (open `index.html` in browser and test all hero section links)

---

## Dependencies & Execution Order

### Phase Dependencies

- **User Story 1 (P1)**: Can start immediately since no setup or foundational tasks are required.
- **Polish (Final Phase)**: Depends on US1 being complete.

### User Story Dependencies

- **User Story 1 (P1)**: No dependencies.

### Parallel Opportunities

- T001 and T003 can be evaluated in parallel. T002 depends on T001.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 3: User Story 1 (T001, T002, T003)
2. **STOP and VALIDATE**: Test User Story 1 independently using Phase 4 (T004)
3. Deploy/demo
