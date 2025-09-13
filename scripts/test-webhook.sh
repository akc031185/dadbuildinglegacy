#!/bin/bash
set -e

API_URL=${API_URL:-"http://localhost:3000"}
N8N_URL=${N8N_URL:-"http://localhost:5678"}

echo "🧪 Testing DBL Website Builder System"
echo "=================================="

# Test data payload
TEST_PAYLOAD='{
  "fullName": "John Smith",
  "email": "john.smith@example.com",
  "phone": "(555) 123-4567",
  "community": "Gator",
  "companyName": "Smith Construction Co",
  "hasDomain": false,
  "domainPreferences": ["smithconstruction", "smithbuilds"],
  "autoRegister": true,
  "hasLogo": true,
  "logoPrompt": "Modern construction logo with hammer and house silhouette, professional blue and orange colors",
  "siteGoal": "Generate leads for residential and commercial construction services",
  "pagesWanted": ["Home/Landing Page", "About Us", "Services", "Portfolio/Gallery", "Contact"],
  "features": ["Contact Forms", "Photo Gallery", "Testimonials", "Online Booking/Scheduling"],
  "copyTone": "Professional",
  "crmProvider": "GoHighLevel",
  "timeline": "2 weeks",
  "budget": "$1000-2000",
  "specialRequests": "Need to showcase before/after photos of renovation projects"
}'

echo "📡 Testing API endpoint: $API_URL/api/requests"
echo "Sending test payload..."

# Make API request and capture response
response=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST \
  "$API_URL/api/requests" \
  -H "Content-Type: application/json" \
  -d "$TEST_PAYLOAD")

# Extract HTTP code and body
http_code=$(echo "$response" | tail -n1 | cut -d: -f2)
response_body=$(echo "$response" | head -n -1)

echo "📊 Response Code: $http_code"
echo "📄 Response Body:"
echo "$response_body" | jq . 2>/dev/null || echo "$response_body"

if [ "$http_code" = "200" ]; then
  echo "✅ API request successful!"
  
  # Extract request ID if available
  request_id=$(echo "$response_body" | jq -r '.requestId // empty' 2>/dev/null)
  if [ -n "$request_id" ]; then
    echo "🎫 Request ID: $request_id"
  fi
  
else
  echo "❌ API request failed with code $http_code"
fi

echo ""
echo "🔗 Next steps to test full pipeline:"
echo "1. Start n8n: docker-compose up -d (from n8n-stack directory)"
echo "2. Import workflows: ./scripts/import-n8n.sh"
echo "3. Set N8N_INTAKE_WEBHOOK_URL=http://localhost:5678/webhook/intake in .env.local"
echo "4. Rerun this test to trigger the full workflow"
echo ""
echo "🌐 Access points:"
echo "- Web form: $API_URL/build-my-site"
echo "- n8n interface: $N8N_URL"
echo "- API endpoint: $API_URL/api/requests"