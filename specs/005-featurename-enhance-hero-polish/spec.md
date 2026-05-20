# Feature Specification: Enhance Hero Section Polish

**Feature Branch**: `005-featurename-enhance-hero-polish`  
**Created**: 2026-05-09  
**Status**: Draft  
**Input**: Comprehensive polish request for Hero section (quote, hierarchy, skills, visual identity).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Elegant Quote Section (Priority: P1)

As a site visitor, I should see a cinematic and elegant quote in the left panel so that I am immediately struck by the professional and sophisticated branding of Amr Mousa.

**Acceptance Scenarios**:
1. **Given** the left hero section, **When** the page loads, **Then** the quote displays with a premium font pairing and refined line spacing.
2. **Given** the quote text, **When** viewed on desktop, **Then** key words like "trust" or "revenue" have subtle visual emphasis (e.g., slight color shift, weight, or glow).
3. **Given** the quote block, **When** viewed on desktop, **Then** it feels intentionally positioned and balanced within the split-screen layout.

---

### User Story 2 - Refined Information Hierarchy (Priority: P1)

As a site visitor, I should see a perfectly balanced and high-end information layout in the right panel so that I can easily scan Amr's role, name, skills, and value proposition.

**Acceptance Scenarios**:
1. **Given** the right hero section, **When** the page loads, **Then** the spacing between elements is consistent and creates a premium visual rhythm.
2. **Given** the professional role ("DATA & MARKETING ANALYST"), **When** viewed, **Then** it uses sophisticated typography that stands out as the primary category.
3. **Given** the description text, **When** viewed, **Then** it has ample "breathing room" and clear readability.

---

### User Story 3 - Organized Skills Layout (Priority: P2)

As a site visitor, I should see the core skills presented in a clean, organized manner so that they don't look cluttered or overwhelming.

**Acceptance Scenarios**:
1. **Given** the skills list, **When** viewed on desktop, **Then** they are split into two balanced, readable lines.
2. **Given** the skills presentation, **When** viewed, **Then** it maintains the premium/minimal aesthetic without distracting visual noise.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST update `.idea-text` to use a cinematic typography style (e.g., mixing a serif font for the quote with a subtle sans-serif for emphasis).
- **FR-002**: System MUST implement subtle emphasis on key words ("trust", "revenue") in the hero quote.
- **FR-003**: System MUST refine the CSS for `.split-right` to ensure consistent vertical rhythm and improved spacing between title, name, skills, and buttons.
- **FR-004**: System MUST reorganize the `.hero-skills-text` into two balanced lines for better scannability.
- **FR-005**: System MUST enhance the contrast and "glow balance" of the dark gradient aesthetic to feel more "high-end" and "cinematic".

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All text elements in the hero section are perfectly aligned and have balanced negative space.
- **SC-002**: The quote section occupies its own intentional space without feeling "floating" or disconnected.
- **SC-003**: The total number of skills displayed is organized into two distinct, readable lines on desktop.
- **SC-004**: Contrast ratios for all text against the gradient background meet or exceed WCAG AA standards for readability.

## Assumptions

- We will use existing fonts (`Poppins`, `Playfair Display`) but optimize their pairing and styling.
- "Cinematic" implies a focus on lighting (gradients/glows) and large, impactful typography with generous spacing.
- The user wants the *exact same* layout, meaning we stick to the split-screen and overall element ordering.
