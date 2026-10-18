"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen flex flex-col font-sans transition-colors duration-200">
      <Navbar />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
