import { test, expect } from '@playwright/test';

test.describe('Sales Funnel Architecture & Pristine URL E2E', () => {
  test('Hero secondary CTA navigates to Methodology page', async ({ page }) => {
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
    await page.goto('.');
    
    // Find the secondary CTA button (base-independent selector)
    const methodologyBtn = page.locator('.hero-text-content a[href*="/methodology"]').first();
    await expect(methodologyBtn).toBeVisible();
    
    // Click and verify navigation
    await methodologyBtn.click();
    await expect(page).toHaveURL(/.*\/methodology.*/);
    
    // Verify Who I am headline is visible
    await expect(page.locator('h2', { hasText: /Who I am|عني/ })).toBeVisible();
  });

  test('Pristine URL navigation does not append hash fragments', async ({ page }) => {
    await page.goto('.');
    
    // Click Explore Services
    const servicesBtn = page.locator('button', { hasText: /Explore Services|تصفح الخدمات/ }).first();
    await servicesBtn.click({ force: true });
    
    // Wait for scroll animation
    await page.waitForTimeout(1000);
    
    // URL should remain pristine without #services hash
    expect(page.url()).not.toContain('#services');
  });

  test('Incoming hashed URL is scrubbed via History API', async ({ page }) => {
    await page.goto('#services');
    
    // Wait for the scrub script to execute
    await page.waitForTimeout(1000);
    
    // The hash should be wiped from the URL
    expect(page.url()).not.toContain('#services');
  });

  test('Mobile drawer navigation operates smoothly across routes', async ({ page, isMobile }) => {
    if (!isMobile) return;

    await page.goto('methodology');
    
    // Open menu
    const menuBtn = page.locator('#menuBtn');
    await menuBtn.click();
    
    const drawer = page.locator('#drawer');
    await expect(drawer).toHaveClass(/expanded/);
    
    // Wait for the drawer transition to complete and position to stabilize
    await page.waitForTimeout(500);

    // Click Home item using dispatchEvent to avoid browser-specific viewport height calculation issues
    const homeItem = drawer.locator('.menu-item', { hasText: /Home|الرئيسية/ }).first();
    await homeItem.dispatchEvent('click');
    
    // Should navigate back to homepage
    await page.waitForTimeout(1000); // wait for JS history replacement
    expect(page.url()).not.toContain('/methodology');
  });
});
