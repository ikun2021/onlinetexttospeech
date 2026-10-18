"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { getAllLocales, LocaleGroup } from "@/data/voices";
import { useI18n } from "@/lib/i18n";
import { Check, ChevronDown, Globe, Search, X } from "lucide-react";

interface LanguagePickerProps {
  selectedLocale: string;
  onSelectLocale: (localeCode: string) => void;
}

export function LanguagePicker({
  selectedLocale,
  onSelectLocale,
}: LanguagePickerProps) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const locales = useMemo(() => getAllLocales(), []);

  const currentLocale = useMemo(() => {
    const target = (selectedLocale || "zh-CN").toLowerCase();
    return (
      locales.find((l) => l.localeCode.toLowerCase() === target) ||
      locales.find((l) => l.localeCode === "zh-CN") ||
      locales[0]
    );
  }, [locales, selectedLocale]);

  // Filter locales based on query
  const filteredLocales = useMemo(() => {
    if (!searchQuery.trim()) return locales;
    const q = searchQuery.toLowerCase().trim();
    return locales.filter(
      (l) =>
        l.localeName.toLowerCase().includes(q) ||
        l.localeCode.toLowerCase().includes(q) ||
        l.family.toLowerCase().includes(q)
    );
  }, [locales, searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-indigo-500" />
          <span>{t.configLanguageLabel}</span>
        </span>
        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono">
          {currentLocale?.localeCode}
        </span>
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 hover:border-indigo-400 dark:hover:border-indigo-500 text-left transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-xl shrink-0 leading-none">{currentLocale?.flag}</span>
          <div className="min-w-0">
            <div className="text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate">
              {currentLocale?.localeName}
            </div>
            <div className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono flex items-center gap-1.5">
              <span>{currentLocale?.localeCode}</span>
              <span>•</span>
              <span>{currentLocale?.voiceCount} {t.voicePlural || "Voices"}</span>
            </div>
          </div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180 text-indigo-500" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-1.5 w-full min-w-[320px] max-w-[400px] rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Search Bar */}
          <div className="p-2.5 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchLanguagesPlaceholder || "搜索语言或地区..."}
                className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* List of Locales */}
          <div className="max-h-72 overflow-y-auto p-1.5 space-y-0.5 custom-scrollbar">
            {filteredLocales.length === 0 ? (
              <div className="py-8 text-center text-xs text-zinc-400">
                未找到匹配的语言或地区
              </div>
            ) : (
              filteredLocales.map((locale) => {
                const isSelected =
                  locale.localeName.toLowerCase() === (selectedLocale || "").toLowerCase() ||
                  locale.localeCode.toLowerCase() === (selectedLocale || "").toLowerCase();

                return (
                  <button
                    key={`${locale.family}-${locale.localeName}`}
                    type="button"
                    onClick={() => {
                      onSelectLocale(locale.localeName);
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${
                      isSelected
                        ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-medium"
                        : "hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-lg shrink-0 leading-none">{locale.flag}</span>
                      <div className="min-w-0">
                        <div className="text-xs font-medium truncate">
                          {locale.localeName}
                        </div>
                        <div className="text-[10px] text-zinc-400 font-mono">
                          {locale.localeCode}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-medium">
                        {locale.voiceCount}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
