// Intelligence Engine for predictions, recommendations, planning, and performance metrics.
import {
  getCompletedDays,
  getMCQStats,
  getCompletedDaysCount,
  getWatchedVideosCount,
  getOverallMCQAccuracy,
  getCurrentStreak,
} from "./localStorage";

export interface PredictionReport {
  predictedScore: number; // 0-100
  readinessLevel: "Low" | "Medium" | "High" | "Board Ready";
  unitScores: Record<string, number>;
  riskAlerts: { unitId: string; reason: string; severity: "high" | "medium" }[];
  improvementTips: string[];
}

export interface IntelligenceReport {
  weakTopics: { topicName: string; accuracy: number; unitId: string }[];
  strongTopics: { topicName: string; accuracy: number; unitId: string }[];
  learningVelocity: number; // days completed per week avg
  totalStudyHours: number;
}

export interface StudyPlanTask {
  id: string;
  type: "read" | "mcq" | "video" | "test";
  title: string;
  subtitle: string;
  href: string;
  isCompleted: boolean;
  priority: "high" | "medium" | "low";
}

export interface StudyPlan {
  dailyGoals: StudyPlanTask[];
  examCountdownDays: number;
  recommendedNextLesson: { title: string; href: string } | null;
  missedSessionRecovery: string | null;
}

const UNITS = [
  { id: "unit1", name: "Secondary Education in India" },
  { id: "unit2", name: "Non-formal Education" },
  { id: "unit3", name: "Current Trends" },
  { id: "unit4", name: "Learning" },
  { id: "unit5", name: "Memory & Attention" },
  { id: "unit6", name: "Mental Health" },
  { id: "unit7", name: "Educational Statistics" },
];

export function getIntelligenceReport(): IntelligenceReport {
  const mcqStats = getMCQStats();
  const completedCount = getCompletedDaysCount();
  
  const weakTopics: IntelligenceReport["weakTopics"] = [];
  const strongTopics: IntelligenceReport["strongTopics"] = [];

  UNITS.forEach((unit) => {
    const stats = mcqStats[unit.id];
    if (stats && stats.total > 0) {
      const accuracy = Math.round((stats.correct / stats.total) * 100);
      if (accuracy < 70) {
        weakTopics.push({ topicName: unit.name, accuracy, unitId: unit.id });
      } else if (accuracy >= 85) {
        strongTopics.push({ topicName: unit.name, accuracy, unitId: unit.id });
      }
    }
  });

  // Default fallbacks if no MCQs have been solved yet
  if (weakTopics.length === 0 && Object.keys(mcqStats).length === 0) {
    weakTopics.push({ topicName: "Educational Statistics (Unit VII)", accuracy: 0, unitId: "unit7" });
    weakTopics.push({ topicName: "Memory & Attention (Unit V)", accuracy: 0, unitId: "unit5" });
  }

  if (strongTopics.length === 0 && completedCount > 0) {
    strongTopics.push({ topicName: "Secondary Education in India (Unit I)", accuracy: 100, unitId: "unit1" });
  }

  // Calculate simulated total study hours
  // Average note read: 10 mins, Average MCQ session: 5 mins, Video session: 10 mins
  const watchedVideos = getWatchedVideosCount();
  const rawHours = (completedCount * 12 + watchedVideos * 15 + Object.keys(mcqStats).length * 8) / 60;
  const totalStudyHours = Math.max(1.5, Math.round(rawHours * 10) / 10);

  // Learning Velocity: Days per week based on total completed
  const learningVelocity = Math.max(1, Math.min(7, Math.round((completedCount / 4) * 10) / 10));

  return {
    weakTopics,
    strongTopics,
    learningVelocity,
    totalStudyHours,
  };
}

export function getPredictedBoardReport(): PredictionReport {
  const mcqAccuracy = getOverallMCQAccuracy();
  const watchedCount = getWatchedVideosCount();
  const streak = getCurrentStreak();
  const mcqStats = getMCQStats();

  // Unit-wise prediction
  const unitScores: Record<string, number> = {};
  const riskAlerts: PredictionReport["riskAlerts"] = [];

  UNITS.forEach((u) => {
    // 60% based on notes completion (20 days per unit)
    const unitDaysCompleted = Object.keys(getCompletedDays()).filter(
      (k) => k.startsWith(u.id)
    ).length;
    const progressFactor = Math.min(unitDaysCompleted / 20, 1);
    
    // 40% based on MCQ performance
    const stats = mcqStats[u.id];
    const accFactor = stats && stats.total > 0 ? stats.correct / stats.total : 0.75; // baseline accuracy assumptions

    const unitScore = Math.round(progressFactor * 60 + accFactor * 40);
    unitScores[u.id] = unitScore;

    if (unitDaysCompleted < 5) {
      riskAlerts.push({
        unitId: u.id,
        reason: `Critical lack of study material completed. Only ${unitDaysCompleted}/20 notes finished.`,
        severity: "high",
      });
    } else if (accFactor < 0.6) {
      riskAlerts.push({
        unitId: u.id,
        reason: `Poor MCQ accuracy (${Math.round(accFactor * 100)}%). Review conceptual notes immediately.`,
        severity: "medium",
      });
    }
  });

  // Calculate overall board score index (weighted out of 100)
  const averageUnitScore = Object.values(unitScores).reduce((s, e) => s + e, 0) / UNITS.length;
  // Dynamic scaling with premium weights for streaks and video attendance
  const bonusStreak = Math.min(streak * 0.2, 5);
  const bonusVideos = Math.min(watchedCount * 0.5, 5);
  const predictedScore = Math.min(100, Math.round(averageUnitScore + bonusStreak + bonusVideos));

  let readinessLevel: PredictionReport["readinessLevel"] = "Low";
  if (predictedScore >= 90) readinessLevel = "Board Ready";
  else if (predictedScore >= 75) readinessLevel = "High";
  else if (predictedScore >= 50) readinessLevel = "Medium";

  // Dynamic Tips Generator
  const improvementTips: string[] = [];
  if (predictedScore < 75) {
    improvementTips.push("Complete at least 3 more day-notes to raise your foundational syllabus scores.");
  }
  if (mcqAccuracy < 80) {
    improvementTips.push("Spend 10 minutes resolving incorrect answers in the MCQ Bank to master exam logic.");
  }
  if (streak < 3) {
    improvementTips.push("Establish a 3-day study streak to unlock cognitive consistency rewards and boost memory memory score.");
  }
  if (improvementTips.length === 0) {
    improvementTips.push("Looking fantastic! Attempt timed tests under real exam conditions to ensure speed readiness.");
  }

  return {
    predictedScore,
    readinessLevel,
    unitScores,
    riskAlerts: riskAlerts.slice(0, 3),
    improvementTips,
  };
}

export function getStudyPlanner(): StudyPlan {
  const completedDays = getCompletedDays();
  
  // Find recommended next lesson
  let recommendedNextLesson: StudyPlan["recommendedNextLesson"] = null;
  let found = false;

  for (let u = 1; u <= 7 && !found; u++) {
    for (let d = 1; d <= 20 && !found; d++) {
      const key = `unit${u}-day${d}`;
      if (!completedDays[key]) {
        recommendedNextLesson = {
          title: `Unit ${u} • Day ${d} Notes`,
          href: `/notes/unit${u}/day${d}`,
        };
        found = true;
      }
    }
  }

  if (!recommendedNextLesson) {
    recommendedNextLesson = {
      title: "Unit I • Day 1 Notes (Revision)",
      href: "/notes/unit1/day1",
    };
  }

  // Smart daily goals based on progress
  const dailyGoals: StudyPlanTask[] = [
    {
      id: "goal_1",
      type: "read",
      title: "Read Recommended Lesson",
      subtitle: recommendedNextLesson.title,
      href: recommendedNextLesson.href,
      isCompleted: false,
      priority: "high",
    },
    {
      id: "goal_2",
      type: "mcq",
      title: "Solve Unit MCQ challenge",
      subtitle: "Attempt at least 5 MCQs correctly",
      href: "/mcq",
      isCompleted: false,
      priority: "medium",
    },
    {
      id: "goal_3",
      type: "video",
      title: "Video Classroom",
      subtitle: "Watch 1 educational video lecture",
      href: "/videos",
      isCompleted: false,
      priority: "low",
    },
  ];

  // Mock AHSEC Board Exam countdown - Set to next March 5
  const examDate = new Date("2027-03-05");
  const today = new Date();
  const diffTime = Math.abs(examDate.getTime() - today.getTime());
  const examCountdownDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Missed session recovery
  const streak = getCurrentStreak();
  const missedSessionRecovery = streak === 0 
    ? "You missed study sessions recently! Read one Day Note today to instantly recover your daily streak."
    : null;

  return {
    dailyGoals,
    examCountdownDays,
    recommendedNextLesson,
    missedSessionRecovery,
  };
}
