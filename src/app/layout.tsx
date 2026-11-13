import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = "DaVinci — AI-Powered Land Survey Drafting";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: "%s · DaVinci",
  },
  description: site.description,
  applicationName: "DaVinci",
  keywords: [
    "AI survey drafting",
    "land survey drafting software",
    "survey drafting automation",
    "AI drafting",
    "surveying technology",
    "DaVinci",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "DaVinci",
    title,
    description:
      "Transform survey data into professional drafting deliverables — in minutes, not hours. AI-powered land survey drafting by DaVinci.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Survey drafting, reimagined by AI. From ~1 hour to ~7 minutes.",
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} antialiased`}>
      <body className="min-h-dvh bg-white">
        <a
          href="#main"
          className="sr-only z-[200] rounded-full bg-deep px-4 py-2 text-sm text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
