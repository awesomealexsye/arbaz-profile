#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting deployment process...${NC}\n"

# Build the project
echo -e "${YELLOW}� Building project...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful!${NC}\n"

# Navigate to dist folder
cd dist

# Initialize git if not already initialized
if [ ! -d .git ]; then
    echo -e "${YELLOW}📦 Initializing git in dist folder...${NC}"
    git init
    git branch -M main
    git remote add origin https://github.com/awesomealexsye/awesomealexsye.github.io.git
    echo -e "${GREEN}✅ Git initialized in dist${NC}\n"
else
    echo -e "${BLUE}📁 Git already initialized in dist${NC}\n"
fi

# Add all files
echo -e "${YELLOW}📝 Adding files...${NC}"
git add -A

# Commit
COMMIT_MSG="Deploy: $(date +'%Y-%m-%d %H:%M:%S')"
echo -e "${YELLOW}💾 Committing changes: ${COMMIT_MSG}${NC}"
git commit -m "$COMMIT_MSG"

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  No changes to commit${NC}"
fi

# Push to GitHub Pages
echo -e "${BLUE}🌐 Pushing to GitHub Pages...${NC}"
git push -f origin main

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✅ Deployment complete!${NC}"
    echo -e "${GREEN}🌎 Your site will be live at: ${BLUE}https://awesomealexsye.github.io${NC}"
else
    echo -e "\n${RED}❌ Deployment failed!${NC}"
    cd ..
    exit 1
fi

cd ..
echo -e "\n${GREEN}🎉 All done!${NC}"
