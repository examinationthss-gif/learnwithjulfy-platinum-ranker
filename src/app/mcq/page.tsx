"use client";

import { useState } from "react";
import { Search, Check, X, HelpCircle, Filter } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface MCQ {
  id: number;
  unitId: string;
  enUnitNumber: string;
  asUnitNumber: string;
  dayNumber: number;
  enQuestion: string;
  asQuestion: string;
  enOptions: string[];
  asOptions: string[];
  correctIndex: number;
  enExplanation: string;
  asExplanation: string;
}

const mcqData: MCQ[] = [
  {
    id: 1,
    unitId: "unit-1",
    enUnitNumber: "Unit I",
    asUnitNumber: "গোট ১",
    dayNumber: 1,
    enQuestion: "Which commission recommended the 10+2+3 pattern of education in India?",
    asQuestion: "কোনটো আয়োগে ভাৰতত ১০+২+৩ শিক্ষা গাঁথনিৰ চুপাৰিছ কৰিছিল?",
    enOptions: [
      "Mudaliar Commission",
      "Kothari Commission",
      "Radhakrishnan Commission",
      "University Education Commission",
    ],
    asOptions: [
      "মুডালিয়াৰ আয়োগ",
      "কোঠাৰী আয়োগ",
      "ৰাধাকৃষ্ণণ আয়োগ",
      "বিশ্ববিদ্যালয় শিক্ষা আয়োগ",
    ],
    correctIndex: 1,
    enExplanation: "The Kothari Commission (1964-66) proposed the standardized 10+2+3 structure of education to unify the national education system.",
    asExplanation: "কোঠাৰী আয়োগে (১৯৬৪-৬৬) সমগ্ৰ দেশতে এক উমৈহতীয়া শিক্ষানীতি প্ৰচলন কৰাৰ উদ্দেশ্যে ১০+২+৩ গাঁথনিৰ পোষকতা কৰিছিল।"
  },
  {
    id: 2,
    unitId: "unit-1",
    enUnitNumber: "Unit I",
    asUnitNumber: "গোট ১",
    dayNumber: 3,
    enQuestion: "In which year was the Secondary Education Commission appointed under Dr. A.L. Mudaliar?",
    asQuestion: "ড° এ.এল. মুডালিয়াৰৰ সভাপতিত্বত কেতিয়া মাধ্যমিক শিক্ষা আয়োগ নিযুক্তি দিয়া হৈছিল?",
    enOptions: ["1948", "1950", "1952", "1964"],
    asOptions: ["১৯৪৮ চনত", "১৯৫০ চনত", "১৯৫২ চনত", "১৯৬৪ চনত"],
    correctIndex: 2,
    enExplanation: "The Mudaliar Commission, also known as the Secondary Education Commission, was appointed in September 1952 to examine secondary education in India.",
    asExplanation: "১৯৫২ চনৰ ছেপ্টেম্বৰ মাহত ভাৰত চৰকাৰে ড° লক্ষ্মণস্বামী মুডালিয়াৰৰ সভাপতিত্বত এই আয়োগ গঠন কৰিছিল।"
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
  },
];

export default function MCQPage() {
  const { t, language, formatNumber } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<string>("all");
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [answersState, setAnswersState] = useState<Record<number, number>>({});

  const handleSelectOption = (mcqId: number, optionIndex: number) => {
    if (answersState[mcqId] !== undefined) return;
    setAnswersState((prev) => ({ ...prev, [mcqId]: optionIndex }));
  };

  const resetMCQ = (mcqId: number) => {
    setAnswersState((prev) => {
      const copy = { ...prev };
      delete copy[mcqId];
      return copy;
    });
  };

  // Filter logic based on selected language question fields
  const filteredMCQs = mcqData.filter((mcq) => {
    const questionText = language === "en" ? mcq.enQuestion : mcq.asQuestion;
    const explanationText = language === "en" ? mcq.enExplanation : mcq.asExplanation;
    
    const matchesSearch =
      questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      explanationText.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesUnit = selectedUnit === "all" || mcq.unitId === selectedUnit;
    const matchesDay = selectedDay === "all" || mcq.dayNumber.toString() === selectedDay;

    return matchesSearch && matchesUnit && matchesDay;
  });

  const uniqueUnits = Array.from(new Set(mcqData.map((m) => m.unitId))).map((id) => {
    const original = mcqData.find((m) => m.unitId === id);
    return {
      id,
      label: language === "en" ? original?.enUnitNumber : original?.asUnitNumber,
    };
  });

  // ка, кhа, ga, gha prefixes for Assamese, A, B, C, D for English
  const optionPrefixes = language === "en" ? ["A. ", "B. ", "C. ", "D. "] : ["ক. ", "খ. ", "গ. ", "ঘ. "];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div className="space-y-2 text-center md:text-left">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          {t("mcqHeader")}
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          {t("mcqSub")}
        </p>
      </div>

      {/* Controls Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end rounded-2xl border border-border bg-card p-5 shadow-sm">
        
        {/* Search */}
        <div className="md:col-span-6 space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {t("searchQuestions")}
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-4 text-sm text-foreground focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Unit Filter */}
        <div className="md:col-span-3 space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {t("filterUnit")}
          </label>
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm text-foreground focus:border-indigo-500 focus:outline-none"
          >
            <option value="all">{t("allUnits")}</option>
            {uniqueUnits.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
        </div>

        {/* Day Filter */}
        <div className="md:col-span-3 space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {t("filterDay")}
          </label>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm text-foreground focus:border-indigo-500 focus:outline-none"
          >
            <option value="all">{t("allDays")}</option>
            {Array.from({ length: 20 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {t("dayBadge")} {formatNumber(i + 1)}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* MCQ Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMCQs.map((mcq) => {
          const userAnswerIndex = answersState[mcq.id];
          const isAnswered = userAnswerIndex !== undefined;
          
          const questionText = language === "en" ? mcq.enQuestion : mcq.asQuestion;
          const optionsList = language === "en" ? mcq.enOptions : mcq.asOptions;
          const explanationText = language === "en" ? mcq.enExplanation : mcq.asExplanation;
          const unitBadgeText = language === "en" ? mcq.enUnitNumber : mcq.asUnitNumber;

          return (
            <div
              key={mcq.id}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-indigo-500/20 transition-all duration-200"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full">
                    {unitBadgeText}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                    {t("dayBadge")} {formatNumber(mcq.dayNumber)}
                  </span>
                </div>

                {/* Question */}
                <h3 className="font-heading text-base font-bold text-foreground leading-snug mb-4">
                  {questionText}
                </h3>

                {/* Options list */}
                <div className="space-y-2">
                  {optionsList.map((option, idx) => {
                    const isSelected = userAnswerIndex === idx;
                    const isCorrect = mcq.correctIndex === idx;
                    
                    let btnStyle = "border-border hover:bg-muted";
                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold";
                      } else if (isSelected) {
                        btnStyle = "border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold";
                      } else {
                        btnStyle = "border-border opacity-60";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(mcq.id, idx)}
                        className={`w-full text-left p-3 rounded-xl border text-sm flex items-center justify-between transition-all ${btnStyle}`}
                      >
                        <span>
                          <span className="font-bold text-indigo-600 dark:text-indigo-400 mr-1">
                            {optionPrefixes[idx]}
                          </span>
                          {option}
                        </span>
                        {isAnswered && isCorrect && <Check className="h-4 w-4 text-emerald-500 shrink-0" />}
                        {isAnswered && isSelected && !isCorrect && <X className="h-4 w-4 text-rose-500 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Explanation & Reset Panel */}
              {isAnswered && (
                <div className="mt-6 border-t border-border/60 pt-4 space-y-3">
                  <div className="flex items-start gap-2.5 bg-muted/50 rounded-xl p-3.5 border border-border/40">
                    <HelpCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-foreground">{t("explanation")}</span>
                      <p className="text-[12px] leading-relaxed text-muted-foreground font-sans">
                        {explanationText}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => resetMCQ(mcq.id)}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex ml-auto"
                  >
                    {t("resetRetry")}
                  </button>
                </div>
              )}

            </div>
          );
        })}

        {filteredMCQs.length === 0 && (
          <div className="md:col-span-2 text-center py-16 border border-dashed border-border rounded-3xl bg-muted/10 space-y-2">
            <Filter className="h-8 w-8 text-muted-foreground/60 mx-auto" />
            <h3 className="font-heading text-lg font-bold text-foreground">{t("noQuestions")}</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              {t("noQuestionsDesc")}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
