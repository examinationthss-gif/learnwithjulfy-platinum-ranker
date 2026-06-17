import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Description */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-base font-bold tracking-tight text-foreground">
                LearnWithJulfy
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Empowering Class 12 (AHSEC) Education students with structured notes, MCQ banks, model mock tests, and board exam roadmap strategies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/notes" className="text-sm text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Notes
                </Link>
              </li>
              <li>
                <Link href="/mcq" className="text-sm text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  MCQ Bank
                </Link>
              </li>
              <li>
                <Link href="/tests" className="text-sm text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Test Papers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Info */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Information
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  About Author
                </Link>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  State: Assam (AHSEC)
                </span>
              </li>
              <li>
                <span className="text-sm text-accent font-medium">
                  Platinum Ranker Series
                </span>
              </li>
            </ul>
          </div>

        </div>
        
        {/* Bottom Panel */}
        <div className="mt-8 border-t border-border/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} LearnWithJulfy. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Designed for AHSEC Class 12 Education syllabus.
          </p>
        </div>
      </div>
    </footer>
  );
}
