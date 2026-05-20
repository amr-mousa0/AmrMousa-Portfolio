# Feature Specification: Services Section

**Feature Branch**: `009-services-section`
**Created**: 2026-05-15
**Status**: Draft
**Input**: User description: "Add a services section matching the design and style. Need a full plan before starting. Also need different ideas for services... campaigns (package), real-time analysis (standalone)... Where to place the section? What happens when clicking?"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Viewing Available Services (Priority: P1)

Users visiting the portfolio want to see what specific professional services Amr Mousa offers so they can determine if he matches their business needs.

**Why this priority**: It is the core function of the section. If users can't see the services, they won't convert.

**Independent Test**: Can be fully tested by navigating to the Services section and verifying all service cards render correctly on both mobile and desktop.

**Acceptance Scenarios**:

1. **Given** a user is scrolling down the page, **When** they reach the Services section, **Then** they should see a grid of service cards.
2. **Given** a service card, **When** hovered over, **Then** it should display a subtle, premium glassmorphic glow effect matching the "Lux Cinematic" design context.

---

### User Story 2 - Inquiring About a Service (Priority: P1)

Users interested in a specific service want to easily inquire about it without having to manually type out which service they want.

**Why this priority**: Conversion is the ultimate goal of the portfolio. Making it easy to inquire reduces friction.

**Independent Test**: Can be fully tested by clicking a service CTA button and ensuring the expected action occurs.

**Acceptance Scenarios**:

1. **Given** a service card, **When** the user clicks the action button, **Then** [NEEDS CLARIFICATION: Does it open a modal with more details, or scroll directly to the contact form with the service pre-filled?].

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a dedicated "Services" section.
- **FR-002**: Section MUST be placed [NEEDS CLARIFICATION: After "Who Am I" or after "Experience"?].
- **FR-003**: System MUST display cards for the following services: [NEEDS CLARIFICATION: Confirm the final list of services. Suggested: 1. Strategic Campaign Analysis, 2. Real-Time Data Dashboards, 3. Consumer Behavior Segmentation, 4. Data-Driven Consultation].
- **FR-004**: Each service card MUST include a title, description, and an interactive CTA button.
- **FR-005**: Visual design MUST adhere to the existing "Lux Cinematic" guidelines (Dark-first, high contrast, tactile interactions).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All service cards render properly and maintain full responsiveness across mobile (single column) and desktop (grid layout).
- **SC-002**: CTA button clicks correctly execute the defined action (e.g., scrolling to the contact form).
- **SC-003**: Section aesthetic seamlessly matches the rest of the portfolio without introducing new, conflicting color palettes or interaction models.

## Assumptions

- The section will use existing CSS variables for colors, typography, and spacing.
- The interaction logic (e.g., `blur-others`) previously developed for other cards can be adapted or reused for the service cards.
