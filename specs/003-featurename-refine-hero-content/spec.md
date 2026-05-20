# Feature Specification: Refine Hero Content

**Feature Branch**: `003-featurename-refine-hero-content`  
**Created**: 2026-05-09  
**Status**: Draft  
**Input**: User description: "Data Analyst | Marketing & Growth Enthusiast Amr Mousa SQL • Power BI • Python • Excel • Data Analysis • Marketing Analytics • Media Buying • Content Strategy الكلام كنتير اوي العين مش مرتاحه خليها كده Amr Mousa Data Analyst | Marketing & Growth Enthusiast SQL • Power BI • Python • Media Buying و ديه I analyze data to understand systems, and marketing to understand people. و Data reveals the direction. Marketing reveals the behavior. Growth happens when both connect ده احدفه شمااااااال شويه هو حرفيا طالع علي الصوره اي القرف ده"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Simplify Hero Content for Readability (Priority: P1)

As a site visitor, I should see a concise list of skills and a clear introductory text so that the hero section doesn't feel cluttered or overwhelming to read.

**Why this priority**: The current text is too dense ("الكلام كتير اوي العين مش مرتاحه"), which negatively impacts the user experience and first impression of the portfolio.

**Independent Test**: Can be tested by loading the homepage and verifying that the skills list only contains the 4 requested skills and the new introductory phrase is present.

**Acceptance Scenarios**:

1. **Given** the hero section, **When** the page loads, **Then** the skills list displays exactly "SQL • Power BI • Python • Media Buying" without the extra previous skills.
2. **Given** the hero section, **When** the page loads, **Then** the text "I analyze data to understand systems, and marketing to understand people." is clearly visible.
3. **Given** the hero section, **When** the page loads, **Then** the quote "Data reveals the direction. Marketing reveals the behavior. Growth happens when both connect" is clearly visible.

---

### User Story 2 - Fix Text and Image Overlap (Priority: P1)

As a site visitor, I should see the main text block positioned sufficiently to the left so that it does not overlap with or touch the profile image.

**Why this priority**: The text is currently overlapping the image ("حرفيا طالع علي الصوره"), which breaks the layout and looks unprofessional.

**Independent Test**: Can be tested by observing the layout on desktop view and verifying the spatial separation between the text and the profile image.

**Acceptance Scenarios**:

1. **Given** the hero section layout, **When** viewed on a desktop screen, **Then** the text block is shifted to the left, creating clear separation from the image.
2. **Given** the hero section layout, **When** viewed on a desktop screen, **Then** no text elements overlap the profile image or its container.

### Edge Cases

- How does the layout handle smaller screens (mobile/tablet) when the text is shifted to the left? (Assumption: Mobile maintains a stacked layout where overlap is not an issue).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST update the skills list text to exactly "SQL • Power BI • Python • Media Buying".
- **FR-002**: System MUST include the text "I analyze data to understand systems, and marketing to understand people." in the hero introductory section.
- **FR-003**: System MUST include the quote "Data reveals the direction. Marketing reveals the behavior. Growth happens when both connect" in the hero section.
- **FR-004**: System MUST apply layout styling to shift the main text container further to the left to prevent any overlap with the profile image on desktop viewports.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The skills list word count is reduced to the specified 4 skills.
- **SC-002**: A 100% visible gap exists between the right edge of the text block and the left edge of the profile image on screens wider than 1024px.
- **SC-003**: Both requested text phrases are present and readable without visual clutter.

## Assumptions

- We assume the text shift to the left is primarily for desktop/tablet views, and mobile view will maintain its centered, stacked layout.
- We assume the previous long introductory paragraph ("Passionate about using data...") should be replaced or updated to include the new "I analyze data..." text.
