"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { BlogFigureBlock } from "@/components/blog-figure";
import { useI18n } from "@/lib/i18n";
import { toContentLocale } from "@/lib/content-locale";
import { pickLocale, type BlogPost } from "@/lib/blog";

export function BlogPostView({ post }: { post: BlogPost }) {
  const { locale, t } = useI18n();
  const contentLocale = toContentLocale(locale);
  const title = pickLocale(post.title, contentLocale);
  const description = pickLocale(post.description, contentLocale);
  const sections = pickLocale(post.sections, contentLocale);

  return (
    <SiteShell>
      <article className="max-w-3xl mx-auto px-4 py-12 sm:py-16 w-full space-y-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.blogBack}</span>
        </Link>

        <header className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <time dateTime={post.date}>
              {t.blogUpdated} {post.date}
            </time>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            {title}
          </h1>
          <p className="text-base text-zinc-500 dark:text-zinc-400">{description}</p>
        </header>

        {post.cover && (
          <BlogFigureBlock figure={post.cover} locale={contentLocale} priority />
        )}

        <div className="space-y-8 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {sections.map((section, index) => (
            <React.Fragment key={section.heading}>
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </section>
              {index === 0 && post.figure && (
                <BlogFigureBlock figure={post.figure} locale={contentLocale} />
              )}
            </React.Fragment>
          ))}
        </div>
      </article>
    </SiteShell>
  );
}
