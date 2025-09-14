# n8n Workflow Export Guide

## Overview
This guide explains how to export workflows from n8n for backup, version control, or migration purposes.

## Export Methods

### Method 1: n8n Web Interface (Recommended)

#### Export Single Workflow
1. Open n8n dashboard: http://localhost:5678
2. Navigate to the workflow you want to export
3. Click the "..." menu (three dots) in the top-right corner
4. Select "Download" or "Export"
5. Save the `.json` file to your `workflows/` directory

#### Export All Workflows
1. Go to n8n dashboard: http://localhost:5678
2. Click on "Templates" in the left sidebar
3. Go to "My workflows" section
4. Select all workflows you want to export
5. Click "Export" button
6. Download the combined JSON file
7. Extract individual workflows if needed

### Method 2: n8n CLI (Advanced)

#### Prerequisites
```bash
# Install n8n CLI globally (if not using Docker)
npm install -g n8n

# Or access via Docker container
docker exec -it n8n n8n --help
```

#### Export Commands
```bash
# Export all workflows
docker exec n8n n8n export:workflow --all --output=/data/backups/

# Export specific workflow by ID
docker exec n8n n8n export:workflow --id=workflow_id --output=/data/backups/

# Export specific workflow by name
docker exec n8n n8n export:workflow --name="Domain Sherpa - Option A" --output=/data/backups/

# List all workflows to get IDs
docker exec n8n n8n list:workflow
```

#### Export with Credentials (Careful!)
```bash
# Export credentials (contains sensitive data!)
docker exec n8n n8n export:credentials --all --output=/data/backups/

# SECURITY WARNING: Never commit credential exports to version control
# Add to .gitignore: *.credentials.json
```

### Method 3: API Export

#### Get Workflow List
```bash
# List all workflows via API
curl -X GET "http://localhost:5678/api/v1/workflows" \
  -H "Accept: application/json" | jq .

# With API key authentication (if configured)
curl -X GET "http://localhost:5678/api/v1/workflows" \
  -H "X-N8N-API-KEY: your_api_key" \
  -H "Accept: application/json"
```

#### Export Specific Workflow
```bash
# Get workflow by ID
WORKFLOW_ID="your_workflow_id"
curl -X GET "http://localhost:5678/api/v1/workflows/$WORKFLOW_ID" \
  -H "Accept: application/json" | jq . > "workflows/exported-workflow.json"
```

#### Batch Export Script
```bash
#!/bin/bash
# export-all-workflows.sh

N8N_URL="http://localhost:5678"
OUTPUT_DIR="workflows/exported"

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Get all workflow IDs and names
workflows=$(curl -s "$N8N_URL/api/v1/workflows" | jq -r '.data[] | "\(.id)|\(.name)"')

# Export each workflow
while IFS='|' read -r id name; do
    # Clean filename
    filename=$(echo "$name" | sed 's/[^a-zA-Z0-9-]/_/g' | tr '[:upper:]' '[:lower:]').json
    
    echo "Exporting: $name -> $filename"
    curl -s "$N8N_URL/api/v1/workflows/$id" | jq . > "$OUTPUT_DIR/$filename"
done <<< "$workflows"

echo "✅ Export completed to $OUTPUT_DIR/"
```

## Export Verification

### Validate JSON Structure
```bash
# Check if exported JSON is valid
jq empty workflows/your-workflow.json && echo "✅ Valid JSON" || echo "❌ Invalid JSON"

# Pretty print and check structure
jq . workflows/your-workflow.json | head -20

# Check for required fields
jq 'has("name") and has("nodes") and has("connections")' workflows/your-workflow.json
```

### Test Import
```bash
# Test import without actually importing
curl -X POST "http://localhost:5678/api/v1/workflows/import" \
  -H "Content-Type: application/json" \
  -d @workflows/your-workflow.json \
  --dry-run

# Or test with n8n CLI
docker exec n8n n8n import:workflow --file=/data/workflows/your-workflow.json --dry-run
```

## Backup Strategy

### Automated Backup Script
```bash
#!/bin/bash
# backup-n8n.sh

BACKUP_DIR="backups/$(date +%Y-%m-%d_%H-%M-%S)"
mkdir -p "$BACKUP_DIR"

echo "🔄 Creating n8n backup at $BACKUP_DIR"

# Export all workflows
docker exec n8n n8n export:workflow --all --output="/data/$BACKUP_DIR/workflows/"

# Export credentials (encrypted)
docker exec n8n n8n export:credentials --all --output="/data/$BACKUP_DIR/credentials/"

# Copy configuration
docker cp n8n:/data/.n8n "$BACKUP_DIR/config/"

# Create archive
tar -czf "$BACKUP_DIR.tar.gz" "$BACKUP_DIR/"

echo "✅ Backup completed: $BACKUP_DIR.tar.gz"
```

### Scheduled Backups (Cron)
```bash
# Add to crontab: crontab -e
# Daily backup at 2 AM
0 2 * * * /path/to/backup-n8n.sh

# Weekly backup on Sundays
0 2 * * 0 /path/to/backup-n8n.sh
```

## Version Control Integration

### Git Workflow
```bash
# Add workflows to version control
git add workflows/*.json

# Commit with descriptive message
git commit -m "feat: add domain sherpa workflow with anthropic integration"

# Push to repository
git push origin main

# Tag release
git tag -a v1.0.0 -m "Initial workflow release"
git push --tags
```

### .gitignore Configuration
```gitignore
# n8n sensitive data
*.credentials.json
backups/
.n8n/

# Environment files
.env.local
.env.production

# Node modules
node_modules/

# Build outputs
.next/
dist/
```

## Troubleshooting Export Issues

### Common Problems

#### 1. Permission Denied
```bash
# Fix Docker volume permissions
docker exec -u root n8n chown -R node:node /data/

# Or export to accessible directory
docker exec n8n n8n export:workflow --all --output=/tmp/
docker cp n8n:/tmp/ ./exported-workflows/
```

#### 2. Missing Workflows
```bash
# Check workflow status
docker exec n8n n8n list:workflow --status=all

# Check n8n logs
docker logs n8n | grep -i export

# Verify database connection
docker exec n8n n8n doctor
```

#### 3. Corrupted JSON
```bash
# Validate and fix JSON
jq . workflows/broken.json > workflows/fixed.json

# Remove null bytes
tr -d '\000' < workflows/broken.json > workflows/clean.json
```

### Recovery Procedures

#### Restore from Backup
```bash
# Stop n8n
docker-compose stop n8n

# Restore data directory
tar -xzf backup-2024-01-15.tar.gz
docker cp backup-2024-01-15/config/.n8n n8n:/data/

# Restart n8n
docker-compose start n8n

# Import workflows
./scripts/import-n8n.sh
```

#### Manual Recovery
```bash
# Recreate workflows from documentation
# Use the workflow JSON files in this repository as reference

# Import each workflow individually
for workflow in workflows/*.json; do
    curl -X POST "http://localhost:5678/api/v1/workflows/import" \
      -H "Content-Type: application/json" \
      -d @"$workflow"
done
```

## Best Practices

### 1. Regular Exports
- Export workflows after major changes
- Keep exported files in version control
- Document workflow purposes and dependencies

### 2. Naming Conventions
```bash
# Use descriptive filenames
domain-sherpa-option-a.json          # ✅ Good
logo-brandsmith-anthropic.json       # ✅ Good
workflow-1.json                      # ❌ Bad
```

### 3. Documentation
- Include workflow descriptions in JSON
- Document environment variables needed
- Note API dependencies and versions

### 4. Testing
- Test exported workflows before deploying
- Verify all nodes and connections work
- Check credential requirements

## Security Considerations

### Credential Handling
```bash
# NEVER export credentials to version control
# Use environment variables instead
export ANTHROPIC_API_KEY="sk-ant-..."

# If you must backup credentials, encrypt them
gpg --symmetric --cipher-algo AES256 credentials-backup.json
```

### Sanitization
```bash
# Remove sensitive data before sharing
jq 'del(.nodes[].credentials)' workflows/workflow.json > workflows/clean-workflow.json

# Remove personal information
jq '.nodes[].parameters.httpHeaderAuth.value = "{{env.API_KEY}}"' workflow.json
```

## Migration Guide

### Between n8n Instances
1. Export workflows from source n8n
2. Set up environment variables on target n8n
3. Import workflows to target n8n
4. Reconfigure credentials
5. Test all workflows

### Version Upgrades
1. Backup current workflows
2. Upgrade n8n
3. Test workflow compatibility
4. Update deprecated nodes if needed
5. Re-import if necessary

---

**Last Updated**: 2025-09-13  
**Version**: 1.0.0  
**Related Files**: 
- `scripts/import-n8n.sh` - Import workflows
- `docs/OPERATIONS.md` - Complete operations guide