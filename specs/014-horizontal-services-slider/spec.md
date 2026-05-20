# Specification: Horizontal Services Slider

**Feature Branch**: `014-horizontal-services-slider`  
**Created**: 2026-05-18  
**Status**: Draft  
**Input**: User description: "كمان عاوز اغير شكل العرض بتاع الخدمات بدل ما تبقي كده خليها كارت و بتتحرك يمين و شمال اعتقد هتبقي احسن ادرس الموضوع ده اكتر"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse Services Horizontally (Priority: P1)

Users should be able to scroll through the different services via a horizontal card slider instead of a vertical or grid layout, making it more interactive and saving vertical screen real estate.

**Why this priority**: It's the core request to change the visual presentation of the services section.

**Independent Test**: Can be fully tested by navigating to the Services section and scrolling/swiping horizontally to see all service cards.

**Acceptance Scenarios**:

1. **Given** a user is in the Services section, **When** they drag or swipe horizontally, **Then** the service cards should scroll left or right smoothly.
2. **Given** a user is on a desktop device, **When** they click the left/right navigation arrows, **Then** the slider should advance to the next or previous set of service cards.
3. **Given** a user hovers over a service card in the slider, **Then** it should display the "Quiet Luxury" hover effects without disrupting the slider layout.

---

### Edge Cases

- What happens when the user is on a very narrow mobile screen? (Ensure cards snap to center and take up appropriate width).
- How does the system handle rapid clicking of the navigation arrows? (Should not break the animation or scroll past boundaries).
- How does the layout switch between RTL and LTR for Arabic vs English? (Slider direction and arrow behavior should adapt correctly).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display the domains and gigs in a horizontal scrollable slider format.
- **FR-002**: System MUST include left and right navigation controls (arrows) for desktop users.
- **FR-003**: System MUST support native touch swiping for mobile and tablet users.
- **FR-004**: System MUST maintain the existing "Quiet Luxury" aesthetic and bilingual translation (`data-i18n`) for all service cards.
- **FR-005**: System MUST adapt the scroll direction based on the current language direction (RTL for Arabic, LTR for English).

### Key Entities

- **Service Card (Gig)**: Represents an individual service offering with an icon, title, description, tags, and a call-to-action button.
- **Domain Category**: Groups related Service Cards together visually within or alongside the slider.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of the 14 service gigs are accessible via horizontal scrolling.
- **SC-002**: Horizontal scrolling maintains 60 FPS on both mobile and desktop devices.
- **SC-003**: Users can navigate through all services using only touch gestures on mobile, and mouse/trackpad/arrows on desktop.

## Assumptions

- We will utilize Astro and React (similar to the Case Studies slider) or pure CSS scroll-snapping to implement this feature efficiently.
- The existing `gigs.json` data structure remains unchanged.
