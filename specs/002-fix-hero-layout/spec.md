# Feature Specification: Fix Hero Section Layout

**Feature Branch**: `[###-feature-name]`  
**Created**: 2026-05-09  
**Status**: Draft  
**Input**: User description: "دلوقتي الشكل مش مظبوط خالص بتاع الهيرو سيكشن ال Data Analyst | Marketing & Growth Enthusiast Amr Mousa Data Analysis • SQL • Power BI • Marketing Analytics • Media Buying  الكتابه ديه مش كويسه خالص كاسره الرؤيه واخده الشكل بتاع الاسم خالص و مبزظه الهيت ماب محتاج الاسم يكون الهيرو و الخطوط التانيه اللي تحته و وفقه تكون اصغر   كمان الشكل ده لازم يدخل شمال شويه بعيد عن الصوره Data reveals the direction. Marketing reveals the behavior. Growth happens when both connect و كمان الصوره مش موجوده اتأكد من اليو ر ال للصوره مضبوط و مجتش جمبه ولا عدلته و كمان ليرن مور مش موجوده اللي هيا لورن مور و سهم لتحت فين ؟؟"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Fix Hero Typography and Visual Hierarchy (Priority: P1)

As a site visitor, I should immediately see the name "Amr Mousa" as the primary focal point of the hero section, with supporting titles and skills visually subordinated, so that the visual hierarchy is clear and aesthetically pleasing.

**Why this priority**: The hero section is the first impression of the portfolio. Broken typography and visual hierarchy immediately detract from the professional presentation.

**Independent Test**: Can be tested by loading the homepage and verifying that "Amr Mousa" is the largest text element in the hero, while the roles and skills above and below are noticeably smaller.

**Acceptance Scenarios**:

1. **Given** the hero section on the homepage, **When** the page loads, **Then** the name "Amr Mousa" is the largest and most prominent text element.
2. **Given** the hero section on the homepage, **When** the page loads, **Then** the text "Data Analyst | Marketing & Growth Enthusiast" and "Data Analysis • SQL • Power BI • Marketing Analytics • Media Buying" are distinctly smaller than the name.
3. **Given** the background heat map effect, **When** the page loads, **Then** the adjusted typography does not break or obscure the heat map visual.

---

### User Story 2 - Adjust Layout Spacing and Positioning (Priority: P1)

As a site visitor, I should see the main text block positioned further to the left, providing adequate breathing room between the text and the profile image on the right.

**Why this priority**: Overlapping or cramped elements make the design look cluttered and unprofessional.

**Independent Test**: Can be tested by observing the layout on desktop view and verifying the spatial separation between the text column and the image column.

**Acceptance Scenarios**:

1. **Given** the hero section layout, **When** viewed on a desktop screen, **Then** the text block is shifted slightly to the left, creating clear separation from the image.
2. **Given** the hero section layout, **When** viewed on a desktop screen, **Then** the quote "Data reveals the direction. Marketing reveals the behavior. Growth happens when both connect" is visibly placed and well-aligned within the text block.

---

### User Story 3 - Restore Missing Visual Elements (Priority: P1)

As a site visitor, I should see the correct profile image loaded and a "Learn More" indicator with a downward arrow to guide me further down the page.

**Why this priority**: A broken image URL results in an empty or broken visual state. The missing "Learn More" element removes a clear call-to-action for navigating the page.

**Independent Test**: Can be tested by verifying the image loads successfully and the "Learn More" button is present and points downwards.

**Acceptance Scenarios**:

1. **Given** the hero section, **When** the page loads, **Then** the profile picture renders correctly using the original, unmodified URL.
2. **Given** the hero section, **When** the page loads, **Then** a "Learn More" link/button with a downward arrow icon is visible at the bottom of the section.

### Edge Cases

- How does the layout handle smaller screens (mobile/tablet) when the text is shifted to the left?
- Does the "Learn More" arrow still function correctly if clicked?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render "Amr Mousa" as the primary heading or main hero element with the largest font size in the section.
- **FR-002**: System MUST render the role ("Data Analyst | Marketing & Growth Enthusiast") and skills list in a smaller font size relative to the main name.
- **FR-003**: System MUST apply layout styling (e.g., margins, padding, flexbox/grid properties) to shift the main text container to the left on desktop viewports.
- **FR-004**: System MUST include the exact quote: "Data reveals the direction. Marketing reveals the behavior. Growth happens when both connect" in the text block.
- **FR-005**: System MUST restore the original `src` URL for the hero image without altering it.
- **FR-006**: System MUST include a "Learn More" element with a downward arrow icon in the hero section.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Visual hierarchy is clearly established (Name > Roles/Skills).
- **SC-002**: No horizontal overlap occurs between the text block and the image block on screens wider than 1024px.
- **SC-003**: The hero image loads with a 200 OK HTTP status code.
- **SC-004**: The "Learn More" element is visually present and identifiable by users.

## Assumptions

- We assume the original image URL is still valid and accessible on the server.
- We assume the heat map effect is driven by existing CSS classes that just need to be correctly applied or not interfered with.
- We assume the shift to the left is primarily for desktop/tablet views, and mobile view will maintain a stacked layout.
