"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { CheckCircle, Circle, Search, Clock, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Fuse from "fuse.js";
import searchIndex from "@/data/searchIndex.json";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [completedDays, setCompletedDays] = useState<Record<string, boolean>>({});
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({ unit1: true });
  const [mounted, setMounted] = useState(false);

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

  const toggleUnitExpand = (unitId: string) => {
    setExpandedUnits(prev => ({
      ...prev,
      [unitId]: !prev[unitId]
    }));
  };

  const toggleDayCompletion = (unitId: string, day: number) => {
    const key = `${unitId}-day${day}`;
    const updated = {
      ...completedDays,
      [key]: !completedDays[key],
    };
    setCompletedDays(updated);
    localStorage.setItem("julfy-completed-days", JSON.stringify(updated));
  };




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
    return { completedCount, pct };
  };

  if (!mounted) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-10 animate-fade-in font-sans">
      
      {/* Search Header Banner */}
      <div className="bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 rounded-3xl border border-indigo-500/10 p-6 md:p-10 shadow-2xl relative overflow-hidden text-slate-100">
        <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-4 text-center md:text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">
              Syllabus Curriculum Course Roadmap
            </span>
            <h1 className="text-3xl font-extrabold font-heading text-white">
              {t("notesHeader")}
            </h1>
            <p className="text-xs text-slate-350 max-w-xl font-sans leading-relaxed">
              {t("notesSub")}
            </p>
          </div>

          {/* Search Box */}
          <div className="md:col-span-4 relative">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs placeholder:text-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-medium font-sans"
              />
            </div>

            {/* Auto-suggest list */}
            {searchResults.length > 0 && (
              <div className="absolute top-12 left-0 right-0 z-20 rounded-xl border border-slate-800 bg-slate-950 p-2 shadow-2xl space-y-1 font-sans">
                {searchResults.map((item, idx) => (
                  <Link
                    key={idx}
                    href={`/notes/${item.unitId}/${item.dayId}`}
                    className="block p-2 hover:bg-slate-900 rounded-lg text-left transition-colors"
                  >
                    <p className="text-xs font-bold text-white line-clamp-1">
                      {language === "en" ? item.enTitle : item.asTitle}
                    </p>
                    <p className="text-[10px] text-indigo-400 mt-0.5 uppercase tracking-wider font-semibold font-mono">
                      {item.unitId.toUpperCase()} &bull; {item.dayId.toUpperCase()}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resume learning action strip */}
      {lastDayLabel && (
        <div className="flex flex-col sm:flex-row items-center justify-between p-5 rounded-2xl bg-indigo-600/5 border border-indigo-500/10 gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="text-xl">📖</span>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Continue your learning journey</p>
              <p className="text-sm font-bold text-foreground mt-0.5">{lastDayLabel}</p>
            </div>
          </div>
          <Link
            href={lastDayUrl}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-2 shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20"
          >
            <Sparkles className="h-4 w-4" />
            <span>Resume Lesson</span>
          </Link>
        </div>
      )}

      {/* Course Accordion list (Udemy style curriculum) */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-foreground border-b border-border pb-3 flex items-center gap-2">
          <span>📚 Course Curriculum</span>
          <span className="text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full">
            7 Units &bull; 140 Lessons
          </span>
        </h2>

        <div className="space-y-4">
          {baseUnits.map((unit) => {
            const isExpanded = expandedUnits[unit.id];
            const { completedCount, pct } = getUnitProgress(unit.id);
            const unitTitle = language === "en" ? unit.enTitle : unit.asTitle;
            const unitDesc = language === "en" ? unit.enDescription : unit.asDescription;
            const unitTopics = language === "en" ? unit.enTopics : unit.asTopics;

            return (
              <div
                key={unit.id}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:border-indigo-500/20 transition-all"
              >
                {/* Header Acc Trigger */}
                <button
                  onClick={() => toggleUnitExpand(unit.id)}
                  className="w-full p-6 text-left flex items-start justify-between gap-6 hover:bg-muted/10 transition-colors"
                >
                  <div className="flex-1 space-y-3 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                        Unit {unit.numberKey}
                      </span>
                      <span className="text-xs text-muted-foreground font-semibold">
                        {completedCount} / 20 Completed
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-foreground tracking-tight line-clamp-1">
                      {unitTitle}
                    </h3>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-sans">
                      {unitDesc}
                    </p>

                    {/* Udemy Style Course Completion Bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 w-8 text-right shrink-0">
                        {pct}%
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 mt-1 flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </button>

                {/* Days Curriculum List */}
                {isExpanded && (
                  <div className="border-t border-border bg-muted/10 divide-y divide-border/80">
                    
                    {/* Curriculum Topics summary tags */}
                    <div className="px-6 py-4 flex flex-wrap gap-1.5 border-b border-border/80 bg-muted/20 font-sans">
                      {unitTopics.map((topic, index) => (
                        <span key={index} className="text-[10px] font-bold px-2 py-1 rounded bg-background border border-border/60 text-muted-foreground">
                          📌 {topic}
                        </span>
                      ))}
                    </div>

                    {/* 20 Days list */}
                    {Array.from({ length: 20 }, (_, i) => {
                      const day = i + 1;
                      const dayId = `day${day}`;
                      const key = `${unit.id}-${dayId}`;
                      const isDone = completedDays[key];

                      return (
                        <div
                          key={day}
                          className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/20 transition-all"
                        >
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            {/* Done check trigger */}
                            <button
                              onClick={() => toggleDayCompletion(unit.id, day)}
                              className="shrink-0 mt-0.5 text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                              title={isDone ? "Mark Uncompleted" : "Mark Completed"}
                            >
                              {isDone ? (
                                <CheckCircle className="h-5 w-5 text-emerald-500 fill-emerald-500/10" />
                              ) : (
                                <Circle className="h-5 w-5 border-2 rounded-full border-muted-foreground" />
                              )}
                            </button>
                            
                            <div className="min-w-0">
                              <p className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono">
                                Lesson Day {day}
                              </p>
                              <Link
                                href={`/notes/${unit.id}/${dayId}`}
                                className="text-sm font-semibold text-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mt-0.5 block"
                              >
                                {language === "en" ? `Day ${day} Core Curriculum Module` : `দিন ${formatNumber(day)} ৰ ৰোডমেপ বিষয়সূচী`}
                              </Link>
                              <span className="text-[10px] text-muted-foreground font-sans inline-flex items-center gap-1 mt-1">
                                <Clock className="h-3 w-3" />
                                15 mins study time
                              </span>
                            </div>
                          </div>

                          {/* Quick Learning Tabs Link */}
                          <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
                            <Link
                              href={`/notes/${unit.id}/${dayId}?tab=notes`}
                              className="px-3 py-1.5 rounded-xl border border-border text-[10px] font-bold bg-background text-foreground hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-colors"
                            >
                              📖 Study
                            </Link>
                            <Link
                              href={`/notes/${unit.id}/${dayId}?tab=mcq`}
                              className="px-3 py-1.5 rounded-xl border border-border text-[10px] font-bold bg-background text-foreground hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 transition-colors"
                            >
                              🧠 MCQ Quiz
                            </Link>
                            <Link
                              href={`/notes/${unit.id}/${dayId}?tab=revision`}
                              className="px-3 py-1.5 rounded-xl border border-border text-[10px] font-bold bg-background text-foreground hover:bg-rose-600 hover:text-white dark:hover:bg-rose-500 transition-colors"
                            >
                              ⚡ Revision
                            </Link>
                            <Link
                              href={`/notes/${unit.id}/${dayId}?tab=test`}
                              className="px-3 py-1.5 rounded-xl border border-border text-[10px] font-bold bg-background text-foreground hover:bg-amber-600 hover:text-white dark:hover:bg-amber-500 transition-colors"
                            >
                              📋 Test
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
