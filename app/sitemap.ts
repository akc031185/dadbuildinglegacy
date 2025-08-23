import { MetadataRoute } from 'next';
import connectToDatabase from '@/lib/db';
import Post from '@/models/Post';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dadbuildinglegacy.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/journal`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/journal?tag=ai`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/journal?tag=health`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/legal`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Dynamic journal posts
  let dynamicPages: MetadataRoute.Sitemap = [];
  
  try {
    await connectToDatabase();
    
    const posts = await Post.find({ published: true })
      .sort({ createdAt: -1 })
      .select('slug updatedAt')
      .lean()
      .exec();

    dynamicPages = posts.map((post) => ({
      url: `${baseUrl}/journal/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error generating sitemap for posts:', error);
  }

  return [...staticPages, ...dynamicPages];
}