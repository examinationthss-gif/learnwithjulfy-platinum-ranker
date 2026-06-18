"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStudent } from "@/context/StudentContext";
import {
  getLast30DaysActivity,
  getMCQStats,
  getCompletedDays,
  STORAGE_KEYS,
  safeGet,
} from "@/lib/localStorage";
import { getLevelTitle, getLevelColor } from "@/lib/xpEngine";
import { BADGE_MAP, getRarityColor } from "@/lib/badgeEngine";
import { getIntelligenceReport, getPredictedBoardReport, getStudyPlanner } from "@/lib/intelligenceEngine";
import {
  BookOpen,
  Brain,
  Video,
  Flame,
  Trophy,
  BarChart3,
  ArrowRight,
  Zap,
  Calendar,
  Target,
  TrendingUp,
  Award,
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

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const router = useRouter();
  const {
    profile,
    totalXP,
    level,
    levelProgress,
    currentStreak,
    longestStreak,
    completedDaysCount,
    watchedVideosCount,
    overallMCQAccuracy,
    unlockedBadges,
  } = useStudent();

  const [mounted, setMounted] = useState(false);
  const [activityData, setActivityData] = useState<{ date: string; active: boolean }[]>([]);
  const [mcqStats, setMcqStats] = useState<Record<string, { correct: number; total: number }>>({});
  const [unitCompletions, setUnitCompletions] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [lastUrl, setLastUrl] = useState<string | null>(null);
  const [lastLabel, setLastLabel] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setActivityData(getLast30DaysActivity());
    setMcqStats(getMCQStats());

    // Calculate unit completions
    const days = getCompletedDays();
    const completions = UNITS.map((u) => {
      return Object.entries(days).filter(([key, val]) => val && key.startsWith(u.id)).length;
    });
    setUnitCompletions(completions);

    const url = safeGet<string | null>(STORAGE_KEYS.LAST_VISITED_URL, null);
    const label = safeGet<string | null>(STORAGE_KEYS.LAST_VISITED_LABEL, null);
    setLastUrl(url);
    setLastLabel(label);
  }, []);

  useEffect(() => {
    if (mounted && !profile?.hasOnboarded) {
      router.replace("/welcome");
    }
  }, [mounted, profile, router]);

  if (!mounted || !profile) return null;

  const greeting = getGreeting();
  const totalMCQAttempts = Object.values(mcqStats).reduce((s, e) => s + e.total, 0);
  const totalCorrect = Object.values(mcqStats).reduce((s, e) => s + e.correct, 0);
  const recentBadges = unlockedBadges.slice(-4).reverse();
  const overallProgress = Math.round((completedDaysCount / 140) * 100);

  // Load intelligence engine metrics
  const intelligence = getIntelligenceReport();
  const predictions = getPredictedBoardReport();
  const planner = getStudyPlanner();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Welcome Strip */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* Left: Greeting */}
            <div className="flex items-center gap-4">
              <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${getLevelColor(level)} text-3xl shadow-2xl`}>
                {profile.avatar}
              </div>
              <div>
                <p className="text-sm text-white/70 font-medium">{greeting} 👋</p>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold font-heading">{profile.name}!</h1>
                  <Link href="/profile" className="text-xs bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded border border-white/10 transition-colors text-white font-semibold">
                    View Profile
                  </Link>
                </div>
                <p className="text-sm text-white/60 mt-0.5">
                  Level {level} • {getLevelTitle(level)}
                </p>
              </div>
            </div>

            {/* Right: Streak + XP */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Leaderboard CTA */}
              <Link href="/leaderboard" className="flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all">
                <Trophy className="h-4 w-4" />
                <span>Leaderboard</span>
              </Link>

              {/* Streak */}
              <div className="flex flex-col items-center gap-1 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20">
                <div className="flex items-center gap-1.5">
                  <Flame className="h-5 w-5 text-orange-400" />
                  <span className="text-2xl font-bold">{currentStreak}</span>
                </div>
                <span className="text-xs text-white/60 font-medium">Day Streak</span>
              </div>

              {/* XP */}
              <div className="flex flex-col items-center gap-1 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20 min-w-[120px]">
                <div className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span className="text-xl font-bold">{totalXP.toLocaleString()}</span>
                  <span className="text-xs text-white/60">XP</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1.5 mt-1">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 transition-all duration-700"
                    style={{ width: `${levelProgress.progressPercent}%` }}
                  />
                </div>
                <span className="text-[10px] text-white/50">Lv.{level} → {levelProgress.xpIntoLevel}/{levelProgress.xpForNextLevel} XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">

        {/* Prediction Engine Readiness Panel */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-1 rounded-full">
                AHSEC Board Readiness predictor
              </span>
              <h2 className="text-xl font-bold text-foreground mt-3">Syllabus Score Forecast</h2>
              <p className="text-sm text-muted-foreground mt-1">
                AI estimates score values dynamically based on topic progress, streak consistency, and quiz performance.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Predicted Board Grade</p>
                  <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">{predictions.predictedScore} <span className="text-xs text-muted-foreground font-semibold">/100</span></p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Readiness Level</p>
                  <p className={`text-sm font-bold mt-2.5 inline-block px-2.5 py-0.5 rounded-lg ${
                    predictions.readinessLevel === "Board Ready" ? "bg-emerald-500/10 text-emerald-500" :
                    predictions.readinessLevel === "High" ? "bg-blue-500/10 text-blue-500" : "bg-amber-500/10 text-amber-500"
                  }`}>{predictions.readinessLevel}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Exam Countdown</p>
                  <p className="text-lg font-bold text-foreground mt-2 flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-indigo-500" />
                    <span>{planner.examCountdownDays} Days Remaining</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Score circular Dial indicator */}
            <div className="relative h-32 w-32 shrink-0">
              <svg className="h-full w-full" viewBox="0 0 36 36">
                <path
                  className="text-muted stroke-current"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-indigo-600 dark:text-indigo-400 stroke-current"
                  strokeDasharray={`${predictions.predictedScore}, 100`}
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-foreground">{predictions.predictedScore}%</span>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Prepared</span>
              </div>
            </div>
          </div>

          {/* Risk Alerts segment */}
          {predictions.riskAlerts.length > 0 && (
            <div className="mt-6 border-t border-border pt-4">
              <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2.5">Syllabus risk alerts</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {predictions.riskAlerts.map((alert, idx) => (
                  <div key={idx} className="bg-red-500/5 border border-red-500/10 p-3 rounded-xl">
                    <p className="text-xs font-bold text-red-500">Unit ID: {alert.unitId.toUpperCase()}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{alert.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Personalized Study Planner & SVG Progress charts */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Smart daily planner */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
            <h3 className="text-base font-bold text-foreground mb-4">Personalized Study Planner</h3>
            {planner.missedSessionRecovery && (
              <div className="mb-4 bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 p-3 rounded-xl text-xs font-medium">
                {planner.missedSessionRecovery}
              </div>
            )}
            <div className="space-y-3">
              {planner.dailyGoals.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3.5 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {task.type === "read" ? "📖" : task.type === "mcq" ? "🧠" : task.type === "video" ? "🎥" : "📊"}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.subtitle}</p>
                    </div>
                  </div>
                  <Link href={task.href} className="text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-lg shadow-sm transition-colors">
                    Start
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* SVG Learning Velocity Chart */}
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-foreground mb-1">Weekly Learning Velocity</h3>
              <p className="text-xs text-muted-foreground mb-4">Completed day units per week</p>
            </div>
            
            {/* SVG Visual line graph */}
            <div className="h-28 w-full bg-muted/20 rounded-xl relative p-2">
              <svg className="h-full w-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                <path
                  d="M0,25 Q20,15 40,22 T80,10 T100,5"
                  fill="none"
                  stroke="rgba(99, 102, 241, 0.4)"
                  strokeWidth="1.5"
                />
                <path
                  d="M0,25 Q20,15 40,22 T80,10 T100,5"
                  fill="none"
                  stroke="rgb(99, 102, 241)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                {/* Dots at graph changes */}
                <circle cx="0" cy="25" r="1.5" fill="rgb(168, 85, 247)" />
                <circle cx="40" cy="22" r="1.5" fill="rgb(168, 85, 247)" />
                <circle cx="80" cy="10" r="1.5" fill="rgb(168, 85, 247)" />
                <circle cx="100" cy="5" r="1.8" fill="rgb(234, 179, 8)" />
              </svg>
              <div className="absolute bottom-1.5 left-2 right-2 flex justify-between text-[8px] font-bold text-muted-foreground">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Active</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div className="bg-muted/40 p-2.5 rounded-xl">
                <p className="text-lg font-black text-foreground">{intelligence.totalStudyHours}h</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Study Hours</p>
              </div>
              <div className="bg-muted/40 p-2.5 rounded-xl">
                <p className="text-lg font-black text-foreground">~{intelligence.learningVelocity} Days</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Weekly velocity</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stat Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Notes Complete",
              value: `${completedDaysCount}/140`,
              sub: `${overallProgress}% of course`,
              icon: BookOpen,
              color: "text-blue-500",
              bg: "bg-blue-500/10",
              href: "/notes",
            },
            {
              label: "MCQ Accuracy",
              value: totalMCQAttempts > 0 ? `${overallMCQAccuracy}%` : "—",
              sub: `${totalCorrect}/${totalMCQAttempts} correct`,
              icon: Brain,
              color: "text-purple-500",
              bg: "bg-purple-500/10",
              href: "/mcq",
            },
            {
              label: "Videos Watched",
              value: watchedVideosCount.toString(),
              sub: "lesson videos",
              icon: Video,
              color: "text-emerald-500",
              bg: "bg-emerald-500/10",
              href: "/videos",
            },
            {
              label: "Best Streak",
              value: `${longestStreak}`,
              sub: `${currentStreak} current`,
              icon: Flame,
              color: "text-orange-500",
              bg: "bg-orange-500/10",
              href: "/dashboard/report",
            },
          ].map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="rounded-2xl border border-border bg-card p-5 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-lg hover:-translate-y-0.5 group"
            >
              <div className={`h-10 w-10 rounded-xl ${card.bg} flex items-center justify-center mb-3`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground">{card.value}</p>
              <p className="text-sm font-semibold text-foreground mt-0.5">{card.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
            </Link>
          ))}
        </div>

        {/* Middle Row: Progress Map + Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Unit Progress Map */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-500" />
                <h2 className="text-base font-bold text-foreground">Course Progress Map</h2>
              </div>
              <Link href="/notes" className="text-xs text-indigo-500 hover:underline flex items-center gap-1">
                View Notes <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {UNITS.map((unit, i) => {
                const completed = unitCompletions[i] || 0;
                const pct = Math.min(Math.round((completed / 20) * 100), 100);
                return (
                  <Link
                    key={unit.id}
                    href={`/notes#${unit.id}`}
                    className="flex items-center gap-4 group hover:bg-muted/40 rounded-xl p-2 transition-colors"
                  >
                    <div className={`h-8 w-8 shrink-0 rounded-lg bg-gradient-to-br ${unit.color} flex items-center justify-center text-white text-xs font-bold`}>
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-foreground truncate">{unit.name}</span>
                        <span className="text-xs font-bold text-muted-foreground ml-2 shrink-0">{completed}/20</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${unit.color} transition-all duration-700`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <span className={`text-xs font-bold shrink-0 ${pct === 100 ? "text-emerald-500" : "text-muted-foreground"}`}>
                      {pct === 100 ? "✓" : `${pct}%`}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-indigo-500" />
                <h2 className="text-base font-bold text-foreground">Quick Actions</h2>
              </div>
              <div className="space-y-2.5">
                {[
                  {
                    icon: "📖",
                    label: "Continue Notes",
                    sub: lastLabel || "Pick up where you left off",
                    href: lastUrl || "/notes",
                    color: "hover:border-blue-400/50",
                  },
                  {
                    icon: "🧠",
                    label: "Practice MCQs",
                    sub: "Test your knowledge",
                    href: "/mcq",
                    color: "hover:border-purple-400/50",
                  },
                  {
                    icon: "🎥",
                    label: "Watch Videos",
                    sub: "Visual learning",
                    href: "/videos",
                    color: "hover:border-emerald-400/50",
                  },
                  {
                    icon: "📊",
                    label: "Take a Test",
                    sub: "Assess yourself",
                    href: "/tests",
                    color: "hover:border-amber-400/50",
                  },
                ].map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className={`flex items-center gap-3 rounded-xl border border-border bg-muted/30 px-3 py-2.5 ${action.color} transition-all hover:bg-muted/50 hover:-translate-x-0.5`}
                  >
                    <span className="text-xl">{action.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{action.label}</p>
                      <p className="text-xs text-muted-foreground truncate">{action.sub}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Heatmap + Badges + AI Insights */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Activity Heatmap */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-indigo-500" />
              <h2 className="text-base font-bold text-foreground">30-Day Activity</h2>
            </div>
            <div className="grid grid-cols-10 gap-1.5 mb-3">
              {activityData.map((day) => (
                <div
                  key={day.date}
                  title={day.date}
                  className={`h-6 w-full rounded-md transition-all ${
                    day.active
                      ? "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-sm shadow-indigo-500/30"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>30 days ago</span>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-sm bg-muted" />
                <span>Rest</span>
                <div className="h-2.5 w-2.5 rounded-sm bg-indigo-500 ml-2" />
                <span>Active</span>
              </div>
              <span>Today</span>
            </div>
          </div>

          {/* Recent Badges */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                <h2 className="text-base font-bold text-foreground">Recent Badges</h2>
              </div>
              <Link href="/badges" className="text-xs text-indigo-500 hover:underline flex items-center gap-1">
                All {unlockedBadges.length} <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            {recentBadges.length > 0 ? (
              <div className="space-y-3">
                {recentBadges.map((id) => {
                  const badge = BADGE_MAP[id];
                  if (!badge) return null;
                  return (
                    <div key={id} className="flex items-center gap-3">
                      <div className={`h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br ${getRarityColor(badge.rarity)} flex items-center justify-center text-xl`}>
                        {badge.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{badge.nameEn}</p>
                        <p className="text-xs text-muted-foreground">{badge.rarity}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="text-4xl mb-2">🎖️</div>
                <p className="text-sm text-muted-foreground">Complete tasks to earn your first badge!</p>
                <Link href="/notes" className="mt-3 inline-block text-xs text-indigo-500 hover:underline">
                  Start studying →
                </Link>
              </div>
            )}
          </div>

          {/* AI Insights */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              <h2 className="text-base font-bold text-foreground">AI Study Insights</h2>
            </div>
            <div className="space-y-3">
              {predictions.improvementTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl bg-muted/40 p-3">
                  <span className="text-xl shrink-0">💡</span>
                  <p className="text-xs leading-relaxed text-foreground">{tip}</p>
                </div>
              ))}
            </div>
            <Link
              href="/dashboard/report"
              className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold py-2.5 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
            >
              <Award className="h-3.5 w-3.5" />
              Full Performance Report
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
