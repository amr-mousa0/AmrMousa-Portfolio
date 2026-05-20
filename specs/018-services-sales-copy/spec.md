# Feature Specification: Services Sales Copy & Mobile UX Optimization

**Feature Branch**: `018-services-sales-copy`  
**Created**: May 19, 2026  
**Status**: Clarified  
**Input**: User description: "عاوز اغير كل الكلام اللي ف السيرفيسيس علي الكارت بره و اخليه هووك بيعي فقط و السيرفيس كده كده جوه يعني لما يضغط عليها يشوف بقا هياخد بقا وكده وده معمول لكن بره اقصد اخليه بيعي اصدمه بالمشكله و اقوله الحل هنا خش كده يعني فاهمني هاتلي برضه احسن دراسه للكلام نعملها فيها كول تو اكشن و هوك واضح ماركتنيج و عاوزك تديني اكتر من اختيارات و نختار سوا اي الاحسن لكل سيرفيس بسؤال و جواب و كمان عاوز ف نسخ الموبايل كده كده السلوب تاتشابيل مش زي الديسكتوب ف ندرس اننا نشيل لاسهم اصلا بقا ف الموبيل فقط و نسيبها ف الديسكتوب"

## Clarifications

### Session 2026-05-19

- Q: Should hooks apply to all 5 services (including CRM) or only 4? → A: All 5 services.
- Q: Should mobile arrow removal also apply to the Projects slider? → A: Yes, both Services and Projects sliders.
- Q: Should we implement A/B/C variant rotation (3 hooks per service) or pick one winner per service? → A: One winner per service. No A/B/C rotation needed.
- Q: Which specific hook variant for each service? → A: 1C, 2B, 3B, 4B, 5A. Selections below:
  - **data-analytics**: Variant C — "Your competitors see their numbers in real-time. You're still waiting for last month's report. Let's fix that." / "منافسينك شايفين أرقامهم لحظة بلحظة. وانت لسه مستني تقرير الشهر اللي فات. تعالى نحل الموضوع."
  - **media-buying**: Variant B — "Tired of pouring money into Meta Ads and hearing crickets? Let's build campaigns that actually bring paying clients." / "زهقت تصرف فلوس على إعلانات ميتا ومفيش نتيجة؟ تعالى نبني حملات تجيبلك عملاء فعلاً."
  - **web-portfolios**: Variant B — "Visitors land on your page and leave in seconds. I design premium experiences that make them stay and buy." / "الزوّار بيدخلوا صفحتك وبيمشوا في ثواني. أنا بصمّم تجارب فاخرة تخليهم يقعدوا ويشتروا."
  - **excel-expert**: Variant B — "Your spreadsheets are a mess and your reports take days. I turn chaos into one-click automated dashboards." / "شيتاتك فوضى وتقاريرك بتاخد أيام. بحوّل الفوضى لداشبوردات أوتوماتيك بضغطة زرار."
  - **crm-management**: Variant A — "Leads slipping through the cracks? I build CRM systems that capture, nurture, and close every opportunity." / "ليدز بتضيع منك؟ ببني أنظمة CRM تمسك كل فرصة وتحوّلها لعميل."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - High-Conversion Sales Hook Exploration (Priority: P1)

As a potential client browsing the portfolio, I want to see compelling, problem-focused sales hooks on the outer service cards rather than dense technical summaries, so that I immediately recognize my business pain point and feel compelled to click "Explore Details" to view the full proposal sheet.

**Why this priority**: Direct impact on conversion rate. By shocking the user with their exact bottleneck (e.g., wasted ad spend, blind decision making, messy manual spreadsheets) and presenting the solution, we maximize click-throughs to the dedicated service sheets.

**Independent Test**: Can be tested by reviewing the outer card text across all 5 services and verifying that the copy follows the PAS (Problem-Agitate-Solution) psychology.

**Acceptance Scenarios**:

1. **Given** a visitor lands on the homepage, **When** they view the Services carousel, **Then** they see bold, problem-agitation hooks tailored to each of the 5 services instead of generic gig descriptions.
2. **Given** a visitor reads a compelling hook, **When** they click anywhere on the card shell, **Then** they are seamlessly transitioned to the deep proposal sheet (`/services/[id]`).

---

### User Story 2 - Streamlined Mobile Touch Navigation (Priority: P2)

As a mobile visitor, I want a clean, uncluttered interface without redundant navigation arrows (`<` and `>`), so that I can naturally swipe/touch-scroll through the service and project cards without accidental button taps or visual clutter.

**Why this priority**: Enhances mobile UX elegance and aligns with modern touch-device expectations where horizontal scroll-snapping is native and intuitive.

**Independent Test**: Can be tested by loading the portfolio on a mobile viewport (<768px) and verifying that the `.slider-controls` container is hidden on both the Services carousel and Projects slider, while verifying it remains fully visible and functional on desktop viewports.

**Acceptance Scenarios**:

1. **Given** a user accesses the portfolio on a mobile viewport (max-width: 768px), **When** they view the Services carousel or Projects slider, **Then** the left/right navigation arrows are completely hidden and the user navigates via fluid touch swiping.
2. **Given** a user accesses the portfolio on a desktop viewport, **When** they view the Services carousel or Projects slider, **Then** the left/right navigation arrows remain fully visible and clickable for convenient desktop navigation.

### Edge Cases

- What happens if a service hook text is slightly longer in Arabic or English? The card layout must maintain consistent padding and flexible flex-grow properties to prevent text clamping or uneven card heights.
- How does the system handle desktop users who resize their browser window to a mobile viewport width? Media queries must dynamically hide the arrow controls without requiring a page refresh.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display high-converting, problem-focused marketing hooks on the outer service cards for all 5 services (`data-analytics`, `media-buying`, `web-portfolios`, `excel-expert`, `crm-management`).
- **FR-002**: System MUST use a single, pre-selected sales hook per service (no A/B/C rotation). The selected hooks are: data-analytics=C, media-buying=B, web-portfolios=B, excel-expert=B, crm-management=A.
- **FR-003**: System MUST maintain the fully clickable card shell architecture (`<a class="service-card">`) to ensure frictionless navigation to `/services/[id]`.
- **FR-004**: System MUST hide the left/right slider navigation arrows (`.slider-controls`) on mobile viewports (max-width: 768px) on **both** the Services carousel (`ServicesCarousel.astro`) and the Projects slider (`ProjectSlider.astro`), while preserving them on desktop viewports.
- **FR-005**: System MUST ensure both English (LTR) and Egyptian Arabic (RTL) localized versions of the selected sales hooks are fully integrated into the `data-i18n` dictionary.

### Key Entities *(include if feature involves data)*

- **ServiceHook**: Represents the localized marketing hook text (Problem/Agitation/Solution) for a specific service card. Each service has exactly one hook (no variants).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Click-through rate (CTR) from the homepage Services carousel to dedicated service sheets improves by at least 35%.
- **SC-002**: Mobile viewport visual clutter is reduced by 100% regarding redundant navigation controls on both sliders, achieving zero accidental button taps during touch swiping.
- **SC-003**: 100% of service cards maintain perfect visual alignment and equal height across all supported viewports without text overflow or clamping.

## Assumptions

- Existing translation infrastructure (`data-i18n` attributes and global dictionary) will be reused for the new sales hooks.
- Dedicated service sheets (`/services/[id]`) are already fully developed and will remain unchanged.
- The Projects slider already has functional `scroll-snap-type: x mandatory` ensuring smooth touch swiping works without arrows.
