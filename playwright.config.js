const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // 1. Path to your test folder
  testDir: './test', 

  // 2. Maximum time one test can run (increased to 60s for slow transliteration)
  timeout: 60000,

  // 3. Generate the HTML report for your assignment evidence
  reporter: 'html',

  /* Shared settings for all the projects below. */
  use: {
    // The target website
    baseURL: 'https://www.swifttranslator.com/',

    // Evidence collection
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    trace: 'on-first-retry',

    // Ensures the browser window is large enough to see the output box
    viewport: { width: 1280, height: 720 },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});