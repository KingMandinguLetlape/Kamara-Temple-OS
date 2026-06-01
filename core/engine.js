/**
 * KAMARA TEMPLE OS - System Runtime Engine
 * Core command execution, emissary management, memory coordination
 */

class KamaraEngine {
  constructor() {
    this.emissaries = {};
    this.memory = null;
    this.registry = {};
    this.beacons = null;
    this.anchors = null;
    this.oraSystem = null;
    this.initialized = false;
  }

  /**
   * Initialize all system components
   */
  async init(config = {}) {
    console.log('🟣 Kamara Temple OS: Initializing System...');
    
    // Import kamara modules
    const { FlameMemory } = await import('./kamara/flameMemory.js');
    const { SoulBeacons } = await import('./kamara/soulBeacons.js');
    const { DimensionalAnchors } = await import('./kamara/dimensionalAnchors.js');
    const { loadEmissaries } = await import('./kamara/emissaries.js');
    const { loadSigilMap } = await import('./kamara/sigilMap.js');
    const { KazamLogic } = await import('./kamara/kazamLogic.js');
    
    // Import ORA modules
    const { ORASystem } = await import('./ora/oraSystem.js');
    
    // Initialize components
    this.memory = new FlameMemory();
    this.beacons = new SoulBeacons();
    this.anchors = new DimensionalAnchors();
    this.kazam = new KazamLogic();
    this.oraSystem = new ORASystem();
    
    // Load data
    this.emissaries = await loadEmissaries();
    this.sigilMap = await loadSigilMap();
    
    // Register core commands
    this.registerCoreCommands();
    
    this.initialized = true;
    console.log('✨ System Initialized: Kamara Temple OS Online');
    
    return this;
  }

  /**
   * Register core system commands
   */
  registerCoreCommands() {
    this.registry['quickAdd'] = (a, b) => a + b;
    this.registry['getStatus'] = () => this.getStatus();
    this.registry['listEmissaries'] = () => Object.keys(this.emissaries);
    this.registry['getMemory'] = (key) => this.memory.get(key);
    this.registry['setMemory'] = (key, value) => this.memory.set(key, value);
  }

  /**
   * Execute a registered command
   */
  run(commandName, ...args) {
    if (!this.initialized) throw new Error('System not initialized');
    if (!this.registry[commandName]) throw new Error(`Command not found: ${commandName}`);
    return this.registry[commandName](...args);
  }

  /**
   * Get emissary by name
   */
  emissary(name) {
    if (!this.emissaries[name]) throw new Error(`Emissary not found: ${name}`);
    return { ...this.emissaries[name], instance: this };
  }

  /**
   * Get system status
   */
  getStatus() {
    return {
      initialized: this.initialized,
      emissaries: Object.keys(this.emissaries),
      memorySize: this.memory.size(),
      beaconActive: this.beacons.isActive(),
      oraAssetsCount: this.oraSystem.assetCount(),
    };
  }

  /**
   * Activate beacon frequency
   */
  activateBeacon(frequency = 432) {
    return this.beacons.activate(frequency);
  }

  /**
   * Analyze asset through emissary (BRIDGE LAYER)
   */
  async analyzeAssetThroughEmissary(emissaryName, assetId) {
    const emissaryData = this.emissary(emissaryName);
    const assetData = this.oraSystem.getAsset(assetId);
    
    if (!assetData) {
      throw new Error(`Asset not found: ${assetId}`);
    }
    
    const valuation = this.oraSystem.getValuation(assetId);
    
    // Apply emissary logic
    const verdict = this.evaluateAsset(emissaryData, assetData, valuation);
    
    return {
      emissary: emissaryData.name,
      emissaryRole: emissaryData.role,
      asset: assetData,
      valuation,
      verdict,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Evaluate asset based on emissary characteristics
   */
  evaluateAsset(emissary, asset, valuation) {
    const score = valuation.score || 0;
    const potential = valuation.potentialIndex || 0;
    
    let verdict = 'NEUTRAL';
    
    // Kamata (emotional) - intuition-based
    if (emissary.name === 'Kamata') {
      if (potential > 75) verdict = 'STRONG HOLD';
      else if (potential > 50) verdict = 'WATCH';
      else verdict = 'LOW PRIORITY';
    }
    // Amata (security) - risk-based
    else if (emissary.name === 'Amata') {
      if (valuation.securityScore > 80) verdict = 'APPROVED';
      else if (valuation.securityScore > 50) verdict = 'REVIEW';
      else verdict = 'DENY';
    }
    // Ntala (storage) - volume-based
    else if (emissary.name === 'Ntala') {
      if (asset.volume > 1000) verdict = 'ARCHIVE';
      else if (asset.volume > 500) verdict = 'STORE';
      else verdict = 'CACHE';
    }
    // Mandingus (control) - governance-based
    else if (emissary.name === 'Mandingus') {
      if (score > 80) verdict = 'EXECUTE';
      else if (score > 50) verdict = 'QUEUE';
      else verdict = 'PENDING';
    }
    
    return verdict;
  }
}

export { KamaraEngine };
