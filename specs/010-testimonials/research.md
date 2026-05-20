# Research: Testimonials Section

**Feature**: Testimonials Spotlight Layout
**Date**: 2026-05-15

## Unknowns Addressed

None. The specification clarified all layout and content requirements. 
The decision was made to use a "Spotlight" layout with a single central quote, rather than a standard grid or carousel.

## Technical Approach

- **Layout**: CSS Grid/Flexbox for centering the main quote and aligning avatar buttons.
- **Typography**: Utilize the existing `Playfair Display` font for the quote to give it an editorial feel.
- **Animation**: Use CSS transitions on `opacity` and `filter` (blur) for switching quotes. Javascript will handle state management (which quote is active) and apply active classes.
- **Data Management**: A simple array of objects in JavaScript will hold the testimonial data (text, name, title, avatar URL).

## Alternatives Considered

- **CSS-Only Carousel**: Rejected because it's difficult to make accessible and less flexible for custom "fade/blur" transitions compared to a simple JS-driven state swap.
- **Third-Party Library (e.g., Swiper.js)**: Rejected to adhere to the constitution's "Minimal Bloat" requirement. The spotlight effect is simple enough to write in vanilla JS.
