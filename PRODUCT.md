# Amr Mousa Portfolio - Product Context

## Design Context

### Users & Purpose
- **Target Audience:** Decision-makers, business owners, and e-commerce managers in the MENA region and globally.
- **Context:** Busy professionals looking for proven ROI, efficiency, and data-driven results. They have minimal time and need to understand the value proposition within 3 seconds.
- **Job to be done:** To confidently hire or contract Amr Mousa for high-impact gigs spanning Data Analytics, Media Buying, and Workflow Automation.
- **Emotional Goal:** Trust, extreme competence, measurable authority, and frictionless efficiency.

### Brand Personality
- **Voice & Tone:** Authoritative, direct, results-oriented, "No fluff, just measurable growth." 
- **3-Word Personality:** Strategic, Analytical, High-Performance.

### Aesthetic Direction
- **Visual Tone:** "Quiet Luxury", heavily relying on layout hierarchy, negative space, and typography rather than heavy decorative elements.
- **Color Strategy:** Restrained. ZERO changes to the current color palette. The UI must leverage the existing variables (`--light-accent-a`, `--light-bg`, etc.).
- **Anti-References:** Cluttered SaaS templates, heavy JS-dependent carousels, text-heavy paragraphs, and any design that causes a Cognitive Load spike or Cumulative Layout Shift (CLS).

### Design Principles
1. **Zero-JS First (The 100% Core Web Vitals Rule):** Animations and layouts must rely on CSS (e.g., `scroll-snap-type`) to guarantee lightning-fast mobile performance.
2. **Actionable & Quantifiable Pitch:** Copy must focus on the Victory (e.g., "+250% ROI") rather than the tool, and every section must have a clear Call To Action (No Dead Ends).
3. **The 3-Second Hook:** The Hero section must explicitly bridge data and marketing, with the profile centered to build immediate human connection.
4. **Frictionless Mobile Priority:** Touch targets must be 48x48px minimum. Scrolling must be minimized. A sticky bottom CTA (FAB) must always be within thumb reach on mobile.
