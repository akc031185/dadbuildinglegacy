import Link from "next/link";
import connectToDatabase from "@/lib/db";
import Post, { IPost } from "@/models/Post";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/button";

async function getLatestPosts(): Promise<IPost[]> {
  try {
    await connectToDatabase();
    
    const posts = await Post.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean()
      .exec();

    // Convert MongoDB ObjectId to string for serialization
    return posts.map(post => ({
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    })) as IPost[];
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    return [];
  }
}

export async function JournalPreview() {
  const posts = await getLatestPosts();
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Latest from the Journal
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughts, lessons, and insights from my journey in real estate, AI, and health.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              title={post.title}
              excerpt={post.excerpt}
              slug={post.slug}
              tags={post.tags}
              createdAt={post.createdAt}
            />
          ))}
        </div>

        <div className="text-center">
          <Link href="/journal">
            <Button size="lg" variant="outline">
              View All Journal Entries
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}