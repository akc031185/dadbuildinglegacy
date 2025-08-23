import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PWAManager } from "@/components/PWAManager";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Abhishek Choudhary - Dad Building Legacy",
    template: "%s - Dad Building Legacy"
  },
  description: "Real estate investor & private lender • AI learner • Health journey. Indian immigrant, dad, building legacy through creative finance, AI tools, and health transformation.",
  keywords: [
    "real estate investor", 
    "private lending", 
    "subject to deals", 
    "creative finance",
    "AI tools", 
    "artificial intelligence",
    "health transformation", 
    "weight loss journey",
    "wealth building", 
    "legacy building",
    "Indian immigrant entrepreneur",
    "SubTo community",
    "Gator community",
    "real estate education"
  ],
  authors: [{ name: "Abhishek Choudhary", url: "https://dadbuildinglegacy.com" }],
  creator: "Abhishek Choudhary",
  publisher: "Dad Building Legacy",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://dadbuildinglegacy.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dadbuildinglegacy.com",
    title: "Abhishek Choudhary - Dad Building Legacy",
    description: "Real estate investor & private lender • AI learner • Health journey. Building legacy through creative finance, AI tools, and health transformation.",
    siteName: "Dad Building Legacy",
    images: [
      {
        url: "/og-image.png", // We'll create this later
        width: 1200,
        height: 630,
        alt: "Dad Building Legacy - Abhishek Choudhary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dadbuildinglegacy",
    creator: "@dadbuildinglegacy",
    title: "Abhishek Choudhary - Dad Building Legacy",
    description: "Real estate investor & private lender • AI learner • Health journey",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION, // Add to env when available
  },
  category: "Personal Development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Dad Building Legacy" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Dad Building Legacy" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://dadbuildinglegacy.com/#person",
                  name: "Abhishek Choudhary",
                  alternateName: "Dad Building Legacy",
                  jobTitle: "Real Estate Investor & Private Lender",
                  description: "Indian immigrant, dad, and entrepreneur building legacy through real estate investing, AI exploration, and health transformation.",
                  url: "https://dadbuildinglegacy.com",
                  image: "https://dadbuildinglegacy.com/og-image.png",
                  sameAs: [
                    "https://instagram.com/dadbuildinglegacy",
                    "https://linkedin.com/in/abhishek-choudhary",
                    "https://equinestventures.com",
                    "https://fundyourfixandflip.com",
                    "https://investoraiclub.com"
                  ],
                  knowsAbout: [
                    "Real Estate Investing",
                    "Private Lending", 
                    "Subject-To Deals",
                    "Creative Finance",
                    "Artificial Intelligence",
                    "Health & Fitness",
                    "Weight Loss",
                    "Legacy Building"
                  ],
                  memberOf: [
                    {
                      "@type": "Organization",
                      "name": "SubTo Community"
                    },
                    {
                      "@type": "Organization", 
                      "name": "Gator Community"
                    }
                  ],
                  owns: [
                    {
                      "@type": "Organization",
                      "name": "EquiNest Ventures",
                      "url": "https://equinestventures.com"
                    },
                    {
                      "@type": "Organization",
                      "name": "Fund Your Fix & Flip", 
                      "url": "https://fundyourfixandflip.com"
                    }
                  ]
                },
                {
                  "@type": "Website",
                  "@id": "https://dadbuildinglegacy.com/#website",
                  url: "https://dadbuildinglegacy.com",
                  name: "Dad Building Legacy",
                  description: "Personal website and journal of Abhishek Choudhary documenting his journey in real estate investing, AI tools, and health transformation.",
                  publisher: {
                    "@id": "https://dadbuildinglegacy.com/#person"
                  },
                  inLanguage: "en-US"
                },
                {
                  "@type": "WebPage",
                  "@id": "https://dadbuildinglegacy.com/#webpage",
                  url: "https://dadbuildinglegacy.com",
                  name: "Abhishek Choudhary - Dad Building Legacy",
                  isPartOf: {
                    "@id": "https://dadbuildinglegacy.com/#website"
                  },
                  about: {
                    "@id": "https://dadbuildinglegacy.com/#person"
                  },
                  description: "Real estate investor & private lender • AI learner • Health journey. Building legacy through creative finance, AI tools, and health transformation.",
                  inLanguage: "en-US"
                }
              ]
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          {children}
          <PWAManager />
        </div>
      </body>
    </html>
  );
}