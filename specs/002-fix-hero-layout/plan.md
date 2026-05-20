# Implementation Plan: Fix Hero Section Layout

**Branch**: `master` | **Date**: 2026-05-09 | **Spec**: [specs/002-fix-hero-layout/spec.md](spec.md)
**Input**: Feature specification from `/specs/002-fix-hero-layout/spec.md`

## Summary

Fix the layout and typography of the Hero section in `index.html` to establish a clear visual hierarchy (making the name the most prominent element), adjust spacing to prevent overlap with the heat map and image, ensure the hero image loads correctly, and restore the missing "Learn More" scroll indicator.

## Technical Context

**Language/Version**: HTML5, CSS3, Vanilla JavaScript
**Primary Dependencies**: FontAwesome (existing), Google Fonts (existing)
**Storage**: N/A
**Testing**: Manual Visual Testing
**Target Platform**: Web Browsers (Desktop, Tablet, Mobile)
**Project Type**: Static Web Portfolio
**Performance Goals**: Fast visual rendering without layout shift
**Constraints**: Must match existing aesthetic and not break the wave background animation
**Scale/Scope**: Single file (`index.html`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Simplicity**: Modifying existing DOM/CSS instead of introducing new libraries. (Pass)
- **Library-First**: N/A for this scope. (Pass)

## Project Structure

### Documentation (this feature)

```text
specs/002-fix-hero-layout/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command)
```

### Source Code (repository root)

```text
/
└── index.html           # Main portfolio file to be updated
```

**Structure Decision**: We will edit the existing `index.html` in place as it is a static portfolio site.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

*(No violations)*
