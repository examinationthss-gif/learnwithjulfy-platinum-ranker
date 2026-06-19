"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useStudent } from "@/context/StudentContext";
import { getLevelColor, getLevelTitle } from "@/lib/xpEngine";
import { Trophy, Medal, Star, Flame, ArrowLeft } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  badgesCount: number;
  school?: string;
  district?: string;
  isCurrentUser?: boolean;
}

export default function LeaderboardPage() {
  const { profile, totalXP, level, currentStreak, unlockedBadges } = useStudent();
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState<"weekly" | "monthly" | "unit">("weekly");
  const [unitFilter, setUnitFilter] = useState("unit1");
  const [students, setStudents] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    setMounted(true);
    
    const fetchRankings = () => {
      const loaded: LeaderboardEntry[] = [
        { rank: 1, name: "Jahnvi Bezbaruah", avatar: "🎓", level: 18, xp: 1780, streak: 42, badgesCount: 19, school: "Cotton University", district: "Kamrup" },
        { rank: 2, name: "Pranjal Saikia", avatar: "🌟", level: 16, xp: 1540, streak: 35, badgesCount: 16, school: "Jorhat Govt Boys school", district: "Jorhat" },
        { rank: 3, name: "Ananya Kalita", avatar: "🧠", level: 15, xp: 1420, streak: 28, badgesCount: 14, school: "Salt Brook Academy", district: "Dibrugarh" },
        { rank: 4, name: "Bhaskar Jyoti", avatar: "⚡", level: 12, xp: 1100, streak: 12, badgesCount: 9, school: "B. Borooah College", district: "Kamrup" },
        { rank: 5, name: "Rimpi Chetia", avatar: "🌸", level: 10, xp: 950, streak: 8, badgesCount: 7, school: "Moridhal College", district: "Dhemaji" },
      ];
      setStudents(loaded);
    };

    fetchRankings();
  }, []);

  if (!mounted || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <p className="text-sm font-medium animate-pulse">Loading Leaderboard...</p>
      </div>
    );
  }

  // Construct currentUser entry
  const userEntry: LeaderboardEntry = {
    rank: 0,
    name: `${profile.name} (You)`,
    avatar: profile.avatar,
    level: level,
    xp: totalXP,
    streak: currentStreak,
    badgesCount: unlockedBadges.length,
    school: profile.school || "Your School",
    district: profile.district || "Your District",
    isCurrentUser: true,
  };

  // Merge, sort, and re-rank
  let leaderboardList = students.length > 0 ? [...students] : [
    { rank: 1, name: "Jahnvi Bezbaruah", avatar: "🎓", level: 18, xp: 1780, streak: 42, badgesCount: 19, school: "Cotton University", district: "Kamrup" },
    { rank: 2, name: "Pranjal Saikia", avatar: "🌟", level: 16, xp: 1540, streak: 35, badgesCount: 16, school: "Jorhat Govt Boys school", district: "Jorhat" },
    { rank: 3, name: "Ananya Kalita", avatar: "🧠", level: 15, xp: 1420, streak: 28, badgesCount: 14, school: "Salt Brook Academy", district: "Dibrugarh" },
  ];

  const currentUserExists = leaderboardList.some(e => e.isCurrentUser || e.name.includes(profile.name));
  if (!currentUserExists) {
    const userIndex = leaderboardList.findIndex((item) => item.xp < userEntry.xp);
    if (userIndex === -1) {
      leaderboardList.push(userEntry);
    } else {
      leaderboardList.splice(userIndex, 0, userEntry);
    }
  }

  // Assign ranks
  leaderboardList = leaderboardList.map((entry, idx) => ({
    ...entry,
    rank: idx + 1,
  }));

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        
        {/* Header Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-full">
            AHSEC RANKING SYSTEM
          </span>
        </div>

        {/* Hero Area */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-indigo-900 via-purple-900 to-indigo-900 text-white p-8 mb-8 border border-indigo-500/20">
          <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                <Trophy className="h-3.5 w-3.5 text-yellow-400" />
                <span>Top Rankers Board</span>
              </div>
              <h1 className="text-3xl font-bold font-heading">AHSEC Ranker Hall of Fame</h1>
              <p className="text-sm text-white/70 mt-1 max-w-md">
                Compete with high-performing Class 12 students across Assam. Higher XP unlocks higher Rank positions.
              </p>
            </div>
            {/* User current rank summary */}
            <div className="flex items-center gap-4 bg-black/25 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 w-full md:w-auto">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400 text-black text-2xl font-bold">
                #{leaderboardList.find((e) => e.isCurrentUser)?.rank || "N/A"}
              </div>
              <div>
                <p className="text-xs text-white/60 font-medium">Your Rank Status</p>
                <p className="text-base font-bold">{getLevelTitle(level)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Navigation Tabstrip */}
        <div className="flex border-b border-border mb-6">
          <button
            onClick={() => setTab("weekly")}
            className={`pb-3 text-sm font-semibold px-4 border-b-2 transition-colors ${
              tab === "weekly" ? "border-indigo-600 text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Weekly Streak Board
          </button>
          <button
            onClick={() => setTab("monthly")}
            className={`pb-3 text-sm font-semibold px-4 border-b-2 transition-colors ${
              tab === "monthly" ? "border-indigo-600 text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly XP Board
          </button>
          <button
            onClick={() => setTab("unit")}
            className={`pb-3 text-sm font-semibold px-4 border-b-2 transition-colors ${
              tab === "unit" ? "border-indigo-600 text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Unit Leaderboard
          </button>
        </div>

        {/* Unit Filter Dropdown */}
        {tab === "unit" && (
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
            {[
              { id: "unit1", label: "Unit I" },
              { id: "unit2", label: "Unit II" },
              { id: "unit3", label: "Unit III" },
              { id: "unit4", label: "Unit IV" },
              { id: "unit5", label: "Unit V" },
              { id: "unit6", label: "Unit VI" },
              { id: "unit7", label: "Unit VII" },
            ].map((u) => (
              <button
                key={u.id}
                onClick={() => setUnitFilter(u.id)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                  unitFilter === u.id
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-muted/40 text-muted-foreground border-border hover:bg-muted"
                }`}
              >
                {u.label}
              </button>
            ))}
          </div>
        )}

        {/* Rankers List Card */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="divide-y divide-border">
            {leaderboardList.map((entry) => {
              const rankIcon =
                entry.rank === 1 ? (
                  <Medal className="h-6 w-6 text-yellow-400" />
                ) : entry.rank === 2 ? (
                  <Medal className="h-6 w-6 text-slate-300" />
                ) : entry.rank === 3 ? (
                  <Medal className="h-6 w-6 text-amber-600" />
                ) : (
                  <span className="text-sm font-bold text-muted-foreground w-6 text-center">{entry.rank}</span>
                );

              return (
                <div
                  key={entry.rank}
                  className={`flex items-center justify-between p-4 sm:px-6 transition-colors ${
                    entry.isCurrentUser ? "bg-indigo-600/5 dark:bg-indigo-500/5 font-semibold" : "hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank Badge */}
                    <div className="flex h-8 w-8 items-center justify-center">{rankIcon}</div>

                    {/* Student Avatar + Details */}
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${getLevelColor(entry.level)} text-xl shadow-inner`}>
                      {entry.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-foreground">{entry.name}</span>
                        {entry.isCurrentUser && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-600 text-white uppercase">
                            You
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Level {entry.level}</span>
                        <span>•</span>
                        <div className="flex items-center gap-0.5">
                          <Flame className="h-3 w-3 text-orange-500" />
                          <span>{entry.streak} day streak</span>
                        </div>
                        {entry.school && (
                          <>
                            <span>•</span>
                            <span className="truncate max-w-[120px] sm:max-w-none">{entry.school} ({entry.district})</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right hand side: XP / Rewards badge display */}
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">{entry.xp} XP</p>
                      <p className="text-[10px] text-muted-foreground">{entry.badgesCount} Badges</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-1">
                      {Array.from({ length: Math.min(3, Math.ceil(entry.badgesCount / 5)) }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                      ))}
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
