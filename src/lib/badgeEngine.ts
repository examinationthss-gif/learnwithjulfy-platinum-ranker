// Badge Engine — defines all badges and auto-award logic

export interface Badge {
  id: string;
  nameEn: string;
  nameAs: string;
  descriptionEn: string;
  descriptionAs: string;
  icon: string; // emoji
  rarity: "common" | "rare" | "epic" | "legendary";
  category: "progress" | "quiz" | "streak" | "completion" | "special";
}

export const ALL_BADGES: Badge[] = [
  {
    id: "first_step",
    nameEn: "First Step",
    nameAs: "প্ৰথম পদক্ষেপ",
    descriptionEn: "Completed your first day of notes",
    descriptionAs: "প্ৰথম দিনৰ টোকা সম্পূৰ্ণ কৰিলে",
    icon: "🌱",
    rarity: "common",
    category: "progress",
  },
  {
    id: "dedicated_learner",
    nameEn: "Dedicated Learner",
    nameAs: "নিষ্ঠাবান শিক্ষাৰ্থী",
    descriptionEn: "Completed 10 days of notes",
    descriptionAs: "১০ দিনৰ টোকা সম্পূৰ্ণ কৰিলে",
    icon: "📚",
    rarity: "common",
    category: "progress",
  },
  {
    id: "halfway_hero",
    nameEn: "Halfway Hero",
    nameAs: "আধা পথৰ বীৰ",
    descriptionEn: "Completed 70 days of notes (halfway!)",
    descriptionAs: "৭০ দিনৰ টোকা সম্পূৰ্ণ কৰিলে",
    icon: "⚡",
    rarity: "rare",
    category: "progress",
  },
  {
    id: "unit_champion",
    nameEn: "Unit Champion",
    nameAs: "গোট বিজয়ী",
    descriptionEn: "Completed all 20 days of any unit",
    descriptionAs: "যিকোনো গোটৰ ২০ দিন সম্পূৰ্ণ কৰিলে",
    icon: "🏅",
    rarity: "rare",
    category: "completion",
  },
  {
    id: "quiz_starter",
    nameEn: "Quiz Starter",
    nameAs: "কুইজ আৰম্ভকাৰী",
    descriptionEn: "Answered 10 MCQs correctly",
    descriptionAs: "১০টা MCQ সঠিকভাৱে উত্তৰ দিলে",
    icon: "🧩",
    rarity: "common",
    category: "quiz",
  },
  {
    id: "quiz_master",
    nameEn: "Quiz Master",
    nameAs: "কুইজ মাষ্টাৰ",
    descriptionEn: "Answered 50 MCQs correctly",
    descriptionAs: "৫০টা MCQ সঠিকভাৱে উত্তৰ দিলে",
    icon: "🧠",
    rarity: "rare",
    category: "quiz",
  },
  {
    id: "mcq_legend",
    nameEn: "MCQ Legend",
    nameAs: "MCQ কিংবদন্তি",
    descriptionEn: "Answered 200 MCQs correctly",
    descriptionAs: "২০০টা MCQ সঠিকভাৱে উত্তৰ দিলে",
    icon: "🏆",
    rarity: "epic",
    category: "quiz",
  },
  {
    id: "perfect_score",
    nameEn: "Perfect Score",
    nameAs: "পূৰ্ণ নম্বৰ",
    descriptionEn: "Scored 100% on any test",
    descriptionAs: "যিকোনো পৰীক্ষাত ১০০% পালে",
    icon: "⭐",
    rarity: "epic",
    category: "quiz",
  },
  {
    id: "streak_starter",
    nameEn: "Streak Starter",
    nameAs: "ধাৰা আৰম্ভকাৰী",
    descriptionEn: "Studied 3 days in a row",
    descriptionAs: "লাগাতাৰ ৩ দিন অধ্যয়ন কৰিলে",
    icon: "🔥",
    rarity: "common",
    category: "streak",
  },
  {
    id: "week_warrior",
    nameEn: "Week Warrior",
    nameAs: "সপ্তাহৰ যোদ্ধা",
    descriptionEn: "Studied 7 days in a row",
    descriptionAs: "লাগাতাৰ ৭ দিন অধ্যয়ন কৰিলে",
    icon: "🗓️",
    rarity: "rare",
    category: "streak",
  },
  {
    id: "month_master",
    nameEn: "Month Master",
    nameAs: "মাহৰ মাষ্টাৰ",
    descriptionEn: "Studied 30 days in a row",
    descriptionAs: "লাগাতাৰ ৩০ দিন অধ্যয়ন কৰিলে",
    icon: "🌙",
    rarity: "legendary",
    category: "streak",
  },
  {
    id: "bilingual_scholar",
    nameEn: "Bilingual Scholar",
    nameAs: "দ্বিভাষিক পণ্ডিত",
    descriptionEn: "Used Assamese language mode",
    descriptionAs: "অসমীয়া ভাষা ব্যৱহাৰ কৰিলে",
    icon: "🌐",
    rarity: "common",
    category: "special",
  },
  {
    id: "video_scholar",
    nameEn: "Video Scholar",
    nameAs: "ভিডিঅ' পণ্ডিত",
    descriptionEn: "Watched 3 video lessons",
    descriptionAs: "৩টা ভিডিঅ' পাঠ চালে",
    icon: "🎥",
    rarity: "common",
    category: "progress",
  },
  {
    id: "night_owl",
    nameEn: "Night Owl",
    nameAs: "নিশাৰ পক্ষী",
    descriptionEn: "Studied after 10 PM",
    descriptionAs: "ৰাতি ১০ বজাৰ পিছত অধ্যয়ন কৰিলে",
    icon: "🦉",
    rarity: "common",
    category: "special",
  },
  {
    id: "board_ready",
    nameEn: "Board Ready",
    nameAs: "বোৰ্ড প্ৰস্তুত",
    descriptionEn: "Scored 90%+ on 3 different tests",
    descriptionAs: "৩টা পৰীক্ষাত ৯০%+ পালে",
    icon: "🎯",
    rarity: "epic",
    category: "quiz",
  },
  {
    id: "platinum_elite",
    nameEn: "Platinum Elite",
    nameAs: "প্লেটিনাম এলিট",
    descriptionEn: "Completed all 7 units (140 days!)",
    descriptionAs: "সকলো ৭টা গোট সম্পূৰ্ণ কৰিলে (১৪০ দিন!)",
    icon: "💎",
    rarity: "legendary",
    category: "completion",
  },
];

export const BADGE_MAP: Record<string, Badge> = Object.fromEntries(
  ALL_BADGES.map((b) => [b.id, b])
);

export function getRarityColor(rarity: Badge["rarity"]): string {
  switch (rarity) {
    case "legendary": return "from-yellow-400 to-amber-500 border-yellow-400/40";
    case "epic": return "from-violet-500 to-purple-600 border-violet-400/40";
    case "rare": return "from-blue-500 to-indigo-600 border-blue-400/40";
    default: return "from-slate-400 to-slate-500 border-slate-400/20";
  }
}

export function getRarityLabel(rarity: Badge["rarity"]): string {
  return rarity.charAt(0).toUpperCase() + rarity.slice(1);
}
