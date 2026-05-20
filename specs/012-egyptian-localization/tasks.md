# Tasks: Egyptian Arabic Localization

**Input**: Design documents from `/specs/012-egyptian-localization/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/ui-contracts.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 [Setup] Create `js/translations.js` file for the dictionary
- [x] T002 [Setup] Link `js/translations.js` inside `index.html` head

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 [Foundational] Create `TranslationDictionary` entity structure in `js/translations.js` with empty `en` and `ar` objects
- [x] T004 [Foundational] Setup `data-i18n` attributes across all translatable elements in `index.html` (Home, About, Hero, etc.)

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Language Switcher Toggle & Loader (Priority: P1) 🎯 MVP

**Goal**: Toggle between English and Egyptian Arabic seamlessly using a chic toggle button, triggering the branded loader.

**Independent Test**: Click the toggle button and observe the loader activation and the `<html>` tag changing `lang` and `dir` attributes.

### Implementation for User Story 1

- [x] T005 [US1] Inject the language toggle button into the header in `index.html`
- [x] T006 [P] [US1] Implement the visual styling for the toggle button in `css/style.css`
- [x] T007 [US1] Implement basic language switching logic (state management: `currentLang = 'en'`) in `js/main.js`
- [x] T008 [US1] Integrate the cinematic loader logic (show loader, timeout 500ms, hide loader) into the toggle event in `js/main.js`
- [x] T009 [US1] Add logic to swap `<html lang="en" dir="ltr">` to `<html lang="ar" dir="rtl">` during the loader timeout in `js/main.js`

**Checkpoint**: At this point, the toggle button should trigger the loader and change the document direction.

---

## Phase 4: User Story 2 - Egyptian Arabic "Spirited" Translation (Priority: P1)

**Goal**: Translate the portfolio content into a natural, elegant Egyptian Arabic tone, maintaining the "Quiet Luxury" aesthetic and RTL layout integrity.

**Independent Test**: Review translated sections against the English for tone and layout structure.

### Implementation for User Story 2

- [x] T010 [P] [US2] Populate `en` and `ar` dictionary entries in `js/translations.js`, ensuring proper nouns are identical in both or wrapped in `<span class="notranslate" dir="ltr">`
- [x] T011 [US2] Implement the DOM text replacement logic based on `data-i18n` keys in `js/main.js`
- [x] T012 [P] [US2] Add `[dir="rtl"]` overrides in `css/style.css` (e.g., adjust margins, flex-direction, and padding)
- [x] T013 [P] [US2] Configure typography in `css/style.css` for `[dir="rtl"]` (e.g., elegant Arabic font family and line-height adjustments)

**Checkpoint**: At this point, clicking the toggle should seamlessly translate the text and adjust the layout to RTL without breaking.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T014 Run validation against `quickstart.md` to ensure seamless transition.
- [ ] T015 Verify glass-card heights and alignment on mobile view when Arabic text expands.
- [ ] T016 Check all proper nouns to guarantee they are preserved exactly as requested (e.g. "Mohammed Wagdy").

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P1)**: Depends on User Story 1 to trigger the language switch.

### Parallel Opportunities

- T005 and T006 can run in parallel.
- T010, T012, and T013 can run in parallel while the logic is built.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2.
2. Complete Phase 3 (Toggle & Loader logic).
3. **STOP and VALIDATE**: Ensure loader masking and `dir` swap work.

### Incremental Delivery

1. Implement MVP (Toggle/Loader).
2. Add US2: Populate dictionary and CSS RTL overrides.
3. Polish UI.
