# Comprehensive Test Plan: Sales Funnel Transformation

This document outlines the manual verification steps required to ensure the "Quiet Luxury" aesthetic, core functionality, and mobile-first features operate flawlessly after migrating to Astro + React.

## 1. Visual Integrity & Preloader (T023)
- [ ] **Action**: Hard refresh the portfolio homepage.
- [ ] **Expected**: The premium "Quiet Luxury" loader (A&M logo) should appear smoothly and fade out.
- [ ] **Action**: Inspect the Hero Section.
- [ ] **Expected**: The layout grid (40/60 split) must be completely intact. The gradient backgrounds and `ctaGhostBeacon` animations must run without jitter.
- [ ] **Action**: Check Font Awesome Icons across the page.
- [ ] **Expected**: Icons in the Gig Cards, Case Studies, and Mobile CTA should render immediately without flickering.

## 2. Bilingual Functionality & Translations
- [ ] **Action**: Click the Language Toggle (EN / AR).
- [ ] **Expected**: The Quick Pitch, CTA buttons (Explore Services, Contact Me), Domains, Gigs, and Case Study titles/descriptions should instantly translate.
- [ ] **Expected**: The layout direction should switch smoothly between LTR and RTL without breaking the grid alignment of the Gig Cards.

## 3. Services & Gigs Matrix (Phase 3)
- [ ] **Action**: Scroll to the "Services & Gigs" section.
- [ ] **Expected**: Three distinct domains should be visible, each with its corresponding gigs (14 gigs total).
- [ ] **Action**: Hover over a Gig Card.
- [ ] **Expected**: The glassmorphism card should lift up (`translateY(-5px)`), the background glow should reveal, and the "Inquire" arrow should animate horizontally.

## 4. Case Study Slider & React Overlay (Phase 4)
- [ ] **Action**: Scroll to the "Case Studies" section and use the left/right navigation arrows.
- [ ] **Expected**: The horizontal slider should scroll smoothly using native CSS scroll-snapping.
- [ ] **Action**: Click on a Project Card (e.g., "Coffee Shop Sales Dashboard").
- [ ] **Expected**: The React `<CaseStudyOverlay />` must hydrate instantly and animate in from the right (LTR) or left (RTL).
- [ ] **Action**: Scroll within the overlay.
- [ ] **Expected**: The background body should be locked (`overflow: hidden`) while the overlay scrolls naturally.
- [ ] **Action**: Click the "Start a Similar Project" CTA inside the overlay.
- [ ] **Expected**: The overlay should close, and the page should smoothly scroll to the Contact section.

## 5. Frictionless Mobile CTA (Phase 5)
- [ ] **Action**: Resize the browser window to mobile width (< 768px) or use Chrome DevTools device toolbar.
- [ ] **Expected**: The Sticky CTA bar should appear fixed at the bottom of the screen.
- [ ] **Action**: Click the WhatsApp button.
- [ ] **Expected**: It should open the `wa.me` link in a new tab.
- [ ] **Action**: Click the Call button.
- [ ] **Expected**: It should trigger the device's native phone dialer (`tel:` link).

## 6. Performance & Animation Checklist
- [ ] **Hydration**: React components (`ProjectSlider`) load without delaying the main HTML render (Zero-JS baseline maintained).
- [ ] **60fps**: Hover effects and the Case Study slide-in animation maintain 60 frames per second without frame drops.
- [ ] **Accessibility**: All buttons and interactive elements should have proper `aria-label`s.

*Note: Once all steps pass, the `013-sales-funnel-gigs` feature branch is considered ready for production deployment.*
