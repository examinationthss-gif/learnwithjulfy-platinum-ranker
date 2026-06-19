const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

const pdfPath = path.join('C:', 'Users', 'ACER', '.gemini', 'antigravity', 'brain', '609d5d54-a9bc-4857-a1d7-7bdd6a02950e', 'media__1781867500687.pdf');

console.log('Reading PDF:', pdfPath);
const dataBuffer = fs.readFileSync(pdfPath);

const parser = new PDFParse({ data: dataBuffer });
parser.getText().then(function(result) {
    console.log('Successfully read PDF. Character count:', result.text.length);
    fs.writeFileSync('pdf_text_dump.txt', result.text);
    console.log('Text dumped to pdf_text_dump.txt');
}).catch(err => {
    console.error('Error reading PDF:', err);
});
