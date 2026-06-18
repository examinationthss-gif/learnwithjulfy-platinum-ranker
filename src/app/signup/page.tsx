"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { GraduationCap, Mail, Lock, User as UserIcon, AlertCircle } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [school, setSchool] = useState("");
  const [district, setDistrict] = useState("Kamrup");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,
          },
        },
      });

      if (signupError) throw signupError;

      if (data?.user) {
        // Upsert default profile configurations with mobile, school, district
        await supabase.from("profiles").upsert({
          id: data.user.id,
          name: name,
          avatar: "🎓",
          mobile: mobile,
          school: school,
          district: district,
        });

        // Navigate to dashboard onboarding
        router.push("/welcome");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create account. Please check your data.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-border bg-card p-8 shadow-sm">
        
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white mb-4 shadow-md">
            <GraduationCap className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-foreground">Create Student Account</h2>
          <p className="text-sm text-muted-foreground mt-1.5">
            Register to sync study streaks and badges across multiple devices
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-2.5 rounded-xl bg-red-500/10 p-3.5 border border-red-500/20 text-red-500 text-xs font-semibold">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Your Name</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-border bg-transparent py-2.5 pl-10 pr-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Nayanmoni Nath"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Mobile Number</label>
            <div className="relative">
              <input
                type="tel"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full rounded-xl border border-border bg-transparent py-2.5 px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="9876543210"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">School Name</label>
            <div className="relative">
              <input
                type="text"
                required
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full rounded-xl border border-border bg-transparent py-2.5 px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Guwahati Senior Secondary School"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">District</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full rounded-xl border border-border bg-transparent py-2.5 px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-card"
            >
              {["Kamrup", "Jorhat", "Dibrugarh", "Nagaon", "Cachar", "Sonitpur", "Sivasagar"].map((d) => (
                <option key={d} value={d} className="bg-card text-foreground">{d}</option>
              ))}
            </select>
          </div>

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
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Choose Password</label>
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
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-500 hover:underline font-semibold">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}
