const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const mcqsPath = path.join(projectRoot, 'extracted_mcqs.json');
const mcqPagePath = path.join(projectRoot, 'src/app/mcq/page.tsx');
const testsQuestionsPath = path.join(projectRoot, 'src/data/testsQuestions.ts');
const mcqDayClientPath = path.join(projectRoot, 'src/components/MCQDayClient.tsx');

// 1. Read extracted MCQs and clean up the empty placeholders
const originalMcqs = JSON.parse(fs.readFileSync(mcqsPath, 'utf8'));

// Filter out items with empty questions
const cleanMcqs = originalMcqs.filter(item => item.enQuestion && item.enQuestion.trim() !== "");

// Re-index to ensure perfect sequential IDs and mcqIds from 1 to 100
cleanMcqs.forEach((item, index) => {
  const seqNum = index + 1;
  const padNum = seqNum.toString().padStart(3, '0');
  item.id = seqNum;
  item.mcqId = `LWJ-U1-${padNum}`;
  const dayNum = Math.floor(index / 5) + 1;
  item.day = `Day ${dayNum}`;
});

// Save the clean 100 MCQs back to extracted_mcqs.json
fs.writeFileSync(mcqsPath, JSON.stringify(cleanMcqs, null, 2), 'utf8');
console.log(`Cleaned up MCQs. Saved ${cleanMcqs.length} clean MCQs to extracted_mcqs.json.`);

// 2. Distribute to content/unit1/day[1-20].json files (exactly 5 per day)
console.log('Writing clean MCQs to Unit 1 day-wise content files...');
for (let d = 1; d <= 20; d++) {
  const dayFile = path.join(projectRoot, 'content', 'unit1', `day${d}.json`);
  if (!fs.existsSync(dayFile)) {
    console.error('File not found:', dayFile);
    continue;
  }
  
  const dayData = JSON.parse(fs.readFileSync(dayFile, 'utf8'));
  
  // Slice 5 MCQs for this day
  const startIndex = (d - 1) * 5;
  const dayMcqs = cleanMcqs.slice(startIndex, startIndex + 5);
  
  // Map to english MCQs schema
  dayData.mcqs = dayMcqs.map((m, idx) => ({
    id: idx + 1,
    question: m.enQuestion + ` [ID: ${m.mcqId}]`,
    options: m.enOptions,
    correct: m.correctIndex,
    explanation: m.enExplanation + (m.hint ? `\nHint: ${m.hint}` : '')
  }));
  
  // Map to assamese MCQs schema
  dayData.asMcqs = dayMcqs.map((m, idx) => ({
    id: idx + 1,
    question: m.asQuestion + ` [ID: ${m.mcqId}]`,
    options: m.asOptions,
    correct: m.correctIndex,
    explanation: m.asExplanation + (m.hint ? `\nHint: ${m.hint}` : '')
  }));
  
  fs.writeFileSync(dayFile, JSON.stringify(dayData, null, 2), 'utf8');
}
console.log('Day files updated successfully.');

// 3. Format for src/app/mcq/page.tsx
const formattedMcqsForPage = cleanMcqs.map(item => {
  const dayNum = parseInt(item.day.replace("Day ", ""), 10);
  return {
    id: item.id, // 1 to 100
    unitId: "unit-1",
    enUnitNumber: "Unit I",
    asUnitNumber: "গোট ১",
    dayNumber: dayNum,
    enQuestion: item.enQuestion,
    asQuestion: item.asQuestion,
    enOptions: item.enOptions,
    asOptions: item.asOptions,
    correctIndex: item.correctIndex,
    enExplanation: item.enExplanation,
    asExplanation: item.asExplanation
  };
});

const nonUnit1Mcqs = [
  {
    id: 101,
    unitId: "unit-2",
    enUnitNumber: "Unit II",
    asUnitNumber: "গোট ২",
    dayNumber: 5,
    enQuestion: "Which of the following is characterized as a non-formal medium of education?",
    asQuestion: "তলৰ কোনটোক অনানুষ্ঠানিক শিক্ষাৰ মাধ্যম হিচাপে গণ্য কৰা হয়?",
    enOptions: [
      "Traditional Secondary School",
      "Open University",
      "Informal Family Dialogue",
      "Professional Training Institute",
    ],
    asOptions: [
      "পৰম্পৰাগত মাধ্যমিক বিদ্যালয়",
      "মুক্ত বিশ্ববিদ্যালয়",
      "পৰিয়ালৰ অনিয়মিত আলোচনা",
      "বৃত্তিমূলক প্ৰশিক্ষণ প্ৰতিষ্ঠান",
    ],
    correctIndex: 1,
    enExplanation: "Open Universities and distance education programs are key examples of non-formal education systems, offering structured learning with flexible entry/exit points.",
    asExplanation: "মুক্ত বিশ্ববিদ্যালয় আৰু দূৰ শিক্ষা আঁচনিসমূহ অনানুষ্ঠানিক শিক্ষাৰ অন্যতম উদাহৰণ, য'ত শিক্ষণ পদ্ধতি নমনীয় আৰু সহজ।"
  },
  {
    id: 102,
    unitId: "unit-2",
    enUnitNumber: "Unit II",
    asUnitNumber: "গোট ২",
    dayNumber: 8,
    enQuestion: "Correspondence courses in India were first introduced by which university?",
    asQuestion: "ভাৰতত পত্ৰযোগ পাঠ্যক্ৰম প্ৰথমে কোনখন বিশ্ববিদ্যালয়ে আৰম্ভ কৰিছিল?",
    enOptions: [
      "Delhi University",
      "Calcutta University",
      "Guwahati University",
      "Madras University",
    ],
    asOptions: [
      "দিল্লী বিশ্ববিদ্যালয়",
      "কলিকতা বিশ্ববিদ্যালয়",
      "গুৱাহাটী বিশ্ববিদ্যালয়",
      "মাদ্ৰাজ বিশ্ববিদ্যালয়",
    ],
    correctIndex: 0,
    enExplanation: "The School of Correspondence Courses and Continuing Education was established by the University of Delhi in 1962.",
    asExplanation: "দিল্লী বিশ্ববিদ্যালয়ে ১৯৬২ চনত দেশৰ ভিতৰতে প্ৰথমবাৰৰ বাবে পত্ৰযোগ শিক্ষাৰ শুভাৰম্ভ কৰে।"
  },
  {
    id: 103,
    unitId: "unit-3",
    enUnitNumber: "Unit III",
    asUnitNumber: "গোট ৩",
    dayNumber: 2,
    enQuestion: "Which values are primarily concerned with human rights, justice, and civic duties?",
    asQuestion: "কোনবোৰ মূল্যবোধ মানৱ অধিকাৰ, ন্যায় আৰু নাগৰিক কৰ্তব্যৰ সৈতে জড়িত?",
    enOptions: ["Physical Values", "Democratic & Moral Values", "Aesthetic Values", "Economic Values"],
    asOptions: ["শাৰীৰিক মূল্যবোধ", "গণতান্ত্ৰিক আৰু নৈতিক মূল্যবোধ", "নান্দনিক মূল্যবোধ", "অৰ্থনৈতিক মূল্যবোধ"],
    correctIndex: 1,
    enExplanation: "Democratic and moral values promote human rights, equal treatment, empathy, and social responsibilities in global classrooms.",
    asExplanation: "গণতান্ত্ৰিক আৰু নৈতিক মূল্যবোধে সমাজত সমতা, ভাতৃত্ববোধ আৰু নাগৰিকৰ কৰ্তব্যসমূহ সুদৃঢ় কৰে।"
  },
  {
    id: 104,
    unitId: "unit-4",
    enUnitNumber: "Unit IV",
    asUnitNumber: "গোট ৪",
    dayNumber: 10,
    enQuestion: "Who is the founder of the 'Trial and Error' theory of learning?",
    asQuestion: "শিকনৰ 'প্ৰচেষ্টা আৰু ভুল' তত্ত্বৰ প্ৰৱক্তা কোন?",
    enOptions: ["I.P. Pavlov", "B.F. Skinner", "E.L. Thorndike", "Wolfgang Kohler"],
    asOptions: ["আই.পি. পাভলভ", "বি.এফ. স্কিনাৰ", "ই.এল. থৰ্নডাইক", "উলফগেং কোহলাৰ"],
    correctIndex: 2,
    enExplanation: "Edward Lee Thorndike formulated the Trial and Error theory of learning based on his famous puzzle box experiments with cats.",
    asExplanation: "এডৱাৰ্ড লী থৰ্নডাইকে মেকুৰীৰ ওপৰত কৰা পৰীক্ষাৰ সহায়ত শিকনৰ এই বিশেষ তত্ত্বটো আৱিষ্কাৰ কৰিছিল।"
  },
  {
    id: 105,
    unitId: "unit-4",
    enUnitNumber: "Unit IV",
    asUnitNumber: "গোট ৪",
    dayNumber: 12,
    enQuestion: "In Pavlov's classical conditioning experiment, the food represents what type of stimulus?",
    asQuestion: "পাভলভৰ ধ্ৰুপদী অনুৱৰ্তন পৰীক্ষাত খাদ্যই কেনে ধৰণৰ উদ্দীপকক প্ৰতিনিধিত্ব কৰে?",
    enOptions: [
      "Conditioned Stimulus (CS)",
      "Unconditioned Stimulus (UCS)",
      "Neutral Stimulus (NS)",
      "Response Stimulus",
    ],
    asOptions: [
      "অনুবৰ্তিত উদ্দীপক (CS)",
      "অননুবৰ্তিত উদ্দীপক (UCS)",
      "নিৰপেক্ষ উদ্দীপক (NS)",
      "প্ৰতিক্ৰিয়া উদ্দীপক",
    ],
    correctIndex: 1,
    enExplanation: "Food is an Unconditioned Stimulus (UCS) because it naturally and automatically triggers salivation without prior training.",
    asExplanation: "খাদ্য হৈছে এটা প্ৰাকৃতিক বা অননুবৰ্তিত উদ্দীপক যিয়ে কোনো পূৰ্ব প্ৰশিক্ষণ নোহোৱাকৈ লালতি যুগুতায়।"
  },
  {
    id: 106,
    unitId: "unit-5",
    enUnitNumber: "Unit V",
    asUnitNumber: "গোট ৫",
    dayNumber: 4,
    enQuestion: "What is the initial stage of the memory process?",
    asQuestion: "স্মৃতি প্ৰক্ৰিয়াৰ প্ৰথম স্তৰটো কি?",
    enOptions: ["Retention", "Registration (Encoding)", "Recall", "Recognition"],
    asOptions: ["সংৰক্ষণ", "সংকেতীকৰণ বা প্ৰৱেশ", "স্মৰণ", "প্ৰত্যভিজ্ঞা"],
    correctIndex: 1,
    enExplanation: "The memory process starts with registration or encoding, where sensory inputs are received and processed by the brain.",
    asExplanation: "স্মৃতি ধাৰণৰ প্ৰক্ৰিয়া প্ৰথমে তথ্য গ্ৰহণ বা মগজুত সংকেতীকৰণ কৰাৰ পৰাই আৰম্ভ হয়।"
  },
  {
    id: 107,
    enUnitNumber: "Unit V",
    asUnitNumber: "গোট ৫",
    unitId: "unit-5",
    dayNumber: 15,
    enQuestion: "Distraction is best described as a hindrance to which psychological state?",
    asQuestion: "মনোযোগ বিচ্যুতি ঘটিলে তলৰ কোনটো মানসিক অৱস্থাত বাধাৰ সৃষ্টি হয়?",
    enOptions: ["Memory", "Motivation", "Attention", "Learning curves"],
    asOptions: ["স্মৃতিশক্তি", "প্ৰেৰণা", "মনোযোগ", "শিকনৰ গতি"],
    correctIndex: 2,
    enExplanation: "Distraction splits mental focus, acting as a direct barrier to maintaining sustained attention on a specific task.",
    asExplanation: "মনোযোগ বিচ্যুতি হৈছে মনোযোগ কেন্দ্ৰীভূত কৰাৰ পথত সৃষ্টি হোৱা এক অন্যতম অন্তৰায়।"
  },
  {
    id: 108,
    unitId: "unit-6",
    enUnitNumber: "Unit VI",
    asUnitNumber: "গোট ৬",
    dayNumber: 9,
    enQuestion: "Maladjustment in adolescent students is highly correlated with which factor?",
    asQuestion: "কিশোৰ ছাত্ৰ-ছাত্ৰীৰ অপসংগতি তলৰ কোনটো কাৰকৰ সৈতে অতিশয় জড়িত?",
    enOptions: [
      "Strict class scheduling",
      "Severe conflicts and frustration",
      "High academic scores",
      "Extracurricular participation",
    ],
    asOptions: [
      "কঠোৰ শ্ৰেণী সময়সূচী",
      "তীব্ৰ মানসিক সংঘাত আৰু হতাশা",
      "উচ্চ শৈক্ষিক নম্বৰ",
      "সহ-পাঠ্যক্ৰম কাৰ্যসূচীত অংশগ্ৰহণ",
    ],
    correctIndex: 1,
    enExplanation: "Maladjustment stems from psychological conflicts, unmet goals, and ongoing frustrations within the social environment (family or school).",
    asExplanation: "ঘৰুৱা বা বিদ্যালয়ৰ পৰিৱেশত হোৱা তীব্ৰ সংঘাত আৰু অপূৰণ আকাংক্ষাৰ পৰা ছাত্ৰ-ছাত্ৰীৰ মাজত অপসংগতিয়ে দেখা দিয়ে।"
  },
  {
    id: 109,
    unitId: "unit-7",
    enUnitNumber: "Unit VII",
    asUnitNumber: "গোট ৭",
    dayNumber: 18,
    enQuestion: "Which measure of central tendency is most vulnerable to extreme values (outliers)?",
    asQuestion: "কেন্দ্ৰীয় প্ৰৱণতাৰ কোনটো জোখে চৰম মানৰ (outliers) দ্বাৰা সৰ্বাধিক প্ৰভাৱিত হয়?",
    enOptions: ["Arithmetic Mean", "Median", "Mode", "Range"],
    asOptions: ["গাণিতিক গড়", "মধ্যমা", "প্ৰচুৰক", "প্ৰসাৰ"],
    correctIndex: 0,
    enExplanation: "The Arithmetic Mean sums all observations and divides by count, making it highly sensitive to exceptionally high or low outlier data.",
    asExplanation: "গাণিতিক গড় উলিওৱাৰ সময়ত আটাইকেইটা সংখ্যা যোগ কৰিব লগা হোৱা বাবে অতি বেছি বা কম থকা সংখ্যাই ইয়াক সহজতে প্ৰভাৱিত কৰে।"
  }
];

const allMcqs = [...formattedMcqsForPage, ...nonUnit1Mcqs];

let mcqPageContent = fs.readFileSync(mcqPagePath, 'utf8');
const mcqDataStartIndex = mcqPageContent.indexOf("const mcqData: MCQ[] = [");
const mcqDataEndIndex = mcqPageContent.indexOf("];", mcqDataStartIndex) + 2;

if (mcqDataStartIndex !== -1 && mcqDataEndIndex !== -1) {
  const newMcqDataStr = `const mcqData: MCQ[] = ${JSON.stringify(allMcqs, null, 2)};`;
  mcqPageContent = mcqPageContent.substring(0, mcqDataStartIndex) + newMcqDataStr + mcqPageContent.substring(mcqDataEndIndex);
  fs.writeFileSync(mcqPagePath, mcqPageContent, 'utf8');
  console.log("Successfully updated src/app/mcq/page.tsx with 109 clean MCQs.");
}

// 4. Update testsQuestions.ts (Unit 1 & 2 Diagnostic test questions)
const test1QuestionsRaw = [
  cleanMcqs[0],   // Mudaliar Commission Appointment
  cleanMcqs[1],   // Mudaliar Commission Chairman
  cleanMcqs[4],   // Mudaliar Commission report submission
  cleanMcqs[5],   // Kothari Commission Appointment
  cleanMcqs[6],   // Kothari Commission Chairman
];

const formattedTest1Questions = test1QuestionsRaw.map((item, index) => {
  return {
    id: index + 1,
    qEn: item.enQuestion,
    qAs: item.asQuestion,
    optsEn: item.enOptions,
    optsAs: item.asOptions,
    correct: item.correctIndex,
    expEn: item.enExplanation,
    expAs: item.asExplanation
  };
});

let testsQuestionsContent = fs.readFileSync(testsQuestionsPath, 'utf8');

// We find '  1: [' and the start of paper 2: '  2: ['
const test1Start = testsQuestionsContent.indexOf("  1: [");
const test2Start = testsQuestionsContent.indexOf("  2: [");

if (test1Start !== -1 && test2Start !== -1) {
  // Find the closing bracket ], for 1 right before 2: [
  const test1End = testsQuestionsContent.lastIndexOf("],", test2Start) + 2;
  const newTest1Str = `  1: ${JSON.stringify(formattedTest1Questions, null, 4)},`;
  
  testsQuestionsContent = testsQuestionsContent.substring(0, test1Start) + newTest1Str + "\n\n" + testsQuestionsContent.substring(test1End);
  fs.writeFileSync(testsQuestionsPath, testsQuestionsContent, 'utf8');
  console.log("Successfully updated testsQuestions[1] in src/data/testsQuestions.ts.");
} else {
  console.error("Could not find targets in src/data/testsQuestions.ts");
}

// 5. Update MCQDayClient.tsx to award XP correctly
let mcqDayClientContent = fs.readFileSync(mcqDayClientPath, 'utf8');
if (!mcqDayClientContent.includes("useStudent")) {
  mcqDayClientContent = mcqDayClientContent.replace(
    'import { useLanguage } from "@/context/LanguageContext";',
    'import { useLanguage } from "@/context/LanguageContext";\nimport { useStudent } from "@/context/StudentContext";'
  );
}
if (!mcqDayClientContent.includes("const { awardXP, checkAndAwardBadges } = useStudent();")) {
  mcqDayClientContent = mcqDayClientContent.replace(
    '  const { language, t, formatNumber } = useLanguage();',
    '  const { language, t, formatNumber } = useLanguage();\n  const { awardXP, checkAndAwardBadges } = useStudent();'
  );
}

const scoreRecordStr = `      const scoreRecord = { score, total: activeMcqs.length };
      setSavedScore(scoreRecord);`;

const scoreRecordWithXPStr = `      const scoreRecord = { score, total: activeMcqs.length };
      setSavedScore(scoreRecord);

      // Award XP for each correct answer (+2 XP per correct answer)
      activeMcqs.forEach((mcq) => {
        if (newAnswers[mcq.id] === mcq.correct) {
          awardXP("MCQ_CORRECT_FIRST_TRY", \`MCQ: \${unitId}-\${dayId}-\${mcq.id}\`);
        }
      });
      // Award XP for completing the set (+20 XP)
      awardXP("COMPLETE_MCQ_SET", \`\${unitId}-\${dayId}\`);
      if (typeof checkAndAwardBadges === "function") {
        checkAndAwardBadges();
      }`;

if (mcqDayClientContent.includes(scoreRecordStr) && !mcqDayClientContent.includes("MCQ_CORRECT_FIRST_TRY")) {
  mcqDayClientContent = mcqDayClientContent.replace(scoreRecordStr, scoreRecordWithXPStr);
}
fs.writeFileSync(mcqDayClientPath, mcqDayClientContent, 'utf8');
console.log("Successfully updated src/components/MCQDayClient.tsx.");
