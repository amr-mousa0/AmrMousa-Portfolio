# Research: Astro + React Migration

## 1. Framework Migration (Static to Astro)
- **Decision:** Migrate the purely static HTML/CSS/JS portfolio to **Astro**.
- **Rationale:** The current static implementation will become too heavy and complex to maintain as a dynamic sales funnel. Astro provides a component-based architecture out of the box while maintaining "Zero-JS" on the frontend by default. It perfectly fits content-heavy sites and portfolios, ensuring lightning-fast performance while keeping the code clean.
- **Alternatives considered:** Next.js (rejected due to overhead, lack of backend need), Vite + React (rejected as it ships a full React bundle for static content).

## 2. Interactive Components (Astro Islands)
- **Decision:** Use **React** specifically for the `ProjectSlider` and `CaseStudyOverlay` components.
- **Rationale:** Astro allows using frontend frameworks like React only where interactivity is needed (`client:load`). This ensures complex state (like managing the open/close state of the overlay and the active project data) is handled robustly by React without bloating the rest of the static site.

## 3. SPA Cinematic Transitions
- **Decision:** Use Astro's native `<ViewTransitions />`.
- **Rationale:** The user wants a seamless, "no page reload" experience that feels premium and cinematic. Astro's View Transitions API handles this natively without the need for complex React Routers.

## 4. CSS and Aesthetics Preservation
- **Decision:** Copy all existing CSS variables, fonts (Poppins/Playfair), and the global Loader exactly as they are into the new Astro layout.
- **Rationale:** The user explicitly mandated that the "Quiet Luxury" aesthetic, colors, and the professional loader must be 100% preserved. Astro allows raw CSS and script injection, making this migration trivial.
