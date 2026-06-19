const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const contentDir = path.join(projectRoot, 'content');
const srcDir = path.join(projectRoot, 'src');

console.log("=== COMPREHENSIVE PLATFORM-WIDE AUDIT ===");

// --- PHASE 1: CONTENT AUDIT ---
console.log("\n--- PHASE 1: CONTENT AUDIT ---");
const contentAudit = { unit1: 0, unit2: 0, unit3: 0, blankDays: [] };
for (let u = 1; u <= 3; u++) {
  const unitDir = path.join(contentDir, `unit${u}`);
  if (fs.existsSync(unitDir)) {
    for (let d = 1; d <= 20; d++) {
      const file = path.join(unitDir, `day${d}.json`);
      if (fs.existsSync(file)) {
        contentAudit[`unit${u}`]++;
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        if (!data.english || !data.english.title || !data.english.content || data.english.content.trim() === "" ||
            !data.assamese || !data.assamese.title || !data.assamese.content || data.assamese.content.trim() === "") {
          contentAudit.blankDays.push(`unit${u}/day${d}`);
        }
      } else {
        contentAudit.blankDays.push(`Missing: unit${u}/day${d}`);
      }
    }
  } else {
    console.log(`Warning: Unit ${u} directory does not exist.`);
  }
}
console.log(`Unit 1 Days loaded: ${contentAudit.unit1}/20`);
console.log(`Unit 2 Days loaded: ${contentAudit.unit2}/20`);
console.log(`Unit 3 Days loaded: ${contentAudit.unit3}/20`);
console.log(`Blank or missing days: ${contentAudit.blankDays.length} (${contentAudit.blankDays.join(', ') || 'None'})`);

// --- PHASE 2: MCQ AUDIT ---
console.log("\n--- PHASE 2: MCQ AUDIT ---");
const rawMcqsPath = path.join(projectRoot, 'extracted_mcqs.json');
const rawMcqs = JSON.parse(fs.readFileSync(rawMcqsPath, 'utf8'));
console.log(`Extracted MCQ count: ${rawMcqs.length}`);
const mcqIds = rawMcqs.map(m => m.mcqId);
const duplicateIds = mcqIds.filter((id, i) => mcqIds.indexOf(id) !== i);
console.log(`Duplicates: ${duplicateIds.length} (${duplicateIds.join(', ') || 'None'})`);

let badMapping = 0;
rawMcqs.forEach(m => {
  if (m.correctIndex === undefined || m.correctIndex < 0 || m.correctIndex > 3) badMapping++;
});
console.log(`Incorrect options/answers mapping: ${badMapping}`);

// --- PHASE 5: XP SYSTEM AUDIT ---
console.log("\n--- PHASE 5: XP SYSTEM AUDIT ---");
const xpEnginePath = path.join(srcDir, 'lib/xpEngine.ts');
if (fs.existsSync(xpEnginePath)) {
  const engineContent = fs.readFileSync(xpEnginePath, 'utf8');
  console.log(`XP Rules Definition:`);
  console.log(engineContent.substring(engineContent.indexOf("export const XP_RULES"), engineContent.indexOf("} as const;") + 11));
} else {
  console.log("XP Engine not found!");
}

// --- PHASE 12: SECURITY & ARCHITECTURE ---
console.log("\n--- PHASE 12: SECURITY & ARCHITECTURE ---");
// Check if supabase remains
let hasSupabaseImport = false;
let authRefMatches = [];
function walkDir(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules' && file !== '.next') {
        walkDir(fullPath);
      }
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('@supabase') || content.includes('supabaseClient')) {
          hasSupabaseImport = true;
          authRefMatches.push(`Supabase in ${path.relative(projectRoot, fullPath)}`);
        }
        if (content.includes('next-auth') || content.includes('signIn(')) {
          authRefMatches.push(`NextAuth in ${path.relative(projectRoot, fullPath)}`);
        }
      }
    }
  });
}
walkDir(srcDir);
console.log(`Supabase Imports remaining: ${hasSupabaseImport}`);
console.log(`OAuth / Auth dependencies references: ${authRefMatches.length}`);
if (authRefMatches.length > 0) {
  console.log(authRefMatches.join('\n'));
} else {
  console.log("No Supabase or broken Auth references found.");
}
