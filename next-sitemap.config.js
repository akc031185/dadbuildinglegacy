/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://dadbuildinglegacy.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // For smaller sites, we don't need index sitemap
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: [
    '/api/*',
    '/admin/*',
    '/_next/*'
  ],
  transform: async (config, path) => {
    // Custom priority for different pages
    const priorities = {
      '/': 1.0,
      '/build-my-site': 0.95,
      '/website-request': 0.9,
      '/journal': 0.9,
      '/legal': 0.5
    };

    // Higher frequency for journal pages
    const changefreqs = {
      '/': 'weekly',
      '/build-my-site': 'weekly',
      '/website-request': 'weekly',
      '/journal': 'weekly',
      '/legal': 'monthly'
    };

    return {
      loc: path,
      changefreq: changefreqs[path] || config.changefreq,
      priority: priorities[path] || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/*.json$',
          '/test-email'
        ]
      }
    ],
    additionalSitemaps: [
      // Add dynamic sitemap for journal posts if needed in the future
    ],
  },
};