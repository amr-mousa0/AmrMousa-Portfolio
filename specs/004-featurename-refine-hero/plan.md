# Implementation Plan: Refine Hero Content v2

**Branch**: `004-featurename-refine-hero` | **Date**: 2026-05-09 | **Spec**: [specs/004-featurename-refine-hero/spec.md](spec.md)

## Summary

Three targeted changes to `index.html`:

1. **Right panel content** — Update sub-heading, skills, and tagline.
2. **Left panel quote** — Replace quote text and reformat to 2 lines max (smaller font, wider container, horizontal-first flow).

## Technical Context

| Item | Value |
|------|-------|
| Language | HTML5, CSS3 |
| Target file | `index.html` |
| Target elements | `.sub-heading`, `.hero-skills-text`, `.hero-intro-text`, `.idea-text` |
| Platform | Static HTML portfolio |
| Dependencies | None new |

## Constitution Check ✅

- Simplicity: Direct DOM/CSS edits, no new code introduced.
- Correctness: Surgical, spec-aligned changes only.

## Phase 0: Research

### Sub-heading
- **Decision**: Replace `Data Analyst | Marketing & Growth Enthusiast` → `Data Analyst & Media Buyer`
- **Rationale**: More precise and concise; matches the user's professional focus.

### Skills
- **Decision**: Replace current list → `SQL • Power BI • Python`
- **Rationale**: User requested this exact 3-item list.

### Tagline
- **Decision**: Replace current tagline → `I use data to understand systems, and marketing to understand people.`
- **Rationale**: User specified this exact string.

### Idea-text Quote
- **Decision**: Replace quote text and shrink font from `1.5rem` to `1rem`. Increase `max-width` from `320px` to `520px` so the text can flow in 2 lines instead of 3+.
- **New quote**: `Content builds relationships. Relationships are built on trust. Trust drives revenue.`
- **Rationale**: Shorter font + wider container = text spans horizontally in ≤2 lines on desktop.
- **Alternative considered**: Using `white-space: nowrap` — rejected, too wide and breaks on smaller screens.

## Phase 1: Design

No data-model or API contracts needed — this is purely a UI content/style edit.

## Project Structure

```text
specs/004-featurename-refine-hero/
├── plan.md        ← This file
├── research.md    ← Phase 0 output
└── tasks.md       ← Phase 2 output (to be generated)

index.html         ← Only file to be modified
```
