"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useStudent } from "@/context/StudentContext";
import { StudentService } from "@/lib/services/studentService";
import { getLevelColor, getLevelTitle } from "@/lib/xpEngine";
import { getIntelligenceReport, getPredictedBoardReport } from "@/lib/intelligenceEngine";
import { Badge, BADGE_MAP, getRarityLabel } from "@/lib/badgeEngine";
import { ArrowLeft, Share2, Calendar, Award, Zap, BookOpen, Clock, ShieldCheck, Edit3 } from "lucide-react";

export default function StudentProfilePage() {
  const { profile, level, totalXP, currentStreak, unlockedBadges, completedDaysCount, refreshStats } = useStudent();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Edit fields
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [school, setSchool] = useState("");

  useEffect(() => {
    setMounted(true);
    if (profile) {
      setName(profile.name);
      setRoll(profile.rollNumber || "");
      setSchool(profile.school || "");
    }
  }, [profile]);

  if (!mounted || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <p className="text-sm font-medium animate-pulse font-sans">Loading Profile...</p>
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    StudentService.saveProfile({
      name: name.trim(),
      rollNumber: roll.trim(),
      school: school.trim(),
      avatar: profile.avatar || "🎓"
    });
    setIsEditing(false);
    refreshStats();
  };

  const formattedJoinDate = profile.joinDate
    ? new Date(profile.joinDate).toLocaleDateString("en-US", { year: "numeric", month: "long" })
    : "June 2026";

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto max-w-4xl space-y-6">
        
        {/* Navigation header */}
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
            <ArrowLeft className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1.5 text-xs font-semibold bg-muted/60 border border-border px-3 py-1.5 rounded-lg hover:bg-muted transition-colors text-foreground"
            >
              <Edit3 className="h-3.5 w-3.5 text-indigo-500" />
              <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs font-semibold bg-muted/60 border border-border px-3 py-1.5 rounded-lg hover:bg-muted transition-colors text-foreground"
            >
              <Share2 className="h-3.5 w-3.5 text-indigo-500" />
              <span>{copied ? "Link Copied!" : "Share Profile"}</span>
            </button>
          </div>
        </div>

        {/* Edit profile form overlay block */}
        {isEditing && (
          <div className="rounded-3xl border border-indigo-500/20 bg-indigo-500/5 p-6 animate-fade-in">
            <h3 className="text-sm font-bold text-foreground mb-4">Edit Student Profile Details</h3>
            <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Roll Number</label>
                <input
                  type="text"
                  value={roll}
                  onChange={(e) => setRoll(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">School Name</label>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 shadow-sm transition-all"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}

        {/* Public profile header card */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              {/* Profile Avatar with level ring glow */}
              <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${getLevelColor(level)} text-4xl shadow-md border-2 border-border`}>
                {profile.avatar}
              </div>
              <div className="text-left space-y-1">
                <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
                <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{getLevelTitle(level)}</p>
                <div className="flex flex-wrap items-center justify-start gap-3 text-xs text-muted-foreground pt-1.5">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Joined {formattedJoinDate}</span>
                  </div>
                  <span>&bull;</span>
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
                <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground font-semibold">Level</p>
                <p className="text-lg font-bold text-foreground">{level}</p>
              </div>
              <div className="border-r border-border h-8 self-center" />
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground font-semibold">Total XP</p>
                <p className="text-lg font-bold text-foreground">{totalXP}</p>
              </div>
              <div className="border-r border-border h-8 self-center" />
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground font-semibold">Score Prep</p>
                <p className="text-lg font-bold text-emerald-500">{predictedScore}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <BookOpen className="h-5 w-5 mx-auto mb-2 text-indigo-500" />
            <p className="text-2xl font-bold text-foreground">{completedDaysCount}</p>
            <p className="text-xs text-muted-foreground mt-0.5 font-semibold">Notes Read</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <Zap className="h-5 w-5 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold text-foreground">{currentStreak} Days</p>
            <p className="text-xs text-muted-foreground mt-0.5 font-semibold">Active Streak</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <Clock className="h-5 w-5 mx-auto mb-2 text-emerald-500" />
            <p className="text-2xl font-bold text-foreground">{totalStudyHours}h</p>
            <p className="text-xs text-muted-foreground mt-0.5 font-semibold">Study Duration</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <Award className="h-5 w-5 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold text-foreground">{unlockedBadges.length}</p>
            <p className="text-xs text-muted-foreground mt-0.5 font-semibold">Badges Earned</p>
          </div>
        </div>

        {/* Badges showcase */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-foreground mb-4">Achievements Showcase</h2>
          {unlockedBadges.length === 0 ? (
            <p className="text-xs text-muted-foreground">No achievement badges unlocked yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {unlockedBadges.map((badgeId) => {
                const b: Badge | undefined = BADGE_MAP[badgeId];
                if (!b) return null;
                return (
                  <div key={badgeId} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/20">
                    <span className="text-2xl">{b.icon}</span>
                    <div className="min-w-0 text-left">
                      <p className="text-xs font-semibold text-foreground truncate">{b.nameEn}</p>
                      <span className="text-[8px] uppercase font-bold text-indigo-500 tracking-wider block mt-0.5">
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
          <div className="relative border-l-2 border-border pl-6 space-y-6 text-left">
            <div className="relative">
              <span className="absolute -left-9 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] text-white">
                ✓
              </span>
              <h3 className="text-xs font-bold text-foreground">Initial Setup Complete</h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">Created onboarding student card profile</p>
            </div>
            {completedDaysCount > 0 && (
              <div className="relative">
                <span className="absolute -left-9 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] text-white">
                  ✓
                </span>
                <h3 className="text-xs font-bold text-foreground">Day Notes Milestone</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">Read {completedDaysCount} educational topics in standard course folders</p>
              </div>
            )}
            {unlockedBadges.length > 0 && (
              <div className="relative">
                <span className="absolute -left-9 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] text-white">
                  ✓
                </span>
                <h3 className="text-xs font-bold text-foreground">Unlocked Achievements</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">Earned {unlockedBadges.length} total awards on the syllabus ranker platform</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
