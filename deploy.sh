#!/bin/bash
# GoDaddy Deployment Script
# This script automates the preparation and building of your project for deployment

set -e  # Exit on error

echo "🚀 Nextdot - GoDaddy Deployment Preparation Script"
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo "📋 Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node -v) found${NC}"
echo -e "${GREEN}✓ npm $(npm -v) found${NC}"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencies installed successfully${NC}"
else
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi
echo ""

# Run linting
echo "🔍 Running linter..."
npm run lint

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Linting passed${NC}"
else
    echo -e "${YELLOW}⚠ Linting warnings found (non-blocking)${NC}"
fi
echo ""

# Build the project
echo "🔨 Building for production..."
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build completed successfully${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi
echo ""

# Display build results
echo "📊 Build Summary"
echo "==============="
echo ""
if [ -d "dist" ]; then
    DIST_SIZE=$(du -sh dist | cut -f1)
    echo "Build directory: dist/"
    echo "Build size: $DIST_SIZE"
    echo ""
    echo "Contents:"
    ls -la dist/ | grep -E "^d|^-" | awk '{print "  " $NF}'
    echo ""
fi

# Create deployment package info
echo "📦 Deployment Package Information"
echo "=================================="
echo ""
echo "Deployment Structure (upload to public_html/):"
echo ""
cat > deployment_structure.txt << 'EOF'
public_html/
├── index.html                    (SPA entry point)
├── .htaccess                     (SPA routing configuration)
│
├── css/
│   └── style.css                (Main stylesheet)
│
├── js/
│   ├── script.js                (Main JavaScript)
│   └── [name]-[hash].js         (Chunked modules)
│
├── images/
│   ├── Fav_icon.png
│   ├── logo.png
│   └── [other images]
│
└── videos/
    └── [video files]

Total build files to upload:
EOF

# Count files
find dist -type f | wc -l >> deployment_structure.txt
echo "" >> deployment_structure.txt
echo "Total size:" >> deployment_structure.txt
du -sh dist >> deployment_structure.txt

cat deployment_structure.txt
echo ""

echo "📋 Next Steps:"
echo "1. Review the deployment structure above"
echo "2. Upload all files from 'dist/' folder to GoDaddy public_html/"
echo "3. Upload '.htaccess' file (ensure it's not hidden)"
echo "4. Update .htaccess RewriteBase if needed:"
echo "   - For root: RewriteBase /"
echo "   - For subfolder: RewriteBase /nextdot/"
echo "5. Test all routes on your live domain"
echo "6. Check browser console for errors"
echo ""

echo -e "${GREEN}✅ Deployment preparation complete!${NC}"
echo ""
echo "📖 For detailed instructions, see: GODADDY_DEPLOYMENT_GUIDE.md"
