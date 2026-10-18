"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useI18n } from "@/lib/i18n";
import { Moon, Sun, Globe, Radio, ExternalLink, Sparkles } from "lucide-react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, t } = useI18n();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-black/75 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <a href="#" className="flex items-center gap-2.5 group">
            {/* Vercel Geometric style Icon */}
            <div className="w-8 h-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-105">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 22h20L12 2z" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-tight text-base text-zinc-900 dark:text-zinc-100">
                {t.brandName}
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono font-medium rounded-full bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/60">
                <Sparkles className="w-2.5 h-2.5 text-blue-500" />
                Next.js 16
              </span>
            </div>
          </a>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1 text-sm">
            <a
              href="#studio"
              className="px-3 py-1.5 text-zinc-900 dark:text-zinc-100 font-medium rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
            >
              {t.navStudio}
            </a>
            <a
              href="#features"
              className="px-3 py-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
            >
              {t.navDocs}
            </a>
            <a
              href="#api"
              className="px-3 py-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
            >
              {t.navApi}
            </a>
          </nav>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* Status pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px]">Mock Engine 99.8%</span>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 text-xs">
            <button
              onClick={() => setLocale("zh")}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                locale === "zh"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
              title="切换为中文"
            >
              中
            </button>
            <button
              onClick={() => setLocale("en")}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                locale === "en"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
              title="Switch to English"
            >
              EN
            </button>
          </div>

          {/* Dark / Light Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              aria-label="Toggle Theme"
              title={theme === "dark" ? "切换为明亮模式" : "切换为暗色模式"}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-600" />
              )}
            </button>
          )}

          {/* GitHub / External */}
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-850 text-zinc-800 dark:text-zinc-200 transition-colors"
          >
            <span>Vercel Inspired</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </div>
    </header>
  );
}
