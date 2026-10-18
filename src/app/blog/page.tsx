import type { Metadata } from "next";
import { BlogList } from "@/components/blog-list";

export const metadata: Metadata = {
  title: "Blog & Guides - Online Text To Speech",
  description:
    "Guides on using online TTS, PCM, Opus, WAV, MP3, sample rates, and practical narration tips.",
};

export default function BlogPage() {
  return <BlogList page={1} />;
}
