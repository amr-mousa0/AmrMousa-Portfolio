# Data Model & Configuration

Since this feature primarily involves UI architecture, state management, and CI/CD pipelines, there are no traditional database entities. However, the following configurations act as the "data models" for the automated processes.

## Playwright Test Configuration Model (`playwright.config.ts`)

Defines the environment and devices for the E2E tests:
- **Projects**:
  - Desktop Chrome / WebKit
  - Mobile Safari (iPhone 13 Pro, iPhone SE)
  - Mobile Chrome (Galaxy S22, Pixel 7)
  - Tablet (iPad Pro)

## BreadcrumbList Schema (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://amrmousa.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Methodology",
      "item": "https://amrmousa.com/about"
    }
  ]
}
```
