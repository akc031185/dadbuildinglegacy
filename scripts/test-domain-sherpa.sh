#!/bin/bash
set -e

N8N_URL=${N8N_URL:-"http://localhost:5678"}

echo "🧪 Testing Domain Sherpa Workflows"
echo "=================================="

# Test payload
TEST_PAYLOAD='{
  "companyName": "TechFlow Solutions",
  "keywords": ["tech", "flow", "digital"],
  "location": "California",
  "register": true
}'

echo "📡 Testing Option A (Official Anthropic Node)"
echo "Endpoint: $N8N_URL/webhook/domain-sherpa"
echo "Payload: $TEST_PAYLOAD"
echo ""

response_a=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST \
  "$N8N_URL/webhook/domain-sherpa" \
  -H "Content-Type: application/json" \
  -d "$TEST_PAYLOAD")

http_code_a=$(echo "$response_a" | tail -n1 | cut -d: -f2)
response_body_a=$(echo "$response_a" | head -n -1)

echo "📊 Option A Response Code: $http_code_a"
echo "📄 Option A Response:"
echo "$response_body_a" | jq . 2>/dev/null || echo "$response_body_a"
echo ""

echo "📡 Testing Option B (HTTP Fallback)"
echo "Endpoint: $N8N_URL/webhook/domain-sherpa-fallback"
echo "Payload: $TEST_PAYLOAD"
echo ""

response_b=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST \
  "$N8N_URL/webhook/domain-sherpa-fallback" \
  -H "Content-Type: application/json" \
  -d "$TEST_PAYLOAD")

http_code_b=$(echo "$response_b" | tail -n1 | cut -d: -f2)
response_body_b=$(echo "$response_b" | head -n -1)

echo "📊 Option B Response Code: $http_code_b"
echo "📄 Option B Response:"
echo "$response_body_b" | jq . 2>/dev/null || echo "$response_body_b"
echo ""

echo "✅ Acceptance Checklist:"
echo "========================"

# Check Option A
if [ "$http_code_a" = "200" ]; then
  suggestions_a=$(echo "$response_body_a" | jq '.suggestions // empty' 2>/dev/null)
  chosen_a=$(echo "$response_body_a" | jq '.chosen // empty' 2>/dev/null)
  
  if [ -n "$suggestions_a" ] && [ "$suggestions_a" != "null" ]; then
    echo "✅ Option A: Has suggestions array"
  else
    echo "❌ Option A: Missing suggestions array"
  fi
  
  if [ -n "$chosen_a" ] && [ "$chosen_a" != "null" ]; then
    echo "✅ Option A: Has chosen domain"
  else
    echo "❌ Option A: Missing chosen domain"
  fi
else
  echo "❌ Option A: HTTP request failed"
fi

# Check Option B
if [ "$http_code_b" = "200" ]; then
  suggestions_b=$(echo "$response_body_b" | jq '.suggestions // empty' 2>/dev/null)
  chosen_b=$(echo "$response_body_b" | jq '.chosen // empty' 2>/dev/null)
  
  if [ -n "$suggestions_b" ] && [ "$suggestions_b" != "null" ]; then
    echo "✅ Option B: Has suggestions array"
  else
    echo "❌ Option B: Missing suggestions array"
  fi
  
  if [ -n "$chosen_b" ] && [ "$chosen_b" != "null" ]; then
    echo "✅ Option B: Has chosen domain"
  else
    echo "❌ Option B: Missing chosen domain"
  fi
else
  echo "❌ Option B: HTTP request failed"
fi

echo ""
echo "🎯 Both workflows should return:"
echo "- suggestions[] array with domain/rationale pairs"
echo "- chosen object with domain/reason"
echo "- purchase object (when register=true)"