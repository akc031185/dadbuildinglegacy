import Link from "next/link";
// Temporarily disabled for deployment
// import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Post Not Found</h2>
          <p className="text-muted-foreground">
            The journal post you're looking for doesn't exist or may have been moved.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/journal" className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
              Browse Journal
            </Link>
            <Link href="/" className="inline-block border border-input bg-background px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
              Back to Home
            </Link>
          </div>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>Looking for something specific?</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="/journal?tag=ai" className="hover:text-foreground transition-colors">
              AI Posts
            </Link>
            <Link href="/journal?tag=health" className="hover:text-foreground transition-colors">
              Health Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}