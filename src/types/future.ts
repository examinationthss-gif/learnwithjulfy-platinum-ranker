/**
 * LearnWithJulfy Future-Ready Architecture Types
 * 
 * These types establish the schema and payload contracts for future extensions
 * of the platform (Student Login, Premium Tiers, Quiz/Test Engines, AI Tutor, and Mobile Apps).
 * Do NOT implement logic for these yet; they are for scalable design only.
 */

export interface StudentProfile {
  id: string;
  email: string;
  fullName: string;
  mediumPreference: "en" | "as";
  rankProgress: {
    totalPoints: number;
    currentBadge: "Bronze" | "Silver" | "Gold" | "Platinum";
    rankPercentile: number;
  };
  subscription: {
    tier: "free" | "platinum_premium";
    expiresAt: string | null;
    paymentHistoryId?: string;
  };
  academicSettings: {
    targetScore: number; // e.g. 100
    selectedSubjects: string[]; // e.g. ["Education", "English", "Political Science"]
  };
  createdAt: string;
}

export interface CompletionTracker {
  studentId: string;
  completedDays: Record<string, { // key represents "unitX-dayY"
    completedAt: string;
    mcqScore: number;
    testScore: number;
    notesReadTimeSeconds: number;
  }>;
  overallPercent: number; // e.g. 80.5
}

export interface PremiumContentPaywall {
  itemId: string;
  itemType: "note" | "test" | "model_paper" | "prediction_paper";
  unitId: string;
  dayId?: string;
  isLocked: boolean;
  requiredSubscriptionTier: "free" | "platinum_premium";
  previewTextEn: string;
  previewTextAs: string;
}

export interface AITutorMessage {
  id: string;
  sender: "user" | "ai_tutor";
  text: string;
  timestamp: string;
}

export interface AITutorSession {
  sessionId: string;
  studentId: string;
  currentTopicContext: {
    unitId: string;
    dayId: string;
    topicName: string;
  };
  chatHistory: AITutorMessage[];
  suggestedResources: {
    title: string;
    url: string;
  }[];
}

export interface MobileSyncHeader {
  deviceId: string;
  deviceOs: "ios" | "android";
  lastSyncTimestamp: string;
  pendingOfflineCompletions: string[]; // array of offline completed "unitX-dayY" keys
  appVersion: string;
}
