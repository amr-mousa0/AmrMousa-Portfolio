# Research: Fix Python Icon Visibility in Skills Scroller

## Decision: Standardize on high-quality Python SVG with unique ID prefixing

### Problem 1: ID Collisions in Scrollers
**Finding**: Browsers use a global namespace for SVG IDs (e.g., `url(#gradient)`). When a scroller clones or repeats elements, multiple `linearGradient` elements with the same ID exist in the DOM. The browser typically resolves `url(#gradient)` to the *first* definition found, which can cause unexpected results or rendering failures if the first instance is hidden or has different parameters.
**Resolution**: Every repeated SVG item in the scroller list will have its own unique set of IDs. For example:
- Python Instance 1: `python-grad-1-a`, `python-grad-1-b`
- Python Instance 2: `python-grad-2-a`, `python-grad-2-b`
- ...and so on for SQL and Power BI as well to be safe.

### Problem 2: ViewBox and Coordinate Mismatch
**Finding**:
- Icon 1 (Line 3205): `viewBox="-8.78 0 70 70"` but path coordinates reach `109.11`. Result: Clipping.
- Icon 3 (Line 3408): `viewBox="0 0 32 32"` but circle center is `256`. Result: Completely invisible.
**Resolution**: Standardize the Python icon on a `viewBox="0 0 110 110"` system which accommodates the full path definition without clipping.

### Problem 3: Icon Aesthetic Inconsistency
**Finding**: There are two different styles of Python icons in the same list: a standard path-based logo and a circular-background logo.
**Resolution**: Standardize all Python entries to use the same path-based logo to maintain a professional, cohesive look.

## Alternatives Considered

### Alternative A: Move SVG to External Files
- **Pros**: Clean HTML, no ID collisions.
- **Cons**: Requires multiple HTTP requests or a sprite sheet. Current project uses inline SVGs for performance and easy styling via CSS variables.
- **Decision**: Rejected to maintain current inline SVG architecture.

### Alternative B: Use SVG `use` tag
- **Pros**: Defines the path once, reuse it many times.
- **Cons**: Still requires unique IDs for gradients if gradients are internal to the SVG. Styling repeated items differently (if needed later) is harder.
- **Decision**: Rejected for simplicity; direct ID prefixing is more robust for this small-scale scroller.

## TestSprite Integration Plan
- **Verification**: Use TestSprite to capture a screenshot of the skills scroller.
- **Assertion**: Ensure the Python icon is rendered in the correct blue/yellow colors and is not clipped.
