import Header from "@/components/header";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";

const workSans = Work_Sans({
  variable: "--font-primary",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PlatinumRx | Vitamins & Supplements",
    template: "%s | PlatinumRx",
  },
  description:
    "Browse a curated collection of vitamins and supplements for your health needs.",
  applicationName: "PlatinumRx",
  keywords: ["vitamins", "supplements", "health", "wellness"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "PlatinumRx",
    title: "PlatinumRx | Vitamins & Supplements",
    description:
      "Browse a curated collection of vitamins and supplements for your health needs.",
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlatinumRx | Vitamins & Supplements",
    description:
      "Browse a curated collection of vitamins and supplements for your health needs.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.variable}  antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:shadow"
        >
          Skip to content
        </a>
        <div className="max-w-full xl:max-w-7xl mx-auto px-4 min-h-screen flex flex-col">
          <Header />
          <main id="main-content" className="flex-1">
          {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
