# Research: Horizontal Services Slider

## CSS Scroll Snapping vs React Slider
- **Decision**: Native CSS Scroll Snapping
- **Rationale**: Astro's "Zero-JS by default" philosophy strongly encourages using native web APIs over JavaScript wherever possible. CSS `scroll-snap-type` and `scroll-snap-align` provide hardware-accelerated, 60fps horizontal scrolling without loading React or any external libraries.
- **Alternatives considered**: Swiper.js, React Slick, framer-motion. These were rejected as they add unnecessary bundle size for a layout that can be achieved natively.

## RTL/LTR Adaptability
- **Decision**: Use `dir` attribute context.
- **Rationale**: CSS handles horizontal scroll directions natively based on the `dir` attribute (LTR = right, RTL = left). We will verify that flex containers correctly respect this direction.
