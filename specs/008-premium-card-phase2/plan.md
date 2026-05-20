# Implementation Plan: Premium Card Standardization (Phase 2)

## Technical Context
We are extending the "Premium Card" design system established for Experience and Achievements to the rest of the portfolio. This involves modifying existing CSS classes and slightly adjusting HTML structures (adding classes/divs) without breaking existing functionality.

### Constraints
- Must maintain mobile responsiveness (vertical stacking).
- Must use existing CSS variables (`--accent-a-rgb`, etc.).
- Performance: Use `will-change` for complex animations.

## Constitution Check
- **Principle: Consistency**: All cards across the site must feel like they belong to the same design system.
- **Principle: Interactive Depth**: Hover states should provide visual feedback through scaling, glowing, and blurring context.

## Phase 1: Core Competencies Standardization
### Tasks
- [ ] Task 1.1: Update `.competency-card` CSS with unified borders, backgrounds, and `::before` glow.
- [ ] Task 1.2: Implement `blur-others` effect for the competencies grid.
- [ ] Task 1.3: Apply dynamic rotation/scale animations to `.comp-icon` on card hover.

## Phase 2: Education Standardization
### Tasks
- [ ] Task 2.1: Update `.education-card` CSS to match the premium card height and spacing.
- [ ] Task 2.2: Implement `blur-others` effect for the education list.
- [ ] Task 2.3: Convert `.edu-date` into a styled "Pill" component.
- [ ] Task 2.4: Apply dynamic rotation/scale animations to `.edu-icon` on card hover.

## Phase 3: Final Audit & Polish
### Tasks
- [ ] Task 3.1: Verify mobile stacking at 320px for both sections.
- [ ] Task 3.2: Ensure consistent typography and contrast in both Light and Dark modes.
