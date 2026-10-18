"use client";

import React from "react";
import type { ContentLocale } from "@/lib/content-locale";
import type { BlogFigure } from "@/content/posts/types";
import { pickLocale } from "@/lib/blog";

export function BlogFigureBlock({
  figure,
  locale,
  priority = false,
}: {
  figure: BlogFigure;
  locale: ContentLocale;
  priority?: boolean;
}) {
  const alt = pickLocale(figure.alt, locale);
  const caption = pickLocale(figure.caption, locale);

  return (
    <figure className="space-y-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={figure.src}
        alt={alt}
        width={960}
        height={420}
        loading={priority ? "eager" : "lazy"}
        className="w-full h-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900"
      />
      <figcaption className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 text-center leading-relaxed">
        {caption}
      </figcaption>
    </figure>
  );
}
