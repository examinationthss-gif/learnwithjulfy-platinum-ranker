"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, GraduationCap, Languages } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Avoid hydration mismatch by waiting until client is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: t("home"), href: "/" },
    { name: t("notes"), href: "/notes" },
    { name: t("mcqBank"), href: "/mcq" },
    { name: t("videoClasses"), href: "/videos" },
    { name: t("tests"), href: "/tests" },
    { name: t("about"), href: "/about" },
  ];

  return (
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
        <nav className="hidden md:flex items-center gap-6">
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

        {/* Action Controls (Language Toggle, Theme Toggle & Mobile Menu Button) */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          {mounted && (
            <button
              onClick={() => setLanguage(language === "en" ? "as" : "en")}
              className="flex h-9 px-3 items-center justify-center rounded-lg border border-border bg-transparent text-xs font-bold text-foreground hover:bg-muted transition-colors gap-1.5"
              aria-label="Toggle language"
            >
              <Languages className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span>{language === "en" ? "অসমীয়া" : "English"}</span>
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
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background/95 backdrop-blur-md transition-all duration-300">
          <nav className="flex flex-col space-y-3 px-4 py-4">
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
          </nav>
        </div>
      )}
    </header>
  );
}
