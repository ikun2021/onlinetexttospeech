import type { MetadataRoute } from "next";

const SITE_URL = "https://onlinetexttospeech.com";
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/sitemap.xml"],
    },
    sitemap: SITEMAP_URL,
    host: SITE_URL,
  };
}
