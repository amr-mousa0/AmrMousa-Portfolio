# Data Model & Contracts: Advanced Sales Architecture

## 1. Services Data Schema (Static JSON)
The services will be represented via a static array (either inline in the Astro component or in a `.json` file):

```json
[
  {
    "title": "Business Intelligence & Dashboards",
    "copy": "Stop guessing. I transform raw data into interactive dashboards (Power BI / SQL) that reveal bottlenecks and maximize ROI.",
    "tags": ["Power BI", "SQL"],
    "cta": "Inquire about Dashboards"
  }
]
```

## 2. JSON-LD Schema (ProfessionalService & OfferCatalog)
The JSON-LD schema injected into the `<head>` acts as a contract with Search Engine Bots.

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Amr Mousa - Data & Marketing Analyst",
  "description": "Transforming complex datasets into strategic, revenue-generating business decisions.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Egypt"
  },
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Data Analytics & BI Dashboards"
      }
    }
  ]
}
```
