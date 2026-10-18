import type { Metadata } from "next";
import { LegalPageView } from "@/components/legal-page-view";

export const metadata: Metadata = {
  title: "About Us - Online Text To Speech",
  description: "Learn about Online Text To Speech, our free neural TTS service.",
};

export default function AboutPage() {
  return <LegalPageView pageKey="about" />;
}
