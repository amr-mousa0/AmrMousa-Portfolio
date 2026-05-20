# Data Model: Horizontal Services Slider

This feature does not introduce new data models. It purely modifies the presentation layer of existing data.

## Existing Entities Utilized

### Domain
- `id` (string)
- `domain` (string) - Domain name
- `icon` (string) - FontAwesome class
- `description` (string)
- `services` (Array<Service>)

### Service (Gig)
- `id` (string)
- `title` (string)
- `description` (string)
- `tags` (Array<string>)
