export interface DistrictStats {
  totalStudents: number;
  totalSchools: number;
  activeLearners: number;
  averageTestScore: number;
  topPerformingSchool: string;
  topPerformingSchoolScore: number;
  topPerformingStudent: string;
  topPerformingStudentScore: number;
}

export interface UnitCompletionRate {
  unitId: string;
  label: string;
  name: string;
  ratePercent: number;
  color: string;
}

export interface WeeklyGrowthData {
  week: string;
  activeStudents: number;
}

export interface SchoolRank {
  rank: number;
  name: string;
  averagePoints: number;
  studentCount: number;
  completionRate: number;
}

export const DistrictAnalyticsService = {
  getOverviewStats(): DistrictStats {
    // local mock data - ready to be wired to remote API / Supabase later
    return {
      totalStudents: 1482,
      totalSchools: 38,
      activeLearners: 945,
      averageTestScore: 78.6,
      topPerformingSchool: "Cotton University",
      topPerformingSchoolScore: 89.4,
      topPerformingStudent: "Jahnvi Bezbaruah",
      topPerformingStudentScore: 560,
    };
  },

  getUnitCompletionRates(): UnitCompletionRate[] {
    return [
      { unitId: "unit1", label: "Unit I", name: "Secondary Education in India", ratePercent: 88, color: "from-blue-500 to-indigo-600" },
      { unitId: "unit2", label: "Unit II", name: "Non-formal Education", ratePercent: 79, color: "from-purple-500 to-violet-600" },
      { unitId: "unit3", label: "Unit III", name: "Current Trends", ratePercent: 68, color: "from-emerald-500 to-teal-600" },
      { unitId: "unit4", label: "Unit IV", name: "Learning", ratePercent: 54, color: "from-amber-500 to-orange-600" },
      { unitId: "unit5", label: "Unit V", name: "Memory & Attention", ratePercent: 42, color: "from-pink-500 to-rose-600" },
      { unitId: "unit6", label: "Unit VI", name: "Mental Health", ratePercent: 31, color: "from-cyan-500 to-sky-600" },
      { unitId: "unit7", label: "Unit VII", name: "Educational Statistics", ratePercent: 19, color: "from-red-500 to-pink-600" },
    ];
  },

  getWeeklyGrowth(): WeeklyGrowthData[] {
    return [
      { week: "Wk 1", activeStudents: 420 },
      { week: "Wk 2", activeStudents: 580 },
      { week: "Wk 3", activeStudents: 690 },
      { week: "Wk 4", activeStudents: 810 },
      { week: "Wk 5", activeStudents: 945 },
    ];
  },

  getSchoolLeaderboard(): SchoolRank[] {
    return [
      { rank: 1, name: "Cotton University, Guwahati", averagePoints: 485, studentCount: 142, completionRate: 91 },
      { rank: 2, name: "Salt Brook Academy, Dibrugarh", averagePoints: 460, studentCount: 98, completionRate: 88 },
      { rank: 3, name: "Jorhat Govt Boys School, Jorhat", averagePoints: 432, studentCount: 76, completionRate: 82 },
      { rank: 4, name: "B. Borooah College, Guwahati", averagePoints: 395, studentCount: 110, completionRate: 75 },
      { rank: 5, name: "Gurukul College, Barpeta", averagePoints: 360, studentCount: 64, completionRate: 69 },
    ];
  }
};
