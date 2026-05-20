import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4321/AmrMousa-Portofolio/',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { viewport: { width: 1920, height: 1080 } },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13 Pro'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 7'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4321/AmrMousa-Portofolio/',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
