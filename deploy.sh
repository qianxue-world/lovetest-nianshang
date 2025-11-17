#!/bin/bash

# MBTI Personality Test - Deployment Script
# This script builds and deploys the Docker container

set -e

echo "🚀 Starting deployment..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Stop and remove existing container
echo -e "${BLUE}Stopping existing container...${NC}"
docker-compose down 2>/dev/null || true

# Build the Docker image
echo -e "${BLUE}Building Docker image...${NC}"
docker-compose build --no-cache

# Start the container
echo -e "${BLUE}Starting container...${NC}"
docker-compose up -d

# Wait for container to be ready
echo -e "${BLUE}Waiting for container to be ready...${NC}"
sleep 3

# Check if container is running
if docker ps | grep -q mbti-personality-test; then
    echo -e "${GREEN}✅ Deployment successful!${NC}"
    echo -e "${GREEN}Website is now running at: http://localhost${NC}"
    echo ""
    echo "Useful commands:"
    echo "  - View logs: docker-compose logs -f"
    echo "  - Stop: docker-compose down"
    echo "  - Restart: docker-compose restart"
else
    echo "❌ Deployment failed. Check logs with: docker-compose logs"
    exit 1
fi
