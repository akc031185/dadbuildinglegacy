#!/bin/bash
set -e

N8N_URL=${N8N_URL:-"http://localhost:5678"}

echo "🔐 n8n Credentials Setup Guide"
echo "=============================="
echo ""

# Check if n8n is running
echo "🔍 Checking n8n connectivity..."
if ! curl -s "$N8N_URL/healthz" > /dev/null 2>&1; then
    echo "❌ n8n is not accessible at $N8N_URL"
    echo ""
    echo "To start n8n:"
    echo "cd ~/n8n-stack"
    echo "docker-compose up -d"
    exit 1
fi
echo "✅ n8n is running at $N8N_URL"
echo ""

echo "📋 Required Credentials for DBL Website Builder"
echo "=============================================="
echo ""

echo "1️⃣ ANTHROPIC API (Required for HTTP fallback options)"
echo "   Credential Type: HTTP Header Auth"
echo "   Name: anthropic-api"
echo "   Header Name: x-api-key"
echo "   Header Value: sk-ant-api03-[your-key]"
echo ""

echo "2️⃣ GITHUB API (Required for Site Builder)"
echo "   Credential Type: HTTP Header Auth"
echo "   Name: github-api"
echo "   Header Name: Authorization"
echo "   Header Value: token ghp_[your-token]"
echo ""

echo "3️⃣ VERCEL API (Required for Vercel Deployer)"
echo "   Credential Type: HTTP Header Auth"
echo "   Name: vercel-api"
echo "   Header Name: Authorization"
echo "   Header Value: Bearer [your-vercel-token]"
echo ""

echo "4️⃣ GOHIGHLEVEL API (Required for GHL Opportunity)"
echo "   Credential Type: HTTP Header Auth"
echo "   Name: ghl-api"
echo "   Header Name: Authorization"
echo "   Header Value: Bearer [your-ghl-api-key]"
echo ""

echo "5️⃣ DOMAIN REGISTRAR (Optional - for Domain Sherpa)"
echo "   Credential Type: HTTP Header Auth"
echo "   Name: registrar-api"
echo "   Header Name: Authorization"
echo "   Header Value: Bearer [your-registrar-key]"
echo ""

echo "🔧 Environment Variables Setup"
echo "=============================="
echo ""
echo "Set these environment variables in n8n (Settings → Environment Variables):"
echo ""

# Create environment variables template
ENV_TEMPLATE="# n8n Environment Variables for DBL Website Builder

# Core APIs
ANTHROPIC_API_KEY=sk-ant-api03-[your-key]
GITHUB_TOKEN=ghp_[your-github-token]
VERCEL_TOKEN=[your-vercel-token]

# GitHub Configuration
GITHUB_OWNER=your-github-org
TEMPLATE_REPO=dbl-website-templates

# Vercel Configuration (optional)
VERCEL_TEAM_ID=[your-team-id]

# GoHighLevel Configuration
GHL_BASE=https://services.leadconnectorhq.com

# Domain Registrar Configuration (optional)
REGISTRAR_AVAIL_URL=https://api.registrar.com/v1/domains/availability
REGISTRAR_PURCHASE_URL=https://api.registrar.com/v1/domains/purchase
REGISTRAR_USER=[your-registrar-username]
REGISTRAR_PASS=[your-registrar-password]
REGISTRAR_API_KEY=[your-registrar-api-key]

# DBL API Configuration (for future callbacks)
DBL_API_BASE=https://your-domain.com/api
"

echo "$ENV_TEMPLATE" > /tmp/n8n-env-template.txt

echo "📄 Environment variables template created at: /tmp/n8n-env-template.txt"
echo ""

echo "🖥️ Manual Setup Steps"
echo "===================="
echo ""
echo "Since n8n doesn't have a direct API for credential creation, please follow these steps:"
echo ""

echo "Step 1: Open n8n Dashboard"
echo "  → Go to: $N8N_URL"
echo ""

echo "Step 2: Set Environment Variables"
echo "  → Click Settings (gear icon)"
echo "  → Go to 'Environment Variables'"
echo "  → Add each variable from the template above"
echo ""

echo "Step 3: Create Credentials"
echo "  → Click 'Credentials' in left sidebar"
echo "  → Click '+ Add Credential'"
echo "  → For each credential type below:"
echo ""

echo "   🔹 Anthropic API Credential"
echo "     → Search for 'HTTP Header Auth'"
echo "     → Name: anthropic-api"
echo "     → Header Name: x-api-key"
echo "     → Header Value: \${ANTHROPIC_API_KEY}"
echo ""

echo "   🔹 GitHub API Credential"
echo "     → Search for 'HTTP Header Auth'"
echo "     → Name: github-api"
echo "     → Header Name: Authorization"
echo "     → Header Value: token \${GITHUB_TOKEN}"
echo ""

echo "   🔹 Vercel API Credential"
echo "     → Search for 'HTTP Header Auth'"
echo "     → Name: vercel-api"
echo "     → Header Name: Authorization"
echo "     → Header Value: Bearer \${VERCEL_TOKEN}"
echo ""

echo "   🔹 GoHighLevel API Credential"
echo "     → Search for 'HTTP Header Auth'"
echo "     → Name: ghl-api"
echo "     → Header Name: Authorization"
echo "     → Header Value: Bearer [enter-your-ghl-key-directly]"
echo ""

echo "Step 4: Test Credentials"
echo "  → Create a simple test workflow"
echo "  → Use each credential to make a test API call"
echo "  → Verify responses are successful"
echo ""

echo "🧪 Credential Test Commands"
echo "=========================="
echo ""
echo "Test these API endpoints to verify your credentials:"
echo ""

echo "# Test Anthropic API"
echo "curl -X POST https://api.anthropic.com/v1/messages \\"
echo "  -H 'x-api-key: \$ANTHROPIC_API_KEY' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -H 'anthropic-version: 2023-06-01' \\"
echo "  -d '{\"model\":\"claude-3-haiku-20240307\",\"max_tokens\":10,\"messages\":[{\"role\":\"user\",\"content\":\"Hi\"}]}'"
echo ""

echo "# Test GitHub API"
echo "curl -H 'Authorization: token \$GITHUB_TOKEN' https://api.github.com/user"
echo ""

echo "# Test Vercel API"
echo "curl -H 'Authorization: Bearer \$VERCEL_TOKEN' https://api.vercel.com/v2/user"
echo ""

echo "# Test GoHighLevel API (replace with your actual key)"
echo "curl -H 'Authorization: Bearer your-ghl-key' https://services.leadconnectorhq.com/locations/"
echo ""

echo "✅ Next Steps"
echo "============"
echo ""
echo "After setting up credentials:"
echo "1. Run: ./scripts/import-n8n.sh to import workflows"
echo "2. Activate each imported workflow in n8n UI"
echo "3. Run test scripts to verify everything works:"
echo "   ./scripts/test-domain-sherpa.sh"
echo "   ./scripts/test-logo-brandsmith.sh"
echo "   ./scripts/test-site-builder.sh"
echo "   ./scripts/test-vercel-deployer.sh"
echo "   ./scripts/test-ghl-opportunity.sh"
echo ""

echo "📖 Documentation: docs/OPERATIONS.md"
echo ""
echo "🔗 n8n Dashboard: $N8N_URL"