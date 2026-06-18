"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useStudent } from "@/context/StudentContext";
import { getLevelColor, getLevelTitle } from "@/lib/xpEngine";
import { getIntelligenceReport, getPredictedBoardReport } from "@/lib/intelligenceEngine";
import { Badge, BADGE_MAP, getRarityLabel } from "@/lib/badgeEngine";
import { ArrowLeft, Share2, Calendar, Award, Zap, BookOpen, Clock, ShieldCheck } from "lucide-react";

export default function StudentProfilePage() {
  const { profile, level, totalXP, currentStreak, unlockedBadges, completedDaysCount } = useStudent();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <p className="text-sm font-medium animate-pulse">Loading Profile...</p>
      </div>
    );
  }

  const { totalStudyHours } = getIntelligenceReport();
  const { predictedScore } = getPredictedBoardReport();

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formattedJoinDate = profile.joinDate
    ? new Date(profile.joinDate).toLocaleDateString("en-US", { year: "numeric", month: "long" })
    : "June 2026";

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        
        {/* Navigation header */}
        <div className="mb-6 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-semibold bg-muted/60 border border-border px-3 py-1.5 rounded-lg hover:bg-muted transition-colors text-foreground"
          >
            <Share2 className="h-3.5 w-3.5 text-indigo-500" />
            <span>{copied ? "Link Copied!" : "Share Profile"}</span>
          </button>
        </div>

        {/* Public profile header card */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              {/* Profile Avatar with level ring glow */}
              <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${getLevelColor(level)} text-4xl shadow-md border-2 border-border`}>
                {profile.avatar}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
                <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">{getLevelTitle(level)}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-muted-foreground mt-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Joined {formattedJoinDate}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1 text-emerald-500 font-medium">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Verified AHSEC Student</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Overall Rank stats */}
            <div className="flex gap-4 bg-muted/40 border border-border/60 p-4 rounded-2xl w-full sm:w-auto text-center justify-around">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Level</p>
                <p className="text-xl font-bold text-foreground">{level}</p>
              </div>
              <div className="border-r border-border h-8 self-center" />
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Total XP</p>
                <p className="text-xl font-bold text-foreground">{totalXP}</p>
              </div>
              <div className="border-r border-border h-8 self-center" />
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Score Prep</p>
                <p className="text-xl font-bold text-emerald-500">{predictedScore}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <BookOpen className="h-5 w-5 mx-auto mb-2 text-indigo-500" />
            <p className="text-2xl font-bold text-foreground">{completedDaysCount}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Notes Read</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <Zap className="h-5 w-5 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold text-foreground">{currentStreak} Days</p>
            <p className="text-xs text-muted-foreground mt-0.5">Active Streak</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <Clock className="h-5 w-5 mx-auto mb-2 text-emerald-500" />
            <p className="text-2xl font-bold text-foreground">{totalStudyHours}h</p>
            <p className="text-xs text-muted-foreground mt-0.5">Study Duration</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <Award className="h-5 w-5 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold text-foreground">{unlockedBadges.length}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Badges Earned</p>
          </div>
        </div>

        {/* Badges showcase */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">Achievements Showcase</h2>
          {unlockedBadges.length === 0 ? (
            <p className="text-sm text-muted-foreground">No achievement badges unlocked yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {unlockedBadges.map((badgeId) => {
                const b: Badge | undefined = BADGE_MAP[badgeId];
                if (!b) return null;
                return (
                  <div key={badgeId} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/20">
                    <span className="text-2xl">{b.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">{b.nameEn}</p>
                      <span className="text-[9px] uppercase font-bold text-indigo-500 tracking-wider">
                        {getRarityLabel(b.rarity)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Growth Timeline */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-foreground mb-6">Academic Growth Timeline</h2>
          <div className="relative border-l-2 border-border pl-6 space-y-6">
            <div className="relative">
              <span className="absolute -left-9 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] text-white">
                ✓
              </span>
              <h3 className="text-sm font-semibold text-foreground">Initial Setup Complete</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Created onboarding student card profile</p>
            </div>
            {completedDaysCount > 0 && (
              <div className="relative">
                <span className="absolute -left-9 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] text-white">
                  ✓
                </span>
                <h3 className="text-sm font-semibold text-foreground">Day Notes Milestone</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Read {completedDaysCount} educational topics in standard course folders</p>
              </div>
            )}
            {unlockedBadges.length > 0 && (
              <div className="relative">
                <span className="absolute -left-9 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] text-white">
                  ✓
                </span>
                <h3 className="text-sm font-semibold text-foreground">Unlocked Achievements</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Earned {unlockedBadges.length} total awards on the syllabus ranker platform</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
