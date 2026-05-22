# Feature Specification: Portfolio Performance & UX Optimization

**Feature Branch**: `022-optimize-portfolio`

**Created**: 2026-05-22

**Status**: Draft

---

## Overview

This specification covers a comprehensive optimization pass of the Amr Mousa Portfolio website, addressing performance bottlenecks, broken visual styles, incomplete translations, and mobile layout deficiencies. The work spans seven interconnected areas that together elevate the portfolio from a functional demo to a fast, polished, professional product that converts visitors into clients.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Fast First-Load Experience (Priority: P1)

A potential client opens the portfolio from a Google search result on a mobile device. The page loads within 2 seconds, shows no visual flicker or layout shift, and the hero section is instantly readable and impressive — without waiting for animations or loaders.

**Why this priority**: First impression is everything. A slow or flickery load causes visitors to leave before reading anything. Lighthouse scores also directly affect SEO ranking.

**Independent Test**: Load the portfolio on a simulated 3G mobile connection. Measure Time to Interactive and Largest Contentful Paint. Verify no element "pops in" unnaturally.

**Acceptance Scenarios**:

1. **Given** a cold-page load, **When** the page renders, **Then** no "luxury-loader" overlay appears and no GSAP animation code executes.
2. **Given** a Lighthouse audit run, **When** the report is generated, **Then** Performance score is ≥ 90 and no render-blocking scripts are flagged.
3. **Given** any page on the portfolio, **When** the HTML is inspected, **Then** no hardcoded debug traces, console.log statements, or dead code remain.

---

### User Story 2 — Polished, Trustworthy Visual Design (Priority: P2)

A client switches to light mode or views the site on a bright screen. Every section looks clean, professional, and intentionally designed — not broken with invisible text, washed-out cards, or missing contrast.

**Why this priority**: A broken light theme signals a low-effort project. For a portfolio selling premium services, visual credibility is a business-critical requirement.

**Independent Test**: Toggle the theme to light mode and scroll through all sections. No text is invisible. No cards vanish. No buttons lose contrast. Background gradients remain elegant and purposeful.

**Acceptance Scenarios**:

1. **Given** light mode is active, **When** viewing the hero section, **Then** the name, headline, and CTA buttons are clearly readable with sufficient contrast.
2. **Given** light mode is active, **When** viewing service cards, project cards, and the contact form, **Then** all interactive elements have visible borders, labels, and hover states.
3. **Given** any CSS value that was hardcoded (e.g., `color: #ffffff` inside a dark-only block), **When** light mode activates, **Then** it is replaced by a theme-aware CSS variable that adapts correctly.
4. **Given** the edge radial-gradient glows on the `main` background, **When** removed or replaced, **Then** the background still feels intentionally textured using the grid pattern alone — without harsh glows at page corners.

---

### User Story 3 — Fully Arabic Translation (Priority: P2)

A user clicks the language toggle and the entire page switches to Arabic. Every visible piece of text — including the hero tagline, service descriptions, project labels, trust bar metrics, section subtitles, and static UI labels — renders in proper Egyptian Arabic. No English words remain visible when Arabic is selected.

**Why this priority**: Serving Arabic-speaking clients is a core market segment. Incomplete translations undermine trust and professionalism for this audience.

**Independent Test**: Switch language to Arabic. Scroll every section including services detail pages, project pages, and the methodology page. Zero English strings visible.

**Acceptance Scenarios**:

1. **Given** Arabic mode is active, **When** viewing the hero section, **Then** `hero_skills` renders in Arabic (not the English fallback "SQL • Power BI • Python...").
2. **Given** Arabic mode is active, **When** viewing trust bar metrics, **Then** all labels like "Average ROI Growth" and "Revenue Generated" appear in Arabic.
3. **Given** Arabic mode is active, **When** viewing the Services section and individual service pages, **Then** all service copy, descriptions, CTA labels, and micro-labels translate correctly.
4. **Given** Arabic mode is active, **When** viewing the Projects section and individual project pages, **Then** milestone labels, status chips, and section headings are in Arabic.
5. **Given** Arabic mode is active, **When** the language switch occurs, **Then** the page layout correctly mirrors to RTL — no elements overlap or misalign.

---

### User Story 4 — Engaging Services Section on Mobile (Priority: P3)

A mobile user scrolls to the Services section. Each service card is large enough to read comfortably without zooming. The card copy is written as curiosity-inducing questions that make the user want to tap and learn more — not flat feature lists.

**Why this priority**: Mobile traffic accounts for the majority of portfolio visits. Small cards with dense text are ignored. Question-format copy drives clicks and inquiries.

**Independent Test**: Open the portfolio on a 375px-wide screen. Services cards must be ≥ 90% of viewport width. Card copy must be in question form for all 5 services.

**Acceptance Scenarios**:

1. **Given** a mobile viewport (< 768px), **When** viewing services cards, **Then** each card is at least 90% of the screen width and text is ≥ 15px.
2. **Given** Arabic or English is active, **When** the service hook copy is displayed on cards, **Then** it reads as a compelling curiosity-driven question (not a statement).
3. **Given** a user taps a service card, **When** they arrive on the service detail page, **Then** the curiosity question from the card is answered in depth on that page.

---

### User Story 5 — Clean, Optimized JavaScript Architecture (Priority: P2)

A developer or Lighthouse audit examines the JavaScript payload. The JS is minimal, readable, and leverages native Astro lifecycle patterns (`is:inline`, `defer`, view transitions) instead of global inline event handlers scattered across templates.

**Why this priority**: Excessive or duplicated JS hurts both load speed and maintainability. Lighthouse penalises unused JavaScript and non-deferred scripts.

**Independent Test**: Run Lighthouse. No unused JS warning for main.js or translations.js above 20KB. Confirm no duplicate event listeners are registered. Check no `luxury-loader` logic exists anywhere.

**Acceptance Scenarios**:

1. **Given** the Layout.astro file, **When** audited, **Then** the duplicated closing `</script></body></html>` block is removed and only one clean closing sequence exists.
2. **Given** main.js, **When** audited, **Then** all references to `luxury-loader` (showing, hiding, and querying) are removed and replaced with direct smooth scroll or Astro view transitions.
3. **Given** the language toggle function, **When** the user switches language, **Then** no loader overlay shows — the transition happens directly and smoothly within ≤ 300ms.
4. **Given** `goToSection()` function, **When** called from any nav item, **Then** it scrolls directly without showing any loader overlay.

---

### Edge Cases

- What happens when a translation key is missing in the Arabic dictionary? The system must fall back gracefully (show English), not crash.
- What if the user has both `body.light` and a reduced-motion preference? Theme should still apply but animations must remain suppressed.
- What if RTL direction is set but the service card layout doesn't account for it? Text must be right-aligned and chevrons must reverse.
- What if a Lighthouse bot triggers the page? The `is-bot` class must still suppress all heavy GPU effects without breaking layout.
- What happens on a 320px viewport? The minimum viable readable width is 320px — nothing must overflow horizontally.

---

## Requirements *(mandatory)*

### Functional Requirements

**Performance & Code Hygiene**
- **FR-001**: All references to `luxury-loader` (HTML element, JS code, and CSS rules) MUST be fully removed from the codebase.
- **FR-002**: All GSAP/gasp-related imports, script tags, or code patterns MUST be removed. If none exist in source, any dead stubs or comments referencing GSAP MUST be cleaned up.
- **FR-003**: The duplicate `</script></body></html>` block at the end of `Layout.astro` (lines 307–313) MUST be removed so the file closes cleanly once.
- **FR-004**: All hardcoded debug traces (console.log, console.warn, etc.) MUST be removed from `main.js` and any component scripts.
- **FR-005**: The `toggleLanguage()` function in `main.js` MUST NOT reference or show any loader element. Language switch MUST complete in under 300ms using a direct DOM swap.
- **FR-006**: The `goToSection()` function in `main.js` MUST NOT reference or show any loader element. Navigation MUST use native smooth scroll.
- **FR-007**: Scripts loaded via `<script defer>` in `Layout.astro` MUST remain deferred. No new render-blocking scripts may be introduced.

**Visual Design — Glows & Theme**
- **FR-008**: The teal glow (`rgba(0, 102, 121, 0.13)`) and purple glow (`rgba(140, 40, 95, 0.10)`) radial-gradients on `main` MUST be replaced with a more subtle, less distracting background treatment that still feels premium (retain the subtle dot/line grid).
- **FR-009**: The light mode background for `main` MUST be visually coherent: clean, light grid without aggressive glow blobs. The existing light mode radial gradient at 5% 0% MUST be reduced in opacity or removed.
- **FR-010**: All CSS rules that use hardcoded `#ffffff` or `#000000` or `rgba(255,255,255,...)` inside light-mode-specific selectors MUST be replaced with appropriate CSS variables (`--text`, `--surface`, `--border-subtle`, etc.).
- **FR-011**: Light mode MUST pass a manual visual check across: header, hero, services cards, project cards, trust bar, methodology page, contact form, and footer.
- **FR-012**: The option to remove the theme toggle and ship a single premium dark theme MUST be evaluated. The spec assumes single-theme (dark-only) is **not** selected for now — but the light theme MUST be fixed to be fully usable.

**Translations — Arabic**
- **FR-013**: `hero_skills` in the Arabic dictionary MUST be updated to an Arabic version of the skills tagline (e.g., "SQL • Power BI • Python • إعلانات Meta • استراتيجية المحتوى").
- **FR-014**: `trust_badge`, `trust_headline`, and all `trust_metric*` keys MUST have proper Arabic translations added if missing from the `ar` dictionary.
- **FR-015**: All service card copy keys (`service_*_copy`) in the `ar` dictionary MUST be rewritten as curiosity-driven Arabic questions matching the English equivalents.
- **FR-016**: Any element in `TrustBar.astro`, `[id].astro` (projects), and `services/[id].astro` that renders hardcoded English text MUST be wrapped with `data-i18n` attributes and corresponding translation keys added in both `en` and `ar` dictionaries.
- **FR-017**: The Arabic dictionary MUST NOT have any key whose value is an English string (unless it's a proper noun like the name "Amr Mousa").

**Services — Mobile Layout & Copy**
- **FR-018**: On mobile (< 768px), service card `min-width` MUST be at least 90vw.
- **FR-019**: On mobile, card title font size MUST be at least 18px and body text at least 15px.
- **FR-020**: The service card `copy` key for all 5 services MUST be rewritten as curiosity-inducing questions for both English and Arabic dictionaries:
  - **Data Analytics & BI**: "Are your competitors making faster decisions with data you can't even see? What's hiding in your numbers right now?"
  - **Media Buying**: "How much of your ad budget burned this month with zero results? What if you could see exactly which campaign made every sale?"
  - **Web Portfolios**: "Why are visitors leaving your site in seconds? How much is a slow, generic website costing your brand authority?"
  - **Excel Automation**: "How many hours is your team wasting on manual reports every week? What if your data updated itself in one click?"
  - **Custom CRM**: "How many hot leads slip through the cracks of your manual follow-ups every day? Why keep paying for software that doesn't fit how you work?"

### Key Entities

- **Translation Dictionary**: Two-language object (`en`, `ar`) with keyed string values. Each key must exist in both languages.
- **Service Card**: Visual component showing a question-hook, service title, and image. Links to the service detail page.
- **Theme**: CSS variable set applied via `body.light` class. Default is dark. Light mode must be visually complete.
- **Loader**: Removed entity — the `luxury-loader` div and all associated JS/CSS. No replacement is needed.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Lighthouse Performance score reaches ≥ 90 on mobile simulation after changes.
- **SC-002**: Page reaches Largest Contentful Paint (LCP) in under 2.5 seconds on simulated 3G.
- **SC-003**: Zero English strings are visible on any page when Arabic language mode is active (excluding proper nouns).
- **SC-004**: Light mode visual pass scores 0 broken elements — every text, card, button, and form field is readable and correctly styled.
- **SC-005**: On a 390px-wide mobile viewport, service cards occupy ≥ 90% of the screen width and copy is legible without zooming.
- **SC-006**: The `main.js` file contains zero references to `luxury-loader` or GSAP after cleanup.
- **SC-007**: `Layout.astro` closes with exactly one `</script></body></html>` sequence — no duplicated fragment.
- **SC-008**: Language switching completes in ≤ 300ms without any overlay or transition blocker.
- **SC-009**: Service card copy for all 5 services, in both languages, reads as a question (ends with `?`).

---

## Assumptions

- The `luxury-loader` HTML element does not exist in the current HTML (it was removed from a previous sprint) — only its dead JS/CSS references remain and need cleanup.
- There is no actual GSAP library installed (`package.json` has no GSAP dependency). Only dead code comments or stubs may reference it.
- The theme toggle button will remain in the UI — light mode is being fixed, not removed.
- The service question copy will be added to the `service_*_copy` translation keys (not new keys), maintaining backward compatibility with `data-i18n` bindings in HTML.
- RTL layout for Arabic is already partially working — fixes are scoped to broken elements only, not a full RTL rewrite.
- The Astro project uses Tailwind v4 via Vite plugin — utility classes and `@layer` patterns are already established and must be respected.
- Mobile-first breakpoints already exist in `tailwind.css` — the services card fix targets the `<768px` media query block only.
