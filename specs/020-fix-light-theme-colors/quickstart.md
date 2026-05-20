# Quickstart: Testing and Verifying Light Theme Colors

This document guides you through running the local development server and validating the light theme styling.

## 1. Local Development

To spin up the project locally:

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:4321`.

## 2. Testing Light Theme Manually

1. Open `http://localhost:4321` in your browser.
2. Click the **Theme Toggle** (🌙 / 🌞 button) in the upper right header.
3. Verify that:
   - The theme switches immediately.
   - The primary accents are teal rather than blue.
   - The secondary accents are maroon rather than dark blue.
   - Text is dark grey (`#071026`) and fully legible.
   - Hovering over cards lifts them cleanly with subtle shadows.
   - Click the hamburger menu on mobile, expand the drawer, and verify text contrast.

## 3. Automated Validation

To run Playwright E2E tests:

```bash
npx playwright test
```
