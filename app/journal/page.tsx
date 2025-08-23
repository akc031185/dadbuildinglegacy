import { Suspense } from "react";
import connectToDatabase from "@/lib/db";

// Force dynamic rendering to ensure fresh data from database
export const dynamic = 'force-dynamic';
import Post, { IPost } from "@/models/Post";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface JournalPageProps {
  searchParams: Promise<{ tag?: string }>;
}

async function getPosts(tag?: string): Promise<any[]> {
  try {
    await connectToDatabase();
    
    const filter = tag ? { tags: tag, published: true } : { published: true };
    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    // Convert MongoDB ObjectId to string for serialization
    return posts.map(post => ({
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

async function getPostCounts(): Promise<{ ai: number; health: number; total: number }> {
  try {
    await connectToDatabase();
    
    const [aiCount, healthCount, totalCount] = await Promise.all([
      Post.countDocuments({ tags: "ai", published: true }),
      Post.countDocuments({ tags: "health", published: true }),
      Post.countDocuments({ published: true })
    ]);

    return { ai: aiCount, health: healthCount, total: totalCount };
  } catch (error) {
    console.error("Error fetching post counts:", error);
    return { ai: 0, health: 0, total: 0 };
  }
}

function PostsGrid({ posts }: { posts: any[] }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No posts found</h3>
        <p className="text-muted-foreground mb-6">
          There are no published posts in this category yet.
        </p>
        <Link href="/journal">
          <Button variant="outline">View All Posts</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard
          key={post._id.toString()}
          title={post.title}
          excerpt={post.excerpt}
          slug={post.slug}
          tags={post.tags}
          createdAt={post.createdAt}
          coverImage={post.coverImage}
        />
      ))}
    </div>
  );
}

export default async function JournalPage({ searchParams }: JournalPageProps) {
  const { tag: selectedTag } = await searchParams;
  const [posts, counts] = await Promise.all([
    getPosts(selectedTag),
    getPostCounts()
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Learning Journal
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Documenting my journey in real estate, AI tools, and health transformation. 
              Lessons learned, insights gained, and progress shared.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-sm">
                {counts.total} Total Posts
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {counts.ai} AI Posts
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {counts.health} Health Posts
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Home
            </Link>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Filter:</span>
              <div className="flex gap-2">
                <Link href="/journal">
                  <Button 
                    variant={!selectedTag ? "default" : "outline"} 
                    size="sm"
                  >
                    All
                  </Button>
                </Link>
                <Link href="/journal?tag=ai">
                  <Button 
                    variant={selectedTag === "ai" ? "default" : "outline"} 
                    size="sm"
                  >
                    AI Tools
                  </Button>
                </Link>
                <Link href="/journal?tag=health">
                  <Button 
                    variant={selectedTag === "health" ? "default" : "outline"} 
                    size="sm"
                  >
                    Health
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {selectedTag && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">
                  {selectedTag === "ai" ? "AI Tools & Learning" : "Health & Fitness"}
                </h2>
                <p className="text-muted-foreground">
                  {selectedTag === "ai" 
                    ? "Exploring AI tools, building agents, and documenting my learning journey."
                    : "My health transformation journey, fitness progress, and wellness insights."
                  }
                </p>
                <Separator className="mt-4" />
              </div>
            )}

            <Suspense fallback={
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            }>
              <PostsGrid posts={posts} />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}