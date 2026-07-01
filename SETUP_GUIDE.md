# 🚀 ORA Universe - Complete Setup & Deployment Guide

## 📋 Table of Contents
1. [Quick Start](#-quick-start)
2. [Prerequisites](#-prerequisites)
3. [Detailed Setup](#-detailed-setup)
4. [Deployment Steps](#-deployment-steps)
5. [API Testing](#-api-testing)
6. [Troubleshooting](#-troubleshooting)
7. [Production Deployment](#-production-deployment)

---

## ⚡ Quick Start

```bash
# 1. Clone repository
git clone https://github.com/KingMandinguLetlape/Kamara-Temple-OS.git
cd Kamara-Temple-OS

# 2. Setup environment (macOS/Linux)
chmod +x deploy.sh
chmod +x test-api.sh
./deploy.sh

# 3. In another terminal, test the API
./test-api.sh
```

**Done!** Your ORA Universe is running on `http://localhost:3000`

---

## 📦 Prerequisites

### Required
- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm 9+** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

### Polygon Network Setup
1. **MetaMask Wallet**
   - Download: https://metamask.io/
   - Create or import account

2. **Add Polygon Amoy Testnet**
   - Open MetaMask → Settings → Networks → Add Network
   - Network Name: `Polygon Amoy`
   - RPC URL: `https://rpc-amoy.polygon.technology`
   - Chain ID: `80002`
   - Currency: `MATIC`

3. **Get Testnet Funds**
   - Go to: https://faucet.polygon.technology/
   - Select "Polygon Amoy"
   - Paste your wallet address
   - Request tokens (0.5 MATIC)

4. **Export Private Key**
   - Open MetaMask
   - Click Account → Account Details
   - Click "Export Private Key"
   - Copy the key (starts with 0x)

---

## 📝 Detailed Setup

### Step 1: Clone Repository

```bash
git clone https://github.com/KingMandinguLetlape/Kamara-Temple-OS.git
cd Kamara-Temple-OS
```

### Step 2: Create Environment File

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
# ⛓️ BLOCKCHAIN
NETWORK=Polygon Amoy
RPC_URL=https://rpc-amoy.polygon.technology
PRIVATE_KEY=0x1234567890abcdef...  # Your MetaMask private key
CONTRACT_ADDRESS=pending
TOKEN_ADDRESS=pending

# 🧠 API
PORT=3000
NODE_ENV=development

# 📲 FRONTEND
REACT_APP_API_URL=http://localhost:3000
```

**⚠️ CRITICAL:** Never share your PRIVATE_KEY!

### Step 3: Install Dependencies

```bash
npm install
```

This installs:
- Express.js (Backend)
- ethers.js (Blockchain)
- Hardhat (Smart Contract Deployment)
- OpenZeppelin Contracts

### Step 4: Compile Smart Contracts

```bash
npm run compile
```

Expected output:
```
Compiling 2 files with 0.8.20
Compilation finished successfully
```

---

## 🚀 Deployment Steps

### Option A: Using Automated Script (Recommended)

```bash
chmod +x deploy.sh
./deploy.sh
```

The script will:
1. ✅ Check prerequisites
2. ✅ Install dependencies
3. ✅ Compile smart contracts
4. ✅ Deploy to Polygon Amoy
5. ✅ Update .env with contract addresses
6. ✅ Start API server

### Option B: Manual Deployment

**Step 1: Deploy Smart Contracts**

```bash
npm run deploy:amoy
```

Output example:
```
🚀 Deploying ORA Universe Contracts...

📍 Deploying from: 0x1234...5678

1️⃣  Deploying OTToken...
✅ OTToken deployed: 0xABCD...EF01

2️⃣  Deploying KamaraPayment...
✅ KamaraPayment deployed: 0xFEDC...BA98

✨ Deployment Summary:
================================
Network: amoy
OTToken: 0xABCD...EF01
KamaraPayment: 0xFEDC...BA98
================================
```

**Step 2: Update .env**

Copy the `KamaraPayment` address:

```bash
# Edit .env
CONTRACT_ADDRESS=0xFEDC...BA98
TOKEN_ADDRESS=0xABCD...EF01
```

**Step 3: Start API Server**

```bash
npm start
```

Expected output:
```
🚀 ORA UNIVERSE API LIVE
📍 Running on http://localhost:3000
⛓️  Network: Polygon Amoy
📦 Contract: 0xFEDC...BA98

✨ Ready to accept payments...
```

---

## 🧪 API Testing

### Automated Testing (Recommended)

```bash
# In a new terminal (keep API running in first terminal)
chmod +x test-api.sh
./test-api.sh
```

This runs 8 comprehensive tests:
1. Health check
2. Get contract stats
3. Create transaction
4. Check status (PENDING)
5. Get transaction details
6. Settle transaction
7. Verify settlement (SETTLED)
8. Prevent double-settlement

### Manual API Testing

**Terminal 1: Start API Server**
```bash
npm start
```

**Terminal 2: Test Endpoints**

#### 1. Health Check
```bash
curl http://localhost:3000/health
```

Response:
```json
{
  "status": "LIVE",
  "network": "Polygon Amoy",
  "timestamp": "2026-07-01T21:00:00.000Z",
  "contract": "0xFEDC...BA98"
}
```

#### 2. Get Contract Stats
```bash
curl http://localhost:3000/stats
```

Response:
```json
{
  "contractBalance": "0.0",
  "network": "polygon-amoy",
  "chainId": 80002,
  "contractAddress": "0xFEDC...BA98"
}
```

#### 3. Create Payment Transaction
```bash
curl -X POST http://localhost:3000/tx/create \
  -H "Content-Type: application/json" \
  -d '{
    "qrId": "PAYMENT-001",
    "receiver": "0x742d35Cc6634C0532925a3b844Bc0e7595f47D5D",
    "amount": "0.001",
    "expiry": "2026-12-31T23:59:59Z"
  }'
```

Response:
```json
{
  "status": "CREATED",
  "qrId": "PAYMENT-001",
  "txHash": "0x1234...5678",
  "blockNumber": 123456,
  "gasUsed": "87543"
}
```

#### 4. Check Transaction Status
```bash
curl http://localhost:3000/tx/PAYMENT-001
```

Response (while pending):
```json
{
  "qrId": "PAYMENT-001",
  "status": "PENDING"
}
```

#### 5. Get Transaction Details
```bash
curl http://localhost:3000/tx/PAYMENT-001/details
```

Response:
```json
{
  "qrId": "PAYMENT-001",
  "payer": "0x1234...5678",
  "receiver": "0x742d...47D5D",
  "amount": "0.001",
  "expiry": "2026-12-31T23:59:59.000Z",
  "settled": false
}
```

#### 6. Settle Transaction (Simulate QR Scan)
```bash
curl -X POST http://localhost:3000/tx/settle \
  -H "Content-Type: application/json" \
  -d '{"qrId": "PAYMENT-001"}'
```

Response:
```json
{
  "status": "SETTLED",
  "qrId": "PAYMENT-001",
  "txHash": "0x9876...5432",
  "blockNumber": 123457
}
```

#### 7. Verify Settlement
```bash
curl http://localhost:3000/tx/PAYMENT-001
```

Response (after settlement):
```json
{
  "qrId": "PAYMENT-001",
  "status": "SETTLED"
}
```

---

## 🔧 Troubleshooting

### Issue: "Missing PRIVATE_KEY or CONTRACT_ADDRESS"

**Solution:**
```bash
# Edit .env and add your private key
nano .env  # or use your editor

# Verify it's set
grep PRIVATE_KEY .env
```

### Issue: "Cannot connect to RPC"

**Solutions:**
1. Check internet connection
2. Verify RPC URL in .env is correct
3. Check if Polygon Amoy network is up: https://polygon.technology/

### Issue: "Insufficient funds"

**Solution:**
1. Get more testnet MATIC from faucet
2. Use smaller test amounts (0.001 instead of 0.1)
3. Wait 30 seconds between faucet requests

### Issue: "Contract not found"

**Solutions:**
1. Verify CONTRACT_ADDRESS in .env is correct
2. Check deployment-addresses.json for correct address
3. Ensure you deployed to the right network (Amoy)

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# Option 1: Change port in .env
PORT=3001

# Option 2: Kill process on port 3000
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: "npm command not found"

**Solution:**
1. Install Node.js: https://nodejs.org/
2. Verify installation:
```bash
node --version
npm --version
```

---

## 🌐 Production Deployment

### Deploy to Polygon Mainnet

**Step 1: Update .env**
```env
NETWORK=Polygon Mainnet
RPC_URL=https://polygon-rpc.com
PRIVATE_KEY=your_production_key
```

**Step 2: Deploy**
```bash
npm run deploy:polygon
```

**Step 3: Host Backend**

#### Option A: Railway (Recommended)
1. Push code to GitHub
2. Go to https://railway.app/
3. Connect GitHub repo
4. Deploy
5. Add environment variables

#### Option B: Heroku
```bash
npm install -g heroku
heroku login
heroku create your-app-name
git push heroku main
```

#### Option C: AWS Lambda
Use serverless framework or AWS SAM to deploy Express.js

### Deploy Scanner App

```bash
# Build for iOS
npx expo build:ios

# Build for Android
npx expo build:android
```

---

## 📊 Monitoring & Verification

### View Transactions on PolygonScan

After creating a transaction, view it:
```
https://amoy.polygonscan.com/tx/<TX_HASH>
```

### Monitor Contract

```
https://amoy.polygonscan.com/address/<CONTRACT_ADDRESS>
```

### Check Account Balance

```
https://amoy.polygonscan.com/address/<YOUR_WALLET_ADDRESS>
```

---

## 🎯 Next Steps

1. **Generate QR Codes**
   - Create QR with payload: `{"qrId": "YOUR-ID"}`
   - Use: https://www.qr-code-generator.com/

2. **Build Mobile App**
   ```bash
   cd frontend
   expo start
   ```

3. **Integrate Payment Flow**
   - User creates payment → API creates QR → User scans → Funds transfer

4. **Scale to Production**
   - Deploy to mainnet
   - Host backend
   - Publish mobile apps

---

## 📚 Resources

- **Smart Contracts:** [Solidity Docs](https://docs.soliditylang.org/)
- **Blockchain:** [Polygon Docs](https://polygon.technology/)
- **Deployment:** [Hardhat Docs](https://hardhat.org/)
- **Web3:** [ethers.js Docs](https://docs.ethers.org/)
- **Mobile:** [Expo Docs](https://docs.expo.dev/)
- **API:** [Express.js Docs](https://expressjs.com/)

---

## 📞 Support

**If you encounter issues:**
1. Check [Troubleshooting](#-troubleshooting) section
2. Review smart contract on PolygonScan
3. Check API logs: `npm start`
4. Open GitHub issue with error details

---

## ✨ System Status Checklist

- [ ] Node.js 18+ installed
- [ ] MetaMask wallet created
- [ ] Polygon Amoy network added to MetaMask
- [ ] Testnet MATIC funds obtained
- [ ] Private key exported and saved in .env
- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] Smart contracts compiled (`npm run compile`)
- [ ] Contracts deployed (`npm run deploy:amoy`)
- [ ] .env updated with contract addresses
- [ ] API server running (`npm start`)
- [ ] API tests passing (`./test-api.sh`)
- [ ] QR codes generated
- [ ] Scanner app working (optional)

---

**🎉 You're ready to deploy ORA Universe!**

For questions or issues, refer to the documentation or open an issue on GitHub.

---

*Last Updated: 2026-07-01*
*ORA Universe v1.0.0*
