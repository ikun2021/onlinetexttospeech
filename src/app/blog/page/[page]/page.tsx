import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BlogList } from "@/components/blog-list";
import { getBlogPageCount } from "@/lib/blog";

type Props = {
  params: Promise<{ page: string }>;
};

export function generateStaticParams() {
  const pageCount = getBlogPageCount();
  return Array.from({ length: Math.max(0, pageCount - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page: pageParam } = await params;
  const page = Number.parseInt(pageParam, 10);
  return {
    title: `Blog & Guides (Page ${page}) - Online Text To Speech`,
    description:
      "Guides on using online TTS, PCM, Opus, WAV, MP3, sample rates, and practical narration tips.",
  };
}

export default async function BlogPagedPage({ params }: Props) {
  const { page: pageParam } = await params;
  const page = Number.parseInt(pageParam, 10);
  const pageCount = getBlogPageCount();

  if (!Number.isFinite(page) || page < 1) {
    notFound();
  }
  if (page === 1) {
    redirect("/blog");
  }
  if (page > pageCount) {
    notFound();
  }

  return <BlogList page={page} />;
}
