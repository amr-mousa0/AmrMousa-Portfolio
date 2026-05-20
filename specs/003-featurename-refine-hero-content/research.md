# Research: Refine Hero Content

## Decisions

### Skills List
- **Decision**: Update `.hero-skills-text` content to "SQL • Power BI • Python • Media Buying"
- **Rationale**: User explicitly requested shorter list; excess items hurt readability.

### Intro Text
- **Decision**: Replace `.hero-intro-text` paragraph with "I analyze data to understand systems, and marketing to understand people."
- **Rationale**: More concise and brand-aligned tagline.

### Quote / Image Overlap
- **Decision**: Adjust `.idea-text` CSS by reducing the `right` value (from ~60px to a larger number like 120px or more) to push it further left and away from the profile image.
- **Rationale**: The current `right: 60px` on the absolutely-positioned `.idea-text` element places it too close to (and potentially over) the image which is centered on the left/right boundary. Increasing the right offset value moves the block left.
- **Alternatives considered**: Adding `max-width` constraint or `left` anchor instead.
