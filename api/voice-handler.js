// api/voice-handler.js
// 🎤 Voice Command Processing for ORA Universe

const express = require('express');
const router = express.Router();
const ethers = require('ethers');

// Voice command patterns
const voiceCommands = {
  'create payment': createPaymentVoice,
  'settle transaction': settleTransactionVoice,
  'check balance': checkBalanceVoice,
  'mint nft': mintNFTVoice,
  'list nft': listNFTVoice,
  'buy nft': buyNFTVoice,
  'start auction': startAuctionVoice,
  'place bid': placeBidVoice,
  'transaction history': getTransactionHistoryVoice,
  'contract stats': getContractStatsVoice
};

// Natural Language Processing for voice commands
class VoiceProcessor {
  
  static parseCommand(rawText) {
    const text = rawText.toLowerCase().trim();
    
    // Extract command intent
    let command = null;
    for (const [cmd, handler] of Object.entries(voiceCommands)) {
      if (text.includes(cmd)) {
        command = cmd;
        break;
      }
    }
    
    if (!command) {
      return { error: 'Command not recognized', text };
    }
    
    // Extract parameters from natural language
    const params = this.extractParameters(text);
    
    return { command, params, text };
  }
  
  static extractParameters(text) {
    const params = {};
    
    // Extract address (0x... pattern)
    const addressMatch = text.match(/0x[a-fA-F0-9]{40}/);
    if (addressMatch) params.address = addressMatch[0];
    
    // Extract amount (number followed by ether/MATIC/token)
    const amountMatch = text.match(/(\d+\.?\d*)\s*(ether|matic|token|eth)?/i);
    if (amountMatch) params.amount = amountMatch[1];
    
    // Extract time duration (e.g., "7 days", "24 hours")
    const durationMatch = text.match(/(\d+)\s*(day|hour|minute|second)s?/i);
    if (durationMatch) {
      params.duration = durationMatch[1];
      params.durationUnit = durationMatch[2].toLowerCase();
    }
    
    // Extract token/NFT ID
    const idMatch = text.match(/(?:id|token|nft)?\s*#?(\d+)/i);
    if (idMatch) params.tokenId = idMatch[1];
    
    // Extract price/bid
    const priceMatch = text.match(/(?:price|bid|amount).*?(\d+\.?\d*)/i);
    if (priceMatch) params.price = priceMatch[1];
    
    return params;
  }
}

// Voice command handlers
async function createPaymentVoice(params) {
  try {
    if (!params.address || !params.amount) {
      return {
        status: 'error',
        message: 'Please specify: receiver address and amount',
        voiceResponse: 'I need a receiver address and payment amount to proceed.'
      };
    }
    
    // Validate address
    if (!ethers.isAddress(params.address)) {
      return {
        status: 'error',
        message: 'Invalid address',
        voiceResponse: 'That address doesn\'t look valid. Please provide a valid Ethereum address.'
      };
    }
    
    const response = await fetch('http://localhost:3000/tx/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        qrId: `VOICE-${Date.now()}`,
        receiver: params.address,
        amount: params.amount,
        expiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      })
    });
    
    const result = await response.json();
    
    return {
      status: 'success',
      data: result,
      voiceResponse: `Payment of ${params.amount} MATIC created successfully for ${params.address.slice(0, 10)}...`
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      voiceResponse: 'Failed to create payment. Please try again.'
    };
  }
}

async function settleTransactionVoice(params) {
  try {
    if (!params.qrId && !params.tokenId) {
      return {
        status: 'error',
        message: 'Please specify transaction QR ID',
        voiceResponse: 'Please provide a transaction ID or QR code to settle.'
      };
    }
    
    const response = await fetch('http://localhost:3000/tx/settle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        qrId: params.qrId || params.tokenId
      })
    });
    
    const result = await response.json();
    
    return {
      status: 'success',
      data: result,
      voiceResponse: `Transaction settled successfully. Amount transferred to receiver.`
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      voiceResponse: 'Failed to settle transaction.'
    };
  }
}

async function checkBalanceVoice(params) {
  try {
    const response = await fetch('http://localhost:3000/stats');
    const result = await response.json();
    
    return {
      status: 'success',
      data: result,
      voiceResponse: `Contract balance is ${result.contractBalance} MATIC on ${result.network}.`
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      voiceResponse: 'Could not check balance.'
    };
  }
}

async function mintNFTVoice(params) {
  try {
    const response = await fetch('http://localhost:3000/nft/mint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uri: params.uri || 'ipfs://default-metadata',
        name: params.name || 'ORA NFT'
      })
    });
    
    const result = await response.json();
    
    return {
      status: 'success',
      data: result,
      voiceResponse: `NFT minted successfully with token ID ${result.tokenId}.`
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      voiceResponse: 'Failed to mint NFT.'
    };
  }
}

async function listNFTVoice(params) {
  try {
    if (!params.tokenId || !params.price) {
      return {
        status: 'error',
        message: 'Please specify token ID and price',
        voiceResponse: 'Please provide an NFT token ID and listing price.'
      };
    }
    
    const response = await fetch('http://localhost:3000/nft/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tokenId: params.tokenId,
        price: params.price
      })
    });
    
    const result = await response.json();
    
    return {
      status: 'success',
      data: result,
      voiceResponse: `NFT ${params.tokenId} listed for sale at ${params.price} MATIC.`
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      voiceResponse: 'Failed to list NFT.'
    };
  }
}

async function buyNFTVoice(params) {
  try {
    if (!params.tokenId) {
      return {
        status: 'error',
        message: 'Please specify token ID',
        voiceResponse: 'Please provide an NFT token ID to purchase.'
      };
    }
    
    const response = await fetch(`http://localhost:3000/nft/buy/${params.tokenId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const result = await response.json();
    
    return {
      status: 'success',
      data: result,
      voiceResponse: `Successfully purchased NFT ${params.tokenId} for ${result.price} MATIC.`
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      voiceResponse: 'Failed to purchase NFT.'
    };
  }
}

async function startAuctionVoice(params) {
  try {
    if (!params.tokenId || !params.price) {
      return {
        status: 'error',
        message: 'Please specify token ID and starting bid',
        voiceResponse: 'Please provide an NFT token ID and starting bid amount.'
      };
    }
    
    const duration = params.duration || 7;
    
    const response = await fetch('http://localhost:3000/nft/auction/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tokenId: params.tokenId,
        startingBid: params.price,
        durationDays: duration
      })
    });
    
    const result = await response.json();
    
    return {
      status: 'success',
      data: result,
      voiceResponse: `Auction started for NFT ${params.tokenId}. Starting bid: ${params.price} MATIC, Duration: ${duration} days.`
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      voiceResponse: 'Failed to start auction.'
    };
  }
}

async function placeBidVoice(params) {
  try {
    if (!params.tokenId || !params.price) {
      return {
        status: 'error',
        message: 'Please specify token ID and bid amount',
        voiceResponse: 'Please provide an NFT token ID and bid amount.'
      };
    }
    
    const response = await fetch(`http://localhost:3000/nft/auction/${params.tokenId}/bid`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bidAmount: params.price
      })
    });
    
    const result = await response.json();
    
    return {
      status: 'success',
      data: result,
      voiceResponse: `Bid placed successfully: ${params.price} MATIC for NFT ${params.tokenId}.`
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      voiceResponse: 'Failed to place bid.'
    };
  }
}

async function getTransactionHistoryVoice(params) {
  try {
    const response = await fetch('http://localhost:3000/tx/history');
    const result = await response.json();
    
    const count = result.transactions?.length || 0;
    
    return {
      status: 'success',
      data: result,
      voiceResponse: `You have ${count} transactions in your history.`
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      voiceResponse: 'Could not retrieve transaction history.'
    };
  }
}

async function getContractStatsVoice(params) {
  try {
    const response = await fetch('http://localhost:3000/stats');
    const result = await response.json();
    
    return {
      status: 'success',
      data: result,
      voiceResponse: `Contract statistics: Balance ${result.contractBalance} MATIC, Network ${result.network}, Chain ID ${result.chainId}.`
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      voiceResponse: 'Could not retrieve contract statistics.'
    };
  }
}

// Express route handlers
router.post('/voice/command', async (req, res) => {
  try {
    const { command: rawCommand, voiceText } = req.body;
    
    if (!rawCommand && !voiceText) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide command or voice text'
      });
    }
    
    // Parse voice input
    const parsed = VoiceProcessor.parseCommand(rawCommand || voiceText);
    
    if (parsed.error) {
      return res.status(400).json({
        status: 'error',
        message: parsed.error,
        voiceResponse: 'I did not understand that command. Please try again.'
      });
    }
    
    // Execute command
    const handler = voiceCommands[parsed.command];
    const result = await handler(parsed.params);
    
    res.json(result);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
      voiceResponse: 'An error occurred processing your command.'
    });
  }
});

router.get('/voice/commands', (req, res) => {
  const commands = Object.keys(voiceCommands).map(cmd => ({
    command: cmd,
    example: `"Emissary Speak: ${cmd}"`
  }));
  
  res.json({
    status: 'success',
    commands,
    totalCommands: commands.length
  });
});

module.exports = router;
