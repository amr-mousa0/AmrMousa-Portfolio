# Research & Technical Decisions: Advanced Sales Architecture

## 1. Zero-JS Carousels (CSS Scroll Snap)
- **Decision:** Implement purely CSS-based horizontal scrolling for the Services and Projects components on mobile viewports.
- **Rationale:** The user explicitly requires a "Zero-JS by default" architecture and 98-100 PageSpeed scores. Loading a carousel library like Swiper.js severely impacts Mobile First Contentful Paint (FCP) and Time to Interactive (TTI). CSS `scroll-snap-type: x mandatory;` combined with `flex` and `overflow-x: auto;` provides a buttery-smooth, native-feeling swipe experience on mobile with zero JavaScript overhead.
- **Alternatives considered:** Astro Islands (`client:visible` with Swiper or Embla). Rejected due to bundle size and the strict constraint against heavy frameworks.

## 2. Advanced Schema.org Injection
- **Decision:** Inject static `application/ld+json` blocks into the `<head>` of the application (via `BaseHead.astro` or `Layout.astro`).
- **Rationale:** To establish Amr Mousa as a `ProfessionalService` entity with a clear `OfferCatalog` in MENA and globally, structured data is non-negotiable. Astro's build process perfectly handles inline JSON-LD without requiring a separate library.
- **Alternatives considered:** Using a third-party SEO plugin or React Helmet. Rejected because Astro natively supports raw HTML injection in the `<head>` seamlessly, aligning with the minimal/zero-JS philosophy.

## 3. Form Honeypots vs. reCAPTCHA
- **Decision:** Use a hidden Honeypot field in the Contact Form.
- **Rationale:** reCAPTCHA adds substantial JavaScript payload, severely affecting Lighthouse scores. A hidden input field (`<input type="text" name="_gotcha" style="display:none">`) stops 99% of basic bot spam without impacting the human user experience or page load time.
- **Alternatives considered:** Cloudflare Turnstile, Google reCAPTCHA v3. Rejected due to the strict performance budget and Zero-JS constraint.
