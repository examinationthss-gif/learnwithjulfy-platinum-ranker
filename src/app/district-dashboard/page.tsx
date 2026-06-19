"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, School, Users, Percent, TrendingUp, Award, Activity } from "lucide-react";
import { DistrictAnalyticsService, DistrictStats, UnitCompletionRate, WeeklyGrowthData, SchoolRank } from "@/lib/services/districtAnalyticsService";

export default function DistrictDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<DistrictStats | null>(null);
  const [unitRates, setUnitRates] = useState<UnitCompletionRate[]>([]);
  const [growthData, setGrowthData] = useState<WeeklyGrowthData[]>([]);
  const [schoolRanks, setSchoolRanks] = useState<SchoolRank[]>([]);

  useEffect(() => {
    setMounted(true);
    setStats(DistrictAnalyticsService.getOverviewStats());
    setUnitRates(DistrictAnalyticsService.getUnitCompletionRates());
    setGrowthData(DistrictAnalyticsService.getWeeklyGrowth());
    setSchoolRanks(DistrictAnalyticsService.getSchoolLeaderboard());
  }, []);

  if (!mounted || !stats) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <p className="text-sm font-medium animate-pulse">Loading District Insights...</p>
      </div>
    );
  }

  // Calculate SVG line chart coordinates for weekly growth
  // 5 data points: 420, 580, 690, 810, 945
  // Width: 500, Height: 200. Padding: 30
  const chartWidth = 500;
  const chartHeight = 180;
  const padding = 20;
  const maxVal = 1000;
  const minVal = 300;

  const points = growthData.map((d, i) => {
    const x = padding + (i * (chartWidth - padding * 2)) / (growthData.length - 1);
    const y = chartHeight - padding - ((d.activeStudents - minVal) * (chartHeight - padding * 2)) / (maxVal - minVal);
    return { x, y, value: d.activeStudents, label: d.week };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`;

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto max-w-6xl space-y-6">
        
        {/* Navigation & Title */}
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to My Dashboard</span>
          </Link>
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Activity className="h-3 w-3 animate-pulse" />
            LIVE AHSEC ANALYTICS
          </span>
        </div>

        {/* Header Hero Area */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-indigo-500/5 blur-3xl" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold font-heading text-foreground">District Performance Center</h1>
              <p className="text-xs text-muted-foreground max-w-md">
                Tracking academic participation, school rankings, and syllabus coverage rates across secondary institutions.
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <span className="text-xs bg-muted border border-border px-3 py-1.5 rounded-xl font-bold text-foreground">
                📍 Kamrup (Metro) District
              </span>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Registered Students", value: stats.totalStudents.toLocaleString(), sub: "+18% this month", icon: Users, color: "text-blue-500 bg-blue-500/5 border-blue-500/10" },
            { label: "Participating Schools", value: stats.totalSchools, sub: "High-tier AHSEC colleges", icon: School, color: "text-purple-500 bg-purple-500/5 border-purple-500/10" },
            { label: "Weekly Active Learners", value: stats.activeLearners.toLocaleString(), sub: "63% active participation", icon: Activity, color: "text-emerald-500 bg-emerald-500/5 border-emerald-500/10" },
            { label: "District MCQ Accuracy", value: `${stats.averageTestScore}%`, sub: "Board standards average", icon: Percent, color: "text-amber-500 bg-amber-500/5 border-amber-500/10" },
          ].map((card, idx) => (
            <div key={idx} className="rounded-2xl border border-border bg-card p-4 space-y-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{card.label}</p>
                <div className={`h-8 w-8 rounded-xl flex items-center justify-center border ${card.color}`}>
                  <card.icon className="h-4 w-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-black text-foreground">{card.value}</p>
                <p className="text-[9px] text-muted-foreground font-semibold">{card.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Charts (Left Column) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Custom SVG Line Chart */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-indigo-500" />
                  <span>Weekly Learner Growth (District Wide)</span>
                </h2>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/5 px-2 py-0.5 rounded-full">
                  +125% Growth
                </span>
              </div>
              
              <div className="w-full overflow-hidden flex justify-center">
                <svg className="w-full max-w-[500px]" viewBox={`0 0 ${chartWidth} ${chartHeight}`} fill="none">
                  {/* Grid Lines */}
                  {[0, 1, 2, 3].map((val) => {
                    const y = padding + (val * (chartHeight - padding * 2)) / 3;
                    return (
                      <line key={val} x1={padding} y1={y} x2={chartWidth - padding} y2={y} stroke="currentColor" strokeOpacity={0.06} strokeWidth={1} />
                    );
                  })}
                  {/* Area fill */}
                  <path d={areaPath} fill="url(#chart-gradient)" opacity={0.15} />
                  {/* Line path */}
                  <path d={linePath} stroke="url(#line-gradient)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                  
                  {/* Gradient Definitions */}
                  <defs>
                    <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>

                  {/* Draw Dots and Labels */}
                  {points.map((p, idx) => (
                    <g key={idx}>
                      <circle cx={p.x} cy={p.y} r={4} fill="#6366f1" stroke="var(--background)" strokeWidth={1.5} />
                      <text x={p.x} y={p.y - 8} textAnchor="middle" fill="currentColor" className="text-[9px] font-bold text-foreground">
                        {p.value}
                      </text>
                      <text x={p.x} y={chartHeight - 4} textAnchor="middle" fill="currentColor" className="text-[9px] text-muted-foreground font-semibold">
                        {p.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* Syllabus progress rates */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <h2 className="text-base font-bold text-foreground">Syllabus Completion Rates (Unit-wise)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {unitRates.map((unit) => (
                  <div key={unit.unitId} className="space-y-1 text-xs">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-foreground truncate max-w-[200px]">{unit.label}: {unit.name}</span>
                      <span className="text-muted-foreground">{unit.ratePercent}%</span>
                    </div>
                    <div className="bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${unit.color}`}
                        style={{ width: `${unit.ratePercent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Leaders & School Standings (Right Column) */}
          <div className="space-y-6">
            
            {/* Top performing entities */}
            <div className="rounded-2xl border border-border bg-card p-5 space-y-3.5">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border pb-3">
                <Award className="h-5 w-5 text-yellow-500" />
                <span>Kamrup Top Performers</span>
              </h2>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/30 border border-border">
                  <div className="h-10 w-10 rounded-xl bg-yellow-400/10 flex items-center justify-center text-xl shrink-0">
                    🏆
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Top Performing School</p>
                    <p className="text-xs font-black text-foreground truncate">{stats.topPerformingSchool}</p>
                    <span className="text-[9px] font-semibold text-indigo-500">Average Score: {stats.topPerformingSchoolScore}%</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/30 border border-border">
                  <div className="h-10 w-10 rounded-xl bg-yellow-400/10 flex items-center justify-center text-xl shrink-0">
                    ⭐
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Top Ranker Student</p>
                    <p className="text-xs font-black text-foreground truncate">{stats.topPerformingStudent}</p>
                    <span className="text-[9px] font-semibold text-purple-500">Overall Points: {stats.topPerformingStudentScore} pts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* School Leaderboard */}
            <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border pb-3">
                <School className="h-5 w-5 text-indigo-500" />
                <span>AHSEC School Leaderboard</span>
              </h2>

              <div className="space-y-3">
                {schoolRanks.map((school) => (
                  <div key={school.rank} className="flex items-center gap-3 text-xs">
                    <div className="h-6 w-6 rounded bg-muted flex items-center justify-center font-bold text-foreground text-[10px] shrink-0">
                      #{school.rank}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-foreground truncate">{school.name}</p>
                      <div className="flex gap-2 text-[9px] text-muted-foreground font-semibold">
                        <span>{school.studentCount} active students</span>
                        <span>•</span>
                        <span>{school.completionRate}% completion rate</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-black text-indigo-500">{school.averagePoints}</p>
                      <p className="text-[8px] text-muted-foreground uppercase font-bold">avg. pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
