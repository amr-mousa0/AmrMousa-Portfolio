# Research: Enhance Hero Section Polish

## Decision Log

### 1. Quote Typography

**Decision**: Replace current basic Poppins/floating quote with a **cinematic two-font pairing**.
- Use **Playfair Display (italic, 700)** for the quote body itself — the classic serif brings an editorial/cinematic feel.
- Use a smaller **Poppins (500)** weight for punctuation and subtle attribution if needed.
- Line spacing: `2.2rem` between lines for breathing room.
- Color: Lines 1 & 2 stay at `rgba(255,255,255,0.85)`. The word **"trust"** (line 2) and **"revenue"** (line 3) receive the accent color (`var(--accent-a)`) to create subtle visual emphasis.
- **Left accent bar**: Replace the floating `"` pseudo-element with a slim `4px` vertical accent-colored bar (`::before` on `.idea-text`) positioned at left — cleaner, more intentional.

**Rationale**: Floating large quotation marks look uncontrolled. A slim vertical bar grounds the quote visually (editorial design pattern). Playfair Display italic at large size is inherently "cinematic."

**Alternative considered**: Inline `<em>` or `<strong>` tags on key words — accepted (more semantic, gives precise per-word styling control).

---

### 2. Right Panel Hierarchy

**Decision**: 
- `.sub-heading`: Increase `letter-spacing` to `0.18em`, set color to `var(--accent-a)` for a category "stamp" feel. Keep `14px` size.
- `.hero-main-name`: Keep `72px`, but tighten `letter-spacing` to `-0.03em` and switch from `700` to `800` weight for a bolder impact stamp.
- Spacing: Sub-heading → Name → Skills → Intro → Buttons with `8px / 14px / 20px / 28px` breathing rhythm respectively.

**Rationale**: Consistent spacing rhythm (8–14–20–28) creates a natural eye-flow that feels premium and intentional rather than randomly spaced.

---

### 3. Skills Reorganization

**Decision**: Split into two visual lines using `<br>` or a `display: flex; flex-wrap: wrap` approach with `gap`.
- Line 1: `SQL • Power BI • Python`
- Line 2: `Media Buying • Content Strategy`
- Add subtle `+` or styled separator instead of bullets for a more unique look.

**Rationale**: Two balanced lines reduce horizontal scrolling stress and better fit the `60%` right column width.

---

### 4. Accent Color & Glow Balance

**Decision**: The current `--accent-a` is `#004D61` (dark teal). That is **very dark** and may not be visible as a text emphasis color.

For the quote emphasis (`trust`, `revenue`) — use a brighter override: `#00b4d8` (bright teal) which is visible against the dark gradient background of the left panel.

For the `.sub-heading` on the right panel — the `--accent-a` is dark teal (`#004D61`) — too dark against a dark right panel bg. Instead use `#00b4d8` directly for visibility.

**Alternative considered**: Using CSS variable redefinition — rejected (too heavy). Direct hex values on targeted elements preferred.

---

### 5. Available Badge

**Decision**: Maintain current badge design (green dot, dark pill) as it is already well-designed. Only improve its `margin-bottom` to `16px` from `24px` to tighten spacing with the sub-heading below it.
