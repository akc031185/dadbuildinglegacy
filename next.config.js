/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable TypeScript checking (remove temporary workaround)
  typescript: {
    ignoreBuildErrors: false,
  },
  // Clean image configuration
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com"],
  },
  // Simplify headers
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
}

module.exports = nextConfig