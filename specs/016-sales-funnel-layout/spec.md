# Feature Specification: Sales Funnel Layout

**Feature Branch**: `016-sales-funnel-layout`  
**Created**: 2026-05-18  
**Status**: Draft  
**Input**: User description: "عاوز خطه كامله عن ازاي ارتب السكاشن للهدف الجديد السكاشن القديمه موجوده ف انديكس و السكاشن الجديده لسه مش مكتمله ف الاسترو المهم اول تلاته الانترو و بعدبن المشاريع و بعدين الخدمات و بعدها التيتيمونيوالز مثلا وبعدها الكونتات وخلاص ولا اعمل اي انا مش عاوز اسكرول كتير لكن ف نفس الوقت عاوز اكون معرف نفسي صح فاهم كمان مهم اوي انك تفهم حاجه انا هنا ببيع البورتفوليو ده ببيع شغلي منه لعرض الشغل و البيع محتاج اعمل البحث واهتم بقا بالموضوع ده اهم حاجه البيع و خطوات البيع مش عاوز اسكرول كتير الموبايل ده رقم واحد ف التصميم و الفانيل البيعي مهم"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - The "Hook & Proof" Mobile Experience (Priority: P1)

As a potential client or recruiter browsing on mobile, I want to immediately understand Amr's value proposition (Intro) and see his best work (Projects) with minimal scrolling, so I can quickly decide if he is the right fit for my needs.

**Why this priority**: Mobile users have short attention spans. Presenting identity and proof immediately drives the highest conversion.

**Independent Test**: Can be fully tested by loading the homepage on a mobile viewport and verifying that the Intro clearly states the value, and the Projects slider is reachable within 1-2 thumb scrolls.

**Acceptance Scenarios**:

1. **Given** a user lands on the mobile homepage, **When** the page loads, **Then** the Hero/Intro section fits within the initial viewport and clearly states the value proposition.
2. **Given** the user scrolls down once, **When** viewing the next section, **Then** the Projects gallery is immediately visible and interactive.

---

### User Story 2 - The "Trust & Action" Flow (Priority: P2)

As a convinced prospect who just viewed the projects, I want to see what specific services Amr offers and read client testimonials to build trust, culminating in a frictionless way to contact him.

**Why this priority**: Once proof is established, detailing services and adding social proof removes friction before the final Call to Action.

**Independent Test**: Can be fully tested by navigating past the Projects section and verifying the logical flow of Services -> Testimonials -> Contact without excessive whitespace or cognitive overload.

**Acceptance Scenarios**:

1. **Given** the user scrolls past Projects, **When** they reach Services, **Then** the services are presented concisely without requiring deep scrolling.
2. **Given** the user reaches the end of the page, **When** viewing the Contact section, **Then** the contact form or links are immediately actionable.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST order the homepage sections strictly as: Intro (Hero/About), Projects, Services, Contact.
- **FR-002**: System MUST optimize all section heights, paddings, and margins for mobile viewports to minimize overall page scroll depth.
- **FR-003**: System MUST combine or streamline the "Hero" and "About" content into a single punchy "Intro" section to reduce scroll fatigue.
- **FR-004**: System MUST ensure the global Sticky CTA ("Hire Me" / "Contact") remains visible on mobile to capture intent at any point in the funnel.
- **FR-005**: System MUST remove or hide any legacy sections (e.g., standalone Education/Skills grids, Testimonials) from the primary mobile funnel if they do not directly contribute to the immediate sales pitch.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The entire homepage (Intro to Contact) requires no more than 6-8 standard mobile screen heights of scrolling.
- **SC-002**: The Projects section is visible within the first 25% of the page scroll on mobile.
- **SC-003**: All sections load and render sequentially without layout shifts (Core Web Vitals CLS < 0.1).
- **SC-004**: Mobile Lighthouse Performance and Best Practices scores remain above 90.

## Assumptions

- The target audience consists of busy recruiters and business owners who value speed and clarity over long narratives.
- The existing Astro components (Hero, Projects Slider, Contact) can be reordered in `index.astro` without breaking routing or state.
