# 🌐 ORA Universe - System Architecture & Integration Guide

## 📊 Complete System Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    🌍 ORA UNIVERSE SYSTEM                       │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                  📱 FRONTEND LAYER                               │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  • React Native Scanner App                                     │
│  • QR Code Detection                                            │
│  • Real-time Transaction Feedback                              │
│  • Transaction History                                         │
│                                                                  │
│  File: frontend/ScannerApp.js                                  │
│  Start: expo start                                             │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
                              ⬇️ REST API Calls
┌──────────────────────────────────────────────────────────────────┐
│                  🧠 BACKEND API LAYER                            │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Express.js Server (Port 3000)                                 │
│                                                                  │
│  Endpoints:                                                     │
│  • POST /tx/create      → Create payment transaction           │
│  • POST /tx/settle      → Settle QR scan                       │
│  • GET /tx/:qrId        → Check transaction status             │
│  • GET /tx/:qrId/details → Get full details                    │
│  • GET /stats           → Contract statistics                  │
│  • GET /health          → Health check                         │
│                                                                  │
│  File: api/server.js                                           │
│  Start: npm start                                              │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
                        ⬇️ ethers.js Web3 Calls
┌──────────────────────────────────────────────────────────────────┐
│              ⛓️  BLOCKCHAIN LAYER (Polygon Amoy)                 │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Smart Contracts:                                              │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ KamaraPayment.sol                                       │  │
│  ├─────────────────────────────────────────────────────────┤  │
│  │ • Stores payment transactions                          │  │
│  │ • Manages QR-based settlement                          │  │
│  │ • Handles fund transfers                               │  │
│  │ • Prevents double-settlement                           │  │
│  │                                                         │  │
│  │ Functions:                                              │  │
│  │ - create(qrId, receiver, amount, expiry)              │  │
│  │ - settle(qrId)                                         │  │
│  │ - getTx(qrId)                                          │  │
│  │ - getTxStatus(qrId)                                    │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ OTToken.sol (ERC-20)                                    │  │
│  ├─────────────────────────────────────────────────────────┤  │
│  │ • Token creation and management                        │  │
│  │ • Mint new tokens (owner only)                         │  │
│  │ • Burn tokens                                          │  │
│  │ • Transfer functionality                               │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Network: Polygon Amoy (Testnet)                              │
│  RPC: https://rpc-amoy.polygon.technology                    │
│  Chain ID: 80002                                               │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Complete Deployment Workflow

### Phase 1: Setup & Configuration
```
1. Clone Repository
   └─ git clone https://github.com/KingMandinguLetlape/Kamara-Temple-OS.git

2. Create Environment
   └─ cp .env.example .env
   └─ Edit with PRIVATE_KEY from MetaMask

3. Install Dependencies
   └─ npm install

4. Compile Contracts
   └─ npm run compile
```

### Phase 2: Smart Contract Deployment
```
5. Deploy to Polygon Amoy
   └─ npm run deploy:amoy
   └─ Output: OTToken address & KamaraPayment address

6. Update .env
   └─ CONTRACT_ADDRESS=0x...
   └─ TOKEN_ADDRESS=0x...

7. Verify Deployment
   └─ View on PolygonScan: https://amoy.polygonscan.com/
```

### Phase 3: Backend API Startup
```
8. Start API Server
   └─ npm start
   └─ Runs on http://localhost:3000
   └─ Connected to deployed smart contract

9. Verify API Health
   └─ curl http://localhost:3000/health
   └─ Should return: {"status": "LIVE", ...}
```

### Phase 4: Testing & Verification
```
10. Run Automated Tests
    └─ ./test-api.sh
    └─ Tests all 6 endpoints
    └─ Simulates full payment flow

11. Manual Testing (Optional)
    └─ Create transaction
    └─ Check status
    └─ Settle transaction
    └─ Verify completion
```

---

## 📁 File Structure & Integration

```
Kamara-Temple-OS/
├── 📄 .env                          # Configuration (PRIVATE_KEY, CONTRACT_ADDRESS)
├── 📄 .env.example                  # Template for .env
│
├── 🧠 Smart Contracts
│   └── contracts/
│       ├── KamaraPayment.sol        # Payment contract
│       └── OTToken.sol              # ERC-20 token
│
├── 🚀 Deployment
│   ├── hardhat.config.js            # Hardhat configuration
│   ├── scripts/deploy.js            # Deployment script
│   ├── deploy.sh                    # Automated setup script
│   └── deployment-addresses.json    # Deployed addresses (auto-generated)
│
├── 🧠 Backend API
│   └── api/
│       └── server.js                # Express.js API server
│
├── 📱 Frontend (Optional)
│   └── frontend/
│       └── ScannerApp.js            # React Native QR scanner
│
├── 🧪 Testing & Docs
│   ├── test-api.sh                  # API test suite
│   ├── SETUP_GUIDE.md               # Complete setup guide
│   ├── QUICK_START.md               # 5-minute quickstart
│   ├── ORA_DEPLOYMENT_GUIDE.md      # Detailed deployment
│   ├── DEPLOYMENT_EXECUTION.md      # Step-by-step execution
│   └── SYSTEM_ARCHITECTURE.md       # This file
│
└── 📦 Dependencies
    └── package.json                 # npm dependencies
```

---

## 🔄 Data Flow & Integration Points

### Transaction Creation Flow
```
User Input
    ↓
POST /tx/create
    ↓
Backend Validation
    ├─ Check receiver address
    ├─ Validate amount
    └─ Validate expiry
    ↓
ethers.js Web3 Call
    ↓
Smart Contract: create()
    ├─ Store transaction
    ├─ Lock funds
    └─ Emit Created event
    ↓
Blockchain: Polygon Amoy
    ├─ Create transaction (txHash)
    ├─ Mine block
    └─ Store on-chain
    ↓
Response to Frontend
    └─ txHash, qrId, status
    ↓
Generate QR Code
    └─ Payload: {"qrId": "..."}
```

### Transaction Settlement Flow
```
QR Code Scanned
    ↓
Scanner App: Extract qrId
    ↓
POST /tx/settle
    ↓
Backend Validation
    ├─ Check transaction exists
    ├─ Verify not already settled
    └─ Check expiry
    ↓
ethers.js Web3 Call
    ↓
Smart Contract: settle()
    ├─ Mark as settled
    ├─ Transfer funds
    └─ Emit Settled event
    ↓
Blockchain: Polygon Amoy
    ├─ Execute transfer (txHash)
    ├─ Mine block
    └─ Confirm completion
    ↓
Response to Frontend
    └─ status: "SETTLED", txHash
    ↓
User Confirmation
    └─ Transaction complete ✅
```

---

## 🔧 Integration Checklist

### Environment Setup
- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] MetaMask wallet created
- [ ] Polygon Amoy network added
- [ ] Private key exported
- [ ] Testnet MATIC funds obtained

### Repository Setup
- [ ] Repository cloned
- [ ] .env file created and configured
- [ ] Dependencies installed (`npm install`)

### Smart Contracts
- [ ] Contracts compiled (`npm run compile`)
- [ ] Contracts deployed (`npm run deploy:amoy`)
- [ ] Addresses saved to deployment-addresses.json
- [ ] Addresses added to .env
- [ ] Verified on PolygonScan

### Backend API
- [ ] API server running (`npm start`)
- [ ] Health check passing (GET /health)
- [ ] Connected to correct contract address
- [ ] Environment variables loaded

### Testing
- [ ] Health endpoint working
- [ ] Stats endpoint working
- [ ] Create transaction working
- [ ] Check status working
- [ ] Settle transaction working
- [ ] All 8 automated tests passing

### Frontend (Optional)
- [ ] React Native dependencies installed
- [ ] Scanner app displays correctly
- [ ] Camera permissions working
- [ ] QR code scanning functional
- [ ] API URL pointing to backend

---

## 📊 API Endpoints Reference

| Method | Endpoint | Purpose | Integration |
|--------|----------|---------|-------------|
| GET | /health | Health check | System monitoring |
| GET | /stats | Contract stats | Dashboard |
| POST | /tx/create | Create payment | Payment flow |
| GET | /tx/:qrId | Check status | Status tracking |
| GET | /tx/:qrId/details | Get details | Transaction info |
| POST | /tx/settle | Settle payment | QR scanning |

---

## 🌐 Network Configuration

### Polygon Amoy Testnet
```
Network Name: Polygon Amoy
RPC URL: https://rpc-amoy.polygon.technology
Chain ID: 80002
Currency: MATIC
Block Explorer: https://amoy.polygonscan.com/
Faucet: https://faucet.polygon.technology/
```

### Smart Contract Addresses (After Deployment)
```
OTToken: 0x...  (ERC-20 Token)
KamaraPayment: 0x...  (Payment Contract)
```

View on PolygonScan:
```
https://amoy.polygonscan.com/address/<CONTRACT_ADDRESS>
```

---

## 🚀 Quick Command Reference

### Setup & Deployment
```bash
# Automated (Recommended)
chmod +x deploy.sh
./deploy.sh

# Manual steps
npm install
npm run compile
npm run deploy:amoy
```

### Running the System
```bash
# Terminal 1: Start API
npm start

# Terminal 2: Run tests
chmod +x test-api.sh
./test-api.sh

# Terminal 3: Start scanner (optional)
cd frontend
expo start
```

### Deployment to Production
```bash
# Polygon Mainnet
npm run deploy:polygon

# Host backend
# Railway: Connect GitHub repo
# Heroku: git push heroku main
# AWS: Use Lambda/EC2

# Build mobile apps
npx expo build:ios
npx expo build:android
```

---

## 📈 Scaling to Production

### Mainnet Deployment
1. Update .env for Polygon Mainnet
2. Deploy contracts: `npm run deploy:polygon`
3. Deploy backend to cloud provider
4. Update frontend API URL
5. Build and publish mobile apps

### Performance Optimization
- Use API caching for stats
- Implement database for transaction history
- Add rate limiting for API endpoints
- Monitor gas costs on mainnet

### Security Considerations
- Never expose PRIVATE_KEY
- Use environment variables for secrets
- Enable API rate limiting
- Implement authentication if needed
- Audit smart contracts on mainnet

---

## 🆘 Troubleshooting Integration Issues

### API Can't Connect to Contract
```
Check:
1. CONTRACT_ADDRESS in .env is correct
2. Network is Polygon Amoy (chainId: 80002)
3. RPC_URL is accessible
4. Private key has funds for gas
```

### Transactions Failing
```
Check:
1. Receiver address is valid
2. Amount is positive
3. Expiry is in the future
4. Account has enough MATIC for gas
```

### Tests Not Running
```
Check:
1. API is running on port 3000
2. curl is installed
3. jq is installed (for formatting)
4. Correct QR ID in test
```

---

## 🎯 Next Steps

1. **Follow SETUP_GUIDE.md** for detailed setup
2. **Use deploy.sh** for automated deployment
3. **Run test-api.sh** to verify everything works
4. **Generate QR codes** with your QR IDs
5. **Deploy to production** when ready

---

## 📚 Documentation Index

| Document | Purpose |
|----------|---------|
| SETUP_GUIDE.md | Complete step-by-step setup |
| QUICK_START.md | 5-minute quick start |
| ORA_DEPLOYMENT_GUIDE.md | Detailed deployment guide |
| DEPLOYMENT_EXECUTION.md | Execution logs and outputs |
| SYSTEM_ARCHITECTURE.md | This file - System overview |

---

## ✨ System Status

**Current Version:** 1.0.0
**Network:** Polygon Amoy Testnet
**Status:** Ready for Deployment
**Last Updated:** 2026-07-01

---

**🎉 Your ORA Universe is fully integrated and ready to deploy!**

For support or issues, refer to SETUP_GUIDE.md troubleshooting section.
