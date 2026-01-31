
# Playwright Automation Project (IT23156456 Athulathmudali A.U.N)

University assignment Playwright automation for **Swift Translator** (`https://www.swifttranslator.com/`).

### Project structure

```
playwright/
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── tests/
    ├── IT23156456-main.spec.ts   # Main automated test suite (35 cases)
    └── IT23156456.xlsx           # Original test case sheet (source)
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

# Run only the assignment test suite
npx playwright test tests/IT23156456-main.spec.ts

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

- The assertions in `tests/IT23184480-main.spec.ts` use **flexible matching** (Sinhala-word based) because the site can output small spelling/format variations.
- If you need to update test cases, edit the `testCases` array inside `tests/IT23184480-main.spec.ts` and keep `tests/IT23184480.xlsx` as the reference sheet.
