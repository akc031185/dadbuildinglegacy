# DBL Website Builder - Operations Guide

## Overview

The DBL Website Builder system consists of 5 AI-powered agents that automate the website creation process from domain suggestions to deployment. Each agent has two implementation options:

- **Option A**: Uses official Anthropic n8n node (recommended)
- **Option B**: Uses HTTP fallback for environments without Anthropic node

## Quick Start

### 1. Environment Setup

```bash
# Required environment variables
export ANTHROPIC_API_KEY="your_anthropic_api_key"
export VERCEL_TOKEN="your_vercel_token"
export GITHUB_TOKEN="your_github_token"
export GITHUB_ORG="your-github-org"
export GHL_BASE="https://services.leadconnectorhq.com"  # Optional

# Start n8n
cd ~/n8n-stack
docker-compose up -d
```

### 2. Import Workflows

```bash
# Make import script executable
chmod +x scripts/import-n8n.sh

# Import all workflows
./scripts/import-n8n.sh
```

### 3. Test All Agents

```bash
# Test individual agents
./scripts/test-domain-sherpa.sh
./scripts/test-logo-brandsmith.sh
./scripts/test-site-builder.sh
./scripts/test-vercel-deployer.sh
./scripts/test-ghl-opportunity.sh

# Or test specific endpoint
curl -X POST http://localhost:5678/webhook/domain-sherpa \
  -H "Content-Type: application/json" \
  -d '{"business":"TechFlow Solutions","industry":"Software Consulting"}'
```

## Agent Endpoints

### 1. Domain Sherpa

**Purpose**: Generate domain suggestions based on business details

**Endpoints**:
- Option A: `POST /webhook/domain-sherpa`
- Option B: `POST /webhook/domain-sherpa-fallback`

**Input**:
```json
{
  "business": "TechFlow Solutions",
  "industry": "Software Consulting",
  "keywords": ["tech", "flow", "solutions"],
  "preferredTlds": [".com", ".io", ".dev"]
}
```

**Output**:
```json
{
  "suggestions": [
    {
      "domain": "techflow.com",
      "reasoning": "Direct match with business name",
      "available": true,
      "premium": false
    }
  ],
  "chosen": {
    "domain": "techflow.com",
    "reasoning": "Best overall fit"
  }
}
```

**Test Command**:
```bash
curl -X POST http://localhost:5678/webhook/domain-sherpa \
  -H "Content-Type: application/json" \
  -d '{
    "business": "TechFlow Solutions",
    "industry": "Software Consulting",
    "keywords": ["tech", "flow", "solutions"],
    "preferredTlds": [".com", ".io"]
  }'
```

---

### 2. Logo Brandsmith

**Purpose**: Generate logos or clean up uploaded logos with brand guidelines

**Endpoints**:
- Option A: `POST /webhook/logo-brandsmith`
- Option B: `POST /webhook/logo-brandsmith-fallback`

**Input (Generation Mode)**:
```json
{
  "companyName": "TechFlow Solutions",
  "industry": "Software Consulting",
  "style": "Modern & Clean",
  "colors": ["blue", "white"],
  "hasUpload": false
}
```

**Input (Upload Cleanup Mode)**:
```json
{
  "companyName": "TechFlow Solutions",
  "uploadedLogo": "https://example.com/logo.png",
  "hasUpload": true
}
```

**Output**:
```json
{
  "assets": {
    "svg": "https://cdn.example.com/logo.svg",
    "png": "https://cdn.example.com/logo.png",
    "favicon": "https://cdn.example.com/favicon.ico"
  },
  "brandGuide": {
    "primaryColors": ["#1E40AF", "#FFFFFF"],
    "fonts": ["Inter", "Arial"],
    "logoUsage": "Maintain clear space of 1x logo height",
    "variations": ["dark", "light", "monochrome"]
  }
}
```

**Test Commands**:
```bash
# Test logo generation
curl -X POST http://localhost:5678/webhook/logo-brandsmith \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "TechFlow Solutions",
    "industry": "Software Consulting",
    "style": "Modern & Clean",
    "colors": ["blue", "white"],
    "hasUpload": false
  }'

# Test logo cleanup
curl -X POST http://localhost:5678/webhook/logo-brandsmith \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "TechFlow Solutions",
    "uploadedLogo": "https://example.com/uploaded-logo.png",
    "hasUpload": true
  }'
```

---

### 3. Site Builder

**Purpose**: Generate content and create GitHub repository from templates

**Endpoints**:
- Option A: `POST /webhook/site-builder`
- Option B: `POST /webhook/site-builder-templated`

**Input**:
```json
{
  "companyName": "TechFlow Solutions",
  "siteGoal": "Generate leads for software consulting",
  "pagesWanted": ["Home", "Intake", "Contact"],
  "copyTone": "Professional",
  "features": ["Email", "CRM"],
  "repoName": "techflow-website"
}
```

**Output**:
```json
{
  "template": "Landing",
  "content": {
    "hero": {
      "headline": "Transform Your Business with Expert Software Solutions",
      "subheadline": "Custom development that scales with your growth"
    },
    "valueProps": [
      {
        "title": "Expert Development",
        "description": "10+ years of experience"
      }
    ],
    "cta": {
      "primary": "Get Started Today",
      "secondary": "Schedule Consultation"
    },
    "faq": [
      {
        "question": "How long does development take?",
        "answer": "Typically 4-12 weeks depending on scope"
      }
    ]
  },
  "repository": {
    "html_url": "https://github.com/your-org/techflow-website",
    "contents_url": "https://api.github.com/repos/your-org/techflow-website/contents/{+path}"
  },
  "commits": [
    {
      "sha": "abc123def456",
      "path": "content/home.json"
    }
  ]
}
```

**Test Command**:
```bash
curl -X POST http://localhost:5678/webhook/site-builder \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "TechFlow Solutions",
    "siteGoal": "Generate leads for software consulting",
    "pagesWanted": ["Home", "Intake", "Contact"],
    "copyTone": "Professional",
    "features": ["Email", "CRM"],
    "repoName": "techflow-website"
  }'
```

---

### 4. Vercel Deployer

**Purpose**: Deploy GitHub repository to Vercel with optional custom domain

**Endpoints**:
- Option A: `POST /webhook/vercel-deployer`
- Option B: `POST /webhook/vercel-deployer-direct`

**Input**:
```json
{
  "repo": "your-org/techflow-website",
  "env": {
    "MONGODB_URI": "mongodb+srv://user:pass@cluster.mongodb.net/db",
    "NEXT_PUBLIC_SITE_NAME": "TechFlow Solutions"
  },
  "domain": "techflow.com"
}
```

**Output**:
```json
{
  "projectId": "prj_abc123def456",
  "vercelUrl": "https://techflow-website.vercel.app",
  "prodDomain": "techflow.com",
  "deploymentId": "dpl_789xyz123",
  "projectName": "techflow-website",
  "domainStatus": "pending"
}
```

**Test Commands**:
```bash
# Deploy with custom domain
curl -X POST http://localhost:5678/webhook/vercel-deployer \
  -H "Content-Type: application/json" \
  -d '{
    "repo": "your-org/sample-nextjs-app",
    "env": {
      "MONGODB_URI": "mongodb+srv://user:pass@cluster.mongodb.net/db",
      "NEXT_PUBLIC_SITE_NAME": "TechFlow Solutions"
    },
    "domain": "techflow.com"
  }'

# Deploy without custom domain
curl -X POST http://localhost:5678/webhook/vercel-deployer \
  -H "Content-Type: application/json" \
  -d '{
    "repo": "your-org/simple-website",
    "env": {
      "NEXT_PUBLIC_SITE_NAME": "TechFlow Solutions"
    },
    "domain": null
  }'
```

---

### 5. GHL Opportunity

**Purpose**: Create GoHighLevel pipeline, contact, and opportunity

**Endpoints**:
- Option A: `POST /webhook/ghl-connector`
- Option B: `POST /webhook/ghl-connector-fallback`

**Input**:
```json
{
  "ghlApiKey": "ghl_your_api_key",
  "locationId": "loc_your_location_id",
  "lead": {
    "name": "John Smith",
    "email": "john@techflow.com",
    "phone": "+1-555-0123",
    "source": "DBL Website Builder"
  }
}
```

**Output**:
```json
{
  "pipelineId": "pip_abc123def456",
  "stages": {
    "New": "stage_new_123",
    "Qualified": "stage_qualified_456",
    "Scheduled": "stage_scheduled_789",
    "Closed": "stage_closed_012"
  },
  "contactId": "contact_xyz789abc",
  "opportunityId": "opp_def456ghi"
}
```

**Test Command**:
```bash
curl -X POST http://localhost:5678/webhook/ghl-connector \
  -H "Content-Type: application/json" \
  -d '{
    "ghlApiKey": "ghl_test_api_key_12345",
    "locationId": "loc_test_location_67890",
    "lead": {
      "name": "John Smith",
      "email": "john@techflow.com",
      "phone": "+1-555-0123",
      "source": "DBL Website Builder"
    }
  }'
```

## Full Pipeline Test

To test the complete end-to-end flow:

```bash
#!/bin/bash
set -e

N8N_URL="http://localhost:5678"

echo "🚀 Testing Complete Pipeline"
echo "============================"

# 1. Generate domain suggestions
echo "1️⃣ Domain Sherpa"
DOMAIN_RESPONSE=$(curl -s -X POST "$N8N_URL/webhook/domain-sherpa" \
  -H "Content-Type: application/json" \
  -d '{
    "business": "TechFlow Solutions",
    "industry": "Software Consulting"
  }')

CHOSEN_DOMAIN=$(echo "$DOMAIN_RESPONSE" | jq -r '.chosen.domain')
echo "✅ Chosen domain: $CHOSEN_DOMAIN"

# 2. Generate logo and brand assets
echo "2️⃣ Logo Brandsmith"
LOGO_RESPONSE=$(curl -s -X POST "$N8N_URL/webhook/logo-brandsmith" \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "TechFlow Solutions",
    "industry": "Software Consulting",
    "style": "Modern & Clean",
    "hasUpload": false
  }')

LOGO_URL=$(echo "$LOGO_RESPONSE" | jq -r '.assets.png')
echo "✅ Logo generated: $LOGO_URL"

# 3. Build site content and repository
echo "3️⃣ Site Builder"
SITE_RESPONSE=$(curl -s -X POST "$N8N_URL/webhook/site-builder" \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "TechFlow Solutions",
    "siteGoal": "Generate leads for software consulting",
    "pagesWanted": ["Home", "Intake", "Contact"],
    "copyTone": "Professional",
    "features": ["Email", "CRM"],
    "repoName": "techflow-website"
  }')

REPO_URL=$(echo "$SITE_RESPONSE" | jq -r '.repository.html_url')
REPO_NAME=$(echo "$REPO_URL" | sed 's|.*/||')
echo "✅ Repository created: $REPO_URL"

# 4. Deploy to Vercel
echo "4️⃣ Vercel Deployer"
DEPLOY_RESPONSE=$(curl -s -X POST "$N8N_URL/webhook/vercel-deployer" \
  -H "Content-Type: application/json" \
  -d "{
    \"repo\": \"your-org/$REPO_NAME\",
    \"env\": {
      \"NEXT_PUBLIC_SITE_NAME\": \"TechFlow Solutions\"
    },
    \"domain\": \"$CHOSEN_DOMAIN\"
  }")

VERCEL_URL=$(echo "$DEPLOY_RESPONSE" | jq -r '.vercelUrl')
echo "✅ Deployed to: $VERCEL_URL"

# 5. Create GHL opportunity (if GHL is configured)
echo "5️⃣ GHL Opportunity"
if [ -n "$GHL_API_KEY" ] && [ -n "$GHL_LOCATION_ID" ]; then
  GHL_RESPONSE=$(curl -s -X POST "$N8N_URL/webhook/ghl-connector" \
    -H "Content-Type: application/json" \
    -d "{
      \"ghlApiKey\": \"$GHL_API_KEY\",
      \"locationId\": \"$GHL_LOCATION_ID\",
      \"lead\": {
        \"name\": \"TechFlow Solutions Lead\",
        \"email\": \"contact@techflow.com\",
        \"source\": \"DBL Website Builder\"
      }
    }")
  
  OPPORTUNITY_ID=$(echo "$GHL_RESPONSE" | jq -r '.opportunityId')
  echo "✅ GHL Opportunity created: $OPPORTUNITY_ID"
else
  echo "⚠️ GHL not configured, skipping"
fi

echo ""
echo "🎉 Pipeline Complete!"
echo "Domain: $CHOSEN_DOMAIN"
echo "Repository: $REPO_URL"  
echo "Live Site: $VERCEL_URL"
```

## Troubleshooting

### Common Issues

#### 1. Anthropic API Rate Limits
**Error**: `429 Too Many Requests`
**Solution**: 
- Use Option B (HTTP fallback) endpoints
- Implement request queuing in your application
- Check your Anthropic API tier limits

#### 2. GitHub Permission Errors
**Error**: `403 Forbidden` or `422 Unprocessable Entity`
**Solution**:
```bash
# Verify token permissions
curl -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/user

# Check organization membership
curl -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/user/orgs
```

#### 3. Vercel Deployment Failures
**Error**: `Build failed` or `Environment variables missing`
**Solution**:
- Ensure repository has proper Next.js structure
- Verify all required environment variables are set
- Check build logs in Vercel dashboard

#### 4. n8n Workflow Import Issues
**Error**: `Workflow could not be imported`
**Solution**:
```bash
# Check n8n is running
docker ps | grep n8n

# Restart n8n if needed
cd ~/n8n-stack
docker-compose restart

# Manual import via UI
# 1. Go to http://localhost:5678
# 2. Click "Import from file"
# 3. Select workflow JSON file
```

#### 5. GoHighLevel Integration Issues
**Error**: `Invalid API key` or `Location not found`
**Solution**:
- Verify GHL API key has proper permissions
- Ensure location ID exists and is accessible
- Check GHL API documentation for latest endpoints

### Debug Mode

Enable debug logging by setting environment variables:

```bash
export N8N_LOG_LEVEL="debug"
export DEBUG="n8n:*"

# Restart n8n
cd ~/n8n-stack
docker-compose restart
```

### Health Checks

```bash
# Check n8n health
curl http://localhost:5678/healthz

# Test webhook endpoints
curl -X POST http://localhost:5678/webhook/domain-sherpa \
  -H "Content-Type: application/json" \
  -d '{"business":"Test","industry":"Test"}'

# Check workflow status via n8n API
curl -X GET http://localhost:5678/api/v1/workflows \
  -H "X-N8N-API-KEY: your_n8n_api_key"
```

## Security Best Practices

1. **Environment Variables**: Never commit API keys to repository
2. **API Key Rotation**: Regularly rotate all service API keys
3. **Network Security**: Use HTTPS for all webhook endpoints in production
4. **Rate Limiting**: Implement proper rate limiting for webhook endpoints
5. **Input Validation**: All workflows include input validation functions
6. **Error Handling**: Sensitive information is not exposed in error messages

## Production Deployment

### 1. Secure Environment Setup
```bash
# Use secure secret management
export ANTHROPIC_API_KEY=$(vault kv get -field=api_key secret/anthropic)
export VERCEL_TOKEN=$(vault kv get -field=token secret/vercel)
export GITHUB_TOKEN=$(vault kv get -field=token secret/github)
```

### 2. SSL/TLS Configuration
```bash
# Update docker-compose.yml for SSL
# Add nginx reverse proxy with Let's Encrypt
```

### 3. Monitoring and Logging
```bash
# Add monitoring stack
docker-compose -f docker-compose.yml -f docker-compose.monitoring.yml up -d
```

### 4. Backup Strategy
```bash
# Backup n8n workflows and credentials
docker exec n8n n8n export:workflow --all --output=/data/backups/
docker exec n8n n8n export:credentials --all --output=/data/backups/
```

## API Rate Limits

| Service | Limit | Notes |
|---------|-------|-------|
| Anthropic | 1000 RPM | Varies by tier |
| GitHub | 5000/hour | Per user token |
| Vercel | 100/hour | Per project |
| GoHighLevel | 1000/day | Per location |

## Support and Maintenance

### Regular Tasks
- [ ] Weekly API key rotation
- [ ] Monthly workflow backup
- [ ] Quarterly dependency updates
- [ ] Monitor API rate limit usage

### Emergency Contacts
- N8N Support: [Community Forum](https://community.n8n.io/)
- Anthropic Support: support@anthropic.com
- Vercel Support: support@vercel.com

---

**Last Updated**: 2025-09-13  
**Version**: 1.0.0  
**Maintainer**: DBL Development Team