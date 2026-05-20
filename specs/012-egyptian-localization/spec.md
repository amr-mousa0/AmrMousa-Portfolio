# Feature Specification: Egyptian Arabic Localization

**Feature Branch**: `[012-egyptian-localization]`  
**Created**: 2026-05-16  
**Status**: Draft  
**Input**: User description: "عاوز اعمل توجل عربي انجليزي و اعمل تعريب عربي للبورتفوليو كله لكن اهم نقاط وهيا عند التعريب متعربشتعريب حرفي لكن عرب ب الروح التعريب يعني و بالمصري و كمان عاوز بطريقه شيك و منظمه و مرتبه و عند التحول من الانجليزي للعربي برضه الببودر هيشتغل"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Language Switcher Toggle & Loader (Priority: P1)

As a visitor, I want to toggle between English and Egyptian Arabic seamlessly using a chic toggle button, so I can view the portfolio in my preferred language with the branded loader effect during the transition.

**Why this priority**: It's the core interaction that enables the entire localization feature.

**Independent Test**: Can be fully tested by clicking the toggle button and observing the loader and language state change.

**Acceptance Scenarios**:

1. **Given** the user is viewing the site in English, **When** they click the Arabic toggle, **Then** the cinematic loader activates, and the page content seamlessly translates to Egyptian Arabic.
2. **Given** the user is viewing the site in Arabic, **When** they click the English toggle, **Then** the loader activates, and the page returns to English.

---

### User Story 2 - Egyptian Arabic "Spirited" Translation (Priority: P1)

As an Arabic-speaking visitor, I want to read the portfolio in a natural, elegant Egyptian Arabic tone (not a literal translation), so the content feels authentic, premium, and emotionally resonant.

**Why this priority**: The quality of the translation is specifically requested to be "spirited" and non-literal, maintaining the high-end feel.

**Independent Test**: Can be tested by reviewing the translated text sections against the original English for tone, meaning, and layout structure.

**Acceptance Scenarios**:

1. **Given** the site is in Arabic mode, **When** I read the hero section, **Then** the text uses elegant Egyptian phrasing rather than strict Modern Standard Arabic.
2. **Given** the site is in Arabic mode, **When** I view the projects/skills, **Then** the layout remains chic, organized, and properly aligned (RTL).

### Edge Cases

- What happens to flexbox and grid alignments when the layout switches from LTR to RTL?
- How does the UI handle Arabic text expansion (which is sometimes longer or taller than English text) without breaking the glass-card heights?
- How do we handle proper nouns (like "Mohammed Wagdy") that should remain in their original form?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a UI toggle to switch between English (EN) and Arabic (AR).
- **FR-002**: System MUST apply the branded cinematic loader during the language transition.
- **FR-003**: System MUST translate all text content using a context-aware, non-literal Egyptian Arabic dictionary.
- **FR-004**: System MUST NOT translate proper nouns or brand names (e.g., "Mohammed Wagdy") but keep them in their original or recognized format.
- **FR-005**: System MUST switch the layout direction to RTL (Right-to-Left) when Arabic is active.
- **FR-006**: System MUST preserve the "Quiet Luxury" aesthetic, organization, and visual hierarchy in both LTR and RTL modes.

### Key Entities 

- **Language Dictionary**: The JSON/Object mapping English strings to their Egyptian Arabic equivalents.
- **Loader Component**: The existing visual loader that must be hooked into the language switch event.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can switch languages without breaking any structural layout.
- **SC-002**: The language switch transition completes smoothly with the loader masking the DOM updates.
- **SC-003**: The translation reflects a natural Egyptian dialect while remaining highly professional and premium.

## Assumptions

- The site uses a static HTML/JS structure or a lightweight framework based on previous logs.
- The global loader is accessible via an existing JavaScript function or class toggle.
- Translating the portfolio into Egyptian Arabic requires writing a custom dictionary mapping rather than using an auto-translate API, to ensure the "spirit" and chic tone are maintained.
