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
  // Unit Completion Badges (Unit Master awards)
  { id: "unit_1_master", nameEn: "Unit I Master", nameAs: "গোট ১ অধিপতি", descriptionEn: "Completed all Day Notes for Unit I", descriptionAs: "গোট ১ ৰ সকলো দিনৰ টোকা সম্পূৰ্ণ কৰিলে", icon: "🏛️", rarity: "rare", category: "completion" },
  { id: "unit_2_master", nameEn: "Unit II Master", nameAs: "গোট ২ অধিপতি", descriptionEn: "Completed all Day Notes for Unit II", descriptionAs: "গোট ২ ৰ সকলো দিনৰ টোকা সম্পূৰ্ণ কৰিলে", icon: "🏫", rarity: "rare", category: "completion" },
  { id: "unit_3_master", nameEn: "Unit III Master", nameAs: "গোট ৩ অধিপতি", descriptionEn: "Completed all Day Notes for Unit III", descriptionAs: "গোট ৩ ৰ সকলো দিনৰ টোকা সম্পূৰ্ণ কৰিলে", icon: "📈", rarity: "rare", category: "completion" },
  { id: "unit_4_master", nameEn: "Unit IV Master", nameAs: "গোট ৪ অধিপতি", descriptionEn: "Completed all Day Notes for Unit IV", descriptionAs: "গোট ৪ ৰ সকলো দিনৰ টোকা সম্পূৰ্ণ কৰিলে", icon: "💡", rarity: "rare", category: "completion" },
  { id: "unit_5_master", nameEn: "Unit V Master", nameAs: "গোট ৫ অধিপতি", descriptionEn: "Completed all Day Notes for Unit V", descriptionAs: "গোট ৫ ৰ সকলো দিনৰ টোকা সম্পূৰ্ণ কৰিলে", icon: "🧠", rarity: "rare", category: "completion" },
  { id: "unit_6_master", nameEn: "Unit VI Master", nameAs: "গোট ৬ অধিপতি", descriptionEn: "Completed all Day Notes for Unit VI", descriptionAs: "গোট ৬ ৰ সকলো দিনৰ টোকা সম্পূৰ্ণ কৰিলে", icon: "🛡️", rarity: "rare", category: "completion" },
  { id: "unit_7_master", nameEn: "Unit VII Master", nameAs: "গোট ৭ অধিপতি", descriptionEn: "Completed all Day Notes for Unit VII", descriptionAs: "গোট ৭ ৰ সকলো দিনৰ টোকা সম্পূৰ্ণ কৰিলে", icon: "📊", rarity: "rare", category: "completion" },

  // MCQ Milestone Badges
  { id: "mcq_10", nameEn: "MCQ Novice", nameAs: "MCQ নৱাগত", descriptionEn: "Solved 10 MCQs", descriptionAs: "১০টা MCQ সমাধান কৰিলে", icon: "📝", rarity: "common", category: "quiz" },
  { id: "mcq_50", nameEn: "MCQ Archer", nameAs: "MCQ ধনুৰ্ধৰ", descriptionEn: "Solved 50 MCQs", descriptionAs: "৫০টা MCQ সমাধান কৰিলে", icon: "🏹", rarity: "common", category: "quiz" },
  { id: "mcq_100", nameEn: "MCQ Sniper", nameAs: "MCQ স্নাইপাৰ", descriptionEn: "Solved 100 MCQs", descriptionAs: "১০০টা MCQ সমাধান কৰিলে", icon: "🎯", rarity: "rare", category: "quiz" },
  { id: "mcq_300", nameEn: "MCQ Gladiator", nameAs: "MCQ যোদ্ধা", descriptionEn: "Solved 300 MCQs", descriptionAs: "৩০০টা MCQ সমাধান কৰিলে", icon: "⚔️", rarity: "epic", category: "quiz" },
  { id: "mcq_500", nameEn: "MCQ Overlord", nameAs: "MCQ সম্ৰাট", descriptionEn: "Solved 500 MCQs", descriptionAs: "৫০০টা MCQ সমাধান কৰিলে", icon: "👑", rarity: "legendary", category: "quiz" },

  // Streak Milestone Badges
  { id: "streak_5", nameEn: "High Five Streak", nameAs: "৫ দিনৰ ধাৰা", descriptionEn: "Maintained a 5-day study streak", descriptionAs: "৫ দিনৰ অধ্যয়নৰ ধাৰা অক্ষুণ্ণ ৰাখিলে", icon: "🖐️", rarity: "common", category: "streak" },
  { id: "streak_10", nameEn: "Double Digit Streak", nameAs: "১০ দিনৰ ধাৰা", descriptionEn: "Maintained a 10-day study streak", descriptionAs: "১০ দিনৰ অধ্যয়নৰ ধাৰা অক্ষুণ্ণ ৰাখিলে", icon: "🔟", rarity: "rare", category: "streak" },
  { id: "streak_15", nameEn: "Fortnight Warrior", nameAs: "১৫ দিনৰ ধাৰা", descriptionEn: "Maintained a 15-day study streak", descriptionAs: "১৫ দিনৰ অধ্যয়নৰ ধাৰা অক্ষুণ্ণ ৰাখিলে", icon: "🛡️", rarity: "rare", category: "streak" },
  { id: "streak_20", nameEn: "Score Streak", nameAs: "২০ দিনৰ ধাৰা", descriptionEn: "Maintained a 20-day study streak", descriptionAs: "২০ দিনৰ অধ্যয়নৰ ধাৰা অক্ষুণ্ণ ৰাখিলে", icon: "🔥", rarity: "epic", category: "streak" },
  { id: "streak_50", nameEn: "Half Century Streak", nameAs: "৫০ দিনৰ ধাৰা", descriptionEn: "Maintained a 50-day study streak", descriptionAs: "৫০ দিনৰ অধ্যয়নৰ ধাৰা অক্ষুণ্ণ ৰাখিলে", icon: "🚀", rarity: "legendary", category: "streak" },
  { id: "streak_100", nameEn: "Century Immortal", nameAs: "১০০ দিনৰ ধাৰা", descriptionEn: "Maintained a 100-day study streak", descriptionAs: "১০০ দিনৰ অধ্যয়নৰ ধাৰা অক্ষুণ্ণ ৰাখিলে", icon: "🦅", rarity: "legendary", category: "streak" },

  // Test Excellence Badges
  { id: "test_starter", nameEn: "Test Taker", nameAs: "পৰীক্ষা প্ৰাৰম্ভিক", descriptionEn: "Completed your first timed mock test", descriptionAs: "প্ৰথমটো নিৰ্ধাৰিত সময়ৰ মক টেষ্ট সম্পূৰ্ণ কৰিলে", icon: "⏱️", rarity: "common", category: "quiz" },
  { id: "test_silver", nameEn: "Mock Silver", nameAs: "মক ৰূপালী", descriptionEn: "Scored 70%+ on a timed mock test", descriptionAs: "মক টেষ্টত ৭০%+ নম্বৰ পালে", icon: "🥈", rarity: "common", category: "quiz" },
  { id: "test_gold", nameEn: "Mock Gold", nameAs: "মক সোণালী", descriptionEn: "Scored 85%+ on a timed mock test", descriptionAs: "মক টেষ্টত ৮৫%+ নম্বৰ পালে", icon: "🥇", rarity: "rare", category: "quiz" },
  { id: "test_diamond", nameEn: "Mock Mastermind", nameAs: "মক হীৰক", descriptionEn: "Scored 95%+ on a timed mock test", descriptionAs: "মক টেষ্টত ৯৫%+ নম্বৰ পালে", icon: "💎", rarity: "epic", category: "quiz" },
  { id: "test_consecutive_3", nameEn: "Mock Specialist", nameAs: "মক বিশেষজ্ঞ", descriptionEn: "Scored 80%+ on 3 consecutive timed tests", descriptionAs: "টানি ৩টা মক টেষ্টত ৮০%+ নম্বৰ পালে", icon: "🎓", rarity: "epic", category: "quiz" },

  // Learning Velocity & Hours Badges
  { id: "study_hours_5", nameEn: "Dedicated Reader", nameAs: "নিষ্ঠাবান পাঠক", descriptionEn: "Studied for a total of 5 hours", descriptionAs: "সৰ্বমুঠ ৫ ঘণ্টা অধ্যয়ন কৰিলে", icon: "⌛", rarity: "common", category: "progress" },
  { id: "study_hours_10", nameEn: "Intellect Ascent", nameAs: "বুদ্ধি আৰোহণ", descriptionEn: "Studied for a total of 10 hours", descriptionAs: "সৰ্বমুঠ ১০ ঘণ্টা অধ্যয়ন কৰিলে", icon: "⛰️", rarity: "rare", category: "progress" },
  { id: "study_hours_25", nameEn: "Deep Work Master", nameAs: "গভীৰ কৰ্মৰ অধিপতি", descriptionEn: "Studied for a total of 25 hours", descriptionAs: "সৰ্বমুঠ ২৫ ঘণ্টা অধ্যয়ন কৰিলে", icon: "⏳", rarity: "epic", category: "progress" },
  { id: "study_hours_50", nameEn: "Scholar Elite", nameAs: "অভিজাত পণ্ডিত", descriptionEn: "Studied for a total of 50 hours", descriptionAs: "সৰ্বমুঠ ৫০ ঘণ্টা অধ্যয়ন কৰিলে", icon: "📜", rarity: "legendary", category: "progress" },

  // Video Classes Milestones
  { id: "video_10", nameEn: "Binge Learner", nameAs: "ভিডিঅ' লভাৰ", descriptionEn: "Watched 10 video classes", descriptionAs: "১০টা ভিডিঅ' পাঠ চালে", icon: "🍿", rarity: "rare", category: "progress" },
  { id: "video_all", nameEn: "Cinematic Scholar", nameAs: "ভিডিঅ' সম্ৰাট", descriptionEn: "Watched all video lectures on the platform", descriptionAs: "প্লেটফৰ্মৰ সকলো ভিডিঅ' পাঠ চালে", icon: "🎬", rarity: "legendary", category: "progress" },

  // Topic Mastery & Academic Excellence
  { id: "topic_master_statistics", nameEn: "Stats Wizard", nameAs: "পৰিসংখ্যা যাদুকৰ", descriptionEn: "Achieve 90%+ accuracy in Unit VII statistics MCQs", descriptionAs: "পৰিসংখ্যা গোটত ৯০%+ MCQ সঠিকতা পালে", icon: "🧮", rarity: "epic", category: "quiz" },
  { id: "topic_master_mental", nameEn: "Zen Scholar", nameAs: "মানসিক স্বাস্থ্যবিদ", descriptionEn: "Achieve 90%+ accuracy in Unit VI mental health MCQs", descriptionAs: "মানসিক স্বাস্থ্য গোটত ৯০%+ MCQ সঠিকতা পালে", icon: "🧘", rarity: "epic", category: "quiz" },
  { id: "topic_master_learning", nameEn: "Cognitive Scientist", nameAs: "জ্ঞান বিজ্ঞানী", descriptionEn: "Achieve 90%+ accuracy in Unit IV learning MCQs", descriptionAs: "শিকন গোটত ৯০%+ MCQ সঠিকতা পালে", icon: "🔍", rarity: "epic", category: "quiz" },
  { id: "bilingual_expert", nameEn: "Assamese Linguist", nameAs: "অসমীয়া ভাষা বিশাৰদ", descriptionEn: "Spent 5+ sessions in Assamese medium", descriptionAs: "৫ বাৰতকৈ অধিক অসমীয়া মাধ্যমত অধ্যয়ন কৰিলে", icon: "🗺️", rarity: "rare", category: "special" },
  { id: "early_bird", nameEn: "Early Bird", nameAs: "প্ৰাতঃভ্ৰমণকাৰী", descriptionEn: "Completed a lesson before 7 AM", descriptionAs: "ৰাতিপুৱা ৭ বজাৰ আগতে এটা পাঠ সম্পূৰ্ণ কৰিলে", icon: "🌅", rarity: "common", category: "special" },
  { id: "weekend_warrior", nameEn: "Weekend Scholar", nameAs: "সপ্তাহান্তিক যোদ্ধা", descriptionEn: "Studied on both Saturday and Sunday", descriptionAs: "শনিবাৰ আৰু দেওবাৰ দুয়োদিনতে অধ্যয়ন কৰিলে", icon: "⛺", rarity: "common", category: "special" },
  { id: "profile_pioneer", nameEn: "Profile Pioneer", nameAs: "প্ৰফাইল অগ্ৰগামী", descriptionEn: "Configured your public student profile badge display", descriptionAs: "আপোনাৰ ৰাজহুৱা ছাত্ৰ প্ৰফাইল সঁজাই তুলিলে", icon: "🖼️", rarity: "common", category: "special" },
  { id: "revision_pro", nameEn: "Planner Revisionist", nameAs: "সংশোধন নিপুণ", descriptionEn: "Completed 3 priority tasks suggested by the study planner", descriptionAs: "অধ্যয়ন পৰিকল্পনাকাৰীৰ ৩টা অগ্ৰাধিকাৰ কাম সম্পূৰ্ণ কৰিলে", icon: "📅", rarity: "rare", category: "special" },
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
