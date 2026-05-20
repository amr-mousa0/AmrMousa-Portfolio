# Implementation Plan: Fix Python Icon Visibility in Skills Scroller

**Branch**: `006-fix-python-icon-scroller` | **Date**: 2026-05-11 | **Spec**: [specs/006-fix-python-icon-scroller/spec.md](file:///c:/Users/HP/Downloads/stitch%20(4)/specs/006-fix-python-icon-scroller/spec.md)
**Input**: Feature specification from `/specs/006-fix-python-icon-scroller/spec.md`

## Summary

The goal is to resolve the visibility issues of the Python icon in the skills scroller by correcting SVG `viewBox` attributes, ensuring globally unique IDs for gradients and masks, and standardizing the icon markup across the repetitive scroller list. This will prevent rendering collisions and clipping in modern browsers.

## Technical Context

**Language/Version**: HTML5, CSS3, SVG 1.1  
**Primary Dependencies**: FontAwesome (for other icons), Vanilla CSS  
**Storage**: N/A (Static site)  
**Testing**: Manual browser verification, TestSprite for visual regression  
**Target Platform**: All modern browsers (Chrome, Safari, Firefox, Edge)
**Project Type**: Web portfolio / Static Site  
**Performance Goals**: 60fps smooth scrolling, instant SVG rendering  
**Constraints**: Must maintain the existing "Lux" aesthetic and dark theme compatibility  
**Scale/Scope**: Modification of `index.html` (specifically the `scroller__inner` section)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **SDD Compliance**: A formal specification has been created at `specs/006-fix-python-icon-scroller/spec.md`.
- **Atomic Change**: This plan focuses exclusively on the Python icon visibility issue and related SVG standardization.
- **Visual Integrity**: The fix directly addresses visual failures and includes TestSprite for validation.
- **Mobile-First**: SVG `viewBox` corrections will ensure the icon scales correctly on mobile devices.
- **Naming Clarity**: New IDs will follow a clear naming convention (e.g., `python-grad-1`, `python-grad-2`).

## Project Structure

### Documentation (this feature)

```text
specs/006-fix-python-icon-scroller/
├── plan.md              # This file
├── research.md          # Research on SVG paths and ID collision prevention
├── data-model.md        # Mapping of SVG entities and scroller structure
├── quickstart.md        # Verification steps for the fix
└── tasks.md             # Implementation tasks (Phase 2)
```

### Source Code (repository root)

```text
index.html               # Main file to be modified
```

**Structure Decision**: Single project modification. The changes are localized to the `index.html` file where the inline SVGs reside.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | No violations identified | N/A |
