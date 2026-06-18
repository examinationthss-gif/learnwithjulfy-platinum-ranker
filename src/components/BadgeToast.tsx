"use client";

import { useEffect, useState } from "react";
import { useStudent } from "@/context/StudentContext";
import { getRarityColor } from "@/lib/badgeEngine";

export default function BadgeToast() {
  const { recentlyEarnedBadge, dismissBadgeToast } = useStudent();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (recentlyEarnedBadge) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(dismissBadgeToast, 400);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [recentlyEarnedBadge, dismissBadgeToast]);

  if (!mounted || !recentlyEarnedBadge) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-[9999] transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95"
      }`}
    >
      <div className="relative flex items-center gap-4 rounded-2xl bg-card border border-border shadow-2xl px-5 py-4 max-w-sm overflow-hidden">
        {/* Animated background shimmer */}
        <div className={`absolute inset-0 bg-gradient-to-r ${getRarityColor(recentlyEarnedBadge.rarity)} opacity-10 rounded-2xl`} />
        
        {/* Badge Icon */}
        <div className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${getRarityColor(recentlyEarnedBadge.rarity)} text-2xl shadow-lg`}>
          {recentlyEarnedBadge.icon}
        </div>

        {/* Content */}
        <div className="relative flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-0.5">
            🏅 Badge Unlocked!
          </p>
          <p className="text-sm font-bold text-foreground truncate">
            {recentlyEarnedBadge.nameEn}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {recentlyEarnedBadge.descriptionEn}
          </p>
        </div>

        {/* Close */}
        <button
          onClick={() => { setVisible(false); setTimeout(dismissBadgeToast, 400); }}
          className="relative text-muted-foreground hover:text-foreground transition-colors ml-2"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
