import type { Metadata } from "next";
import GsapProvider from "@/components/GsapProvider";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";
import "../utils/transition.min.css";

export const metadata: Metadata = {
  title: "XBD Collective",
  description: "Cinematic Concept Pitch for XBD Collective",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&f[]=gambetta@300,400,500&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-body bg-[#181615] text-[var(--foreground)]">
        <SmoothScroll>
          <GsapProvider>
            {children}
          </GsapProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
