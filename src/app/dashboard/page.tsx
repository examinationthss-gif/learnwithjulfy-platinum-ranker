"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useStudent } from "@/context/StudentContext";
import { StudentService } from "@/lib/services/studentService";
import { ProgressService } from "@/lib/services/progressService";
import { AnalyticsService } from "@/lib/services/analyticsService";
import { getLevelTitle, getLevelColor } from "@/lib/xpEngine";
import { BADGE_MAP, getRarityColor } from "@/lib/badgeEngine";
import {
  BookOpen,
  Brain,
  Video,
  Flame,
  Trophy,
  Zap,
  Target,
  Edit3,
  School,
  Hash,
  Activity,
  TrendingUp,
  CheckCircle,
  Calendar,
  Award
} from "lucide-react";

// Unit metadata
const UNITS = [
  { id: "unit1", label: "Unit I", name: "Secondary Education in India", color: "from-blue-500 to-indigo-600" },
  { id: "unit2", label: "Unit II", name: "Non-formal Education", color: "from-purple-500 to-violet-600" },
  { id: "unit3", label: "Unit III", name: "Current Trends", color: "from-emerald-500 to-teal-600" },
  { id: "unit4", label: "Unit IV", name: "Learning", color: "from-amber-500 to-orange-600" },
  { id: "unit5", label: "Unit V", name: "Memory & Attention", color: "from-pink-500 to-rose-600" },
  { id: "unit6", label: "Unit VI", name: "Mental Health", color: "from-cyan-500 to-sky-600" },
  { id: "unit7", label: "Unit VII", name: "Educational Statistics", color: "from-red-500 to-pink-600" },
];

export default function DashboardPage() {
  const {
    profile,
    totalXP,
    level,
    currentStreak,
    completedDaysCount,
    watchedVideosCount,
    refreshStats
  } = useStudent();

  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Profile edit fields
  const [editName, setEditName] = useState("");
  const [editRoll, setEditRoll] = useState("");
  const [localSchool, setLocalSchool] = useState("");

  useEffect(() => {
    setMounted(true);
    if (profile) {
      setEditName(profile.name);
      setEditRoll(profile.rollNumber || "");
      setLocalSchool(profile.school || "");
    }
  }, [profile]);

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;

    StudentService.saveProfile({
      name: editName.trim(),
      rollNumber: editRoll.trim(),
      school: localSchool.trim(),
      avatar: profile?.avatar || "🎓"
    });
    setIsEditing(false);
    refreshStats();
  };

  if (!mounted) return null;

  // If no profile, show placeholder or onboarding call to action
  if (!profile) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <Trophy className="h-14 w-14 text-indigo-500 animate-bounce" />
        <h2 className="text-xl font-bold text-foreground">Student Profile Required</h2>
        <p className="text-xs text-muted-foreground max-w-xs">
          Please click Home or refresh the page to setup your student credentials.
        </p>
      </div>
    );
  }

  // Load analytics & progress metrics dynamically using Services layer
  const analytics = AnalyticsService.getReport();
  const completedDays = ProgressService.getCompletedDays();
  const unlockedBadges = ProgressService.getUnlockedBadges();
  
  const unitCompletions = UNITS.map((u) => {
    return Object.entries(completedDays).filter(([key, val]) => val && key.startsWith(u.id)).length;
  });

  const overallProgress = Math.round((completedDaysCount / 140) * 100);

  return (
    <div className="min-h-screen bg-background font-sans">
      
      {/* Redesigned Udemy style Dashboard Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-500/10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl animate-pulse-slow" />
        
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-8">
            
            {/* Student Profile Info */}
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className={`flex h-18 w-18 items-center justify-center rounded-2xl bg-gradient-to-br ${getLevelColor(level)} text-3xl shadow-xl shadow-indigo-500/10`}>
                {profile.avatar}
              </div>
              <div className="space-y-1.5">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  {isEditing ? (
                    <form onSubmit={handleEditSave} className="flex flex-wrap items-center gap-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-white rounded-lg px-2.5 py-1 text-sm font-semibold max-w-[150px] focus:outline-none"
                      />
                      <input
                        type="text"
                        value={editRoll}
                        placeholder="Roll"
                        onChange={(e) => setEditRoll(e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-white rounded-lg px-2 py-1 text-sm font-semibold max-w-[60px] text-center focus:outline-none"
                      />
                      <input
                        type="text"
                        value={localSchool}
                        placeholder="School"
                        onChange={(e) => setLocalSchool(e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-white rounded-lg px-2.5 py-1 text-sm font-semibold max-w-[120px] focus:outline-none"
                      />
                      <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-2.5 py-1.5 rounded-lg">
                        Save
                      </button>
                    </form>
                  ) : (
                    <>
                      <h1 className="text-2xl font-bold font-heading text-white">{profile.name}</h1>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-slate-400 hover:text-white transition-colors"
                        title="Edit Profile"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 text-xs text-slate-350">
                  <span className="flex items-center gap-1">
                    <School className="h-3.5 w-3.5 text-indigo-400" />
                    {profile.school || "AHSEC Academy"}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Hash className="h-3.5 w-3.5 text-purple-400" />
                    Roll: {profile.rollNumber || "N/A"}
                  </span>
                  <span>&bull;</span>
                  <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px]">
                    {getLevelTitle(level)}
                  </span>
                </div>
              </div>
            </div>

            {/* Level / XP / Leaderboard Trigger */}
            <div className="flex items-center gap-4 sm:gap-6 shrink-0">
              <Link
                href="/leaderboard"
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-all hover:scale-102"
              >
                <Trophy className="h-4 w-4" />
                <span>Leaderboard</span>
              </Link>
              
              <div className="bg-slate-950/40 backdrop-blur border border-slate-800 p-4 rounded-2xl text-center min-w-[100px]">
                <div className="flex items-center justify-center gap-1.5">
                  <Zap className="h-4 w-4 text-amber-400 fill-current" />
                  <span className="text-lg font-bold">{totalXP}</span>
                </div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider mt-1">Total XP</span>
              </div>

              <div className="bg-slate-950/40 backdrop-blur border border-slate-800 p-4 rounded-2xl text-center min-w-[100px]">
                <div className="flex items-center justify-center gap-1.5">
                  <Flame className="h-4 w-4 text-orange-500 fill-current animate-pulse" />
                  <span className="text-lg font-bold">{currentStreak}</span>
                </div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider mt-1">Streak Days</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
        {/* Progress Tracker Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Lessons Read", value: `${completedDaysCount} / 140`, sub: `${overallProgress}% of syllabus`, icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10" },
            { label: "MCQ Accuracy", value: `${analytics.mcqAccuracy}%`, sub: "Interactive quizzes accuracy", icon: Brain, color: "text-purple-500", bg: "bg-purple-500/10" },
            { label: "Videos Watched", value: watchedVideosCount.toString(), sub: "Video lessons viewed", icon: Video, color: "text-emerald-500", bg: "bg-emerald-500/10" },
            { label: "Consistency Rate", value: `${analytics.studyConsistency}%`, sub: "Weekly pace rating", icon: Activity, color: "text-amber-500", bg: "bg-amber-500/10" }
          ].map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-all">
              <div className={`h-10 w-10 rounded-xl ${item.bg} flex items-center justify-center mb-3`}>
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <p className="text-xl font-bold text-foreground">{item.value}</p>
              <p className="text-xs font-bold text-foreground mt-0.5">{item.label}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Analytics Section & Unit completion cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Unit roadmaps */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border/80 pb-3">
              <Target className="h-5 w-5 text-indigo-500" />
              <span>Course Syllabus Roadmap Progress</span>
            </h2>
            <div className="space-y-3.5 font-sans">
              {UNITS.map((unit, index) => {
                const completions = unitCompletions[index] || 0;
                const pct = Math.round((completions / 20) * 100);
                return (
                  <div key={unit.id} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-foreground truncate max-w-[200px] sm:max-w-none">
                        Unit {index + 1}: {unit.name}
                      </span>
                      <span className="font-bold text-muted-foreground">{completions} / 20</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${unit.color}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-muted-foreground w-8 text-right shrink-0">{pct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Intelligence & Analytics insights */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border/80 pb-3">
              <TrendingUp className="h-5 w-5 text-indigo-500" />
              <span>AI Learning Insights</span>
            </h2>

            {/* Strong Areas */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                Strong Units
              </span>
              <div className="space-y-1.5">
                {analytics.strongAreas.map((area, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs font-medium text-foreground bg-muted/40 p-2 rounded-lg border border-border/60">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span className="line-clamp-1">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak Areas */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded">
                Needs Focus
              </span>
              <div className="space-y-1.5">
                {analytics.weakAreas.map((area, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs font-medium text-foreground bg-muted/40 p-2 rounded-lg border border-border/60">
                    <span className="text-rose-500 shrink-0 text-sm">⚠️</span>
                    <span className="line-clamp-1">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Heatmap & Badges row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Calendar Heatmap simulation */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border/80 pb-3">
              <Calendar className="h-5 w-5 text-indigo-500" />
              <span>Daily Study Log Consistency (30 Days)</span>
            </h2>
            <div className="grid grid-cols-10 gap-2.5">
              {Array.from({ length: 30 }).map((_, idx) => {
                const dayKey = `unit1-day${idx + 1}`;
                const isActive = completedDays[dayKey] || idx < 3; // simulated default consistency
                return (
                  <div
                    key={idx}
                    title={`Day ${idx + 1}`}
                    className={`h-7 w-full rounded-lg transition-all ${
                      isActive
                        ? "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/20"
                        : "bg-muted"
                    }`}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span>30 Days Ago</span>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-sm bg-muted" />
                <span>Rest</span>
                <div className="h-2 w-2 rounded-sm bg-indigo-500" />
                <span>Studied</span>
              </div>
              <span>Today</span>
            </div>
          </div>

          {/* Gamified Achievements Badge Showcase */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border/80 pb-3">
              <Award className="h-5 w-5 text-indigo-500" />
              <span>Academy Badges & Achievements</span>
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {unlockedBadges.length > 0 ? (
                unlockedBadges.map((badgeId) => {
                  const badge = BADGE_MAP[badgeId];
                  if (!badge) return null;
                  return (
                    <div key={badgeId} className="flex items-center gap-2.5 p-2 rounded-xl bg-muted/40 border border-border">
                      <span className="text-2xl shrink-0">{badge.icon}</span>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-foreground line-clamp-1">{badge.nameEn}</p>
                        <span className={`text-[8px] font-bold uppercase tracking-wider ${getRarityColor(badge.rarity)}`}>
                          {badge.rarity}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-6 text-xs text-muted-foreground">
                  🎖️ No achievements earned yet. Read study notes to earn badges!
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
