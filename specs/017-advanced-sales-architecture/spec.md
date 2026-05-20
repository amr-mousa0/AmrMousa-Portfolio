# Feature Specification: Advanced Sales Architecture

**Feature Branch**: `017-advanced-sales-architecture`  
**Created**: 2026-05-18  
**Status**: Draft  
**Input**: User description provided a comprehensive technical, SEO, and copywriting blueprint for a high-converting, Zero-JS Astro portfolio.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - The "3-Second Hook" Business Owner (Priority: P1)

As a business owner or decision-maker, I want to immediately understand the measurable ROI Amr brings within 3 seconds of page load, so I can confidently decide to explore his services.

**Why this priority**: The primary goal is direct lead generation and gig sales. The initial hook determines the bounce rate.

**Independent Test**: Can be tested by loading the Hero and Trust-Bar sections and verifying the exact high-impact copy and metrics (+250% ROI, etc.) are instantly visible above the fold.

**Acceptance Scenarios**:
1. **Given** a user lands on the homepage, **When** the page loads, **Then** the H1 clearly states "I use data to understand systems..." and the split-view layout centers the profile image.
2. **Given** the user scrolls slightly, **When** viewing the Trust-Bar, **Then** they see 3 quantifiable metric points (e.g., +250% ROI Growth).

---

### User Story 2 - The Frictionless Mobile Browser (Priority: P1)

As a user browsing on a mobile device, I want a lightning-fast, native-feeling experience without layout jumps or heavy scripts, so I can seamlessly swipe through services and projects.

**Why this priority**: Mobile performance and UX directly correlate with conversion rates. Core Web Vitals obsession is a stated goal.

**Independent Test**: Can be tested on a mobile device by swiping horizontally through the Services section to ensure CSS scroll-snapping works perfectly without JavaScript lag.

**Acceptance Scenarios**:
1. **Given** the user is in the Services section on a phone, **When** they swipe horizontally, **Then** the cards snap into place smoothly using purely CSS.
2. **Given** the user is on mobile, **When** they scroll anywhere on the page, **Then** a sticky "Start a Project" Floating Action Button (FAB) or bottom bar remains accessible.

---

### User Story 3 - The Search Engine Bot (Priority: P2)

As a search engine bot, I want perfectly structured JSON-LD and semantic HTML, so I can accurately index Amr as a Professional Service provider and rank him for relevant local (MENA) and global queries.

**Why this priority**: Technical SEO is the engine for passive lead generation.

**Independent Test**: Can be tested by running the URL through Google's Rich Results Test tool to verify the `ProfessionalService` and `OfferCatalog` schemas.

**Acceptance Scenarios**:
1. **Given** the page is rendered, **When** inspecting the `<head>`, **Then** complete JSON-LD schemas for Person, ProfessionalService, and specific Offerings are present.
2. **Given** the page layout, **When** inspecting the DOM, **Then** semantic tags (`<main>`, `<section>`, `<article>`) are used correctly.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST strictly adhere to the existing color palette and global CSS variables; Tailwind config must extend these exact variables (e.g., `var(--light-accent-a)`).
- **FR-002**: System MUST implement a "Zero-JS by default" architecture utilizing Astro's partial hydration (e.g., `client:idle` only where strictly necessary), relying on CSS `scroll-snap` for mobile carousels.
- **FR-003**: System MUST apply explicit width/height attributes to all images/cards to guarantee a Cumulative Layout Shift (CLS) of 0.
- **FR-004**: System MUST inject the exact provided English copywriting for the Hero, Trust-Bar, Services (Data Analytics, Media Buying, Automation), and Projects.
- **FR-005**: System MUST ensure all interactive buttons/links have a minimum touch target area of 48x48px.
- **FR-006**: System MUST implement a sticky mobile-exclusive Floating Action Button (FAB) or bottom bar reading "Start a Project".
- **FR-007**: System MUST use a hidden "Honeypot" field for the contact form to block spam, strictly avoiding heavy reCAPTCHA scripts.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Mobile PageSpeed Insights score MUST consistently hit 98-100.
- **SC-002**: Core Web Vitals LCP MUST be < 2.5s and CLS MUST be 0.0.
- **SC-003**: Google Rich Results Test MUST validate the `ProfessionalService` and `OfferCatalog` schemas without errors.
- **SC-004**: The Services and Projects carousels MUST function natively on mobile with JavaScript disabled in the browser.

## Assumptions

- The existing `global.css` animations and transitions will remain intact and be applied via standard class names alongside Tailwind utilities.
- Contact form submissions will be routed through a fast API endpoint (like Formspree or a simple Astro endpoint).
