# Feature Specification: Sales Funnel Architecture

**Feature Branch**: `018-services-sales-copy`  
**Created**: 2026-05-19  
**Status**: Draft  

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Secondary Discovery Flow via About Page (Priority: P1)

High-ticket or skeptical clients who need deeper conviction beyond surface-level services can access a dedicated "About/Methodology" page from the Hero section to understand the analytical foundation behind the services.

**Why this priority**: Crucial for converting high-value prospects by establishing authority and proving a systemic approach rather than just listing skills.

**Independent Test**: Can be tested by clicking the new "Read the Methodology" CTA in the Hero section and verifying the routing, visual consistency, and responsive content rendering of the About page.

**Acceptance Scenarios**:

1. **Given** a user is on the Hero section, **When** they view the CTA area, **Then** a secondary ghost button "Read the Methodology" is visible (below the primary CTA on mobile, next to it on desktop).
2. **Given** a user clicks the "Read the Methodology" button, **When** the action completes, **Then** the user is routed to the `/about` page via an SEO-friendly `<a>` tag.
3. **Given** a user navigates the `/about` page, **When** they reach the bottom, **Then** they see the "Work With Me" hard close CTA.

---

### User Story 2 - Pristine URL & Seamless Navigation (Priority: P1)

Users navigating within the single-page sections (e.g., Contact) experience seamless smooth scrolling without URL hash clutter, maintaining a high-end, app-like consultancy experience.

**Why this priority**: A cluttered URL breaks the "Quiet Luxury" and premium aesthetic; a flawless navigation experience reinforces technical competence.

**Independent Test**: Can be verified by clicking anchor links and verifying that the view smoothly scrolls without appending `#hash` fragments to the browser's address bar.

**Acceptance Scenarios**:

1. **Given** a user clicks an internal anchor link (e.g., `#contact`), **When** the page scrolls, **Then** the browser's URL does not append or display the hash.
2. **Given** a user accesses the site via a shared link with a hash (e.g., `/#services`), **When** the page loads, **Then** the page automatically scrolls to the section and invisibly scrubs the hash from the URL using the History API.

---

### User Story 3 - Automated Quality Assurance Matrix (Priority: P2)

Before any deployment reaches the production server, an automated pipeline verifies performance, accessibility, SEO, cross-device responsiveness, and functional interactions.

**Why this priority**: Ensures long-term stability and guarantees that future updates do not degrade the strict 98/100 Lighthouse thresholds or break mobile interactions.

**Independent Test**: Can be fully tested by triggering a CI/CD build and verifying the execution of Lighthouse CI and Playwright tests against device profiles.

**Acceptance Scenarios**:

1. **Given** a new code commit is pushed, **When** the GitHub Actions pipeline runs, **Then** the build fails if Lighthouse scores for Mobile Performance, Accessibility, Best Practices, or SEO drop below 98/100.
2. **Given** Playwright E2E tests execute, **When** testing touch/swipe interactions on carousels across mobile emulators, **Then** the tests pass only if the interactions function flawlessly.

### Edge Cases

- What happens if the user has JavaScript disabled? (The anchor tags and standard `/about` routing must still function gracefully, albeit without the hash scrubbing).
- How does the system handle a direct URL visit to a specific hash if the content hasn't fully painted? (The scrub script should wait for the layout to stabilize before scrolling and stripping the hash).
- What happens if the Contact webhook fails during the Lead-Capture test? (The UI must display a graceful error state).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST include a secondary CTA button ("Read the Methodology" or "How I Think") in the Hero section linking to `/about`.
- **FR-002**: System MUST render the `/about` page using the global layout template (`Layout.astro`), highlighting the "About" navigation link state.
- **FR-003**: System MUST structure the `/about` page into three distinct sections: Personal Value Proposition (PVP), The 3-Step Framework diagram, and Contextual Social Proof (Engineering background).
- **FR-004**: System MUST include a "Hard Close" full-width CTA section at the bottom of the `/about` page directing to the Contact form/modal.
- **FR-005**: System MUST intercept internal `#hash` anchor clicks to perform smooth scrolling while actively preventing the browser from appending the hash to the URL.
- **FR-006**: System MUST scrub incoming `#hash` URLs via `history.replaceState()` immediately upon scrolling the user to the targeted section.
- **FR-007**: System MUST embed `BreadcrumbList` JSON-LD structured data on the `/about` page.
- **FR-008**: System MUST execute a GitHub Actions CI pipeline running Lighthouse CI with a minimum threshold of 98/100.
- **FR-009**: System MUST execute Playwright E2E UI tests targeting iOS, Android, and Tablet viewports.
- **FR-010**: System MUST validate the Contact form honeypot silently rejecting bot submissions while processing valid data to the webhook.

### Key Entities

- **About Page Document**: Structural HTML document housing the Deep-Dive funnel content.
- **Navigation State Manager**: JavaScript logic handling scroll interceptions and History API manipulation.
- **CI/CD Pipeline Configuration**: GitHub Actions YAML files defining the Lighthouse and Playwright testing matrices.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can access the `/about` page and the browser URL remains pristine (no hashes) during all internal section scrolling.
- **SC-002**: Automated Lighthouse CI pipeline strictly enforces a >= 98/100 score across all four core metrics; build is rejected otherwise.
- **SC-003**: Automated Playwright E2E suite reports 100% pass rate across 5 specified device emulators (iPhone 13 Pro, SE, Galaxy S22, Pixel 7, iPad Pro) for swipe interactions and hook validations.
- **SC-004**: Contact form bot submissions (honeypot triggered) result in a 0% webhook fire rate, while valid submissions fire 100% of the time.

## Assumptions

- Testing automation relies on GitHub Actions as the CI/CD provider.
- Playwright can adequately emulate touch events for the CSS scroll-snap carousels.
- Tailwind's typography plugin (`@tailwindcss/typography`) or existing prose classes are available for the `/about` page text fluidity.
- Contact form backend webhook is already configured and capable of handling test payloads.
