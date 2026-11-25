import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  fullyParallel: false,
  reporter: 'html',
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    launchOptions: {
      slowMo: 1000,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});