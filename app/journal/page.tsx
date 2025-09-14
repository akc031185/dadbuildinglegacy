import { Suspense } from "react";
import Link from "next/link";

interface JournalPageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function JournalPage({ searchParams }: JournalPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Link 
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Journal
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Journal functionality is temporarily unavailable while we resolve deployment issues. 
              Content will be restored soon.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-muted/30 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">
                Coming Back Soon
              </h2>
              <p className="text-muted-foreground mb-6">
                I share my journey with AI tools, health transformation, and real estate investing. 
                The journal will be back online shortly.
              </p>
              <Link 
                href="/#contact"
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
              >
                Get Updates
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}