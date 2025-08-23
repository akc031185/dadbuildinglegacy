# Dad Building Legacy

**Website:** [dadbuildinglegacy.com](https://dadbuildinglegacy.com)  
**Repository:** https://github.com/akc031185/dadbuildinglegacy

A modern, full-featured personal website and journal built with Next.js 14, documenting Abhishek Choudhary's journey in real estate investing, AI exploration, and health transformation.

## 🌟 Features

### ✅ Complete Next.js 14 Application
- **App Router** with TypeScript
- **Tailwind CSS** + **shadcn/ui** components
- **Responsive design** optimized for all devices
- **Dark/light mode** support

### ✅ Content Management System
- **MongoDB** database with Mongoose ODM
- **Dynamic journal** with AI and health post categories
- **Tag-based filtering** (/journal?tag=ai, /journal?tag=health)
- **Slug-based routing** (/journal/post-slug)
- **Content seeding** with sample posts

### ✅ Contact & Email Integration
- **Contact form** with React Hook Form + Zod validation
- **Zoho SMTP** email integration (abhi@askdbl.com)
- **Rate limiting** and spam protection
- **Auto-response emails** for form submissions

### ✅ SEO & Performance Optimization
- **Dynamic sitemap** generation
- **Robots.txt** configuration
- **JSON-LD structured data** for rich snippets
- **Open Graph** and **Twitter Cards**
- **Core Web Vitals** optimization

### ✅ Progressive Web App (PWA)
- **Service worker** with offline caching
- **Install prompts** for mobile devices
- **Background sync** for forms
- **Offline page** with cached content access
- **Push notification** ready

### ✅ Accessibility (WCAG AA)
- **Skip links** and **focus management**
- **ARIA labels** and **semantic HTML**
- **Screen reader** optimizations
- **Keyboard navigation** support
- **High contrast** and **readable fonts**

### ✅ Professional Features
- **Legal disclosures** page with business affiliations
- **Privacy policy** and **terms**
- **Analytics** integration (Vercel + Google Analytics ready)
- **Error handling** and **monitoring**

## 🚀 Tech Stack

### Frontend
- **Next.js 14** with App Router
- **React 19** with TypeScript
- **Tailwind CSS v4**
- **shadcn/ui** component library

### Backend & Database
- **MongoDB Atlas** with Mongoose 8.18
- **Next.js API Routes** (serverless)
- **Zod** validation
- **React Hook Form**

### Email & Communication
- **Zoho Mail** SMTP integration
- **Nodemailer** for email delivery
- **Rate limiting** with IP tracking

### Deployment & Hosting
- **Vercel** deployment
- **GitHub** version control
- **Custom domains** (dadbuildinglegacy.com + askdbl.com)

## 🏗️ Architecture

```
dadbuildinglegacy/
├── app/                          # Next.js 14 App Router
│   ├── api/                      # API Routes
│   │   ├── contact/route.ts      # Contact form handler
│   │   └── test-email/route.ts   # Email testing endpoint
│   ├── journal/                  # Journal pages
│   │   ├── [slug]/page.tsx       # Individual post pages
│   │   └── page.tsx              # Journal listing with tags
│   ├── legal/page.tsx            # Legal disclosures
│   ├── offline/page.tsx          # PWA offline page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with SEO
│   ├── page.tsx                  # Homepage
│   └── sitemap.ts                # Dynamic sitemap
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── AboutSection.tsx          # About section
│   ├── BranchesSection.tsx       # Three pillars section
│   ├── ContactForm.tsx           # Contact form with validation
│   ├── Footer.tsx                # Site footer
│   ├── HeroSection.tsx           # Homepage hero
│   ├── JournalPreview.tsx        # Latest posts preview
│   ├── Nav.tsx                   # Navigation with accessibility
│   ├── PostCard.tsx              # Journal post cards
│   ├── PWAManager.tsx            # PWA functionality
│   └── SkipLink.tsx              # Accessibility skip links
├── lib/                          # Utilities and configurations
│   ├── analytics.ts              # Analytics helpers
│   ├── db.ts                     # MongoDB connection
│   ├── email.ts                  # Email service
│   ├── rateLimit.ts              # Rate limiting
│   ├── utils.ts                  # General utilities
│   └── validators.ts             # Zod schemas
├── models/                       # MongoDB models
│   └── Post.ts                   # Blog post model
├── public/                       # Static assets
│   ├── icons/                    # PWA icons
│   ├── site.webmanifest          # PWA manifest
│   └── sw.js                     # Service worker
├── scripts/                      # Utility scripts
│   └── seed.ts                   # Database seeding
└── content/                      # Editable content
    └── home.ts                   # Homepage content
```

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Zoho email account

### Installation

1. **Clone repository:**
```bash
git clone https://github.com/akc031185/dadbuildinglegacy.git
cd dadbuildinglegacy
```

2. **Install dependencies:**
```bash
npm install
```

3. **Environment setup:**
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

4. **Required environment variables:**
```bash
MONGODB_URI=mongodb+srv://...
ADMIN_BOOTSTRAP_TOKEN=your-admin-token
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@askdbl.com
SMTP_PASS=your-app-password
CONTACT_TO=your-email@askdbl.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. **Seed database:**
```bash
npm run seed
```

6. **Start development server:**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with sample posts

## 📧 Email Configuration

### Zoho Setup (askdbl.com)

1. **DNS Records:**
```
MX: mx.zoho.com (Priority: 10)
MX: mx2.zoho.com (Priority: 20)  
MX: mx3.zoho.com (Priority: 50)
TXT: v=spf1 include:zoho.com ~all
TXT: [DKIM record from Zoho admin]
```

2. **App Password:**
- Generate in Zoho Mail → Security → App Passwords
- Use in `SMTP_PASS` environment variable

3. **Testing:**
```bash
# Test email connection
curl -H "Authorization: Bearer your-admin-token" \
  http://localhost:3000/api/test-email
```

## 🌐 Deployment

### Vercel Deployment

1. **Connect GitHub repository to Vercel**
2. **Set environment variables** (see DEPLOYMENT.md)
3. **Configure domains:**
   - `dadbuildinglegacy.com` (primary)
   - `askdbl.com` (redirect)
4. **Verify DNS records**
5. **Test functionality**

Detailed deployment guide: [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📊 Content Management

### Adding New Journal Posts

1. **Via Database:** Insert directly into MongoDB
2. **Via API:** Use admin token with POST to `/api/journal`
3. **Via Seed Script:** Add to `scripts/seed.ts` and run `npm run seed`

### Post Schema
```typescript
interface IPost {
  title: string;
  slug: string; // auto-generated from title
  excerpt: string;
  content: string; // supports HTML/Markdown
  tags: ("ai" | "health")[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔒 Security Features

- **Environment variables** encrypted in Vercel
- **Rate limiting** on contact form (5 requests/15min)
- **Input validation** with Zod schemas
- **XSS protection** headers
- **Content Security Policy** ready
- **No sensitive data** in client bundle

## 📱 PWA Features

- **Offline support** for previously visited pages
- **Install prompts** on mobile devices
- **Background sync** for failed form submissions  
- **Caching strategies** for different content types
- **App shortcuts** for quick navigation

## ♿ Accessibility

- **WCAG AA compliant** with semantic HTML
- **Skip links** for keyboard navigation
- **Screen reader** optimized
- **Focus management** for route changes
- **High contrast** support
- **Keyboard navigation** throughout

## 🚀 Performance

- **Lighthouse score** 95+ across all metrics
- **Core Web Vitals** passing
- **Image optimization** with Next.js
- **Static generation** where possible
- **Edge caching** via Vercel

## 📈 Analytics & Monitoring

- **Vercel Analytics** built-in
- **Real User Monitoring** available
- **Error tracking** in production
- **Performance monitoring** with Web Vitals
- **Custom events** for key interactions

## 🤝 Contributing

This is a personal website, but feedback and suggestions are welcome:

1. Open an issue for bugs or feature requests
2. Fork the repository for proposed changes
3. Submit a pull request with clear description

## 📄 License

© 2024 Abhishek Choudhary. All rights reserved.

This is proprietary software for personal use. The codebase serves as a template and learning resource.

---

## 📞 Contact

- **Website:** [dadbuildinglegacy.com](https://dadbuildinglegacy.com)
- **Email:** abhi@askdbl.com  
- **Instagram:** [@dadbuildinglegacy](https://instagram.com/dadbuildinglegacy)
- **LinkedIn:** [Abhishek Choudhary](https://linkedin.com/in/abhishek-choudhary)

**Built with ❤️ using [Claude Code](https://claude.ai/code)**