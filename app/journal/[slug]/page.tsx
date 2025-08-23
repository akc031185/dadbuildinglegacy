import { notFound } from "next/navigation";
import { Metadata } from "next";
import connectToDatabase from "@/lib/db";
import Post, { IPost } from "@/models/Post";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface PostPageProps {
  params: { slug: string };
}

async function getPost(slug: string): Promise<IPost | null> {
  try {
    await connectToDatabase();
    
    const post = await Post.findOne({ slug, published: true })
      .lean()
      .exec();

    if (!post) {
      return null;
    }

    // Convert MongoDB ObjectId to string for serialization
    return {
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    } as IPost;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

async function getRelatedPosts(currentSlug: string, tags: string[]): Promise<IPost[]> {
  try {
    await connectToDatabase();
    
    const posts = await Post.find({
      slug: { $ne: currentSlug },
      tags: { $in: tags },
      published: true
    })
    .sort({ createdAt: -1 })
    .limit(3)
    .lean()
    .exec();

    return posts.map(post => ({
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    })) as IPost[];
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found - Dad Building Legacy",
      description: "The requested post could not be found.",
    };
  }

  return {
    title: `${post.title} - Dad Building Legacy`,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    authors: [{ name: "Abhishek Choudhary" }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: ["Abhishek Choudhary"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function formatReadingTime(content: string) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min read`;
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.tags);

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
            
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/journal?tag=${tag}`}>
                  <Badge variant="secondary" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-12">
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/journal?tag=${tag}`}>
                    <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                      {tag === "ai" ? "AI Tools" : "Health"}
                    </Badge>
                  </Link>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-4 text-muted-foreground text-sm">
                <time dateTime={post.createdAt}>
                  {formatDate(post.createdAt)}
                </time>
                <span>•</span>
                <span>{formatReadingTime(post.content)}</span>
                <span>•</span>
                <span>By Abhishek Choudhary</span>
              </div>
              
              {post.excerpt && (
                <p className="text-xl text-muted-foreground mt-6 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
            </header>

            <Separator className="mb-12" />

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="content"
                dangerouslySetInnerHTML={{ 
                  __html: post.content.replace(/\n/g, '<br />') 
                }} 
              />
            </div>

            <Separator className="my-12" />

            {/* Author Bio */}
            <div className="bg-muted/30 rounded-lg p-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                  AC
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Abhishek Choudhary</h3>
                  <p className="text-muted-foreground mb-4">
                    Real estate investor & private lender • AI learner • Health journey. 
                    Indian immigrant, dad, building legacy through wealth, health, and learning.
                  </p>
                  <div className="flex gap-4">
                    <Link 
                      href="https://instagram.com/dadbuildinglegacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Instagram
                    </Link>
                    <Link 
                      href="https://linkedin.com/in/abhishek-choudhary"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      LinkedIn
                    </Link>
                    <Link 
                      href="/#contact"
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Get in Touch
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-8">Related Posts</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost._id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {relatedPost.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="font-semibold mb-2">
                        <Link 
                          href={`/journal/${relatedPost.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <time className="text-xs text-muted-foreground">
                        {formatDate(relatedPost.createdAt)}
                      </time>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}