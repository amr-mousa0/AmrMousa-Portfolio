# Quickstart: Sales Funnel & Gigs Implementation

This guide provides the necessary steps to implement the UI/UX changes for the new sales funnel.

## 1. Hero Section Refactor
- Locate the `.hero-title` and `.hero-sub` elements in `index.html`.
- Update the text to focus on "Data & Marketing Strategist" and solving business bottlenecks.
- Change the primary `.btn-primary` CTA to "Hire Me / WhatsApp" linking to the WhatsApp API.

## 2. Services / Gigs Section
- Create a new section `<section id="services-gigs">`.
- Use a CSS Grid layout to display the 3 main domains (Data, Marketing, Tech).
- Inside each domain card, list the specific gigs (using the data model provided).

## 3. Projects Slider
- Update the `<section id="projects">` to use CSS `scroll-snap-type: x mandatory;`.
- Set the project container to `display: flex; overflow-x: auto;`.
- Ensure each project card has `scroll-snap-align: center;`.

## 4. Internal Case Study Viewer
- Create a hidden full-screen `div` (`#case-study-viewer`) with `position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 999; transform: translateY(100%); transition: transform 0.4s ease;`.
- Add a close button.
- Write JavaScript to populate this `div` with the case study data when a project card is clicked, and add the `active` class to trigger the transform transition.

## 5. Mobile Sticky CTA
- Add a `<div class="mobile-sticky-cta">` near the closing `</body>` tag.
- Style it with `position: fixed; bottom: 0; left: 0; width: 100%; display: none;` and enable it in mobile media queries.
- Include a WhatsApp button and a Call button.
