---
description: "Task list for Sales Funnel Architecture feature implementation"
---

# Tasks: Sales Funnel Architecture

**Input**: Design documents from `specs/019-sales-funnel-architecture/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure for testing frameworks.

- [x] T001 Initialize Playwright configuration in `playwright.config.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T002 Scaffold the base page structure for `src/pages/about.astro` extending `Layout.astro`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Secondary Discovery Flow via About Page (Priority: P1) 🎯 MVP

**Goal**: High-ticket prospects can access a dedicated "About/Methodology" page from the Hero section to understand the analytical foundation behind the services.

**Independent Test**: Click the new "Read the Methodology" CTA in the Hero section and verify routing, visual consistency, and responsive content rendering of the About page.

### Implementation for User Story 1

- [x] T003 [P] [US1] Inject secondary "Read the Methodology" CTA button into `src/components/astro/Hero.astro`
- [x] T004 [US1] Implement Personal Value Proposition (PVP) and 3-Step Framework diagram in `src/pages/about.astro`
- [x] T005 [US1] Implement Contextual Social Proof (Engineering background) in `src/pages/about.astro`
- [x] T006 [US1] Add the "Work With Me" hard close CTA block at the bottom of `src/pages/about.astro`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Pristine URL & Seamless Navigation (Priority: P1)

**Goal**: Users navigating within single-page sections experience seamless smooth scrolling without URL hash clutter, maintaining a high-end, app-like consultancy experience.

**Independent Test**: Verify clicking internal anchor links smooth scrolls without appending `#hash` fragments to the browser URL, and incoming hashed URLs are scrubbed correctly.

### Implementation for User Story 2

- [x] T007 [P] [US2] Implement Zero-Hash navigation intercept and History API scrub script in `src/layouts/Layout.astro`
- [x] T008 [P] [US2] Inject `BreadcrumbList` JSON-LD schema into `src/pages/about.astro`
- [x] T009 [US2] Ensure the "About" link in the Header navigation is highlighted when the user is on the About route in `src/layouts/Layout.astro`

**Checkpoint**: Navigation and routing state are seamless and SEO-optimized.

---

## Phase 5: User Story 3 - Automated Quality Assurance Matrix (Priority: P2)

**Goal**: An automated pipeline verifies performance, accessibility, SEO, cross-device responsiveness, and functional interactions before production deployment.

**Independent Test**: Trigger a CI/CD build and verify the execution of Lighthouse CI and Playwright tests against device profiles.

### Implementation for User Story 3

- [x] T010 [P] [US3] Create Lighthouse CI GitHub Actions pipeline in `.github/workflows/lighthouse.yml`
- [x] T011 [P] [US3] Create Playwright E2E GitHub Actions pipeline in `.github/workflows/playwright.yml`
- [x] T012 [P] [US3] Implement E2E validation tests for mobile swipe, hero hooks, and pristine URLs in `tests/e2e/portfolio.spec.ts`

**Checkpoint**: All user stories are independently functional and protected by the QA Matrix.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T013 [P] Audit and apply Tailwind prose classes to ensure perfect long-form legibility on mobile in `src/pages/about.astro`
- [x] T014 Run quickstart.md validation to ensure testing pipelines function as documented locally.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion.
- **Polish (Final Phase)**: Depends on all user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational. No dependencies.
- **User Story 2 (P1)**: Can start after Foundational. Modifies global layout but operates independently of US1 content.
- **User Story 3 (P2)**: Depends on the existence of the features from US1 and US2 for the tests to pass.

### Parallel Opportunities

- E2E configuration and CI/CD pipelines (US3) can be written in parallel with the frontend work (US1/US2) using mocked tests initially.
- The Zero-Hash script injection (US2) can run entirely in parallel with the About page content creation (US1).

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup and Foundational tasks.
2. Complete Phase 3: User Story 1 (Hero CTA and About Page content).
3. **STOP and VALIDATE**: Test the routing and layout of the new deep-dive funnel.

### Incremental Delivery

1. Implement US1 -> Deploy the About page.
2. Implement US2 -> Seamless navigation experience enhanced.
3. Implement US3 -> Lockdown code quality with automated CI/CD matrices.
