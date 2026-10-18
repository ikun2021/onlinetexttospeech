"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Info, Mail, Cookie } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { useI18n } from "@/lib/i18n";
import { toContentLocale } from "@/lib/content-locale";
import { getLegalContent, type LegalPageKey } from "@/content/legal";

const icons: Record<LegalPageKey, React.ReactNode> = {
  about: <Info className="w-6 h-6" />,
  contact: <Mail className="w-6 h-6" />,
  cookies: <Cookie className="w-6 h-6" />,
  privacy: <Shield className="w-6 h-6" />,
};

export function LegalPageView({ pageKey }: { pageKey: LegalPageKey }) {
  const { locale, t } = useI18n();
  const content = getLegalContent(pageKey, toContentLocale(locale));

  return (
    <SiteShell>
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16 space-y-8 w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToHome}</span>
        </Link>

        <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            {icons[pageKey]}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{content.title}</h1>
            <p className="text-xs text-zinc-500 mt-1">{content.updated}</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {content.sections.map((section) => (
            <section key={section.heading} className="space-y-2">
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {section.heading}
              </h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
