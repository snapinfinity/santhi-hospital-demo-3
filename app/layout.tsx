import type { Metadata, Viewport } from "next";
import { Fraunces, Figtree } from "next/font/google";

import "./globals.css";
import { AppointmentProvider } from "@/components/appointment/appointment-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";

/** Editorial display serif — warm, characterful, with true italics for accents. */
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

/** Interface and body face. */
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://santhihospital.example"),
  title: {
    default: "Santhi Hospital — Multi-speciality care in Kozhikode",
    template: "%s · Santhi Hospital",
  },
  description:
    "Santhi Hospital brings 120 consultants across 32 departments, same-day diagnostics and 24-hour emergency care to Kozhikode and the Malabar coast. Book an appointment in under a minute.",
  applicationName: "Santhi Hospital",
  keywords: [
    "Santhi Hospital",
    "multi-speciality hospital",
    "book appointment",
    "emergency care",
    "Kozhikode",
    "Kerala",
  ],
  openGraph: {
    type: "website",
    siteName: "Santhi Hospital",
    title: "Santhi Hospital — Good medicine begins with listening",
    description:
      "120 specialists, 32 departments and 24-hour emergency care on the Malabar coast. Book an appointment in under a minute.",
    url: "/",
    locale: "en_IN",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "A doctor sitting with an elderly patient after a consultation at Santhi Hospital.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Santhi Hospital — Good medicine begins with listening",
    description:
      "120 consultants, 32 departments and 24-hour emergency care in Kozhikode. Book an appointment in under a minute.",
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
    <html lang="en-IN" className={`${fraunces.variable} ${figtree.variable}`}>
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
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to main content
        </a>

        <ScrollProgress />

        <AppointmentProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </AppointmentProvider>
      </body>
    </html>
  );
}
