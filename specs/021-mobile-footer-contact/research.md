# Research Notes: Mobile Footer & Contact Layout

## Decisions and Rationale

### 1. Visibility of Contact Form on Mobile Viewports

- **Decision**: **Option A (Hybrid / Collapsible)**
- **Rationale**: 
  - Completely removing the form (Option B) denies mobile visitors who prefer structured email inquiries the ability to submit details directly.
  - An overlay modal (Option C) introduces unnecessary UI steps and click interactions.
  - The **Hybrid (Collapsible)** approach provides a toggle button ("Write a Message" / "ارسل رسالة تفصيلية") which expands/collapses the form smoothly. By default, it is collapsed on mobile to keep page height short, but can be fully opened if the user wishes.
- **Alternatives Considered**: 
  - *Option B (Remove Form)*: Rejected because some clients prefer sending a formal email over initiating a synchronous WhatsApp chat.
  - *Option C (Modal)*: Rejected due to extra JS complexity and risk of layout jumps on smaller viewports.

### 2. Scope and Style of Footer

- **Decision**: **Option A (Global Footer for Desktop & Mobile)**
- **Rationale**: 
  - The website currently has no footer section. Adding a premium quiet-luxury footer at the bottom of the page (with localized bio, links, copyright, and social icons) completes the website structure across all devices.
  - On mobile, the footer will also render direct phone call and WhatsApp buttons, replacing the current sticky bottom bar or integrating seamlessly.
- **Alternatives Considered**:
  - *Option B (Mobile Only)*: Rejected because the desktop layout feels incomplete when it terminates abruptly at the contact section.

## Integration Patterns

- **Astro Components**: Use `Footer.astro` as a reusable component imported at the page level.
- **Tailwind CSS Transitions**: Use CSS transition classes for form expand/collapse transitions to avoid layout shifts.
- **I18n Translation Sync**: Footers texts will load keys from `translations.js` to dynamically support LTR (English) and RTL (Arabic) contexts.
