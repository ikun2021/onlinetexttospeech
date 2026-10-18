"use client";

import React from "react";
import { SiteShell } from "@/components/site-shell";
import { TTSFormCard } from "@/components/tts-form-card";
import { HomeFaq } from "@/components/home-faq";
import { useI18n } from "@/lib/i18n";

export default function Home() {
  const { t } = useI18n();

  return (
    <SiteShell>
      <section className="text-center pt-8 pb-4 sm:pt-12 sm:pb-6 px-4 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-tight">
          {t.introTitle}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {t.introSubtitle}
        </p>
      </section>

      <section className="pb-12 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <TTSFormCard />
      </section>

      <HomeFaq />
    </SiteShell>
  );
}
