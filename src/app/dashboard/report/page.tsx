"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useStudent } from "@/context/StudentContext";
import {
  getMCQStats,
  getCompletedDays,
  getCurrentStreak,
  getLongestStreak,
  getXPLog,
} from "@/lib/localStorage";
import { getLevelTitle } from "@/lib/xpEngine";
import { BarChart3, ArrowLeft, Download, Star, BookOpen, Brain, Flame, Zap, TrendingUp } from "lucide-react";

const UNITS = [
  { id: "unit1", label: "Unit I", name: "Secondary Education in India", color: "bg-blue-500" },
  { id: "unit2", label: "Unit II", name: "Non-formal Education", color: "bg-purple-500" },
  { id: "unit3", label: "Unit III", name: "Current Trends", color: "bg-emerald-500" },
  { id: "unit4", label: "Unit IV", name: "Learning", color: "bg-amber-500" },
  { id: "unit5", label: "Unit V", name: "Memory & Attention", color: "bg-pink-500" },
  { id: "unit6", label: "Unit VI", name: "Mental Health", color: "bg-cyan-500" },
  { id: "unit7", label: "Unit VII", name: "Educational Statistics", color: "bg-red-500" },
];

function getBoardReadyScore(params: {
  completedDaysCount: number;
  overallMCQAccuracy: number;
  currentStreak: number;
  watchedVideosCount: number;
}): number {
  const noteScore = Math.min((params.completedDaysCount / 140) * 40, 40);
  const mcqScore = Math.min((params.overallMCQAccuracy / 100) * 35, 35);
  const streakScore = Math.min((params.currentStreak / 30) * 15, 15);
  const videoScore = Math.min((params.watchedVideosCount / 10) * 10, 10);
  return Math.round(noteScore + mcqScore + streakScore + videoScore);
}

export default function ReportPage() {
  const { profile, totalXP, level, completedDaysCount, watchedVideosCount, overallMCQAccuracy } = useStudent();
  const [mounted, setMounted] = useState(false);
  const [unitData, setUnitData] = useState<{ completed: number; mcqCorrect: number; mcqTotal: number }[]>([]);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [recentXP, setRecentXP] = useState<{ action: string; xp: number; date: string }[]>([]);

  useEffect(() => {
    setMounted(true);
    const mcqStats = getMCQStats();
    const completedDays = getCompletedDays();
    setStreak(getCurrentStreak());
    setLongestStreak(getLongestStreak());

    const data = UNITS.map((u) => {
      const completed = Object.entries(completedDays).filter(
        ([key, val]) => val && key.startsWith(u.id)
      ).length;
      const stat = mcqStats[u.id] || { correct: 0, total: 0 };
      return { completed, mcqCorrect: stat.correct, mcqTotal: stat.total };
    });
    setUnitData(data);

    const xpLog = getXPLog().slice(-10).reverse();
    setRecentXP(xpLog);
  }, []);

  if (!mounted || !profile) return null;

  const boardScore = getBoardReadyScore({ completedDaysCount, overallMCQAccuracy, currentStreak: streak, watchedVideosCount });
  const totalMCQAttempts = unitData.reduce((s, u) => s + u.mcqTotal, 0);
  const totalCorrect = unitData.reduce((s, u) => s + u.mcqCorrect, 0);
  const studyHoursEstimate = Math.round(completedDaysCount * 15 / 60);

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm font-semibold text-foreground">Performance Report</span>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            Save Report
          </button>
        </div>

        {/* Student Summary Card */}
        <div className="rounded-2xl bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{profile.avatar}</div>
              <div>
                <h1 className="text-2xl font-bold font-heading">{profile.name}</h1>
                <p className="text-sm text-white/70">Level {level} • {getLevelTitle(level)}</p>
                <p className="text-xs text-white/50 mt-1">Joined: {new Date(profile.joinDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
            </div>
            <div className="flex flex-col items-center sm:items-end gap-1">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                <span className="text-3xl font-bold">{boardScore}</span>
                <span className="text-lg text-white/60">/100</span>
              </div>
              <span className="text-sm text-white/70">Board Ready Score</span>
              <div className="flex gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${boardScore >= (i + 1) * 20 ? "text-yellow-400 fill-yellow-400" : "text-white/20"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: BookOpen, label: "Notes Done", value: `${completedDaysCount}/140`, color: "text-blue-500", bg: "bg-blue-500/10" },
            { icon: Brain, label: "MCQ Accuracy", value: `${overallMCQAccuracy}%`, color: "text-purple-500", bg: "bg-purple-500/10" },
            { icon: Flame, label: "Best Streak", value: `${longestStreak}d`, color: "text-orange-500", bg: "bg-orange-500/10" },
            { icon: Zap, label: "Total XP", value: totalXP.toLocaleString(), color: "text-yellow-500", bg: "bg-yellow-500/10" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 text-center">
              <div className={`h-10 w-10 rounded-xl ${s.bg} flex items-center justify-center mx-auto mb-2`}>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Per-Unit Breakdown */}
        <div className="rounded-2xl border border-border bg-card p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="h-5 w-5 text-indigo-500" />
            <h2 className="text-base font-bold text-foreground">Unit-by-Unit Breakdown</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground border-b border-border">
                  <th className="pb-3 font-semibold">Unit</th>
                  <th className="pb-3 font-semibold">Notes</th>
                  <th className="pb-3 font-semibold">Progress</th>
                  <th className="pb-3 font-semibold">MCQ Accuracy</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {UNITS.map((unit, i) => {
                  const d = unitData[i] || { completed: 0, mcqCorrect: 0, mcqTotal: 0 };
                  const notePct = Math.min(Math.round((d.completed / 20) * 100), 100);
                  const mcqAcc = d.mcqTotal > 0 ? Math.round((d.mcqCorrect / d.mcqTotal) * 100) : null;
                  const isWeak = mcqAcc !== null && mcqAcc < 60;
                  return (
                    <tr key={unit.id} className="group">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className={`h-6 w-6 rounded-md ${unit.color} flex items-center justify-center text-white text-[10px] font-bold`}>
                            {i + 1}
                          </div>
                          <span className="font-medium text-foreground text-xs leading-tight hidden sm:block max-w-[150px] truncate">{unit.name}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-xs text-foreground font-semibold">{d.completed}/20</td>
                      <td className="py-3 pr-6">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 rounded-full bg-muted min-w-[60px]">
                            <div
                              className={`h-full rounded-full ${unit.color} transition-all`}
                              style={{ width: `${notePct}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground w-8 text-right">{notePct}%</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`text-xs font-bold ${mcqAcc === null ? "text-muted-foreground" : isWeak ? "text-red-500" : "text-emerald-500"}`}>
                          {mcqAcc === null ? "—" : `${mcqAcc}%`}
                        </span>
                        {isWeak && <span className="ml-1 text-[10px] text-red-400">⚠ Weak</span>}
                      </td>
                      <td className="py-3">
                        {notePct === 100 ? (
                          <span className="inline-flex items-center rounded-full bg-emerald-500/15 text-emerald-600 text-[10px] font-bold px-2 py-0.5">✓ Done</span>
                        ) : notePct > 0 ? (
                          <span className="inline-flex items-center rounded-full bg-blue-500/15 text-blue-600 text-[10px] font-bold px-2 py-0.5">In Progress</span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-muted text-muted-foreground text-[10px] font-bold px-2 py-0.5">Not Started</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* XP Activity Timeline */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-indigo-500" />
              <h2 className="text-base font-bold text-foreground">Recent XP Activity</h2>
            </div>
            {recentXP.length > 0 ? (
              <div className="space-y-2">
                {recentXP.map((entry, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                    <div>
                      <p className="text-xs font-semibold text-foreground capitalize">{entry.action.replace(/_/g, " ").toLowerCase()}</p>
                      <p className="text-[10px] text-muted-foreground">{new Date(entry.date).toLocaleDateString("en-IN")}</p>
                    </div>
                    <span className="text-sm font-bold text-indigo-500">+{entry.xp} XP</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No XP activity yet. Start studying!</p>
            )}
          </div>

          {/* Study Stats */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-amber-500" />
              <h2 className="text-base font-bold text-foreground">Study Statistics</h2>
            </div>
            <div className="space-y-4">
              {[
                { label: "Total Notes Read", value: `${completedDaysCount} days` },
                { label: "Study Time Est.", value: `${studyHoursEstimate} hours` },
                { label: "MCQs Attempted", value: totalMCQAttempts.toString() },
                { label: "Correct Answers", value: totalCorrect.toString() },
                { label: "Videos Watched", value: watchedVideosCount.toString() },
                { label: "Current Streak", value: `${streak} days` },
                { label: "Longest Streak", value: `${longestStreak} days` },
                { label: "Total XP Earned", value: `${totalXP} XP` },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                  <span className="text-sm font-bold text-foreground">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certificate CTA */}
        {completedDaysCount >= 20 && (
          <div className="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 text-center">
            <div className="text-4xl mb-2">🎓</div>
            <h3 className="text-lg font-bold font-heading mb-1">
              {completedDaysCount >= 140 ? "You've completed the full course!" : `You've completed ${completedDaysCount} days!`}
            </h3>
            <p className="text-sm text-white/80 mb-4">
              {completedDaysCount >= 140 ? "Claim your Full Course Completion Certificate!" : "Claim your progress certificate!"}
            </p>
            <Link
              href="/certificate"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-amber-600 text-sm font-bold px-6 py-2.5 hover:bg-amber-50 transition-colors"
            >
              🎓 Get Certificate
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
