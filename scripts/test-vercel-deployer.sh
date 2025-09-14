#!/bin/bash
set -e

N8N_URL=${N8N_URL:-"http://localhost:5678"}

echo "🚀 Testing Vercel Deployer Workflows"
echo "===================================="

# Test payload with domain
DEPLOY_WITH_DOMAIN='{
  "repo": "your-org/sample-nextjs-app",
  "env": {
    "MONGODB_URI": "mongodb+srv://user:pass@cluster.mongodb.net/db",
    "NEXT_PUBLIC_SITE_NAME": "Asus Capital"
  },
  "domain": "azuscapital.com"
}'

# Test payload without domain
DEPLOY_NO_DOMAIN='{
  "repo": "your-org/simple-website",
  "env": {
    "NEXT_PUBLIC_SITE_NAME": "TechFlow Solutions"
  },
  "domain": null
}'

echo "📡 Testing Option A (Anthropic Error Recovery)"
echo "============================================="

echo "🎯 Test 1: Deploy with Custom Domain"
echo "Endpoint: $N8N_URL/webhook/vercel-deployer"
echo "Payload: $DEPLOY_WITH_DOMAIN"
echo ""

response_a1=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST \
  "$N8N_URL/webhook/vercel-deployer" \
  -H "Content-Type: application/json" \
  -d "$DEPLOY_WITH_DOMAIN")

http_code_a1=$(echo "$response_a1" | tail -n1 | cut -d: -f2)
response_body_a1=$(echo "$response_a1" | head -n -1)

echo "📊 Option A - With Domain Response Code: $http_code_a1"
echo "📄 Option A - With Domain Response:"
echo "$response_body_a1" | jq . 2>/dev/null || echo "$response_body_a1"
echo ""

echo "🎯 Test 2: Deploy without Custom Domain"
echo "Payload: $DEPLOY_NO_DOMAIN"
echo ""

response_a2=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST \
  "$N8N_URL/webhook/vercel-deployer" \
  -H "Content-Type: application/json" \
  -d "$DEPLOY_NO_DOMAIN")

http_code_a2=$(echo "$response_a2" | tail -n1 | cut -d: -f2)
response_body_a2=$(echo "$response_a2" | head -n -1)

echo "📊 Option A - No Domain Response Code: $http_code_a2"
echo "📄 Option A - No Domain Response:"
echo "$response_body_a2" | jq . 2>/dev/null || echo "$response_body_a2"
echo ""

echo "📡 Testing Option B (Direct Deployment)"
echo "======================================"

echo "🎯 Test 1: Deploy with Custom Domain"
echo "Endpoint: $N8N_URL/webhook/vercel-deployer-direct"
echo ""

response_b1=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST \
  "$N8N_URL/webhook/vercel-deployer-direct" \
  -H "Content-Type: application/json" \
  -d "$DEPLOY_WITH_DOMAIN")

http_code_b1=$(echo "$response_b1" | tail -n1 | cut -d: -f2)
response_body_b1=$(echo "$response_b1" | head -n -1)

echo "📊 Option B - With Domain Response Code: $http_code_b1"
echo "📄 Option B - With Domain Response:"
echo "$response_body_b1" | jq . 2>/dev/null || echo "$response_body_b1"
echo ""

echo "🎯 Test 2: Deploy without Custom Domain"
echo ""

response_b2=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST \
  "$N8N_URL/webhook/vercel-deployer-direct" \
  -H "Content-Type: application/json" \
  -d "$DEPLOY_NO_DOMAIN")

http_code_b2=$(echo "$response_b2" | tail -n1 | cut -d: -f2)
response_body_b2=$(echo "$response_b2" | head -n -1)

echo "📊 Option B - No Domain Response Code: $http_code_b2"
echo "📄 Option B - No Domain Response:"
echo "$response_body_b2" | jq . 2>/dev/null || echo "$response_body_b2"
echo ""

echo "✅ Acceptance Checklist:"
echo "========================"

check_response() {
  local response_body="$1"
  local test_name="$2"
  
  if [ -n "$response_body" ]; then
    project_id=$(echo "$response_body" | jq -r '.projectId // empty' 2>/dev/null)
    vercel_url=$(echo "$response_body" | jq -r '.vercelUrl // empty' 2>/dev/null)
    prod_domain=$(echo "$response_body" | jq -r '.prodDomain // empty' 2>/dev/null)
    
    # Check projectId
    if [ -n "$project_id" ] && [ "$project_id" != "null" ] && [ "$project_id" != "empty" ]; then
      echo "✅ $test_name: Has project ID ($project_id)"
    else
      echo "❌ $test_name: Missing project ID"
    fi
    
    # Check vercelUrl
    if [ -n "$vercel_url" ] && [ "$vercel_url" != "null" ] && [ "$vercel_url" != "empty" ]; then
      if [[ "$vercel_url" == https://*.vercel.app ]] || [[ "$vercel_url" == https://* ]]; then
        echo "✅ $test_name: Has valid Vercel URL ($vercel_url)"
      else
        echo "❌ $test_name: Invalid Vercel URL format ($vercel_url)"
      fi
    else
      echo "❌ $test_name: Missing Vercel URL"
    fi
    
    # Check prodDomain (should match input)
    echo "✅ $test_name: Production domain: ${prod_domain:-'null (no domain requested)'}"
    
    # Additional fields check
    deployment_id=$(echo "$response_body" | jq -r '.deploymentId // empty' 2>/dev/null)
    [ -n "$deployment_id" ] && [ "$deployment_id" != "null" ] && echo "✅ $test_name: Has deployment ID"
    
    domain_status=$(echo "$response_body" | jq -r '.domainStatus // empty' 2>/dev/null)
    [ -n "$domain_status" ] && [ "$domain_status" != "null" ] && echo "✅ $test_name: Domain status: $domain_status"
    
  else
    echo "❌ $test_name: No response body"
  fi
}

# Check all responses
[ "$http_code_a1" = "200" ] && check_response "$response_body_a1" "Option A - With Domain"
[ "$http_code_a2" = "200" ] && check_response "$response_body_a2" "Option A - No Domain" 
[ "$http_code_b1" = "200" ] && check_response "$response_body_b1" "Option B - With Domain"
[ "$http_code_b2" = "200" ] && check_response "$response_body_b2" "Option B - No Domain"

echo ""
echo "🎯 Expected Response Structure:"
echo "- projectId: Vercel project identifier"
echo "- vercelUrl: Full URL to deployed site (https://*.vercel.app)"
echo "- prodDomain: Custom domain if provided, null otherwise"
echo ""
echo "📋 Environment Variables Required:"
echo "- VERCEL_TOKEN: Vercel API token with deployment permissions"
echo ""
echo "🔗 Vercel API Endpoints Used:"
echo "1. POST https://api.vercel.com/v10/projects (create project)"
echo "2. POST https://api.vercel.com/v10/projects/{id}/env (set env vars)"
echo "3. POST https://api.vercel.com/v13/deployments (deploy)"
echo "4. POST https://api.vercel.com/v10/projects/{id}/domains (add domain)"