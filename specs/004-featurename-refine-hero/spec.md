# Feature Specification: Refine Hero Content v2

**Feature Branch**: `004-featurename-refine-hero`  
**Created**: 2026-05-09  
**Status**: Draft  
**Input**: User description: "Amr Mousa Data Analyst & Media Buyer SQL • Power BI • Python I use data to understand systems, and marketing to understand people. الاحسن تعمل الشكل ده جربه كدده و كمان الكلام اللي ف السكشن الشمال اعمله كده Content builds relationships. Relationships are built on trust. Trust drives revenue صغر الخط و خليها بالعرض مش تحت بعض او قسمها لاتنين تحت بعض مش تلاته فاهمني ؟"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Update Hero Identity & Core Skills (Priority: P1)

As a site visitor, I should see a more accurate and concise professional identity for Amr Mousa so that I quickly understand his core competencies.

**Acceptance Scenarios**:
1. **Given** the hero section, **When** the page loads, **Then** the sub-heading displays "Data Analyst & Media Buyer".
2. **Given** the hero section, **When** the page loads, **Then** the skills list displays exactly "SQL • Power BI • Python".
3. **Given** the hero section, **When** the page loads, **Then** the intro tagline displays "I use data to understand systems, and marketing to understand people."

---

### User Story 2 - Redesign Decorative Quote Layout (Priority: P1)

As a site visitor, I should see a redesigned quote block in the left section that is more readable and takes up less vertical space.

**Acceptance Scenarios**:
1. **Given** the left hero section, **When** the page loads, **Then** the quote displays "Content builds relationships. Relationships are built on trust. Trust drives revenue".
2. **Given** the quote block, **When** viewed on desktop, **Then** the font size is smaller and the text is arranged horizontally (or in max 2 lines) rather than the previous 3+ lines.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST update `.sub-heading` text to "Data Analyst & Media Buyer".
- **FR-002**: System MUST update `.hero-skills-text` to "SQL • Power BI • Python".
- **FR-003**: System MUST update `.hero-intro-text` to "I use data to understand systems, and marketing to understand people."
- **FR-004**: System MUST update `.idea-text` content to the new "Content builds relationships..." quote.
- **FR-005**: System MUST adjust CSS for `.idea-text` to use a smaller font size and a wider container (or flex layout) to accommodate horizontal/2-line text.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Sub-heading and skills exactly match the requested strings.
- **SC-002**: The quote block in the left section occupies no more than 2 lines of text on standard desktop resolutions.
- **SC-003**: All text is readable and visually balanced within the hero section.

## Assumptions

- We assume "horizontal" means the text should flow naturally with a larger max-width to avoid excessive line breaks.
- We assume the previous 200px `right` offset for `.idea-text` is still desirable to avoid image overlap.
