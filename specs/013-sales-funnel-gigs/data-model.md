# Data Model: Astro Sales Funnel

Data will be stored statically in JSON files within the `src/data/` directory of the Astro project. Astro allows importing JSON directly into components.

## 1. Gigs Data (`src/data/gigs.json`)

```json
[
  {
    "domain": "Data Analytics",
    "id": "data-analytics",
    "services": [
      { "id": "dashboard", "title": "Dashboard Creation", "description": "Interactive Power BI dashboards for sales and inventory tracking." },
      { "id": "pdf-excel", "title": "Data Cleaning & PDF to Excel", "description": "Convert messy PDF reports into actionable Excel datasets." }
    ]
  },
  {
    "domain": "Marketing & Media",
    "id": "marketing",
    "services": [
      { "id": "media-buying", "title": "Meta Media Buying", "description": "Data-driven ad campaigns on Meta platforms." },
      { "id": "content-strategy", "title": "Content Strategy", "description": "End-to-end content planning aligned with the customer journey." }
    ]
  },
  {
    "domain": "Tech & Web Development",
    "id": "tech-web",
    "services": [
      { "id": "crm-setup", "title": "CRM Setup & Management", "description": "Implement and optimize CRM systems for sales tracking." }
    ]
  }
]
```

## 2. Projects Data (`src/data/projects.json`)

```json
[
  {
    "id": "project-1",
    "title": "Inventory Bottleneck Resolution",
    "category": "Data Analytics",
    "thumbnail": "/images/project1-thumb.jpg",
    "caseStudy": {
      "problem": "The client had a massive influx of orders but deliveries were late due to a messy warehouse system.",
      "solution": "Developed a Power BI dashboard tracking inventory levels in real-time.",
      "roi": "Reduced delivery times by 40% and improved inventory accuracy to 99%."
    }
  }
]
```
