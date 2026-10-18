"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

const STORAGE_KEY = "cookie_consent";

export function CookieBanner() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== "accepted") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // ignore quota / private mode errors
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t.cookieBannerTitle}
      className="fixed bottom-0 inset-x-0 z-[60] border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.06)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 space-y-1 text-sm text-zinc-600 dark:text-zinc-300">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">{t.cookieBannerTitle}</p>
          <p className="text-xs sm:text-sm leading-relaxed">
            {t.cookieBannerBody}{" "}
            <Link href="/cookies" className="underline hover:text-zinc-900 dark:hover:text-zinc-100">
              {t.footerCookies}
            </Link>
            {" · "}
            <Link href="/privacy" className="underline hover:text-zinc-900 dark:hover:text-zinc-100">
              {t.footerPrivacy}
            </Link>
          </p>
        </div>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 px-5 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
        >
          {t.cookieBannerAccept}
        </button>
      </div>
    </div>
  );
}
