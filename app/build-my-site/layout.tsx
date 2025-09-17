import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Build My Website - Professional Website Creation Services | Dad Building Legacy',
  description: 'Get a professional website built for your business with domain search, hosting, custom design, and AI-powered logo generation. Fast turnaround, transparent pricing, and ongoing support included.',
  keywords: [
    'website builder',
    'professional website creation',
    'custom website design',
    'domain registration',
    'web hosting',
    'AI logo generation',
    'business website',
    'website development',
    'responsive web design',
    'small business website',
    'LLC website',
    'company website',
    'website maintenance',
    'SEO optimization',
    'mobile-friendly website'
  ],
  openGraph: {
    title: 'Build My Website - Professional Website Creation Services',
    description: 'Professional website creation with domain search, hosting, custom design, and AI logo generation. Get your business online quickly with transparent pricing.',
    type: 'website',
    url: 'https://dadbuildinglegacy.com/build-my-site',
    images: [
      {
        url: '/build-my-site-og.png',
        width: 1200,
        height: 630,
        alt: 'Build My Website - Professional Website Creation Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Build My Website - Professional Website Creation Services',
    description: 'Professional website creation with domain search, hosting, custom design, and AI logo generation.',
    images: ['/build-my-site-og.png'],
  },
  alternates: {
    canonical: '/build-my-site',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function BuildMySiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Professional Website Creation Services",
    "description": "Complete website creation service including domain registration, hosting, custom design, and AI-powered logo generation for businesses and LLCs.",
    "provider": {
      "@type": "Person",
      "name": "Abhishek Choudhary",
      "url": "https://dadbuildinglegacy.com"
    },
    "serviceType": "Website Development",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Website Creation Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Website Design",
            "description": "Professional website design tailored to your business needs"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Domain Registration",
            "description": "Help finding and registering the perfect domain name for your business"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Logo Generation",
            "description": "AI-powered logo creation based on your business description and preferences"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Hosting",
            "description": "Reliable web hosting with SSL certificates and ongoing maintenance"
          }
        }
      ]
    },
    "offers": {
      "@type": "Offer",
      "price": "299",
      "priceCurrency": "USD",
      "description": "Complete website creation package starting at $299 including design, development, and first year hosting"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      {children}
    </>
  )
}