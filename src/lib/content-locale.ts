import type { Locale } from "@/lib/i18n";

export type ContentLocale = "zh" | "en";

export function toContentLocale(locale: Locale): ContentLocale {
  return locale === "zh" ? "zh" : "en";
}
