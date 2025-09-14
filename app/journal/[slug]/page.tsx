import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

// Temporarily disabled for deployment
// import connectToDatabase from "@/lib/db";
// import Post, { IPost } from "@/models/Post";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  return {
    title: "Journal - Dad Building Legacy",
    description: "Journal content temporarily unavailable during deployment.",
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/journal"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Journal
            </Link>
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Journal Content Temporarily Unavailable
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're currently resolving deployment issues. Journal functionality will be restored soon.
            </p>
            <Link 
              href="/"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}