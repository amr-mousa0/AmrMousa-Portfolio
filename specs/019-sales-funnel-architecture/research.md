# Research: Sales Funnel Architecture

## Zero-Hash Navigation & History API Scrubbing in Astro
- **Decision**: Implement a client-side script in `main.js` (or a dedicated script in `Layout.astro`) that intercepts anchor links pointing to `#hash` sections, prevents default behavior, performs a smooth `window.scrollTo`, and then ensures the URL remains hash-free. If a user lands on the site with a hash in the URL (e.g. `/#services`), the script will perform `window.scrollTo` to the element and then call `history.replaceState(null, null, ' ')` to scrub the hash.
- **Rationale**: Keeps the URL pristine ("Quiet Luxury" aesthetic) while providing anchor link functionality for a single-page or hybrid layout.
- **Alternatives considered**: Using Astro's View Transitions, but that's for page-to-page. Section-to-section requires standard JS interception.

## GitHub Actions: Lighthouse CI & Playwright
- **Decision**: Create two GitHub Actions workflow files: `.github/workflows/lighthouse.yml` and `.github/workflows/playwright.yml`. Use `lhci/action@v1` for Lighthouse CI, targeting a threshold of `0.98` across all categories. Use `npx playwright test` for cross-device E2E tests, configuring devices like `iPhone 13 Pro`, `Galaxy S22`, etc., in `playwright.config.ts`.
- **Rationale**: Meets the strict QA Matrix requirements detailed in the spec. Automated thresholds prevent bad code from being deployed.
- **Alternatives considered**: Using Vercel/Netlify built-in checks, but GitHub Actions provides more explicit control over thresholds and device emulators.

## BreadcrumbList JSON-LD Structured Data
- **Decision**: Create a generic schema `<script type="application/ld+json">` block in `Layout.astro` or specifically injected into `about.astro` to define the BreadcrumbList linking Home (`/`) and About (`/about`).
- **Rationale**: Required for SEO Continuity (Phase 4), ensuring Google understands the hierarchy.
- **Alternatives considered**: Using an external SEO package, but Astro's simple component structure makes inline JSON-LD easy and lightweight.
