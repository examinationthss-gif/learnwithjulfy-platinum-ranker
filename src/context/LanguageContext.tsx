"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "as";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  formatNumber: (num: number | string) => string;
}

// Convert English numbers to Assamese script numerals
export function toAssameseNumerals(num: number | string): string {
  const assameseDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .split("")
    .map((char) => {
      const digit = parseInt(char, 10);
      return isNaN(digit) ? char : assameseDigits[digit];
    })
    .join("");
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav & General
    home: "Home",
    notes: "Notes",
    mcqBank: "MCQ Bank",
    videoClasses: "Video Classes",
    tests: "Tests",
    about: "About",
    platinumRanker: "Platinum Ranker",
    education: "Education",
    
    // Homepage Hero
    heroTitle: "Unlock Your Potential with the",
    heroSubtitle: "Master the Class 12 Education syllabus with ease. Access structured daily notes, solve interactive quizzes, and test yourself with board-aligned model papers.",
    startLearning: "Start Learning (Day 1-20)",
    practiceMCQ: "Practice MCQ Bank",
    exploreHub: "Explore hub",
    studyHubs: "Explore Study Hubs",
    studyHubsDesc: "Everything you need for perfect board preparation, organized logically into high-yield sections.",
    chapterNotes: "Chapter Notes",
    chapterNotesDesc: "Daily lessons divided into 20-day roadmaps for Units I to VII.",
    mcqBankTitle: "MCQ Bank",
    mcqBankDesc: "Unit-wise and topic-wise interactive MCQs for conceptual clarity.",
    testsPapers: "Tests & Papers",
    testsPapersDesc: "Unit tests, mock exams, and board-level prediction papers.",
    revisionProgram: "Revision Program",
    revisionProgramDesc: "Consolidate lessons, verify syllabus outlines, and trace core terms.",
    continueLearning: "Continue Learning",
    resumeLastDay: "Resume Last Day",
    todaysMCQ: "Today's MCQ",
    takeTest: "Take Test",
    quickActions: "Quick Actions",
    
    // Stats
    unitsCount: "7 Full Units",
    daysCount: "20 Days Track",
    mcqsCount: "500+ MCQs",
    boardCount: "100% AHSEC Mapped",
    
    // Notes page
    notesHeader: "Chapter Notes Hub",
    notesSub: "Select a unit to access the day-by-day notes. Track your progress as you complete each lesson.",
    courseUnits: "Course Units",
    roadmapTitle: "20-Day Learning Roadmap",
    estimatedTime: "Estimated study time: 15 mins",
    keyExamTakeaway: "Key Exam Takeaway",
    backToUnits: "Back to Units",
    unitBadge: "Unit",
    dayBadge: "Day",
    doneBadge: "Done",
    
    // Unit Titles
    u1t: "Development of Secondary Education in India and Assam",
    u1d: "Post-Independent secondary education reforms, Mudaliar Commission, Kothari Commission, and state education updates.",
    u2t: "Non-formal Education & Media of Education",
    u2d: "Alternative learning modes, open schools, distance education, correspondence courses, and mass media impact.",
    u3t: "Current Trends in Education",
    u3d: "Modern societal needs, environmental issues, population education, physical training, and values integration.",
    u4t: "Learning",
    u4d: "Core psychology concepts, laws of learning, trial & error theory, classical conditioning, and insightful learning.",
    u5t: "Memory & Attention",
    u5d: "Information retention, forgetting curves, factors of interest, distraction mechanisms, and mental concentration.",
    u6t: "Mental Health & Hygiene",
    u6d: "Adjustment mechanisms, mental hygiene principles, maladjustment, and home/school counseling guidance.",
    u7t: "Educational Statistics",
    u7d: "Quantitative methods, frequency distribution tables, polygon/histogram graphing, and calculations of central tendency.",
    
    // MCQ Page
    mcqHeader: "Interactive MCQ Bank",
    mcqSub: "Search questions, filter by course Unit or Day, and test your readiness with immediate answer grading.",
    searchQuestions: "Search Questions",
    filterUnit: "Filter by Unit",
    filterDay: "Filter by Day",
    explanation: "Explanation",
    resetRetry: "Reset & Retry",
    allUnits: "All Units",
    allDays: "All Days",
    searchPlaceholder: "Search by topic, keyword, definition...",
    noQuestions: "No questions found",
    noQuestionsDesc: "We couldn't find any questions matching your filters. Try adjusting the search query.",
    
    // Tests Page
    testsHeader: "Tests & Prediction Papers",
    testsSub: "Assess your preparedness using targeted unit tests, full model papers, mock exam simulation trials, and the signature board predictions.",
    examTimer: "Exam Prep Timer",
    liveSimulation: "Simulate Exam",
    downloadPaper: "Download Paper",
    timeRemaining: "Time Remaining",
    endExam: "End Exam",
    allPapersTab: "All Papers",
    unitTestsTab: "Unit Tests",
    modelTestsTab: "Model Tests",
    mockExamsTab: "Mock Exams",
    boardPredsTab: "Board Predictions",
    premiumBadge: "Premium Core",
    marksLabel: "Marks",
    minsLabel: "Mins",
    activeSession: "Active Session",
    limitLabel: "Limit",
    noActiveExam: "No Active Exam",
    noActiveExamDesc: "Select a paper from the list and click 'Simulate Exam' to launch the real-time exam timer widget.",
    timerAlertText: "Keep this page open! Pausing or switching tabs simulates moving away from your exam booklet. Solve your downloaded paper as the timer runs.",
  },
  as: {
    // Nav & General
    home: "হোম",
    notes: "পাঠ্য টোকা",
    mcqBank: "MCQ ব্যাংক",
    videoClasses: "ভিডিঅ' ক্লাছসমূহ",
    tests: "পৰীক্ষাসমূহ",
    about: "বিষয়ে",
    platinumRanker: "প্লেটিনাম ৰেংকাৰ",
    education: "শিক্ষা",
    
    // Homepage Hero
    heroTitle: "আপোনাৰ প্ৰতিভা বিকাশ কৰক",
    heroSubtitle: "দ্বাদশ শ্ৰেণীৰ শিক্ষা বিষয়ৰ পাঠ্যক্ৰম সহজতে আয়ত্ত কৰক। দৈনিক শৃংখলাবদ্ধ টোকা, কুইজ আৰু বোৰ্ডৰ সৈতে সংগতি থকা আৰ্হি প্ৰশ্নকাকতৰ জৰিয়তে নিজকে প্ৰস্তুত কৰক।",
    startLearning: "শিকিবলৈ আৰম্ভ কৰক (১-২০ দিন)",
    practiceMCQ: "MCQ অনুশীলন কৰক",
    exploreHub: "অন্বেষণ কৰক",
    studyHubs: "অধ্যয়ন কেন্দ্ৰসমূহ অন্বেষণ কৰক",
    studyHubsDesc: "উত্তম বোৰ্ড পৰীক্ষাৰ প্ৰস্তুতিৰ বাবে প্ৰয়োজনীয় প্ৰশ্নোত্তৰ আৰু টোকা ইয়াত সজোৱা হৈছে।",
    chapterNotes: "অধ্যায়ভিত্তিক টোকা",
    chapterNotesDesc: "গোট ১ ৰ পৰা ৭ লৈকে দৈনিক ২০দিনীয়া ৰোডমেপত বিভক্ত পাঠসমূহ।",
    mcqBankTitle: "MCQ ব্যাংক",
    mcqBankDesc: "ধাৰণা স্পষ্ট কৰাৰ বাবে অধ্যায়ভিত্তিক আৰু দিনভিত্তিক কুইজসমূহ।",
    testsPapers: "পৰীক্ষা আৰু প্ৰশ্নকাকত",
    testsPapersDesc: "গোট পৰীক্ষা, মক পৰীক্ষা আৰু বোৰ্ডৰ পূৰ্বানুমান প্ৰশ্নকাকতসমূহ।",
    revisionProgram: "পুনৰীক্ষণ আঁচনি",
    revisionProgramDesc: "পাঠসমূহ একত্ৰিত কৰক, পাঠ্যক্ৰম নিৰীক্ষণ কৰক আৰু মূল শব্দসমূহ চালি-জাৰি চাওক।",
    continueLearning: "শিকন অব্যাহত ৰাখক",
    resumeLastDay: "যোৱা দিনটোৰ পৰা আৰম্ভ কৰক",
    todaysMCQ: "আজিৰ MCQ কুইজ",
    takeTest: "পৰীক্ষা দিয়ক",
    quickActions: "ক্ষিপ্ৰ কাৰ্যাৱলী",
    
    // Stats
    unitsCount: "৭ টা সম্পূৰ্ণ গোট",
    daysCount: "২০ দিনীয়া ট্ৰেক",
    mcqsCount: "৫০০+ MCQ প্ৰশ্ন",
    boardCount: "১০০% AHSEC ভিত্তিক",
    
    // Notes page
    notesHeader: "পাঠ্য টোকা কেন্দ্ৰ",
    notesSub: "দৈনিক পাঠসমূহ লাভ কৰিবলৈ এটা গোট বাছনি কৰক। প্ৰতিটো পাঠ সমাপ্ত কৰাৰ লগে লগে আপোনাৰ অগ্ৰগতি লক্ষ্য কৰক।",
    courseUnits: "পাঠ্যক্ৰমৰ গোটসমূহ",
    roadmapTitle: "২০ দিনীয়া শিক্ষণ ৰোডমেপ",
    estimatedTime: "আনুমানিক অধ্যয়ন সময়: ১৫ মিনিট",
    keyExamTakeaway: "পৰীক্ষাৰ গুৰুত্বপূৰ্ণ টিপছ",
    backToUnits: "গোটসমূহলৈ ঘূৰি যাওক",
    unitBadge: "গোট",
    dayBadge: "দিন",
    doneBadge: "সমাপ্ত",
    
    // Unit Titles
    u1t: "ভাৰত আৰু অসমৰ মাধ্যমিক শিক্ষাৰ বিকাশ",
    u1d: "স্বাধীনোত্তৰ মাধ্যমিক শিক্ষা সংস্কাৰ, মুডালিয়াৰ আয়োগ, কোঠাৰী আয়োগ, আৰু ৰাজ্যিক শিক্ষাৰ বিভিন্ন দিশ।",
    u2t: "অনানুষ্ঠানিক শিক্ষা আৰু শিক্ষাৰ মাধ্যমসমূহ",
    u2d: "বিকল্প শিক্ষাৰ মাধ্যম, মুক্ত বিদ্যালয়, দূৰ শিক্ষা, পত্ৰযোগ শিক্ষা আৰু গণমাধ্যমৰ প্ৰভাৱ।",
    u3t: "শিক্ষাৰ সাম্প্ৰতিক ধাৰাসমূহ",
    u3d: "আধুনিক সমাজৰ প্ৰয়োজন, পৰিৱেশ শিক্ষা, জনসংখ্যা শিক্ষা, শাৰীৰিক শিক্ষা আৰু মূল্যবোধৰ শিক্ষা।",
    u4t: "শিকন",
    u4d: "মনোবিজ্ঞানৰ মূল ধাৰণা, শিকনৰ সূত্ৰসমূহ, প্ৰচেষ্টা আৰু ভুল পদ্ধতি, ধ্ৰুপদী অনুৱৰ্তন আৰু অন্তৰ্দৃষ্টিমূলক শিকন।",
    u5t: "স্মৃতিশক্তি আৰু মনোযোগ",
    u5d: "স্মৃতি ধাৰণ, বিস্মৃতিৰ কাৰণসমূহ, মনোযোগৰ কাৰক, মনোযোগ বিচ্যুতি আৰু মনোযোগ বৃদ্ধিৰ উপায়।",
    u6t: "মানসিক স্বাস্থ্য আৰু বিজ্ঞান",
    u6d: "অপসংগতিৰ কাৰণসমূহ, মানসিক স্বাস্থ্য ৰক্ষাৰ উপায়, আৰু ঘৰুৱা তথা বিদ্যালয়ৰ ভূমিকা।",
    u7t: "শৈক্ষিক পৰিসংখ্যা",
    u7d: "শৈক্ষিক গণনা পদ্ধতি, পৌনঃপুনিকতা বিভাজন তালিকা, লেখচিত্ৰ অংকন আৰু কেন্দ্ৰীয় প্ৰৱণতা নিৰূপণ (গড়, মধ্যমা, প্ৰচুৰক)।",
    
    // MCQ Page
    mcqHeader: "ইন্টাৰেক্টিভ MCQ ব্যাংক",
    mcqSub: "প্ৰশ্ন সন্ধান কৰক, গোট বা দিন অনুসৰি ফিল্টাৰ কৰক, আৰু তাৎক্ষণিক নম্বৰ লাভ কৰাৰ লগতে বুজি লওক।",
    searchQuestions: "প্ৰশ্ন সন্ধান কৰক",
    filterUnit: "গোট অনুসৰি বাছক",
    filterDay: "দিন অনুসৰি বাছক",
    explanation: "ব্যাখ্যা",
    resetRetry: "পুনৰ চেষ্টা কৰক",
    allUnits: "সকলো গোট",
    allDays: "সকলো দিন",
    searchPlaceholder: "বিষয়, মূল শব্দ বা সংজ্ঞা অনুসৰি সন্ধান কৰক...",
    noQuestions: "কোনো প্ৰশ্ন পোৱা নগ'ল",
    noQuestionsDesc: "আপোনাৰ ফিল্টাৰৰ সৈতে মিলা কোনো প্ৰশ্ন পোৱা নগ'ল। অনুগ্ৰহ কৰি ফিল্টাৰ সলনি কৰক।",
    
    // Tests Page
    testsHeader: "পৰীক্ষা আৰু পূৰ্বানুমান প্ৰশ্নকাকত",
    testsSub: "গোট পৰীক্ষা, আৰ্হি প্ৰশ্নকাকত, মক পৰীক্ষা আৰু বোৰ্ডৰ সম্ভাব্য প্ৰশ্নকাকতৰ জৰিয়তে নিজকে পৰীক্ষা কৰক।",
    examTimer: "পৰীক্ষা প্ৰস্তুতি সময় সীমা",
    liveSimulation: "পৰীক্ষা আৰম্ভ কৰক",
    downloadPaper: "প্ৰশ্নকাকত ডাউনলোড কৰক",
    timeRemaining: "অৱশিষ্ট সময়",
    endExam: "পৰীক্ষা সমাপ্ত কৰক",
    allPapersTab: "সকলো প্ৰশ্নকাকত",
    unitTestsTab: "গোট পৰীক্ষা",
    modelTestsTab: "আৰ্হি পৰীক্ষা",
    mockExamsTab: "মক পৰীক্ষা",
    boardPredsTab: "বোৰ্ড পূৰ্বানুমান",
    premiumBadge: "প্ৰিমিয়াম সমল",
    marksLabel: "পূৰ্ণ নম্বৰ",
    minsLabel: "মিনিট",
    activeSession: "সক্ৰিয় পৰীক্ষা",
    limitLabel: "সময় সীমা",
    noActiveExam: "কোনো সক্ৰিয় পৰীক্ষা নাই",
    noActiveExamDesc: "প্ৰশ্নকাকত এখন বাছনি কৰি পৰীক্ষাৰ সময় নিৰীক্ষণ আৰম্ভ কৰক।",
    timerAlertText: "এই পৃষ্ঠাখন খোলা ৰাখিব! টেব সলনি কৰিলে পৰীক্ষা হলৰ পৰা আঁতৰি যোৱা বুজাব। সময় চলি থকাৰ ভিতৰতে প্ৰশ্নকাকতখন সমাধান কৰক।",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("julfy-lang") as Language;
    if (saved === "en" || saved === "as") {
      setLanguage(saved);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("julfy-lang", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  const formatNumber = (num: number | string): string => {
    if (language === "en") return num.toString();
    return toAssameseNumerals(num);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t, formatNumber }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
