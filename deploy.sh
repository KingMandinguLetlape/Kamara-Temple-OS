#!/bin/bash

# 🚀 ORA Universe - Automated Setup & Deployment Script

set -e

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║        🚀 ORA UNIVERSE - AUTOMATED DEPLOYMENT              ║"
echo "║     Smart Contracts + Backend API + Scanner App           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_section() {
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Step 1: Check prerequisites
print_section "Step 1: Checking Prerequisites"

if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed"
    echo "Download from: https://nodejs.org/"
    exit 1
fi
echo "Node.js version: $(node --version)"

if ! command -v npm &> /dev/null; then
    print_error "npm is not installed"
    exit 1
fi
echo "npm version: $(npm --version)"

print_success "All prerequisites met"

# Step 2: Install dependencies
print_section "Step 2: Installing Dependencies"

if [ ! -d "node_modules" ]; then
    echo "Installing npm packages..."
    npm install --legacy-peer-deps
    print_success "Dependencies installed"
else
    print_warning "node_modules already exists, skipping npm install"
fi

# Step 3: Compile smart contracts
print_section "Step 3: Compiling Smart Contracts"

echo "Compiling KamaraPayment.sol and OTToken.sol..."
npm run compile
print_success "Smart contracts compiled successfully"

# Step 4: Check environment
print_section "Step 4: Checking Environment Configuration"

if [ ! -f ".env" ]; then
    print_error ".env file not found"
    echo "Creating .env from .env.example..."
    cp .env.example .env
    print_warning "Please edit .env with your PRIVATE_KEY"
    exit 1
fi

if grep -q "your_private_key_here" .env; then
    print_error "PRIVATE_KEY not configured in .env"
    exit 1
fi

print_success "Environment configuration is valid"

# Step 5: Deploy smart contracts
print_section "Step 5: Deploying Smart Contracts to Polygon Amoy"

echo "Deploying contracts (this may take 1-2 minutes)..."
echo ""

npm run deploy:amoy

if [ -f "deployment-addresses.json" ]; then
    print_success "Contracts deployed successfully!"
    echo ""
    cat deployment-addresses.json
fi

# Step 6: Start API server
print_section "Step 6: Starting ORA Universe API Server"

echo "Starting API server on http://localhost:3000..."
echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}🚀 ORA UNIVERSE API LIVE${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════${NC}"
echo ""

npm start
