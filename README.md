
# Playwright Automation Project (IT23156456 Athulathmudali A.U.N)

University assignment Playwright automation for **Swift Translator** (`https://www.swifttranslator.com/`).

### Project structure

```
Playwright_Project/
├── playwright.config.js
├── package.json
├── test/
│   └── IT23156456.spec.js       # Main automated test suite (35 cases)
├── playwright-report/           # Generated HTML reports
└── test-results/                # Test result artifacts
```

### Prerequisites

- **Node.js 18+**
- Run once after cloning:

```bash
npm install
npx playwright install
```

### Run tests

```bash
# Run all tests
npm test

#or
npm run test:report

# Run only the assignment test suite
npx playwright test test/IT23156456.spec.js

# Headed mode (see the browser)
npm run test:headed

# UI mode (recommended for debugging)
npm run test:ui
```

### Reports / outputs

After a run:
- **HTML report**: `npm run test:report`
- **Artifacts** (auto-generated): `playwright-report/`, `test-results/` (these are ignored by git)

### Notes

- The assertions in `test/IT23156456.spec.js` use exact matching for Sinhala transliteration output.
- If you need to update test cases, edit the `testData` array inside `test/IT23156456.spec.js`.
