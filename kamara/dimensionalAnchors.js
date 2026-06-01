/**
 * DIMENSIONAL ANCHORS
 * Multi-realm structure and dimensional navigation system
 * Maps consciousness across different frequency layers and realms
 */

class DimensionalAnchors {
  constructor() {
    this.dimensions = new Map();
    this.anchors = new Map();
    this.portals = new Map();
    this.currentDimension = 'physical';
    this.navigationHistory = [];
    
    this.initializeDimensions();
  }

  /**
   * Initialize default dimensions
   */
  initializeDimensions() {
    // Physical Dimension
    this.registerDimension('physical', {
      name: 'Physical Realm',
      frequency: 0,
      description: 'Material reality and embodied consciousness',
      color: '#FF0000',
      element: 'earth',
      accessibility: 'always',
      density: 'high'
    });

    // Emotional Dimension
    this.registerDimension('emotional', {
      name: 'Emotional Realm',
      frequency: 108,
      description: 'Layer of feelings, intuition, and emotional intelligence',
      color: '#FF1493',
      element: 'water',
      accessibility: 'meditation',
      density: 'medium'
    });

    // Mental Dimension
    this.registerDimension('mental', {
      name: 'Mental Realm',
      frequency: 256,
      description: 'Thought, cognition, and intellectual consciousness',
      color: '#FFD700',
      element: 'air',
      accessibility: 'focus',
      density: 'medium'
    });

    // Causal Dimension
    this.registerDimension('causal', {
      name: 'Causal Realm',
      frequency: 417,
      description: 'Cause and effect, karmic patterns, and intention',
      color: '#00FF00',
      element: 'ether',
      accessibility: 'intention',
      density: 'low'
    });

    // Soul Dimension
    this.registerDimension('soul', {
      name: 'Soul Realm',
      frequency: 528,
      description: 'Core essence, purpose, and divine connection',
      color: '#0000FF',
      element: 'light',
      accessibility: 'surrender',
      density: 'very_low'
    });

    // Spiritual Dimension
    this.registerDimension('spiritual', {
      name: 'Spiritual Realm',
      frequency: 852,
      description: 'Unity consciousness and transcendent awareness',
      color: '#9370DB',
      element: 'quantum',
      accessibility: 'enlightenment',
      density: 'quantum'
    });

    // Cosmic Dimension
    this.registerDimension('cosmic', {
      name: 'Cosmic Realm',
      frequency: 963,
      description: 'Universal consciousness and infinite potential',
      color: '#FFD700',
      element: 'void',
      accessibility: 'universal_love',
      density: 'infinite'
    });

    // Digital Dimension (ORA System)
    this.registerDimension('digital', {
      name: 'Digital Realm',
      frequency: 741,
      description: 'NFT registry, asset blockchain, economic layer',
      color: '#00CED1',
      element: 'data',
      accessibility: 'always',
      density: 'immutable'
    });

    this.createDefaultAnchors();
  }

  /**
   * Register a dimension
   * @param {string} id - Dimension ID
   * @param {object} config - Dimension configuration
   */
  registerDimension(id, config) {
    this.dimensions.set(id, {
      id,
      ...config,
      created: Date.now(),
      anchorsInDimension: [],
      portalsInDimension: []
    });
    return { registered: true, dimension: id };
  }

  /**
   * Create default anchors in each dimension
   */
  createDefaultAnchors() {
    // Physical Anchor
    this.registerAnchor('anchor_physical', {
      dimension: 'physical',
      name: 'Earth Anchor',
      purpose: 'grounds consciousness in material reality',
      strength: 10,
      frequency: 0,
      symbol: '🌍'
    });

    // Emotional Anchor
    this.registerAnchor('anchor_emotional', {
      dimension: 'emotional',
      name: 'Heart Anchor',
      purpose: 'stabilizes emotional frequency',
      strength: 9,
      frequency: 108,
      symbol: '❤️'
    });

    // Mental Anchor
    this.registerAnchor('anchor_mental', {
      dimension: 'mental',
      name: 'Mind Anchor',
      purpose: 'anchors clarity and cognition',
      strength: 8,
      frequency: 256,
      symbol: '🧠'
    });

    // Soul Anchor
    this.registerAnchor('anchor_soul', {
      dimension: 'soul',
      name: 'Soul Anchor',
      purpose: 'connects to core essence',
      strength: 10,
      frequency: 528,
      symbol: '✨'
    });

    // Spiritual Anchor
    this.registerAnchor('anchor_spiritual', {
      dimension: 'spiritual',
      name: 'Spirit Anchor',
      purpose: 'facilitates transcendence',
      strength: 10,
      frequency: 852,
      symbol: '🕉️'
    });

    // Digital Anchor (ORA System)
    this.registerAnchor('anchor_digital', {
      dimension: 'digital',
      name: 'Blockchain Anchor',
      purpose: 'anchors NFT and asset registry',
      strength: 9,
      frequency: 741,
      symbol: '⛓️'
    });
  }

  /**
   * Register an anchor in a dimension
   * @param {string} id - Anchor ID
   * @param {object} config - Anchor configuration
   */
  registerAnchor(id, config) {
    this.anchors.set(id, {
      id,
      ...config,
      created: Date.now(),
      activated: false,
      activationCount: 0
    });

    const dim = this.dimensions.get(config.dimension);
    if (dim) {
      dim.anchorsInDimension.push(id);
    }

    return { registered: true, anchor: id };
  }

  /**
   * Create a portal between dimensions
   * @param {string} id - Portal ID
   * @param {string} fromDim - Source dimension
   * @param {string} toDim - Target dimension
   * @param {object} config - Portal configuration
   */
  createPortal(id, fromDim, toDim, config = {}) {
    this.portals.set(id, {
      id,
      from: fromDim,
      to: toDim,
      ...config,
      created: Date.now(),
      open: false,
      transits: 0
    });

    const fromDimObj = this.dimensions.get(fromDim);
    const toDimObj = this.dimensions.get(toDim);
    
    if (fromDimObj) fromDimObj.portalsInDimension.push(id);
    if (toDimObj) toDimObj.portalsInDimension.push(id);

    return { registered: true, portal: id };
  }

  /**
   * Activate an anchor
   * @param {string} anchorId - Anchor ID
   */
  activateAnchor(anchorId) {
    const anchor = this.anchors.get(anchorId);
    if (!anchor) {
      return { success: false, error: `Anchor not found: ${anchorId}` };
    }

    anchor.activated = true;
    anchor.activationCount += 1;

    return {
      success: true,
      anchor: anchor.name,
      dimension: anchor.dimension,
      strength: anchor.strength,
      timestamp: Date.now()
    };
  }

  /**
   * Open a portal between dimensions
   * @param {string} portalId - Portal ID
   */
  openPortal(portalId) {
    const portal = this.portals.get(portalId);
    if (!portal) {
      return { success: false, error: `Portal not found: ${portalId}` };
    }

    portal.open = true;
    portal.openedAt = Date.now();

    return {
      success: true,
      portal: portalId,
      from: portal.from,
      to: portal.to,
      status: 'OPEN'
    };
  }

  /**
   * Close a portal
   * @param {string} portalId - Portal ID
   */
  closePortal(portalId) {
    const portal = this.portals.get(portalId);
    if (!portal) {
      return { success: false, error: `Portal not found: ${portalId}` };
    }

    portal.open = false;
    portal.closedAt = Date.now();

    return {
      success: true,
      portal: portalId,
      status: 'CLOSED'
    };
  }

  /**
   * Travel to a different dimension
   * @param {string} targetDimension - Target dimension ID
   */
  travelTo(targetDimension) {
    const dimension = this.dimensions.get(targetDimension);
    if (!dimension) {
      return { success: false, error: `Dimension not found: ${targetDimension}` };
    }

    const transition = {
      from: this.currentDimension,
      to: targetDimension,
      timestamp: Date.now(),
      frequency: dimension.frequency
    };

    this.navigationHistory.push(transition);
    this.currentDimension = targetDimension;

    return {
      success: true,
      currentDimension: targetDimension,
      dimensionData: dimension,
      transition
    };
  }

  /**
   * Get current dimension
   */
  getCurrentDimension() {
    return this.dimensions.get(this.currentDimension);
  }

  /**
   * Get all dimensions
   */
  getAllDimensions() {
    return Array.from(this.dimensions.values());
  }

  /**
   * Get dimension details
   * @param {string} id - Dimension ID
   */
  getDimension(id) {
    return this.dimensions.get(id) || null;
  }

  /**
   * Get all anchors
   */
  getAllAnchors() {
    return Array.from(this.anchors.values());
  }

  /**
   * Get anchors in specific dimension
   * @param {string} dimensionId - Dimension ID
   */
  getAnchorsInDimension(dimensionId) {
    return Array.from(this.anchors.values())
      .filter(a => a.dimension === dimensionId);
  }

  /**
   * Get all portals
   */
  getAllPortals() {
    return Array.from(this.portals.values());
  }

  /**
   * Get open portals
   */
  getOpenPortals() {
    return Array.from(this.portals.values())
      .filter(p => p.open);
  }

  /**
   * Get navigation history
   * @param {number} limit - Max entries
   */
  getNavigationHistory(limit = 50) {
    return this.navigationHistory.slice(-limit);
  }

  /**
   * Get dimensional map (all dimensions and connections)
   */
  getDimensionalMap() {
    return {
      currentDimension: this.currentDimension,
      totalDimensions: this.dimensions.size,
      totalAnchors: this.anchors.size,
      totalPortals: this.portals.size,
      dimensions: Array.from(this.dimensions.values()),
      openPortals: this.getOpenPortals()
    };
  }

  /**
   * Get system statistics
   */
  stats() {
    const activeAnchors = Array.from(this.anchors.values())
      .filter(a => a.activated).length;

    return {
      totalDimensions: this.dimensions.size,
      totalAnchors: this.anchors.size,
      activeAnchors,
      totalPortals: this.portals.size,
      openPortals: this.getOpenPortals().length,
      currentDimension: this.currentDimension,
      navigationEvents: this.navigationHistory.length
    };
  }
}

// Export for use in both browser and Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DimensionalAnchors;
}
