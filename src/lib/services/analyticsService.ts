import { getMCQStats, getCompletedDays } from "../localStorage";

export interface AnalyticsReport {
  weakAreas: string[];
  strongAreas: string[];
  mcqAccuracy: number;
  studyConsistency: number; // percentage of days active out of 140
}

export const AnalyticsService = {
  getReport(): AnalyticsReport {
    // LocalStorage Mode — Future ready for Supabase / Firebase / Custom Backend
    const mcqStats = getMCQStats();
    
    // Group MCQ stats by unit
    const unitAccuracy: Record<string, { correct: number; total: number }> = {};
    for (let u = 1; u <= 7; u++) {
      unitAccuracy[`unit${u}`] = { correct: 0, total: 0 };
    }

    Object.entries(mcqStats).forEach(([key, stats]) => {
      const parts = key.split("-");
      if (parts.length > 0 && parts[0].startsWith("unit")) {
        const unit = parts[0];
        if (unitAccuracy[unit]) {
          unitAccuracy[unit].correct += stats.correct;
          unitAccuracy[unit].total += stats.total;
        }
      }
    });

    const strongAreas: string[] = [];
    const weakAreas: string[] = [];

    const unitNames: Record<string, string> = {
      unit1: "Secondary Education in India",
      unit2: "Non-formal Education",
      unit3: "Current Trends",
      unit4: "Learning Theory",
      unit5: "Memory & Attention",
      unit6: "Mental Health",
      unit7: "Educational Statistics"
    };

    Object.entries(unitAccuracy).forEach(([unit, stats]) => {
      if (stats.total > 0) {
        const rate = (stats.correct / stats.total) * 100;
        if (rate >= 70) {
          strongAreas.push(unitNames[unit]);
        } else {
          weakAreas.push(unitNames[unit]);
        }
      } else {
        weakAreas.push(unitNames[unit]);
      }
    });

    // Calculate total MCQ Accuracy
    const totalMCQAttempts = Object.values(mcqStats).reduce((s, e) => s + e.total, 0);
    const totalCorrect = Object.values(mcqStats).reduce((s, e) => s + e.correct, 0);
    const mcqAccuracy = totalMCQAttempts > 0 ? Math.round((totalCorrect / totalMCQAttempts) * 100) : 0;

    // Study consistency
    const completedDays = getCompletedDays();
    const completedDaysCount = Object.values(completedDays).filter(Boolean).length;
    const studyConsistency = Math.min(Math.round((completedDaysCount / 140) * 100), 100);

    return {
      weakAreas: weakAreas.slice(0, 3),
      strongAreas: strongAreas.length > 0 ? strongAreas.slice(0, 3) : ["None yet - Start MCQs!"],
      mcqAccuracy,
      studyConsistency
    };
  }
};
