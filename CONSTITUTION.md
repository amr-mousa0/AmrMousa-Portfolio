# 📜 GitHub Spec Kit Constitution

> "Precision in specification, excellence in execution."

This constitution defines the core principles for the development and maintenance of this repository. Every contributor and agent must adhere to these standards to ensure the highest level of software craftsmanship.

---

## 💎 I. Code Quality & Craftsmanship
We believe that code is a form of communication. Our codebase should be clean, intentional, and self-documenting.

*   **Spec-Driven Development (SDD):** No feature shall be implemented without a corresponding specification. The spec is the source of truth.
*   **Atomic Logic:** Functions and components should do one thing and do it exceptionally well.
*   **Naming Clarity:** Use descriptive, intentional names. Avoid abbreviations unless they are industry standards.
*   **Refactor First:** If a feature requires making a mess, clean the existing architecture first to accommodate it.

## 🧪 II. Testing & Reliability Standards
Reliability is not an afterthought; it is built into the foundation of every module.

*   **Zero Regressions:** Every bug fix must include a test case that prevents its recurrence.
*   **Critical Path Coverage:** User-facing workflows (login, checkout, data export) must have 100% automated test coverage.
*   **Visual Integrity:** Use automated UI testing (e.g., TestSprite) to validate that layout and aesthetics remain consistent across updates.
*   **Fail Fast:** Implement robust error handling that provides clear feedback to developers and graceful fallbacks for users.

## 🎨 III. User Experience (UX) Consistency
We aim for a "Lux" aesthetic—premium, minimalist, and professional. The interface should feel alive but never distracting.

*   **Visual Harmony:** Adhere to the established color palette, typography (Poppins/Inter), and spacing scales.
*   **Micro-Animations:** Use subtle transitions (200ms - 300ms) for hover states and transitions to provide tactile feedback.
*   **Mobile-First Resilience:** All interfaces must be fully functional and aesthetically pleasing on screens of all sizes.
*   **Predictable Patterns:** Common actions (Save, Cancel, Close) should always be in the same relative locations and use consistent iconography.

## ⚡ IV. Performance Requirements
Speed is a feature. A laggy interface is a broken interface.

*   **Instant Feedback:** All user interactions must trigger a visual response within 100ms.
*   **Optimized Delivery:** Assets must be compressed, and heavy modules should be lazy-loaded to ensure fast initial paint.
*   **Minimal Bloat:** Every new dependency must be audited for bundle size impact. If a native solution exists, prefer it.
*   **DOM Efficiency:** Avoid unnecessary re-renders and deep DOM nesting to maintain 60fps animations.

## 🔒 V. Security & Compliance
Security is built into the foundation.

*   **Secure by Design:** All inputs must be sanitized, and authentication must be robust.
*   **Regular Audits:** Dependency audits are performed regularly to identify and mitigate vulnerabilities.
*   **Privacy First:** Any feature involving user data must undergo a security review before implementation.

---

## 🛠️ Development Workflow
Every feature must follow the standard SDD lifecycle:
1. **Spec**: Define the "what" and "why" in a feature specification.
2. **Plan**: Research and design the "how" in an implementation plan.
3. **Implement**: Write code that adheres to the plan and principles.
4. **Verify**: Validate against success criteria and automated tests.

## ⚖️ Governance
This constitution supersedes all other development practices in this project. Amendments require a formal specification and approval. All Pull Requests must be reviewed for compliance with these principles.

---

**Version**: 1.0.0 | **Ratified**: 2026-05-09 | **Last Amended**: 2026-05-09
