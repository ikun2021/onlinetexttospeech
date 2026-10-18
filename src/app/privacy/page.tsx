import type { Metadata } from "next";
import { LegalPageView } from "@/components/legal-page-view";

export const metadata: Metadata = {
  title: "Privacy Policy - Online Text To Speech",
  description: "Privacy policy for Online Text To Speech service",
};

export default function PrivacyPage() {
  return <LegalPageView pageKey="privacy" />;
}
