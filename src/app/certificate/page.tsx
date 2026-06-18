"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useStudent } from "@/context/StudentContext";
import { getLevelTitle } from "@/lib/xpEngine";
import { ArrowLeft, Download } from "lucide-react";

export default function CertificatePage() {
  const { profile, totalXP, level, completedDaysCount, unlockedBadges } = useStudent();
  const [mounted, setMounted] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !profile) return null;

  const isFullCourse = completedDaysCount >= 140;
  const completedUnits = Math.floor(completedDaysCount / 20);
  const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  const handlePrint = () => {
    window.print();
  };

  if (completedDaysCount < 20) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-2xl font-bold font-heading text-foreground mb-3">
            Certificate Not Yet Available
          </h1>
          <p className="text-muted-foreground mb-6">
            Complete at least 20 days of notes (1 full unit) to unlock your first certificate!
            You&apos;ve completed {completedDaysCount} out of 20 days so far.
          </p>
          <div className="h-3 rounded-full bg-muted mb-4 overflow-hidden">
            <div
              className="h-full rounded-full bg-indigo-500 transition-all"
              style={{ width: `${Math.min((completedDaysCount / 20) * 100, 100)}%` }}
            />
          </div>
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-6 py-2.5 transition-colors"
          >
            Start Studying →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Controls — hidden on print */}
      <div className="print:hidden border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              id="print-certificate-btn"
              className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-2.5 transition-colors shadow-lg shadow-indigo-500/20"
            >
              <Download className="h-4 w-4" />
              Download / Print
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 print:px-0 print:py-0 print:max-w-none">
        {/* Certificate */}
        <div
          ref={certRef}
          className="relative bg-white dark:bg-gray-950 rounded-3xl print:rounded-none overflow-hidden shadow-2xl"
          style={{ aspectRatio: "1.41/1", minHeight: "600px" }}
        >
          {/* Decorative border */}
          <div className="absolute inset-3 rounded-2xl border-4 border-double border-amber-400/60 print:rounded-none" />
          <div className="absolute inset-5 rounded-xl border border-amber-300/30 print:rounded-none" />

          {/* Background patterns */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-indigo-600/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-600/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative flex flex-col items-center justify-center h-full px-12 py-10 text-center">
            {/* Logo & Org */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white text-xl shadow-lg">
                🎓
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-indigo-700 dark:text-indigo-400 font-heading">LearnWithJulfy</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-600">Platinum Ranker Series</p>
              </div>
            </div>

            {/* Certificate title */}
            <div className="mb-2">
              <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 rounded-full px-4 py-1 mb-4">
                <span className="text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest">
                  Certificate of {isFullCourse ? "Completion" : "Achievement"}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">This is to certify that</p>

            {/* Student name */}
            <div className="relative mb-2">
              <h2
                className="text-4xl sm:text-5xl font-bold font-heading text-gray-900 dark:text-white"
                style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}
              >
                {profile.avatar} {profile.name}
              </h2>
              <div className="mt-2 h-0.5 w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              has successfully {isFullCourse ? "completed" : "demonstrated progress in"}
            </p>

            {/* Course name */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl px-8 py-4 mb-4 shadow-lg shadow-indigo-500/20">
              <h3 className="text-xl font-bold font-heading">AHSEC Class 12 — Education</h3>
              <p className="text-sm text-white/80 mt-1">
                {isFullCourse
                  ? "All 7 Units • 140 Lessons • Complete Course"
                  : `${completedUnits} Unit${completedUnits > 1 ? "s" : ""} • ${completedDaysCount} Lessons`}
              </p>
            </div>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-6 mb-6 text-sm">
              <div className="text-center">
                <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{completedDaysCount}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Days Completed</p>
              </div>
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
              <div className="text-center">
                <p className="text-xl font-bold text-amber-600">{totalXP.toLocaleString()}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">XP Earned</p>
              </div>
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
              <div className="text-center">
                <p className="text-xl font-bold text-purple-600 dark:text-purple-400">Lv.{level}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{getLevelTitle(level)}</p>
              </div>
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
              <div className="text-center">
                <p className="text-xl font-bold text-emerald-600">{unlockedBadges.length}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Badges Earned</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between w-full mt-2">
              <div className="text-left">
                <p className="text-xs text-gray-400">Date of Issue</p>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{today}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-1">🏆</div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Verified Achievement</p>
              </div>
              <div className="text-right">
                <div className="w-24 h-px bg-gray-400 mb-1 ml-auto" />
                <p className="text-xs text-gray-400">Julfy</p>
                <p className="text-[10px] text-gray-400">LearnWithJulfy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Share text (below cert, hidden on print) */}
        <div className="print:hidden mt-6 text-center text-sm text-muted-foreground">
          Use your browser&apos;s <strong>Print to PDF</strong> feature to save this certificate.
          <br />
          <Link href="/dashboard" className="text-indigo-500 hover:underline mt-2 inline-block">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
