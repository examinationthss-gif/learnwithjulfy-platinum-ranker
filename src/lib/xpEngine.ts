// XP Points Engine — defines XP rules and level calculations

export const XP_RULES = {
  COMPLETE_DAY_NOTES: 10,
  WATCH_VIDEO: 15,
  MCQ_CORRECT_FIRST_TRY: 2,
  COMPLETE_MCQ_SET: 20,
  TAKE_TIMED_TEST: 25,
  TEST_SCORE_90_PLUS: 50, // bonus on top of TAKE_TIMED_TEST
  DAILY_LOGIN_STREAK: 5,
  COMPLETE_UNIT: 100,
  COMPLETE_ALL_UNITS: 500,
} as const;

export type XPAction = keyof typeof XP_RULES;

// Level thresholds — each level requires 100 XP
export const XP_PER_LEVEL = 100;
export const MAX_LEVEL = 20;

export function getLevel(totalXP: number): number {
  return Math.min(Math.floor(totalXP / XP_PER_LEVEL) + 1, MAX_LEVEL);
}

export function getLevelProgress(totalXP: number): {
  level: number;
  xpIntoLevel: number;
  xpForNextLevel: number;
  progressPercent: number;
} {
  const level = getLevel(totalXP);
  const xpForCurrentLevel = (level - 1) * XP_PER_LEVEL;
  const xpIntoLevel = totalXP - xpForCurrentLevel;
  const xpForNextLevel = XP_PER_LEVEL;
  const progressPercent = Math.min(
    Math.round((xpIntoLevel / xpForNextLevel) * 100),
    100
  );
  return { level, xpIntoLevel, xpForNextLevel, progressPercent };
}

export function getLevelTitle(level: number): string {
  const titles: Record<number, string> = {
    1: "Beginner",
    2: "Curious Learner",
    3: "Student",
    4: "Studious",
    5: "Scholar",
    6: "Sharp Mind",
    7: "Knowledge Seeker",
    8: "Expert Student",
    9: "Academic Star",
    10: "Top Ranker",
    11: "Board Aspirant",
    12: "Chapter Master",
    13: "Unit Champion",
    14: "AHSEC Scholar",
    15: "Platinum Achiever",
    16: "Elite Ranker",
    17: "Distinction Star",
    18: "Board Topper",
    19: "Platinum Legend",
    20: "LearnWithJulfy Elite",
  };
  return titles[level] || "Learner";
}

export function getLevelColor(level: number): string {
  if (level >= 18) return "from-yellow-400 to-amber-500"; // Gold
  if (level >= 15) return "from-violet-500 to-purple-600"; // Platinum
  if (level >= 10) return "from-indigo-500 to-blue-600"; // Blue
  if (level >= 5) return "from-emerald-400 to-teal-500"; // Green
  return "from-slate-400 to-slate-500"; // Grey
}
