"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Trophy, BookOpen, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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
  const { language, t, formatNumber } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [savedScore, setSavedScore] = useState<{ score: number; total: number } | null>(null);

  const isEn = language === "en";
  const activeMcqs = isEn ? enMcqs : asMcqs;

  // Set difficulty tags based on question ID
  const getDifficulty = (id: number): { en: string; as: string; color: string } => {
    if (id % 3 === 1) return { en: "Easy", as: "সহজ", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" };
    if (id % 3 === 2) return { en: "Medium", as: "মধ্যম", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" };
    return { en: "Hard", as: "কঠিন", color: "bg-rose-500/10 text-rose-600 dark:text-rose-400" };
  };

  useEffect(() => {
    setMounted(true);
    // Load progress from localStorage
    const savedProgress = localStorage.getItem("julfy-mcq-progress");
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        const record = parsed[`${unitId}-${dayId}`];
        if (record) {
          setSavedScore({ score: record.score, total: record.total });
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [unitId, dayId]);

  const handleSelectOption = (mcqId: number, optionIndex: number) => {
    if (selectedAnswers[mcqId] !== undefined) return;
    
    const newAnswers = { ...selectedAnswers, [mcqId]: optionIndex };
    setSelectedAnswers(newAnswers);

    // If all questions are answered, compute and save score
    if (Object.keys(newAnswers).length === activeMcqs.length) {
      let score = 0;
      activeMcqs.forEach((mcq) => {
        if (newAnswers[mcq.id] === mcq.correct) {
          score++;
        }
      });

      const scoreRecord = { score, total: activeMcqs.length };
      setSavedScore(scoreRecord);

      // Save to localStorage
      const savedProgress = localStorage.getItem("julfy-mcq-progress") || "{}";
      try {
        const progressObj = JSON.parse(savedProgress);
        progressObj[`${unitId}-${dayId}`] = {
          score,
          total: activeMcqs.length,
          completedAt: new Date().toISOString(),
        };
        localStorage.setItem("julfy-mcq-progress", JSON.stringify(progressObj));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const resetPractice = () => {
    setSelectedAnswers({});
    setSavedScore(null);
    // Remove from localStorage
    try {
      const savedProgress = localStorage.getItem("julfy-mcq-progress");
      if (savedProgress) {
        const progressObj = JSON.parse(savedProgress);
        delete progressObj[`${unitId}-${dayId}`];
        localStorage.setItem("julfy-mcq-progress", JSON.stringify(progressObj));
      }
    } catch {}
  };

  if (!mounted) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center text-sm text-muted-foreground">
        Loading MCQ Practice...
      </div>
    );
  }

  const optionPrefixes = isEn ? ["A. ", "B. ", "C. ", "D. "] : ["ক. ", "খ. ", "গ. ", "ঘ. "];
  const unitBadge = isEn ? `Unit ${unitNumberKey}` : `গোট ${formatNumber(unitNumberKey)}`;
  const dayBadgeText = isEn ? `Day ${dayNumber}` : `দিন ${formatNumber(dayNumber)}`;

  const prevDay = dayNumber > 1 ? `day${dayNumber - 1}` : null;
  const nextDay = dayNumber < 20 ? `day${dayNumber + 1}` : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      {/* Top Header Link */}
      <div className="flex items-center justify-between">
        <Link
          href="/mcq"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {isEn ? "Back to MCQ Bank" : "MCQ বেংকলৈ ঘূৰি যাওক"}
        </Link>

        <Link
          href={`/notes/${unitId}/${dayId}?tab=notes`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/20"
        >
          <BookOpen className="h-3.5 w-3.5" />
          {isEn ? "Read Study Notes" : "পাঠ্য টোকা পঢ়ক"}
        </Link>
      </div>

      {/* Heading Block */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          {unitBadge} &bull; {isEn ? unitTitleEn : unitTitleAs}
        </span>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          {dayBadgeText} {isEn ? "Practice MCQs" : "MCQ অনুশীলন"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isEn
            ? "Test your comprehension with these 5 board-aligned multiple-choice questions. Score a perfect 5/5 to secure your topic mastery."
            : "এই ৫টা বোৰ্ড-সংগত বহু-বিকল্পী প্ৰশ্নৰে আপোনাৰ জ্ঞান পৰীক্ষা কৰক। বিষয়টো আয়ত্ত কৰিবলৈ সম্পূৰ্ণ ৫/৫ নম্বৰ লাভ কৰাৰ লক্ষ্য ৰাখক।"}
        </p>
      </div>

      {/* Score / Completion Banner */}
      {savedScore && (
        <div className="p-6 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-foreground">
                {isEn ? "Day Practice Completed!" : "দিনটোৰ অনুশীলন সম্পূৰ্ণ হৈছে!"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {isEn
                  ? `Your score: ${formatNumber(savedScore.score)} out of ${formatNumber(savedScore.total)}`
                  : `আপোনাৰ নম্বৰ: ${formatNumber(savedScore.total)} ৰ ভিতৰত ${formatNumber(savedScore.score)}`}
              </p>
            </div>
          </div>
          <button
            onClick={resetPractice}
            className="rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-600 dark:text-emerald-400 px-4 py-2 hover:bg-emerald-500/10 transition-colors shrink-0"
          >
            {isEn ? "Reset & Try Again" : "পুনৰ চেষ্টা কৰক"}
          </button>
        </div>
      )}

      {/* MCQs Practice List */}
      <div className="space-y-6">
        {activeMcqs.map((mcq, idx) => {
          const userAnswer = selectedAnswers[mcq.id];
          const answered = userAnswer !== undefined;
          const diff = getDifficulty(mcq.id);

          return (
            <div key={mcq.id} className="p-6 rounded-2xl border border-border bg-card/60 space-y-4">
              {/* Question Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground">
                  {isEn ? "Question" : "প্ৰশ্ন"} {formatNumber(idx + 1)}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${diff.color}`}>
                  {isEn ? diff.en : diff.as}
                </span>
              </div>

              {/* Question Text */}
              <h3 className="text-base font-bold text-foreground leading-snug font-sans">
                {mcq.question}
              </h3>

              {/* Options buttons */}
              <div className="grid grid-cols-1 gap-2.5">
                {mcq.options.map((opt, optIdx) => {
                  const isCorrect = mcq.correct === optIdx;
                  const isSelected = userAnswer === optIdx;

                  let optStyle = "border-border hover:bg-muted";
                  if (answered) {
                    if (isCorrect) {
                      optStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold";
                    } else if (isSelected) {
                      optStyle = "border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold";
                    } else {
                      optStyle = "border-border opacity-60";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={answered}
                      onClick={() => handleSelectOption(mcq.id, optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm flex items-center justify-between transition-all font-sans ${optStyle}`}
                    >
                      <span>
                        <span className="font-bold text-indigo-500 mr-1">{optionPrefixes[optIdx]}</span>
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation block */}
              {answered && (
                <div className="flex items-start gap-2.5 bg-muted/40 rounded-xl p-4 border border-border/40 text-xs sm:text-sm leading-relaxed font-sans">
                  <AlertCircle className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="text-foreground">{t("explanation")}:</strong>
                    <p className="text-muted-foreground">{mcq.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Footer Navigation */}
      <div className="border-t border-border pt-6 flex items-center justify-between">
        {prevDay ? (
          <Link
            href={`/mcq/${unitId}/${prevDay}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-xs font-semibold hover:bg-muted transition-colors text-foreground"
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
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-xs font-semibold hover:bg-muted transition-colors text-foreground"
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
