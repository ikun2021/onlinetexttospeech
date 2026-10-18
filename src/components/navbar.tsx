"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useI18n, languageOptionsForSelect, Locale } from "@/lib/i18n";
import { Moon, Sun, Globe } from "lucide-react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, t } = useI18n();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 sm:gap-6 min-w-0">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Online Text To Speech Service Logo"
              width={40}
              height={40}
              className="h-9 w-9 shrink-0 object-contain transition-transform group-hover:scale-105 dark:invert"
            />
            <span className="font-bold tracking-tight text-lg text-zinc-900 dark:text-zinc-100 hidden sm:inline-block">
              Online Text To Speech
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <Link href="/blog" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              {t.navBlog}
            </Link>
            <Link href="/about" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              {t.footerAbout}
            </Link>
            <Link href="/contact" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              {t.footerContact}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="relative flex items-center">
            <Globe className="w-3.5 h-3.5 absolute left-3 text-zinc-400 pointer-events-none" />
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as Locale)}
              className="appearance-none pl-8 pr-8 py-1.5 text-xs font-medium rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer transition-colors shadow-sm"
              title="Select Language"
            >
              {languageOptionsForSelect.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                >
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2.5 text-zinc-400 text-[10px]">▼</div>
          </div>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-750 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors shadow-sm"
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
        </div>
      </div>
    </header>
  );
}
