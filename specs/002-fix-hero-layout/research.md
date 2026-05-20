# Research: Fix Hero Section Layout

## Technical Approach

### Typography & Visual Hierarchy
- **Decision**: Update `index.html` inline styles and classes to make "Amr Mousa" the most prominent element (`h1` or primary title size) in the text block on the right, or correctly use `.split-left` vs `.split-right` layout. The user wants the name to be the Hero, with lines above and below being smaller.
- **Rationale**: The current layout has `Amr Mousa` as `.hero-main-name` (an `h2` under `.split-right`) and `.logo-name` as `h1` under `.split-left`. We'll increase the font size and visual weight of the `.hero-main-name` and decrease the sizes of `.sub-heading` and `.hero-skills-text` to establish clear visual hierarchy.

### Layout Positioning
- **Decision**: Add margin or padding to the `.hero-text-content` or adjust the CSS Grid/Flexbox properties of `.split-hero` to shift the text content slightly left.
- **Rationale**: The user mentioned the text block needs to move a little left away from the image to prevent breaking the vision.

### Quote Placement
- **Decision**: The quote "Data reveals the direction. Marketing reveals the behavior. Growth happens when both connect" is currently in `.idea-text` on the left. We'll ensure it stays visible and does not overlap with the main text.

### Image Restoration
- **Decision**: Keep the `src="images/Amr-Mousa.JPG"`.
- **Rationale**: The user complained about the image being missing, likely due to a typo in previous iterations or CSS masking hiding it. We'll verify `.hero-photo` and `.hero-image-container` CSS properties to ensure it displays correctly.

### "Learn More" Element
- **Decision**: Add a new "Learn More" down-arrow button/link at the bottom of the hero section.
- **Rationale**: The user reported it missing. We'll add standard HTML/CSS for an animated down arrow with "Learn More" text, scrolling down to the next section.
