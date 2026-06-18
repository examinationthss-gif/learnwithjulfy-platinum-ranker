"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, BookOpen, Brain, Video, ClipboardList, Clock, ArrowRight } from "lucide-react";
import { getRecentSearches, addRecentSearch } from "@/lib/localStorage";
import searchIndexRaw from "@/data/searchIndex.json";

// ── Types ──────────────────────────────────────────────────────────────────
interface SearchIndexItem {
  unitId: string;
  dayId: string;
  enTitle: string;
  asTitle?: string;
  enConcept?: string;
  asConcept?: string;
  keywordsEn?: string;
  keywordsAs?: string;
  categoryEn?: string;
  categoryAs?: string;
}

interface SearchResult {
  type: "note" | "mcq" | "video" | "test";
  title: string;
  subtitle: string;
  href: string;
  icon: React.ElementType;
  iconColor: string;
}

// Use unknown as intermediate to avoid type mismatch on import
const searchIndex = searchIndexRaw as unknown as SearchIndexItem[];

// Quick static data for videos & tests
const VIDEO_QUICK: SearchResult[] = [
  { type: "video", title: "Aims of Secondary Education (Mudaliar Commission)", subtitle: "Unit I • Video Lecture", href: "/videos#unit1", icon: Video, iconColor: "text-emerald-500" },
  { type: "video", title: "Kothari Commission Overview", subtitle: "Unit I • Video Lecture", href: "/videos#unit1", icon: Video, iconColor: "text-emerald-500" },
];

const TEST_QUICK: SearchResult[] = [
  { type: "test", title: "Unit I Test — Secondary Education", subtitle: "30 Marks • 45 Mins", href: "/tests", icon: ClipboardList, iconColor: "text-amber-500" },
  { type: "test", title: "Unit II Test — Non-formal Education", subtitle: "30 Marks • 45 Mins", href: "/tests", icon: ClipboardList, iconColor: "text-amber-500" },
  { type: "test", title: "Full Model Paper I", subtitle: "100 Marks • 3 Hours", href: "/tests", icon: ClipboardList, iconColor: "text-amber-500" },
  { type: "test", title: "Board Prediction Paper 2025", subtitle: "100 Marks • 3 Hours", href: "/tests", icon: ClipboardList, iconColor: "text-amber-500" },
];

function searchAll(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  // Notes search — use enTitle and keywordsEn from real schema
  for (const item of searchIndex) {
    const title = item.enTitle || "";
    const keywords = item.keywordsEn || "";
    if (title.toLowerCase().includes(q) || keywords.toLowerCase().includes(q)) {
      const unitNum = (item.unitId || "").replace("unit-", "").replace("unit", "");
      const dayNum = (item.dayId || "").replace("day-", "").replace("day", "");
      const href = unitNum && dayNum ? `/notes/unit${unitNum}/day${dayNum}` : `/notes`;
      results.push({
        type: "note",
        title,
        subtitle: `Unit ${unitNum} · Day ${dayNum} · ${item.categoryEn || "Notes"}`,
        href,
        icon: BookOpen,
        iconColor: "text-blue-500",
      });
    }
    if (results.filter((r) => r.type === "note").length >= 4) break;
  }

  // Videos search
  for (const v of VIDEO_QUICK) {
    if (v.title.toLowerCase().includes(q)) {
      results.push(v);
    }
  }

  // Tests search
  for (const t of TEST_QUICK) {
    if (t.title.toLowerCase().includes(q) || t.subtitle.toLowerCase().includes(q)) {
      results.push(t);
    }
  }

  // MCQ keywords (simple inline)
  const mcqKeywords = [
    { q: ["mudaliar", "secondary commission", "aims"], title: "MCQ: Mudaliar Commission Aims", href: "/mcq/unit1/day1" },
    { q: ["kothari", "national policy", "10+2"], title: "MCQ: Kothari Commission", href: "/mcq/unit1/day3" },
    { q: ["learning", "conditioning", "pavlov", "trial"], title: "MCQ: Learning Theories", href: "/mcq/unit4/day1" },
    { q: ["memory", "forgetting", "attention", "retention"], title: "MCQ: Memory & Attention", href: "/mcq/unit5/day1" },
    { q: ["mental health", "hygiene", "adjustment"], title: "MCQ: Mental Health", href: "/mcq/unit6/day1" },
    { q: ["mean", "median", "mode", "statistics", "histogram"], title: "MCQ: Educational Statistics", href: "/mcq/unit7/day1" },
  ];
  for (const kw of mcqKeywords) {
    if (kw.q.some((k) => q.includes(k) || k.includes(q.split(" ")[0]))) {
      results.push({ type: "mcq", title: kw.title, subtitle: "Interactive Quiz", href: kw.href, icon: Brain, iconColor: "text-purple-500" });
    }
  }

  return results.slice(0, 8);
}

interface GlobalSearchProps {
  open: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ open, onClose }: GlobalSearchProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setRecentSearches(getRecentSearches());
    } else {
      setQuery("");
      setResults([]);
      setActiveIndex(-1);
    }
  }, [open]);

  useEffect(() => {
    const res = searchAll(query);
    setResults(res);
    setActiveIndex(-1);
  }, [query]);

  const handleNavigate = useCallback((href: string, title: string) => {
    addRecentSearch(title);
    setRecentSearches(getRecentSearches());
    onClose();
    router.push(href);
  }, [router, onClose]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const items = results.length > 0 ? results : [];
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, items.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, -1)); }
    else if (e.key === "Enter" && activeIndex >= 0 && items[activeIndex]) {
      handleNavigate(items[activeIndex].href, items[activeIndex].title);
    }
    else if (e.key === "Escape") { onClose(); }
  }, [results, activeIndex, handleNavigate, onClose]);

  if (!open) return null;

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "note": return "📘 Notes";
      case "mcq": return "🧠 MCQ";
      case "video": return "🎥 Video";
      case "test": return "📊 Test";
      default: return "📄";
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div className="fixed left-1/2 top-24 z-[101] w-full max-w-xl -translate-x-1/2 px-4">
        <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
          {/* Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <Search className="h-5 w-5 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search notes, MCQs, videos, tests..."
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm outline-none"
              id="global-search-input"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-4 w-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center rounded border border-border px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">ESC</kbd>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query && results.length > 0 && (
              <div className="py-2">
                <p className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {results.length} Results
                </p>
                {results.map((result, i) => (
                  <button
                    key={`${result.href}-${i}`}
                    onClick={() => handleNavigate(result.href, result.title)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors ${activeIndex === i ? "bg-muted/50" : ""}`}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <result.icon className={`h-4 w-4 ${result.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{result.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-bold text-muted-foreground">{getTypeLabel(result.type)}</span>
                        <span className="text-[10px] text-muted-foreground truncate">{result.subtitle}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  </button>
                ))}
              </div>
            )}

            {query && results.length === 0 && (
              <div className="py-12 text-center">
                <Search className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-semibold text-foreground">No results for &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-muted-foreground mt-1">Try different keywords</p>
              </div>
            )}

            {!query && recentSearches.length > 0 && (
              <div className="py-2">
                <p className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> Recent Searches
                </p>
                {recentSearches.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(s)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-muted/50 transition-colors"
                  >
                    <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm text-muted-foreground">{s}</span>
                  </button>
                ))}
              </div>
            )}

            {!query && recentSearches.length === 0 && (
              <div className="py-8 px-4">
                <p className="text-xs text-muted-foreground text-center mb-4">Quick Navigate</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "📘 Chapter Notes", href: "/notes" },
                    { label: "🧠 MCQ Bank", href: "/mcq" },
                    { label: "🎥 Video Classes", href: "/videos" },
                    { label: "📊 Tests & Papers", href: "/tests" },
                    { label: "🏅 Badges", href: "/badges" },
                    { label: "📈 My Report", href: "/dashboard/report" },
                  ].map((item) => (
                    <button
                      key={item.href}
                      onClick={() => { onClose(); router.push(item.href); }}
                      className="flex items-center gap-2 rounded-xl bg-muted/50 hover:bg-muted px-3 py-2 text-sm font-medium text-foreground transition-colors text-left"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer hint */}
          <div className="border-t border-border px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>ESC close</span>
            </div>
            <span className="text-[10px] text-muted-foreground">Ctrl+K to search</span>
          </div>
        </div>
      </div>
    </>
  );
}
