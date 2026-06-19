import { 
  safeGet, safeSet, STORAGE_KEYS, 
  addXPEntry, getTotalXP,
  getBadgeCollection, awardBadge
} from "../localStorage";
import { XP_RULES } from "../xpEngine";

export const ProgressService = {
  getXP(): number {
    // LocalStorage Mode — Future ready for Supabase / Firebase / Custom Backend
    return getTotalXP();
  },

  awardXP(action: keyof typeof XP_RULES, meta?: string): void {
    const xp = XP_RULES[action] || 0;
    addXPEntry({
      action,
      xp,
      date: new Date().toISOString(),
      meta
    });
  },

  getCompletedDays(): Record<string, boolean> {
    return safeGet<Record<string, boolean>>(STORAGE_KEYS.COMPLETED_DAYS, {});
  },

  setDayCompleted(unitId: string, dayId: string, completed: boolean): void {
    const key = `${unitId}-${dayId}`;
    const completions = this.getCompletedDays();
    completions[key] = completed;
    safeSet(STORAGE_KEYS.COMPLETED_DAYS, completions);
  },

  getWatchedVideos(): Record<string, boolean> {
    return safeGet<Record<string, boolean>>(STORAGE_KEYS.WATCHED_VIDEOS, {});
  },

  setVideoWatched(videoId: string, watched: boolean): void {
    const watchedVideos = this.getWatchedVideos();
    watchedVideos[videoId] = watched;
    safeSet(STORAGE_KEYS.WATCHED_VIDEOS, watchedVideos);
  },

  getUnlockedBadges(): string[] {
    return Object.keys(getBadgeCollection());
  },

  unlockBadge(badgeId: string): boolean {
    return awardBadge(badgeId);
  }
};
