# Implementation Plan: Refine Hero Content

**Branch**: `003-featurename-refine-hero-content` | **Date**: 2026-05-09 | **Spec**: [specs/003-featurename-refine-hero-content/spec.md](spec.md)
**Input**: Feature specification from `/specs/003-featurename-refine-hero-content/spec.md`

## Summary

Refine the Hero section content in `index.html` to improve readability and fix the text/image overlap. The user has specified:
1. **Skills list**: Reduce to "SQL • Power BI • Python • Media Buying"
2. **Intro text**: Replace with "I analyze data to understand systems, and marketing to understand people."
3. **Quote**: Keep "Data reveals the direction. Marketing reveals the behavior. Growth happens when both connect" — but move it further left to avoid overlapping the profile image.

## Technical Context

**Language/Version**: HTML5, CSS3
**Primary Dependencies**: None new — existing FontAwesome & Google Fonts
**Storage**: N/A
**Testing**: Manual Visual Testing
**Target Platform**: Web Browsers (Desktop, Tablet, Mobile)
**Project Type**: Static Web Portfolio
**Performance Goals**: No layout shift; fast render
**Constraints**: Must not break existing mobile stacked layout
**Scale/Scope**: Single file (`index.html`)

## Constitution Check

- **Simplicity**: Editing existing DOM/CSS only; no new libraries. ✅
- **Correctness**: Changes are surgical and scoped to the hero section. ✅

## Project Structure

### Documentation (this feature)

```text
specs/003-featurename-refine-hero-content/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # N/A for UI-only feature
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
/
└── index.html           # Main portfolio file to be updated
```

## Phase 0: Research

### Skills List
- **Decision**: Replace full skills text with "SQL • Power BI • Python • Media Buying"
- **Rationale**: User explicitly requested a shorter, cleaner list.

### Intro Text
- **Decision**: Replace `.hero-intro-text` content with "I analyze data to understand systems, and marketing to understand people."
- **Rationale**: New, more punchy one-liner that better expresses brand identity.

### Image Overlap / Quote Position
- **Decision**: The `.idea-text` element (the left-panel quote) is absolutely positioned and overlapping the profile image. Reduce its `right` value to push it further left.
- **Rationale**: The `right: 60px` places it too close to the image center point. Increase `right` offset or decrease the value to move it left.

## Complexity Tracking

*(No constitution violations)*
