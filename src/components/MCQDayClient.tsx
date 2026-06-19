"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle, HelpCircle, Flame, Zap, Target, Award, ArrowLeft as ArrowLeftIcon, ArrowRight, RotateCcw, LayoutGrid, BookOpen } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useStudent } from "@/context/StudentContext";

interface MCQ {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface MCQDayClientProps {
  enMcqs: MCQ[];
  asMcqs: MCQ[];
  unitId: string;
  dayId: string;
  dayNumber: number;
  unitNumberKey: string;
  unitTitleEn: string;
  unitTitleAs: string;
}

export default function MCQDayClient({
  enMcqs,
  asMcqs,
  unitId,
  dayId,
  dayNumber,
  unitNumberKey,
  unitTitleEn,
  unitTitleAs,
}: MCQDayClientProps) {
  const { language, formatNumber } = useLanguage();
  const { awardXP, totalXP, currentStreak, checkAndAwardBadges } = useStudent();
  const [mounted, setMounted] = useState(false);

  // Stepper navigation and quiz stats
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });
  const [showJumpMenu, setShowJumpMenu] = useState(false);

  const isEn = language === "en";
  const activeMcqs = isEn ? enMcqs : asMcqs;
  const activeMCQ = activeMcqs[currentIndex];

  useEffect(() => {
    setMounted(true);
    // Load progress from localStorage
    const savedProgress = localStorage.getItem("julfy-mcq-progress");
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        const record = parsed[`${unitId}-${dayId}`];
        if (record && record.answers) {
          setSelectedAnswers(record.answers);
          setStats({ correct: record.score, wrong: record.total - record.score });
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [unitId, dayId]);

  const handleSelectOption = (mcqId: number, optionIndex: number, correctIndex: number) => {
    if (selectedAnswers[mcqId] !== undefined) return;
    
    const newAnswers = { ...selectedAnswers, [mcqId]: optionIndex };
    setSelectedAnswers(newAnswers);

    const isCorrect = optionIndex === correctIndex;
    const newStats = { ...stats };

    if (isCorrect) {
      newStats.correct += 1;
      setStats(newStats);
      try {
        awardXP("MCQ_CORRECT_FIRST_TRY", `MCQ: ${unitId}-${dayId}-${mcqId}`);
      } catch (e) {
        console.error(e);
      }
    } else {
      newStats.wrong += 1;
      setStats(newStats);
    }

    // Check if day set is complete
    if (Object.keys(newAnswers).length === activeMcqs.length) {
      try {
        awardXP("COMPLETE_MCQ_SET", `${unitId}-${dayId}`);
        if (typeof checkAndAwardBadges === "function") {
          checkAndAwardBadges();
        }
      } catch (e) {
        console.error(e);
      }

      // Save to localStorage
      const savedProgress = localStorage.getItem("julfy-mcq-progress") || "{}";
      try {
        const progressObj = JSON.parse(savedProgress);
        progressObj[`${unitId}-${dayId}`] = {
          score: newStats.correct,
          total: activeMcqs.length,
          answers: newAnswers,
          completedAt: new Date().toISOString(),
        };
        localStorage.setItem("julfy-mcq-progress", JSON.stringify(progressObj));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const resetPractice = () => {
    if (window.confirm(isEn ? "Reset practice session?" : "অনুশীলন পুনৰাৰম্ভ কৰিবনে?")) {
      setSelectedAnswers({});
      setStats({ correct: 0, wrong: 0 });
      setCurrentIndex(0);
      try {
        const savedProgress = localStorage.getItem("julfy-mcq-progress");
        if (savedProgress) {
          const progressObj = JSON.parse(savedProgress);
          delete progressObj[`${unitId}-${dayId}`];
          localStorage.setItem("julfy-mcq-progress", JSON.stringify(progressObj));
        }
      } catch {}
    }
  };

  if (!mounted) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center text-sm text-slate-400">
        {isEn ? "Loading MCQ Practice..." : "অপেক্ষা কৰক..."}
      </div>
    );
  }

  const optionPrefixes = isEn ? ["A. ", "B. ", "C. ", "D. "] : ["ক. ", "খ. ", "গ. ", "ঘ. "];
  const unitBadge = isEn ? `Unit ${unitNumberKey}` : `গোট ${formatNumber(unitNumberKey)}`;
  const dayBadgeText = isEn ? `Day ${dayNumber}` : `দিন ${formatNumber(dayNumber)}`;

  const prevDay = dayNumber > 1 ? `day${dayNumber - 1}` : null;
  const nextDay = dayNumber < 20 ? `day${dayNumber + 1}` : null;

  const totalAnswered = Object.keys(selectedAnswers).length;
  const totalInSet = activeMcqs.length;
  const completionPercentage = totalInSet > 0 ? Math.round((totalAnswered / totalInSet) * 100) : 0;
  const accuracy = totalAnswered > 0 ? Math.round((stats.correct / totalAnswered) * 100) : 100;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-6 animate-fade-in text-slate-100">
      
      {/* Top Header Links */}
      <div className="flex items-center justify-between">
        <Link
          href="/mcq"
          className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {isEn ? "Back to MCQ Bank" : "MCQ বেংকলৈ ঘূৰি যাওক"}
        </Link>

        <Link
          href={`/notes/${unitId}/${dayId}?tab=notes`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-purple-500/20 text-xs font-bold text-purple-300 bg-purple-500/5 hover:bg-purple-500/15"
        >
          <BookOpen className="h-3.5 w-3.5" />
          {isEn ? "Read Study Notes" : "পাঠ্য টোকা পঢ়ক"}
        </Link>
      </div>

      {/* Stats Dashboard */}
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

        <div className="flex items-center gap-3 p-2">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Accuracy</p>
            <p className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">{accuracy}%</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-semibold">Score</p>
            <p className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-300">{stats.correct} / {totalInSet}</p>
          </div>
        </div>
      </div>

      {/* Progress indicators */}
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

      {/* Question Card */}
      {activeMCQ ? (
        <div className="relative group">
          <div className="bg-slate-950/80 backdrop-blur-md border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] rounded-3xl p-6 md:p-8 space-y-6 transition-all duration-300">
            
            {/* Header tags */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full">
                  {unitBadge} • {isEn ? unitTitleEn : unitTitleAs}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-900 text-slate-400 border border-slate-800 px-2 py-0.5 rounded-full">
                  {dayBadgeText}
                </span>
              </div>
              <span className="text-xs font-bold text-purple-400">
                Question {currentIndex + 1} of {totalInSet}
              </span>
            </div>

            {/* Question Text */}
            <h2 className={`font-semibold tracking-tight text-slate-100 ${!isEn ? "text-xl md:text-2xl leading-relaxed font-bold" : "text-lg md:text-xl leading-snug"}`}>
              {activeMCQ.question}
            </h2>

            {/* Options block */}
            <div className="space-y-3">
              {activeMCQ.options.map((option, idx) => {
                const answerIndex = selectedAnswers[activeMCQ.id];
                const answered = answerIndex !== undefined;
                const isSelected = answerIndex === idx;
                const isCorrect = activeMCQ.correct === idx;

                let optClass = "border-purple-500/20 bg-slate-900/40 hover:bg-purple-900/10 hover:border-purple-500/50 text-slate-300";
                
                if (answered) {
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
                    disabled={answered}
                    onClick={() => handleSelectOption(activeMCQ.id, idx, activeMCQ.correct)}
                    className={`w-full text-left p-4 rounded-2xl border text-sm md:text-base flex items-center justify-between transition-all duration-200 ${optClass}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-extrabold text-purple-400 bg-purple-500/10 h-7 w-7 rounded-lg flex items-center justify-center border border-purple-500/20 shrink-0">
                        {optionPrefixes[idx].replace(". ", "")}
                      </span>
                      <span className="leading-relaxed">{option}</span>
                    </span>
                    {answered && isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 ml-2" />}
                    {answered && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-rose-400 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {selectedAnswers[activeMCQ.id] !== undefined && (
              <div className="border-t border-purple-500/20 pt-5 space-y-4 animate-fade-in">
                <div className="flex items-start gap-3 bg-purple-500/5 border border-purple-500/20 rounded-2xl p-4">
                  <HelpCircle className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-xs font-black uppercase tracking-wider text-purple-300">Explanation</span>
                    <p className="text-xs md:text-sm leading-relaxed text-slate-300">
                      {activeMCQ.explanation}
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
              <ChevronLeft className="h-4 w-4" /> Previous
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
                  {activeMcqs.map((item, idx) => {
                    const status = selectedAnswers[item.id];
                    let btnBg = "bg-slate-900 text-slate-400 border-slate-800";
                    if (status !== undefined) {
                      const isCorrect = item.correct === status;
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
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}

      {/* Reset practice stats container */}
      <div className="flex justify-center">
        <button
          onClick={resetPractice}
          className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-rose-400/80 hover:text-rose-400 hover:underline transition-colors"
        >
          <RotateCcw className="h-3 w-3" /> Reset Practice Session
        </button>
      </div>

      {/* Navigation Footer */}
      <div className="border-t border-purple-500/20 pt-6 flex items-center justify-between">
        {prevDay ? (
          <Link
            href={`/mcq/${unitId}/${prevDay}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-purple-500/20 px-4 py-2 text-xs font-semibold hover:bg-purple-500/10 transition-colors text-purple-300"
          >
            <ChevronLeft className="h-4 w-4" />
            {isEn ? `Day ${dayNumber - 1}` : `দিন ${formatNumber(dayNumber - 1)}`}
          </Link>
        ) : (
          <div />
        )}

        {nextDay ? (
          <Link
            href={`/mcq/${unitId}/${nextDay}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-purple-500/20 px-4 py-2 text-xs font-semibold hover:bg-purple-500/10 transition-colors text-purple-300"
          >
            {isEn ? `Day ${dayNumber + 1}` : `দিন ${formatNumber(dayNumber + 1)}`}
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <div />
        )}
      </div>

    </div>
  );
}

// Simple layout stub icons since we switched them out
const ChevronLeft = ({ className }: { className?: string }) => <ArrowLeftIcon className={className} />;
const ChevronRight = ({ className }: { className?: string }) => <ArrowRight className={className} />;
