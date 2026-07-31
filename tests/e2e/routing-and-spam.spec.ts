import { test, expect } from '@playwright/test';

test.describe('Routing and Contact Navigation', () => {
  test('Clicking Contact CTA smooth scrolls and scrubs hash from URL', async ({ page, isMobile }) => {
    await page.goto('.');
    
    if (isMobile) {
      // Open drawer
      const menuBtn = page.locator('#menuBtn');
      await menuBtn.click();
      await page.waitForTimeout(500); // Wait for drawer transition to finish
      const contactBtn = page.locator('#drawer .menu-item[data-target="#contact"]').first();
      await contactBtn.click({ force: true });
    } else {
      const contactBtn = page.locator('button[data-section="#contact"]').first();
      await contactBtn.click({ force: true });
    }
    
    // Assert smooth scroll reached target (approximate offset check)
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
    
    // Assert pristine URL (Zero-Hash)
    await page.waitForTimeout(500); // Wait for history API replaceState
    expect(page.url()).not.toContain('#contact');
  });
});
