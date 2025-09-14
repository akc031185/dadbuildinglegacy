#!/bin/bash
set -e

N8N_URL=${N8N_URL:-"http://localhost:5678"}

echo "🏢 Testing GHL Opportunity Workflows"
echo "==================================="

# Test payload for GHL opportunity creation
GHL_PAYLOAD='{
  "ghlApiKey": "ghl_test_api_key_12345",
  "locationId": "loc_test_location_67890",
  "lead": {
    "name": "John Smith",
    "email": "john@techflow.com",
    "phone": "+1-555-0123",
    "source": "DBL Website Builder"
  }
}'

# Test payload without phone (optional field)
GHL_MINIMAL_PAYLOAD='{
  "ghlApiKey": "ghl_test_api_key_12345",
  "locationId": "loc_test_location_67890",
  "lead": {
    "name": "Jane Doe",
    "email": "jane@creativestudios.com"
  }
}'

echo "📡 Testing Option A (Official Anthropic Node)"
echo "============================================="

echo "🎯 Test 1: Full Lead with Phone"
echo "Endpoint: $N8N_URL/webhook/ghl-connector"
echo "Payload: $GHL_PAYLOAD"
echo ""

response_a1=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST \
  "$N8N_URL/webhook/ghl-connector" \
  -H "Content-Type: application/json" \
  -d "$GHL_PAYLOAD")

http_code_a1=$(echo "$response_a1" | tail -n1 | cut -d: -f2)
response_body_a1=$(echo "$response_a1" | head -n -1)

echo "📊 Option A - Full Lead Response Code: $http_code_a1"
echo "📄 Option A - Full Lead Response:"
echo "$response_body_a1" | jq . 2>/dev/null || echo "$response_body_a1"
echo ""

echo "🎯 Test 2: Minimal Lead (No Phone)"
echo "Payload: $GHL_MINIMAL_PAYLOAD"
echo ""

response_a2=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST \
  "$N8N_URL/webhook/ghl-connector" \
  -H "Content-Type: application/json" \
  -d "$GHL_MINIMAL_PAYLOAD")

http_code_a2=$(echo "$response_a2" | tail -n1 | cut -d: -f2)
response_body_a2=$(echo "$response_a2" | head -n -1)

echo "📊 Option A - Minimal Lead Response Code: $http_code_a2"
echo "📄 Option A - Minimal Lead Response:"
echo "$response_body_a2" | jq . 2>/dev/null || echo "$response_body_a2"
echo ""

echo "📡 Testing Option B (HTTP Fallback)"
echo "==================================="

echo "🎯 Test 1: Full Lead with Phone"
echo "Endpoint: $N8N_URL/webhook/ghl-connector-fallback"
echo ""

response_b1=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST \
  "$N8N_URL/webhook/ghl-connector-fallback" \
  -H "Content-Type: application/json" \
  -d "$GHL_PAYLOAD")

http_code_b1=$(echo "$response_b1" | tail -n1 | cut -d: -f2)
response_body_b1=$(echo "$response_b1" | head -n -1)

echo "📊 Option B - Full Lead Response Code: $http_code_b1"
echo "📄 Option B - Full Lead Response:"
echo "$response_body_b1" | jq . 2>/dev/null || echo "$response_body_b1"
echo ""

echo "🎯 Test 2: Minimal Lead (No Phone)"
echo ""

response_b2=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST \
  "$N8N_URL/webhook/ghl-connector-fallback" \
  -H "Content-Type: application/json" \
  -d "$GHL_MINIMAL_PAYLOAD")

http_code_b2=$(echo "$response_b2" | tail -n1 | cut -d: -f2)
response_body_b2=$(echo "$response_b2" | head -n -1)

echo "📊 Option B - Minimal Lead Response Code: $http_code_b2"
echo "📄 Option B - Minimal Lead Response:"
echo "$response_body_b2" | jq . 2>/dev/null || echo "$response_body_b2"
echo ""

echo "✅ Acceptance Checklist:"
echo "========================"

check_response() {
  local response_body="$1"
  local test_name="$2"
  
  if [ -n "$response_body" ]; then
    pipeline_id=$(echo "$response_body" | jq -r '.pipelineId // empty' 2>/dev/null)
    stages=$(echo "$response_body" | jq '.stages // empty' 2>/dev/null)
    contact_id=$(echo "$response_body" | jq -r '.contactId // empty' 2>/dev/null)
    opportunity_id=$(echo "$response_body" | jq -r '.opportunityId // empty' 2>/dev/null)
    
    # Check pipelineId
    if [ -n "$pipeline_id" ] && [ "$pipeline_id" != "null" ] && [ "$pipeline_id" != "empty" ]; then
      echo "✅ $test_name: Has pipeline ID ($pipeline_id)"
    else
      echo "❌ $test_name: Missing pipeline ID"
    fi
    
    # Check stages
    if [ -n "$stages" ] && [ "$stages" != "null" ]; then
      new_stage=$(echo "$stages" | jq -r '.New // empty' 2>/dev/null)
      qualified_stage=$(echo "$stages" | jq -r '.Qualified // empty' 2>/dev/null)
      
      if [ -n "$new_stage" ] && [ "$new_stage" != "null" ] && [ "$new_stage" != "empty" ]; then
        echo "✅ $test_name: Has 'New' stage ID ($new_stage)"
      else
        echo "❌ $test_name: Missing 'New' stage ID"
      fi
      
      if [ -n "$qualified_stage" ] && [ "$qualified_stage" != "null" ] && [ "$qualified_stage" != "empty" ]; then
        echo "✅ $test_name: Has 'Qualified' stage ID"
      else
        echo "❌ $test_name: Missing 'Qualified' stage ID"
      fi
    else
      echo "❌ $test_name: Missing stages object"
    fi
    
    # Check contactId
    if [ -n "$contact_id" ] && [ "$contact_id" != "null" ] && [ "$contact_id" != "empty" ]; then
      echo "✅ $test_name: Has contact ID ($contact_id)"
    else
      echo "❌ $test_name: Missing contact ID"
    fi
    
    # Check opportunityId
    if [ -n "$opportunity_id" ] && [ "$opportunity_id" != "null" ] && [ "$opportunity_id" != "empty" ]; then
      echo "✅ $test_name: Has opportunity ID ($opportunity_id)"
    else
      echo "❌ $test_name: Missing opportunity ID"
    fi
    
  else
    echo "❌ $test_name: No response body"
  fi
}

# Check all responses
[ "$http_code_a1" = "200" ] && check_response "$response_body_a1" "Option A - Full Lead"
[ "$http_code_a2" = "200" ] && check_response "$response_body_a2" "Option A - Minimal Lead" 
[ "$http_code_b1" = "200" ] && check_response "$response_body_b1" "Option B - Full Lead"
[ "$http_code_b2" = "200" ] && check_response "$response_body_b2" "Option B - Minimal Lead"

echo ""
echo "🎯 Expected Response Structure:"
echo "- pipelineId: GoHighLevel pipeline identifier"
echo "- stages: Object with stage names as keys, stage IDs as values"
echo "  - New: Stage ID for new opportunities"
echo "  - Qualified: Stage ID for qualified opportunities"
echo "  - Scheduled: Stage ID for scheduled opportunities"
echo "  - Closed: Stage ID for closed opportunities"
echo "- contactId: GoHighLevel contact identifier"
echo "- opportunityId: GoHighLevel opportunity identifier"
echo ""
echo "📋 Environment Variables Required:"
echo "- GHL_BASE: GoHighLevel API base URL (optional, defaults to https://services.leadconnectorhq.com)"
echo "- ANTHROPIC_API_KEY: Anthropic API key for Option B HTTP fallback"
echo ""
echo "🔗 GoHighLevel API Endpoints Used:"
echo "1. GET /pipelines/?locationId={id} (get existing pipelines)"
echo "2. POST /pipelines/ (create new pipeline if needed)"
echo "3. POST /contacts/ (upsert contact)"
echo "4. POST /opportunities/ (create opportunity in 'New' stage)"