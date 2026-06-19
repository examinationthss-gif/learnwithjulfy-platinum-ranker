"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, GraduationCap, Languages, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useStudent } from "@/context/StudentContext";
import { awardBadge, hasBadge } from "@/lib/localStorage";
import GlobalSearch from "@/components/GlobalSearch";
import WelcomeModal from "@/components/WelcomeModal";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { profile, level, totalXP, checkAndAwardBadges, refreshStats } = useStudent();

  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Refresh stats on every navigation
    refreshStats();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Global Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Check badges on each navigation
  useEffect(() => {
    if (mounted) {
      checkAndAwardBadges();
      // Award bilingual badge when language switches to Assamese
      if (language === "as" && !hasBadge("bilingual_scholar")) {
        awardBadge("bilingual_scholar");
        refreshStats();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, mounted]);

  const hasProfile = mounted && profile?.hasOnboarded;

  const navItems = [
    { name: t("home"), href: "/" },
    { name: t("notes"), href: "/notes" },
    { name: t("mcqBank"), href: "/mcq" },
    { name: t("videoClasses"), href: "/videos" },
    { name: t("tests"), href: "/tests" },
    { name: t("about"), href: "/about" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border glass-panel">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-102">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-foreground">
                LearnWithJulfy
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 -mt-1">
                {t("platinumRanker")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              id="global-search-trigger"
              className="flex h-9 items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Search"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-flex items-center rounded border border-border px-1.5 py-0.5 text-[10px] font-bold">⌘K</kbd>
            </button>

            {/* Premium Student Profile Navbar Display */}
            {mounted && hasProfile && (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 bg-muted/40 border border-border px-3 py-1.5 rounded-xl hover:bg-muted/80 transition-all cursor-pointer font-sans"
                >
                  <span className="text-sm shrink-0">👤</span>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-foreground line-clamp-1">{profile.name}</span>
                    <span className="text-[9px] text-muted-foreground font-semibold -mt-0.5">
                      Roll: {profile.rollNumber || "N/A"} &bull; {profile.school || "AHSEC Academy"}
                    </span>
                  </div>
                </Link>

                <div className="flex items-center gap-1.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2.5 py-1.5 rounded-xl text-[10px] font-bold">
                  Lv.{level}
                </div>
              </div>
            )}

            {/* Language Toggle */}
            {mounted && (
              <button
                onClick={() => setLanguage(language === "en" ? "as" : "en")}
                className="flex h-9 px-3 items-center justify-center rounded-lg border border-border bg-transparent text-xs font-bold text-foreground hover:bg-muted transition-colors gap-1.5"
                aria-label="Toggle language"
              >
                <Languages className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span className="hidden sm:inline">{language === "en" ? "অসমীয়া" : "English"}</span>
              </button>
            )}

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-transparent text-foreground hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-amber-400" />
                ) : (
                  <Moon className="h-5 w-5 text-indigo-600" />
                )}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-transparent text-foreground hover:bg-muted transition-colors md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border bg-background/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-1 px-4 py-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-medium px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              {/* Mobile: Get Started if no profile */}
              {!hasProfile && (
                <Link
                  href="/welcome"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg bg-indigo-600 text-white text-base font-semibold px-3 py-2 mt-2"
                >
                  🎓 Get Started — Create Profile
                </Link>
              )}
              {/* Mobile: XP display if has profile */}
              {hasProfile && (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2 mt-2"
                >
                  <span className="text-xl">{profile.avatar}</span>
                  <div>
                    <p className="text-sm font-bold text-foreground">{profile.name}</p>
                    <p className="text-xs text-muted-foreground">Level {level} · {totalXP} XP</p>
                  </div>
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Global Search Overlay */}
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Onboarding Dialog Modal */}
      <WelcomeModal onOnboarded={refreshStats} />
    </>
  );
}
