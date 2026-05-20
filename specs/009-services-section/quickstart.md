# Quickstart: Adding or Editing Services

The Services section is completely frontend-driven.

## Editing a Service

1. Open `index.html`.
2. Locate the JavaScript section at the bottom where `servicesData` is defined.
3. Find the object with the corresponding `id`.
4. Update the `title`, `shortDesc`, `icon`, `type`, or `deliverables` array.
5. Save the file. The DOM and Modal will automatically use the new data when clicked.

## Adding a New Service

1. Open `index.html`.
2. Add a new `div.service-card` to the `.services-grid` section matching the HTML structure in `contracts/ui-components.md`.
3. Add a new object to the `servicesData` array in the JavaScript section with the same `data-service-id`.
4. Ensure the `deliverables` array has at least 2-3 points to populate the modal effectively.
