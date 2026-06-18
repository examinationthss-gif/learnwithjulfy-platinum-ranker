"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { GraduationCap, Mail, Lock, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { loginGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to sign in. Please verify your credentials.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-border bg-card p-8 shadow-sm">
        
        {/* Brand Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white mb-4 shadow-md">
            <GraduationCap className="h-7 w-7" />
          </Link>
          <h2 className="text-2xl font-bold font-heading text-foreground">Sign In to LearnWithJulfy</h2>
          <p className="text-sm text-muted-foreground mt-1.5">
            Access your cloud progress, XP points, and achievement badges
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-2.5 rounded-xl bg-red-500/10 p-3.5 border border-red-500/20 text-red-500 text-xs font-semibold">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleEmailLogin}>
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-transparent py-2.5 pl-10 pr-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="student@example.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-muted-foreground uppercase">Password</label>
              <Link href="/reset-password" className="text-xs text-indigo-500 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border bg-transparent py-2.5 pl-10 pr-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 py-2.5 text-sm font-bold text-white transition-colors"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-3 text-muted-foreground">Or continue with</span></div>
        </div>

        <button
          onClick={loginGoogle}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/40 py-2.5 text-sm font-semibold text-foreground hover:bg-muted/70 transition-colors"
        >
          <span>🌐</span>
          <span>Google Sign In</span>
        </button>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-indigo-500 hover:underline font-semibold">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}
