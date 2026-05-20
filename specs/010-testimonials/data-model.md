# Data Model: Testimonials Section

This document defines the structure of the data used for the Testimonials section.

## Testimonials Data Array

The data will be stored as an array of objects in JavaScript within `index.html`.

### `Testimonial` Object

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `id` | `string` | Unique identifier (e.g., "t1", "t2") | Yes |
| `quote` | `string` | The actual review/testimonial text | Yes |
| `name` | `string` | The reviewer's full name | Yes |
| `title` | `string` | The reviewer's professional title and company | Yes |
| `avatar` | `string` | Path or URL to the reviewer's photo/avatar | Yes |

### Example Data

```javascript
const testimonialsData = [
  {
    id: "t1",
    quote: "Amr transformed our messy CRM data into a clear, actionable dashboard. It completely changed how we approach our marketing campaigns.",
    name: "Ahmed Hassan",
    title: "Marketing Director @ GrowthTech",
    avatar: "images/avatar-1.png"
  },
  {
    id: "t2",
    quote: "His ability to bridge the gap between technical data analysis and human psychology is rare. Highly recommended for any data-driven marketing team.",
    name: "Sarah Jenkins",
    title: "CEO @ DataFlow Solutions",
    avatar: "images/avatar-2.png"
  }
];
```
