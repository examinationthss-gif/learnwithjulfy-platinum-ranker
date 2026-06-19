import { StudentService } from "./studentService";
import { getCompletedDaysCount, getMCQStats } from "../localStorage";

export interface LeaderboardUser {
  rank: number;
  name: string;
  school: string;
  points: number;
  mcqsSolved: number;
  testsPassed: number;
  isCurrentUser?: boolean;
}

const STORAGE_KEY = "julfy-mock-students";

const DEFAULT_MOCK_STUDENTS: Omit<LeaderboardUser, "rank">[] = [
  { name: "Rahim Ahmed", school: "Cotton University", points: 420, mcqsSolved: 45, testsPassed: 5 },
  { name: "Karim Ali", school: "Jorhat Govt Boys School", points: 380, mcqsSolved: 40, testsPassed: 4 },
  { name: "Priya Das", school: "Salt Brook Academy", points: 340, mcqsSolved: 35, testsPassed: 4 },
  { name: "Amina Khatun", school: "B. Borooah College", points: 290, mcqsSolved: 30, testsPassed: 3 },
  { name: "Dipankar Phukan", school: "Dibrugarh Govt HS School", points: 250, mcqsSolved: 25, testsPassed: 2 },
];

export const LeaderboardService = {
  getMockStudents(): Omit<LeaderboardUser, "rank">[] {
    if (typeof window === "undefined") return DEFAULT_MOCK_STUDENTS;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error("Error reading mock students", e);
    }
    return DEFAULT_MOCK_STUDENTS;
  },

  saveMockStudents(students: Omit<LeaderboardUser, "rank">[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  },

  resetMockStudents(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  },

  getWeeklyLeaderboard(): LeaderboardUser[] {
    return this.generateLeaderboard(true);
  },

  getAllTimeLeaderboard(): LeaderboardUser[] {
    return this.generateLeaderboard(false);
  },

  generateLeaderboard(isWeekly: boolean): LeaderboardUser[] {
    const profile = StudentService.getProfile();
    
    // User stats
    const completedDays = getCompletedDaysCount();
    const mcqStats = getMCQStats();
    const mcqsSolved = Object.values(mcqStats).reduce((sum, item) => sum + item.correct, 0);
    const testsPassed = Object.values(mcqStats).filter(item => item.correct === item.total && item.total > 0).length;
    
    // Calculate points: Lesson (10 pts) + MCQ (2 pts) + Test (20 pts)
    const currentUserPoints = (completedDays * 10) + (mcqsSolved * 2) + (testsPassed * 20);

    const mockStudents = [...this.getMockStudents()];

    // Adjust points slightly for weekly view if requested
    const list = mockStudents.map(student => ({
      ...student,
      points: isWeekly ? Math.max(10, Math.round(student.points * 0.45)) : student.points
    }));

    if (profile) {
      list.push({
        name: profile.name + " (You)",
        school: profile.school || "AHSEC Student",
        points: currentUserPoints,
        mcqsSolved: mcqsSolved,
        testsPassed: testsPassed,
        isCurrentUser: true,
      });
    }

    // Sort by points desc
    const sorted = list.sort((a, b) => b.points - a.points);
    
    return sorted.map((student, index) => ({
      ...student,
      rank: index + 1,
    }));
  }
};
