"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Download, Timer, Play, Pause, RotateCcw, AlertTriangle, CheckCircle2, Trophy, HelpCircle, XCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useStudent } from "@/context/StudentContext";
import { testsQuestions, TestQuestion } from "@/data/testsQuestions";

interface TestPaper {
  id: number;
  enTitle: string;
  asTitle: string;
  category: "unit" | "model" | "mock" | "board";
  enCategoryLabel: string;
  asCategoryLabel: string;
  fullMarks: number;
  timeLimitMinutes: number;
  enSyllabus: string;
  asSyllabus: string;
  isPremium: boolean;
}

const testPapers: TestPaper[] = [
  {
    id: 1,
    enTitle: "Unit I & II Diagnostic Test Paper",
    asTitle: "প্ৰথম আৰু দ্বিতীয় গোটৰ মূল্যায়ন পত্ৰ",
    category: "unit",
    enCategoryLabel: "Unit Test",
    asCategoryLabel: "গোট পৰীক্ষা",
    fullMarks: 50,
    timeLimitMinutes: 90,
    enSyllabus: "Secondary Education history in post-independence India and non-formal correspondence structures.",
    asSyllabus: "স্বাধীনোত্তৰ ভাৰতৰ মাধ্যমিক শিক্ষাৰ ইতিহাস আৰু অনানুষ্ঠানিক পত্ৰযোগ শিক্ষাৰ গাঁথনিসমূহ।",
    isPremium: false,
  },
  {
    id: 2,
    enTitle: "Unit III & IV Mid-Term Review",
    asTitle: "তৃতীয় আৰু চতুৰ্থ গোটৰ পৰীক্ষা প্ৰশ্নকাকত",
    category: "unit",
    enCategoryLabel: "Unit Test",
    asCategoryLabel: "গোট পৰীক্ষা",
    fullMarks: 50,
    timeLimitMinutes: 90,
    enSyllabus: "Current trends (Value & Physical education) and Thorndike/Pavlov learning theories.",
    asSyllabus: "শিক্ষাৰ সাম্প্ৰতিক ধাৰা (মূল্যবোধ আৰু শাৰীৰিক শিক্ষা) আৰু থৰ্নডাইক/পাভলভৰ শিকন সূত্ৰসমূহ।",
    isPremium: false,
  },
  {
    id: 3,
    enTitle: "Education Full Syllabus Model Test A",
    asTitle: "শিক্ষা বিষয়ৰ সম্পূৰ্ণ পাঠ্যক্ৰম আৰ্হি পৰীক্ষা ক",
    category: "model",
    enCategoryLabel: "Model Test",
    asCategoryLabel: "আৰ্হি পৰীক্ষা",
    fullMarks: 100,
    timeLimitMinutes: 180,
    enSyllabus: "Comprehensive Class 12 Education (AHSEC) curriculum coverage.",
    asSyllabus: "দ্বাদশ শ্ৰেণীৰ শিক্ষা বিষয়ৰ (AHSEC) সম্পূৰ্ণ পাঠ্যক্ৰমৰ সামগ্ৰিক মূল্যায়ন।",
    isPremium: false,
  },
  {
    id: 4,
    enTitle: "Education Full Syllabus Model Test B",
    asTitle: "শিক্ষা বিষয়ৰ সম্পূৰ্ণ পাঠ্যক্ৰম আৰ্হি পৰীক্ষা খ",
    category: "model",
    enCategoryLabel: "Model Test",
    asCategoryLabel: "আৰ্হি পৰীক্ষা",
    fullMarks: 100,
    timeLimitMinutes: 180,
    enSyllabus: "Comprehensive Class 12 Education (AHSEC) curriculum with heavy emphasis on statistics.",
    asSyllabus: "দ্বাদশ শ্ৰেণীৰ শিক্ষা বিষয়ৰ পাঠ্যক্ৰম, বিশেষকৈ পৰিসংখ্যাৰ গণনাসমূহৰ ওপৰত গুৰুত্ব।",
    isPremium: true,
  },
  {
    id: 5,
    enTitle: "AHSEC Mock Ranker Test (Mock A)",
    asTitle: "AHSEC মক ৰেংকাৰ পৰীক্ষা ক",
    category: "mock",
    enCategoryLabel: "Mock Test",
    asCategoryLabel: "মক পৰীক্ষা",
    fullMarks: 100,
    timeLimitMinutes: 180,
    enSyllabus: "Real-time replica of the Assam Higher Secondary final exam layout.",
    asSyllabus: "অসম উচ্চতৰ মাধ্যমিক চূড়ান্ত পৰীক্ষাৰ হুবহু আৰ্হি প্ৰশ্নকাকত।",
    isPremium: false,
  },
  {
    id: 6,
    enTitle: "AHSEC Mock Ranker Test (Mock B)",
    asTitle: "AHSEC মক ৰেংকাৰ পৰীক্ষা খ",
    category: "mock",
    enCategoryLabel: "Mock Test",
    asCategoryLabel: "মক পৰীক্ষা",
    fullMarks: 100,
    timeLimitMinutes: 180,
    enSyllabus: "Advanced conceptual replica mapping high-yield psychology and memory topics.",
    asSyllabus: "উচ্চমানৰ ধাৰণামূলক প্ৰশ্নকাকত (মনোবিজ্ঞান আৰু স্মৃতি বিষয়ৰ গুৰুত্ব)।",
    isPremium: true,
  },
  {
    id: 7,
    enTitle: "Julfy's 2026 Board Prediction Paper",
    asTitle: "শিক্ষক জুলফীৰ ২০২৬ চনৰ সম্ভাব্য প্ৰশ্নকাকত",
    category: "board",
    enCategoryLabel: "Board Prediction",
    asCategoryLabel: "বোৰ্ড পূৰ্বানুমান",
    fullMarks: 100,
    timeLimitMinutes: 180,
    enSyllabus: "High-probability predicted question patterns for the upcoming board finals.",
    asSyllabus: "অনাগত চূড়ান্ত পৰীক্ষাৰ বাবে অতি সম্ভাব্য প্ৰশ্ন আৰু উত্তৰৰ বিশ্লেষণ।",
    isPremium: true,
  },
];

export default function TestsPage() {
  const { t, language, formatNumber } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeTimerPaper, setActiveTimerPaper] = useState<TestPaper | null>(null);
  
  // Timer States
  const [timeLeft, setTimeLeft] = useState<number>(0); // in seconds
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  // Assessment Engine States
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [examScore, setExamScore] = useState<number | null>(null);

  // Get active test questions
  const activeQuestions = useMemo<TestQuestion[]>(() => {
    if (!activeTimerPaper) return [];
    return testsQuestions[activeTimerPaper.id] || [];
  }, [activeTimerPaper]);

  const evaluateExam = useCallback(() => {
    setTimerRunning(false);
    setExamSubmitted(true);
    let score = 0;
    activeQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correct) {
        score++;
      }
    });
    setExamScore(score);
  }, [activeQuestions, userAnswers]);

  // Handle active test countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerRunning) {
      setTimerRunning(false);
      evaluateExam();
      alert(language === "en" ? `Time is up! Your exam paper has been submitted.` : `সময় সমাপ্ত হ'ল! আপোনাৰ পৰীক্ষা বহী জমা কৰা হৈছে।`);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timeLeft, language, evaluateExam]);

  const { awardXP } = useStudent();

  const startTimerConsole = (paper: TestPaper) => {
    // Check if another exam is running
    if (activeTimerPaper && activeTimerPaper.id !== paper.id) {
      const confirmChange = window.confirm(
        language === "en" 
          ? "Another exam is currently active. Do you want to cancel it and start this one?" 
          : "ইতিমধ্যে এটা পৰীক্ষা সক্ৰিয় হৈ আছে। আপুনি সেইটো বাতিল কৰি নতুনটো আৰম্ভ কৰিব বিচাৰে নেকি?"
      );
      if (!confirmChange) return;
    }
    
    // Award mock test XP points
    awardXP("TAKE_TIMED_TEST", `Mock Test ID: ${paper.id}`);

    setActiveTimerPaper(paper);
    setTimeLeft(paper.timeLimitMinutes * 60);
    setTimerRunning(true);
    setUserAnswers({});
    setExamSubmitted(false);
    setExamScore(null);
  };

  const stopTimerConsole = () => {
    const confirmExit = window.confirm(
      language === "en" 
        ? "Are you sure you want to end this exam session? Any unsaved progress will be lost." 
        : "আপুনি নিশ্চিতনে যে এই পৰীক্ষাটো বন্ধ কৰিব বিচাৰে? কৰা উত্তৰসমূহ নোহোৱা হব।"
    );
    if (!confirmExit) return;

    setTimerRunning(false);
    setActiveTimerPaper(null);
    setUserAnswers({});
    setExamSubmitted(false);
    setExamScore(null);
  };

  const triggerDownload = (title: string) => {
    const successMsg = language === "en" 
      ? `Success! Initiated download for: ${title}`
      : `সফল হ'ল! ডাউনলোড প্ৰক্ৰিয়া আৰম্ভ হৈছে: ${title}`;
    setDownloadSuccessMessage(successMsg);
    setTimeout(() => {
      setDownloadSuccessMessage(null);
    }, 4000);
  };

  // Formatting seconds to HH:MM:SS with language numerals
  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    
    const pad = (v: number) => v.toString().padStart(2, "0");
    const hStr = formatNumber(pad(h));
    const mStr = formatNumber(pad(m));
    const sStr = formatNumber(pad(s));
    
    return `${hStr}:${mStr}:${sStr}`;
  };

  const filteredPapers = activeCategory === "all"
    ? testPapers
    : testPapers.filter((p) => p.category === activeCategory);

  const categories = [
    { id: "all", name: t("allPapersTab") },
    { id: "unit", name: t("unitTestsTab") },
    { id: "model", name: t("modelTestsTab") },
    { id: "mock", name: t("mockExamsTab") },
    { id: "board", name: t("boardPredsTab") },
  ];

  const handleSelectOption = (qId: number, optIdx: number) => {
    if (examSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const optionPrefixes = language === "en" ? ["A. ", "B. ", "C. ", "D. "] : ["ক. ", "খ. ", "গ. ", "ঘ. "];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10 animate-fade-in">
      
      {/* Page Header */}
      <div className="space-y-2 text-center md:text-left">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          {t("testsHeader")}
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          {t("testsSub")}
        </p>
      </div>

      {/* Mock Download Toast */}
      {downloadSuccessMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-emerald-500 text-white px-4 py-3 rounded-xl shadow-lg animate-bounce text-sm">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{downloadSuccessMessage}</span>
        </div>
      )}

      {/* Grid: Main Section vs Timer Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Category filter tabs & List OR active exam workspace */}
        <div className="lg:col-span-8 space-y-6">
          
          {!activeTimerPaper ? (
            <>
              {/* Navigation Category Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-border pb-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                      activeCategory === cat.id
                        ? "bg-indigo-600 text-white dark:bg-indigo-500"
                        : "bg-muted text-muted-foreground hover:bg-border hover:text-foreground"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Papers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPapers.map((paper) => {
                  const titleText = language === "en" ? paper.enTitle : paper.asTitle;
                  const syllabusText = language === "en" ? paper.enSyllabus : paper.asSyllabus;
                  const categoryLabelText = language === "en" ? paper.enCategoryLabel : paper.asCategoryLabel;

                  return (
                    <div
                      key={paper.id}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-indigo-500/20 transition-all duration-200"
                    >
                      {paper.isPremium && (
                        <div className="absolute right-0 top-0 bg-gradient-to-l from-purple-600 to-indigo-600 text-[9px] font-bold uppercase tracking-widest text-white px-4 py-1 rounded-bl-xl shadow-sm">
                          {t("premiumBadge")}
                        </div>
                      )}

                      <div className="space-y-4">
                        {/* Category Info */}
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                          {categoryLabelText}
                        </span>

                        {/* Title */}
                        <h3 className="font-heading text-lg font-bold text-foreground leading-snug">
                          {titleText}
                        </h3>

                        {/* Syllabus / Content */}
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {syllabusText}
                        </p>

                        {/* Metadata Indicators */}
                        <div className="flex items-center gap-4 text-xs font-semibold text-foreground/80">
                          <span className="bg-muted px-2.5 py-1 rounded-lg">
                            {t("marksLabel")}: {formatNumber(paper.fullMarks)}
                          </span>
                          <span className="bg-muted px-2.5 py-1 rounded-lg flex items-center gap-1">
                            <Timer className="h-3.5 w-3.5 text-indigo-500" />
                            {formatNumber(paper.timeLimitMinutes)} {t("minsLabel")}
                          </span>
                        </div>
                      </div>

                      {/* Actions Panel */}
                      <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-3">
                        <button
                          onClick={() => triggerDownload(titleText)}
                          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background py-2 text-xs font-bold text-foreground hover:bg-muted transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          {t("downloadPaper")}
                        </button>
                        <button
                          onClick={() => startTimerConsole(paper)}
                          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 text-white dark:bg-indigo-500 py-2 text-xs font-bold hover:opacity-90 transition-opacity"
                        >
                          <Play className="h-3.5 w-3.5 fill-current" />
                          {t("liveSimulation")}
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            /* Active Exam Workspace */
            <div className="space-y-8 animate-fade-in bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {language === "en" ? activeTimerPaper.enCategoryLabel : activeTimerPaper.asCategoryLabel} &bull; {language === "en" ? "Live Examination" : "সক্ৰিয় পৰীক্ষা"}
                  </span>
                  <h2 className="font-heading text-2xl font-black text-foreground mt-1">
                    {language === "en" ? activeTimerPaper.enTitle : activeTimerPaper.asTitle}
                  </h2>
                </div>
                {examSubmitted && (
                  <button
                    onClick={() => {
                      setActiveTimerPaper(null);
                      setUserAnswers({});
                      setExamSubmitted(false);
                      setExamScore(null);
                    }}
                    className="rounded-xl border border-border px-4 py-2 text-xs font-bold hover:bg-muted text-foreground transition-colors self-start sm:self-center"
                  >
                    {language === "en" ? "Exit Exam Mode" : "পৰীক্ষাৰ পৰা ওলাই যাওক"}
                  </button>
                )}
              </div>

              {/* Exam Score card details */}
              {examSubmitted && examScore !== null && (
                <div className="bg-indigo-500/5 border border-indigo-500/20 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-1 text-center sm:text-left">
                    <h3 className="font-heading text-lg font-bold text-foreground flex items-center justify-center sm:justify-start gap-1.5">
                      <Trophy className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      {language === "en" ? "Exam Completed!" : "পৰীক্ষা সমাপ্ত!"}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {language === "en" 
                        ? "Congratulations on taking the test. Review your performance below." 
                        : "পৰীক্ষাত অংশগ্ৰহণ কৰাৰ বাবে ধন্যবাদ। তলত আপোনাৰ উত্তৰসমূহ মিলাই চাওক।"}
                    </p>
                  </div>
                  <div className="text-center bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-3 rounded-2xl shadow-sm">
                    <div className="text-2xl font-black font-mono">
                      {formatNumber(examScore)} / {formatNumber(activeQuestions.length)}
                    </div>
                    <span className="text-[9px] uppercase tracking-widest font-bold opacity-80">
                      {language === "en" ? "Total Score" : "লাভ কৰা নম্বৰ"}
                    </span>
                  </div>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-8">
                {activeQuestions.map((q, qIdx) => {
                  const qText = language === "en" ? q.qEn : q.qAs;
                  const opts = language === "en" ? q.optsEn : q.optsAs;
                  const exp = language === "en" ? q.expEn : q.expAs;

                  const userAnswer = userAnswers[q.id];

                  return (
                    <div key={q.id} className="space-y-4 border-b border-border/40 pb-6 last:border-0 last:pb-0">
                      <h3 className="text-base font-bold text-foreground leading-snug">
                        {formatNumber(qIdx + 1)}. {qText}
                      </h3>

                      <div className="grid grid-cols-1 gap-2.5">
                        {opts.map((opt, optIdx) => {
                          const isCorrect = q.correct === optIdx;
                          const isSelected = userAnswer === optIdx;

                          let btnStyle = "border-border hover:bg-muted text-foreground";
                          if (examSubmitted) {
                            if (isCorrect) {
                              btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold";
                            } else if (isSelected) {
                              btnStyle = "border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold";
                            } else {
                              btnStyle = "border-border opacity-60";
                            }
                          } else if (isSelected) {
                            btnStyle = "border-indigo-600 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 font-semibold";
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={examSubmitted}
                              onClick={() => handleSelectOption(q.id, optIdx)}
                              className={`w-full text-left p-3.5 rounded-xl border text-xs flex items-center justify-between transition-all ${btnStyle}`}
                            >
                              <span>
                                <span className="font-bold text-indigo-500 mr-1">{optionPrefixes[optIdx]}</span>
                                {opt}
                              </span>
                              {examSubmitted && (
                                isCorrect ? (
                                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                                ) : isSelected ? (
                                  <XCircle className="h-4.5 w-4.5 text-rose-500 shrink-0" />
                                ) : null
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation box */}
                      {examSubmitted && (
                        <div className="text-xs text-muted-foreground leading-relaxed bg-muted/60 p-4 rounded-xl border border-border/40 space-y-1 animate-fade-in">
                          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                            <HelpCircle className="h-3.5 w-3.5" />
                            <span>{t("explanation")}</span>
                          </div>
                          <p className="mt-1">{exp}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit Exam Button */}
              {!examSubmitted && (
                <div className="pt-6 border-t border-border flex justify-end">
                  <button
                    onClick={evaluateExam}
                    className="rounded-xl bg-indigo-600 text-white font-bold text-xs px-6 py-3 hover:bg-indigo-700 transition-colors shadow-md"
                  >
                    {language === "en" ? "Submit Exam" : "পৰীক্ষাৰ বহী জমা দিয়ক"}
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Side: Floating Simulated Exam Timer Console */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-md space-y-6">
            <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
              <Timer className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              {t("examTimer")}
            </h2>

            {activeTimerPaper ? (
              <div className="space-y-6">
                {/* Timer Banner info */}
                <div className="bg-indigo-50/50 dark:bg-indigo-950/20 p-4 rounded-2xl border border-indigo-500/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {t("activeSession")}
                  </span>
                  <h3 className="font-heading font-bold text-sm text-foreground mt-1 line-clamp-1">
                    {language === "en" ? activeTimerPaper.enTitle : activeTimerPaper.asTitle}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {t("limitLabel")}: {formatNumber(activeTimerPaper.timeLimitMinutes)} {t("minsLabel")}
                  </span>
                </div>

                {/* Big Counter Display */}
                <div className="text-center">
                  <div className="font-heading text-4xl font-black tracking-widest font-mono text-foreground">
                    {formatTime(timeLeft)}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mt-1 block">
                    {t("timeRemaining")}
                  </span>
                </div>

                {/* Clock Controls */}
                <div className="flex items-center gap-3 justify-center">
                  {!examSubmitted && (
                    <>
                      <button
                        onClick={() => setTimerRunning(!timerRunning)}
                        className={`flex h-10 w-10 items-center justify-center rounded-xl text-white transition-opacity hover:opacity-90 ${
                          timerRunning ? "bg-amber-500" : "bg-emerald-500"
                        }`}
                        aria-label={timerRunning ? "Pause timer" : "Play timer"}
                      >
                        {timerRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
                      </button>
                      <button
                        onClick={() => setTimeLeft(activeTimerPaper.timeLimitMinutes * 60)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground hover:bg-muted transition-colors"
                        aria-label="Reset timer"
                      >
                        <RotateCcw className="h-5 w-5" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={stopTimerConsole}
                    className="flex h-10 px-4 items-center justify-center rounded-xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-colors"
                  >
                    {examSubmitted ? (language === "en" ? "Close Exam" : "পৰীক্ষা বন্ধ কৰক") : t("endExam")}
                  </button>
                </div>

                {/* Warning Alert */}
                {!examSubmitted && (
                  <div className="flex items-start gap-2 text-[11px] text-amber-600 dark:text-amber-400 leading-relaxed bg-amber-500/5 p-3 rounded-xl border border-amber-500/20">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>
                      {t("timerAlertText")}
                    </span>
                  </div>
                )}

              </div>
            ) : (
              <div className="text-center py-10 space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Play className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-sm text-foreground">{t("noActiveExam")}</h3>
                  <p className="text-xs text-muted-foreground max-w-[200px] mx-auto leading-relaxed">
                    {t("noActiveExamDesc")}
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
