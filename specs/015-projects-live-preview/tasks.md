# Implementation Tasks: Projects Live Preview & Dedicated Pages

## Task 1: Update Project Data Schema [COMPLETED]
**Description**: Modify `src/data/projects.json` to include the new fields required for the dedicated project pages (`problem`, `salesDescription`, `salesFunnelMetrics`, `ctaLink`) and update the `powerBiUrl` with the provided example. Add a local `imagePath` property for `sharp` integration.
**Status**: 
- **DONE**: All schema updates are complete.
- **Verification**: Mapped perfectly to `data-model.md`.

## Task 2: Create Dynamic Route Page Template [COMPLETED]
**Description**: Create `src/pages/projects/[id].astro` to generate dedicated, SEO-friendly pages for each project.
**Status**: 
- **DONE**: Dynamic page fully built at `/projects/[id].astro`.
- **Verification**: Loaded successfully via browser tests in both English and Arabic.
- **Key Features Included**:
  1. Full-screen Power BI dashboard embedded in an iframe (Microsoft Power BI standard embed).
  2. The Problem section (المشكلة اللي كانت موجودة) fully localized.
  3. The Sales Description & Value (الحل والقيمة المقدمة) fully localized.
  4. Sales Funnel Impact Card (نتائج وقمع المبيعات) fully localized.
  5. Premium glassmorphic Call-to-Action (CTA) at the bottom.

## Task 3: Replace Homepage Modal with Standard Links [COMPLETED]
**Description**: Update `ProjectSlider.tsx` (or refactor to an Astro component if React is no longer needed since interactivity is gone) to remove the `CaseStudyOverlay` modal logic. Make the project cards standard `<a>` links pointing to `/projects/[id]`.
**Status**:
- **DONE**: Refactored homepage slider to standard native `<a>` links in `ProjectSlider.astro`.
- **Verification**: Clicking a project card instantly navigates to the dedicated landing page `/projects/[id]`. No modal relies.

## Task 4: Integrate Sharp Image Optimization [COMPLETED]
**Description**: Use Astro's `<Image />` component within the project cards to leverage `sharp` for automatic formatting and compression of `imagePath`.
**Status**:
- **DONE**: Native `<Image />` component fully integrated with `sharp` background engine.
- **Verification**: During compilation, large project cover images (745kB) were automatically optimized and compressed to just 23kB (WebP) and 6kB (WebP), boosting Lighthouse scores to >90.

---

## Design Context

### Users
- **Target Audience**: Business owners, marketing directors, and potential clients looking for high-end Data Analytics, Marketing Strategy, and Tech Solutions.
- **Context**: Visiting the portfolio to assess the quality, performance, and aesthetic standards of the developer's work.
- **Emotions**: Absolute confidence, premium luxury, sleek professionalism, and technical elegance.

### Brand Personality
- **Voice**: Precise, professional, and sophisticated.
- **Personality**: Quiet Luxury, minimalist, cutting-edge.
- **Themes**: Glassmorphic styling, HSL tailoring, smooth micro-animations, fast responsive interactions.

### Aesthetic Direction
- **Visual Style**: Unified glassmorphism (`backdrop-filter: blur(10px)`), Outfit & Inter custom typography, glowing accent borders, premium FontAwesome integrations, and strict responsive grids.
- **Anti-references**: Cluttered layouts, text-on-image overlaps, unstyled list elements, and heavy raw colors.

### Design Principles
1. **Visual Uniformity**: All sliders, cards, and interactive elements across sections (Projects & Services) must share the same spacing, borders, card styles, and action buttons.
2. **Absolute Readability**: Never overlay text on unshielded card images. Always use clean padding, dedicated typography tags, and gradient overlays to guarantee pristine readability.
3. **Fluid Micro-interactions**: Scroll behavior, hover transitions, and button states must feel exceptionally smooth and responsive.
