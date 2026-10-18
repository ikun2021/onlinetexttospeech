"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { toContentLocale } from "@/lib/content-locale";
import { getHomepageFaqs } from "@/content/faq";

export function HomeFaq() {
  const { locale, t } = useI18n();
  const faqs = getHomepageFaqs(toContentLocale(locale));

  return (
    <section className="pb-16 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="space-y-6">
        <div className="text-center sm:text-left space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            {t.faqTitle}
          </h2>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
            {t.faqSubtitle}{" "}
            <Link href="/blog" className="underline hover:text-zinc-800 dark:hover:text-zinc-200">
              {t.navBlog}
            </Link>
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((item) => (
            <li
              key={item.question}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6"
            >
              <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {item.question}
              </h3>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {item.answer}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
