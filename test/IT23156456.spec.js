const { test, expect } = require('@playwright/test');

const testData = [
  { id: "Pos_Fun_0001", name: "Simple present", input: "mama paasal yanavaa", expected: "මම පාසල් යනවා" },
  { id: "Pos_Fun_0002", name: "Greeting question", input: "oyaata kohomadha?", expected: "ඔයාට කොහොමද?" },
  { id: "Pos_Fun_0003", name: "Imperative", input: "vahaama eeka karanna", expected: "වහාම ඒක කරන්න" },
  { id: "Pos_Fun_0004", name: "Negative form", input: "mata eka hari naee", expected: "මට එක හරි නෑ" },
  { id: "Pos_Fun_0005", name: "Past tense", input: "mama pereedhaa paasal giyaa", expected: "මම පෙරේදා පාසල් ගියා" },
  { id: "Pos_Fun_0006", name: "Future tense", input: "api heta paasal yanavaa", expected: "අපි හෙට පාසල් යනවා" },
  { id: "Pos_Fun_0007", name: "Compound sentence", input: "api vaahanayak ganna yanavaa saha passe kaeema kamu", expected: "අපි වාහනයක් ගන්න යනවා සහ පස්සෙ කෑම කමු" },
  { id: "Pos_Fun_0008", name: "Complex sentence", input: "oyaa yanavaanam mama enavaa", expected: "ඔයා යනවානම් මම එනවා" },
  { id: "Pos_Fun_0009", name: "Polite request", input: "karuNaakaralaa mata salli tikak ganna puLuvandha", expected: "කරුණාකරලා මට salli ටිකක් ගන්න පුළුවන්ද" },
  { id: "Pos_Fun_0010", name: "Informal slang", input: "hari machQQ", expected: "හරි මචං" },
  { id: "Pos_Fun_0011", name: "Mixed English term", input: "mama YouTube viidiyoo ekak baeluvaa", expected: "මම YouTube වීඩියෝ එකක් බැලුවා" },
  { id: "Pos_Fun_0012", name: "Place name", input: "api Colombo yamu", expected: "අපි Colombo යමු" },
  { id: "Pos_Fun_0013", name: "Numbers currency", input: "eeke mila Rs. 1500", expected: "ඒකෙ මිල Rs. 1500" },
  { id: "Pos_Fun_0014", name: "Time format", input: "7.30 AM vedhdhi mama enavaa", expected: "7.30 AM වෙද්දි මම එනවා" },
  { id: "Pos_Fun_0015", name: "Date format", input: "25/12/2025 venidhata mata enna vennee nae", expected: "25/12/2025 වෙනිදට මට එන්න වෙන්නේ නැ" },
  { id: "Pos_Fun_0016", name: "Multiple spaces", input: "mama   rassaavata   yanavaa", expected: "මම   රස්සාවට   යනවා" },
  { id: "Pos_Fun_0017", name: "Line breaks", input: "api vena dhavasaka\nkaeema kamu", expected: "අපි වෙන දවසක\nකෑම කමු" },
  { id: "Pos_Fun_0018", name: "Repeated words", input: "yamu yamu", expected: "යමු යමු" },
  { id: "Pos_Fun_0019", name: "Pronoun plural", input: "api okkoma yamu", expected: "අපි ඔක්කොම යමු" },
  { id: "Pos_Fun_0020", name: "Negative need", input: "mata ee kellava epaa", expected: "මට ඒ කෙල්ලව එපා" },
  { id: "Pos_Fun_0021", name: "Request simple", input: "ara vaedee karanna", expected: "අර වැඩේ කරන්න" },
  { id: "Pos_Fun_0022", name: "English abbreviations", input: "ID eka thiyenvadha?", expected: "ID එක තියෙන්වද?" },
  { id: "Pos_Fun_0023", name: "Office sentence", input: "manager ta email ekak yavanna", expected: "manager ට email එකක් යවන්න" },
  { id: "Pos_Fun_0024", name: "Long paragraph", input: "varShaava heethuven mahanuvara dhisthrikkayee gammaana kihipayakata aethivuu gQQvathura nisaa praDhaana maarga kotas 180kata aasanna pramaaNayak haani vii aethi athara eevaayee samastha dhiga kiloomiitar 120kata aasanna bava vaarthaa vee.", expected: "වර්ෂාව හේතුවෙන් මහනුවර දිස්ත්‍රික්කයේ ගම්මාන කිහිපයකට ඇතිවූ ගංවතුර නිසා ප්‍රධාන මාර්ග කොටස් 180කට ආසන්න ප්‍රමාණයක් හානි වී ඇති අතර ඒවායේ සමස්ත දිග කිලෝමීටර් 120කට ආසන්න බව වාර්තා වේ." },
  { id: "Neg_Fun_0001", name: "Joined words", input: "mamaratayanavaa", expected: "මම රට යනවා" },
  { id: "Neg_Fun_0002", name: "Missing vowels", input: "mama rt ynw", expected: "මම රට යනවා" },
  { id: "Neg_Fun_0003", name: "Excess symbols", input: "@@@###", expected: "@@@###" },
  { id: "Neg_Fun_0004", name: "Random chars", input: "asdfgh", expected: "asdfgh" },
  { id: "Neg_Fun_0005", name: "Mixed noise", input: "mama $$$ gedhara", expected: "මම ගෙදර" },
  { id: "Neg_Fun_0006", name: "Wrong spacing", input: "ma ma ge dha ra", expected: "මම ගෙදර" },
  { id: "Neg_Fun_0007", name: "Half English", input: "go paasal", expected: "යන්න පාසල්" },
  { id: "Neg_Fun_0008", name: "Emoji input", input: "😊😊", expected: "😊😊" },
  { id: "Neg_Fun_0009", name: "Rare abbreviation altered", input: "ETA tikak late veyi", expected: "පැමිණීමට ගතවන කාලය ටිකක් ප්‍රමාද වෙයි" },
  { id: "Neg_Fun_0010", name: "Heavy punctuation mix", input: "\"balamu\" (mokadda?)! tika tika", expected: "balamu mokadhdha? tika tika" },
  { id: "Pos_UI_0001", name: "Real-time output", input: "man gedhara yanavaa", expected: "මන් කෙදර යනවා" }
];

test.describe('Singlish to Sinhala Transliteration - IT23156456', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
  });

  for (const tc of testData) {
    test(`${tc.id}: ${tc.name}`, async ({ page }) => {
      // THE FIX: Target the textarea by class and the output by its unique class
      const inputArea = page.locator('textarea.form-control').first();
      const outputArea = page.locator('.sinhala-box');

      // 1. Clear and Fill
      await inputArea.click();
      await inputArea.clear();
      await inputArea.fill(tc.input);

      // 2. WAIT for the output area to NOT be empty anymore
      // This is the "Capture" logic the previous code was missing
      await page.waitForTimeout(2000); 

      // 3. Extract the text
      const actualOutput = await outputArea.textContent();

      console.log(`Checking ${tc.id}: Expected [${tc.expected}] | Actual [${actualOutput ? actualOutput.trim() : 'EMPTY'}]`);

      // 4. Assertion
      expect(actualOutput.trim()).toBe(tc.expected.trim());
    });
  }
});