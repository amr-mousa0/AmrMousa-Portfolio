# Quickstart: Testimonials Section

This guide explains how to add or modify testimonials in the portfolio.

## Modifying Testimonials Data

1. Open `index.html` in your code editor.
2. Search for the `testimonialsData` array in the JavaScript section near the bottom of the file.
3. To add a new testimonial, add a new object to the array following this format:

```javascript
{
  id: "unique-id-here",
  quote: "The actual review text.",
  name: "Reviewer Name",
  title: "Reviewer Job Title",
  avatar: "images/avatar-file.png" // or placeholder icon
}
```

## Adding Avatars

If you have real photos of the reviewers:
1. Save the image (preferably square, 1:1 ratio, e.g., 100x100px) in the `images/` directory.
2. Update the `avatar` path in the `testimonialsData` array to point to the new image.
