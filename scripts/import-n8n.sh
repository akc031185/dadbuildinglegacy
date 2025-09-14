#!/bin/bash
set -e

N8N_BASE_URL=${N8N_BASE_URL:-"http://localhost:5678"}

echo "📥 Importing DBL Website Builder n8n Workflows"
echo "=============================================="

# Check if n8n is running
echo "🔍 Checking n8n connectivity..."
if ! curl -s "$N8N_BASE_URL/healthz" > /dev/null 2>&1; then
    echo "❌ n8n is not accessible at $N8N_BASE_URL"
    echo ""
    echo "To start n8n:"
    echo "cd ~/n8n-stack"
    echo "docker-compose up -d"
    echo ""
    echo "Wait a few seconds, then try again."
    exit 1
fi
echo "✅ n8n is running"

# Check if workflows directory exists
if [ ! -d "workflows" ]; then
    echo "❌ workflows/ directory not found. Please create n8n workflow JSON files first."
    exit 1
fi

echo ""
echo "📋 Available workflows:"
ls -1 workflows/*.json | sed 's|workflows/||g' | sed 's|\.json||g' | sed 's/^/  - /'
echo ""

# Import each workflow
imported=0
failed=0

for workflow in workflows/*.json; do
    if [ -f "$workflow" ]; then
        workflow_name=$(basename "$workflow" .json)
        echo "📥 Importing $workflow_name..."
        
        # Try to import the workflow
        response=$(curl -s -w "%{http_code}" -X POST \
            "$N8N_BASE_URL/api/v1/workflows/import" \
            -H "Content-Type: application/json" \
            -d @"$workflow" \
            -o /tmp/import_response.json)
        
        if [ "$response" = "200" ] || [ "$response" = "201" ]; then
            echo "✅ Imported $workflow_name successfully"
            ((imported++))
        else
            echo "❌ Failed to import $workflow_name (HTTP $response)"
            if [ -f "/tmp/import_response.json" ]; then
                echo "   Error details: $(cat /tmp/import_response.json | jq -r '.message // .error // .' 2>/dev/null || cat /tmp/import_response.json)"
            fi
            ((failed++))
        fi
    fi
done

echo ""
echo "📊 Import Summary:"
echo "  ✅ Successfully imported: $imported workflows"
if [ $failed -gt 0 ]; then
    echo "  ❌ Failed to import: $failed workflows"
fi

echo ""
echo "🎉 Workflow import process completed!"
echo ""
echo "🔗 Next steps:"
echo "1. Access n8n dashboard: $N8N_BASE_URL"
echo "2. Activate imported workflows in the n8n UI"
echo "3. Configure credentials (Anthropic, Vercel, GitHub tokens)"
echo "4. Test endpoints using the test scripts:"
echo "   ./scripts/test-domain-sherpa.sh"
echo "   ./scripts/test-logo-brandsmith.sh"
echo "   ./scripts/test-site-builder.sh"
echo "   ./scripts/test-vercel-deployer.sh"
echo "   ./scripts/test-ghl-opportunity.sh"
echo ""
echo "📖 Full documentation: docs/OPERATIONS.md"

# Manual import instructions
echo ""
echo "📖 Manual Import Instructions (if script fails):"
echo "=============================================="
echo ""
echo "If automated import fails, you can import workflows manually:"
echo ""
echo "1. Go to n8n dashboard: $N8N_BASE_URL"
echo "2. Click 'Import from file' or use these curl commands:"
echo ""

for workflow in workflows/*.json; do
    if [ -f "$workflow" ]; then
        workflow_name=$(basename "$workflow" .json)
        echo "# Import $workflow_name"
        echo "curl -X POST '$N8N_BASE_URL/api/v1/workflows/import' \\"
        echo "  -H 'Content-Type: application/json' \\"
        echo "  -d @'$workflow'"
        echo ""
    fi
done

echo "💡 Troubleshooting:"
echo "- Ensure n8n is running: docker ps | grep n8n"
echo "- Check n8n logs: docker logs n8n"
echo "- Verify JSON syntax: jq . workflows/filename.json"
echo "- Check network connectivity: curl $N8N_BASE_URL/healthz"