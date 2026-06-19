import { getStudentProfile, setStudentProfile, StudentProfile } from "../localStorage";

export const StudentService = {
  getProfile(): StudentProfile | null {
    // LocalStorage Mode — Future ready for Supabase / Firebase / Custom Backend
    return getStudentProfile();
  },

  saveProfile(profile: Partial<StudentProfile> & { name: string }): void {
    const existing = getStudentProfile();
    const updated: StudentProfile = {
      name: profile.name,
      avatar: profile.avatar || "🎓",
      joinDate: existing?.joinDate || new Date().toISOString(),
      hasOnboarded: true,
      school: profile.school,
      district: profile.district || existing?.district || "Kamrup",
      rollNumber: profile.rollNumber,
      mobile: profile.mobile || existing?.mobile || "",
    };
    setStudentProfile(updated);
  },

  clearProfile(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("julfy-student-profile");
    }
  }
};
