import type { ContentLocale } from "@/lib/content-locale";
import { posts, type BlogPost, type LocalizedString } from "@/content/posts";
import { getPostCover, getPostInlineFigure } from "@/content/posts/figures";

export type { BlogPost };

export const BLOG_PAGE_SIZE = 10;

export function pickLocale<T>(value: LocalizedString<T>, locale: ContentLocale): T {
  return value[locale] ?? value.en;
}

function withMedia(post: BlogPost): BlogPost {
  return {
    ...post,
    cover: post.cover ?? getPostCover(post.slug),
    figure: post.figure ?? getPostInlineFigure(post.slug) ?? undefined,
  };
}

export function getAllPosts(): BlogPost[] {
  return posts.map(withMedia).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): BlogPost | undefined {
  const post = posts.find((p) => p.slug === slug);
  return post ? withMedia(post) : undefined;
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}

export function getBlogPageCount(pageSize = BLOG_PAGE_SIZE): number {
  return Math.max(1, Math.ceil(posts.length / pageSize));
}

export function getPostsPage(page: number, pageSize = BLOG_PAGE_SIZE): {
  posts: BlogPost[];
  page: number;
  pageCount: number;
  total: number;
} {
  const pageCount = getBlogPageCount(pageSize);
  const safePage = Number.isFinite(page) ? Math.min(Math.max(1, Math.floor(page)), pageCount) : 1;
  const start = (safePage - 1) * pageSize;
  return {
    posts: getAllPosts().slice(start, start + pageSize),
    page: safePage,
    pageCount,
    total: posts.length,
  };
}
