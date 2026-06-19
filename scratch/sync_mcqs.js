const fs = require("fs");
const path = require("path");

const mcqFilePath = path.join(__dirname, "../src/app/mcq/page.tsx");
const testsFilePath = path.join(__dirname, "../src/data/testsQuestions.ts");
const cleanMcqsPath = path.join(__dirname, "../extracted_mcqs.json");

const cleanMcqs = JSON.parse(fs.readFileSync(cleanMcqsPath, "utf8"));

// 1. Update src/app/mcq/page.tsx
let mcqPageContent = fs.readFileSync(mcqFilePath, "utf8");

// Generate the new mcqData array content
const newMcqDataArray = cleanMcqs.map(m => {
  const dayNum = parseInt(m.day.replace("Day ", ""), 10) || 1;
  return {
    id: m.id,
    unitId: "unit-1",
    enUnitNumber: "Unit I",
    asUnitNumber: "গোট ১",
    dayNumber: dayNum,
    enQuestion: m.enQuestion,
    asQuestion: m.asQuestion,
    enOptions: m.enOptions,
    asOptions: m.asOptions,
    correctIndex: m.correctIndex,
    enExplanation: m.enExplanation,
    asExplanation: m.asExplanation
  };
});

const mcqDataString = "const mcqData: MCQ[] = " + JSON.stringify(newMcqDataArray, null, 2) + ";";

// Replace the block from "const mcqData: MCQ[] = [" to "];"
const startMarker = "const mcqData: MCQ[] = [";
const endMarker = "];\n\nexport default function MCQPage()";

// Normalize CRLF to LF for reliable matching
mcqPageContent = mcqPageContent.replace(/\r\n/g, "\n");

const startIndex = mcqPageContent.indexOf(startMarker);
const endIndex = mcqPageContent.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const before = mcqPageContent.substring(0, startIndex);
  const after = mcqPageContent.substring(endIndex + 2); // keep "export default function MCQPage()"
  fs.writeFileSync(mcqFilePath, (before + mcqDataString + "\n\n" + after.trim() + "\n").replace(/\n/g, "\r\n"), "utf8");
  console.log("SUCCESSFULLY UPDATED src/app/mcq/page.tsx");
} else {
  console.error("COULD NOT FIND MARKERS IN src/app/mcq/page.tsx");
}

// 2. Update src/data/testsQuestions.ts (Diagnostic Test Paper 1 uses MCQ 1-5 from Unit 1)
let testsQuestionsContent = fs.readFileSync(testsFilePath, "utf8").replace(/\r\n/g, "\n");

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

const paper1String = JSON.stringify(paper1Questions, null, 4);

// Locate the block of questions under "1: ["
const paper1StartMarker = "  // Test Paper 1: Unit I & II Diagnostic Test Paper\n  1: [";
const paper1EndMarker = "],\n\n\n\n  // Test Paper 2: Unit III & IV Mid-Term Review";

const p1StartIndex = testsQuestionsContent.indexOf(paper1StartMarker);
const p1EndIndex = testsQuestionsContent.indexOf(paper1EndMarker);

if (p1StartIndex !== -1 && p1EndIndex !== -1) {
  const before = testsQuestionsContent.substring(0, p1StartIndex + paper1StartMarker.length);
  const after = testsQuestionsContent.substring(p1EndIndex);
  fs.writeFileSync(testsFilePath, before + "\n" + paper1String.split("\n").map(line => "    " + line).join("\n").trim() + "\n" + after, "utf8");
  console.log("SUCCESSFULLY UPDATED src/data/testsQuestions.ts");
} else {
  console.error("COULD NOT FIND MARKERS IN src/data/testsQuestions.ts");
}
