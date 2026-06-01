/**
 * ORA SYSTEM - Digital Asset Registry & Economy Layer
 * Assets, valuations, inquiries, NFT readiness
 */

class ORASystem {
  constructor() {
    this.assets = new Map();
    this.valuations = new Map();
    this.inquiries = new Map();
    this.initializeAssets();
  }

  /**
   * Initialize default assets
   */
  initializeAssets() {
    for (let i = 1; i <= 5; i++) {
      const assetId = `ORA-${String(i).padStart(3, '0')}`;
      this.createAsset(assetId, {
        name: `Digital Asset ${i}`,
        type: 'DIGITAL_ARTIFACT',
        value: 1000 + (i * 500),
        volume: Math.floor(Math.random() * 2000),
        metadata: { createdAt: Date.now() },
      });
    }
  }

  /**
   * Create asset
   */
  createAsset(assetId, data) {
    const asset = {
      id: assetId,
      ...data,
      created: new Date().toISOString(),
      nftReady: true,
      erc721Metadata: this.generateERC721Metadata(assetId, data),
    };
    this.assets.set(assetId, asset);
    this.valuations.set(assetId, this.calculateValuation(asset));
    return asset;
  }

  /**
   * Get asset by ID
   */
  getAsset(assetId) {
    return this.assets.get(assetId);
  }

  /**
   * Get asset valuation
   */
  getValuation(assetId) {
    return this.valuations.get(assetId);
  }

  /**
   * Calculate valuation score
   */
  calculateValuation(asset) {
    const baseScore = (asset.value / 100) * 0.3;
    const volumeScore = (asset.volume / 2000) * 0.7;
    const totalScore = Math.min(100, (baseScore + volumeScore) * 100);
    
    return {
      assetId: asset.id,
      score: Math.round(totalScore),
      potentialIndex: Math.round(totalScore * 0.9),
      securityScore: Math.round(Math.random() * 100),
      valuation: asset.value,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Generate ERC721 metadata
   */
  generateERC721Metadata(assetId, data) {
    return {
      name: data.name,
      description: `Sacred Digital Asset: ${assetId}`,
      image: `ipfs://QmXXXXXXXXXXXXXXXXXXXXXX/${assetId}`,
      attributes: [
        { trait_type: 'Asset Type', value: data.type },
        { trait_type: 'Value', value: data.value },
        { trait_type: 'Volume', value: data.volume },
      ],
    };
  }

  /**
   * Create inquiry (buyer offer)
   */
  createInquiry(assetId, buyerData) {
    const inquiryId = `INQ-${Date.now()}`;
    const inquiry = {
      id: inquiryId,
      assetId,
      buyer: buyerData.name,
      offerPrice: buyerData.offerPrice,
      status: 'PENDING',
      created: new Date().toISOString(),
    };
    this.inquiries.set(inquiryId, inquiry);
    return inquiry;
  }

  /**
   * Update inquiry
   */
  updateInquiry(inquiryId, updates) {
    const inquiry = this.inquiries.get(inquiryId);
    if (!inquiry) throw new Error(`Inquiry not found: ${inquiryId}`);
    Object.assign(inquiry, updates);
    return inquiry;
  }

  /**
   * Get inquiry
   */
  getInquiry(inquiryId) {
    return this.inquiries.get(inquiryId);
  }

  /**
   * Get all assets
   */
  listAssets() {
    return Array.from(this.assets.values());
  }

  /**
   * Get asset count
   */
  assetCount() {
    return this.assets.size;
  }
}

export { ORASystem };
