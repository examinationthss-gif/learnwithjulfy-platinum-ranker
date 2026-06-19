const fs = require("fs");
const path = require("path");

// Read pdf_text_dump.txt and extract raw Assamese MCQs
const pdfText = fs.readFileSync(path.join(__dirname, "../pdf_text_dump.txt"), "utf8")
  .replace(/-- \d+ of \d+ --/g, "")
  .replace(/\x0C/g, "")
  .replace(/\r\n/g, "\n");

const rawBlocks = pdfText.split(/MCQ (?=\d{3})/);
const pdfMCQs = {};

for (let i = 1; i < rawBlocks.length; i++) {
  const block = rawBlocks[i].trim();
  if (!block) continue;
  
  const mcqIdMatch = block.match(/MCQ ID:\s*(LWJ-U1-\d{3})/);
  if (!mcqIdMatch) continue;
  
  const mcqId = mcqIdMatch[1].trim();
  
  // Skip summaries or registries
  if (block.includes("Registry Status") || block.includes("REGISTRY UPDATE") || block.includes("Next MCQ ID:")) {
    if (!block.startsWith(mcqId.replace("LWJ-U1-", ""))) {
      continue;
    }
  }

  // Find English Question, Assamese Question indices
  const eqIdx = block.indexOf("English Question:");
  const aqIdx = block.indexOf("Assamese Question:");
  
  // Extract options
  const optRegex = /\n([A-D])\.\s*([^\r\n]+)/g;
  let match;
  const allOptions = [];
  while ((match = optRegex.exec(block)) !== null) {
    allOptions.push({
      letter: match[1],
      text: match[2].trim(),
      index: match.index
    });
  }
  
  const engOpts = [];
  const asOpts = [];
  allOptions.forEach(o => {
    if (engOpts.length < 4) {
      engOpts.push(o.text);
    } else if (asOpts.length < 4) {
      asOpts.push(o.text);
    }
  });

  let assameseQuestion = "";
  if (aqIdx !== -1) {
    const firstOptIndex = allOptions.length > 0 ? allOptions[0].index : block.length;
    assameseQuestion = block.substring(aqIdx + "Assamese Question:".length, firstOptIndex).trim();
  }

  const expEnIdx = block.indexOf("Explanation (English):");
  const expAsIdx = block.indexOf("Explanation (Assamese):");
  const hintIdx = block.indexOf("Hint:");
  
  let explanationAs = "";
  if (expAsIdx !== -1 && hintIdx !== -1) {
    explanationAs = block.substring(expAsIdx + "Explanation (Assamese):".length, hintIdx).trim();
  }

  pdfMCQs[mcqId] = {
    asQuestion: assameseQuestion,
    asOptions: asOpts,
    asExplanation: explanationAs
  };
}

// Read extracted_mcqs.json
const extracted = JSON.parse(fs.readFileSync(path.join(__dirname, "../extracted_mcqs.json"), "utf8"));

let totalAudited = 0;
let totalMatching = 0;
let totalCorrected = 0;
let remainingOcrIssues = 0;
const mismatches = [];

extracted.forEach(item => {
  const pdfItem = pdfMCQs[item.mcqId];
  if (!pdfItem) {
    console.log(`Warning: MCQ ${item.mcqId} not found in PDF extraction!`);
    return;
  }
  
  totalAudited++;
  
  let match = true;
  const errors = [];
  
  if (item.asQuestion !== pdfItem.asQuestion) {
    match = false;
    errors.push(`Question Mismatch:
  PDF:       "${pdfItem.asQuestion}"
  Extracted: "${item.asQuestion}"`);
  }
  
  for (let i = 0; i < 4; i++) {
    if (item.asOptions[i] !== pdfItem.asOptions[i]) {
      match = false;
      errors.push(`Option ${i} Mismatch:
  PDF:       "${pdfItem.asOptions[i]}"
  Extracted: "${item.asOptions[i]}"`);
    }
  }
  
  // Note: We also preserve OCR anomalies in spelling/Unicode just like in the PDF text.
  // Count OCR anomalies (like misaligned or isolated unicode glyphs from PDF extraction)
  // Let's identify if the Assamese question or options contain specific issues.
  const ocrPattern = /[\u0900-\u09FF]\s+[\u0900-\u09FF]/g; // Unicode gaps representing typical OCR artifacts
  if (ocrPattern.test(pdfItem.asQuestion)) {
    remainingOcrIssues++;
  }
  
  if (match) {
    totalMatching++;
  } else {
    mismatches.push({ mcqId: item.mcqId, errors });
  }
});

console.log("=== COMPARING PDF TEXT vs WEBSITE (EXTRACTED) TEXT ===");
console.log(`Total Audited: ${totalAudited}`);
console.log(`Total Matching: ${totalMatching}`);
console.log(`Mismatches Found: ${mismatches.length}`);

if (mismatches.length > 0) {
  mismatches.forEach(m => {
    console.log(`\n--- MCQ ID: ${m.mcqId} ---`);
    m.errors.forEach(e => console.log(e));
  });
} else {
  console.log("SUCCESS: 100% of website Assamese texts match the raw PDF texts!");
}

// Generate the mismatch report markdown
const report = `# MCQ Text Comparison & Integrity Audit Report

## Audit Summary
- **Total MCQs audited**: ${totalAudited}
- **Total MCQs matching original PDF**: ${totalMatching}
- **Total MCQs corrected**: ${totalCorrected}
- **Remaining OCR issues**: ${remainingOcrIssues} (These are preserved exactly from the original PDF text dump to maintain the source-of-truth integrity and avoid machine translation/redrafting)

## Mismatch Details
${mismatches.length === 0 ? "✅ **Perfect Match**: No mismatches found between the raw PDF text and the website database." : mismatches.map(m => `### ${m.mcqId}\n${m.errors.join("\n")}`).join("\n\n")}
`;

fs.writeFileSync(path.join(__dirname, "../mismatch_report.md"), report, "utf8");
console.log("Report written to mismatch_report.md");
