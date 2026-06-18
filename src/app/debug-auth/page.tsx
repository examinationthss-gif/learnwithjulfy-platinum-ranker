"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GraduationCap, ShieldAlert, CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function DebugAuthPage() {
  const [urlConfigured, setUrlConfigured] = useState<boolean | null>(null);
  const [keyConfigured, setKeyConfigured] = useState<boolean | null>(null);
  const [supabaseUrlVal, setSupabaseUrlVal] = useState<string>("");
  const [connectionStatus, setConnectionStatus] = useState<string>("Testing...");
  const [connectionSuccess, setConnectionSuccess] = useState<boolean | null>(null);
  const [authStatus, setAuthStatus] = useState<string>("Checking auth state...");

  useEffect(() => {
    // 1. Detect configuration variables presence
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const hasUrl = !!url && url !== "https://placeholder-url.supabase.co";
    const hasKey = !!key && key !== "placeholder-anon-key";

    setUrlConfigured(hasUrl);
    setKeyConfigured(hasKey);
    setSupabaseUrlVal(url || "Not configured");

    // 2. Perform connection ping
    const testConnection = async () => {
      try {
        const start = Date.now();
        // Simple select to a metadata table or dynamic ping
        const { error } = await supabase.auth.getSession();
        
        if (error) {
          setConnectionStatus(`Connected with warning: ${error.message} (${Date.now() - start}ms)`);
          setConnectionSuccess(false);
        } else {
          setConnectionStatus(`Connected successfully! Ping latency: ${Date.now() - start}ms`);
          setConnectionSuccess(true);
        }
      } catch (err) {
        const errorObj = err as Error;
        setConnectionStatus(`Failed to connect: ${errorObj?.message || "Unknown Network/CORS Fetch Error"}`);
        setConnectionSuccess(false);
      }
    };

    // 3. Inspect user session status
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          setAuthStatus(`Error fetching session: ${error.message}`);
        } else if (session) {
          setAuthStatus(`Active session found (User ID: ${session.user.id})`);
        } else {
          setAuthStatus("No active session (Guest / Anonymous Mode)");
        }
      } catch (err) {
        const errorObj = err as Error;
        setAuthStatus(`Auth exception: ${errorObj?.message || "Fetch Failure"}`);
      }
    };

    testConnection();
    checkSession();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-6 rounded-3xl border border-border bg-card p-8 shadow-sm">
        
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white mb-4 shadow-md">
            <GraduationCap className="h-7 w-7" />
          </Link>
          <h2 className="text-2xl font-bold font-heading text-foreground">Supabase Authentication Diagnostics</h2>
          <p className="text-sm text-muted-foreground mt-1.5">
            Real-time connection, environment parameters, and client status checklist
          </p>
        </div>

        {/* Status Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl border border-border bg-muted/20 space-y-3">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Environment Variables</h3>
            
            {/* Supabase URL Presence */}
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">NEXT_PUBLIC_SUPABASE_URL</span>
              {urlConfigured === null ? (
                <span className="text-xs text-muted-foreground">Checking...</span>
              ) : urlConfigured ? (
                <span className="flex items-center gap-1 text-emerald-500 font-bold text-xs bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Configured
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-500 font-bold text-xs bg-red-500/10 px-2 py-0.5 rounded-full">
                  <XCircle className="h-3.5 w-3.5" /> Missing / Placeholder
                </span>
              )}
            </div>

            {/* Supabase Key Presence */}
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
              {keyConfigured === null ? (
                <span className="text-xs text-muted-foreground">Checking...</span>
              ) : keyConfigured ? (
                <span className="flex items-center gap-1 text-emerald-500 font-bold text-xs bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Configured
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-500 font-bold text-xs bg-red-500/10 px-2 py-0.5 rounded-full">
                  <XCircle className="h-3.5 w-3.5" /> Missing / Placeholder
                </span>
              )}
            </div>

            <div className="pt-2 text-[10px] text-muted-foreground leading-relaxed border-t border-border/60">
              <p className="font-semibold text-foreground">Configured URL:</p>
              <code className="block bg-muted p-1.5 rounded text-[9px] mt-1 break-all select-all">{supabaseUrlVal}</code>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-border bg-muted/20 space-y-3">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Network & API Health</h3>
            
            {/* Connection Test */}
            <div className="text-sm">
              <span className="font-medium block text-xs text-muted-foreground">API Reachability Test:</span>
              <div className="mt-1 flex items-center gap-2">
                {connectionSuccess === null ? (
                  <span className="text-xs text-muted-foreground">Pinging endpoints...</span>
                ) : connectionSuccess ? (
                  <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Reachable
                  </span>
                ) : (
                  <span className="text-xs text-red-500 font-bold flex items-center gap-1">
                    <ShieldAlert className="h-4 w-4" /> Unreachable / Connection Blocked
                  </span>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5 leading-relaxed bg-muted/50 p-2 rounded border border-border/40 font-mono select-all">
                {connectionStatus}
              </p>
            </div>

            {/* Auth Session Status */}
            <div className="text-sm pt-2 border-t border-border/60">
              <span className="font-medium block text-xs text-muted-foreground">Auth Service State:</span>
              <p className="text-xs font-semibold text-foreground mt-1 select-all">{authStatus}</p>
            </div>
          </div>
        </div>

        {/* Diagnostic Resolution Advisory */}
        {(!urlConfigured || !keyConfigured || connectionSuccess === false) && (
          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5 text-sm leading-relaxed space-y-2">
            <h4 className="font-bold text-yellow-600 dark:text-yellow-400 flex items-center gap-1.5">
              ⚠️ Diagnostic Resolution Steps
            </h4>
            <p className="text-xs text-muted-foreground">
              The client initialized with fallbacks because configuration variables are absent from the environment contexts. To fix this, you MUST configure these variables in Vercel:
            </p>
            <ol className="list-decimal list-inside text-xs text-muted-foreground space-y-1.5 pl-1 pt-1">
              <li>Open your project dashboard on Vercel.</li>
              <li>Go to <strong>Settings</strong> &rarr; <strong>Environment Variables</strong>.</li>
              <li>Add the following keys matching your Supabase project parameters:
                <div className="mt-2 space-y-1 bg-muted/80 p-2.5 rounded border border-border/80 font-mono text-[10px]">
                  <div><strong>NEXT_PUBLIC_SUPABASE_URL</strong>: <code>https://&lt;your-project-id&gt;.supabase.co</code></div>
                  <div><strong>NEXT_PUBLIC_SUPABASE_ANON_KEY</strong>: <code>&lt;your-anon-role-key&gt;</code></div>
                </div>
              </li>
              <li>Trigger a fresh deployment on Vercel for these configurations to take effect.</li>
            </ol>
          </div>
        )}

        {/* Back navigation */}
        <div className="text-center pt-2">
          <Link href="/login" className="text-xs text-indigo-500 hover:underline font-semibold flex items-center justify-center gap-1">
            &larr; Back to login portal
          </Link>
        </div>

      </div>
    </div>
  );
}
