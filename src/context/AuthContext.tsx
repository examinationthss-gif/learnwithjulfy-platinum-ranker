"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { safeGet, safeSet, STORAGE_KEYS, StudentProfile, XPEntry } from "@/lib/localStorage";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  syncLocalToCloud: () => Promise<void>;
  syncCloudToLocal: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Monitor auth state changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loginGoogle = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
      },
    });
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: typeof window !== "undefined" ? `${window.location.origin}/reset-password` : undefined,
    });
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  // Sync current client localStorage data up to Supabase Cloud Database (simulated or safe SQL integrations)
  const syncLocalToCloud = useCallback(async () => {
    if (!user) return;
    try {
      const profile = safeGet<StudentProfile | null>(STORAGE_KEYS.STUDENT_PROFILE, null);
      const xpLog = safeGet<XPEntry[]>(STORAGE_KEYS.XP_LOG, []);
      const completedDays = safeGet<Record<string, boolean>>(STORAGE_KEYS.COMPLETED_DAYS, {});
      const watchedVideos = safeGet<Record<string, boolean>>(STORAGE_KEYS.WATCHED_VIDEOS, {});
      const mcqStats = safeGet<Record<string, { correct: number; total: number }>>(STORAGE_KEYS.MCQ_STATS, {});
      const badges = safeGet<Record<string, { unlockedAt: string }>>(STORAGE_KEYS.BADGE_COLLECTION, {});

      // Upsert profile data
      if (profile) {
        await supabase.from("profiles").upsert({
          id: user.id,
          name: profile.name,
          avatar: profile.avatar,
          updated_at: new Date().toISOString(),
        });
      }

      // Upsert progress metrics
      await supabase.from("student_stats").upsert({
        id: user.id,
        xp_log: xpLog,
        completed_days: completedDays,
        watched_videos: watchedVideos,
        mcq_stats: mcqStats,
        badge_collection: badges,
        updated_at: new Date().toISOString(),
      });

      console.log("[Cloud Sync]: Local progress synced successfully up to Supabase.");
    } catch (err) {
      console.warn("[Cloud Sync Error]: Failed to upload offline content to Supabase database.", err);
    }
  }, [user]);

  // Pull missing cloud records back down to localStorage
  const syncCloudToLocal = useCallback(async () => {
    if (!user) return;
    try {
      const { data: statsData } = await supabase
        .from("student_stats")
        .select("*")
        .eq("id", user.id)
        .single();

      if (statsData) {
        if (statsData.xp_log) safeSet(STORAGE_KEYS.XP_LOG, statsData.xp_log);
        if (statsData.completed_days) safeSet(STORAGE_KEYS.COMPLETED_DAYS, statsData.completed_days);
        if (statsData.watched_videos) safeSet(STORAGE_KEYS.WATCHED_VIDEOS, statsData.watched_videos);
        if (statsData.mcq_stats) safeSet(STORAGE_KEYS.MCQ_STATS, statsData.mcq_stats);
        if (statsData.badge_collection) safeSet(STORAGE_KEYS.BADGE_COLLECTION, statsData.badge_collection);
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileData) {
        safeSet(STORAGE_KEYS.STUDENT_PROFILE, {
          name: profileData.name,
          avatar: profileData.avatar,
          joinDate: profileData.created_at || new Date().toISOString(),
          hasOnboarded: true,
        });
      }

      console.log("[Cloud Sync]: Pull sync from Supabase completed successfully.");
    } catch (err) {
      console.warn("[Cloud Sync Error]: Failed to fetch records from Supabase database.", err);
    }
  }, [user]);

  // Sync on active user changes
  useEffect(() => {
    if (user) {
      syncCloudToLocal().then(() => {
        syncLocalToCloud();
      });
    }
  }, [user, syncCloudToLocal, syncLocalToCloud]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginGoogle,
        resetPassword,
        signOut,
        syncLocalToCloud,
        syncCloudToLocal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
