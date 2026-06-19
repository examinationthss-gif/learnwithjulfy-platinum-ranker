"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, UserPlus, Trash2, Edit3, RotateCcw, Database, ShieldAlert, Award, Sparkles } from "lucide-react";
import { LeaderboardService, LeaderboardUser } from "@/lib/services/leaderboardService";
import { STORAGE_KEYS, safeSet } from "@/lib/localStorage";

export default function AdminDemoPage() {
  const [mounted, setMounted] = useState(false);
  const [mockStudents, setMockStudents] = useState<Omit<LeaderboardUser, "rank">[]>([]);
  const [editingStudentIndex, setEditingStudentIndex] = useState<number | null>(null);

  // Form inputs
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [points, setPoints] = useState(0);
  const [mcqsSolved, setMcqsSolved] = useState(0);
  const [testsPassed, setTestsPassed] = useState(0);

  const [notification, setNotification] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    setMounted(true);
    loadStudents();
  }, []);

  const loadStudents = () => {
    setMockStudents(LeaderboardService.getMockStudents());
  };

  const showNotification = (text: string, type: "success" | "error" = "success") => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !school) {
      showNotification("Please fill in Name and School details.", "error");
      return;
    }

    const newStudent = { name, school, points: Number(points), mcqsSolved: Number(mcqsSolved), testsPassed: Number(testsPassed) };
    const updated = [...mockStudents, newStudent];
    LeaderboardService.saveMockStudents(updated);
    loadStudents();
    resetForm();
    showNotification("Mock student added successfully!");
  };

  const handleStartEdit = (index: number) => {
    setEditingStudentIndex(index);
    const s = mockStudents[index];
    setName(s.name);
    setSchool(s.school);
    setPoints(s.points);
    setMcqsSolved(s.mcqsSolved);
    setTestsPassed(s.testsPassed);
  };

  const handleUpdateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudentIndex === null) return;

    const updated = [...mockStudents];
    updated[editingStudentIndex] = {
      name,
      school,
      points: Number(points),
      mcqsSolved: Number(mcqsSolved),
      testsPassed: Number(testsPassed)
    };

    LeaderboardService.saveMockStudents(updated);
    loadStudents();
    resetForm();
    showNotification("Mock student updated successfully!");
  };

  const handleDeleteStudent = (index: number) => {
    const confirm = window.confirm("Are you sure you want to delete this mock student?");
    if (!confirm) return;

    const updated = mockStudents.filter((_, i) => i !== index);
    LeaderboardService.saveMockStudents(updated);
    loadStudents();
    showNotification("Student deleted.");
  };

  const handleResetLeaderboard = () => {
    const confirm = window.confirm("Reset mock leaderboard back to defaults?");
    if (!confirm) return;

    LeaderboardService.resetMockStudents();
    loadStudents();
    showNotification("Leaderboard mock values restored to standard Cotton/Jorhat defaults.");
  };

  const resetForm = () => {
    setEditingStudentIndex(null);
    setName("");
    setSchool("");
    setPoints(0);
    setMcqsSolved(0);
    setTestsPassed(0);
  };

  const handleResetProgress = () => {
    const confirm = window.confirm("CRITICAL ACTION: Reset all of your personal progress, XP, and badges?");
    if (!confirm) return;

    localStorage.removeItem(STORAGE_KEYS.STUDENT_PROFILE);
    localStorage.removeItem(STORAGE_KEYS.XP_LOG);
    localStorage.removeItem(STORAGE_KEYS.BADGE_COLLECTION);
    localStorage.removeItem(STORAGE_KEYS.STREAK_LOG);
    localStorage.removeItem(STORAGE_KEYS.COMPLETED_DAYS);
    localStorage.removeItem(STORAGE_KEYS.WATCHED_VIDEOS);
    localStorage.removeItem(STORAGE_KEYS.MCQ_STATS);
    localStorage.removeItem(STORAGE_KEYS.MCQ_ANSWERS);

    showNotification("Personal progress reset. Reload index/dashboard to onboard again.", "success");
    if (typeof window !== "undefined") {
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  const handleGenerateSampleData = () => {
    // Generate mock profile if not exists
    const mockProfile = {
      name: "Debashish Hazarika",
      avatar: "🎓",
      joinDate: new Date().toISOString(),
      hasOnboarded: true,
      school: "Cotton University",
      rollNumber: "EL-2026-981",
    };
    safeSet(STORAGE_KEYS.STUDENT_PROFILE, mockProfile);

    // Complete 22 days of notes to unlock certificate
    const completedDays: Record<string, boolean> = {};
    for (let d = 1; d <= 22; d++) {
      completedDays[`unit1-day${d <= 20 ? d : 20}`] = true;
      completedDays[`unit2-day${d - 20}`] = true;
    }
    safeSet(STORAGE_KEYS.COMPLETED_DAYS, completedDays);

    // Add some MCQ Stats
    const mcqStats = {
      unit1: { correct: 18, total: 20 },
      unit2: { correct: 12, total: 15 },
    };
    safeSet(STORAGE_KEYS.MCQ_STATS, mcqStats);

    // Generate XP log for Badge Unlocks
    const xpLog = [
      { action: "DAILY_LOGIN_STREAK", xp: 50, date: new Date().toISOString(), meta: "Day 1 Login" },
      { action: "COMPLETE_DAY_NOTE", xp: 220, date: new Date().toISOString(), meta: "22 Days completed" },
      { action: "MCQ_PERFECT_SCORE", xp: 150, date: new Date().toISOString(), meta: "18 correct MCQ answers" },
      { action: "TAKE_TIMED_TEST", xp: 100, date: new Date().toISOString(), meta: "Diagnostic test passed" }
    ];
    safeSet(STORAGE_KEYS.XP_LOG, xpLog);

    // Award initial badges
    const badges = {
      bronze_scholar: { unlockedAt: new Date().toISOString() },
      silver_scholar: { unlockedAt: new Date().toISOString() },
      gold_scholar: { unlockedAt: new Date().toISOString() },
      platinum_ranker: { unlockedAt: new Date().toISOString() },
    };
    safeSet(STORAGE_KEYS.BADGE_COLLECTION, badges);

    // Create 5 day streak
    const streakLog: Record<string, boolean> = {};
    const today = new Date();
    for (let i = 0; i < 5; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      streakLog[d.toISOString().split("T")[0]] = true;
    }
    safeSet(STORAGE_KEYS.STREAK_LOG, streakLog);

    showNotification("Generated high-performing student sample profile. Ready for presentation!");
    if (typeof window !== "undefined") {
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto max-w-5xl space-y-6">
        
        {/* Navigation & Title */}
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
          <span className="text-[10px] font-black uppercase tracking-wider text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-full flex items-center gap-1">
            <ShieldAlert className="h-3 w-3" />
            DEMO MODE ADMIN PANEL
          </span>
        </div>

        {/* Notifications */}
        {notification && (
          <div className={`p-4 rounded-xl shadow-lg border transition-all ${
            notification.type === "success" 
              ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400" 
              : "bg-rose-500/15 border-rose-500/30 text-rose-400"
          }`}>
            <p className="text-sm font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              {notification.text}
            </p>
          </div>
        )}

        {/* Header Block */}
        <div className="rounded-3xl border border-rose-500/20 bg-card p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-rose-500/5 blur-3xl" />
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold font-heading text-foreground">Academy Administrative Control Room</h1>
            <p className="text-xs text-muted-foreground max-w-xl">
              This panel enables quick setups, content generation, and mock user management. Use it to populate data when showcasing the platform to investors, administrators, or test panels.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Form Side */}
          <div className="md:col-span-1 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border pb-3">
                <UserPlus className="h-5 w-5 text-indigo-500" />
                <span>{editingStudentIndex !== null ? "Edit Mock Student" : "Add Mock Student"}</span>
              </h2>
              
              <form onSubmit={editingStudentIndex !== null ? handleUpdateStudent : handleAddStudent} className="space-y-3.5 text-sm">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">Student Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Bhaskar Jyoti"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">School / Institution</label>
                  <input
                    type="text"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="e.g. Cotton University"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-muted-foreground">Points</label>
                    <input
                      type="number"
                      value={points}
                      onChange={(e) => setPoints(Number(e.target.value))}
                      className="w-full rounded-xl border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-muted-foreground">MCQs</label>
                    <input
                      type="number"
                      value={mcqsSolved}
                      onChange={(e) => setMcqsSolved(Number(e.target.value))}
                      className="w-full rounded-xl border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-muted-foreground">Tests</label>
                    <input
                      type="number"
                      value={testsPassed}
                      onChange={(e) => setTestsPassed(Number(e.target.value))}
                      className="w-full rounded-xl border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 transition-colors text-xs"
                  >
                    {editingStudentIndex !== null ? "Save Changes" : "Create Student"}
                  </button>
                  {editingStudentIndex !== null && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-xl border border-border bg-background hover:bg-muted text-foreground px-3 text-xs"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Quick Demo Resets */}
            <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border pb-3">
                <Database className="h-5 w-5 text-rose-500" />
                <span>Demo Fast Presets</span>
              </h2>

              <button
                onClick={handleGenerateSampleData}
                className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-2.5 text-xs transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-600/10"
              >
                <Sparkles className="h-4 w-4" />
                <span>Generate Test Student Profile</span>
              </button>

              <button
                onClick={handleResetLeaderboard}
                className="w-full rounded-xl border border-border bg-background hover:bg-muted text-foreground font-semibold py-2.5 text-xs transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset Leaderboard Ranks</span>
              </button>

              <button
                onClick={handleResetProgress}
                className="w-full rounded-xl border border-rose-500/30 hover:bg-rose-500/5 text-rose-500 font-semibold py-2.5 text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>Reset Personal Progress</span>
              </button>
            </div>
          </div>

          {/* Leaderboard Table Side */}
          <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-base font-bold text-foreground flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <span>District Competitors List</span>
              </div>
              <span className="text-[10px] font-semibold text-muted-foreground">
                {mockStudents.length} entries stored
              </span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border/80 text-muted-foreground font-bold">
                    <th className="pb-2 font-bold">Name</th>
                    <th className="pb-2 font-bold">School</th>
                    <th className="pb-2 text-center font-bold">Points</th>
                    <th className="pb-2 text-center font-bold">MCQs</th>
                    <th className="pb-2 text-center font-bold">Tests</th>
                    <th className="pb-2 text-right font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {mockStudents.map((s, idx) => (
                    <tr key={idx} className="hover:bg-muted/30">
                      <td className="py-2.5 font-semibold text-foreground">{s.name}</td>
                      <td className="py-2.5 text-muted-foreground">{s.school}</td>
                      <td className="py-2.5 text-center font-semibold text-indigo-500">{s.points}</td>
                      <td className="py-2.5 text-center text-muted-foreground">{s.mcqsSolved}</td>
                      <td className="py-2.5 text-center text-muted-foreground">{s.testsPassed}</td>
                      <td className="py-2.5 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => handleStartEdit(idx)}
                          className="p-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-500 transition-colors inline-block"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(idx)}
                          className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition-colors inline-block"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {mockStudents.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-6 text-muted-foreground italic">
                        No competitors in database. Add some mock students or click &quot;Reset Leaderboard Ranks&quot;.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
