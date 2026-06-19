"use client";

import { useState, useEffect } from "react";
import { Search, HelpCircle, Filter, Zap, Flame, Target, Award, ArrowLeft, ArrowRight, RotateCcw, LayoutGrid, CheckCircle2, XCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useStudent } from "@/context/StudentContext";

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
      "অत्याধিক ব্যৱহাৰিক কাম",
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
  const { awardXP, totalXP, currentStreak, checkAndAwardBadges } = useStudent();

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<string>("all");
  const [selectedDay, setSelectedDay] = useState<string>("all");

  // Quiz navigation and stats states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersState, setAnswersState] = useState<Record<number, number>>({});
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });
  const [showJumpMenu, setShowJumpMenu] = useState(false);

  // Filter logic
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

  // Reset index when filters or search change
  useEffect(() => {
    setCurrentIndex(0);
  }, [searchQuery, selectedUnit, selectedDay]);

  const activeMCQ = filteredMCQs[currentIndex];

  const handleSelectOption = (mcqId: number, optionIndex: number, correctIndex: number) => {
    if (answersState[mcqId] !== undefined) return;
    
    setAnswersState((prev) => ({ ...prev, [mcqId]: optionIndex }));
    const isCorrect = optionIndex === correctIndex;

    if (isCorrect) {
      setStats((prev) => ({ ...prev, correct: prev.correct + 1 }));
      try {
        awardXP("MCQ_CORRECT_FIRST_TRY", `mcq-${mcqId}`);
        checkAndAwardBadges();
      } catch (e) {
        console.error("XP System integration error:", e);
      }
    } else {
      setStats((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
    }
  };

  const resetAllProgress = () => {
    if (window.confirm("Reset your current practice session? This will not clear your overall profile XP.")) {
      setAnswersState({});
      setStats({ correct: 0, wrong: 0 });
      setCurrentIndex(0);
    }
  };

  const totalAnswered = Object.keys(answersState).length;
  const totalInSet = filteredMCQs.length;
  const completionPercentage = totalInSet > 0 ? Math.round((totalAnswered / totalInSet) * 100) : 0;
  const accuracy = totalAnswered > 0 ? Math.round((stats.correct / totalAnswered) * 100) : 100;

  const uniqueUnits = Array.from(new Set(mcqData.map((m) => m.unitId))).map((id) => {
    const original = mcqData.find((m) => m.unitId === id);
    return {
      id,
      label: language === "en" ? original?.enUnitNumber : original?.asUnitNumber,
    };
  });

  const optionPrefixes = language === "en" ? ["A. ", "B. ", "C. ", "D. "] : ["ক. ", "খ. ", "গ. ", "ঘ. "];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-6 animate-fade-in text-slate-100">
      
      {/* Quiz Dashboard / Header stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-950/40 border border-purple-500/20 backdrop-blur-md rounded-2xl p-4 shadow-lg">
        <div className="flex items-center gap-3 p-2">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Zap className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total XP</p>
            <p className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">{totalXP} XP</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
            <Flame className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Streak</p>
            <p className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">{currentStreak} Days</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 col-span-1">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Accuracy</p>
            <p className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">{accuracy}%</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 col-span-1">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Correct</p>
            <p className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-300">{stats.correct} / {totalAnswered}</p>
          </div>
        </div>
      </div>

      {/* Controls / Filter Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center rounded-2xl border border-purple-500/10 bg-slate-950/20 p-4 backdrop-blur-sm">
        <div className="sm:col-span-6 relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={t("searchPlaceholder") || "Search Practice Mode..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-purple-500/10 bg-slate-950/60 py-2 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/30"
          />
        </div>
        <div className="sm:col-span-3">
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="w-full rounded-xl border border-purple-500/10 bg-slate-950/60 py-2 px-3 text-xs text-slate-200 focus:border-purple-500/50 focus:outline-none"
          >
            <option value="all">{t("allUnits") || "All Units"}</option>
            {uniqueUnits.map((u) => (
              <option key={u.id} value={u.id}>{u.label}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-3">
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="w-full rounded-xl border border-purple-500/10 bg-slate-950/60 py-2 px-3 text-xs text-slate-200 focus:border-purple-500/50 focus:outline-none"
          >
            <option value="all">{t("allDays") || "All Days"}</option>
            {Array.from({ length: 20 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {t("dayBadge") || "Day"} {formatNumber(i + 1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Progress & Stepper Panel */}
      {totalInSet > 0 && (
        <div className="space-y-2 bg-slate-950/30 border border-purple-500/10 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>Quiz Progress</span>
            <span>{completionPercentage}% Complete ({totalAnswered} of {totalInSet} Answered)</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-purple-500/10">
            <div
              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Active Question Display (Single Mode) */}
      {activeMCQ ? (
        <div className="relative group">
          {/* Neon Glow Card */}
          <div className="bg-slate-950/80 backdrop-blur-md border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] rounded-3xl p-6 md:p-8 space-y-6 transition-all duration-300">
            
            {/* Meta Tags */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full">
                  {language === "en" ? activeMCQ.enUnitNumber : activeMCQ.asUnitNumber}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-900 text-slate-400 border border-slate-800 px-2 py-0.5 rounded-full">
                  {t("dayBadge") || "Day"} {formatNumber(activeMCQ.dayNumber)}
                </span>
              </div>
              <span className="text-xs font-bold text-purple-400">
                Question {currentIndex + 1} of {totalInSet}
              </span>
            </div>

            {/* Question Text (Large Assamese Typography supported) */}
            <h2 className={`font-semibold tracking-tight text-slate-100 ${language === "as" ? "text-xl md:text-2xl leading-relaxed font-bold" : "text-lg md:text-xl leading-snug"}`}>
              {language === "en" ? activeMCQ.enQuestion : activeMCQ.asQuestion}
            </h2>

            {/* Options block */}
            <div className="space-y-3">
              {(language === "en" ? activeMCQ.enOptions : activeMCQ.asOptions).map((option, idx) => {
                const answerIndex = answersState[activeMCQ.id];
                const isAnswered = answerIndex !== undefined;
                const isSelected = answerIndex === idx;
                const isCorrect = activeMCQ.correctIndex === idx;

                let optClass = "border-purple-500/20 bg-slate-900/40 hover:bg-purple-900/10 hover:border-purple-500/50 text-slate-300";
                
                if (isAnswered) {
                  if (isCorrect) {
                    optClass = "border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)] font-bold";
                  } else if (isSelected) {
                    optClass = "border-rose-500 bg-rose-500/20 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.25)] font-bold";
                  } else {
                    optClass = "border-slate-800 bg-slate-950/40 text-slate-600 opacity-40";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(activeMCQ.id, idx, activeMCQ.correctIndex)}
                    className={`w-full text-left p-4 rounded-2xl border text-sm md:text-base flex items-center justify-between transition-all duration-200 ${optClass}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-extrabold text-purple-400 bg-purple-500/10 h-7 w-7 rounded-lg flex items-center justify-center border border-purple-500/20 shrink-0">
                        {optionPrefixes[idx].replace(". ", "")}
                      </span>
                      <span className="leading-relaxed">{option}</span>
                    </span>
                    {isAnswered && isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 ml-2" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-rose-400 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>

            {/* Instant Feedback Panel & Explanation */}
            {answersState[activeMCQ.id] !== undefined && (
              <div className="border-t border-purple-500/20 pt-5 space-y-4 animate-fade-in">
                <div className="flex items-start gap-3 bg-purple-500/5 border border-purple-500/20 rounded-2xl p-4">
                  <HelpCircle className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-xs font-black uppercase tracking-wider text-purple-300">Explanation</span>
                    <p className="text-xs md:text-sm leading-relaxed text-slate-300">
                      {language === "en" ? activeMCQ.enExplanation : activeMCQ.asExplanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stepper Navigation bar */}
          <div className="flex items-center justify-between mt-6 bg-slate-950/40 border border-purple-500/10 rounded-2xl p-4">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Previous
            </button>

            {/* Jump Menu Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowJumpMenu(!showJumpMenu)}
                className="flex items-center gap-2 bg-slate-900 border border-purple-500/20 hover:border-purple-500/40 text-xs font-bold uppercase tracking-wider text-slate-300 px-3.5 py-2 rounded-xl transition-all"
              >
                <LayoutGrid className="h-3.5 w-3.5" /> Jump To ({currentIndex + 1} / {totalInSet})
              </button>

              {showJumpMenu && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 bg-slate-950 border border-purple-500/30 rounded-2xl p-4 shadow-2xl z-50 grid grid-cols-5 gap-2 max-h-48 overflow-y-auto">
                  {filteredMCQs.map((item, idx) => {
                    const status = answersState[item.id];
                    let btnBg = "bg-slate-900 text-slate-400 border-slate-800";
                    if (status !== undefined) {
                      const isCorrect = item.correctIndex === status;
                      btnBg = isCorrect 
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
                        : "bg-rose-500/20 text-rose-400 border-rose-500/30";
                    }
                    if (currentIndex === idx) {
                      btnBg += " ring-2 ring-purple-500 ring-offset-2 ring-offset-slate-950";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setCurrentIndex(idx);
                          setShowJumpMenu(false);
                        }}
                        className={`h-9 w-9 rounded-lg border text-xs font-bold flex items-center justify-center transition-all ${btnBg}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              disabled={currentIndex === totalInSet - 1}
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              Next <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Empty/Filtered Out State */
        <div className="text-center py-16 border border-dashed border-purple-500/20 rounded-3xl bg-slate-950/20 backdrop-blur-sm space-y-4">
          <Filter className="h-8 w-8 text-purple-400/60 mx-auto animate-bounce" />
          <h3 className="font-heading text-lg font-bold text-slate-200">
            {t("noQuestions") || "No practice questions found"}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto px-4">
            {t("noQuestionsDesc") || "Try clearing the search query or changing filters to start practicing."}
          </p>
        </div>
      )}

      {/* Reset practice stats container */}
      <div className="flex justify-center">
        <button
          onClick={resetAllProgress}
          className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-rose-400/80 hover:text-rose-400 hover:underline transition-colors"
        >
          <RotateCcw className="h-3 w-3" /> Reset Quiz Session
        </button>
      </div>

    </div>
  );
}
