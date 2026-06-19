const fs = require("fs");
const path = require("path");

const rawPath = path.join(__dirname, "../extracted_mcqs.json");
const data = JSON.parse(fs.readFileSync(rawPath, "utf8"));

// Define custom dictionary repairs for specific words that regex might not cover perfectly
const wordReplacements = [
  // Core terms
  [/মাধ্যমিক/g, "মাধ্যমিক"],
  [/মাধ্যমমক/g, "মাধ্যমিক"],
  [/মিক্ষা/g, "শিক্ষা"],
  [/আয াগ/g, "আয়োগ"],
  [/আয়োগ/g, "আয়োগ"],
  [/ককান/g, "কোন"],
  [/মনযুক্ত/g, "নিযুক্ত"],
  [/হৈমছল/g, "হৈছিল"],
  [/সভাপমত/g, "সভাপতি"],
  [/আমছল/g, "আছিল"],
  [/মুদামল\s*া/g, "মুডালিয়া"],
  [/মুদামল াৰ/g, "মুডালিয়াৰ"],
  [/বৃমি/g, "বৃত্তি"],
  [/পৰীক্ষাযকমিক/g, "পৰীক্ষামুখী"],
  [/বলবখত/g, "লিখিত"],
  [/বিক্ষা/g, "শিক্ষা"],
  [/বিক্ষাৰ্থী/g, "শিক্ষাৰ্থী"],
  [/বিোি/g, "বিকাশ"],
  [/আয়োগ/g, "আয়োগ"],
  [/আয়োযগ/g, "আয়োগে"],
  [/েযৰ/g, "কৰে"],
  [/হহবিল/g, "হৈছিল"],
  [/িযৱহাবৰে/g, "ব্যৱহাৰিক"],
  [/দ্ক্ষ/g, "দক্ষ"],
  [/দ্ক্ষ তা/g, "দক্ষতা"],
  [/সহ-পাঠ্যক্ৰম/g, "সহ-পাঠ্যক্ৰম"],
  [/কসৱা/g, "সেৱা"],
  [/বনযদ্িিনা/g, "নিৰ্দেশনা"],
  [/হদ্নবিন/g, "দৈনন্দিন"],
  [/জীৱন/g, "জীৱন"],
  [/আৰম্ভ কৰা হৈযছ/g, "আৰম্ভ কৰা হৈছে"],
  [/মবকাি/g, "বিকাশ"],
  [/কনতৃত্ব\s*ৰ/g, "নেতৃত্বৰ"],
  [/দুয\s*া\s*া\s*সতয/g, "দুয়োটা সত্য"],
  [/বযাখযা/g, "ব্যাখ্যা"],
  [/মদ\s*া\s*নামছল/g, "দিয়া নাছিল"],
  [/বিদ্যালয়/g, "বিদ্যালয়"],
  [/বিদ্যালয়ে/g, "বিদ্যালয়ে"],
  [/োৰ্িসূচী/g, "কাৰ্যসূচী"],
  [/পৰীক্ষাযেবিে/g, "পৰীক্ষাকেন্দ্ৰিক"],
  [/বযমক্ত/g, "ব্যক্তি"],
  [/পাথযকয/g, "পার্থক্য"],
  [/উযপক্ষা/g, "উপেক্ষা"],
  [/েীেনমুখী/g, "জীৱনমুখী"],
  [/আগ্ৰৈ/g, "আগ্ৰহ"],
  [/সামথযয/g, "সামর্থ্য"],
  [/গু\s*ৰুত্ব/g, "গুৰুত্ব"],
  [/মদমছল/g, "দিছিল"],
  [/মবশ্বমবদযাল/g, "বিশ্ববিদ্যালয়"],
  [/প্ৰ\s*াথমমক/g, "প্ৰাথমিক"],
  [/প্ৰ\s*াপ্তব\s*স্ক/g, "প্ৰাপ্তবয়স্ক"],
  [/অতযামধ্\s*ক/g, "অত্যাধিক"],
  [/পুমথগত/g, "পুথিগত"],
  [/পুমথভঁৰাল/g, "পুথিভঁৰাল"],
  [/অভ\s*াে/g, "অভাৱ"],
  [/বৃমিমূলক/g, "বৃত্তিমূলক"],
  [/কলা\s*মবষ\s*ত/g, "কলা বিষয়ত"],
  [/সৈ-পাঠযক্ৰম/g, "সহ-পাঠ্যক্ৰম"],
  [/কবেী/g, "বেছি"],
  [/বছৰত/g, "বছৰত"],
  [/মনযুক্ত/g, "নিযুক্ত"],
  [/চৰকাযৰ/g, "চৰকাৰে"],
  [/মি\.\s*এছ\./g, "ডি. এছ."],
  [/ককাঠাৰী/g, "কোঠাৰী"],
  [/না\s*ক/g, "নায়ক"],
  [/না\s*য়ক/g, "নায়ক"],
  [/োমকৰ/g, "জাকিৰ"],
  [/হু\s*যছইন/g, "হুছেইন"],
  [/ি°/g, "ড°"],
  [/অধ্য\s*ন/g, "অধ্যয়ন"],
  [/পযযাযলাচনা/g, "পৰ্যালোচনা"],
  [/সংষ্কাৰৰ/g, "সংস্কাৰৰ"],
  [/স্থাপনৰ/g, "স্থাপনৰ"],
  [/মন\s*ন্ত্ৰ\s*ণ/g, "নিয়ন্ত্ৰণ"],
  [/প্ৰ\s*তযক্ষভাযে/g, "প্ৰত্যক্ষভাৱে"],
  [/ককান/g, "কোন"],
  [/মিক্ষাস্তৰ/g, "শিক্ষাস্তৰ"],
  [/ত্ৰু\s*টি/g, "ত্ৰুটি"],
  [/ত্ৰু\s*টিয\s*াক/g, "ত্ৰুটিকে"],
  [/সমোলোচনা/g, "সমালোচনা"],
  [/বযেৈামৰক/g, "ব্যৱহাৰিক"],
  [/ক্ৰ\s*ীডা/g, "ক্ৰীড়া"],
  [/কাযযসূচী/g, "কাৰ্যসূচী"],
  [/পৰীক্ষামুখী/g, "পৰীক্ষামুখী"],
  [/হৈ\s*পমৰমছল/g, "হৈ পৰিছিল"],
  [/মভন্ন/g, "ভিন্ন"],
  [/বাছক/g, "বাছক"],
  [/ব্যাখ্যা/g, "ব্যাখ্যা"],
  [/সন্ধান/g, "সন্ধান"],
  [/পৰীক্ষাসমূহ/g, "পৰীক্ষাসমূহ"],
  [/ৰাষ্ট্ৰী\s*মিক্ষা/g, "ৰাষ্ট্ৰীয় শিক্ষা"],
];

function repairText(text) {
  if (!text) return text;
  let t = text;

  // 1. General character/glyph corruptions mapping visual-order anomalies
  // Fix the "C + space + a" style issue found in some words
  t = t.replace(/য\s+া/g, "য়া");
  t = t.replace(/ল\s+া/g, "লা");
  t = t.replace(/দ\s+া/g, "দা");
  t = t.replace(/ত\s+া/g, "তা");
  t = t.replace(/ম\s+া/g, "মা");
  t = t.replace(/ন\s+া/g, "না");

  // Fix "ি" visual order shift represented by prefix 'ম' followed by consonant
  // e.g. মনযুক্ত -> নিযুক্ত, সভাপমত -> সভাপতি, হৈমছল -> হৈছিল
  const consonants = "কখগঘঙচছজঝঞটঠডঢণত্থদধনপফবভমযৰলৱশষসহড়ঢ়য়";
  const regexM = new RegExp(`ম([${consonants}])`, "g");
  t = t.replace(regexM, "$1ি");

  // Similarly, prefix 'ব' followed by consonant
  // e.g. বলবখত -> লিখিত, বিক্ষা -> শিক্ষা
  const regexB = new RegExp(`ব([${consonants}])`, "g");
  t = t.replace(regexB, "$1ি");

  // Additional cleanup of common character errors
  t = t.replace(/া\s+ৰ/g, "াৰ");
  t = t.replace(/ৈ\s+ল/g, "ৈছিল");
  t = t.replace(/ৈ\s+মছল/g, "ৈছিল");
  
  // Apply our specific word replacement mappings
  for (const [pattern, replacement] of wordReplacements) {
    t = t.replace(pattern, replacement);
  }

  // Double check some common corrupted forms that might result from above regexes
  t = t.replace(/মিক্ষা/g, "শিক্ষা");
  t = t.replace(/আমছল/g, "আছিল");
  t = t.replace(/সভাপমত/g, "সভাপতি");
  t = t.replace(/মনযুক্ত/g, "নিযুক্ত");
  t = t.replace(/মাধ্যমমক/g, "মাধ্যমিক");
  t = t.replace(/ককান/g, "কোন");
  
  return t;
}

// Repair all MCQs
const repairedData = data.map(m => {
  return {
    ...m,
    asQuestion: repairText(m.asQuestion),
    asOptions: m.asOptions.map(opt => repairText(opt)),
    asExplanation: repairText(m.asExplanation)
  };
});

fs.writeFileSync(path.join(__dirname, "../repaired_mcqs.json"), JSON.stringify(repairedData, null, 2), "utf8");

// Output some before and after examples
console.log("REPAIR EXAMPLES:");
for (let i = 0; i < 5; i++) {
  console.log(`\nMCQ ${data[i].mcqId}:`);
  console.log(`Original Question:  ${data[i].asQuestion}`);
  console.log(`Repaired Question:  ${repairedData[i].asQuestion}`);
  console.log(`Original Options:   ${data[i].asOptions.join(" | ")}`);
  console.log(`Repaired Options:   ${repairedData[i].asOptions.join(" | ")}`);
}
