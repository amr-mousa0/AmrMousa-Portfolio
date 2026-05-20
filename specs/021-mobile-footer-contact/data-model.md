# Data Model: Mobile Footer & Contact Layout

## Entities and Schema

There are no databases or backend entities introduced in this feature. All components rely on localized static properties.

### UI State Model

#### Contact Form State (Mobile)
- **State Property**: `collapsed` (Boolean)
- **Initial Value**: `true`
- **Actions**:
  - `toggleForm()`: Toggles the visibility state of the form container.
- **Visual Classes**:
  - Collapsed: `max-h-0 opacity-0 overflow-hidden`
  - Expanded: `max-h-[800px] opacity-100`

### Translation Dictionary Schema

New dictionary keys added to `translations.js` for localization:

```json
{
  "footer_bio": "Premium Data Analytics & High-ROI Marketing Strategy.",
  "footer_rights": "All rights reserved.",
  "footer_terms": "Terms of Service",
  "footer_privacy": "Privacy Policy"
}
```
