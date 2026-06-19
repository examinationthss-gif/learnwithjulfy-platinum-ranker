"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Sparkles, Monitor, Laptop, Palette, Layout, Smartphone } from "lucide-react";
import { useAppearance, THEMES } from "@/context/AppearanceContext";

export default function SettingsPage() {
  const { activeTheme, setTheme } = useAppearance();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <p className="text-sm font-medium animate-pulse font-sans">Loading Settings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Navigation header */}
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Header Title */}
        <div className="space-y-2">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground flex items-center gap-3">
            <Palette className="h-8 w-8 text-indigo-500" />
            Appearance Settings
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Personalize your LearnWithJulfy platform. Choose from 5 premium, handcrafted themes designed to enhance your study sessions. Theme switching is instant and persisted globally.
          </p>
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {THEMES.map((theme) => {
            const isSelected = activeTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => setTheme(theme.id)}
                className={`text-left rounded-3xl border-2 overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? "border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)] bg-card"
                    : "border-border hover:border-indigo-500/50 bg-card/60"
                }`}
              >
                {/* Visual Preview Header */}
                <div className={`h-36 w-full ${theme.previewBg} p-4 flex flex-col justify-between relative`}>
                  {/* Theme Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-white/10 dark:bg-black/20 text-white border border-white/15 px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {theme.name}
                    </span>
                    {isSelected && (
                      <div className="h-7 w-7 bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-lg border border-white/20">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  {/* Mock Card Preview */}
                  <div className={`p-3 rounded-xl ${theme.previewCardBg} border border-white/10 flex items-center justify-between`}>
                    <div className="space-y-1">
                      <div className="h-2 w-20 bg-white/40 rounded"></div>
                      <div className="h-1.5 w-12 bg-white/25 rounded"></div>
                    </div>
                    <div className="h-4 w-4 rounded bg-white/30"></div>
                  </div>
                </div>

                {/* Theme Description */}
                <div className="p-5 space-y-2 flex-grow flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-foreground">{theme.name}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {theme.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-3">
                    {theme.id === "classic" && <Laptop className="h-4 w-4 text-slate-500" />}
                    {theme.id === "amoled" && <Monitor className="h-4 w-4 text-purple-500" />}
                    {theme.id === "macos" && <Sparkles className="h-4 w-4 text-blue-500" />}
                    {theme.id === "oneui" && <Smartphone className="h-4 w-4 text-indigo-500" />}
                    {theme.id === "gamer" && <Layout className="h-4 w-4 text-fuchsia-500" />}
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {theme.id === "classic" ? "Default theme" : "Premium UI Pack"}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Technical Audit / Information section */}
        <div className="bg-slate-950/5 border border-border/80 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-foreground">Theme Engine Audit Metrics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-muted-foreground">
            <div className="bg-card p-3 rounded-2xl border border-border">
              <p className="text-[10px] uppercase font-bold text-slate-400">Persistence</p>
              <p className="text-sm font-bold text-foreground mt-1">✅ LocalStorage Enabled</p>
            </div>
            <div className="bg-card p-3 rounded-2xl border border-border">
              <p className="text-[10px] uppercase font-bold text-slate-400">Transition Latency</p>
              <p className="text-sm font-bold text-foreground mt-1">⚡ Instantaneous (0ms)</p>
            </div>
            <div className="bg-card p-3 rounded-2xl border border-border">
              <p className="text-[10px] uppercase font-bold text-slate-400">Memory footprint</p>
              <p className="text-sm font-bold text-foreground mt-1">🍀 Non-Reactive DOM Class</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
