const fs = require('fs');

const text = fs.readFileSync('pdf_text_dump.txt', 'utf8');

// The text has footer strings like "-- X of Y --" interspersed because of page breaks.
// Let's first remove the "-- \d+ of \d+ --" lines to clean it up.
const cleanedText = text.replace(/-- \d+ of \d+ --/g, '');

const mcqBlocks = cleanedText.split(/MCQ \d+/);
console.log('Total split blocks:', mcqBlocks.length);

const mcqs = [];

// Skip the first block because it's the header text before the first MCQ
for (let i = 1; i < mcqBlocks.length; i++) {
    const block = mcqBlocks[i].trim();
    if (!block) continue;
    
    // Extract metadata
    const mcqIdMatch = block.match(/MCQ ID:\s*([^\r\n]+)/);
    const unitMatch = block.match(/Unit:\s*([^\r\n]+)/);
    const dayMatch = block.match(/Day:\s*([^\r\n]+)/);
    const topicMatch = block.match(/Topic:\s*([^\r\n]+)/);
    const subtopicMatch = block.match(/Subtopic:\s*([^\r\n]+)/);
    const difficultyMatch = block.match(/Difficulty:\s*([^\r\n]+)/);
    const correctAnsMatch = block.match(/Correct Answer:\s*([^\r\n]+)/);
    
    // Extract questions and options
    let englishQuestion = '';
    let assameseQuestion = '';
    let englishOptions = [];
    let assameseOptions = [];
    let explanationEn = '';
    let explanationAs = '';
    let hint = '';
    
    const eqIdx = block.indexOf('English Question:');
    const aqIdx = block.indexOf('Assamese Question:');
    
    if (eqIdx !== -1 && aqIdx !== -1) {
        // English question text is between 'English Question:' and 'Assamese Question:'
        englishQuestion = block.substring(eqIdx + 'English Question:'.length, aqIdx).trim();
    }
    
    // Find option blocks starting with A. B. C. D.
    // For English: options are usually after the Assamese Question or English Question.
    // Let's find all occurrences of options.
    const optRegex = /([A-D])\.\s*([^\r\n]+)/g;
    let match;
    const allOptions = [];
    while ((match = optRegex.exec(block)) !== null) {
        allOptions.push({
            letter: match[1],
            text: match[2].trim(),
            index: match.index
        });
    }
    
    // Usually, the first A, B, C, D are English options, and the second A, B, C, D are Assamese options.
    // Let's sort them by index and divide them.
    allOptions.sort((a, b) => a.index - b.index);
    
    // Sometimes there are other A, B, C, D in text, let's filter carefully.
    // Let's separate English and Assamese options.
    const engOpts = allOptions.slice(0, 4).map(o => o.text);
    const asOpts = allOptions.slice(4, 8).map(o => o.text);
    
    // Extract Assamese question text
    if (aqIdx !== -1) {
        // The assamese question text starts after 'Assamese Question:' and goes up to the first option
        const firstOptIndex = allOptions.length > 0 ? allOptions[0].index : block.length;
        assameseQuestion = block.substring(aqIdx + 'Assamese Question:'.length, firstOptIndex).trim();
    }
    
    // Extract explanation and hint
    const expEnIdx = block.indexOf('Explanation (English):');
    const expAsIdx = block.indexOf('Explanation (Assamese):');
    const hintIdx = block.indexOf('Hint:');
    
    if (expEnIdx !== -1 && expAsIdx !== -1) {
        explanationEn = block.substring(expEnIdx + 'Explanation (English):'.length, expAsIdx).trim();
    }
    if (expAsIdx !== -1 && hintIdx !== -1) {
        explanationAs = block.substring(expAsIdx + 'Explanation (Assamese):'.length, hintIdx).trim();
    }
    if (hintIdx !== -1) {
        hint = block.substring(hintIdx + 'Hint:'.length).trim();
    }
    
    // Map correct answer letter to index
    const correctLetter = correctAnsMatch ? correctAnsMatch[1].trim() : '';
    let correctIndex = -1;
    if (correctLetter === 'A') correctIndex = 0;
    else if (correctLetter === 'B') correctIndex = 1;
    else if (correctLetter === 'C') correctIndex = 2;
    else if (correctLetter === 'D') correctIndex = 3;
    
    // Create the final object
    mcqs.push({
        id: mcqs.length + 1,
        mcqId: mcqIdMatch ? mcqIdMatch[1].trim() : '',
        unit: unitMatch ? unitMatch[1].trim() : '',
        day: dayMatch ? dayMatch[1].trim() : '',
        topic: topicMatch ? topicMatch[1].trim() : '',
        subtopic: subtopicMatch ? subtopicMatch[1].trim() : '',
        difficulty: difficultyMatch ? difficultyMatch[1].trim() : '',
        enQuestion: englishQuestion,
        asQuestion: assameseQuestion,
        enOptions: engOpts,
        asOptions: asOpts,
        correctIndex: correctIndex,
        enExplanation: explanationEn,
        asExplanation: explanationAs,
        hint: hint
    });
}

console.log('Total extracted MCQs:', mcqs.length);
if (mcqs.length > 0) {
    console.log('Sample MCQ 1:', JSON.stringify(mcqs[0], null, 2));
    console.log('Sample MCQ 100:', JSON.stringify(mcqs[99], null, 2));
}

fs.writeFileSync('extracted_mcqs.json', JSON.stringify(mcqs, null, 2));
