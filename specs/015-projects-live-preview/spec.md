# Feature Specification: Projects Live Preview & Dedicated Pages

**Feature Branch**: `[###-feature-name]`  
**Created**: 2026-05-18  
**Status**: Draft  
**Input**: User description: "عاوز بقا الصور بتاعت المشاريع و خد بالك من ان المشاريع ليها لينكين لينك لجيت هاب و لينك لباور بي اي سيرفيس عاوز اخلي اللينك بتاع الباور بي اي سيرفيس يكون لايف ف الشكل بتاع الكارت نفسه لو فيه طريقه لكده و كمان عاوز الصفحه بتاعت المشاريع تكون صفحه كامله للمشاريع مش مودال و عاوزك تطبق مكتبات شارب علي الصور بتاعت المشاريع اسألني اكتر و تعالي نعمل البلان مع بعض"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Optimized Visual Browsing (Priority: P1)

Users browsing the portfolio see crisp, high-quality project preview images that load instantly regardless of their device, thanks to advanced image optimization.

**Why this priority**: Fast-loading, high-quality images are critical for first impressions in a portfolio.
**Independent Test**: Can be tested by throttling network speed and observing image load times and quality on the main portfolio page.

**Acceptance Scenarios**:
1. **Given** a user navigates to the projects section, **When** the project cards appear, **Then** all images are served in modern, optimized formats (e.g., WebP/AVIF via Sharp).

---

### User Story 2 - Dedicated Project Pages (Priority: P1)

Users click on a project card to learn more and are taken to a dedicated, full-screen page with its own URL, rather than a constrained modal overlay.

**Why this priority**: Modals restrict content layout and cannot be shared via direct link. Dedicated pages improve SEO, shareability, and allow for comprehensive case studies.
**Independent Test**: Can be tested by clicking a project card, verifying the URL changes, and loading the project directly from that URL.

**Acceptance Scenarios**:
1. **Given** a user is on the main portfolio, **When** they click a project card, **Then** the browser navigates to a new dedicated route (e.g., `/projects/[id]`).
2. **Given** a user has a direct link to a project, **When** they load the URL, **Then** the full project details are rendered directly.

---

### User Story 3 - Live Interactive Power BI Previews (Priority: P2)

Users viewing a data analytics project can interact with the Power BI dashboard directly within the UI, rather than clicking away to an external site.

**Why this priority**: Embedded interactive dashboards showcase technical capability much better than static screenshots.
**Independent Test**: Can be tested by interacting with the dashboard filters/tabs within the portfolio without triggering a new tab redirect.

**Acceptance Scenarios**:
1. **Given** a project has a Power BI Service link, **When** the user views the project, **Then** a live interactive iframe is rendered.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST process project images using an optimization library (`sharp` or Astro's native image integration backed by sharp) to generate responsive, modern image formats.
- **FR-002**: Project data models MUST explicitly support dual URLs: `githubUrl` and `powerBiUrl`.
- **FR-003**: System MUST provide dedicated route pages for each project instead of rendering details in a modal overlay.
- **FR-004**: System MUST render a live, embedded interactive dashboard for projects that contain a `powerBiUrl`.
- **FR-005**: System MUST display optimized static images on the homepage project cards. The live interactive Power BI iframe MUST ONLY be rendered on the dedicated project page to preserve homepage performance.
- **FR-006**: The Dedicated Project Page MUST be structured as a high-converting landing page with the following sections:
  1. The Problem (المشكلة اللي كانت موجودة)
  2. The Sales Description & Solution (وصف للبيع)
  3. The Sales Funnel Metrics (الفانيل بتاعة البيع متقدرة ومعروفة)
  4. The Live Power BI Dashboard (taking up the full width/screen where possible)
  5. A Clear Call To Action (CTA) at the bottom to "Buy the Service/Inquire".
- **FR-007**: The system MUST use a unified, static JSON schema (`projects.json` or similar) to automatically generate both the Project Card on the homepage and the full Dedicated Page. Adding a new project should only require adding a new JSON entry without writing new UI code.

### Key Entities

- **Project**: Represents a portfolio case study.
  - Core Attributes: `id`, `title`, `category`, `imagePath`, `githubUrl`, `powerBiUrl`, `techStack`.
  - Detailed Page Attributes: `problem`, `salesDescription`, `salesFunnelMetrics`, `ctaLink`.

## Success Criteria *(mandatory)*

- **Performance**: Project images load at least 30% faster and achieve a >90 score on Lighthouse performance metrics.
- **Shareability**: 100% of projects can be accessed via a direct, shareable URL.
- **Interactivity**: Users can click and filter Power BI dashboards without leaving the portfolio domain.

## Assumptions & Out of Scope

- **Assumptions**: Power BI links provided will have the correct permissions (e.g., "Publish to Web") to allow embedding in external iframes without authentication blocks.
- **Out of Scope**: Creating entirely new Power BI dashboards; we are only embedding existing ones.
