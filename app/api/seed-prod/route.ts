import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Post from "@/models/Post";

export async function POST(request: Request) {
  try {
    // Simple auth check - require admin token
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== 'Bearer dbl-admin-2024-secure-token-xyz') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    console.log('Connected to database for seeding');

    // Clear existing posts
    await Post.deleteMany({});
    console.log('Cleared existing posts');

    // Create sample posts
    const samplePosts = [
      {
        title: "Building My First AI Agent with Claude",
        slug: "building-first-ai-agent-claude",
        excerpt: "Documenting my journey learning to build AI agents using Claude API. From basic prompts to complex workflows.",
        content: "I've been fascinated by AI agents and decided to dive deep into building one using Claude API. This post covers the basics of prompt engineering, API integration, and the challenges I faced getting started.\n\nKey learnings:\n• Understanding prompt structure and context\n• Managing API calls and rate limits\n• Building reliable error handling\n• Creating useful agent personalities\n\nThe journey has been incredible so far, and I'm excited to share more as I build more complex agents.",
        tags: ["ai"],
        published: true
      },
      {
        title: "Weight Loss Progress: Month 3 Update", 
        slug: "weight-loss-month-3-update",
        excerpt: "Three months into my health transformation journey. Sharing progress, challenges, and what's working.",
        content: "Three months ago, I committed to transforming my health and building better habits. Here's an honest update on my progress.\n\nStats so far:\n• Lost 15 pounds\n• Increased energy levels significantly\n• Building consistent workout routine\n• Better sleep quality\n\nThe biggest challenge has been consistency, especially with travel for real estate deals. But I've learned to adapt and find workouts I can do anywhere.\n\nNext month's focus: Adding more strength training and meal prep consistency.",
        tags: ["health"],
        published: true
      },
      {
        title: "Creative Finance Deal Analysis: Subject-To Strategy",
        slug: "creative-finance-subject-to-analysis", 
        excerpt: "Breaking down a recent subject-to deal and how AI tools helped with analysis and documentation.",
        content: "Just closed on an interesting subject-to deal that perfectly demonstrates how technology can enhance traditional real estate strategies.\n\nDeal breakdown:\n• Property value: $180,000\n• Existing mortgage: $145,000\n• Monthly payment: $1,200\n• Rental income: $1,650\n• Net cash flow: $450/month\n\nWhat made this unique was using AI tools for:\n• Market analysis and comps\n• Risk assessment calculations\n• Legal documentation review\n• Financial modeling scenarios\n\nThe combination of creative finance knowledge and AI assistance made this deal analysis much more thorough and efficient than traditional methods.",
        tags: ["ai"],
        published: true
      }
    ];

    const createdPosts = await Post.insertMany(samplePosts);
    console.log('Created posts:', createdPosts.length);

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${createdPosts.length} posts in production database`,
      posts: createdPosts.map(post => ({ 
        title: post.title, 
        slug: post.slug, 
        tags: post.tags 
      }))
    });

  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}