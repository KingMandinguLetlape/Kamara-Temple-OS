# ⚡ ORA Universe - Quick Start

## 5 Minute Setup

```bash
# Clone and install
git clone https://github.com/KingMandinguLetlape/Kamara-Temple-OS.git
cd Kamara-Temple-OS
npm install

# Configure
cp .env.example .env
# Edit .env with your PRIVATE_KEY

# Deploy contracts
npm run deploy:amoy
# Copy CONTRACT_ADDRESS from output

# Update .env with CONTRACT_ADDRESS

# Start API
npm start
```

## Test It

```bash
# Health check
curl http://localhost:3000/health

# Create payment
curl -X POST http://localhost:3000/tx/create \
  -H "Content-Type: application/json" \
  -d '{
    "qrId": "TEST-001",
    "receiver": "0x742d35Cc6634C0532925a3b844Bc0e7595f47D5D",
    "amount": "0.01",
    "expiry": "2026-12-31T23:59:59Z"
  }'

# Check status
curl http://localhost:3000/tx/TEST-001

# Settle transaction
curl -X POST http://localhost:3000/tx/settle \
  -H "Content-Type: application/json" \
  -d '{"qrId": "TEST-001"}'
```

## What You Have

✅ Smart contracts (Solidity)
✅ Node.js API server
✅ React Native scanner app
✅ Complete deployment setup
✅ Hardhat configuration
✅ Environment templates

## Next Steps

1. Read `ORA_DEPLOYMENT_GUIDE.md` for detailed setup
2. Generate QR codes for your QR IDs
3. Deploy to Polygon mainnet
4. Build iOS/Android apps
5. Go live!
