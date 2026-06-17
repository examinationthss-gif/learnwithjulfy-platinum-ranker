"use client";

import Link from "next/link";
import { BookOpen, CheckSquare, FileText, Calendar, Award, Star, ArrowRight } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  const stats = [
    { value: "7", label: t("unitsCount") },
    { value: "20 Days", label: t("daysCount") },
    { value: "500+", label: t("mcqsCount") },
    { value: "100%", label: t("boardCount") },
  ];

  return (
    <div className="flex flex-col gap-16 py-8 md:py-16">
      
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          <Award className="h-3.5 w-3.5" />
          <span>AHSEC Class 12 {t("education")} Special Edition</span>
        </div>

        {/* Heading */}
        <h1 className="font-heading mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground">
          {t("heroTitle")} <br />
          <span className="gradient-text">{t("platinumRanker")} Hub</span>
        </h1>
        
        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
          {t("heroSubtitle")}
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/notes"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors w-full sm:w-auto justify-center"
          >
            {t("startLearning")}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/mcq"
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors w-full sm:w-auto justify-center"
          >
            {t("practiceMCQ")}
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <span className="font-heading block text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 sm:text-4xl">
                {stat.value}
              </span>
              <span className="mt-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Hub Cards */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center md:text-left space-y-2">
          <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
            {t("studyHubs")}
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg">
            {t("studyHubsDesc")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            title={t("chapterNotes")}
            description={t("chapterNotesDesc")}
            icon={BookOpen}
            href="/notes"
            colorClass="from-indigo-600 to-violet-600"
          />
          <FeatureCard
            title={t("mcqBankTitle")}
            description={t("mcqBankDesc")}
            icon={CheckSquare}
            href="/mcq"
            colorClass="from-emerald-500 to-teal-500"
          />
          <FeatureCard
            title={t("testsPapers")}
            description={t("testsPapersDesc")}
            icon={FileText}
            href="/tests"
            colorClass="from-amber-500 to-orange-500"
          />
          <FeatureCard
            title={t("revisionProgram")}
            description={t("revisionProgramDesc")}
            icon={Calendar}
            href="/notes"
            colorClass="from-rose-500 to-pink-500"
          />
        </div>
      </section>

      {/* Author Showcase / Banner */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-8 md:p-12 shadow-lg">
          {/* Subtle graphic decorations */}
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute left-1/3 bottom-0 h-48 w-48 rounded-full bg-indigo-500/10 blur-2xl" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-indigo-200">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span>Curated by Top AHSEC Educator</span>
              </div>
              <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
                Learn with Julfy
              </h2>
              <p className="text-sm md:text-base text-indigo-150 leading-relaxed text-indigo-100">
                &ldquo;Education is not preparation for life; education is life itself.&rdquo; Join the Platinum Ranker journey, access exclusive study methods, and score a letter mark in Class 12 Education.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <Link
                href="/about"
                className="rounded-xl bg-white text-indigo-950 px-6 py-3.5 text-sm font-bold shadow-md hover:bg-indigo-50 transition-colors w-full sm:w-auto text-center"
              >
                Meet the Author
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
