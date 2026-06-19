const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const contentDir = path.join(projectRoot, 'content/unit1');
const mcqsJsonPath = path.join(projectRoot, 'extracted_mcqs.json');
const mcqPagePath = path.join(projectRoot, 'src/app/mcq/page.tsx');
const testsQuestionsPath = path.join(projectRoot, 'src/data/testsQuestions.ts');

console.log("=== STARTING INTEGRITY CHECKS ===");

// 1. Load extracted_mcqs.json
const rawMcqs = JSON.parse(fs.readFileSync(mcqsJsonPath, 'utf8'));
console.log(`Total MCQs extracted from PDF: ${rawMcqs.length}`);

// Check for duplicate MCQ IDs in extracted MCQs
const mcqIds = rawMcqs.map(m => m.mcqId);
const uniqueMcqIds = new Set(mcqIds);
const duplicates = mcqIds.filter((id, index) => mcqIds.indexOf(id) !== index);
console.log(`Duplicate IDs in PDF extract: ${duplicates.length} (${duplicates.join(', ') || 'None'})`);

// Check correctness of options and indices
let corruptCount = 0;
rawMcqs.forEach(m => {
  if (!m.enQuestion || !m.asQuestion) {
    console.error(`Error: Missing question in ${m.mcqId}`);
    corruptCount++;
  }
  if (!m.enOptions || m.enOptions.length !== 4 || !m.asOptions || m.asOptions.length !== 4) {
    console.error(`Error: Invalid options count in ${m.mcqId}`);
    corruptCount++;
  }
  if (m.correctIndex < 0 || m.correctIndex > 3) {
    console.error(`Error: Correct index out of bounds in ${m.mcqId}: ${m.correctIndex}`);
    corruptCount++;
  }
});
console.log(`Corrupt questions found: ${corruptCount}`);

// 2. Validate day-wise JSON files in content/unit1/day1.json through day20.json
let dayFilesCount = 0;
let totalMcqsInDays = 0;
for (let d = 1; d <= 20; d++) {
  const dayFile = path.join(contentDir, `day${d}.json`);
  if (fs.existsSync(dayFile)) {
    dayFilesCount++;
    const dayData = JSON.parse(fs.readFileSync(dayFile, 'utf8'));
    // In day files, MCQs are stored in dayData.mcqs
    if (dayData.mcqs && Array.isArray(dayData.mcqs)) {
      totalMcqsInDays += dayData.mcqs.length;
      dayData.mcqs.forEach((mcq, idx) => {
        if (!mcq.question || !mcq.options || mcq.options.length !== 4 || mcq.correct === undefined) {
          console.error(`Error in ${dayFile} MCQ #${idx + 1}: invalid schema`);
        }
      });
    } else {
      console.error(`Error: No mcqs array in ${dayFile}`);
    }
  } else {
    console.error(`Warning: Missing day file ${dayFile}`);
  }
}
console.log(`Verified ${dayFilesCount} day files. Total MCQs distributed in day files: ${totalMcqsInDays}`);

console.log("=== INTEGRITY CHECKS COMPLETE ===");
if (duplicates.length === 0 && corruptCount === 0 && totalMcqsInDays === 100) {
  console.log("SUCCESS: All MCQ validation checks passed!");
  process.exit(0);
} else {
  console.error("FAILURE: Some validation checks failed.");
  process.exit(1);
}
