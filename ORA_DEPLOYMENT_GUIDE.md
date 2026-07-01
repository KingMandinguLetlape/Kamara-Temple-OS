# 🚀 ORA Universe - Complete Deployment Guide

## System Architecture

```
POLYGON BLOCKCHAIN (Amoy)
├─ KamaraPayment.sol (Payment Smart Contract)
└─ OTToken.sol (ERC-20 Token)
        ⬇️
NODE.JS BACKEND API (Port 3000)
├─ POST /tx/create (Generate Payments)
├─ POST /tx/settle (Process QR Scans)
├─ GET /tx/:qrId (Check Status)
└─ GET /stats (Contract Stats)
        ⬇️
REACT NATIVE SCANNER APP
├─ Camera QR Detection
├─ Transaction Settlement
└─ Real-time Feedback
```

## Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask wallet with Polygon Amoy testnet funds
- Git

## Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/KingMandinguLetlape/Kamara-Temple-OS.git
cd Kamara-Temple-OS
npm install
```

### 2️⃣ Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with:

```env
NETWORK=Polygon Amoy
RPC_URL=https://rpc-amoy.polygon.technology
PRIVATE_KEY=YOUR_PRIVATE_KEY_HERE
PORT=3000
NODE_ENV=development
```

### 3️⃣ Get Testnet Funds

1. Add Polygon Amoy to MetaMask
2. Get test MATIC from: https://faucet.polygon.technology/
3. Export private key from MetaMask

### 4️⃣ Compile Smart Contracts

```bash
npm run compile
```

### 5️⃣ Deploy Contracts to Amoy Testnet

```bash
npm run deploy:amoy
```

Copy the KamaraPayment address from output and add to .env:

```bash
CONTRACT_ADDRESS=0x...(from deployment output)
TOKEN_ADDRESS=0x...(from deployment output)
```

### 6️⃣ Start Backend API

```bash
npm start
```

Expected output:
```
🚀 ORA UNIVERSE API LIVE
📍 Running on http://localhost:3000
⛓️  Network: Polygon Amoy
📦 Contract: 0x...
✨ Ready to accept payments...
```

### 7️⃣ Test API Health

```bash
curl http://localhost:3000/health
```

Response:
```json
{
  "status": "LIVE",
  "network": "Polygon Amoy",
  "contract": "0x..."
}
```

## API Testing

### Create Test Transaction

```bash
curl -X POST http://localhost:3000/tx/create \
  -H "Content-Type: application/json" \
  -d '{
    "qrId": "QR-123-TEST",
    "receiver": "0x742d35Cc6634C0532925a3b844Bc0e7595f47D5D",
    "amount": "0.1",
    "expiry": "2026-12-31T23:59:59Z"
  }'
```

### Check Transaction Status

```bash
curl http://localhost:3000/tx/QR-123-TEST
```

### Settle Transaction

```bash
curl -X POST http://localhost:3000/tx/settle \
  -H "Content-Type: application/json" \
  -d '{"qrId": "QR-123-TEST"}'
```

### Get Contract Stats

```bash
curl http://localhost:3000/stats
```

## Production Deployment

### Deploy to Polygon Mainnet

```bash
# Update .env
NETWORK=Polygon Mainnet
RPC_URL=https://polygon-rpc.com

# Deploy
npm run deploy:polygon
```

### Backend Hosting Options

- Railway
- Heroku
- AWS Lambda
- DigitalOcean
- Vercel

## Troubleshooting

### Error: Invalid RPC URL
- Verify RPC_URL in .env
- Check network connectivity

### Error: Contract not found
- Verify CONTRACT_ADDRESS is correct
- Ensure network matches deployment

### Error: Insufficient funds
- Get more test MATIC from faucet
- Use smaller amounts

## API Reference

### POST /tx/create
Create payment transaction

### POST /tx/settle
Settle pending transaction

### GET /tx/:qrId
Check transaction status

### GET /tx/:qrId/details
Get full transaction details

### GET /stats
Get contract statistics

### GET /health
Health check endpoint
