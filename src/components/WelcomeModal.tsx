"use client";

import { useState, useEffect } from "react";
import { GraduationCap, ArrowRight, ShieldCheck } from "lucide-react";
import { StudentService } from "@/lib/services/studentService";

interface WelcomeModalProps {
  onOnboarded: () => void;
}

export default function WelcomeModal({ onOnboarded }: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [school, setSchool] = useState("");

  useEffect(() => {
    const profile = StudentService.getProfile();
    if (!profile) {
      setIsOpen(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    StudentService.saveProfile({
      name: name.trim(),
      rollNumber: roll.trim(),
      school: school.trim(),
    });
    setIsOpen(false);
    onOnboarded();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Decorative background gradients */}
        <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl" />
        <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-purple-500/10 blur-2xl" />

        <div className="relative flex flex-col items-center text-center space-y-6">
          {/* Logo */}
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/20">
            <GraduationCap className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-heading text-foreground">
              Welcome to LearnWithJulfy!
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed font-sans">
              Create your local student identity card. No email or password required. All data remains saved in your browser storage.
            </p>
          </div>

          {/* Onboarding Form */}
          <form onSubmit={handleSubmit} className="w-full text-left space-y-4 font-sans">
            <div className="space-y-1.5">
              <label htmlFor="modal-name" className="text-xs font-bold text-foreground">
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="modal-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Julfikar Rahman"
                className="w-full rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1 space-y-1.5">
                <label htmlFor="modal-roll" className="text-xs font-bold text-foreground">
                  Roll Number
                </label>
                <input
                  id="modal-roll"
                  type="text"
                  value={roll}
                  onChange={(e) => setRoll(e.target.value)}
                  placeholder="e.g. 15"
                  className="w-full rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium text-center"
                />
              </div>
              <div className="col-span-2 space-y-1.5">
                <label htmlFor="modal-school" className="text-xs font-bold text-foreground">
                  School Name
                </label>
                <input
                  id="modal-school"
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="e.g. Cotton College"
                  className="w-full rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground bg-muted/50 p-3 rounded-xl">
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Future-ready architecture: local data is fully ready to sync online.</span>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3.5 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all hover:scale-102"
            >
              <span>Start Learning</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
