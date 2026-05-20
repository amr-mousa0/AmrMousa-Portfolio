# Implementation Plan: Enhance Hero Section Polish

**Branch**: `005-featurename-enhance-hero-polish` | **Date**: 2026-05-09 | **Spec**: [specs/005-featurename-enhance-hero-polish/spec.md](spec.md)

## Summary

A targeted UI/UX polish pass on the Hero section. NO layout changes. NO structural HTML changes. Pure CSS + minimal inline HTML refinements.

## Technical Context

| Item | Value |
|------|-------|
| Language | HTML5, CSS3 |
| Target file | `index.html` |
| Scope | Hero section only (`#hero`, `.split-left`, `.split-right`, `.idea-text`) |
| Dependencies | Fonts: `Poppins`, `Playfair Display` (already loaded) |
| Mobile | No changes to mobile breakpoints |

## Constitution Check ✅

- Simplicity: CSS-only edits. No new scripts or dependencies.
- Correctness: All changes are additive polish, no breaking changes.
- Responsiveness: Mobile already hides `.idea-text`. No new breakpoints needed.

## Phase 0: Research Summary

See [research.md](research.md).

Key decisions:
1. Quote: Playfair Display italic + slim left accent bar + inline `<em>` for word emphasis.
2. Right panel: Accent-colored sub-heading, `800` weight name, consistent 8/14/20/28 spacing rhythm.
3. Skills: Split into 2 lines with `<br>`.
4. Emphasis color: `#00b4d8` (bright teal) for visible accents on dark backgrounds.
5. Badge: Tighten `margin-bottom` to `16px`.

## Phase 1: Design

No data model or contracts. Pure presentation changes.

### Files to Modify

#### `index.html`

**CSS Changes** (Desktop styles, approx. lines 1765–1875):

1. **`.sub-heading`**: Set `color: #00b4d8`, increase `letter-spacing: 0.18em`, `margin-bottom: 6px`.

2. **`.hero-main-name`**: Change `font-weight: 700` → `800`, `letter-spacing: -0.03em`, `margin: 4px 0 14px 0`.

3. **`.hero-skills-text`**: Set `margin-top: 0`, `margin-bottom: 20px`, add `line-height: 1.9` for comfortable two-line display.

4. **`.hero-intro-text`**: Tighten `margin-bottom: 28px`, ensure `max-width: 520px`, `font-size: 16px`.

5. **`.available-badge`**: Reduce `margin-bottom: 16px`.

6. **`.idea-text`** (approx. lines 2631–2659): Full redesign:
   - Add left `4px` accent bar via `::before` pseudo-element on the container.
   - Use `Playfair Display` italic for the quote text.
   - Increase `font-size: 1.25rem`, `line-height: 1.9`.
   - Remove floating `"` pseudo-element from `p::before`.

**HTML Changes** (approx. lines 2787–2796):

1. **`.idea-text > p`**: Wrap `"trust"` and `"revenue"` in `<em>` tags styled with the accent color.

2. **`.hero-skills-text`**: Insert `<br>` after `Python` to create two balanced lines.

## Project Structure

```text
specs/005-featurename-enhance-hero-polish/
├── plan.md        ← This file
├── research.md    ← Phase 0 output
└── tasks.md       ← Phase 2 output (to be generated)

index.html         ← Only file to be modified
```

## Verification

- Open `index.html` in browser at desktop size (1200px+).
- Verify quote is in Playfair Display italic with accent left bar.
- Verify "trust" and "revenue" are distinctly colored.
- Verify skills split into 2 lines.
- Verify consistent vertical spacing between Hero right-panel elements.
