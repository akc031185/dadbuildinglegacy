#!/bin/bash
set -e

N8N_BASE_URL=${N8N_BASE_URL:-"http://localhost:5678"}

echo "Exporting n8n workflows..."

# Create workflows directory if it doesn't exist
mkdir -p workflows

# List of workflow names to export
WORKFLOWS=(
    "domain-sherpa"
    "logo-brandsmith" 
    "site-builder"
    "vercel-deployer"
)

for workflow_name in "${WORKFLOWS[@]}"; do
    echo "Exporting $workflow_name..."
    
    # Try to export the workflow by name
    response=$(curl -s -w "%{http_code}" \
        "$N8N_BASE_URL/api/v1/workflows?filter={\"name\":\"$workflow_name\"}" \
        -H "Accept: application/json" \
        -o "workflows/${workflow_name}.json")
    
    if [ "$response" = "200" ]; then
        echo "✅ Exported $workflow_name successfully"
    else
        echo "❌ Failed to export $workflow_name (HTTP $response)"
        # Remove empty file if created
        rm -f "workflows/${workflow_name}.json"
    fi
done

echo "🎉 Workflow export process completed!"
echo "Workflows saved in: $(pwd)/workflows/"