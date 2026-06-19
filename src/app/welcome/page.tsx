"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStudent } from "@/context/StudentContext";
import { GraduationCap, ArrowRight, Sparkles } from "lucide-react";

const AVATARS = [
  { emoji: "🎓", label: "Graduate" },
  { emoji: "📚", label: "Scholar" },
  { emoji: "🏆", label: "Champion" },
  { emoji: "🌟", label: "Star" },
  { emoji: "💡", label: "Thinker" },
  { emoji: "⚡", label: "Swift" },
  { emoji: "🔥", label: "Fired Up" },
  { emoji: "🎯", label: "Focused" },
  { emoji: "💎", label: "Diamond" },
  { emoji: "🦁", label: "Brave" },
];

export default function WelcomePage() {
  const router = useRouter();
  const { profile, createProfile } = useStudent();
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("🎓");
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<"name" | "avatar">("name");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && profile?.hasOnboarded) {
      router.replace("/dashboard");
    }
  }, [mounted, profile, router]);

  const handleContinue = () => {
    if (name.trim().length < 2) return;
    setStep("avatar");
  };

  const handleStart = () => {
    if (!name.trim()) return;
    setLoading(true);
    createProfile(name.trim(), selectedAvatar);
    setTimeout(() => router.push("/dashboard"), 600);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Animated background blobs */}
      <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-3/4 left-1/3 h-64 w-64 rounded-full bg-pink-600/15 blur-3xl animate-pulse-slow" style={{ animationDelay: "0.7s" }} />

      <div className="relative z-10 w-full max-w-lg mx-auto px-6">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10 animate-slide-up">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-2xl shadow-indigo-500/30 mb-4">
            <GraduationCap className="h-9 w-9" />
          </div>
          <h1 className="text-2xl font-bold font-heading text-foreground">LearnWithJulfy</h1>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
            Platinum Ranker
          </p>
        </div>

        {/* Card */}
        <div className="glass-panel rounded-3xl p-8 shadow-2xl animate-fade-in">
          {step === "name" && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl mb-3">👋</div>
                <h2 className="text-2xl font-bold font-heading text-foreground mb-2">
                  Welcome, Future Topper!
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Create your student profile to track your progress, earn XP, unlock badges, and get your personalized dashboard.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground" htmlFor="student-name">
                  What should we call you?
                </label>
                <input
                  id="student-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                  placeholder="Enter your name..."
                  maxLength={30}
                  className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm font-medium"
                  autoFocus
                />
              </div>

              {/* Feature Teasers */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "⚡", text: "XP & Levels" },
                  { icon: "🏅", text: "12 Badges" },
                  { icon: "🔥", text: "Study Streaks" },
                  { icon: "🎓", text: "Certificate" },
                ].map((f) => (
                  <div key={f.text} className="flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2">
                    <span className="text-lg">{f.icon}</span>
                    <span className="text-xs font-medium text-foreground">{f.text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleContinue}
                disabled={name.trim().length < 2}
                id="welcome-continue-btn"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {step === "avatar" && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-5xl mb-3">{selectedAvatar}</div>
                <h2 className="text-xl font-bold font-heading text-foreground mb-2">
                  Hi, {name}! Choose your avatar
                </h2>
                <p className="text-sm text-muted-foreground">
                  Pick the one that matches your energy!
                </p>
              </div>

              <div className="grid grid-cols-5 gap-3">
                {AVATARS.map((a) => (
                  <button
                    key={a.emoji}
                    onClick={() => setSelectedAvatar(a.emoji)}
                    title={a.label}
                    className={`h-12 w-full rounded-xl text-2xl flex items-center justify-center border-2 transition-all hover:scale-110 ${
                      selectedAvatar === a.emoji
                        ? "border-indigo-500 bg-indigo-500/10 scale-110 shadow-lg shadow-indigo-500/20"
                        : "border-border bg-muted/50 hover:border-indigo-400/50"
                    }`}
                  >
                    {a.emoji}
                  </button>
                ))}
              </div>

              <button
                onClick={handleStart}
                disabled={loading}
                id="welcome-start-btn"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all hover:scale-[1.02] disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Setting up your profile...
                  </span>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Start My Journey!
                  </>
                )}
              </button>

              <button
                onClick={() => setStep("name")}
                className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Change name
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Your profile is stored locally. No account or password needed. 🔒
        </p>
      </div>
    </div>
  );
}
