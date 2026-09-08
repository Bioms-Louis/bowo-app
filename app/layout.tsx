import type { Metadata } from "next";
import "./globals.css";
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton";

export const metadata: Metadata = {
  title: "BOWO - Born With Purpose",
  description: "Document your journey, uncover patterns, and walk intentionally in your purpose.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <ScrollToTopButton />
      </body>
    </html>
  );
}
