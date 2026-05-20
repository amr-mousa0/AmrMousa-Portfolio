# Implementation Plan: Projects Live Preview & Dedicated Pages

**Branch**: `007-premium-card-standardization` | **Date**: 2026-05-18 | **Spec**: [specs/015-projects-live-preview/spec.md](spec.md)
**Input**: Feature specification from `specs/015-projects-live-preview/spec.md`

## Summary

Migrate the Projects (Case Studies) modal to dedicated Astro pages dynamically routed via `projects.json`. Integrate `sharp` for extreme image optimization on the homepage cards, and embed interactive Power BI Dashboards directly into the dedicated project pages to maximize performance while retaining high interactivity.

## Technical Context

**Language/Version**: TypeScript / Astro 4.x / React 18
**Primary Dependencies**: Astro, React, `sharp` (for Astro Image integration)
**Storage**: Static JSON (`src/data/projects.json`)
**Testing**: Manual UI verification and browser rendering
**Target Platform**: Web (Modern Browsers, Mobile-First)
**Project Type**: Static Site Generation (SSG) with Astro
**Performance Goals**: >90 Lighthouse Score, Instant image loading, fast View Transitions
**Constraints**: Zero-JS Astro philosophy where possible; React only for highly interactive components.
**Scale/Scope**: ~10 portfolio projects, single dynamic route structure (`/projects/[id]`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[Gates determined based on constitution file]

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── astro/
│   │   ├── GigCard.astro
│   │   └── ProjectCard.astro (NEW or updated to use sharp images)
│   ├── react/
│   │   └── ProjectSlider.tsx (update links to use /projects/[id])
├── data/
│   └── projects.json (updated with new schema fields)
├── pages/
│   ├── index.astro (homepage)
│   └── projects/
│       └── [id].astro (NEW: Dedicated project dynamic route page)
```

**Structure Decision**: We will use Astro's dynamic routing feature `[id].astro` to generate a dedicated page for each project defined in `projects.json`. This replaces the React-based modal `CaseStudyOverlay.tsx`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

None. Validated Astro SSG alignment and zero-JS (mostly) architecture. Using standard Astro dynamic routing does not introduce unwarranted complexity.
