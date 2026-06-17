"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { CheckCircle, Circle, Search, BookOpenCheck, Play, CheckSquare, RotateCcw, FileText, Tv, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Fuse from "fuse.js";
import searchIndex from "@/data/searchIndex.json";
import { videoClassesData } from "@/data/videoClasses";

interface SearchItem {
  unitId: string;
  dayId: string;
  enTitle: string;
  asTitle: string;
  enConcept: string;
  asConcept: string;
  keywordsEn: string;
  keywordsAs: string;
  categoryEn: string;
  categoryAs: string;
}

interface Unit {
  id: string;
  numberKey: string;
  enTitle: string;
  asTitle: string;
  enDescription: string;
  asDescription: string;
  enTopics: string[];
  asTopics: string[];
}

const baseUnits: Unit[] = [
  {
    id: "unit1",
    numberKey: "1",
    enTitle: "Development of Secondary Education in India and Assam",
    asTitle: "ভাৰত আৰু অসমৰ মাধ্যমিক শিক্ষাৰ বিকাশ",
    enDescription: "Post-Independent secondary education reforms, Mudaliar Commission, Kothari Commission, and state education updates.",
    asDescription: "স্বাধীনোত্তৰ মাধ্যমিক শিক্ষা সংস্কাৰ, মুডালিয়াৰ আয়োগ, কোঠাৰী আয়োগ, আৰু ৰাজ্যিক শিক্ষাৰ বিভিন্ন দিশ।",
    enTopics: ["Mudaliar Commission 1952", "Kothari Commission 1964-66", "National Policy on Education 1986", "Secondary Education in Assam"],
    asTopics: ["মুডালিয়াৰ আয়োগ ১৯৫২", "কোঠাৰী আয়োগ কোঠাৰী", "ৰাষ্ট্ৰীয় শিক্ষানীতি ১৯৮৬", "অসমৰ মাধ্যমিক শিক্ষা"],
  },
  {
    id: "unit2",
    numberKey: "2",
    enTitle: "Non-formal Education & Media of Education",
    asTitle: "অনানুষ্ঠানিক শিক্ষা আৰু শিক্ষাৰ মাধ্যমসমূহ",
    enDescription: "Alternative learning modes, open schools, distance education, correspondence courses, and mass media impact.",
    asDescription: "বিকল্প শিক্ষাৰ মাধ্যম, মুক্ত বিদ্যালয়, দূৰ শিক্ষা, পত্ৰযোগ শিক্ষা আৰু গণমাধ্যমৰ প্ৰভাৱ।",
    enTopics: ["Non-formal Learning Features", "Open Schooling (NOS)", "Distance Education Concepts", "Mass Media (Press, Radio, TV)"],
    asTopics: ["অনানুষ্ঠানিক শিক্ষণ", "মুক্ত বিদ্যালয় (NOS)", "দূৰ শিক্ষা ধাৰণা", "গণমাধ্যম (প্ৰেছ, ৰেডিঅ’, টিভি)"],
  },
  {
    id: "unit3",
    numberKey: "3",
    enTitle: "Current Trends in Education",
    asTitle: "শিক্ষাৰ সাম্প্ৰতিক ধাৰাসমূহ",
    enDescription: "Modern societal needs, environmental issues, population education, physical training, and values integration.",
    asDescription: "আধুনিক সমাজৰ প্ৰয়োজন, পৰিৱেশ শিক্ষা, জনসংখ্যা শিক্ষা, শাৰীৰিক শিক্ষা আৰু মূল্যবোধৰ শিক্ষা।",
    enTopics: ["Environmental Education", "Population Education", "Physical Education", "Value Education & Human Rights"],
    asTopics: ["পৰিৱেশ শিক্ষা", "জনসংখ্যা শিক্ষা", "শাৰীৰিক শিক্ষা", "মূল্যবোধ শিক্ষা আৰু মানৱ অধিকাৰ"],
  },
  {
    id: "unit4",
    numberKey: "4",
    enTitle: "Learning",
    asTitle: "শিকন",
    enDescription: "Core psychology concepts, laws of learning, trial & error theory, classical conditioning, and insightful learning.",
    asDescription: "মনোবিজ্ঞানৰ মূল ধাৰণা, শিকনৰ সূত্ৰসমূহ, প্ৰচেষ্টা আৰু ভুল পদ্ধতি, ধ্ৰুপদী অনুৱৰ্তন আৰু অন্তৰ্দৃষ্টিমূলক শিকন।",
    enTopics: ["Thorndike's Laws of Learning", "Pavlov's Conditioning", "Insightful Learning (Kohler)", "Factors Influencing Learning"],
    asTopics: ["থৰ্নডাইকৰ শিকন সূত্ৰসমূহ", "পাভলভৰ অনুৱৰ্তন", "অন্তৰ্দৃষ্টিমূলক শিকন (কোহলাৰ)", "শিকনৰ প্ৰভাৱকাৰী কাৰক"],
  },
  {
    id: "unit5",
    numberKey: "5",
    enTitle: "Memory & Attention",
    asTitle: "স্মৃতিশক্তি আৰু মনোযোগ",
    enDescription: "Information retention, forgetting curves, factors of interest, distraction mechanisms, and mental concentration.",
    asDescription: "স্মৃতি ধাৰণ, বিস্মৃতিৰ কাৰণসমূহ, মনোযোগৰ কাক, মনোযোগ বিচ্যুতি আৰু মনোযোগ বৃদ্ধিৰ উপায়।",
    enTopics: ["Memory Types & Retention", "Causes of Forgetting", "Attention and Interest Relations", "Distraction & Habituation"],
    asTopics: ["স্মৃতিৰ প্ৰকাৰ আৰু ধাৰণ", "বিস্মৃতিৰ কাৰণসমূহ", "মনোযোগ আৰু আগ্ৰহৰ সম্পৰ্ক", "মনোযোগ বিচ্যুতি"],
  },
  {
    id: "unit6",
    numberKey: "6",
    enTitle: "Mental Health & Hygiene",
    asTitle: "মানসিক স্বাস্থ্য আৰু বিজ্ঞান",
    enDescription: "Adjustment mechanisms, mental hygiene principles, maladjustment, and home/school counseling guidance.",
    asDescription: "অপসংগতিৰ কাৰণসমূহ, মানসিক স্বাস্থ্য ৰক্ষাৰ উপায়, আৰু ঘৰুৱা তথা বিদ্যালয়ৰ ভূমিকা।",
    enTopics: ["Mental Health Goals", "Mental Hygiene Practices", "Causes of Maladjustment", "Role of Teachers & Parents"],
    asTopics: ["মানসিক স্বাস্থ্যৰ লক্ষ্য", "মানসিক বিজ্ঞানৰ অভ্যাস", "অপসংগতিৰ কাৰণসমূহ", "শিক্ষক আৰু অভিভাৱকৰ ভূমিকা"],
  },
  {
    id: "unit7",
    numberKey: "7",
    enTitle: "Educational Statistics",
    asTitle: "শৈক্ষিক পৰিসংখ্যা",
    enDescription: "Quantitative methods, frequency distribution tables, polygon/histogram graphing, and calculations of central tendency.",
    asDescription: "শৈক্ষিক গণনা পদ্ধতি, পৌনঃপুনিকতা বিভাজন তালিকা, লেখচিত্ৰ অংকন আৰু কেন্দ্ৰীয় প্ৰৱণতা নিৰূপণ (গড়, মধ্যমা, প্ৰচুৰক)।",
    enTopics: ["Frequency Tables", "Arithmetic Mean Calculations", "Median & Mode Formulas", "Graphical Representations"],
    asTopics: ["পৌনঃপুনিকতা তালিকা", "গাণিতিক গড় গণনা", "মধ্যমা আৰু প্ৰচুৰক সূত্ৰ", "লেখচিত্ৰ অংকন"],
  },
];

export default function NotesPage() {
  const { t, language, formatNumber } = useLanguage();
  const [activeUnit, setActiveUnit] = useState<string>(baseUnits[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [completedDays, setCompletedDays] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const [unitViewMode, setUnitViewMode] = useState<"notes" | "videos">("notes");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  // Reset tab and active video player on unit changes
  useEffect(() => {
    setUnitViewMode("notes");
    setPlayingVideoId(null);
  }, [activeUnit]);

  // Resume states
  const [lastDayUrl, setLastDayUrl] = useState("/notes/unit1/day1");
  const [lastDayLabel, setLastDayLabel] = useState("");

  useEffect(() => {
    setMounted(true);
    // Load completed days status
    const saved = localStorage.getItem("julfy-completed-days");
    if (saved) {
      try {
        setCompletedDays(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }

    // Load last visited day
    const savedUrl = localStorage.getItem("julfy-last-visited-url");
    const savedLabel = localStorage.getItem("julfy-last-visited-label");
    if (savedUrl) setLastDayUrl(savedUrl);
    if (savedLabel) setLastDayLabel(savedLabel);
  }, []);

  const toggleDayCompletion = (unitId: string, day: number) => {
    const key = `${unitId}-day${day}`;
    const updated = {
      ...completedDays,
      [key]: !completedDays[key],
    };
    setCompletedDays(updated);
    localStorage.setItem("julfy-completed-days", JSON.stringify(updated));
  };

  // Find next uncompleted day in sequence
  const getNextUncompleted = () => {
    for (const unit of baseUnits) {
      for (let d = 1; d <= 20; d++) {
        const key = `${unit.id}-day${d}`;
        if (!completedDays[key]) {
          const uLabel = language === "en" ? `Unit ${unit.numberKey}` : `গোট ${formatNumber(unit.numberKey)}`;
          const dLabel = language === "en" ? `Day ${d}` : `দিন ${formatNumber(d)}`;
          return {
            url: `/notes/${unit.id}/day${d}`,
            label: `${uLabel} &bull; ${dLabel}`,
            unitId: unit.id,
            day: d
          };
        }
      }
    }
    return {
      url: "/notes/unit1/day1",
      label: language === "en" ? "Unit 1 & Day 1" : "গোট ১ & দিন ১",
      unitId: "unit1",
      day: 1
    };
  };

  const nextUncompleted = getNextUncompleted();
  const todaysMcqUrl = `${nextUncompleted.url}?tab=mcq`;
  const takeTestUrl = `${nextUncompleted.url}?tab=test`;

  // Initialize Fuse.js client-side
  const fuse = useMemo(() => {
    return new Fuse(searchIndex, {
      keys: [
        { name: "enTitle", weight: 0.35 },
        { name: "asTitle", weight: 0.35 },
        { name: "enConcept", weight: 0.15 },
        { name: "asConcept", weight: 0.15 },
        { name: "keywordsEn", weight: 0.2 },
        { name: "keywordsAs", weight: 0.2 },
      ],
      threshold: 0.45,
    });
  }, []);

  // Search autocomplete handler using Fuse.js
  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (!q.trim()) {
      setSearchResults([]);
      return;
    }
    const results = fuse.search(q);
    setSearchResults(results.map((r) => r.item).slice(0, 6)); // Top 6 matches
  };

  // Progress calculations
  const getUnitProgress = (unitId: string) => {
    let completedCount = 0;
    for (let d = 1; d <= 20; d++) {
      if (completedDays[`${unitId}-day${d}`]) completedCount++;
    }
    const pct = Math.round((completedCount / 20) * 100);
    const filledBlocks = Math.round(pct / 10);
    const emptyBlocks = 10 - filledBlocks;
    const bar = "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);
    
    return { bar, pct };
  };

  const units = baseUnits.map((u) => {
    const { bar, pct } = getUnitProgress(u.id);
    return {
      id: u.id,
      number: language === "en" ? `Unit ${u.numberKey}` : `গোট ${formatNumber(u.numberKey)}`,
      title: language === "en" ? u.enTitle : u.asTitle,
      description: language === "en" ? u.enDescription : u.asDescription,
      topics: language === "en" ? u.enTopics : u.asTopics,
      bar,
      pct
    };
  });

  const currentUnit = units.find((u) => u.id === activeUnit) || units[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10 animate-fade-in">
      
      {/* Top Section: Header & Keyword Jump Search */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left/Main Header */}
        <div className="lg:col-span-8 space-y-4">
          <div className="space-y-1">
            <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              {t("notesHeader")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("notesSub")}
            </p>
          </div>

          {/* Search Upgraded Widget */}
          <div className="relative w-full max-w-xl">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={language === "en" ? "Search: Mudaliar Commission, Learning, Memory, Statistics..." : "সন্ধান কৰক: মুডালিয়াৰ আয়োগ, শিকন, স্মৃতি, পৰিসংখ্যা..."}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full rounded-2xl border border-border bg-card py-3 pl-11 pr-4 text-sm text-foreground focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm"
              />
            </div>

            {/* Jump Dropdown Suggestions */}
            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 z-50 rounded-2xl border border-border bg-card shadow-lg max-h-60 overflow-y-auto">
                {searchResults.map((item) => (
                  <Link
                    key={`${item.unitId}-${item.dayId}`}
                    href={`/notes/${item.unitId}/${item.dayId}`}
                    className="block p-4 border-b border-border last:border-0 hover:bg-muted/60 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                        {language === "en" ? item.categoryEn : item.categoryAs}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {language === "en" ? "Jump to lesson →" : "পাঠলৈ যাওক →"}
                      </span>
                    </div>
                    <div className="mt-1.5 text-sm font-semibold text-foreground">
                      {language === "en" ? item.enTitle : item.asTitle}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Quick Actions Panel */}
        <div className="lg:col-span-4">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4">
            <h2 className="font-heading text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2 border-b border-border/80 pb-3 mb-2">
              {t("quickActions")}
            </h2>
            
            <div className="grid grid-cols-1 gap-2.5">
              {/* Continue Learning */}
              <Link
                href={nextUncompleted.url}
                className="flex items-center justify-between p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors text-left"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold">{t("continueLearning")}</span>
                  <span className="text-[10px] opacity-80" dangerouslySetInnerHTML={{ __html: nextUncompleted.label }} />
                </div>
                <Play className="h-4.5 w-4.5 fill-current shrink-0 ml-2" />
              </Link>

              {/* Resume Last Visited Day */}
              {mounted && lastDayLabel && (
                <Link
                  href={lastDayUrl}
                  className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-muted transition-colors text-left"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground">{t("resumeLastDay")}</span>
                    <span className="text-[10px] text-muted-foreground">{lastDayLabel}</span>
                  </div>
                  <RotateCcw className="h-4.5 w-4.5 text-indigo-500 shrink-0 ml-2" />
                </Link>
              )}

              {/* Today's MCQ */}
              <Link
                href={todaysMcqUrl}
                className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-muted transition-colors text-left"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground">{t("todaysMCQ")}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {language === "en" ? `Practice for Day ${nextUncompleted.day}` : `দিন ${formatNumber(nextUncompleted.day)} ৰ বাবে কুইজ`}
                  </span>
                </div>
                <CheckSquare className="h-4.5 w-4.5 text-emerald-500 shrink-0 ml-2" />
              </Link>

              {/* Take Test */}
              <Link
                href={takeTestUrl}
                className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-muted transition-colors text-left"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground">{t("takeTest")}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {language === "en" ? `Test for Day ${nextUncompleted.day}` : `দিন ${formatNumber(nextUncompleted.day)} ৰ পৰীক্ষা`}
                  </span>
                </div>
                <FileText className="h-4.5 w-4.5 text-amber-500 shrink-0 ml-2" />
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Main Grid: Units List vs Timelines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Units list with visual progress bar */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="font-heading text-lg font-bold text-foreground mb-2 px-1">
            {t("courseUnits")}
          </h2>
          
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            {units.map((unit) => {
              const isActive = unit.id === activeUnit;
              return (
                <button
                  key={unit.id}
                  onClick={() => setActiveUnit(unit.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${
                    isActive
                      ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 shadow-sm"
                      : "border-border bg-card hover:bg-muted"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                      {unit.number}
                    </span>
                    <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400">
                      {formatNumber(unit.pct)}%
                    </span>
                  </div>
                  
                  <h3 className="mt-1 font-bold text-sm text-foreground line-clamp-1">
                    {unit.title}
                  </h3>

                  {/* Progress Bar Rendering */}
                  <div className="mt-2 text-[10px] font-mono tracking-widest text-indigo-600 dark:text-indigo-400">
                    {unit.bar}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Daily timeline roadmap */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
            
            {/* Active Unit Header */}
            <div className="border-b border-border pb-6 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {language === "en" ? "Active Syllabus Plan" : "সক্ৰিয় পাঠ্যক্ৰম পৰিকল্পনা"} &bull; {currentUnit.number}
              </span>
              <h2 className="font-heading mt-2 text-2xl font-bold text-foreground">
                {currentUnit.title}
              </h2>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                {currentUnit.description}
              </p>
            </div>

            {/* Tab Controls: Study Notes vs Video Classes */}
            <div className="flex border-b border-border gap-4 pb-2 mb-6">
              <button
                onClick={() => setUnitViewMode("notes")}
                className={`pb-2 text-sm font-semibold border-b-2 transition-all ${
                  unitViewMode === "notes"
                    ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                📘 {language === "en" ? "Study Notes (Day 1–20)" : "পাঠ্য টোকা (দিন ১-২০)"}
              </button>
              <button
                onClick={() => setUnitViewMode("videos")}
                className={`pb-2 text-sm font-semibold border-b-2 transition-all ${
                  unitViewMode === "videos"
                    ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                🎥 {language === "en" ? "Video Classes" : "ভিডিঅ' ক্লাছসমূহ"}
              </button>
            </div>

            {/* Conditionally render Notes Timeline OR Video Classes */}
            {unitViewMode === "notes" ? (
              <div className="space-y-6">
                <h3 className="font-heading text-base font-bold text-foreground flex items-center gap-2">
                  <BookOpenCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  {t("roadmapTitle")}
                </h3>

                <div className="space-y-4">
                  {Array.from({ length: 20 }, (_, i) => {
                    const day = i + 1;
                    const dayKey = `${currentUnit.id}-day${day}`;
                    const isDone = !!completedDays[dayKey];

                    // Status Icon Mapping
                    let statusSymbol = <Circle className="h-5 w-5 text-muted-foreground/60 shrink-0" />;
                    if (isDone) {
                      statusSymbol = <CheckCircle className="h-5 w-5 text-emerald-500 fill-emerald-500/10 shrink-0" />;
                    }

                    const getMockDayTitle = (d: number) => {
                      const idx = (d - 1) % currentUnit.topics.length;
                      return `${currentUnit.topics[idx]} - Part ${formatNumber(Math.ceil(d / currentUnit.topics.length))}`;
                    };

                    return (
                      <div
                        key={day}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-border bg-card/40 hover:border-indigo-500/20 transition-all gap-4"
                      >
                        {/* Day Left side: status & title */}
                        <div className="flex items-center gap-3">
                          {mounted ? (
                            <button
                              onClick={() => toggleDayCompletion(currentUnit.id, day)}
                              aria-label={`Mark Day ${day} as completed`}
                            >
                              {statusSymbol}
                            </button>
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground/60 shrink-0" />
                          )}

                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-foreground">
                              {t("dayBadge")} {formatNumber(day)}
                            </span>
                            <span className="text-[11px] text-muted-foreground line-clamp-1 max-w-[280px]">
                              {getMockDayTitle(day)}
                            </span>
                          </div>
                        </div>

                        {/* Day Actions panel - Inline buttons */}
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Notes */}
                          <Link
                            href={`/notes/${currentUnit.id}/day${day}?tab=notes`}
                            className="px-2.5 py-1.5 rounded-lg bg-muted text-[10px] font-bold text-foreground hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-colors"
                          >
                            {language === "en" ? "[Notes]" : "[টোকা]"}
                          </Link>
                          {/* MCQ Practice */}
                          <Link
                            href={`/notes/${currentUnit.id}/day${day}?tab=mcq`}
                            className="px-2.5 py-1.5 rounded-lg bg-muted text-[10px] font-bold text-foreground hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 transition-colors"
                          >
                            {language === "en" ? "[MCQ Practice]" : "[MCQ অনুশীলন]"}
                          </Link>
                          {/* Revision */}
                          <Link
                            href={`/notes/${currentUnit.id}/day${day}?tab=revision`}
                            className="px-2.5 py-1.5 rounded-lg bg-muted text-[10px] font-bold text-foreground hover:bg-rose-600 hover:text-white dark:hover:bg-rose-500 transition-colors"
                          >
                            {language === "en" ? "[Revision]" : "[পুনৰীক্ষণ]"}
                          </Link>
                          {/* Test */}
                          <Link
                            href={`/notes/${currentUnit.id}/day${day}?tab=test`}
                            className="px-2.5 py-1.5 rounded-lg bg-muted text-[10px] font-bold text-foreground hover:bg-amber-600 hover:text-white dark:hover:bg-amber-500 transition-colors"
                          >
                            {language === "en" ? "[Test]" : "[পৰীক্ষা]"}
                          </Link>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-heading text-base font-bold text-foreground flex items-center gap-2 border-b border-border/60 pb-3">
                  <Tv className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <span>
                    {language === "en" ? "Unit Video Classes" : "গোটৰ ভিডিঅ' ক্লাছসমূহ"}
                  </span>
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  {(videoClassesData[currentUnit.id] || []).map((video) => {
                    const isPlaying = playingVideoId === video.id;
                    const getEmbedUrl = (v: typeof video) => {
                      if (v.isPlaylist) {
                        return `https://www.youtube.com/embed/videoseries?list=${v.youtubeId}&autoplay=0`;
                      }
                      return `https://www.youtube.com/embed/${v.youtubeId}?autoplay=0&rel=0`;
                    };

                    return (
                      <div key={video.id} className="p-5 rounded-2xl border border-border bg-card/60 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h4 className="font-heading text-sm font-bold text-foreground">
                              {language === "en" ? video.titleEn : video.titleAs}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed font-sans">
                              {language === "en" ? video.descriptionEn : video.descriptionAs}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                            <span className="text-[10px] font-semibold bg-muted text-muted-foreground px-2.5 py-1.5 rounded-xl flex items-center gap-1 font-sans">
                              <Clock className="h-3.5 w-3.5" />
                              {language === "en" ? video.durationEn : video.durationAs}
                            </span>
                            <button
                              onClick={() => setPlayingVideoId(isPlaying ? null : video.id)}
                              className="rounded-xl bg-indigo-600 text-white dark:bg-indigo-500 text-xs font-bold px-3 py-1.5 hover:opacity-95 flex items-center gap-1.5"
                            >
                              <Play className="h-3.5 w-3.5 fill-current" />
                              <span>{isPlaying ? (language === "en" ? "Close" : "বন্ধ কৰক") : (language === "en" ? "Watch" : "ভিডিঅ' চাওক")}</span>
                            </button>
                          </div>
                        </div>

                        {isPlaying && (
                          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-border mt-4 animate-fade-in">
                            <iframe
                              src={getEmbedUrl(video)}
                              title={language === "en" ? video.titleEn : video.titleAs}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="absolute inset-0 h-full w-full border-0"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {(!videoClassesData[currentUnit.id] || videoClassesData[currentUnit.id].length === 0) && (
                    <div className="text-center py-10 border border-dashed border-border bg-muted/10 rounded-2xl space-y-2">
                      <Tv className="h-8 w-8 text-muted-foreground/60 mx-auto" />
                      <h4 className="font-heading text-sm font-bold text-foreground">
                        {language === "en" ? "Videos Coming Soon" : "ভিডিঅ'সমূহ অতি সোনকালে উপলব্ধ হ'ব"}
                      </h4>
                      <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                        {language === "en"
                          ? "Chapter videos are being prepared and will be released soon."
                          : "এই অধ্যায়ৰ ভিডিঅ'সমূহ প্ৰস্তুত কৰা হৈ আছে আৰু অতি সোনকালে যোগ কৰা হ'ব।"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
      
    </div>
  );
}
