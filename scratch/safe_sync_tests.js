const fs = require("fs");
const path = require("path");

const testsFilePath = path.join(__dirname, "../src/data/testsQuestions.ts");
const cleanMcqsPath = path.join(__dirname, "../extracted_mcqs.json");

const cleanMcqs = JSON.parse(fs.readFileSync(cleanMcqsPath, "utf8"));
const paper1Questions = cleanMcqs.slice(0, 5).map((m, idx) => ({
  id: idx + 1,
  qEn: m.enQuestion,
  qAs: m.asQuestion,
  optsEn: m.enOptions,
  optsAs: m.asOptions,
  correct: m.correctIndex,
  expEn: m.enExplanation,
  expAs: m.asExplanation
}));

let content = fs.readFileSync(testsFilePath, "utf8").replace(/\r\n/g, "\n");

// We search for:
//   1: [
//     {
//         "id": 1,
// ...
//     }
// ],
//
//   // Test Paper 2: Unit III & IV Mid-Term Review

const targetMarker = "  // Test Paper 1: Unit I & II Diagnostic Test Paper\n  1: [";
const targetEndMarker = "  // Test Paper 2: Unit III & IV Mid-Term Review";

const startIndex = content.indexOf(targetMarker);
const endIndex = content.indexOf(targetEndMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const before = content.substring(0, startIndex + targetMarker.length);
  const after = content.substring(endIndex);
  
  // Format the new questions with proper indentation
  const formattedQuestions = JSON.stringify(paper1Questions, null, 4)
    .split("\n")
    .map(line => "    " + line)
    .join("\n")
    .trim(); // strip outer brackets formatting spaces
    
  // Strip outer [ and ] from formattedQuestions
  const innerQuestions = formattedQuestions.substring(1, formattedQuestions.length - 1).trim();

  const newContent = before + "\n        " + innerQuestions + "\n  ],\n\n\n\n  " + after;
  fs.writeFileSync(testsFilePath, newContent, "utf8");
  console.log("SUCCESSFULLY SYNCED TESTS QUESTIONS!");
} else {
  console.error("COULD NOT FIND MARKERS IN TESTS QUESTIONS");
}
