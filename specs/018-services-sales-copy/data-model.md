# Data Model: Services Sales Copy & Mobile UX Optimization

**Date**: May 19, 2026  
**Feature**: `018-services-sales-copy`

## Entity: ServiceHookVariant

Represents a single copywriting hook variant for a specific service card.

### Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `variant` | `string` (enum: `"A"`, `"B"`, `"C"`) | Hook strategy identifier | `"A"` |
| `label` | `string` | Internal label for the variant strategy | `"ROI Hook"` |
| `copy` | `string` | The English (EN) hook text displayed on the card | `"Making decisions blindfolded?..."` |

### Relationships

- **Parent**: Each `ServiceHookVariant` belongs to a **Service** entity (identified by `service.id`).
- **Cardinality**: Each Service has exactly **3** hook variants (A, B, C).
- **Localization**: Each variant's `copy` text has a corresponding Arabic translation in `translations.js` keyed as `service_{serviceId}_hook_{variant}`.

## Updated Service Entity Schema

```json
{
  "id": "data-analytics",
  "title": "Data Analytics & BI Dashboards",
  "copy": "Stop guessing...",          // DEFAULT (Variant A copy, used as SSG fallback)
  "hookVariants": [
    { "variant": "A", "label": "ROI Hook",       "copy": "Making decisions blindfolded?..." },
    { "variant": "B", "label": "Pain Hook",      "copy": "Drowning in spreadsheets?..." },
    { "variant": "C", "label": "Executive Blend", "copy": "Your competitors see their numbers..." }
  ],
  "gigs": [...],
  "tags": [...],
  "cta": "...",
  "icon": "..."
}
```

## i18n Key Pattern

| Key Pattern | Description | Example |
|-------------|-------------|---------|
| `service_{id}_hook_A` | Arabic translation for Variant A | `service_data-analytics_hook_A` |
| `service_{id}_hook_B` | Arabic translation for Variant B | `service_data-analytics_hook_B` |
| `service_{id}_hook_C` | Arabic translation for Variant C | `service_data-analytics_hook_C` |

## State Transitions

| State | Trigger | Next State |
|-------|---------|------------|
| Page Load | Client JS initializes | Random variant (A/B/C) selected |
| Variant Selected | `sessionStorage` checked | Consistent variant for session |
| Session Ends | Browser closed | New random variant on next visit |

## Validation Rules

- Every service MUST have exactly 3 `hookVariants` entries.
- Each variant `copy` MUST be ≤ 160 characters for optimal card readability.
- Each variant MUST have a corresponding Arabic translation key in `translations.js`.
- The `copy` field (top-level) MUST always contain the Variant A text as SSG/SSR fallback.
