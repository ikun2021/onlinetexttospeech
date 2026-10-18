"use client";

import React from "react";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { useI18n } from "@/lib/i18n";
import { toContentLocale } from "@/lib/content-locale";
import { getPostsPage, pickLocale } from "@/lib/blog";

function blogPageHref(page: number) {
  return page <= 1 ? "/blog" : `/blog/page/${page}`;
}

export function BlogList({ page = 1 }: { page?: number }) {
  const { locale, t } = useI18n();
  const contentLocale = toContentLocale(locale);
  const { posts, page: currentPage, pageCount, total } = getPostsPage(page);

  return (
    <SiteShell>
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16 w-full space-y-10">
        <header className="space-y-3 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            {t.blogTitle}
          </h1>
          <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-2xl">
            {t.blogSubtitle}
          </p>
          <p className="text-xs text-zinc-400">
            {t.blogPageInfo
              .replace("{page}", String(currentPage))
              .replace("{pages}", String(pageCount))
              .replace("{total}", String(total))}
          </p>
        </header>

        <ul className="space-y-8">
          {posts.map((post) => {
            const title = pickLocale(post.title, contentLocale);
            const description = pickLocale(post.description, contentLocale);
            const coverAlt = post.cover
              ? pickLocale(post.cover.alt, contentLocale)
              : title;
            return (
              <li
                key={post.slug}
                className="border-b border-zinc-200 dark:border-zinc-800 pb-8 last:border-0"
              >
                <Link href={`/blog/${post.slug}`} className="group block space-y-3">
                  {post.cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.cover.src}
                      alt={coverAlt}
                      width={960}
                      height={420}
                      loading="lazy"
                      className="w-full h-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 transition-opacity group-hover:opacity-95"
                    />
                  )}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                    <time dateTime={post.date}>
                      {t.blogUpdated} {post.date}
                    </time>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:underline">
                    {title}
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {description}
                  </p>
                  <span className="inline-block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {t.blogReadMore} →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {pageCount > 1 && (
          <nav
            className="flex flex-wrap items-center justify-center gap-2 pt-2"
            aria-label={t.blogPagination}
          >
            {currentPage > 1 ? (
              <Link
                href={blogPageHref(currentPage - 1)}
                className="px-3 py-1.5 text-sm rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                {t.blogPrev}
              </Link>
            ) : (
              <span className="px-3 py-1.5 text-sm rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-300 dark:text-zinc-600">
                {t.blogPrev}
              </span>
            )}

            {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={blogPageHref(p)}
                aria-current={p === currentPage ? "page" : undefined}
                className={`min-w-9 px-3 py-1.5 text-sm text-center rounded-full border transition-colors ${
                  p === currentPage
                    ? "border-zinc-900 dark:border-white bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
                    : "border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                {p}
              </Link>
            ))}

            {currentPage < pageCount ? (
              <Link
                href={blogPageHref(currentPage + 1)}
                className="px-3 py-1.5 text-sm rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                {t.blogNext}
              </Link>
            ) : (
              <span className="px-3 py-1.5 text-sm rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-300 dark:text-zinc-600">
                {t.blogNext}
              </span>
            )}
          </nav>
        )}
      </div>
    </SiteShell>
  );
}
