# Feature Specification: Premium Card Standardization (Phase 2)

## Overview
Unify the visual and interaction design of the "Core Competencies" and "Education" sections with the "Premium Card" design language established in Experience and Achievements. This ensures a consistent, high-end professional aesthetic across the entire portfolio.

## User Scenarios
- **Scenario 1: Exploring Skills**: A user scrolls to the "Core Competencies" section. As they hover over a skill card, the card glows with a vibrant gradient, the icon rotates/scales dynamically, and other cards slightly blur to focus attention on the active skill.
- **Scenario 2: Reviewing Education**: A user scrolls to "Education". The education cards behave identically to experience cards, featuring pill-styled dates and smooth hover transitions that feel premium and interactive.

## Functional Requirements
- **FR1: Core Competencies Visual Update**:
    - Update `.competency-card` to use unified design tokens (`--surface`, `--radius`, `--accent-a-rgb`).
    - Add a gradient glow `::before` pseudo-element on hover.
    - Implement the "blur-others" effect for the `.competencies-grid`.
- **FR2: Core Competencies Icon Dynamics**:
    - Standardize `.comp-icon` to rotate -12deg and scale 1.1 on hover, matching the experience logo behavior.
- **FR3: Education Visual Update**:
    - Update `.education-card` to use unified design tokens.
    - Add a gradient glow `::before` pseudo-element on hover.
    - Implement the "blur-others" effect for the `.education-content`.
- **FR4: Education Meta Styling**:
    - Transform `.edu-date` from plain text to a "Pill" styled component (background: rgba(accent, 0.08), rounded-corners, accent color).
- **FR5: Icon Standardization**:
    - Standardize `.edu-icon` behavior (rotation/scaling) to match the premium interaction model.

## Success Criteria
- **C1: Visual Consistency**: 100% of cards in Competencies and Education match the border-radius, background, and hover glow of the Experience cards.
- **C2: Interactive Uniformity**: All cards exhibit the "blur-others" effect on hover within their respective grids.
- **C3: Motion Harmony**: Icons in all standardized sections rotate and scale with identical timing and transform values.
- **C4: Mobile Integrity**: The new styles do not break the 320px vertical stacking or cause horizontal overflow.

## Assumptions
- We will continue using the existing CSS variables defined in the root.
- The "Education" section's illustration (left side) will remain as is for now unless further polish is requested.
