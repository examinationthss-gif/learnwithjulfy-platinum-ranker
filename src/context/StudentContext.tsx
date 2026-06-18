"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  StudentProfile,
  getStudentProfile,
  setStudentProfile,
  getTotalXP,
  addXPEntry,
  getCompletedDaysCount,
  getWatchedVideosCount,
  getOverallMCQAccuracy,
  getCurrentStreak,
  getLongestStreak,
  getBadgeCollection,
  awardBadge,
  hasBadge,
  markTodayActive,
  getMCQStats,
  STORAGE_KEYS,
  safeGet,
} from "@/lib/localStorage";
import { XP_RULES, getLevel, getLevelProgress } from "@/lib/xpEngine";
import { Badge, BADGE_MAP } from "@/lib/badgeEngine";

import { useAuth } from "./AuthContext";

interface StudentState {
  profile: StudentProfile | null;
  totalXP: number;
  level: number;
  levelProgress: { level: number; xpIntoLevel: number; xpForNextLevel: number; progressPercent: number };
  currentStreak: number;
  longestStreak: number;
  completedDaysCount: number;
  watchedVideosCount: number;
  overallMCQAccuracy: number;
  unlockedBadges: string[];
  recentlyEarnedBadge: Badge | null;
}

interface StudentContextType extends StudentState {
  createProfile: (name: string, avatar: string) => void;
  awardXP: (action: keyof typeof XP_RULES, meta?: string) => void;
  checkAndAwardBadges: () => void;
  refreshStats: () => void;
  dismissBadgeToast: () => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

function loadState(): StudentState {
  const profile = getStudentProfile();
  const totalXP = getTotalXP();
  const level = getLevel(totalXP);
  const levelProgress = getLevelProgress(totalXP);
  const currentStreak = getCurrentStreak();
  const longestStreak = getLongestStreak();
  const completedDaysCount = getCompletedDaysCount();
  const watchedVideosCount = getWatchedVideosCount();
  const overallMCQAccuracy = getOverallMCQAccuracy();
  const collection = getBadgeCollection();
  const unlockedBadges = Object.keys(collection);

  return {
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
    recentlyEarnedBadge: null,
  };
}

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const { syncLocalToCloud } = useAuth();
  const [state, setState] = useState<StudentState>(() => ({
    profile: null,
    totalXP: 0,
    level: 1,
    levelProgress: { level: 1, xpIntoLevel: 0, xpForNextLevel: 100, progressPercent: 0 },
    currentStreak: 0,
    longestStreak: 0,
    completedDaysCount: 0,
    watchedVideosCount: 0,
    overallMCQAccuracy: 0,
    unlockedBadges: [],
    recentlyEarnedBadge: null,
  }));

  const refreshStats = useCallback(() => {
    setState((prev) => ({
      ...loadState(),
      recentlyEarnedBadge: prev.recentlyEarnedBadge,
    }));
  }, []);

  useEffect(() => {
    // Load state from localStorage on mount
    setState(loadState());
    // Mark today as active for streak
    const streakLog = safeGet<Record<string, boolean>>(STORAGE_KEYS.STREAK_LOG, {});
    const today = new Date().toISOString().split("T")[0];
    const isFirstVisitToday = !streakLog[today];
    markTodayActive();

    // Award daily streak XP on first visit of the day
    if (isFirstVisitToday) {
      addXPEntry({ action: "DAILY_LOGIN_STREAK", xp: XP_RULES.DAILY_LOGIN_STREAK, date: new Date().toISOString() });
    }

    // Check night owl badge
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 4) {
      const wasNew = awardBadge("night_owl");
      if (wasNew) {
        setState((prev) => ({ ...prev, recentlyEarnedBadge: BADGE_MAP["night_owl"] }));
      }
    }
  }, []);

  const createProfile = useCallback((name: string, avatar: string) => {
    const profile: StudentProfile = {
      name,
      avatar,
      joinDate: new Date().toISOString(),
      hasOnboarded: true,
    };
    setStudentProfile(profile);
    markTodayActive();
    // Award bilingual badge if language is Assamese
    const lang = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEYS.LANGUAGE) : null;
    if (lang === "as") awardBadge("bilingual_scholar");
    refreshStats();
    syncLocalToCloud();
  }, [refreshStats, syncLocalToCloud]);

  const awardXP = useCallback((action: keyof typeof XP_RULES, meta?: string) => {
    const xp = XP_RULES[action];
    addXPEntry({ action, xp, date: new Date().toISOString(), meta });
    refreshStats();
    syncLocalToCloud();
  }, [refreshStats, syncLocalToCloud]);

  const checkAndAwardBadges = useCallback(() => {
    const currentStats = {
      completedDaysCount: getCompletedDaysCount(),
      watchedVideosCount: getWatchedVideosCount(),
      currentStreak: getCurrentStreak(),
    };
    const mcqStats = getMCQStats();
    const totalCorrect = Object.values(mcqStats).reduce((s, e) => s + e.correct, 0);
    const totalSolved = Object.values(mcqStats).reduce((s, e) => s + e.total, 0);
    const completedDays = safeGet<Record<string, boolean>>(STORAGE_KEYS.COMPLETED_DAYS, {});

    const badgesToCheck: [string, boolean][] = [
      ["first_step", currentStats.completedDaysCount >= 1],
      ["dedicated_learner", currentStats.completedDaysCount >= 10],
      ["halfway_hero", currentStats.completedDaysCount >= 70],
      ["quiz_starter", totalCorrect >= 10],
      ["quiz_master", totalCorrect >= 50],
      ["mcq_legend", totalCorrect >= 200],
      ["video_scholar", currentStats.watchedVideosCount >= 3],
      ["streak_starter", currentStats.currentStreak >= 3],
      ["week_warrior", currentStats.currentStreak >= 7],
      ["month_master", currentStats.currentStreak >= 30],
      ["bilingual_scholar", typeof window !== "undefined" && localStorage.getItem(STORAGE_KEYS.LANGUAGE) === "as"],
      ["platinum_elite", currentStats.completedDaysCount >= 140],

      // Streaks
      ["streak_5", currentStats.currentStreak >= 5],
      ["streak_10", currentStats.currentStreak >= 10],
      ["streak_15", currentStats.currentStreak >= 15],
      ["streak_20", currentStats.currentStreak >= 20],
      ["streak_50", currentStats.currentStreak >= 50],
      ["streak_100", currentStats.currentStreak >= 100],

      // MCQs
      ["mcq_10", totalSolved >= 10],
      ["mcq_50", totalSolved >= 50],
      ["mcq_100", totalSolved >= 100],
      ["mcq_300", totalSolved >= 300],
      ["mcq_500", totalSolved >= 500],

      // Videos
      ["video_10", currentStats.watchedVideosCount >= 10],
      ["video_all", currentStats.watchedVideosCount >= 10], // simulator assumes 10 watched is all
    ];

    // Check unit completions
    for (let u = 1; u <= 7; u++) {
      const unitKey = `unit${u}`;
      const unitDays = Object.entries(completedDays).filter(
        ([key, val]) => val && key.startsWith(unitKey)
      ).length;
      
      if (unitDays >= 20) {
        badgesToCheck.push([`unit_${u}_master`, true]);
        badgesToCheck.push(["unit_champion", true]);
      }
    }

    let latestNewBadge: string | null = null;
    for (const [id, condition] of badgesToCheck) {
      if (condition && BADGE_MAP[id] && !hasBadge(id)) {
        awardBadge(id);
        latestNewBadge = id;
      }
    }

    if (latestNewBadge) {
      setState(() => ({
        ...loadState(),
        recentlyEarnedBadge: BADGE_MAP[latestNewBadge!],
      }));
      syncLocalToCloud();
    } else {
      refreshStats();
    }
  }, [refreshStats, syncLocalToCloud]);

  const dismissBadgeToast = useCallback(() => {
    setState((prev) => ({ ...prev, recentlyEarnedBadge: null }));
  }, []);

  return (
    <StudentContext.Provider
      value={{
        ...state,
        createProfile,
        awardXP,
        checkAndAwardBadges,
        refreshStats,
        dismissBadgeToast,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error("useStudent must be used within StudentProvider");
  return ctx;
}
