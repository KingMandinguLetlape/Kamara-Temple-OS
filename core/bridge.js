/**
 * BRIDGE LAYER - Kamara OS ↔ ORA System
 * Connects consciousness layer with economic layer
 */

class BridgeSystem {
  constructor(engine) {
    this.engine = engine;
    this.connections = new Map();
    this.portals = {};
  }

  /**
   * Create portal between emissary and ORA asset
   */
  createPortal(emissaryName, assetId) {
    const key = `${emissaryName}→${assetId}`;
    const portal = {
      emissary: emissaryName,
      asset: assetId,
      established: new Date(),
      status: 'ACTIVE',
      analysis: null,
    };
    this.portals[key] = portal;
    return portal;
  }

  /**
   * Transfer knowledge through portal
   */
  async transferKnowledge(emissaryName, assetId) {
    const portal = this.createPortal(emissaryName, assetId);
    
    try {
      const analysis = await this.engine.analyzeAssetThroughEmissary(emissaryName, assetId);
      portal.analysis = analysis;
      portal.status = 'COMPLETE';
      return analysis;
    } catch (error) {
      portal.status = 'ERROR';
      portal.error = error.message;
      throw error;
    }
  }

  /**
   * Get all active portals
   */
  getActivePortals() {
    return Object.values(this.portals).filter(p => p.status === 'ACTIVE' || p.status === 'COMPLETE');
  }

  /**
   * Sync emissary verdict to ORA inquiry system
   */
  syncVerdictToInquiry(emissaryName, assetId, inquiryId) {
    const analysis = this.portals[`${emissaryName}→${assetId}`]?.analysis;
    if (!analysis) throw new Error('No analysis found for portal');
    
    this.engine.oraSystem.updateInquiry(inquiryId, {
      emissaryVerdict: analysis.verdict,
      emissaryRole: analysis.emissaryRole,
      evaluatedAt: new Date().toISOString(),
    });
    
    return { synced: true, verdict: analysis.verdict };
  }
}

export { BridgeSystem };
