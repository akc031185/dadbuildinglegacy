#!/bin/bash
set -e

N8N_URL=${N8N_URL:-"http://localhost:5678"}

echo "🎨 Testing Logo Brandsmith Workflows"
echo "===================================="

# Test payload for new logo generation
GENERATE_PAYLOAD='{
  "companyName": "TechFlow Solutions",
  "hasUpload": false,
  "uploadUrl": null,
  "stylePrompt": "Modern, minimalist tech company logo with flowing lines and gradient colors. Should convey innovation and reliability."
}'

# Test payload for logo cleanup/upscale
UPLOAD_PAYLOAD='{
  "companyName": "Legacy Corp",
  "hasUpload": true,
  "uploadUrl": "https://example.com/logos/legacy-logo.png",
  "stylePrompt": null
}'

echo "📡 Testing Option A (Official Anthropic Node)"
echo "============================================="

echo "🎯 Test 1: Logo Generation (hasUpload=false)"
echo "Endpoint: $N8N_URL/webhook/logo-brandsmith"
echo "Payload: $GENERATE_PAYLOAD"
echo ""

response_a1=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST \
  "$N8N_URL/webhook/logo-brandsmith" \
  -H "Content-Type: application/json" \
  -d "$GENERATE_PAYLOAD")

http_code_a1=$(echo "$response_a1" | tail -n1 | cut -d: -f2)
response_body_a1=$(echo "$response_a1" | head -n -1)

echo "📊 Option A - Generate Response Code: $http_code_a1"
echo "📄 Option A - Generate Response:"
echo "$response_body_a1" | jq . 2>/dev/null || echo "$response_body_a1"
echo ""

echo "🎯 Test 2: Logo Upload/Cleanup (hasUpload=true)"
echo "Payload: $UPLOAD_PAYLOAD"
echo ""

response_a2=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST \
  "$N8N_URL/webhook/logo-brandsmith" \
  -H "Content-Type: application/json" \
  -d "$UPLOAD_PAYLOAD")

http_code_a2=$(echo "$response_a2" | tail -n1 | cut -d: -f2)
response_body_a2=$(echo "$response_a2" | head -n -1)

echo "📊 Option A - Upload Response Code: $http_code_a2"
echo "📄 Option A - Upload Response:"
echo "$response_body_a2" | jq . 2>/dev/null || echo "$response_body_a2"
echo ""

echo "📡 Testing Option B (HTTP Fallback)"
echo "==================================="

echo "🎯 Test 1: Logo Generation (hasUpload=false)"
echo "Endpoint: $N8N_URL/webhook/logo-brandsmith-fallback"
echo ""

response_b1=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST \
  "$N8N_URL/webhook/logo-brandsmith-fallback" \
  -H "Content-Type: application/json" \
  -d "$GENERATE_PAYLOAD")

http_code_b1=$(echo "$response_b1" | tail -n1 | cut -d: -f2)
response_body_b1=$(echo "$response_b1" | head -n -1)

echo "📊 Option B - Generate Response Code: $http_code_b1"
echo "📄 Option B - Generate Response:"
echo "$response_body_b1" | jq . 2>/dev/null || echo "$response_body_b1"
echo ""

echo "🎯 Test 2: Logo Upload/Cleanup (hasUpload=true)"
echo ""

response_b2=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST \
  "$N8N_URL/webhook/logo-brandsmith-fallback" \
  -H "Content-Type: application/json" \
  -d "$UPLOAD_PAYLOAD")

http_code_b2=$(echo "$response_b2" | tail -n1 | cut -d: -f2)
response_body_b2=$(echo "$response_b2" | head -n -1)

echo "📊 Option B - Upload Response Code: $http_code_b2"
echo "📄 Option B - Upload Response:"
echo "$response_body_b2" | jq . 2>/dev/null || echo "$response_body_b2"
echo ""

echo "✅ Acceptance Checklist:"
echo "========================"

check_response() {
  local response_body="$1"
  local test_name="$2"
  
  if [ -n "$response_body" ]; then
    concepts=$(echo "$response_body" | jq '.concepts // empty' 2>/dev/null)
    brand_guide=$(echo "$response_body" | jq '.brandGuide // empty' 2>/dev/null)
    colors=$(echo "$response_body" | jq '.brandGuide.colors // empty' 2>/dev/null)
    typography=$(echo "$response_body" | jq '.brandGuide.typography // empty' 2>/dev/null)
    
    if [ -n "$concepts" ] && [ "$concepts" != "null" ]; then
      concept_count=$(echo "$concepts" | jq 'length' 2>/dev/null)
      echo "✅ $test_name: Has concepts array ($concept_count items)"
      
      # Check if concepts have required fields
      first_concept=$(echo "$concepts" | jq '.[0] // empty' 2>/dev/null)
      if [ -n "$first_concept" ]; then
        svg=$(echo "$first_concept" | jq '.svg // empty' 2>/dev/null)
        png_light=$(echo "$first_concept" | jq '.pngLight // empty' 2>/dev/null)
        png_dark=$(echo "$first_concept" | jq '.pngDark // empty' 2>/dev/null)
        
        [ -n "$svg" ] && [ "$svg" != "null" ] && echo "✅ $test_name: Has SVG content"
        [ -n "$png_light" ] && [ "$png_light" != "null" ] && echo "✅ $test_name: Has PNG light version"
        [ -n "$png_dark" ] && [ "$png_dark" != "null" ] && echo "✅ $test_name: Has PNG dark version"
      fi
    else
      echo "❌ $test_name: Missing concepts array"
    fi
    
    if [ -n "$brand_guide" ] && [ "$brand_guide" != "null" ]; then
      echo "✅ $test_name: Has brand guide"
      [ -n "$colors" ] && [ "$colors" != "null" ] && echo "✅ $test_name: Has color palette"
      [ -n "$typography" ] && [ "$typography" != "null" ] && echo "✅ $test_name: Has typography guide"
    else
      echo "❌ $test_name: Missing brand guide"
    fi
  else
    echo "❌ $test_name: No response body"
  fi
}

# Check all responses
[ "$http_code_a1" = "200" ] && check_response "$response_body_a1" "Option A - Generate"
[ "$http_code_a2" = "200" ] && check_response "$response_body_a2" "Option A - Upload"
[ "$http_code_b1" = "200" ] && check_response "$response_body_b1" "Option B - Generate"
[ "$http_code_b2" = "200" ] && check_response "$response_body_b2" "Option B - Upload"

echo ""
echo "🎯 Expected Response Structure:"
echo "- concepts[] array with 6 items (for generation) or enhanced versions (for upload)"
echo "- Each concept has: name, description, svg, pngLight, pngDark"
echo "- brandGuide object with colors[] and typography"
echo "- SVG should be valid, self-contained vector graphics"
echo "- PNG should be base64 encoded image data"