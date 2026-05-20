# Research: Luxury Theme Gradients

## 1. Gradient Implementation Approach

**Decision**: Use fixed CSS backgrounds with combination of `linear-gradient` and `radial-gradient` properties on the body or a dedicated background container element.

**Rationale**: 
Native CSS gradients (`background-image`) are highly optimized by modern browser rendering engines and do not require additional DOM elements. Keeping the background attachment as `fixed` (or using a `fixed` pseudo-element) prevents repaints during scrolling, aligning with the 60fps performance goal.

**Alternatives considered**: 
- **WebGL/Canvas**: Overkill for subtle background effects, increases bundle size and battery usage.
- **Video Backgrounds**: Too heavy, distracts from content, hurts load times.

## 2. Transitioning Backgrounds

**Decision**: Use CSS variables (Custom Properties) to define colors, but transition a pseudo-element's opacity for the smoothest theme switch. Alternatively, since `background-image` isn't fully transitionable in all browsers, transitioning the `background-color` and fading a pseudo-element overlay yields the best UX.

**Rationale**: 
Transitions on `background-image` can be choppy. Fading opacity on a pseudo-element representing one of the themes ensures a 60fps smooth transition. 

## 3. Aesthetic Color Selection

**Decision**: 
- **Light Mode**: Off-white base with very subtle warm champagne/gold radial highlights.
- **Dark Mode**: Deep charcoal/midnight blue base with subtle cooler, darker edge gradients to create depth.

**Rationale**: 
Aligns directly with the "Quiet Luxury" and "Lux" principles from the constitution. Solid black and white are too stark; subtle gradients provide texture and a premium feel.
