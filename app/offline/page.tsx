import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Offline - Dad Building Legacy",
  description: "You're currently offline. Some content may not be available.",
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.18l6.364 6.364-6.364 6.364L5.636 8.544 12 2.18z"
                />
              </svg>
            </div>
            <CardTitle className="text-2xl">You're Offline</CardTitle>
          </CardHeader>
          
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              It looks like you've lost your internet connection. Don't worry - you can still browse some cached content!
            </p>

            <div className="space-y-3">
              <h3 className="font-semibold">Available Offline:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Previously viewed journal posts</li>
                <li>• Cached homepage content</li>
                <li>• Basic site navigation</li>
              </ul>
            </div>

            <div className="pt-4 space-y-3">
              <Link href="/">
                <Button className="w-full">
                  Go to Homepage
                </Button>
              </Link>
              
              <Link href="/journal">
                <Button variant="outline" className="w-full">
                  Browse Journal
                </Button>
              </Link>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Your connection will be restored automatically when back online.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Offline indicator */}
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            No internet connection
          </div>
        </div>
      </div>
    </div>
  );
}