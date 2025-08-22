import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/button";

// Mock data - will be replaced with real data from MongoDB
const mockPosts = [
  {
    _id: "1",
    title: "Building My First AI Agent with Claude",
    slug: "building-first-ai-agent-claude",
    excerpt: "Documenting my journey learning to build AI agents using Claude Code and exploring how this can enhance my real estate business workflows.",
    tags: ["ai"],
    createdAt: "2024-12-15T00:00:00.000Z",
    published: true
  },
  {
    _id: "2", 
    title: "Weight Loss Progress: Month 3 Update",
    slug: "weight-loss-month-3-update",
    excerpt: "Three months into my weight loss journey. Sharing what's working, what isn't, and the lessons learned about consistency and mindset.",
    tags: ["health"],
    createdAt: "2024-12-10T00:00:00.000Z",
    published: true
  },
  {
    _id: "3",
    title: "Creative Finance Deal Analysis: Subject-To Strategy",
    slug: "creative-finance-subject-to-analysis",
    excerpt: "Breaking down a recent subject-to deal opportunity and the key factors I analyze when evaluating these creative finance strategies.",
    tags: ["ai"],
    createdAt: "2024-12-05T00:00:00.000Z",
    published: true
  }
];

export function JournalPreview() {
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
          {mockPosts.map((post) => (
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