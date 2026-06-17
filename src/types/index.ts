// Future-ready TypeScript structures for LearnWithJulfy Platinum Ranker

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin";
  rankScore: number;
  isPremiumUnlocked: boolean;
  createdAt: string;
}

export interface LessonProgress {
  unitId: string;
  dayNumber: number;
  isCompleted: boolean;
  lastStudiedAt: string;
}

export interface QuizAttempt {
  id: string;
  mcqId: number;
  selectedOptionIndex: number;
  isCorrect: boolean;
  attemptedAt: string;
}

export interface StudentStats {
  completedNotesCount: number; // Max 140 (7 units * 20 days)
  correctQuizAnswersCount: number;
  totalQuizAttempts: number;
  liveTestsCompleted: number;
}

export interface PremiumContentActivation {
  transactionId: string;
  activatedAt: string;
  planType: "monthly" | "yearly" | "lifetime";
  expiresAt?: string;
}
