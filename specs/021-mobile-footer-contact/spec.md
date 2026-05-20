# Feature Specification: Mobile Footer & Contact Layout

**Feature Branch**: `021-mobile-footer-contact`  
**Created**: 2026-05-20  
**Status**: Draft  
**Input**: User description: "ف الموبايل عاوز الفوتر يبقي مختلف بفكر اخليه زي كده و الكونتاكت يبقي كده اي رأيك هل ده افضل ولا نشيل الكونتاكت اصلا من الموبايل لان الفوتر فيه كلني مباشر اهو و التواصل ؟؟ ادرس الاول متنفذش اي حاجه و ارجع اسألني عن افضل طريقه"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Instant Mobile Communication (Priority: P1)

As a mobile visitor browsing Amr's portfolio, I want to easily initiate contact via direct, thumb-friendly buttons (like calling or sending a WhatsApp message), so that I don't have to manually type or copy contact details.

**Why this priority**: Direct communication is the highest converting action for mobile business consulting leads.

**Independent Test**: Verify that tapping the phone and WhatsApp buttons on mobile initiates a direct call and opens a WhatsApp chat, respectively, without errors.

**Acceptance Scenarios**:

1. **Given** a mobile screen viewport (< 768px), **When** scrolling the landing page, **Then** a sticky or static bottom footer bar with WhatsApp and direct Call actions is displayed and fully functional.
2. **Given** a desktop screen viewport, **When** viewing the page, **Then** the mobile-only sticky buttons are hidden.

---

### User Story 2 - Mobile Contact Section Optimization (Priority: P2)

As a mobile visitor, I want a clean, responsive layout at the bottom of the page that summarizes Amr's profile and provides clear contact methods, without rendering massive input fields if they are redundant.

**Why this priority**: Enhances mobile visual layout and prevents screen clutter at the end of the scroll.

**Independent Test**: Verify that the contact section on mobile adapts gracefully to the chosen layout configuration.

**Acceptance Scenarios**:

1. **Given** the contact section layout, **When** viewed on mobile, **Then** the contact form behavior behaves according to the clarified preference: [NEEDS CLARIFICATION: contact_form_mobile_visibility].

---

### Edge Cases

- **Slow/Intermittent Mobile Networks**: What happens if form submission fails or WhatsApp doesn't load? Friendly error handling and fallback display of the phone number and email must remain copyable.
- **RTL vs LTR Layout on Mobile Bottom Bar**: How do direct communication buttons align in Arabic versus English? Icons and texts must reverse their relative placement correctly according to the page direction.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST render a dedicated footer area at the bottom of the landing page on mobile and desktop viewports.
- **FR-002**: The mobile footer MUST feature direct-action buttons for phone call and WhatsApp, optimized for quick thumb targets.
- **FR-003**: The contact section MUST adapt its layout on screens below 768px according to the selected option: [NEEDS CLARIFICATION: contact_form_mobile_visibility].
- **FR-004**: The footer branding and copyright texts MUST be localizable in both English and Arabic.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of mobile users can trigger a direct phone call or WhatsApp message in 1 tap from the footer or sticky bar.
- **SC-002**: Page layout shifts (CLS) remain under 0.1 when rendering the mobile footer or bottom bar.
- **SC-003**: Mobile text input and form size are optimized, reducing scroll length of the contact area by at least 30% on small devices.

## Assumptions

- Direct mobile buttons will use the verified contact info: Phone `+201017749925` and WhatsApp `wa.me/201017749925`.
- The current desktop contact layout (split form on left, details on right) will remain unchanged to preserve standard desktop inquiry collection.
