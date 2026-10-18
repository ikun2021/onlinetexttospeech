import type { Metadata } from "next";
import { LegalPageView } from "@/components/legal-page-view";

export const metadata: Metadata = {
  title: "Cookie Policy - Online Text To Speech",
  description: "How Online Text To Speech uses cookies and local storage.",
};

export default function CookiesPage() {
  return <LegalPageView pageKey="cookies" />;
}
