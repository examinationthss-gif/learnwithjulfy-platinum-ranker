"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeType = "classic" | "amoled" | "macos" | "oneui" | "gamer";

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  description: string;
  previewBg: string;
  previewCardBg: string;
  accentColor: string;
}

export const THEMES: ThemeConfig[] = [
  {
    id: "classic",
    name: "Julfy Classic",
    description: "The original premium LearnWithJulfy theme with standard class presets.",
    previewBg: "bg-slate-900",
    previewCardBg: "bg-slate-800/80",
    accentColor: "#6366f1",
  },
  {
    id: "amoled",
    name: "AMOLED Black",
    description: "Pure, deep black backdrop optimized for OLED displays with soft purple accents.",
    previewBg: "bg-black",
    previewCardBg: "bg-zinc-950",
    accentColor: "#a855f7",
  },
  {
    id: "macos",
    name: "macOS Glass",
    description: "Elegant frosted glass cards, deep blurs, and Apple-inspired sleek aesthetics.",
    previewBg: "bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950",
    previewCardBg: "bg-white/10 backdrop-blur-2xl",
    accentColor: "#3b82f6",
  },
  {
    id: "oneui",
    name: "Samsung One UI",
    description: "Rounded corners, comfortable spacing, and mobile-friendly visual ergonomics.",
    previewBg: "bg-gray-100 dark:bg-slate-950",
    previewCardBg: "bg-white dark:bg-slate-900 rounded-[28px]",
    accentColor: "#4f46e5",
  },
  {
    id: "gamer",
    name: "Gamer Neon",
    description: "Electrifying neon glowing borders, purple highlights, and XP progression layouts.",
    previewBg: "bg-[#050209]",
    previewCardBg: "bg-[#0f071b] border-fuchsia-500/40 shadow-[0_0_15px_rgba(240,70,250,0.25)]",
    accentColor: "#d946ef",
  },
];

interface AppearanceContextType {
  activeTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const AppearanceContext = createContext<AppearanceContextType | undefined>(undefined);

export function AppearanceProvider({ children }: { children: React.ReactNode }) {
  const [activeTheme, setActiveThemeState] = useState<ThemeType>("classic");

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("julfy-theme") as ThemeType;
    if (savedTheme && THEMES.some(t => t.id === savedTheme)) {
      setActiveThemeState(savedTheme);
      applyThemeClass(savedTheme);
    }
  }, []);

  const setTheme = (theme: ThemeType) => {
    setActiveThemeState(theme);
    localStorage.setItem("julfy-theme", theme);
    applyThemeClass(theme);
  };

  const applyThemeClass = (theme: ThemeType) => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    
    // Remove all custom theme classes
    THEMES.forEach(t => {
      root.classList.remove(`theme-${t.id}`);
    });
    
    // Add current theme class
    root.classList.add(`theme-${theme}`);
  };

  return (
    <AppearanceContext.Provider value={{ activeTheme, setTheme }}>
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance() {
  const context = useContext(AppearanceContext);
  if (!context) {
    throw new Error("useAppearance must be used within an AppearanceProvider");
  }
  return context;
}
