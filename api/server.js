require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Network Configuration
const RPC_URL = process.env.RPC_URL || 'https://rpc-amoy.polygon.technology';
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

if (!PRIVATE_KEY || !CONTRACT_ADDRESS) {
  console.error('❌ Missing PRIVATE_KEY or CONTRACT_ADDRESS in .env');
  process.exit(1);
}

// Initialize Provider and Wallet
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// Contract ABI
const ABI = [
  "function create(string qrId, address receiver, uint256 amount, uint256 expiry) payable",
  "function settle(string qrId)",
  "function getTx(string qrId) view returns (tuple(string qrId, address payer, address receiver, uint256 amount, uint256 expiry, bool settled))",
  "function getTxStatus(string qrId) view returns (string)"
];

const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'LIVE',
    network: process.env.NETWORK || 'Polygon Amoy',
    timestamp: new Date().toISOString(),
    contract: CONTRACT_ADDRESS
  });
});

// CREATE TRANSACTION
app.post('/tx/create', async (req, res) => {
  try {
    const { qrId, receiver, amount, expiry } = req.body;

    if (!qrId || !receiver || !amount || !expiry) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!ethers.isAddress(receiver)) {
      return res.status(400).json({ error: 'Invalid receiver address' });
    }

    const amountWei = ethers.parseEther(amount.toString());
    const expiryTimestamp = Math.floor(new Date(expiry).getTime() / 1000);

    console.log(`📝 Creating TX: ${qrId} -> ${receiver} (${amount} ETH)`);

    const tx = await contract.create(qrId, receiver, amountWei, expiryTimestamp, {
      value: amountWei,
      gasLimit: 300000
    });

    const receipt = await tx.wait();

    res.json({
      status: 'CREATED',
      qrId,
      txHash: receipt.hash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString()
    });
  } catch (error) {
    console.error('❌ Error creating TX:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// SETTLE TRANSACTION
app.post('/tx/settle', async (req, res) => {
  try {
    const { qrId } = req.body;

    if (!qrId) {
      return res.status(400).json({ error: 'Missing qrId' });
    }

    console.log(`✅ Settling TX: ${qrId}`);

    const tx = await contract.settle(qrId, { gasLimit: 300000 });
    const receipt = await tx.wait();

    res.json({
      status: 'SETTLED',
      qrId,
      txHash: receipt.hash,
      blockNumber: receipt.blockNumber
    });
  } catch (error) {
    console.error('❌ Error settling TX:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET TRANSACTION STATUS
app.get('/tx/:qrId', async (req, res) => {
  try {
    const { qrId } = req.params;
    const status = await contract.getTxStatus(qrId);

    res.json({
      qrId,
      status
    });
  } catch (error) {
    console.error('❌ Error getting TX:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET TRANSACTION DETAILS
app.get('/tx/:qrId/details', async (req, res) => {
  try {
    const { qrId } = req.params;
    const tx = await contract.getTx(qrId);

    res.json({
      qrId: tx.qrId,
      payer: tx.payer,
      receiver: tx.receiver,
      amount: ethers.formatEther(tx.amount),
      expiry: new Date(Number(tx.expiry) * 1000).toISOString(),
      settled: tx.settled
    });
  } catch (error) {
    console.error('❌ Error getting TX details:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// STATS
app.get('/stats', async (req, res) => {
  try {
    const balance = await provider.getBalance(CONTRACT_ADDRESS);
    const networkVersion = await provider.getNetwork();

    res.json({
      contractBalance: ethers.formatEther(balance),
      network: networkVersion.name,
      chainId: networkVersion.chainId,
      contractAddress: CONTRACT_ADDRESS
    });
  } catch (error) {
    console.error('❌ Error getting stats:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 ORA UNIVERSE API LIVE`);
  console.log(`📍 Running on http://localhost:${PORT}`);
  console.log(`⛓️  Network: ${process.env.NETWORK || 'Polygon Amoy'}`);
  console.log(`📦 Contract: ${CONTRACT_ADDRESS}`);
  console.log(`\n✨ Ready to accept payments...\n`);
});

module.exports = app;
