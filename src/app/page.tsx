"use client";

import Link from "next/link";
import { BookOpen, CheckSquare, FileText, Award, Star, ArrowRight, ShieldCheck, Zap, Video, Calendar } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t, language } = useLanguage();

  const stats = [
    { value: "7", label: t("unitsCount") },
    { value: "20 Days", label: t("daysCount") },
    { value: "500+", label: t("mcqsCount") },
    { value: "100%", label: t("boardCount") },
  ];

  return (
    <div className="flex flex-col gap-20 py-8 md:py-16 font-sans">
      
      {/* Academy Hero Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6 animate-fade-in">
        {/* Course badge with rating */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          <Award className="h-4 w-4" />
          <span>AHSEC Class 12 &bull; Ultimate Ranker Course</span>
          <span className="h-4 w-px bg-indigo-500/20" />
          <div className="flex items-center gap-0.5 text-amber-500">
            <Star className="h-3 w-3 fill-current" />
            <Star className="h-3 w-3 fill-current" />
            <Star className="h-3 w-3 fill-current" />
            <Star className="h-3 w-3 fill-current" />
            <Star className="h-3 w-3 fill-current" />
            <span className="text-[10px] text-muted-foreground ml-1">(4.9/5 Rating)</span>
          </div>
        </div>

        {/* Dynamic Headings */}
        <h1 className="font-heading text-4xl font-black tracking-tight sm:text-6xl text-foreground leading-[1.1]">
          {language === "en" ? "Master Class 12 Education Syllabus with" : "দ্বাদশ শ্ৰেণীৰ শিক্ষা বিষয়ৰ বাবে"} <br />
          <span className="gradient-text font-black">{t("platinumRanker")} Academy</span>
        </h1>
        
        {/* Description */}
        <p className="mx-auto max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
          {t("heroSubtitle")}
        </p>

        {/* Action Triggers */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-2">
          <Link
            href="/notes"
            className="flex items-center justify-center gap-2 w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-4 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all hover:scale-102"
          >
            <span>{t("startLearning")}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/mcq"
            className="flex items-center justify-center gap-2 w-full rounded-2xl border border-border bg-card hover:bg-muted text-foreground font-bold text-sm py-4 transition-all hover:scale-102"
          >
            <span>{t("practiceMCQ")}</span>
          </Link>
        </div>

        {/* Feature stats strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] uppercase font-bold text-muted-foreground pt-4">
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-indigo-500" /> Fully Public Access</span>
          <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-amber-500 fill-current" /> Offline Study Tracker</span>
          <span className="flex items-center gap-1.5"><Video className="h-4 w-4 text-emerald-500" /> Free Video lectures</span>
        </div>
      </section>

      {/* Success Statistics Grid */}
      <section className="mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 rounded-3xl border border-border bg-card p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 h-32 w-32 rounded-full bg-indigo-500/5 blur-3xl" />
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-1 relative z-10">
              <span className="font-heading block text-3xl font-black text-indigo-600 dark:text-indigo-400 sm:text-4xl">
                {stat.value}
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Course Hubs */}
      <section className="mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
            {t("studyHubs")}
          </h2>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
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
            title={t("videoClasses")}
            description="Premium video classes mapped with 20 day plans."
            icon={Video}
            href="/videos"
            colorClass="from-purple-600 to-pink-600"
          />
          <FeatureCard
            title={t("tests")}
            description={t("testsPapersDesc")}
            icon={FileText}
            href="/tests"
            colorClass="from-amber-500 to-orange-500"
          />
        </div>
      </section>

      {/* Why study with Julfy Section */}
      <section className="mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full">
              Why LearnWithJulfy
            </span>
            <h2 className="text-2xl font-bold font-heading text-foreground">
              Designed for Perfect Board preparation
            </h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed font-sans">
            Every day notes, MCQ banks, video sessions, and model papers are mapped with the AHSEC Class 12 secondary syllabus to optimize learning productivity. Get analytics diagnostics, weak topics warnings, and exam prep trackers.
          </p>
          <div className="space-y-3.5 font-sans">
            {[
              "📚 20 Day Chapter-by-Chapter Roadmaps",
              "🧠 Timed model exams simulating test hall rules",
              "📊 Learning Velocity analytics monitors progress",
              "🏆 Ranker Badges and local Streak maps",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-foreground bg-muted/30 p-2.5 rounded-xl border border-border">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Board Strategy Plan */}
        <div className="rounded-3xl border border-border bg-card p-6 md:p-8 space-y-6 relative overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-purple-500/5 blur-2xl" />
          <h3 className="text-base font-bold text-foreground flex items-center gap-1.5">
            <Calendar className="h-5 w-5 text-indigo-500" />
            <span>Board Exam Success Timeline</span>
          </h3>
          <div className="relative border-l-2 border-border pl-6 space-y-6 text-xs font-sans">
            <div className="relative">
              <span className="absolute -left-9 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] text-white">1</span>
              <p className="font-bold text-foreground">Day 1 - 20 syllabus roadmap</p>
              <p className="text-muted-foreground mt-0.5">Study standard definitions, комиссии summaries, and alternative learning channels.</p>
            </div>
            <div className="relative">
              <span className="absolute -left-9 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] text-white">2</span>
              <p className="font-bold text-foreground">MCQ banks & timed mock tests</p>
              <p className="text-muted-foreground mt-0.5">Drill 500+ interactive practice question keys to secure complete marks on short answers.</p>
            </div>
            <div className="relative">
              <span className="absolute -left-9 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] text-white">3</span>
              <p className="font-bold text-foreground">Board prediction simulation</p>
              <p className="text-muted-foreground mt-0.5">Attempt boardprediction papers and test booklets under active countdown exam widget rules.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Rankers / Testimonials Carousel snippet */}
      <section className="mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            Our Top Performers & Students
          </h2>
          <p className="text-xs text-muted-foreground">
            Hear from দ্বাদশ শ্ৰেণী scholars who used our daily roadmaps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          {[
            { name: "Jahnvi Bezbaruah", school: "Cotton University", quote: "The 20-day roadmap broke down the Mudaliar and Kothari commissions into bite-sized segments. The mock tests were exactly board standard!", rating: 5 },
            { name: "Pranjal Saikia", school: "Jorhat Govt Boys School", quote: "Having bilingual Assamese definitions side-by-side helped me write perfect board exam answers. Increased my preparation confidence.", rating: 5 },
            { name: "Ananya Kalita", school: "Salt Brook Academy", quote: "No login requirement made it so easy to practice MCQs on mobile during my commute. The analytics dashboard is an amazing feature.", rating: 5 }
          ].map((item, idx) => (
            <div key={idx} className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex text-amber-500 gap-0.5">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed italic">
                &quot;{item.quote}&quot;
              </p>
              <div className="pt-2 border-t border-border/60">
                <p className="text-xs font-bold text-foreground">{item.name}</p>
                <p className="text-[10px] text-muted-foreground">{item.school}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
