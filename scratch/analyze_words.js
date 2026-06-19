const fs = require("fs");
const path = require("path");

const rawPath = path.join(__dirname, "../extracted_mcqs.json");
const data = JSON.parse(fs.readFileSync(rawPath, "utf8"));

const mWords = new Set();
const bWords = new Set();

function extractWords(text) {
  if (!text) return;
  const words = text.split(/[\s,?.!()|:;/"'—\-–━\n]+/);
  for (const w of words) {
    if (w.includes("ম")) mWords.add(w);
    if (w.includes("ব")) bWords.add(w);
  }
}

data.forEach(m => {
  extractWords(m.asQuestion);
  m.asOptions.forEach(opt => extractWords(opt));
  extractWords(m.asExplanation);
});

console.log("WORDS WITH 'ম' (" + mWords.size + "):");
console.log(Array.from(mWords).slice(0, 100).join(" | "));

console.log("\nWORDS WITH 'ব' (" + bWords.size + "):");
console.log(Array.from(bWords).slice(0, 100).join(" | "));
