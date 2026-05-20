# Quickstart Guide: Mobile Footer & Contact Layout

## Running Locally

1. Install dependencies (if not done already):
   ```bash
   npm install
   ```
2. Start the local Astro development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:4321/` in your browser.

## Testing Layout Changes

To test the mobile footer and contact section responsive behavior:
1. Open the browser's developer tools (F12).
2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M).
3. Select a mobile device template (e.g., iPhone 14 Pro, Pixel 7).
4. Verify that:
   - The sticky footer buttons display perfectly at the bottom.
   - The main contact form is collapsed, displaying a toggle action button ("Write a Message").
   - Clicking the toggle button smoothly expands the form.
   - Changing the language between Arabic and English updates all texts correctly.
5. Run the build script to ensure compilation passes:
   ```bash
   npm run build
   ```
