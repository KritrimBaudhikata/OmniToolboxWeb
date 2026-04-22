import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/site-config";
import { BackToTopButton } from "@/components/back-to-top-button";
import { AppShell } from "@/components/app-shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: "SuperAppWeb - OmniToolbox on the Web",
    template: "%s | SuperAppWeb",
  },
  description:
    "Fast, SEO-friendly web toolbox with practical daily and developer utilities. SuperApp mobile and extensions updates will also be announced here.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SuperAppWeb",
    description:
      "OmniToolbox web experience with accurate utility tools and upcoming mobile + extension announcements.",
    url: "/",
    siteName: SITE_CONFIG.siteName,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE_CONFIG.siteName,
              url: SITE_CONFIG.siteUrl,
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_CONFIG.siteUrl}/tools?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <AppShell>{children}</AppShell>
        <BackToTopButton />
      </body>
    </html>
  );
}
