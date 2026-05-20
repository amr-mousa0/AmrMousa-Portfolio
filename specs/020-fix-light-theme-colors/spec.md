# Feature Specification: Light Theme Color Harmonization

**Feature Branch**: `020-fix-light-theme-colors`  
**Created**: 2026-05-20  
**Status**: Draft  
**Input**: User description: "fix the color issues in the light theme"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Brand Identity & Accent Harmonization (Priority: P1)

Users visiting the portfolio in light theme should experience the same high-end, premium brand identity as in the dark theme. The accent colors must be recognizable as the brand's signature teal (Accent A) and maroon/berry (Accent B), rather than generic blues.

**Why this priority**: Core visual consistency is essential for brand recall and authority. A mismatched color palette breaks the premium consultancy image.

**Independent Test**: Can be tested by switching the theme to light and verifying that the primary colors utilized for CTAs, indicators, links, and borders are light-optimized variations of the signature teal and maroon, rather than blue.

**Acceptance Scenarios**:

1. **Given** a user is on the website and clicks the theme toggle to select the light theme, **When** the page transitions to light mode, **Then** all primary actions and indicators display a brand-aligned teal, and secondary insights display a brand-aligned maroon.
2. **Given** the light theme is active, **When** viewing the primary button gradient, **Then** the gradient shifts smoothly between the brand-aligned light teal and light maroon accents.

---

### User Story 2 - Accessibility & Readability Compliance (Priority: P1)

Users with varying visual abilities must be able to read all content (including headings, body text, form labels, placeholders, and muted metadata) comfortably without straining, adhering to WCAG AA contrast standards.

**Why this priority**: Proper contrast is a legal, ethical, and practical necessity. Low readability increases bounce rates and reduces contact conversions.

**Independent Test**: Can be verified by running automated accessibility audits (e.g. Lighthouse, Axe) on the light theme and verifying that all text elements achieve a contrast ratio of at least 4.5:1 (3:1 for large text).

**Acceptance Scenarios**:

1. **Given** the light theme is active, **When** scanning body text, card content, and form inputs, **Then** the text contrast ratio against their respective white or light-gray backgrounds is at least 4.5:1.
2. **Given** the light theme is active, **When** viewing muted details (dates, tags, subtitle labels), **Then** they remain clearly legible and do not fade into the background.

---

### User Story 3 - Unified Hover and Elevation States (Priority: P2)

Users interacting with cards and navigation links in the light theme must receive clear, elegant, and tactile feedback (glows, borders, elevations, and text color shifts) that feel premium and functional.

**Why this priority**: Micro-interactions define the feel of "Quiet Luxury". Inconsistent hover styles or broken active states make the site feel unpolished.

**Independent Test**: Can be tested by hovering over cards (Services, Projects, Competencies) and navigation headers, verifying that shadows, borders, and text colors adapt cleanly to the light theme.

**Acceptance Scenarios**:

1. **Given** the light theme is active, **When** a user hovers over any portfolio card, **Then** the card lifts smoothly and displays a subtle light-optimized shadow/glow instead of a harsh dark shadow or dark glow.
2. **Given** the light theme is active, **When** the mobile navigation drawer is expanded, **Then** the drawer background is light and all text and menu items inside are fully visible and readable.

### Edge Cases

- **Contrast in Input Fields**: What happens when a user types in the contact form inputs in light theme? (The typed text color must be dark enough and the placeholder text must be readable and distinct from the background).
- **Toggle Button Visibility**: Does the theme toggle button itself remain highly visible and styled correctly in both dark and light modes? (Yes, the button background and border must invert properly to maintain contrast).
- **Sound Icon / Control Buttons**: Ensure header control icons (`langBtn`, `themeBtn`, `muteBtn`, `menuBtn`) have clear contrast and background states in light mode.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST define light-mode specific CSS variables for `--light-accent-a` (brand teal) and `--light-accent-b` (brand maroon), ensuring they are optimized for light backgrounds.
- **FR-002**: The system MUST ensure all text elements in the light theme achieve a contrast ratio of at least 4.5:1 against their backgrounds (e.g., body text, headers, and form inputs).
- **FR-003**: The primary CTA buttons (`.btn-primary`) in the light theme MUST have text that is legible and contrast-compliant against their gradient background.
- **FR-004**: The ghost CTA buttons (`.btn-ghost`) in the light theme MUST adapt their borders, text, and hover backgrounds to remain highly readable.
- **FR-005**: All component cards (Education, Competencies, Tools, Experience, Projects, Services, Achievements) MUST have light-theme specific backgrounds, borders, and shadows that render cleanly without visual glitches.
- **FR-006**: The mobile navigation drawer (`#drawer`) MUST have light-theme styles that provide high contrast for its background, icons, and text labels.
- **FR-007**: Testimonials quote background mark (double quote icon) MUST have a restrained, low-opacity color in light theme so it doesn't overlap or obscure the quote text.
- **FR-008**: Footer elements (including social icons, back-to-top button, and copyright text) MUST adapt cleanly to light theme with correct contrast and backgrounds.

### Key Entities

- **Theme Palette**: CSS variables defined in the base layer, controlling colors dynamically based on the `.light` class on the body.
- **Interactive Component Elements**: Buttons, links, inputs, and cards whose visual styles adapt according to the active theme.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of body text and heading elements in the light theme pass the WCAG AA contrast ratio threshold of >= 4.5:1.
- **SC-002**: Automated Lighthouse audits on the light theme report an accessibility score of >= 98/100.
- **SC-003**: Brand accent colors in light theme conform to the core palette (Teal & Maroon), replacing the unrelated blue/navy accents.
- **SC-004**: All hover, focus, and active interactive states on links, buttons, and cards function smoothly in light mode with no text disappearing or blending into the background.

## Assumptions

- The `Layout.astro` and `main.js` correctly apply the `light` class to `document.body` when toggled.
- The Tailwind theme configurations use the CSS variables so that changes to the variables propagate automatically to Tailwind classes.
