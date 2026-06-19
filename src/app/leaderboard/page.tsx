"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useStudent } from "@/context/StudentContext";
import { LeaderboardService, LeaderboardUser } from "@/lib/services/leaderboardService";
import { getLevelTitle } from "@/lib/xpEngine";
import { Trophy, Medal, ArrowLeft, School } from "lucide-react";

export default function LeaderboardPage() {
  const { profile, level } = useStudent();
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState<"weekly" | "alltime">("weekly");
  const [students, setStudents] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const list = tab === "weekly" 
        ? LeaderboardService.getWeeklyLeaderboard() 
        : LeaderboardService.getAllTimeLeaderboard();
      setStudents(list);
    }
  }, [tab, mounted]);

  if (!mounted || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <p className="text-sm font-medium animate-pulse">Loading Leaderboard...</p>
      </div>
    );
  }

  const currentUserRank = students.find((s) => s.isCurrentUser)?.rank || "N/A";

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto max-w-4xl space-y-6">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
          <span className="text-[10px] font-black uppercase tracking-wider text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-full">
            AHSEC DISTRICT LEADERBOARD
          </span>
        </div>

        {/* Hero Area */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white p-8 border border-indigo-500/10 shadow-2xl">
          <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold">
                <Trophy className="h-3.5 w-3.5 text-yellow-400 fill-current" />
                <span>🏆 Top Learners Hall of Fame</span>
              </div>
              <h1 className="text-3xl font-extrabold font-heading text-white">AHSEC Academy Rankers</h1>
              <p className="text-xs text-slate-350 max-w-md font-sans leading-relaxed">
                Compete with students across Assam. Score points by completing lessons (10 pts), solving MCQs (2 pts), and passing timed tests (20 pts).
              </p>
            </div>
            
            {/* User current rank summary */}
            <div className="flex items-center gap-4 bg-black/40 backdrop-blur px-6 py-4 rounded-2xl border border-white/10 w-full md:w-auto">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400 text-black text-2xl font-bold shadow-lg shadow-yellow-500/20">
                #{currentUserRank}
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Your Academy Rank</p>
                <p className="text-sm font-bold text-white leading-snug">{getLevelTitle(level)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Navigation Tabstrip */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setTab("weekly")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider px-4 border-b-2 transition-colors ${
              tab === "weekly" ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Weekly Leaderboard
          </button>
          <button
            onClick={() => setTab("alltime")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider px-4 border-b-2 transition-colors ${
              tab === "alltime" ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            All-Time Leaderboard
          </button>
        </div>

        {/* Rankers List Card */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="divide-y divide-border/80">
            {students.map((entry) => {
              const rankIcon =
                entry.rank === 1 ? (
                  <Medal className="h-6 w-6 text-yellow-400 fill-current" />
                ) : entry.rank === 2 ? (
                  <Medal className="h-6 w-6 text-slate-300 fill-current" />
                ) : entry.rank === 3 ? (
                  <Medal className="h-6 w-6 text-amber-600 fill-current" />
                ) : (
                  <span className="text-xs font-bold text-muted-foreground w-6 text-center">{entry.rank}</span>
                );

              return (
                <div
                  key={entry.rank}
                  className={`flex items-center justify-between p-4 sm:px-6 transition-colors ${
                    entry.isCurrentUser ? "bg-indigo-600/5 dark:bg-indigo-500/5 font-semibold" : "hover:bg-muted/10"
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center">{rankIcon}</div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-black border border-border">
                      {entry.name.charAt(0)}
                    </div>
                    <div className="min-w-0 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-foreground truncate">{entry.name}</span>
                        {entry.isCurrentUser && (
                          <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-indigo-600 text-white uppercase tracking-wider">
                            You
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5 truncate">
                        <School className="h-3 w-3" />
                        <span className="truncate">{entry.school}</span>
                      </div>
                    </div>
                  </div>

                  {/* MCQ Solved + Tests Passed */}
                  <div className="flex items-center gap-6 shrink-0 font-mono text-right text-xs">
                    <div className="hidden sm:block text-slate-400 text-[10px] space-y-0.5">
                      <p>🧠 {entry.mcqsSolved} MCQs</p>
                      <p>📋 {entry.testsPassed} Tests</p>
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm">{entry.points} pts</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
