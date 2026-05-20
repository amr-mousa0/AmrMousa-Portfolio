# Tasks: Services Sales Copy & Mobile UX Optimization

**Input**: Design documents from `specs/018-services-sales-copy/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

---

## Phase 1: Setup (No prerequisites)

**Purpose**: No new project structure needed. This feature modifies existing files only.

- [x] T001 Verify dev server is running and all 5 service cards render correctly at `http://localhost:4321`

---

## Phase 2: Foundational (Data Layer)

**Purpose**: Update the services data source with the new sales hook copy. MUST complete before UI tasks.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T002 Update `copy` field for `data-analytics` service in `src/data/services.json` to: "Your competitors see their numbers in real-time. You're still waiting for last month's report. Let's fix that."
- [x] T003 Update `copy` field for `media-buying` service in `src/data/services.json` to: "Tired of pouring money into Meta Ads and hearing crickets? Let's build campaigns that actually bring paying clients."
- [x] T004 Update `copy` field for `web-portfolios` service in `src/data/services.json` to: "Visitors land on your page and leave in seconds. I design premium experiences that make them stay and buy."
- [x] T005 Update `copy` field for `excel-expert` service in `src/data/services.json` to: "Your spreadsheets are a mess and your reports take days. I turn chaos into one-click automated dashboards."
- [x] T006 Update `copy` field for `crm-management` service in `src/data/services.json` to: "Leads slipping through the cracks? I build CRM systems that capture, nurture, and close every opportunity."

**Checkpoint**: All 5 services now have PAS sales hooks in English. Cards should render with new copy.

---

## Phase 3: User Story 1 — High-Conversion Sales Hook Localization (Priority: P1) 🎯 MVP

**Goal**: Ensure all 5 new sales hooks are fully localized in Egyptian Arabic via the i18n dictionary.

**Independent Test**: Switch language to Arabic and verify all 5 service cards display the correct Arabic hook text.

### Implementation for User Story 1

- [x] T007 [US1] Add Arabic translation key `service_data-analytics_copy` in `public/js/translations.js` (Arabic section) with value: "منافسينك شايفين أرقامهم لحظة بلحظة. وانت لسه مستني تقرير الشهر اللي فات. تعالى نحل الموضوع."
- [x] T008 [US1] Add Arabic translation key `service_media-buying_copy` in `public/js/translations.js` (Arabic section) with value: "زهقت تصرف فلوس على إعلانات ميتا ومفيش نتيجة؟ تعالى نبني حملات تجيبلك عملاء فعلاً."
- [x] T009 [US1] Add Arabic translation key `service_web-portfolios_copy` in `public/js/translations.js` (Arabic section) with value: "الزوّار بيدخلوا صفحتك وبيمشوا في ثواني. أنا بصمّم تجارب فاخرة تخليهم يقعدوا ويشتروا."
- [x] T010 [US1] Add Arabic translation key `service_excel-expert_copy` in `public/js/translations.js` (Arabic section) with value: "شيتاتك فوضى وتقاريرك بتاخد أيام. بحوّل الفوضى لداشبوردات أوتوماتيك بضغطة زرار."
- [x] T011 [US1] Add Arabic translation key `service_crm-management_copy` in `public/js/translations.js` (Arabic section) with value: "ليدز بتضيع منك؟ ببني أنظمة CRM تمسك كل فرصة وتحوّلها لعميل."
- [x] T012 [US1] Verify the `data-i18n` attribute binding in `src/components/sections/ServicesCarousel.astro` line 58 correctly uses the pattern `service_${service.id}_copy` which matches the new translation keys

**Checkpoint**: Service cards display correct Arabic hooks when language is switched to Arabic. English hooks display from services.json default copy.

---

## Phase 4: User Story 2 — Streamlined Mobile Touch Navigation (Priority: P2)

**Goal**: Hide slider navigation arrows on mobile viewports for both Services and Projects sliders.

**Independent Test**: Load portfolio at viewport ≤768px and verify no arrow buttons are visible on either slider. Load at desktop viewport and verify arrows remain functional.

### Implementation for User Story 2

- [x] T013 [P] [US2] Add `display: none` rule for `.slider-controls` inside the existing `@media (max-width: 768px)` block in `src/components/sections/ServicesCarousel.astro` (around line 396)
- [x] T014 [P] [US2] Add `display: none` rule for `.slider-controls` inside the existing `@media (max-width: 768px)` block in `src/components/astro/ProjectSlider.astro`

**Checkpoint**: Both sliders hide arrows on mobile and show them on desktop. Touch swiping works flawlessly on both.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final verification across all viewports, languages, and themes.

- [x] T015 [P] Verify all 5 service cards maintain equal height and no text overflow at desktop (1440px), tablet (1024px), and mobile (375px) viewports
- [x] T016 [P] Verify card click-through: each service card navigates to the correct `/services/[id]` proposal sheet
- [x] T017 Verify RTL layout integrity: Arabic hooks display correctly with right-aligned text and proper card spacing
- [x] T018 Verify light theme and dark theme render hooks with proper contrast and readability

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — verify environment
- **Foundational (Phase 2)**: Depends on Phase 1 — update data source
- **User Story 1 (Phase 3)**: Depends on Phase 2 — add Arabic translations
- **User Story 2 (Phase 4)**: Depends on Phase 1 only — can run in parallel with US1
- **Polish (Phase 5)**: Depends on Phases 3 and 4 completion

### User Story Dependencies

- **User Story 1 (P1)**: Depends on Phase 2 (data layer must have new English hooks)
- **User Story 2 (P2)**: Independent — can start after Phase 1 (no data dependency)

### Parallel Opportunities

- T002–T006 modify the same file (`services.json`) — execute sequentially (single edit)
- T007–T011 modify the same file (`translations.js`) — execute sequentially (single edit)
- T013 and T014 modify different files — can run in parallel [P]
- T015 and T016 are independent verification tasks — can run in parallel [P]
- **US1 and US2 can run in parallel** (different files, no shared dependencies)

---

## Parallel Example: User Story 2

```bash
# These two tasks can run simultaneously (different files):
Task T013: "Hide .slider-controls on mobile in ServicesCarousel.astro"
Task T014: "Hide .slider-controls on mobile in ProjectSlider.astro"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Verify environment
2. Complete Phase 2: Update all 5 hooks in services.json
3. Complete Phase 3: Add Arabic translations
4. **STOP and VALIDATE**: Test hooks in both languages
5. Ship if ready

### Full Delivery

1. Phase 1 → Phase 2 → Foundation ready
2. Phase 3 (US1) + Phase 4 (US2) in parallel → Both stories complete
3. Phase 5 → Final polish and cross-viewport verification
4. Ship

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- T002–T006 should be done as a single edit to `services.json` (one tool call)
- T007–T011 should be done as a single edit to `translations.js` (one tool call)
- T013–T014 are independent CSS additions to separate component files
- Commit after each phase checkpoint
