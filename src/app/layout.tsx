import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://onlinetexttospeech.com"),
  title: "Online Text To Speech - Free Natural AI Voice Generator",
  description:
    "Free online text to speech service with 400+ natural neural voices across 140+ languages. Real-time audio waveform preview and high-quality download.",
  keywords: [
    "text to speech",
    "tts",
    "online tts",
    "free text to speech",
    "natural voice",
    "multiple languages",
    "convert text to audio",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Online Text To Speech",
    description: "Free online text to speech service with natural sounding voices",
    url: "https://onlinetexttospeech.com",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "Text to Speech Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Text To Speech",
    description: "Free online text to speech service with natural sounding voices",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaOrgJson = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Online Text To Speech",
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "Multiple languages support",
      "Natural voice generation",
      "Audio file download",
      "Voice customization",
    ],
    description: "Free online text to speech service with natural sounding voices",
    url: "https://onlinetexttospeech.com",
  };

  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJson) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
