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
    "id": 1,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "In which year was the Secondary Education Commission appointed?",
    "asQuestion": "মাধ্যমিক শিক্ষা আয়োগ কোন বছৰত নিযুক্ত কৰা হৈছিল?",
    "enOptions": [
      "1948",
      "1952",
      "1964",
      "1986"
    ],
    "asOptions": [
      "১৯৪৮",
      "১৯৫২",
      "১৯৬৪",
      "১৯৮৬"
    ],
    "correctIndex": 1,
    "enExplanation": "The Secondary Education Commission was appointed by the Government of India in 1952.",
    "asExplanation": "ভাৰত চৰকাৰে ১৯৫২ চনত মাধ্যমিক শিক্ষা আয়োগ নিযুক্ত কৰিছিল।"
  },
  {
    "id": 2,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Who was the Chairman of the Secondary Education Commission?",
    "asQuestion": "মাধ্যমিক শিক্ষা আয়োগৰ সভাপতি কোন আছিল?",
    "enOptions": [
      "D. S. Kothari",
      "A. Lakshmanaswami Mudaliar",
      "J. P. Naik",
      "Zakir Hussain"
    ],
    "asOptions": [
      "ডি. এছ. কোঠাৰী",
      "এ. লক্ষ্মণস্বামী মুদালিয়াৰ",
      "জে. পি. নায়ক",
      "জাকিৰ হুছেইন"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission was chaired by Dr. A. Lakshmanaswami Mudaliar.",
    "asExplanation": "ড° এ. লক্ষ্মণস্বামী মুদালিয়াৰ এই আয়োগৰ সভাপতি আছিল।"
  },
  {
    "id": 3,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 2,
    "enQuestion": "Why was the Secondary Education Commission appointed?",
    "asQuestion": "মাধ্যমিক শিক্ষা আয়োগ কিয় নিযুক্ত কৰা হৈছিল?",
    "enOptions": [
      "To reform higher education",
      "To examine and improve secondary education",
      "To establish universities",
      "To regulate primary schools"
    ],
    "asOptions": [
      "উচ্চ শিক্ষাৰ সংস্কাৰৰ বাবে",
      "মাধ্যমিক শিক্ষা পৰ্যালোচনা আৰু উন্নয়নৰ বাবে",
      "বিশ্ববিদ্যালয় স্থাপনৰ বাবে",
      "প্ৰাথমিক বিদ্যালয় নিয়ন্ত্ৰণৰ বাবে"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission was formed to study the problems of secondary education and suggest reforms.",
    "asExplanation": "মাধ্যমিক শিক্ষাৰ সমস্যা অধ্যয়ন কৰি উন্নয়নৰ পৰামৰ্শ দিবলৈ এই আয়োগ গঠন কৰা হৈছিল।"
  },
  {
    "id": 4,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 2,
    "enQuestion": "Which educational level was directly studied by the Mudaliar Commission?",
    "asQuestion": "মুদালিয়াৰ আয়োগে প্ৰত্যক্ষভাৱে কোন শিক্ষাস্তৰ অধ্যয়ন কৰিছিল?",
    "enOptions": [
      "Primary Education",
      "Secondary Education",
      "University Education",
      "Adult Education"
    ],
    "asOptions": [
      "প্ৰাথমিক শিক্ষা",
      "মাধ্যমিক শিক্ষা",
      "বিশ্ববিদ্যালয় শিক্ষা",
      "প্ৰাপ্তবয়স্ক শিক্ষা"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission specifically examined the structure, curriculum and problems of secondary education.",
    "asExplanation": "আয়োগে মাধ্যমিক শিক্ষাৰ গঠন, পাঠ্যক্ৰম আৰু সমস্যাসমূহ অধ্যয়ন কৰিছিল।"
  },
  {
    "id": 5,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 3,
    "enQuestion": "Which defect of secondary education was strongly criticized by the Mudaliar Commission?",
    "asQuestion": "মুদালিয়াৰ আয়োগে মাধ্যমিক শিক্ষাৰ কোন ত্ৰুটিটোক তীব্ৰভাৱে সমালোচনা কৰিছিল?",
    "enOptions": [
      "Excessive practical work",
      "Bookish and examination-oriented education",
      "Excessive sports activities",
      "Lack of libraries"
    ],
    "asOptions": [
      "অত্যাধিক ব্যৱহাৰিক কাম",
      "পুথিগত আৰু পৰীক্ষাকেন্দ্ৰিক শিক্ষা",
      "অত্যাধিক ক্ৰীড়া কাৰ্যসূচী",
      "পুথিভঁৰালৰ অভাৱ"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission believed that education had become too book-centered and examination-driven.",
    "asExplanation": "আয়োগৰ মতে শিক্ষা অত্যাধিক পুথিগত আৰু পৰীক্ষামুখী হৈ পৰিছিল।"
  }
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
