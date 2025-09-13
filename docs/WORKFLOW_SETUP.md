# DBL Website Builder - Workflow Setup Guide

## Overview
The DBL Website Builder uses a complete automation pipeline with 4 specialized AI agents:

1. **Domain Sherpa** - Finds and registers domains
2. **Logo Brandsmith** - Creates brand identity and logos  
3. **Site Builder** - Generates complete website code
4. **Vercel Deployer** - Deploys to production with custom domain

## Quick Setup

### 1. Start n8n
```bash
# From your n8n-stack directory
docker-compose up -d
```

### 2. Import Workflows
```bash
# From dadbuildinglegacy directory  
./scripts/import-n8n.sh
```

### 3. Configure Environment
Copy `env.example` to `.env.local` and set:
```bash
MONGODB_URI=your_mongodb_connection
N8N_INTAKE_WEBHOOK_URL=http://localhost:5678/webhook/intake
# ... other required variables
```

### 4. Test the System
```bash
./scripts/test-webhook.sh
```

## Workflow Architecture

### Main Orchestrator Workflow
**Webhook:** `http://localhost:5678/webhook/intake`

The main workflow receives requests from `/api/requests` and orchestrates all 4 agents:

```
API Request → Domain Sherpa → Logo Brandsmith → Site Builder → Vercel Deployer → Response
```

### Individual Agent Webhooks
Each agent can also be called independently:

- **Domain Sherpa:** `http://localhost:5678/webhook/domain-sherpa`
- **Logo Brandsmith:** `http://localhost:5678/webhook/logo-brandsmith`  
- **Site Builder:** `http://localhost:5678/webhook/site-builder`
- **Vercel Deployer:** `http://localhost:5678/webhook/vercel-deployer`

## Data Flow

### 1. Intake Form Data
The form at `/build-my-site` collects:
```json
{
  "fullName": "John Smith",
  "email": "john@example.com",
  "community": "Gator|SubTo|Other", 
  "companyName": "Smith Construction",
  "hasDomain": boolean,
  "currentDomain": "optional string",
  "domainPreferences": ["array", "of", "preferences"],
  "autoRegister": boolean,
  "hasLogo": boolean,
  "logoPrompt": "optional description",
  "siteGoal": "main website purpose",
  "pagesWanted": ["Home", "About", "Services"],
  "features": ["Contact Forms", "Gallery"],
  "copyTone": "Professional|Casual|etc",
  "crmProvider": "optional",
  "timeline": "optional",
  "budget": "optional",
  "specialRequests": "optional"
}
```

### 2. Agent Processing
Each agent receives structured data and returns JSON results:

- **Domain Sherpa:** Domain suggestions, availability, chosen domain
- **Logo Brandsmith:** Logo designs, brand palette, assets
- **Site Builder:** Complete Next.js project files and content
- **Vercel Deployer:** Deployment status, live URLs, admin access

### 3. Final Response
The orchestrator returns:
```json
{
  "requestId": "unique-id",
  "status": "completed",
  "results": {
    "domain": "domain sherpa results",
    "branding": "logo brandsmith results", 
    "website": "site builder results",
    "deployment": "vercel deployer results"
  },
  "deliverables": {
    "liveWebsite": "https://domain.com",
    "githubRepo": "https://github.com/user/repo",
    "adminAccess": "dashboard URLs"
  }
}
```

## Prompt Templates

Each agent uses detailed prompts in `/prompts/`:

- `domain-sherpa.md` - Domain research and registration
- `logo-brandsmith.md` - Brand identity creation
- `site-builder.md` - Website code generation  
- `vercel-deployer.md` - Deployment and configuration

These prompts include:
- **Input data structure** - Exact JSON schema expected
- **Processing logic** - Step-by-step instructions
- **Output format** - Required response structure
- **Error handling** - Fallback procedures

## Testing Individual Agents

### Domain Sherpa Test
```bash
curl -X POST http://localhost:5678/webhook/domain-sherpa \
  -H "Content-Type: application/json" \
  -d '{
    "requestId": "test-123",
    "companyName": "Smith Construction", 
    "siteGoal": "Generate construction leads",
    "hasDomain": false,
    "autoRegister": true
  }'
```

### Logo Brandsmith Test
```bash
curl -X POST http://localhost:5678/webhook/logo-brandsmith \
  -H "Content-Type: application/json" \
  -d '{
    "requestId": "test-123",
    "companyName": "Smith Construction",
    "hasLogo": true,
    "logoPrompt": "Professional construction logo",
    "copyTone": "Professional",
    "chosenDomain": "smithconstruction.com"
  }'
```

## Troubleshooting

### Common Issues

1. **n8n Workflows Not Importing**
   - Check n8n is running: `curl http://localhost:5678/healthz`
   - Verify workflow JSON syntax
   - Check file permissions on workflow files

2. **Webhook Not Firing**
   - Verify `N8N_INTAKE_WEBHOOK_URL` in `.env.local`
   - Check network connectivity to n8n
   - Review API logs for errors

3. **Agent Not Responding**
   - Check individual webhook URLs are active
   - Verify prompt format matches expected input
   - Review n8n execution logs

### Debug Commands
```bash
# Check n8n status
curl http://localhost:5678/healthz

# Test API endpoint
./scripts/test-webhook.sh

# View workflow executions
# Access n8n UI at http://localhost:5678

# Check database connections
# Verify MONGODB_URI is accessible
```

## Production Deployment

1. **Environment Variables:** Set all production values in Vercel
2. **Database:** Ensure MongoDB allows connections from Vercel IPs  
3. **n8n Instance:** Deploy n8n to production environment
4. **Webhook URLs:** Update to production n8n instance URLs
5. **Domain Configuration:** Point domains to production deployment

## Monitoring

- **API Requests:** Monitor `/api/requests` endpoint
- **n8n Executions:** Check workflow execution logs
- **Database:** Monitor website_requests collection
- **Error Handling:** Set up alerts for failed workflows