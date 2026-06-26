import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "XBD Collective | Architecture & Interior Design",
  description: "Award-winning international Architecture & Interior Design Consultancy Group operating across UAE, UK, Europe, Africa, and Asia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=gambetta@400,500,700&f[]=satoshi@400,500&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-body bg-xbd-bg text-xbd-text">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
