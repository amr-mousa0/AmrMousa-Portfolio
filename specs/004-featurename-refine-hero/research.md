# Research: Refine Hero Content v2

## Decisions

### Sub-heading
- **Decision**: Update `.sub-heading` to "Data Analyst & Media Buyer"
- **Rationale**: More precise than previous "Marketing & Growth Enthusiast".

### Skills
- **Decision**: Update `.hero-skills-text` to "SQL • Power BI • Python"
- **Rationale**: Exactly as specified; trimmed to 3 core tools.

### Tagline
- **Decision**: Update `.hero-intro-text` to "I use data to understand systems, and marketing to understand people."
- **Rationale**: Exactly as specified by user.

### Quote Block (`.idea-text`)
- **Decision**: 
  - Replace quote text with: "Content builds relationships. Relationships are built on trust. Trust drives revenue."
  - Reduce `.idea-text p` font-size from `1.5rem` to `1rem`
  - Increase `.idea-text` max-width from `320px` to `520px`
- **Rationale**: The quote currently renders in 3 lines at small font. Increasing the container width allows it to span in 2 lines. Reducing the font further ensures it fits.
- **Alternatives**: Using `white-space: nowrap` — rejected as it overflows on smaller screens.
