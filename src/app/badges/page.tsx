"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useStudent } from "@/context/StudentContext";
import { ALL_BADGES, getRarityColor, getRarityLabel } from "@/lib/badgeEngine";
import { getBadgeCollection } from "@/lib/localStorage";
import { Trophy, ArrowLeft, Lock } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Badges" },
  { id: "progress", label: "📚 Progress" },
  { id: "quiz", label: "🧠 Quiz" },
  { id: "streak", label: "🔥 Streaks" },
  { id: "completion", label: "🏅 Completion" },
  { id: "special", label: "⭐ Special" },
] as const;

export default function BadgesPage() {
  const { unlockedBadges } = useStudent();
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [badgeDates, setBadgeDates] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
    const collection = getBadgeCollection();
    const dates: Record<string, string> = {};
    for (const [id, record] of Object.entries(collection)) {
      dates[id] = record.unlockedAt;
    }
    setBadgeDates(dates);
  }, []);

  if (!mounted) return null;

  const filtered = ALL_BADGES.filter(
    (b) => activeCategory === "all" || b.category === activeCategory
  );
  const unlockedSet = new Set(unlockedBadges);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-2xl shadow-lg">
              🏆
            </div>
            <div>
              <h1 className="text-2xl font-bold font-heading text-foreground">Achievement Badges</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {unlockedBadges.length}/{ALL_BADGES.length} badges unlocked
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-3 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-700"
              style={{ width: `${(unlockedBadges.length / ALL_BADGES.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((badge) => {
            const isUnlocked = unlockedSet.has(badge.id);
            const unlockedAt = badgeDates[badge.id];

            return (
              <div
                key={badge.id}
                className={`relative rounded-2xl border p-5 transition-all ${
                  isUnlocked
                    ? "border-border bg-card hover:shadow-lg hover:-translate-y-0.5 cursor-default"
                    : "border-border/50 bg-muted/30 opacity-60"
                }`}
              >
                {/* Rarity glow for unlocked */}
                {isUnlocked && (
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${getRarityColor(badge.rarity)} opacity-5`} />
                )}

                {/* Icon */}
                <div
                  className={`relative flex h-16 w-16 items-center justify-center rounded-2xl text-3xl mb-4 mx-auto ${
                    isUnlocked
                      ? `bg-gradient-to-br ${getRarityColor(badge.rarity)} shadow-lg`
                      : "bg-muted"
                  }`}
                >
                  {isUnlocked ? badge.icon : <Lock className="h-6 w-6 text-muted-foreground" />}
                </div>

                {/* Rarity badge */}
                <div className="flex justify-center mb-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isUnlocked
                        ? badge.rarity === "legendary"
                          ? "bg-yellow-400/20 text-yellow-600 dark:text-yellow-400"
                          : badge.rarity === "epic"
                          ? "bg-violet-500/20 text-violet-600 dark:text-violet-400"
                          : badge.rarity === "rare"
                          ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                          : "bg-slate-400/20 text-slate-600 dark:text-slate-400"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {getRarityLabel(badge.rarity)}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-center text-foreground leading-tight">
                  {badge.nameEn}
                </h3>
                <p className="text-[11px] text-muted-foreground text-center mt-1 leading-relaxed">
                  {isUnlocked ? badge.descriptionEn : badge.descriptionEn}
                </p>

                {isUnlocked && unlockedAt && (
                  <p className="text-[10px] text-center text-indigo-500 dark:text-indigo-400 mt-2 font-medium">
                    ✓ {new Date(unlockedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Stats footer */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-200 dark:border-amber-800/50 p-6 text-center">
          <Trophy className="h-8 w-8 text-amber-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-foreground mb-1">
            {unlockedBadges.length === ALL_BADGES.length
              ? "🎉 You've unlocked ALL badges! Legendary status achieved!"
              : `${ALL_BADGES.length - unlockedBadges.length} more badges to unlock!`}
          </h3>
          <p className="text-sm text-muted-foreground">
            Keep studying, practicing MCQs, and maintaining your streak to earn them all.
          </p>
          <Link
            href="/notes"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold px-6 py-2.5 transition-colors"
          >
            Continue Learning →
          </Link>
        </div>
      </div>
    </div>
  );
}
