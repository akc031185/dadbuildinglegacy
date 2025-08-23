import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Post from "@/models/Post";

export async function GET() {
  try {
    console.log('🔍 Debug: Attempting database connection...');
    await connectToDatabase();
    console.log('✅ Debug: Connected to database');
    
    console.log('🔍 Debug: Fetching posts...');
    const posts = await Post.find({ published: true })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    
    console.log('✅ Debug: Found posts:', posts.length);
    
    const serializedPosts = posts.map(post => ({
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));
    
    return NextResponse.json({
      success: true,
      count: posts.length,
      posts: serializedPosts
    });
  } catch (error) {
    console.error('❌ Debug: Error fetching posts:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}