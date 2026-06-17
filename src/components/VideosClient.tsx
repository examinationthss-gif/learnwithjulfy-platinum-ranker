"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Play, Tv, Timer, Info, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { videoClassesData, VideoClass } from "@/data/videoClasses";

interface UnitConfig {
  id: string;
  numberKey: string;
  enTitle: string;
  asTitle: string;
}

const unitsList: UnitConfig[] = [
  { id: "unit1", numberKey: "1", enTitle: "Development of Secondary Education in India and Assam", asTitle: "ভাৰত আৰু অসমৰ মাধ্যমিক শিক্ষাৰ বিকাশ" },
  { id: "unit2", numberKey: "2", enTitle: "Non-formal Education & Media of Education", asTitle: "অনানুষ্ঠানিক শিক্ষা আৰু শিক্ষাৰ মাধ্যমসমূহ" },
  { id: "unit3", numberKey: "3", enTitle: "Current Trends in Education", asTitle: "শিক্ষাৰ সাম্প্ৰতিক ধাৰাসমূহ" },
  { id: "unit4", numberKey: "4", enTitle: "Learning", asTitle: "শিকন" },
  { id: "unit5", numberKey: "5", enTitle: "Memory & Attention", asTitle: "স্মৃতিশক্তি আৰু মনোযোগ" },
  { id: "unit6", numberKey: "6", enTitle: "Mental Health & Hygiene", asTitle: "মানসিক স্বাস্থ্য আৰু বিজ্ঞান" },
  { id: "unit7", numberKey: "7", enTitle: "Educational Statistics", asTitle: "শৈক্ষিক পৰিসংখ্যা" }
];

export default function VideosClient() {
  const { language, formatNumber } = useLanguage();
  const [activeUnit, setActiveUnit] = useState<string>("unit1");
  const [activeVideo, setActiveVideo] = useState<VideoClass | null>(null);
  const [mounted, setMounted] = useState(false);
  const [videoStartSeconds, setVideoStartSeconds] = useState(0);
  const [watchedVideos, setWatchedVideos] = useState<Record<string, boolean>>({});
  const playerRef = useRef<HTMLDivElement>(null);

  const isEn = language === "en";

  useEffect(() => {
    setMounted(true);
    
    // Set first video of unit1 as active by default if available
    const initialVideos = videoClassesData["unit1"];
    if (initialVideos && initialVideos.length > 0) {
      setActiveVideo(initialVideos[0]);
    }

    // Load watched videos progress from localStorage
    const savedWatched = localStorage.getItem("julfy-watched-videos");
    if (savedWatched) {
      try {
        setWatchedVideos(JSON.parse(savedWatched));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleVideoWatched = (videoId: string) => {
    const nextWatched = { ...watchedVideos, [videoId]: !watchedVideos[videoId] };
    setWatchedVideos(nextWatched);
    localStorage.setItem("julfy-watched-videos", JSON.stringify(nextWatched));
  };

  const handleSelectVideo = (video: VideoClass) => {
    setActiveVideo(video);
    setVideoStartSeconds(0);
    if (playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSelectUnit = (unitId: string) => {
    setActiveUnit(unitId);
    setVideoStartSeconds(0);
    const unitVideos = videoClassesData[unitId] || [];
    if (unitVideos.length > 0) {
      setActiveVideo(unitVideos[0]);
    } else {
      setActiveVideo(null);
    }
  };

  // Helper to find a video across all units by YouTube ID
  const findVideoByYoutubeId = (ytId: string): { video: VideoClass; unitId: string } | null => {
    for (const [unitId, videos] of Object.entries(videoClassesData)) {
      const found = videos.find(v => v.youtubeId === ytId);
      if (found) return { video: found, unitId };
    }
    return null;
  };

  const handleNavigateToVideo = (ytId: string) => {
    const result = findVideoByYoutubeId(ytId);
    if (result) {
      setActiveUnit(result.unitId);
      setActiveVideo(result.video);
      setVideoStartSeconds(0);
      if (playerRef.current) {
        playerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  if (!mounted) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 text-center text-sm text-muted-foreground">
        Loading Video Classes...
      </div>
    );
  }

  const activeVideos = videoClassesData[activeUnit] || [];


  const getEmbedUrl = (video: VideoClass) => {
    if (video.isPlaylist) {
      return `https://www.youtube.com/embed/videoseries?list=${video.youtubeId}&autoplay=0`;
    }
    const startParam = videoStartSeconds > 0 ? `&start=${videoStartSeconds}&autoplay=1` : "";
    return `https://www.youtube.com/embed/${video.youtubeId}?autoplay=0&rel=0${startParam}`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="space-y-2 text-center md:text-left">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          {isEn ? "Platinum Video Classes" : "প্লেটিনাম ভিডিঅ' ক্লাছসমূহ"}
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          {isEn
            ? "Watch structured video classes organized chapter-wise. Learn key Class 12 concepts visually with expert guidelines."
            : "অধ্যায়ভিত্তিক প্ৰণালীবদ্ধ ভিডিঅ' ক্লাছসমূহ উপভোগ কৰক। দ্বাদশ শ্ৰেণীৰ মূল ধাৰণাসমূহ বিশেষজ্ঞৰ নিৰ্দেশনাত চাক্ষুষভাৱে শিকক।"}
        </p>
      </div>

      {/* Grid: Player & Selection list */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Units Sidebar (desktop) */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="font-heading text-lg font-bold text-foreground px-1">
            {isEn ? "Course Chapters" : "পাঠ্যক্ৰমৰ অধ্যায়সমূহ"}
          </h2>
          
          <div className="space-y-2.5 max-h-[75vh] overflow-y-auto pr-2">
            {unitsList.map((unit) => {
              const isActive = unit.id === activeUnit;
              const unitVideos = videoClassesData[unit.id] || [];
              const totalVideos = unitVideos.length;
              const watchedCount = unitVideos.filter(v => watchedVideos[v.id]).length;
              const completionPercent = totalVideos > 0 ? Math.round((watchedCount / totalVideos) * 100) : 0;

              return (
                <button
                  key={unit.id}
                  onClick={() => handleSelectUnit(unit.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${
                    isActive
                      ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 shadow-sm"
                      : "border-border bg-card hover:bg-muted"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                      {isEn ? `Unit ${unit.numberKey}` : `গোট ${formatNumber(unit.numberKey)}`}
                    </span>
                    {completionPercent === 100 && (
                      <span className="text-[9px] font-bold uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <CheckCircle2 className="h-3 w-3 fill-current" />
                        {isEn ? "Complete" : "সম্পূৰ্ণ"}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1 font-bold text-sm text-foreground">
                    {isEn ? unit.enTitle : unit.asTitle}
                  </h3>
                  
                  {/* Progress Indicators */}
                  <div className="mt-3 space-y-1 font-sans">
                    <div className="flex justify-between items-center text-[10px] text-muted-foreground">
                      <span>
                        {isEn
                          ? `${watchedCount}/${totalVideos} watched`
                          : `${formatNumber(watchedCount)}/${formatNumber(totalVideos)} টা চোৱা হৈছে`}
                      </span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">
                        {completionPercent}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${completionPercent === 100 ? "bg-emerald-500" : "bg-indigo-600"}`}
                        style={{ width: `${completionPercent}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Theater Player & Chapter Videos Grid */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Theater Player Screen */}
          <div ref={playerRef} className="rounded-3xl border border-border bg-card overflow-hidden shadow-md">
            {activeVideo ? (
              <div className="space-y-0">
                
                {/* Embedded Video Screen */}
                <div className="relative aspect-video w-full bg-black">
                  <iframe
                    src={getEmbedUrl(activeVideo)}
                    title={isEn ? activeVideo.titleEn : activeVideo.titleAs}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>

                {/* Professional Student-Facing Info Card */}
                <div className="p-6 md:p-8 space-y-6 bg-slate-950 text-slate-100 border-t border-slate-800">
                  
                  {/* Header: Title and Completion button */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 gap-4">
                    <div className="space-y-1.5">
                      <h2 className="font-heading text-xl font-bold text-slate-100 leading-snug flex items-start gap-2">
                        <span className="shrink-0 mt-1">🎥</span>
                        <span>{isEn ? activeVideo.titleEn : activeVideo.titleAs}</span>
                      </h2>
                      {activeVideo.subtopicEn && (
                        <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider font-sans">
                          {isEn ? activeVideo.subtopicEn : activeVideo.subtopicAs}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => toggleVideoWatched(activeVideo.id)}
                      className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                        watchedVideos[activeVideo.id]
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                          : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <CheckCircle2 className={`h-4 w-4 ${watchedVideos[activeVideo.id] ? "text-emerald-400 fill-current" : ""}`} />
                      <span>
                        {watchedVideos[activeVideo.id]
                          ? (isEn ? "Watched ✓" : "চোৱা হৈছে ✓")
                          : (isEn ? "Mark as Watched" : "চোৱা বুলি চিহ্নিত কৰক")
                        }
                      </span>
                    </button>
                  </div>

                  {/* Watch Lesson Meta Fields */}
                  <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-sans">
                    <div>
                      <span className="text-slate-500 uppercase tracking-wider text-[9px] font-bold block mb-1">
                        {isEn ? "Board Importance" : "বোৰ্ড গুৰুত্ব"}
                      </span>
                      <span className="text-amber-400 font-bold text-sm tracking-wider">
                        {activeVideo.boardRelevanceEn?.toLowerCase() === "very high" ? "★★★★★" : 
                         activeVideo.boardRelevanceEn?.toLowerCase() === "high" ? "★★★★☆" : 
                         activeVideo.boardRelevanceEn?.toLowerCase() === "moderate" ? "★★★☆☆" : "★★☆☆☆"}
                      </span>
                    </div>
                    <div className="h-6 w-px bg-slate-800 hidden sm:block" />
                    <div>
                      <span className="text-slate-500 uppercase tracking-wider text-[9px] font-bold block mb-1">
                        {isEn ? "Duration" : "সময়সীমা"}
                      </span>
                      <span className="text-slate-200 font-bold">
                        {isEn ? activeVideo.durationEn : activeVideo.durationAs}
                      </span>
                    </div>
                    <div className="h-6 w-px bg-slate-800 hidden sm:block" />
                    <div>
                      <span className="text-slate-500 uppercase tracking-wider text-[9px] font-bold block mb-1">
                        {isEn ? "Topic" : "বিষয়"}
                      </span>
                      <span className="text-indigo-400 font-bold">
                        {isEn ? activeVideo.topicEn : activeVideo.topicAs}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {isEn ? activeVideo.descriptionEn : activeVideo.descriptionAs}
                  </p>

                  <div className="border-t border-slate-900 my-4" />

                  {/* 📘 Learning Objectives */}
                  {activeVideo.learningObjectivesEn && activeVideo.learningObjectivesEn.length > 0 && (
                    <div className="space-y-3 font-heading">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                        📘 {isEn ? "Key Learning Outcomes" : "মূল শিকন ফলাফলসমূহ"}
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 leading-relaxed font-sans">
                        {(isEn ? activeVideo.learningObjectivesEn : activeVideo.learningObjectivesAs || []).map((obj, i) => (
                          <li key={i} className="flex items-start gap-2 bg-slate-900/40 p-2.5 rounded-xl border border-slate-900/60">
                            <span className="text-indigo-400 font-bold shrink-0">•</span>
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 🎯 Board Focus */}
                  {activeVideo.boardFocusEn && activeVideo.boardFocusEn.length > 0 && (
                    <div className="space-y-3 font-heading">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                        🎯 {isEn ? "Board Focus" : "বোৰ্ড ফ'কাচ"}
                      </h3>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {(isEn ? activeVideo.boardFocusEn : activeVideo.boardFocusAs || []).map((focus, i) => (
                          <span 
                            key={i} 
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-semibold font-sans"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {focus}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 🧠 Memory Engine Mnemonic */}
                  {activeVideo.memoryEngine && (
                    <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-900/60 space-y-3 pt-4 font-heading">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                        🧠 {isEn ? "Memory Engine" : "স্মৃতি সূত্ৰ"}
                      </h3>
                      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 pt-1">
                        <div className="text-3xl font-black tracking-widest bg-gradient-to-r from-amber-400 to-indigo-400 bg-clip-text text-transparent px-4 py-2.5 bg-slate-950 rounded-xl border border-slate-800 select-all font-sans shrink-0 text-center">
                          {isEn ? activeVideo.memoryEngine.formulaEn : activeVideo.memoryEngine.formulaAs}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 w-full text-xs font-sans">
                          {(isEn ? activeVideo.memoryEngine.breakdownEn : activeVideo.memoryEngine.breakdownAs).map((item, i) => (
                            <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-900">
                              <span className="font-bold text-amber-400 font-mono text-sm shrink-0">{item.key}</span>
                              <span className="text-slate-300 line-clamp-1">{item.val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ⏱ Timeline Chapters */}
                  {activeVideo.timelineEn && activeVideo.timelineEn.length > 0 && (
                    <div className="space-y-3 pt-2 font-heading">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                        ⏱️ {isEn ? "Lesson Timeline" : "পাঠৰ সময়সূচী"}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans pt-1">
                        {(isEn ? activeVideo.timelineEn : activeVideo.timelineAs || []).map((item, i) => {
                          const timelineSeconds = (() => {
                            const parts = item.time.split(":");
                            return parts.length === 2 ? parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10) : 0;
                          })();

                          return (
                            <button
                              key={i}
                              onClick={() => setVideoStartSeconds(timelineSeconds)}
                              className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/40 border border-slate-900 hover:bg-slate-900 hover:border-slate-800 text-left transition-colors font-sans animate-fade-in"
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

                  {/* 📘 Related Notes */}
                  {activeVideo.relatedNotes && activeVideo.relatedNotes.length > 0 && (
                    <div className="space-y-3 pt-2 font-heading">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                        📘 {isEn ? "Related Notes" : "প্ৰাসংগিক টোকা"}
                      </h3>
                      <div className="flex flex-wrap gap-2 pt-1 font-sans">
                        {activeVideo.relatedNotes.map((note, idx) => (
                          <Link
                            key={idx}
                            href={`/notes/${activeUnit}/${note.dayId}?tab=notes`}
                            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-indigo-300 hover:bg-slate-850 transition-colors"
                          >
                            {isEn ? note.labelEn : note.labelAs}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 📝 Practice MCQs & 📊 Take Mini Test Action Panel */}
                  <div className="p-5 rounded-2xl bg-indigo-950/10 border border-indigo-900/20 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span className="text-xs text-slate-400 text-center sm:text-left font-sans leading-relaxed">
                      {isEn
                        ? "Ready to practice or take a quick assessment of this video lesson?"
                        : "এই ভিডিঅ' পাঠৰ ওপৰত কুইজ বা চুটি পৰীক্ষা দিবলৈ সাজু নে?"}
                    </span>
                    <div className="flex items-center gap-3 w-full sm:w-auto font-sans">
                      {activeVideo.relatedMcq && (
                        <Link
                          href={`/notes/${activeUnit}/${activeVideo.relatedMcq.dayId}?tab=mcq`}
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 text-xs text-indigo-350 dark:text-indigo-300 font-bold transition-all border border-indigo-500/20 text-center"
                        >
                          📝 {isEn ? "Practice MCQs" : "MCQ অনুশীলন"}
                        </Link>
                      )}
                      {activeVideo.dayId && (
                        <Link
                          href={`/notes/${activeUnit}/${activeVideo.dayId}?tab=test`}
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all text-center"
                        >
                          📊 {isEn ? "Take Mini Test" : "পৰীক্ষা দিয়ক"}
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Previous Video Lesson Navigation */}
                  {activeVideo.previousVideo && (
                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="space-y-1 font-sans">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          ⏮️ {isEn ? "Previous Recommended Lesson" : "পূৰ্বৱৰ্তী প্ৰস্তাৱিত পাঠ"}
                        </span>
                        <h4 className="text-sm font-bold text-slate-100">
                          {isEn ? activeVideo.previousVideo.titleEn : activeVideo.previousVideo.titleAs}
                        </h4>
                        <span className="text-[11px] text-slate-400 block">
                          {isEn ? `Duration: ${activeVideo.previousVideo.durationEn}` : `সময়সীমা: ${activeVideo.previousVideo.durationAs}`}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          if (activeVideo.previousVideo?.youtubeId) {
                            handleNavigateToVideo(activeVideo.previousVideo.youtubeId);
                          }
                        }}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors shrink-0 font-sans"
                      >
                        {isEn ? "← Go to Previous Lesson" : "← পূৰ্বৱৰ্তী পাঠলৈ যাওক"}
                      </button>
                    </div>
                  )}

                  {/* Next Video Lesson Navigation */}
                  {activeVideo.nextVideo && (
                    <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-900/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="space-y-1 font-sans">
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
                          ⏭️ {isEn ? "Next Recommended Lesson" : "পৰৱৰ্তী প্ৰস্তাৱিত পাঠ"}
                        </span>
                        <h4 className="text-sm font-bold text-slate-100">
                          {isEn ? activeVideo.nextVideo.titleEn : activeVideo.nextVideo.titleAs}
                        </h4>
                        <span className="text-[11px] text-slate-400 block">
                          {isEn ? `Duration: ${activeVideo.nextVideo.durationEn}` : `সময়সীমা: ${activeVideo.nextVideo.durationAs}`}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          if (activeVideo.nextVideo?.youtubeId) {
                            handleNavigateToVideo(activeVideo.nextVideo.youtubeId);
                          }
                        }}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shrink-0 font-sans"
                      >
                        {isEn ? "Go to Next Lesson →" : "পৰৱৰ্তী পাঠলৈ যাওক →"}
                      </button>
                    </div>
                  )}

                </div>
              </div>
            ) : (
              <div className="aspect-video w-full flex flex-col items-center justify-center bg-muted text-center p-6 space-y-3">
                <Tv className="h-12 w-12 text-muted-foreground/60" />
                <h3 className="font-heading font-bold text-sm text-foreground">
                  {isEn ? "No Video Selected" : "কোনো ভিডিঅ' বাছনি কৰা হোৱা নাই"}
                </h3>
                <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                  {isEn
                    ? "Select a class from the list below to launch the video player."
                    : "ভিডিঅ' প্লেয়াৰটো আৰম্ভ কৰিবলৈ তলৰ তালিকাৰ পৰা এটা ক্লাছ বাছনি কৰক।"}
                </p>
              </div>
            )}
          </div>

          {/* Videos Grid for Selected Unit */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-foreground flex items-center gap-2 border-b border-border/60 pb-3">
              <Tv className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <span>
                {isEn ? "Videos in this Unit" : "এই গোটৰ ভিডিঅ'সমূহ"}
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeVideos.map((video) => {
                const isPlaying = activeVideo?.id === video.id;
                return (
                  <div
                    key={video.id}
                    className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between relative ${
                      isPlaying
                        ? "border-indigo-500 bg-indigo-500/5 shadow-sm"
                        : watchedVideos[video.id]
                        ? "border-emerald-500/30 bg-emerald-500/[0.02]"
                        : "border-border bg-card/60 hover:border-indigo-500/20"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1 font-sans">
                          <Timer className="h-3.5 w-3.5" />
                          {isEn ? video.durationEn : video.durationAs}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          {watchedVideos[video.id] && (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1 font-sans">
                              <CheckCircle2 className="h-3 w-3 fill-current" />
                              {isEn ? "Watched" : "চোৱা হৈছে"}
                            </span>
                          )}
                          {video.isPlaylist && (
                            <span className="text-[9px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                              Playlist
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <h4 className="font-heading text-sm font-bold text-foreground line-clamp-2 leading-snug">
                        {isEn ? video.titleEn : video.titleAs}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-sans">
                        {isEn ? video.descriptionEn : video.descriptionAs}
                      </p>
                    </div>

                    <div className="flex gap-2 mt-4 font-sans">
                      {/* Play Button */}
                      <button
                        onClick={() => handleSelectVideo(video)}
                        disabled={isPlaying}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                          isPlaying
                            ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 cursor-default"
                            : "bg-indigo-600 text-white dark:bg-indigo-500 hover:opacity-95"
                        }`}
                      >
                        <Play className="h-3.5 w-3.5 fill-current shrink-0" />
                        <span>
                          {isPlaying
                            ? (isEn ? "Playing" : "চলি আছে")
                            : (isEn ? "Watch Class" : "ক্লাছটো চাওক")
                          }
                        </span>
                      </button>
                      
                      {/* Checkbox Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleVideoWatched(video.id);
                        }}
                        className={`px-3 py-2 rounded-xl border transition-all flex items-center justify-center ${
                          watchedVideos[video.id]
                            ? "border-emerald-500 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                            : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                        }`}
                        title={isEn ? "Toggle Watched Status" : "চোৱা বুলি চিহ্নিত কৰক"}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {activeVideos.length === 0 && (
                <div className="col-span-2 text-center py-12 border border-dashed border-border bg-muted/10 rounded-2xl space-y-2">
                  <Info className="h-8 w-8 text-muted-foreground/60 mx-auto" />
                  <h4 className="font-heading text-sm font-bold text-foreground">
                    {isEn ? "No videos uploaded yet" : "বৰ্তমান কোনো ভিডিঅ' আপলোড কৰা হোৱা নাই"}
                  </h4>
                  <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                    {isEn
                      ? "Classes for this unit are being prepared and will be released shortly."
                      : "এই অধ্যায়ৰ ক্লাছসমূহ প্ৰস্তুত কৰা হৈ আছে আৰু অতি সোনকালে উপলব্ধ হ'ব।"}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
