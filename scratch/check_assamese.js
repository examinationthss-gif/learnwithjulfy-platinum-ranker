const fs = require('fs');
const path = require('path');

const rawMcqsPath = path.join(__dirname, '../extracted_mcqs.json');
const rawMcqs = JSON.parse(fs.readFileSync(rawMcqsPath, 'utf8'));

console.log("MCQ ID | English Q? | Assamese Q? | Options Match? | Status");
console.log("-------------------------------------------------------------");

let failedCount = 0;
const auditTable = [];

rawMcqs.forEach((m, idx) => {
  const hasEnQ = !!(m.enQuestion && m.enQuestion.trim() !== "");
  const hasAsQ = !!(m.asQuestion && m.asQuestion.trim() !== "");
  const enOptsCount = m.enOptions ? m.enOptions.length : 0;
  const asOptsCount = m.asOptions ? m.asOptions.length : 0;
  const optsMatch = enOptsCount === 4 && asOptsCount === 4;

  let status = "PASS";
  if (!hasEnQ || !hasAsQ || !optsMatch) {
    status = "FAIL";
    failedCount++;
  }

  auditTable.push({
    id: m.mcqId,
    en: hasEnQ ? "YES" : "NO",
    as: hasAsQ ? "YES" : "NO",
    opts: optsMatch ? "YES" : "NO",
    status
  });

  if (idx < 5 || status === "FAIL") {
    console.log(`${m.mcqId} | ${hasEnQ ? "YES" : "NO"} | ${hasAsQ ? "YES" : "NO"} | ${optsMatch ? "YES" : "NO"} | ${status}`);
  }
});

console.log(`\nAudit finished. Total processed: ${rawMcqs.length}. Failed: ${failedCount}`);
if (failedCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
