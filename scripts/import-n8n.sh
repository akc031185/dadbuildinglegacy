#!/bin/bash
set -e

N8N_BASE_URL=${N8N_BASE_URL:-"http://localhost:5678"}

echo "Importing n8n workflows..."

# Check if n8n workflows directory exists
if [ ! -d "workflows" ]; then
    echo "❌ workflows/ directory not found. Please create n8n workflow JSON files first."
    exit 1
fi

# Import each workflow
for workflow in workflows/*.json; do
    if [ -f "$workflow" ]; then
        workflow_name=$(basename "$workflow" .json)
        echo "Importing $workflow_name..."
        
        # Try to import the workflow
        response=$(curl -s -w "%{http_code}" -X POST \
            "$N8N_BASE_URL/api/v1/workflows/import" \
            -H "Content-Type: application/json" \
            -d @"$workflow" \
            -o /dev/null)
        
        if [ "$response" = "200" ] || [ "$response" = "201" ]; then
            echo "✅ Imported $workflow_name successfully"
        else
            echo "❌ Failed to import $workflow_name (HTTP $response)"
        fi
    fi
done

echo "🎉 Workflow import process completed!"
echo "Access n8n at: $N8N_BASE_URL"