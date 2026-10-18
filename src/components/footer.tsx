"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  const links = [
    { href: "/about", label: t.footerAbout },
    { href: "/contact", label: t.footerContact },
    { href: "/blog", label: t.navBlog },
    { href: "/cookies", label: t.footerCookies },
    { href: "/privacy", label: t.footerPrivacy },
  ];

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 text-sm text-zinc-500 dark:text-zinc-400">
        <nav className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-center sm:text-left text-xs sm:text-sm">{t.footerRights}</p>
      </div>
    </footer>
  );
}
