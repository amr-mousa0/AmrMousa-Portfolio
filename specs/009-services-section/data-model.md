# Data Model: Services Section

Since this is a static, frontend-only project, the "Data Model" defines the structure of the JavaScript object that will hold the service details used to populate the modal.

## `Service` Entity

Represents a single service offered by Amr Mousa.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique identifier (e.g., `dashboard-bi`) |
| `title` | String | Display name of the service |
| `icon` | String | FontAwesome class string (e.g., `fa-solid fa-chart-pie`) |
| `shortDesc` | String | Brief hook for the grid card |
| `type` | String | e.g., "Monthly Package" or "One-Time Project" |
| `deliverables` | Array<String> | Bullet points to show inside the modal |

### Example Instance

```javascript
{
  id: "dashboard-bi",
  title: "Dashboard Analysis & BI",
  icon: "fa-solid fa-chart-pie",
  shortDesc: "Transform raw data into real-time interactive dashboards.",
  type: "Project / Retainer",
  deliverables: [
    "Custom Power BI / Tableau development.",
    "Real-time data integration & pipeline setup.",
    "Executive summary & KPI tracking."
  ]
}
```
