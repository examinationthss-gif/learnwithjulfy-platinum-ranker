const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../scripts/generate-content.js');
let content = fs.readFileSync(targetPath, 'utf8');

const targetContentStr = '      // Generate 5 MCQs per day\n      const mcqs = generateDayMCQs(enData.title, asData.title);';

const replacementContentStr = `      // Generate 5 MCQs per day
      let mcqs;
      if (unitId === "unit1") {
        const rawMcqsPath = path.join(__dirname, "../extracted_mcqs.json");
        const cleanMcqs = JSON.parse(fs.readFileSync(rawMcqsPath, "utf8"));
        const startIndex = (d - 1) * 5;
        const dayMcqs = cleanMcqs.slice(startIndex, startIndex + 5);
        mcqs = dayMcqs.map((m, idx) => ({
          id: idx + 1,
          qEn: m.enQuestion + " [ID: " + m.mcqId + "]",
          qAs: m.asQuestion + " [ID: " + m.mcqId + "]",
          optsEn: m.enOptions,
          optsAs: m.asOptions,
          correct: m.correctIndex,
          expEn: m.enExplanation + (m.hint ? "\\nHint: " + m.hint : ""),
          expAs: m.asExplanation + (m.hint ? "\\nHint: " + m.hint : "")
        }));
      } else {
        mcqs = generateDayMCQs(enData.title, asData.title);
      }`;

if (content.includes(targetContentStr)) {
  content = content.replace(targetContentStr, replacementContentStr);
  fs.writeFileSync(targetPath, content, 'utf8');
  console.log("Successfully patched scripts/generate-content.js.");
} else if (content.includes('if (unitId === "unit1")')) {
  console.log("scripts/generate-content.js is already patched.");
} else {
  console.error("Target string not found in scripts/generate-content.js.");
}
