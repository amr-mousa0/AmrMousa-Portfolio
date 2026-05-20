# Quickstart: Advanced Sales Architecture

## 1. Run the Development Server
Since this is an Astro project, start the local development server:
```bash
npm run dev
```
Navigate to `http://localhost:4321` (or your configured port).

## 2. Testing the Mobile Experience (Zero-JS Carousels)
1. Open Chrome DevTools (`F12`).
2. Toggle the Device Toolbar (`Ctrl+Shift+M` or `Cmd+Shift+M`) to view the site as a mobile device (e.g., iPhone 12 Pro).
3. Swipe horizontally on the **Services** and **Projects** sections.
4. Verify that the cards snap into place smoothly via CSS `scroll-snap-type`.
5. Open the Command Menu (`Ctrl+Shift+P`), type "Disable JavaScript", and reload. Verify that the carousel and layout still function flawlessly.

## 3. Testing Schema.org (JSON-LD)
1. Copy the URL of your local server or production deployment.
2. Go to the [Google Rich Results Test](https://search.google.com/test/rich-results).
3. Paste the URL (or code snippet if local) to verify that `ProfessionalService` and the `OfferCatalog` are parsed without errors or warnings.
