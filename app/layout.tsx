import type { Metadata, Viewport } from "next";
// Previous heading font — uncomment (and swap back below) to revert.
// import { Fraunces, Inter } from "next/font/google";
import { Playfair_Display, Inter } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import { siteUrl } from "@/lib/data";
import { getContent } from "@/lib/content";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";

export const revalidate = 60;

// const fraunces = Fraunces({
//   subsets: ["latin"],
//   weight: ["400", "500", "600"],
//   style: ["normal", "italic"],
//   variable: "--font-display",
//   display: "swap",
// });

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const title =
  "Decorcity Vision — Interior Designer & Furniture Manufacturer in Bhilai, Durg, Rajnandgaon";
const description =
  "Decorcity Vision — interior designer, furniture manufacturer, modular kitchen dealer, painting studio and Vastu consultant serving Bhilai, Durg and Rajnandgaon since 2011. 500+ homes done, 10-year warranty, ISO certified, 24x7 phone consultation.";

// Async so the keywords list can come from Sanity's siteSettings.seo.keywords
// when it's been filled in there — falls back to the static list otherwise.
export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: "%s | Decorcity Vision",
    },
    description,
    keywords: content.seoKeywords,
    authors: [{ name: "Decorcity Vision" }],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: siteUrl,
      siteName: "Decorcity Vision",
      title,
      description,
      images: [{ url: "/logo-full.png", width: 1376, height: 435, alt: "Decorcity Vision" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo-full.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1F1F1F",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();

  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="font-sans bg-cream text-ink antialiased">
        <JsonLd
          contact={content.contact}
          serviceAreas={content.serviceAreas}
          keywords={content.seoKeywords}
          youtubeChannelUrl={content.youtubeChannelUrl}
        />
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
