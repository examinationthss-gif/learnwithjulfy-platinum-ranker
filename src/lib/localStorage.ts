// localStorage utility layer — safe read/write/reset for all julfy keys
// All keys are namespaced under "julfy-" prefix

export const STORAGE_KEYS = {
  STUDENT_PROFILE: "julfy-student-profile",
  XP_LOG: "julfy-xp-log",
  BADGE_COLLECTION: "julfy-badge-collection",
  STREAK_LOG: "julfy-streak-log",
  COMPLETED_DAYS: "julfy-completed-days",
  WATCHED_VIDEOS: "julfy-watched-videos",
  MCQ_STATS: "julfy-mcq-stats",
  MCQ_ANSWERS: "julfy-mcq-answers",
  LAST_VISITED_URL: "julfy-last-visited-url",
  LAST_VISITED_LABEL: "julfy-last-visited-label",
  LANGUAGE: "julfy-lang",
  RECENT_SEARCHES: "julfy-recent-searches",
};

export function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function safeSet<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage quota exceeded or unavailable
  }
}

export function safeRemove(key: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch {
    // Silently fail
  }
}

// Student Profile
export interface StudentProfile {
  name: string;
  avatar: string; // emoji
  joinDate: string; // ISO date string
  hasOnboarded: boolean;
}

export function getStudentProfile(): StudentProfile | null {
  return safeGet<StudentProfile | null>(STORAGE_KEYS.STUDENT_PROFILE, null);
}

export function setStudentProfile(profile: StudentProfile): void {
  safeSet(STORAGE_KEYS.STUDENT_PROFILE, profile);
}

// XP Log — array of { action, xp, date }
export interface XPEntry {
  action: string;
  xp: number;
  date: string;
  meta?: string;
}

export function getXPLog(): XPEntry[] {
  return safeGet<XPEntry[]>(STORAGE_KEYS.XP_LOG, []);
}

export function addXPEntry(entry: XPEntry): void {
  const log = getXPLog();
  log.push(entry);
  safeSet(STORAGE_KEYS.XP_LOG, log);
}

export function getTotalXP(): number {
  return getXPLog().reduce((sum, e) => sum + e.xp, 0);
}

// Badge Collection — Record<badgeId, { unlockedAt: string }>
export interface BadgeRecord {
  unlockedAt: string;
}

export function getBadgeCollection(): Record<string, BadgeRecord> {
  return safeGet<Record<string, BadgeRecord>>(STORAGE_KEYS.BADGE_COLLECTION, {});
}

export function awardBadge(badgeId: string): boolean {
  const collection = getBadgeCollection();
  if (collection[badgeId]) return false; // already have it
  collection[badgeId] = { unlockedAt: new Date().toISOString() };
  safeSet(STORAGE_KEYS.BADGE_COLLECTION, collection);
  return true;
}

export function hasBadge(badgeId: string): boolean {
  return !!getBadgeCollection()[badgeId];
}

// Streak Log — Record<YYYY-MM-DD, true>
export function getStreakLog(): Record<string, boolean> {
  return safeGet<Record<string, boolean>>(STORAGE_KEYS.STREAK_LOG, {});
}

export function markTodayActive(): void {
  const log = getStreakLog();
  const today = new Date().toISOString().split("T")[0];
  log[today] = true;
  safeSet(STORAGE_KEYS.STREAK_LOG, log);
}

export function getCurrentStreak(): number {
  const log = getStreakLog();
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    if (log[key]) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  return streak;
}

export function getLongestStreak(): number {
  const log = getStreakLog();
  const dates = Object.keys(log).sort();
  if (dates.length === 0) return 0;
  let max = 1;
  let current = 1;
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1]);
    const curr = new Date(dates[i]);
    const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      current++;
      max = Math.max(max, current);
    } else {
      current = 1;
    }
  }
  return max;
}

// Completed Days — Record<"unitX-dayY", boolean>
export function getCompletedDays(): Record<string, boolean> {
  return safeGet<Record<string, boolean>>(STORAGE_KEYS.COMPLETED_DAYS, {});
}

export function getCompletedDaysCount(): number {
  return Object.values(getCompletedDays()).filter(Boolean).length;
}

export function getUnitCompletionCount(unitId: string): number {
  const days = getCompletedDays();
  return Object.entries(days).filter(
    ([key, val]) => val && key.startsWith(unitId)
  ).length;
}

// Watched Videos — Record<videoId, boolean>
export function getWatchedVideos(): Record<string, boolean> {
  return safeGet<Record<string, boolean>>(STORAGE_KEYS.WATCHED_VIDEOS, {});
}

export function getWatchedVideosCount(): number {
  return Object.values(getWatchedVideos()).filter(Boolean).length;
}

// MCQ Stats — Record<unitId, { correct: number; total: number }>
export interface UnitMCQStat {
  correct: number;
  total: number;
}

export function getMCQStats(): Record<string, UnitMCQStat> {
  return safeGet<Record<string, UnitMCQStat>>(STORAGE_KEYS.MCQ_STATS, {});
}

export function recordMCQAnswer(unitId: string, isCorrect: boolean): void {
  const stats = getMCQStats();
  if (!stats[unitId]) stats[unitId] = { correct: 0, total: 0 };
  stats[unitId].total++;
  if (isCorrect) stats[unitId].correct++;
  safeSet(STORAGE_KEYS.MCQ_STATS, stats);
}

export function getOverallMCQAccuracy(): number {
  const stats = getMCQStats();
  const entries = Object.values(stats);
  if (entries.length === 0) return 0;
  const totalCorrect = entries.reduce((s, e) => s + e.correct, 0);
  const totalAttempts = entries.reduce((s, e) => s + e.total, 0);
  if (totalAttempts === 0) return 0;
  return Math.round((totalCorrect / totalAttempts) * 100);
}

// Recent Searches
export function getRecentSearches(): string[] {
  return safeGet<string[]>(STORAGE_KEYS.RECENT_SEARCHES, []);
}

export function addRecentSearch(query: string): void {
  const searches = getRecentSearches().filter((s) => s !== query);
  searches.unshift(query);
  safeSet(STORAGE_KEYS.RECENT_SEARCHES, searches.slice(0, 8));
}

// Get last 30 days activity for heatmap
export function getLast30DaysActivity(): { date: string; active: boolean }[] {
  const log = getStreakLog();
  const result = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    result.push({ date: key, active: !!log[key] });
  }
  return result;
}
