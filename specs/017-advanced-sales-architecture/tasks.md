---
description: "Task list template for Advanced Sales Architecture implementation"
---

# Tasks: Advanced Sales Architecture

**Input**: Design documents from `/specs/017-advanced-sales-architecture/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Update `tailwind.config.mjs` to map existing CSS variables (`--light-accent-a`, `--light-bg`, etc.) to Tailwind colors without altering the global.css.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [X] T002 [P] Create `src/data/services.json` containing the Data Analytics, Media Buying, and Automation service structures outlined in `data-model.md`.
- [X] T003 [P] Update `src/data/projects.json` to ensure project descriptions follow the STAR method (e.g., "Optimized Operations for $84.7K Revenue").

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - The "3-Second Hook" (Priority: P1) 🎯 MVP

**Goal**: Deliver an immediate, high-impact value proposition to business owners via the Hero and Trust-Bar.

**Independent Test**: Load the homepage and verify the Hero text and the 3 metric points in the Trust-Bar appear instantly.

### Implementation for User Story 1

- [X] T004 [P] [US1] Create `src/components/ui/TrustBar.astro` displaying the 3 quantifiable metrics (e.g., +250% ROI Growth) in a horizontal flexbox.
- [X] T005 [US1] Refactor `src/components/sections/Hero.astro` (or the hero section in `index.astro`) to implement the split layout and the exact English H1/Sub-headline copy.
- [X] T006 [US1] Integrate `TrustBar` immediately below the `Hero` section in `src/pages/index.astro`.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - The Frictionless Mobile Browser (Priority: P1)

**Goal**: Implement Zero-JS, CSS-only scroll-snap carousels for Services and Projects, along with a sticky mobile CTA and a Honeypot form.

**Independent Test**: Swipe horizontally on Services/Projects on a mobile viewport and verify they snap without lag.

### Implementation for User Story 2

- [X] T007 [P] [US2] Create `src/components/sections/ServicesCarousel.astro` utilizing CSS `scroll-snap-type: x mandatory` and Tailwind grid (desktop). 
- [X] T008 [P] [US2] Update `src/components/astro/ProjectSlider.astro` (or equivalent projects component) to strictly use CSS `scroll-snap` instead of JavaScript frameworks.
- [X] T009 [US2] Add a hidden Honeypot input field (`<input type="text" name="_gotcha" style="display:none">`) to the contact form component to block spam.
- [X] T010 [US2] Implement a sticky Mobile Floating Action Button (FAB) or bottom bar in `src/layouts/Layout.astro` or `index.astro` that scrolls to the contact section.
- [X] T011 [US2] Integrate `ServicesCarousel` into `src/pages/index.astro`.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - The Search Engine Bot (Priority: P2)

**Goal**: Inject proper JSON-LD schema markup and enforce semantic HTML for maximum local/global SEO ranking.

**Independent Test**: Run the site through Google Rich Results testing tool.

### Implementation for User Story 3

- [X] T012 [P] [US3] Add the `ProfessionalService` and `OfferCatalog` JSON-LD structures to `src/components/BaseHead.astro` (or `Layout.astro` `<head>`).
- [X] T013 [US3] Audit and update `Hero`, `ServicesCarousel`, and `Projects` components to ensure they strictly use `<main>`, `<section>`, and `<article>` tags.

**Checkpoint**: All user stories should now be independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T014 [P] Run Lighthouse audits (Mobile) to verify 98-100 Performance Score and 0 Cumulative Layout Shift (CLS). Ensure all touch targets are at least 48x48px.
- [X] T015 [P] Run Google Rich Results test on local build to validate Schema.org JSON-LD.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User Story 1 and 2 can proceed in parallel.
  - User Story 3 can proceed independently or in parallel.
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) 
- **User Story 3 (P2)**: Can start after Foundational (Phase 2)

### Parallel Opportunities

- T002 and T003 (Foundational data) can run in parallel.
- T004 (TrustBar), T007 (ServicesCarousel), and T008 (ProjectSlider) can be developed entirely in parallel since they are isolated components.

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Phase 1 & 2 (Setup & Foundational).
2. Complete Phase 3 (US1 - Hook).
3. Complete Phase 4 (US2 - Frictionless Mobile).
4. **STOP and VALIDATE**: Test on mobile device via DevTools.

### Incremental Delivery

1. Complete Setup + Foundational.
2. Deliver US1 (Hero/Trust Bar) → Verify high-impact copy.
3. Deliver US2 (Carousels/Honeypot) → Verify Zero-JS performance.
4. Deliver US3 (Schema) → Verify SEO.
