#!/bin/bash
set -e

echo "🚀 Starting DBL Website Builder Development Environment"
echo "====================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install --legacy-peer-deps
fi

# Check environment variables
echo "🔍 Checking environment variables..."

MISSING_VARS=()

if [ -z "$MONGODB_URI" ]; then
    MISSING_VARS+=("MONGODB_URI")
fi

if [ -z "$ANTHROPIC_API_KEY" ]; then
    MISSING_VARS+=("ANTHROPIC_API_KEY")
fi

if [ -z "$VERCEL_TOKEN" ]; then
    MISSING_VARS+=("VERCEL_TOKEN")
fi

if [ -z "$GITHUB_TOKEN" ]; then
    MISSING_VARS+=("GITHUB_TOKEN")
fi

if [ ${#MISSING_VARS[@]} -gt 0 ]; then
    echo "⚠️ Missing environment variables:"
    for var in "${MISSING_VARS[@]}"; do
        echo "   - $var"
    done
    echo ""
    echo "💡 Create a .env.local file with these variables:"
    echo "MONGODB_URI=mongodb+srv://..."
    echo "ANTHROPIC_API_KEY=sk-ant-..."
    echo "VERCEL_TOKEN=..."
    echo "GITHUB_TOKEN=ghp_..."
    echo "GITHUB_ORG=your-github-org"
    echo "N8N_URL=http://localhost:5678"
    echo ""
    echo "Or export them in your shell:"
    echo "export MONGODB_URI='mongodb+srv://...'"
    echo "export ANTHROPIC_API_KEY='sk-ant-...'"
    echo ""
fi

# Check if n8n is running
echo "🔍 Checking n8n status..."
N8N_URL=${N8N_URL:-"http://localhost:5678"}

if curl -s "$N8N_URL/healthz" > /dev/null 2>&1; then
    echo "✅ n8n is running at $N8N_URL"
else
    echo "⚠️ n8n is not running at $N8N_URL"
    echo ""
    echo "To start n8n:"
    echo "cd ~/n8n-stack"
    echo "docker-compose up -d"
    echo ""
    echo "To check n8n status:"
    echo "docker ps | grep n8n"
    echo ""
fi

# Test database connection
if [ -n "$MONGODB_URI" ]; then
    echo "🔍 Testing MongoDB connection..."
    
    # Use the approved MongoDB test command
    MONGODB_URI="mongodb+srv://dadbuildinglegacy-admin:Humtum12$@dbl.z78vsxc.mongodb.net/dadbuildinglegacy?retryWrites=true&w=majority&appName=dbl" node -e "
const mongoose = require('mongoose');
console.log('Connecting to:', process.env.MONGODB_URI.replace(/:[^@]*@/, ':****@'));
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected successfully');
    const Post = mongoose.model('Post', new mongoose.Schema({}, {strict: false}));
    return Post.find({}).limit(5);
  })
  .then(posts => {
    console.log('📊 Found', posts.length, 'posts');
    posts.forEach(post => console.log('- ', post.title || post._id));
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  });" || echo "⚠️ MongoDB connection test failed"
fi

# Check if ports are available
echo "🔍 Checking port availability..."

check_port() {
    local port=$1
    local service=$2
    
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "⚠️ Port $port is already in use (needed for $service)"
        echo "   Process: $(lsof -Pi :$port -sTCP:LISTEN | tail -n1 | awk '{print $1, $2}')"
        return 1
    else
        echo "✅ Port $port is available for $service"
        return 0
    fi
}

PORT_3000_AVAILABLE=true
if ! check_port 3000 "Next.js"; then
    PORT_3000_AVAILABLE=false
fi

# Start development server
echo ""
echo "🚀 Starting development server..."
echo "================================"

if [ "$PORT_3000_AVAILABLE" = true ]; then
    echo "📱 Next.js will be available at: http://localhost:3000"
    echo "🔧 n8n dashboard available at: $N8N_URL"
    echo ""
    echo "📋 Useful development commands:"
    echo "- npm run dev          # Start development server"
    echo "- npm run build        # Build for production"
    echo "- npm run start        # Start production server"
    echo "- npm run lint         # Run ESLint"
    echo "- npm run type-check   # Run TypeScript check"
    echo ""
    echo "🧪 Test commands:"
    echo "- ./scripts/test-domain-sherpa.sh      # Test domain agent"
    echo "- ./scripts/test-logo-brandsmith.sh    # Test logo agent"
    echo "- ./scripts/test-site-builder.sh       # Test site builder"
    echo "- ./scripts/test-vercel-deployer.sh    # Test vercel deployer"
    echo "- ./scripts/test-ghl-opportunity.sh    # Test GHL connector"
    echo ""
    
    # Option to auto-start
    if [ "${AUTO_START:-false}" = "true" ]; then
        echo "🚀 Auto-starting development server..."
        npm run dev
    else
        echo "💡 Run 'npm run dev' to start the development server"
        echo "   Or set AUTO_START=true to auto-start"
    fi
else
    echo "❌ Cannot start development server - port 3000 is not available"
    echo ""
    echo "To free up port 3000:"
    echo "sudo lsof -ti:3000 | xargs kill -9"
    echo ""
    echo "Or use a different port:"
    echo "PORT=3001 npm run dev"
fi

echo ""
echo "📖 Documentation:"
echo "   docs/OPERATIONS.md - Complete operations guide"
echo "   README.md - Project overview and setup"
echo ""
echo "🔗 Important URLs:"
echo "   Frontend: http://localhost:3000"
echo "   n8n: $N8N_URL"
echo "   MongoDB: mongodb://.../dadbuildinglegacy"
echo ""
echo "Happy coding! 🎉"