# Data Model: projects.json

## Schema Update

The existing `projects.json` must be expanded to serve as the single source of truth for both the Homepage cards and the Dedicated Project Pages. This allows the user to simply add a new JSON object without writing Astro/React code.

```typescript
interface Project {
  id: string;            // URL slug for dynamic routing (e.g., "sales-funnel-dashboard")
  category: string;      // Shown on the card (e.g., "Data Analytics")
  title: string;         // Name of the project
  icon: string;          // FontAwesome icon class for the fallback/overlay
  imagePath: string;     // Local path to the optimized project cover image
  tech: string[];        // Array of technologies used (e.g., ["Power BI", "SQL"])
  
  // URL Links
  githubUrl?: string;    // Optional link to repository
  powerBiUrl?: string;   // Optional link to live dashboard

  // Dedicated Page Content (NEW)
  problem: string;           // Describes the initial state/challenge
  salesDescription: string;  // Describes the solution and value proposition
  salesFunnelMetrics: string;// Describes the estimated/known sales funnel impact
  ctaLink: string;           // Link for the final Call To Action (e.g., "Buy this service")
}
```

## Validation Rules
- `id` must be unique and URL-safe.
- `powerBiUrl` must be an embeddable link (e.g., `https://app.powerbi.com/view?...`).
- `imagePath` should point to a local image asset in `src/assets/projects/` to allow Astro's `sharp` integration to process it efficiently during build.
