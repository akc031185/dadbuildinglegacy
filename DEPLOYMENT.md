# Deployment Guide - Dad Building Legacy

This guide covers deploying the Dad Building Legacy website to Vercel with custom domain configuration.

## Prerequisites

- GitHub repository: https://github.com/akc031185/dadbuildinglegacy
- Vercel account
- MongoDB Atlas database (already configured)
- Zoho email account: `abhi@askdbl.com` (already set up)
- Domain names: `dadbuildinglegacy.com` and `askdbl.com`

## Step 1: Vercel Deployment

### 1.1 Connect Repository
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import `akc031185/dadbuildinglegacy` repository
5. Framework: Next.js (auto-detected)
6. Root Directory: `./` (default)

### 1.2 Environment Variables
Set the following environment variables in Vercel:

```bash
# MongoDB Connection
MONGODB_URI=mongodb+srv://dadbuildinglegacy-admin:Humtum12$@dbl.z78vsxc.mongodb.net/dadbuildinglegacy?retryWrites=true&w=majority&appName=dbl

# Admin Authentication  
ADMIN_BOOTSTRAP_TOKEN=dbl-admin-2024-secure-token-xyz

# Email Configuration (Zoho)
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=abhi@askdbl.com
SMTP_PASS=your-zoho-app-password
CONTACT_TO=abhi@askdbl.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://dadbuildinglegacy.com

# Environment
NODE_ENV=production
```

### 1.3 Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Verify deployment at the generated Vercel URL

## Step 2: Domain Configuration

### 2.1 Add Domains to Vercel
1. Go to Project Settings → Domains
2. Add domains:
   - `dadbuildinglegacy.com` (primary)
   - `www.dadbuildinglegacy.com`
   - `askdbl.com` (redirect)

### 2.2 DNS Configuration

#### For dadbuildinglegacy.com (Primary Domain)
**If using Vercel DNS:**
- Type: `A` Record
- Name: `@`
- Value: `76.76.21.21`
- TTL: `300`

- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`
- TTL: `300`

**If using external DNS:**
- Type: `A` Record  
- Name: `@`
- Value: `76.76.21.21`

- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

#### For askdbl.com (Redirect Domain)
**Option 1: Domain Forwarding (Recommended)**
Set up 301 redirect from `askdbl.com` → `https://dadbuildinglegacy.com` while keeping MX records for email.

**Option 2: Vercel Project**
Create separate Vercel project with redirect configuration:
```json
{
  "redirects": [
    {
      "source": "/(.*)",
      "destination": "https://dadbuildinglegacy.com/$1",
      "permanent": true
    }
  ]
}
```

### 2.3 SSL Certificates
- Vercel automatically provisions SSL certificates
- Verify HTTPS is working for all domains
- Check SSL rating at [SSL Labs](https://www.ssllabs.com/ssltest/)

## Step 3: Email Configuration (Zoho)

### 3.1 DNS Records for askdbl.com
**MX Records:**
```
Type: MX, Host: @, Value: mx.zoho.com, Priority: 10, TTL: 3600
Type: MX, Host: @, Value: mx2.zoho.com, Priority: 20, TTL: 3600  
Type: MX, Host: @, Value: mx3.zoho.com, Priority: 50, TTL: 3600
```

**TXT Records:**
```
# SPF Record
Type: TXT, Host: @, Value: v=spf1 include:zoho.com ~all, TTL: 3600

# DKIM Record (get from Zoho admin)
Type: TXT, Host: zoho._domainkey, Value: [DKIM-value-from-Zoho], TTL: 3600

# Domain Verification (get from Zoho admin)
Type: TXT, Host: @, Value: zoho-verification=[token], TTL: 3600

# DMARC Record
Type: TXT, Host: _dmarc, Value: v=DMARC1; p=quarantine; rua=mailto:postmaster@askdbl.com; pct=100, TTL: 3600
```

### 3.2 App Password Setup
1. Go to Zoho Mail → Settings → Security → App Passwords
2. Generate new app password for "Dad Building Legacy Site"
3. Update `SMTP_PASS` environment variable in Vercel

## Step 4: Testing & Verification

### 4.1 Functionality Testing
- [ ] Homepage loads correctly
- [ ] Journal pages work with tag filtering
- [ ] Individual blog posts load
- [ ] Contact form submits successfully
- [ ] Email delivery working
- [ ] PWA installation prompts appear
- [ ] Offline functionality works
- [ ] SEO meta tags present

### 4.2 Performance Testing
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals pass
- [ ] PWA criteria met
- [ ] Accessibility score > 95

### 4.3 Domain Testing
- [ ] `dadbuildinglegacy.com` resolves
- [ ] `www.dadbuildinglegacy.com` redirects to main
- [ ] `askdbl.com` redirects to main site
- [ ] SSL certificates valid
- [ ] Email delivery from `abhi@askdbl.com` works

## Step 5: Post-Deployment Tasks

### 5.1 Search Console Setup
1. Add property in Google Search Console
2. Verify ownership via DNS or HTML file
3. Submit sitemap: `https://dadbuildinglegacy.com/sitemap.xml`

### 5.2 Analytics Setup
- Vercel Analytics enabled by default
- Optional: Add Google Analytics or Plausible

### 5.3 Monitoring
- Set up Vercel monitoring alerts
- Monitor Core Web Vitals
- Check error logs regularly

## Troubleshooting

### Common Issues

**Build Failures:**
- Check environment variables are set correctly
- Verify MongoDB connection string
- Check for TypeScript errors

**Email Issues:**
- Verify Zoho app password is correct
- Check DNS propagation for MX records
- Test with `/api/test-email` endpoint

**Domain Issues:**
- Check DNS propagation with `dig` or online tools
- Verify A record points to correct IP
- Allow 24-48 hours for full DNS propagation

### Support Contacts
- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Zoho Support: [zoho.com/mail/help](https://zoho.com/mail/help)
- DNS Issues: Contact domain registrar

## Security Notes

- Environment variables are encrypted in Vercel
- Never commit `.env.local` to Git
- Regularly rotate API keys and passwords
- Monitor for unusual activity in logs

---

**Deployment Checklist Complete ✅**
- [ ] Code deployed to Vercel
- [ ] Environment variables configured
- [ ] Custom domains added and verified
- [ ] DNS records configured
- [ ] Email functionality tested
- [ ] PWA features working
- [ ] Performance optimized
- [ ] Monitoring set up