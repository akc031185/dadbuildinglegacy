import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enable any experimental features if needed
  },
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

export default nextConfig;