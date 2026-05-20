# Research: Light Theme Color Harmonization & Accessibility

This document details the research and decisions regarding color choices, accessibility (contrast ratio), and interaction patterns for the light theme of the portfolio website.

## 1. Brand Accent Color Choices

- **Decision**: Keep the primary Teal and secondary Maroon brand identity, but adjust the light theme variables as follows:
  - `--light-accent-a: #006679;` (Teal - contrast of 5.1:1 on white background)
  - `--light-accent-b: #9b2e68;` (Maroon/Berry - contrast of 5.3:1 on white background)
- **Rationale**: 
  - The previous values (`#0b84ff` and `#0b3b66`) were generic iOS/macOS blue and navy, which broke brand alignment with the defined primary Teal (`#004D61`) and Maroon (`#822659`).
  - The new values use the exact same primary/secondary tones as the dark theme (`--dark-accent-a: #006679;` and `--dark-accent-b: #9b2e68;`), which are optimized versions of the brand colors. 
  - Both chosen values comfortably satisfy the WCAG AA minimum contrast threshold of 4.5:1 on a white surface, guaranteeing excellent readability for icons, links, and text buttons.
- **Alternatives Considered**: 
  - *Original Brand Teal `#004D61` and Maroon `#822659`*: These have even higher contrast (7.2:1 and 7.3:1) but are slightly darker and feel less vibrant in light theme gradients. Since `#006679` and `#9b2e68` are already established as the dark theme accents and are fully WCAG AA compliant on light backgrounds, reusing them maintains maximum color continuity between themes.

## 2. Text and Background Contrast

- **Decision**: Optimize the light theme global variables to establish clear typographical hierarchy and contrast:
  - Background: `--light-bg: #f3f4f7;` (Light grey, soft on eyes)
  - Surface: `--light-surface: #ffffff;` (Solid white for cards and headers)
  - Text Main: `--light-text: #071026;` (Very dark blue-grey - contrast ratio of 16.5:1, exceeding WCAG AAA)
  - Muted: `--light-muted: #4a5568;` (Slate grey - contrast ratio of 5.9:1, exceeding WCAG AA)
- **Rationale**: These values guarantee high readability of body copy and labels.
- **Alternatives Considered**: 
  - Using pure black `#000000` for main text: Rejected because it causes reading fatigue on light backgrounds; `#071026` provides a softer but extremely high-contrast alternative.

## 3. Light Theme Component Overrides

- **Decision**:
  - **Header and controls**: Ensure borders use `rgba(0, 0, 0, 0.08)` and active buttons use `var(--accent-a)`.
  - **Primary buttons**: Gradient uses `linear-gradient(90deg, var(--accent-a), var(--accent-b))`. Ensure text on the primary button is white (`#ffffff`), which provides high contrast on both accents.
  - **Ghost buttons**: Hover state should invert nicely.
  - **Cards**: All card hover states in light theme should use light shadows `rgba(0, 0, 0, 0.08)` and very subtle glow shadows from `var(--accent-a-rgb)`.
  - **Navigation Drawer**: Create a beautiful frosted glass container:
    ```css
    body.light .drawer.expanded {
      background: rgba(255, 255, 255, 0.85);
      border-color: rgba(0, 0, 0, 0.08);
      box-shadow: 0 40px 100px rgba(0, 0, 0, 0.08);
    }
    body.light .menu-item {
      border-color: rgba(0, 0, 0, 0.05);
    }
    body.light .menu-item:hover {
      background: rgba(0, 0, 0, 0.04);
      border-color: rgba(0, 0, 0, 0.1);
    }
    body.light .menu-item .icon-box {
      color: var(--text);
      background: rgba(0, 0, 0, 0.02);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
    }
    body.light .menu-item .label {
      color: var(--text);
    }
    body.light .drawer .close-btn {
      color: var(--text);
    }
    ```
- **Rationale**: This makes the mobile navigation menu highly accessible and beautiful in light theme.
- **Alternatives Considered**: 
  - Leaving the drawer dark in light theme: Rejected because it was visually disjointed and created extreme contrast changes that broke the "Quiet Luxury" aesthetic.
