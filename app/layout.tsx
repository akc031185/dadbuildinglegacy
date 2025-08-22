import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abhishek Choudhary - Dad Building Legacy",
  description: "Real estate investor & private lender • AI learner • Health journey",
  keywords: ["real estate", "private lending", "AI", "health", "wealth building", "legacy"],
  authors: [{ name: "Abhishek Choudhary" }],
  creator: "Abhishek Choudhary",
  metadataBase: new URL("https://dadbuildinglegacy.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dadbuildinglegacy.com",
    title: "Abhishek Choudhary - Dad Building Legacy",
    description: "Real estate investor & private lender • AI learner • Health journey",
    siteName: "Dad Building Legacy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhishek Choudhary - Dad Building Legacy",
    description: "Real estate investor & private lender • AI learner • Health journey",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Abhishek Choudhary",
              jobTitle: "Real Estate Investor & Private Lender",
              url: "https://dadbuildinglegacy.com",
              sameAs: [
                "https://instagram.com/dadbuildinglegacy",
                "https://linkedin.com/in/abhishek-choudhary",
              ],
              knowsAbout: ["Real Estate", "Private Lending", "AI", "Health & Fitness"],
              description: "Indian immigrant, dad, building legacy through wealth, health, and learning.",
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  );
}