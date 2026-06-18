"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { GraduationCap, Mail, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);
    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to submit recovery dispatch.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-border bg-card p-8 shadow-sm">
        
        {/* Brand logo */}
        <div className="text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white mb-4 shadow-md">
            <GraduationCap className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-foreground">Recover Password</h2>
          <p className="text-sm text-muted-foreground mt-1.5">
            Enter your student email account to receive a reset verification code
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-2.5 rounded-xl bg-red-500/10 p-3.5 border border-red-500/20 text-red-500 text-xs font-semibold">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-4 text-center">
            <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-foreground">Reset Email Sent</p>
            <p className="text-xs text-muted-foreground mt-1">
              Please check your inbox folders for recovery link verification guidelines.
            </p>
            <Link href="/login" className="mt-4 inline-block text-xs font-bold text-indigo-500 hover:underline">
              Back to Login
            </Link>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleReset}>
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

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 py-2.5 text-sm font-bold text-white transition-colors"
            >
              {loading ? "Sending link..." : "Send Verification Link"}
            </button>
          </form>
        )}

        {!success && (
          <p className="text-center text-xs text-muted-foreground">
            Remember your password?{" "}
            <Link href="/login" className="text-indigo-500 hover:underline font-semibold">
              Sign In
            </Link>
          </p>
        )}

      </div>
    </div>
  );
}
