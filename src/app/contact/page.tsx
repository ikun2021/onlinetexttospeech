import type { Metadata } from "next";
import { LegalPageView } from "@/components/legal-page-view";

export const metadata: Metadata = {
  title: "Contact Us - Online Text To Speech",
  description: "Contact Online Text To Speech for feedback, privacy questions, or support.",
};

export default function ContactPage() {
  return <LegalPageView pageKey="contact" />;
}
