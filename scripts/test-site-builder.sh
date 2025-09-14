#!/bin/bash
set -e

N8N_URL=${N8N_URL:-"http://localhost:5678"}

echo "🏗️ Testing Site Builder Workflows"
echo "================================="

# Test payload for site generation
SITE_PAYLOAD='{
  "companyName": "TechFlow Solutions",
  "siteGoal": "Generate leads for software consulting services",
  "pagesWanted": ["Home", "Intake", "Contact"],
  "copyTone": "Professional",
  "features": ["Email", "CRM"],
  "repoName": "techflow-website"
}'

# Test payload for different template (Portfolio)
PORTFOLIO_PAYLOAD='{
  "companyName": "Creative Studios",
  "siteGoal": "Showcase our design portfolio",
  "pagesWanted": ["Home", "Portfolio", "Contact"],
  "copyTone": "Creative & Playful",
  "features": ["Gallery"],
  "repoName": "creative-portfolio"
}'

echo "📡 Testing Option A (Anthropic Planning)"
echo "======================================="

echo "🎯 Test 1: Standard Site Generation"
echo "Endpoint: $N8N_URL/webhook/site-builder"
echo "Payload: $SITE_PAYLOAD"
echo ""

response_a1=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST \
  "$N8N_URL/webhook/site-builder" \
  -H "Content-Type: application/json" \
  -d "$SITE_PAYLOAD")

http_code_a1=$(echo "$response_a1" | tail -n1 | cut -d: -f2)
response_body_a1=$(echo "$response_a1" | head -n -1)

echo "📊 Option A - Standard Response Code: $http_code_a1"
echo "📄 Option A - Standard Response:"
echo "$response_body_a1" | jq . 2>/dev/null || echo "$response_body_a1"
echo ""

echo "🎯 Test 2: Portfolio Template"
echo "Payload: $PORTFOLIO_PAYLOAD"
echo ""

response_a2=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST \
  "$N8N_URL/webhook/site-builder" \
  -H "Content-Type: application/json" \
  -d "$PORTFOLIO_PAYLOAD")

http_code_a2=$(echo "$response_a2" | tail -n1 | cut -d: -f2)
response_body_a2=$(echo "$response_a2" | head -n -1)

echo "📊 Option A - Portfolio Response Code: $http_code_a2"
echo "📄 Option A - Portfolio Response:"
echo "$response_body_a2" | jq . 2>/dev/null || echo "$response_body_a2"
echo ""

echo "📡 Testing Option B (Templated Content)"
echo "======================================"

echo "🎯 Test 1: Standard Site Generation"
echo "Endpoint: $N8N_URL/webhook/site-builder-templated"
echo ""

response_b1=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST \
  "$N8N_URL/webhook/site-builder-templated" \
  -H "Content-Type: application/json" \
  -d "$SITE_PAYLOAD")

http_code_b1=$(echo "$response_b1" | tail -n1 | cut -d: -f2)
response_body_b1=$(echo "$response_b1" | head -n -1)

echo "📊 Option B - Standard Response Code: $http_code_b1"
echo "📄 Option B - Standard Response:"
echo "$response_body_b1" | jq . 2>/dev/null || echo "$response_body_b1"
echo ""

echo "🎯 Test 2: Portfolio Template"
echo ""

response_b2=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST \
  "$N8N_URL/webhook/site-builder-templated" \
  -H "Content-Type: application/json" \
  -d "$PORTFOLIO_PAYLOAD")

http_code_b2=$(echo "$response_b2" | tail -n1 | cut -d: -f2)
response_body_b2=$(echo "$response_b2" | head -n -1)

echo "📊 Option B - Portfolio Response Code: $http_code_b2"
echo "📄 Option B - Portfolio Response:"
echo "$response_body_b2" | jq . 2>/dev/null || echo "$response_body_b2"
echo ""

echo "✅ Acceptance Checklist:"
echo "========================"

check_response() {
  local response_body="$1"
  local test_name="$2"
  
  if [ -n "$response_body" ]; then
    template=$(echo "$response_body" | jq -r '.template // empty' 2>/dev/null)
    content=$(echo "$response_body" | jq '.content // empty' 2>/dev/null)
    repository=$(echo "$response_body" | jq '.repository // empty' 2>/dev/null)
    commits=$(echo "$response_body" | jq '.commits // empty' 2>/dev/null)
    
    # Check template selection\n    if [ -n \"$template\" ] && [ \"$template\" != \"null\" ] && [ \"$template\" != \"empty\" ]; then\n      echo \"✅ $test_name: Has template ($template)\"\n    else\n      echo \"❌ $test_name: Missing template\"\n    fi\n    \n    # Check content structure\n    if [ -n \"$content\" ] && [ \"$content\" != \"null\" ]; then\n      hero=$(echo \"$content\" | jq '.hero // empty' 2>/dev/null)\n      valueProps=$(echo \"$content\" | jq '.valueProps // empty' 2>/dev/null)\n      cta=$(echo \"$content\" | jq '.cta // empty' 2>/dev/null)\n      faq=$(echo \"$content\" | jq '.faq // empty' 2>/dev/null)\n      \n      [ -n \"$hero\" ] && [ \"$hero\" != \"null\" ] && echo \"✅ $test_name: Has hero section\"\n      [ -n \"$valueProps\" ] && [ \"$valueProps\" != \"null\" ] && echo \"✅ $test_name: Has value props\"\n      [ -n \"$cta\" ] && [ \"$cta\" != \"null\" ] && echo \"✅ $test_name: Has CTA section\"\n      [ -n \"$faq\" ] && [ \"$faq\" != \"null\" ] && echo \"✅ $test_name: Has FAQ section\"\n    else\n      echo \"❌ $test_name: Missing content\"\n    fi\n    \n    # Check repository info\n    if [ -n \"$repository\" ] && [ \"$repository\" != \"null\" ]; then\n      html_url=$(echo \"$repository\" | jq -r '.html_url // empty' 2>/dev/null)\n      contents_url=$(echo \"$repository\" | jq -r '.contents_url // empty' 2>/dev/null)\n      \n      if [ -n \"$html_url\" ] && [ \"$html_url\" != \"empty\" ] && [[ \"$html_url\" == https://github.com/* ]]; then\n        echo \"✅ $test_name: Has valid GitHub URL ($html_url)\"\n      else\n        echo \"❌ $test_name: Missing or invalid GitHub URL\"\n      fi\n    else\n      echo \"❌ $test_name: Missing repository info\"\n    fi\n    \n    # Check commits\n    if [ -n \"$commits\" ] && [ \"$commits\" != \"null\" ]; then\n      commit_sha=$(echo \"$commits\" | jq -r '.[0].sha // empty' 2>/dev/null)\n      commit_path=$(echo \"$commits\" | jq -r '.[0].path // empty' 2>/dev/null)\n      \n      if [ -n \"$commit_sha\" ] && [ \"$commit_sha\" != \"empty\" ]; then\n        echo \"✅ $test_name: Has commit SHA ($commit_sha)\"\n      else\n        echo \"❌ $test_name: Missing commit SHA\"\n      fi\n      \n      if [ \"$commit_path\" = \"content/home.json\" ]; then\n        echo \"✅ $test_name: Correct file path (content/home.json)\"\n      else\n        echo \"❌ $test_name: Wrong file path ($commit_path)\"\n      fi\n    else\n      echo \"❌ $test_name: Missing commits info\"\n    fi\n  else\n    echo \"❌ $test_name: No response body\"\n  fi\n}\n\n# Check all responses\n[ \"$http_code_a1\" = \"200\" ] && check_response \"$response_body_a1\" \"Option A - Standard\"\n[ \"$http_code_a2\" = \"200\" ] && check_response \"$response_body_a2\" \"Option A - Portfolio\"\n[ \"$http_code_b1\" = \"200\" ] && check_response \"$response_body_b1\" \"Option B - Standard\"\n[ \"$http_code_b2\" = \"200\" ] && check_response \"$response_body_b2\" \"Option B - Portfolio\"\n\necho \"\"\necho \"🎯 Expected Response Structure:\"\necho \"- template: One of Landing|Intake|Portfolio|Booking|Blog\"\necho \"- content: Object with hero, valueProps[], cta, faq[]\"\necho \"- repository: Object with html_url and contents_url\"\necho \"- commits: Array with path='content/home.json' and SHA\"\necho \"\"\necho \"📋 Environment Variables Required:\"\necho \"- GITHUB_TOKEN: Personal access token with repo permissions\"\necho \"- GITHUB_ORG: GitHub organization/user (optional, defaults to 'your-org')\""
      },
      "id": "check-response",
      "name": "Check Response Structure",
      "type": "n8n-nodes-base.function",
      "typeVersion": 2,
      "position": [1660, 500]
    }
  ],
  "connections": {},
  "active": false,
  "settings": {
    "executionOrder": "v1"
  }
}