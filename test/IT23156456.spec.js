const { test, expect } = require('@playwright/test');

/**
 * Test data loaded from IT23156456.xlsx
 * Positive  : Expect Sinhala Unicode output
 * Negative  : Expect NO Sinhala Unicode output
 */

const testData = [
  { id: "Pos_Fun_0001", name: "Simple present", input: "mama paasal yanavaa" },
  { id: "Pos_Fun_0002", name: "Greeting question", input: "oyaata kohomadha?" },
  { id: "Pos_Fun_0003", name: "Imperative", input: "vahaama eeka karanna" },
  { id: "Pos_Fun_0004", name: "Negative form", input: "mata eka hari naee" },
  { id: "Pos_Fun_0005", name: "Past tense", input: "mama pereedhaa paasal giyaa" },
  { id: "Pos_Fun_0006", name: "Future tense", input: "api heta paasal yanavaa" },
  { id: "Pos_Fun_0007", name: "Compound sentence", input: "api vaahanayak ganna yanavaa saha passe kaeema kamu" },
  { id: "Pos_Fun_0008", name: "Complex sentence", input: "oyaa yanavaanam mama enavaa" },
  { id: "Pos_Fun_0009", name: "Polite request", input: "karuNaakaralaa mata salli tikak ganna puLuvandha" },
  { id: "Pos_Fun_0010", name: "Informal slang", input: "hari machQQ" },
  { id: "Pos_Fun_0011", name: "Mixed English term", input: "mama YouTube viidiyoo ekak baeluvaa" },
  { id: "Pos_Fun_0012", name: "Place name", input: "api Colombo yamu" },
  { id: "Pos_Fun_0013", name: "Numbers currency", input: "eeke mila Rs. 1500" },
  { id: "Pos_Fun_0014", name: "Time format", input: "7.30 AM vedhdhi mama enavaa" },
  { id: "Pos_Fun_0015", name: "Date format", input: "25/12/2025 venidhata mata enna vennee nae" },
  { id: "Pos_Fun_0016", name: "Multiple spaces", input: "mama   rassaavata   yanavaa" },
  { id: "Pos_Fun_0017", name: "Line breaks", input: "api vena dhavasaka\nkaeema kamu" },
  { id: "Pos_Fun_0018", name: "Repeated words", input: "yamu yamu" },
  { id: "Pos_Fun_0019", name: "Pronoun plural", input: "api okkoma yamu" },
  { id: "Pos_Fun_0020", name: "Negative need", input: "mata ee kellava epaa" },
  { id: "Pos_Fun_0021", name: "Request simple", input: "ara vaedee karanna" },
  { id: "Pos_Fun_0022", name: "English abbreviations", input: "ID eka thiyenvadha?" },
  { id: "Pos_Fun_0023", name: "Office sentence", input: "manager ta email ekak yavanna" },
  { id: "Pos_Fun_0024", name: "Long paragraph", input: "varShaava heethuven mahanuvara dhisthrikkayee gammaana kihipayakata aethivuu gQQvathura nisaa praDhaana maarga kotas 180kata aasanna pramaaNayak haani vii aethi athara eevaayee samastha dhiga kiloomiitar 120kata aasanna bava vaarthaa vee." },

  { id: "Neg_Fun_0001", name: "Joined words", input: "mamaratayanavaa", negative: true },
  { id: "Neg_Fun_0002", name: "Missing vowels", input: "mama rt ynw", negative: true },
  { id: "Neg_Fun_0003", name: "Excess symbols", input: "@@@###", negative: true },
  { id: "Neg_Fun_0004", name: "Random chars", input: "asdfgh", negative: true },
  { id: "Neg_Fun_0005", name: "Mixed noise", input: "mama $$$ gedhara", negative: true },
  { id: "Neg_Fun_0006", name: "Wrong spacing", input: "ma ma ge dha ra", negative: true },
  { id: "Neg_Fun_0007", name: "Half English", input: "go paasal", negative: true },
  { id: "Neg_Fun_0008", name: "Emoji input", input: "😊😊", negative: true },
  { id: "Neg_Fun_0009", name: "Rare abbreviation altered", input: "ETA tikak late veyi", negative: true },
  { id: "Neg_Fun_0010", name: "Heavy punctuation mix", input: "\"balamu\" (mokadda?)! tika tika", negative: true },

  { id: "Pos_UI_0001", name: "Real-time output", input: "man gedhara yanavaa" }
];

test.describe('Singlish → Sinhala Transliteration (Excel-driven)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
  });

  for (const tc of testData) {
    test(`${tc.id} - ${tc.name}`, async ({ page }) => {

      const inputArea = page.locator('textarea').first();

      await inputArea.fill('');
      await inputArea.type(tc.input, { delay: 120 });

      // Wait until ANY Sinhala Unicode appears (or not)
      await page.waitForTimeout(2500);

      const pageText = await page.evaluate(() => document.body.innerText);

      if (tc.negative) {
        // ❌ Negative → should NOT produce Sinhala text
        expect(pageText).not.toMatch(/[\u0D80-\u0DFF]/);
      } else {
        // ✅ Positive / UI → must produce Sinhala text
        expect(pageText).toMatch(/[\u0D80-\u0DFF]/);
      }
    });
  }
});
