import { test, expect } from '@playwright/test';

test.describe('Mobile Interactions', () => {
  test.skip(({ isMobile }) => !isMobile, 'This test is only for mobile profiles');

  test('CSS Scroll Snap carousel works via touch drag', async ({ page }) => {
    await page.goto('.');
    
    const wrapper = page.locator('.scrolling-wrapper').first();
    await wrapper.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000); // wait for scroll animation
    await expect(wrapper).toBeVisible();
    
    const boundingBox = await wrapper.boundingBox();
    if (!boundingBox) throw new Error('Carousel not found');

    const startX = boundingBox.x + boundingBox.width * 0.8;
    const endX = boundingBox.x + boundingBox.width * 0.2;
    const y = boundingBox.y + boundingBox.height / 2;

    // Simulate touch drag
    await page.mouse.move(startX, y);
    await page.mouse.down();
    await page.mouse.move(endX, y, { steps: 10 });
    await page.mouse.up();
    
    await page.waitForTimeout(500); // Wait for snap animation
    
    // Check scroll offset changed
    const scrollLeft = await wrapper.evaluate(node => node.scrollLeft);
    expect(scrollLeft).toBeGreaterThan(0);
  });
});
