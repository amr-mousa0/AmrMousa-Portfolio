# Tasks: Premium Card Standardization (Phase 2)

## Phase 1: Setup
- [x] T001 Verify existing CSS variables and grid structures for Skills and Education in index.html

## Phase 2: Core Competencies Standardization [US1]
- [x] T002 [US1] Update `.competency-card` CSS in `index.html` to use unified `--surface` background, 1px accent border (0.08 opacity), and `::before` glow pseudo-element.
- [x] T003 [US1] Implement `blur-others` logic for the `.competencies-grid` in `index.html` (hovering one card blurs/scales down siblings).
- [x] T004 [US1] Add dynamic rotation (-12deg) and scaling (1.1) to `.card-icon` on `.competency-card:hover` in `index.html`.

## Phase 3: Education Standardization [US2]
- [x] T005 [US2] Update `.education-card` CSS in `index.html` to match the premium height, padding, and background/border style of the Experience cards.
- [x] T006 [US2] Implement `blur-others` logic for the `.education-content` container in `index.html`.
- [x] T007 [US2] Transform `.edu-date` in `index.html` from plain text to a styled "Pill" (background: rgba(accent, 0.08), rounded corners, semi-bold accent color).
- [x] T008 [US2] Add dynamic rotation (-12deg) and scaling (1.1) to `.edu-icon` on `.education-card:hover` in `index.html`.

## Phase 4: Polish & Final Audit
- [x] T009 Verify mobile stacking (vertical) at 320px for both sections in `index.html`.
- [x] T010 Perform visual audit of contrast and vibrancy in both Light and Dark modes.
