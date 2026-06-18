"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  ArrowLeft, BookOpen, ChevronLeft, ChevronRight, HelpCircle, 
  CheckSquare, RefreshCw, FileText, Timer, Trophy, 
  Target, Lightbulb, Zap, CheckCircle2, Tv, Play 
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useStudent } from "@/context/StudentContext";
import { videoClassesData } from "@/data/videoClasses";

interface MCQ {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface LanguageBranch {
  title: string;
  concept: string;
  explanation: string;
  points: string[];
  boardFocus: string;
  memoryEngine: string;
  rapidRevision: string;
  examTip: string;
  questions: string[];
  mcqs: MCQ[];
}

interface DayContent {
  english: LanguageBranch;
  assamese: LanguageBranch;
}

interface DayNoteClientProps {
  dayContent: DayContent;
  unitId: string;
  dayId: string;
  prevDay: string | null;
  nextDay: string | null;
  dayNumber: number;
  unitNumberKey: string;
  unitTitleEn: string;
  unitTitleAs: string;
}

export default function DayNoteClient({
  dayContent,
  unitId,
  dayId,
  prevDay,
  nextDay,
  dayNumber,
  unitNumberKey,
  unitTitleEn,
  unitTitleAs,
}: DayNoteClientProps) {
  const { language, t, formatNumber } = useLanguage();
  const { awardXP, checkAndAwardBadges } = useStudent();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("notes");

  // Load appropriate language branch
  const activeBranch = language === "en" ? dayContent.english : dayContent.assamese;

  // Student completion state
  const [completed, setCompleted] = useState(false);

  // Daily MCQ Practice States
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number>>({});

  // Daily timed mini test states
  const [testActive, setTestActive] = useState(false);
  const [testTimeLeft, setTestTimeLeft] = useState(300); // 5 minutes (300 seconds)
  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});
  const [testScore, setTestScore] = useState<number | null>(null);

  // Video player states
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoStartSeconds, setVideoStartSeconds] = useState(0);
  const [watchedVideos, setWatchedVideos] = useState<Record<string, boolean>>({});

  // Find mapped video for the current day
  const dayVideo = (videoClassesData[unitId] || []).find(v => v.dayId === dayId);

  // Load and save student status
  useEffect(() => {
    setMounted(true);

    // Sync tab from query param if any
    const queryParams = new URLSearchParams(window.location.search);
    const tabParam = queryParams.get("tab");
    if (tabParam === "notes" || tabParam === "video" || tabParam === "mcq" || tabParam === "revision" || tabParam === "test") {
      // Fallback to notes if video tab is selected but no video is present
      if (tabParam === "video" && !dayVideo) {
        setActiveTab("notes");
      } else {
        setActiveTab(tabParam);
      }
    }

    // Check completion status
    const savedCompletions = localStorage.getItem("julfy-completed-days");
    if (savedCompletions) {
      try {
        const parsed = JSON.parse(savedCompletions);
        if (parsed[`${unitId}-${dayId}`]) {
          setCompleted(true);
        }
      } catch (e) {
        console.error(e);
      }
    }

    // Load watched videos
    const savedWatched = localStorage.getItem("julfy-watched-videos");
    if (savedWatched) {
      try {
        setWatchedVideos(JSON.parse(savedWatched));
      } catch (e) {
        console.error(e);
      }
    }

    // Save as last visited day
    const uLabel = language === "en" ? `Unit ${unitNumberKey}` : `গোট ${formatNumber(unitNumberKey)}`;
    const dLabel = language === "en" ? `Day ${dayNumber}` : `দিন ${formatNumber(dayNumber)}`;
    localStorage.setItem("julfy-last-visited-url", `/notes/${unitId}/${dayId}`);
    localStorage.setItem("julfy-last-visited-label", `${uLabel} • ${dLabel}`);

    // Reset video player states
    setIsVideoPlaying(false);
    setVideoStartSeconds(0);
  }, [unitId, dayId, dayNumber, language, unitNumberKey, formatNumber, dayVideo]);

  const toggleVideoWatched = (videoId: string) => {
    const wasWatched = watchedVideos[videoId];
    const nextWatched = { ...watchedVideos, [videoId]: !wasWatched };
    setWatchedVideos(nextWatched);
    localStorage.setItem("julfy-watched-videos", JSON.stringify(nextWatched));
    // Award XP for first-time watch
    if (!wasWatched) {
      awardXP("WATCH_VIDEO", videoId);
      checkAndAwardBadges();
    }
  };

  const toggleDayCompletion = () => {
    const key = `${unitId}-${dayId}`;
    const savedCompletions = localStorage.getItem("julfy-completed-days");
    let completions: Record<string, boolean> = {};
    if (savedCompletions) {
      try {
        completions = JSON.parse(savedCompletions);
      } catch (e) {
        console.error(e);
      }
    }
    
    const nextVal = !completed;
    setCompleted(nextVal);
    completions[key] = nextVal;
    localStorage.setItem("julfy-completed-days", JSON.stringify(completions));

    // Award XP & check badges when marking complete
    if (nextVal) {
      awardXP("COMPLETE_DAY_NOTES", key);
      // Check if unit is now complete (all 20 days)
      const unitDays = Object.entries(completions).filter(([k, v]) => v && k.startsWith(unitId)).length;
      if (unitDays >= 20) {
        awardXP("COMPLETE_UNIT", unitId);
      }
      // Check if all units complete (140 days)
      const totalDone = Object.values(completions).filter(Boolean).length;
      if (totalDone >= 140) {
        awardXP("COMPLETE_ALL_UNITS");
      }
      checkAndAwardBadges();
    }
  };

  const handleSelectMCQ = (qId: number, optIdx: number) => {
    if (mcqAnswers[qId] !== undefined) return;
    setMcqAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSelectTest = (qId: number, optIdx: number) => {
    if (testScore !== null) return;
    setTestAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const evaluateTest = useCallback(() => {
    setTestActive(false);
    let correctCount = 0;
    activeBranch.mcqs.forEach((q) => {
      if (testAnswers[q.id] === q.correct) correctCount++;
    });
    setTestScore(correctCount);

    // If score is perfect, mark day complete automatically
    if (correctCount === activeBranch.mcqs.length) {
      setCompleted(true);
      const key = `${unitId}-${dayId}`;
      const savedCompletions = localStorage.getItem("julfy-completed-days");
      let completions: Record<string, boolean> = {};
      if (savedCompletions) {
        try { completions = JSON.parse(savedCompletions); } catch {}
      }
      completions[key] = true;
      localStorage.setItem("julfy-completed-days", JSON.stringify(completions));
    }
  }, [testAnswers, activeBranch.mcqs, unitId, dayId]);

  const resetTest = () => {
    setTestAnswers({});
    setTestScore(null);
    setTestTimeLeft(300);
    setTestActive(false);
  };

  // Timed Mini Test countdown clock hook
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (testActive && testTimeLeft > 0) {
      interval = setInterval(() => {
        setTestTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (testTimeLeft === 0 && testActive) {
      evaluateTest();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [testActive, testTimeLeft, evaluateTest]);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center text-sm text-muted-foreground">
        Loading Learning Journey...
      </div>
    );
  }

  const unitBadge = language === "en" ? `Unit ${unitNumberKey}` : `গোট ${formatNumber(unitNumberKey)}`;
  const optionPrefixes = language === "en" ? ["A. ", "B. ", "C. ", "D. "] : ["ক. ", "খ. ", "গ. ", "ঘ. "];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      
      {/* Top Header Controls */}
      <div className="flex items-center justify-between">
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToUnits")}
        </Link>

        {/* Completion Check Button */}
        <button
          onClick={toggleDayCompletion}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm ${
            completed
              ? "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400"
              : "bg-background border-border text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <CheckCircle2 className={`h-4.5 w-4.5 ${completed ? "text-emerald-500 fill-current" : ""}`} />
          <span>
            {completed
              ? (language === "en" ? "Completed" : "সমাপ্ত কৰা হৈছে")
              : (language === "en" ? "Mark as Done" : "সম্পূৰ্ণ বুলি চিহ্নিত কৰক")
            }
          </span>
        </button>
      </div>

      {/* Lesson Heading Block */}
      <div className="space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          {unitBadge} &bull; {language === "en" ? unitTitleEn : unitTitleAs}
        </span>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          {activeBranch.title}
        </h1>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted w-fit px-3 py-1 rounded-full font-medium">
          <BookOpen className="h-3.5 w-3.5" />
          <span>{t("estimatedTime")}</span>
        </div>
      </div>

      {/* Learning Journey Navigation Tabs */}
      <div className="flex border-b border-border gap-2 overflow-x-auto pb-1">
        {[
          { id: "notes", label: language === "en" ? "Study Notes" : "পাঠ্য টোকা", icon: BookOpen },
          ...(dayVideo ? [{ id: "video", label: language === "en" ? "Video Lesson" : "ভিডিঅ' ক্লাছ", icon: Tv }] : []),
          { id: "mcq", label: language === "en" ? "MCQ Practice" : "MCQ অনুশীলন", icon: CheckSquare },
          { id: "revision", label: language === "en" ? "Revision" : "পুনৰীক্ষণ", icon: RefreshCw },
          { id: "test", label: language === "en" ? "Mini Test" : "পৰীক্ষা", icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-t-xl border-b-2 transition-all shrink-0 ${
                isActive
                  ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Workspace Display Area */}
      <div className="min-h-[40vh]">
        
        {/* Tab 1: Study Notes */}
        {activeTab === "notes" && (
          <div className="space-y-6 animate-fade-in">
            {/* Concept Snippet */}
            <div className="p-4 rounded-xl border border-indigo-500/10 bg-indigo-50/10 dark:bg-indigo-950/5 text-sm text-foreground/90 italic leading-relaxed">
              {activeBranch.concept}
            </div>

            {/* Main Note Paragraph */}
            <p className="text-base leading-relaxed text-foreground/80 font-sans">
              {activeBranch.explanation}
            </p>

            {/* Core Bullet points */}
            <div className="space-y-3">
              <h3 className="font-heading text-lg font-bold text-foreground">
                {language === "en" ? "Key Lesson Aspects" : "পাঠৰ মূল দিশসমূহ"}
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/80 leading-relaxed">
                {activeBranch.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>

            {/* signature features details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-4 border-t border-border/80">
              
              {/* Board Focus */}
              <div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 space-y-2">
                <h4 className="text-sm font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                  <Target className="h-4.5 w-4.5" />
                  {language === "en" ? "Board Focus" : "বোৰ্ড ফ'কাচ"}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {activeBranch.boardFocus}
                </p>
              </div>

              {/* Memory Engine */}
              <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10 space-y-2">
                <h4 className="text-sm font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                  <Lightbulb className="h-4.5 w-4.5" />
                  {language === "en" ? "Memory Engine" : "স্মৃতি শক্তি বৃদ্ধি"}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {activeBranch.memoryEngine}
                </p>
              </div>

            </div>

            {/* Exam tip */}
            <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-500/20">
              <h3 className="text-sm font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                {language === "en" ? "Exam Tip" : "পৰীক্ষাৰ টিপ"}
              </h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed font-sans">
                {activeBranch.examTip}
              </p>
            </div>

          </div>
        )}

        {/* Tab 1.5: Video Lesson */}
        {activeTab === "video" && dayVideo && (
          <div className="space-y-6 animate-fade-in text-slate-100 bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-xl">
            {/* 🎥 Video Title Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
              <div className="space-y-1">
                <h2 className="text-xl font-bold font-heading text-slate-100 flex items-start gap-2 leading-snug">
                  <span className="shrink-0 mt-1">🎥</span>
                  <span>{language === "en" ? dayVideo.titleEn : dayVideo.titleAs}</span>
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2 font-sans">
                  <div>
                    <span className="text-slate-500 uppercase tracking-wider text-[9px] font-bold block">
                      {language === "en" ? "Board Importance" : "বোৰ্ড গুৰুত্ব"}
                    </span>
                    <span className="text-amber-400 font-bold text-sm tracking-wider">
                      {dayVideo.boardRelevanceEn?.toLowerCase() === "very high" ? "★★★★★" : 
                       dayVideo.boardRelevanceEn?.toLowerCase() === "high" ? "★★★★☆" : 
                       dayVideo.boardRelevanceEn?.toLowerCase() === "moderate" ? "★★★☆☆" : "★★☆☆☆"}
                    </span>
                  </div>
                  <div className="h-6 w-px bg-slate-800" />
                  <div>
                    <span className="text-slate-500 uppercase tracking-wider text-[9px] font-bold block">
                      {language === "en" ? "Duration" : "সময়সীমা"}
                    </span>
                    <span className="text-slate-200 font-bold">
                      {language === "en" ? dayVideo.durationEn : dayVideo.durationAs}
                    </span>
                  </div>
                  <div className="h-6 w-px bg-slate-800" />
                  <div>
                    <span className="text-slate-500 uppercase tracking-wider text-[9px] font-bold block">
                      {language === "en" ? "Topic" : "বিষয়"}
                    </span>
                    <span className="text-indigo-400 font-bold">
                      {language === "en" ? dayVideo.topicEn : dayVideo.topicAs}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Completion Mark */}
              <button
                onClick={() => toggleVideoWatched(dayVideo.id)}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                  watchedVideos[dayVideo.id]
                    ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                    : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <CheckCircle2 className={`h-4 w-4 ${watchedVideos[dayVideo.id] ? "text-emerald-400 fill-current" : ""}`} />
                <span>
                  {watchedVideos[dayVideo.id]
                    ? (language === "en" ? "Watched" : "চোৱা হৈছে")
                    : (language === "en" ? "Mark as Watched" : "চোৱা বুলি চিহ্নিত কৰক")
                  }
                </span>
              </button>
            </div>

            {/* ▶ Watch Lesson Player Screen */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400 font-heading">
                ▶ {language === "en" ? "Watch Lesson" : "পাঠটো চাওক"}
              </h3>
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-inner group">
                {isVideoPlaying ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${dayVideo.youtubeId}?autoplay=1&rel=0${
                      videoStartSeconds > 0 ? `&start=${videoStartSeconds}` : ""
                    }`}
                    title={language === "en" ? dayVideo.titleEn : dayVideo.titleAs}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-500 group-hover:scale-102"
                      style={{ backgroundImage: `url(https://img.youtube.com/vi/${dayVideo.youtubeId}/maxresdefault.jpg)` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                    
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-all duration-300 hover:bg-indigo-500 hover:scale-110 active:scale-95 group-hover:ring-4 group-hover:ring-indigo-500/20"
                      aria-label="Play video"
                    >
                      <Play className="h-7.5 w-7.5 fill-current ml-1" />
                    </button>
                    <div className="relative z-10 space-y-1">
                      <span className="text-sm font-bold text-slate-100 block">
                        {language === "en" ? "Watch Lesson" : "পাঠটো চাওক"}
                      </span>
                      <span className="text-xs text-slate-400 block font-sans">
                        {language === "en" ? "Click to load embedded player" : "এম্বেড কৰা প্লেয়াৰ লোড কৰিবলৈ ক্লিক কৰক"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Timeline */}
            {dayVideo.timelineEn && dayVideo.timelineEn.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                  ⏱️ {language === "en" ? "Lesson Chapters" : "পাঠৰ অধ্যায়সমূহ"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                  {(language === "en" ? dayVideo.timelineEn : dayVideo.timelineAs || []).map((item, i) => {
                    const timelineSeconds = (() => {
                      const parts = item.time.split(":");
                      return parts.length === 2 ? parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10) : 0;
                    })();

                    return (
                      <button
                        key={i}
                        onClick={() => {
                          setVideoStartSeconds(timelineSeconds);
                          setIsVideoPlaying(true);
                        }}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/40 border border-slate-900 hover:bg-slate-900 hover:border-slate-800 text-left transition-colors font-sans"
                      >
                        <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono font-bold shrink-0">
                          {item.time}
                        </span>
                        <span className="text-slate-300 line-clamp-1 group-hover:text-slate-100">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-900">
              {/* 🎯 Key Learning Outcomes */}
              {dayVideo.learningObjectivesEn && dayVideo.learningObjectivesEn.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-400">
                    🎯 {language === "en" ? "Key Learning Outcomes" : "মূল শিকন ফলাফলসমূহ"}
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-300 leading-relaxed font-sans">
                    {(language === "en" ? dayVideo.learningObjectivesEn : dayVideo.learningObjectivesAs || []).map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 bg-slate-900/40 p-2.5 rounded-xl border border-slate-900/60">
                        <span className="text-indigo-400 font-bold shrink-0">•</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 🧠 Memory Formula */}
              {dayVideo.memoryEngine && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                    🧠 {language === "en" ? "Memory Formula" : "স্মৃতি সূত্ৰ"}
                  </h3>
                  <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-900/60 space-y-4">
                    <div className="text-3xl font-black tracking-widest bg-gradient-to-r from-amber-400 to-indigo-400 bg-clip-text text-transparent px-4 py-2 bg-slate-950 rounded-xl border border-slate-800 text-center select-all font-sans">
                      {language === "en" ? dayVideo.memoryEngine.formulaEn : dayVideo.memoryEngine.formulaAs}
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-xs font-sans">
                      {(language === "en" ? dayVideo.memoryEngine.breakdownEn : dayVideo.memoryEngine.breakdownAs).map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-900">
                          <span className="font-bold text-amber-400 font-mono text-sm shrink-0">{item.key}</span>
                          <span className="text-slate-300 line-clamp-1">{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 📘 Related Notes */}
            {dayVideo.relatedNotes && dayVideo.relatedNotes.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-900">
                <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-400">
                  📘 {language === "en" ? "Related Notes" : "প্ৰাসংগিক টোকা"}
                </h3>
                <div className="flex flex-wrap gap-2 pt-1 font-sans">
                  {dayVideo.relatedNotes.map((note, idx) => (
                    <Link
                      key={idx}
                      href={`/notes/${unitId}/${note.dayId}?tab=notes`}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-indigo-300 hover:bg-slate-850 transition-colors"
                    >
                      {language === "en" ? note.labelEn : note.labelAs}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 📝 Practice MCQs & 📊 Take Mini Test Action Panel */}
            <div className="p-5 rounded-2xl bg-indigo-950/10 border border-indigo-900/20 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-xs text-slate-400 text-center sm:text-left font-sans">
                {language === "en"
                  ? "Ready to practice or take a quick assessment of this video lesson?"
                  : "এই ভিডিঅ' পাঠৰ ওপৰত কুইজ বা চুটি পৰীক্ষা দিবলৈ সাজু নে?"}
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto font-sans">
                {dayVideo.relatedMcq && (
                  <button
                    onClick={() => {
                      setActiveTab("mcq");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 text-xs text-indigo-350 dark:text-indigo-300 font-bold transition-all border border-indigo-500/20"
                  >
                    📝 {language === "en" ? "Practice MCQs" : "MCQ অনুশীলন"}
                  </button>
                )}
                <button
                  onClick={() => {
                    setActiveTab("test");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all"
                >
                  📊 {language === "en" ? "Take Mini Test" : "পৰীক্ষা দিয়ক"}
                </button>
              </div>
            </div>

            {/* Previous Video Lesson Navigation */}
            {dayVideo.previousVideo && (
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-slate-900">
                <div className="space-y-1 font-sans">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    ⏮️ {language === "en" ? "Previous Recommended Lesson" : "পূৰ্বৱৰ্তী প্ৰস্তাৱিত পাঠ"}
                  </span>
                  <h4 className="text-sm font-bold text-slate-100">
                    {language === "en" ? dayVideo.previousVideo.titleEn : dayVideo.previousVideo.titleAs}
                  </h4>
                  <span className="text-[11px] text-slate-400 block">
                    {language === "en" ? `Duration: ${dayVideo.previousVideo.durationEn}` : `সময়সীমা: ${dayVideo.previousVideo.durationAs}`}
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (dayVideo.previousVideo?.dayId) {
                      window.location.href = `/notes/${unitId}/${dayVideo.previousVideo.dayId}?tab=video`;
                    }
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors shrink-0 font-sans"
                >
                  {language === "en" ? "← Go to Previous Lesson" : "← পূৰ্বৱৰ্তী পাঠলৈ যাওক"}
                </button>
              </div>
            )}

            {/* Next Video Lesson Navigation */}
            {dayVideo.nextVideo && (
              <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-900/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1 font-sans">
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
                    ⏭️ {language === "en" ? "Next Recommended Lesson" : "পৰৱৰ্তী প্ৰস্তাৱিত পাঠ"}
                  </span>
                  <h4 className="text-sm font-bold text-slate-100">
                    {language === "en" ? dayVideo.nextVideo.titleEn : dayVideo.nextVideo.titleAs}
                  </h4>
                  <span className="text-[11px] text-slate-400 block">
                    {language === "en" ? `Duration: ${dayVideo.nextVideo.durationEn}` : `সময়সীমা: ${dayVideo.nextVideo.durationAs}`}
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (dayVideo.nextVideo?.dayId) {
                      window.location.href = `/notes/${unitId}/${dayVideo.nextVideo.dayId}?tab=video`;
                    }
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shrink-0 font-sans"
                >
                  {language === "en" ? "Go to Next Lesson →" : "পৰৱৰ্তী পাঠলৈ যাওক →"}
                </button>
              </div>
            )}

            {/* Continue to MCQ CTA Button */}
            <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-xs text-slate-400 text-center sm:text-left leading-relaxed font-sans">
                {language === "en"
                  ? "Completed the lecture? Test your conceptual understanding immediately."
                  : "বক্তৃতাটো সম্পূৰ্ণ কৰিলে নেকি? আপোনাৰ ধাৰণাগত বুজাবুজি তৎক্ষণাৎ পৰীক্ষা কৰক।"}
              </span>
              <button
                onClick={() => {
                  setActiveTab("mcq");
                  // Scroll back up to the tabs list
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full sm:w-auto rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>{language === "en" ? "Continue to MCQ Practice" : "MCQ অনুশীলনলৈ যাওক"}</span>
                <Play className="h-3.5 w-3.5 fill-current shrink-0 animate-pulse" />
              </button>
            </div>

          </div>
        )}

        {/* Tab 2: MCQ Practice */}
        {activeTab === "mcq" && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="font-heading text-lg font-bold text-foreground">
              {language === "en" ? "Interactive Topic Quiz" : "অধ্যায়ভিত্তিক কুইজ"}
            </h2>
            <div className="space-y-6">
              {activeBranch.mcqs.map((q, qIdx) => {
                const userAnswer = mcqAnswers[q.id];
                const answered = userAnswer !== undefined;

                return (
                  <div key={q.id} className="p-5 rounded-2xl border border-border bg-card/60 space-y-4">
                    <h3 className="text-sm font-bold text-foreground font-sans">
                      {formatNumber(qIdx + 1)}. {q.question}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isCorrect = q.correct === optIdx;
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
                            onClick={() => handleSelectMCQ(q.id, optIdx)}
                            className={`w-full text-left p-3 rounded-xl border text-xs flex items-center justify-between transition-all font-sans ${optStyle}`}
                          >
                            <span>
                              <span className="font-bold text-indigo-500 mr-1">{optionPrefixes[optIdx]}</span>
                              {opt}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation snippet */}
                    {answered && (
                      <div className="text-xs text-muted-foreground leading-relaxed bg-muted/50 p-3 rounded-xl border border-border/40 font-sans">
                        <strong>{t("explanation")}: </strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Revision */}
        {activeTab === "revision" && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="font-heading text-lg font-bold text-foreground">
              {language === "en" ? "Revision Card & Flash Notes" : "পুনৰীক্ষণ কাৰ্ড আৰু মূল অংশসমূহ"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Rapid Revision */}
              <div className="md:col-span-2 rounded-3xl border border-dashed border-indigo-500/20 bg-indigo-50/5 dark:bg-indigo-950/5 p-6 space-y-4">
                <h3 className="font-heading text-base font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-indigo-500" />
                  {language === "en" ? "Rapid Revision Points" : "দ্ৰুত পুনৰীক্ষণ পইণ্টসমূহ"}
                </h3>
                <div className="space-y-4 leading-relaxed text-sm text-foreground/80 font-sans whitespace-pre-line">
                  {activeBranch.rapidRevision}
                </div>
              </div>

              {/* Mnemonic / Tip side card */}
              <div className="rounded-3xl border border-border bg-card p-6 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <Lightbulb className="h-4 w-4" />
                    {language === "en" ? "Exam Tip" : "পৰীক্ষাৰ টিপ"}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed font-sans">
                    {activeBranch.examTip}
                  </p>
                </div>
                <div className="pt-4 border-t border-border/60">
                  <h4 className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                    {language === "en" ? "Board Exam Questions" : "বোৰ্ড পৰীক্ষাৰ প্ৰশ্ন"}
                  </h4>
                  <ul className="list-decimal pl-4 mt-2 space-y-1 text-[11px] text-muted-foreground">
                    {activeBranch.questions.map((q, idx) => (
                      <li key={idx} className="font-sans">{q}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 4: Timed Mini Test */}
        {activeTab === "test" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-4 gap-4">
              <h2 className="font-heading text-lg font-bold text-foreground">
                {language === "en" ? "Daily Lesson Diagnostic Test" : "দৈনিক পাঠ ভিত্তিক পৰীক্ষা"}
              </h2>

              {testActive && (
                <div className="flex items-center gap-1.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border border-rose-500/20">
                  <Timer className="h-4 w-4 animate-pulse" />
                  {formatNumber(Math.floor(testTimeLeft / 60))}:{formatNumber(testTimeLeft % 60)}
                </div>
              )}
            </div>

            {!testActive && testScore === null ? (
              <div className="text-center py-10 space-y-4 bg-muted/10 border border-border border-dashed rounded-3xl">
                <FileText className="h-10 w-10 text-muted-foreground/60 mx-auto" />
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-sm text-foreground">
                    {language === "en" ? "Ready to start the test?" : "পৰীক্ষা আৰম্ভ কৰিবলৈ সাজু নে?"}
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed font-sans">
                    {language === "en" 
                      ? "A 5-minute timed test containing 5 interactive questions to check your lesson comprehension." 
                      : "পাঠটো কিমান বুজি পালে জানিবলৈ ৫ মিনিট সময়সীমাৰ এক চুটি পৰীক্ষা (৫টা প্ৰশ্ন)।"
                    }
                  </p>
                </div>
                <button
                  onClick={() => setTestActive(true)}
                  className="rounded-xl bg-indigo-600 text-white font-bold text-xs px-5 py-2.5 hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  {language === "en" ? "Start Test" : "পৰীক্ষা আৰম্ভ কৰক"}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {activeBranch.mcqs.map((q, qIdx) => {
                  const userAnswer = testAnswers[q.id];
                  const evaluated = testScore !== null;

                  return (
                    <div key={q.id} className="p-5 rounded-2xl border border-border bg-card space-y-4">
                      <h3 className="text-sm font-bold text-foreground font-sans">
                        {formatNumber(qIdx + 1)}. {q.question}
                      </h3>
                      <div className="grid grid-cols-1 gap-2">
                        {q.options.map((opt, optIdx) => {
                          const isCorrect = q.correct === optIdx;
                          const isSelected = userAnswer === optIdx;
                          
                          let optStyle = "border-border hover:bg-muted";
                          if (evaluated) {
                            if (isCorrect) {
                              optStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold";
                            } else if (isSelected) {
                              optStyle = "border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold";
                            } else {
                              optStyle = "border-border opacity-60";
                            }
                          } else if (isSelected) {
                            optStyle = "border-indigo-600 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 font-semibold";
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={evaluated}
                              onClick={() => handleSelectTest(q.id, optIdx)}
                              className={`w-full text-left p-3 rounded-xl border text-xs flex items-center justify-between transition-all font-sans ${optStyle}`}
                            >
                              <span>
                                <span className="font-bold text-indigo-500 mr-1">{optionPrefixes[optIdx]}</span>
                                {opt}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {/* Submit / Results Panel */}
                <div className="flex items-center justify-between border-t border-border pt-6">
                  {testScore === null ? (
                    <button
                      onClick={evaluateTest}
                      className="rounded-xl bg-indigo-600 text-white font-bold text-xs px-5 py-2.5 hover:bg-indigo-700 transition-colors ml-auto shadow-sm"
                    >
                      {language === "en" ? "Submit Test" : "পৰীক্ষাৰ বহী জমা দিয়ক"}
                    </button>
                  ) : (
                    <div className="flex items-center justify-between w-full">
                      <div className="text-sm font-bold text-foreground">
                        {language === "en" 
                          ? `Your Score: ${formatNumber(testScore)} / ${formatNumber(activeBranch.mcqs.length)}` 
                          : `আপোনাৰ নম্বৰ: ${formatNumber(testScore)} / ${formatNumber(activeBranch.mcqs.length)}`
                        }
                        {testScore === activeBranch.mcqs.length && (
                          <span className="ml-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full inline-flex items-center gap-0.5">
                            <Trophy className="h-3.5 w-3.5" />
                            {language === "en" ? "Perfect!" : "উত্তম!"}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={resetTest}
                        className="text-xs font-semibold text-indigo-600 hover:underline"
                      >
                        {language === "en" ? "Retry Test" : "পুনৰ চেষ্টা কৰক"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Dynamic Navigation Day Cycle Footer */}
      <div className="border-t border-border/80 pt-6 flex items-center justify-between">
        {prevDay ? (
          <Link
            href={`/notes/${unitId}/${prevDay}?tab=${activeTab}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-xs font-semibold hover:bg-muted transition-colors text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            {language === "en" ? `Day ${dayNumber - 1}` : `দিন ${formatNumber(dayNumber - 1)}`}
          </Link>
        ) : (
          <div />
        )}

        {nextDay ? (
          <Link
            href={`/notes/${unitId}/${nextDay}?tab=${activeTab}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-xs font-semibold hover:bg-muted transition-colors text-foreground"
          >
            {language === "en" ? `Day ${dayNumber + 1}` : `দিন ${formatNumber(dayNumber + 1)}`}
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
