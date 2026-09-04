import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";

import "./globals.css";
import { AppointmentProvider } from "@/components/appointment/appointment-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RibbonDefs } from "@/components/ui/ribbon";

/** Editorial serif for headings — the hospital's own wordmark is a serif. */
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

/** Interface and body face. */
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://santhihospital.example"),
  title: {
    default: "Santhi Hospital — Multi-speciality care in Kottayam",
    template: "%s · Santhi Hospital",
  },
  description:
    "Santhi Hospital brings advanced medicine, 120 consultants across 32 departments and 24-hour emergency care together under one roof. Book an appointment in under a minute.",
  applicationName: "Santhi Hospital",
  keywords: [
    "Santhi Hospital",
    "multi-speciality hospital",
    "book appointment",
    "emergency care",
    "Kottayam",
  ],
  openGraph: {
    type: "website",
    siteName: "Santhi Hospital",
    title: "Santhi Hospital — Exceptional care, with humanity at the heart of it",
    description:
      "Advanced medicine, experienced specialists and compassionate nursing under one roof. Book an appointment in under a minute.",
    url: "/",
    locale: "en_IN",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Santhi Hospital — a doctor holding an elderly patient after a consultation.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Santhi Hospital — Exceptional care, with humanity at the heart of it",
    description:
      "120 consultants, 32 departments and 24-hour emergency care. Book an appointment in under a minute.",
    images: ["/images/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#413a97",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${newsreader.variable} ${instrumentSans.variable}`}>
      <body className="min-h-screen antialiased">
        {/* Scroll-reveal wrappers start hidden and are animated in by motion.
            If JavaScript never arrives, this keeps every section readable. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: "[data-reveal]{opacity:1 !important;transform:none !important}",
            }}
          />
        </noscript>

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to main content
        </a>

        <RibbonDefs />

        <AppointmentProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </AppointmentProvider>
      </body>
    </html>
  );
}
