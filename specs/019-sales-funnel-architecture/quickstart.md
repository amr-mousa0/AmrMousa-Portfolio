# Quickstart: Sales Funnel Architecture & Testing

## Overview
This feature introduces a dedicated `/about` page (the deep-dive funnel) connected via a secondary CTA in the Hero section. It implements a pristine URL navigation architecture (Zero-hash) and enforces a strict QA matrix via GitHub Actions (Lighthouse CI & Playwright).

## 1. Local Development
1. Run the local Astro development server:
   ```bash
   npm run dev
   ```
2. Navigate to `http://localhost:4321`.
3. Verify the new "Read the Methodology" button in the Hero section.
4. Click internal anchor links (e.g., Contact) and observe that the URL hash is removed after the smooth scroll.

## 2. Testing Playwright Locally
1. Ensure Playwright browsers are installed:
   ```bash
   npx playwright install
   ```
2. Run the Playwright UI tests:
   ```bash
   npx playwright test
   ```
3. View the test report (if failures occur):
   ```bash
   npx playwright show-report
   ```

## 3. GitHub Actions
When you push code to `master` or open a Pull Request, two workflows will run automatically:
1. **Lighthouse CI**: Verifies that performance, accessibility, SEO, and best practices scores are >= 0.98.
2. **Playwright E2E**: Verifies mobile interactions, carousel swipes, and hook integrations across multiple emulated devices.
