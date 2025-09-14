#!/bin/bash
set -e

echo "🚀 Starting n8n with Environment Variables"
echo "=========================================="

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found!"
    echo "Please create .env.local with your API keys first."
    exit 1
fi

# Load environment variables from .env.local
echo "📋 Loading environment variables from .env.local..."
set -a  # automatically export all variables
source .env.local
set +a

# Check critical variables
echo "🔍 Checking critical environment variables..."

MISSING_VARS=()

if [ -z "$ANTHROPIC_API_KEY" ] || [ "$ANTHROPIC_API_KEY" = "your_anthropic_api_key_here" ]; then
    MISSING_VARS+=("ANTHROPIC_API_KEY")
fi

if [ -z "$GITHUB_TOKEN" ] || [ "$GITHUB_TOKEN" = "your_github_token_here" ]; then
    MISSING_VARS+=("GITHUB_TOKEN")
fi

if [ -z "$GITHUB_OWNER" ] || [ "$GITHUB_OWNER" = "your_github_username_or_org" ]; then
    MISSING_VARS+=("GITHUB_OWNER")
fi

if [ -z "$VERCEL_TOKEN" ] || [ "$VERCEL_TOKEN" = "your_vercel_token_here" ]; then
    MISSING_VARS+=("VERCEL_TOKEN")
fi

if [ ${#MISSING_VARS[@]} -gt 0 ]; then
    echo "⚠️ Missing or placeholder values for these critical environment variables:"
    for var in "${MISSING_VARS[@]}"; do
        echo "   - $var"
    done
    echo ""
    echo "Please update your .env.local file with actual values."
    echo ""
    echo "Current values:"
    echo "ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}"
    echo "GITHUB_TOKEN=${GITHUB_TOKEN}"
    echo "GITHUB_OWNER=${GITHUB_OWNER}"
    echo "VERCEL_TOKEN=${VERCEL_TOKEN}"
    echo ""
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Show what we're setting (sanitized)
echo "✅ Environment variables loaded:"
echo "ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY:0:8}..."
echo "GITHUB_TOKEN=${GITHUB_TOKEN:0:8}..."
echo "GITHUB_OWNER=${GITHUB_OWNER}"
echo "VERCEL_TOKEN=${VERCEL_TOKEN:0:8}..."
[ -n "$GHL_API_KEY" ] && echo "GHL_API_KEY=${GHL_API_KEY:0:8}..."
[ -n "$GHL_LOCATION_ID" ] && echo "GHL_LOCATION_ID=${GHL_LOCATION_ID}"
echo ""

# Stop existing n8n
echo "🛑 Stopping existing n8n instance..."
cd ~/n8n-stack
docker-compose down

# Start n8n with environment variables
echo "🚀 Starting n8n with environment variables..."
docker-compose up -d

# Wait for n8n to start
echo "⏳ Waiting for n8n to start..."
for i in {1..30}; do
    if curl -s http://localhost:5678/healthz > /dev/null 2>&1; then
        echo "✅ n8n is running!"
        break
    fi
    sleep 2
    if [ $i -eq 30 ]; then
        echo "❌ n8n failed to start after 60 seconds"
        docker-compose logs
        exit 1
    fi
done

echo ""
echo "🎉 n8n is ready with environment variables!"
echo "🔗 Dashboard: http://localhost:5678"
echo ""
echo "💡 You can now:"
echo "1. Import workflows via the n8n UI"
echo "2. Use \$env variables in your workflow nodes"
echo "3. Test endpoints with: ./scripts/test-*.sh"
echo ""
echo "Environment variables are available in n8n as:"
echo "- \$env.ANTHROPIC_API_KEY"
echo "- \$env.GITHUB_TOKEN"
echo "- \$env.GITHUB_OWNER"
echo "- \$env.VERCEL_TOKEN"
echo "- etc..."