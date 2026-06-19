const fs = require('fs');
const path = require('path');

// 1. Read the extracted MCQs
const mcqs = JSON.parse(fs.readFileSync('extracted_mcqs.json', 'utf8'));

// Only keep the first 100 MCQs (in case there's any parsing trailing block)
const targetMcqs = mcqs.slice(0, 100);

// We need to group them by Day number to write them into content/unit1/day[1-20].json
// Day values are like "Day 1", "Day 2", etc. or "Day 11–14 Revision", "Final Revision Layer", "Grand Synthesis".
// Let's inspect the distribution of Day values in targetMcqs.
const dayDistribution = {};
targetMcqs.forEach(m => {
    dayDistribution[m.day] = (dayDistribution[m.day] || 0) + 1;
});
console.log('Day values distribution:', dayDistribution);

// Let's write a deterministic day mapping since there are exactly 20 days.
// Let's check how the days are distributed:
// Day 1: 2
// Day 2: 2
// Day 3: 2
// Day 4: 2
// Day 5: 3
// Day 6: 2
// Day 7: 2
// Day 8: 2
// Day 9: 2
// Day 10: 2
// Day 11: 2
// Day 12: 2
// Day 13: 2
// Day 14: 2
// Day 15: 2
// Day 16: 2
// Day 17: 2
// Day 18: 3
// Day 19: 3
// Day 20: 2
// Others: Day 11–14 Revision, Day 14–16 Revision, Day 7–14 Integrated Review, Day 18–20 Revision, Day 20 Integrated Revision, etc.
// Since we have exactly 100 MCQs, we should put exactly 5 MCQs per day for Day 1 to 20.
// Let's map targetMcqs to days 1 to 20 sequentially:
// i = 0..4 -> Day 1
// i = 5..9 -> Day 2
// ...
// i = 95..99 -> Day 20

// Let's also prepare the data structures:
// 1. We will update content/unit1/day[1-20].json files.
// For each day, we read the existing JSON file, replace the "mcqs" and "asMcqs" arrays with our parsed questions.
// Schema:
// "mcqs": [ { "id": number, "question": string, "options": string[], "correct": number, "explanation": string } ]
// "asMcqs": [ { "id": number, "question": string, "options": string[], "correct": number, "explanation": string } ]

console.log('Writing MCQs to Unit 1 day-wise content files...');

for (let d = 1; d <= 20; d++) {
    const dayFile = path.join('content', 'unit1', `day${d}.json`);
    if (!fs.existsSync(dayFile)) {
        console.error('File not found:', dayFile);
        continue;
    }
    
    const dayData = JSON.parse(fs.readFileSync(dayFile, 'utf8'));
    
    // Slice 5 MCQs for this day
    const startIndex = (d - 1) * 5;
    const dayMcqs = targetMcqs.slice(startIndex, startIndex + 5);
    
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

console.log('Updated Day files successfully.');
