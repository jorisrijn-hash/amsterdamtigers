import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Loader } from "@/components/Loader";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StatusBar } from "@/components/StatusBar";
import { CustomCursor } from "@/components/CustomCursor";
import { CLUB, SITE_URL } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${CLUB.name} - ${CLUB.tagline}`,
    template: `%s - ${CLUB.name}`,
  },
  description:
    "Amsterdam Tigers ijshockeyclub. Wedstrijden, team, nieuws, tickets en meer vanaf de Jaap Edenbaan in Amsterdam.",
  keywords: ["Amsterdam Tigers", "ijshockey", "hockey", "Amsterdam", "Jaap Eden"],
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: CLUB.name,
    title: `${CLUB.name} - ${CLUB.tagline}`,
    description: "IJshockey uit de hoofdstad. Wedstrijden, team, nieuws en tickets.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${CLUB.name} - ${CLUB.tagline}`,
    description: "IJshockey uit de hoofdstad.",
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0d0f12",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SportsTeam",
        "@id": `${SITE_URL}/#team`,
        name: CLUB.name,
        sport: CLUB.sport,
        url: SITE_URL,
        logo: `${SITE_URL}/icon-512.png`,
        image: `${SITE_URL}/opengraph-image.png`,
        description: `${CLUB.name} - ${CLUB.tagline}.`,
        location: {
          "@type": "Place",
          name: CLUB.venue,
          address: {
            "@type": "PostalAddress",
            addressLocality: CLUB.city,
            addressCountry: CLUB.country,
          },
        },
        sameAs: [CLUB.instagram],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: CLUB.name,
        url: SITE_URL,
        inLanguage: "nl-NL",
      },
    ],
  };

  return (
    <html lang="nl" className={`${archivo.variable} ${jetbrains.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <Loader />
          <Nav />
          <div className="pb-14">
            <main>{children}</main>
            <Footer />
          </div>
          <StatusBar />
        </SmoothScroll>
        <CustomCursor />
      </body>
    </html>
  );
}
