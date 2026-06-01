/**
 * SOUL BEACONS
 * Frequency activation system for Kamara OS
 * Sacred frequencies: 108 Hz (healing), 432 Hz (universal), 528 Hz (transformation)
 */

class SoulBeacons {
  constructor() {
    this.beacons = new Map();
    this.activeFrequencies = new Set();
    this.resonanceHistory = [];
    
    // Sacred frequencies
    this.SACRED_FREQUENCIES = {
      HEALING: 108,      // Earth frequency
      UNIVERSAL: 432,    // Universal frequency
      TRANSFORMATION: 528 // DNA repair frequency
    };

    this.initializeBeacons();
  }

  /**
   * Initialize default beacons
   */
  initializeBeacons() {
    // Healing beacon
    this.registerBeacon('healing', {
      frequency: this.SACRED_FREQUENCIES.HEALING,
      description: 'Healing and grounding frequency',
      color: '#00FF00',
      chakra: 'root',
      power: 7
    });

    // Universal beacon
    this.registerBeacon('universal', {
      frequency: this.SACRED_FREQUENCIES.UNIVERSAL,
      description: 'Universal harmony and balance',
      color: '#0000FF',
      chakra: 'heart',
      power: 9
    });

    // Transformation beacon
    this.registerBeacon('transformation', {
      frequency: this.SACRED_FREQUENCIES.TRANSFORMATION,
      description: 'DNA activation and transformation',
      color: '#FF00FF',
      chakra: 'crown',
      power: 10
    });

    // Consciousness beacon
    this.registerBeacon('consciousness', {
      frequency: 256,
      description: 'Expanded consciousness activation',
      color: '#FFD700',
      chakra: 'third-eye',
      power: 8
    });

    // Abundance beacon
    this.registerBeacon('abundance', {
      frequency: 174,
      description: 'Abundance and prosperity',
      color: '#228B22',
      chakra: 'solar-plexus',
      power: 7
    });
  }

  /**
   * Register a beacon frequency
   * @param {string} name - Beacon name
   * @param {object} config - Beacon configuration
   */
  registerBeacon(name, config) {
    this.beacons.set(name, {
      name,
      ...config,
      activated: false,
      activationCount: 0,
      createdAt: Date.now(),
      lastActivated: null
    });
    return { registered: true, beacon: name };
  }

  /**
   * Activate a beacon
   * @param {string} name - Beacon name
   * @param {number} duration - Duration in seconds (optional)
   */
  activate(name, duration = null) {
    const beacon = this.beacons.get(name);
    if (!beacon) {
      return { success: false, error: `Beacon not found: ${name}` };
    }

    beacon.activated = true;
    beacon.activationCount += 1;
    beacon.lastActivated = Date.now();
    this.activeFrequencies.add(beacon.frequency);

    const activation = {
      beacon: name,
      frequency: beacon.frequency,
      power: beacon.power,
      timestamp: Date.now(),
      duration,
      type: 'activation'
    };

    this.resonanceHistory.push(activation);

    // Auto-deactivate if duration specified
    if (duration) {
      setTimeout(() => this.deactivate(name), duration * 1000);
    }

    return {
      success: true,
      beacon: name,
      frequency: beacon.frequency,
      message: `${name} beacon activated at ${beacon.frequency} Hz`
    };
  }

  /**
   * Deactivate a beacon
   * @param {string} name - Beacon name
   */
  deactivate(name) {
    const beacon = this.beacons.get(name);
    if (!beacon) {
      return { success: false, error: `Beacon not found: ${name}` };
    }

    beacon.activated = false;
    this.activeFrequencies.delete(beacon.frequency);

    const deactivation = {
      beacon: name,
      frequency: beacon.frequency,
      timestamp: Date.now(),
      type: 'deactivation'
    };

    this.resonanceHistory.push(deactivation);

    return {
      success: true,
      beacon: name,
      message: `${name} beacon deactivated`
    };
  }

  /**
   * Get beacon details
   * @param {string} name - Beacon name
   */
  getBeacon(name) {
    return this.beacons.get(name) || null;
  }

  /**
   * Get all beacons
   */
  getAllBeacons() {
    return Array.from(this.beacons.values());
  }

  /**
   * Get active beacons
   */
  getActiveBeacons() {
    return Array.from(this.beacons.values()).filter(b => b.activated);
  }

  /**
   * Get active frequencies
   */
  getActiveFrequencies() {
    return Array.from(this.activeFrequencies);
  }

  /**
   * Calculate harmonic resonance between frequencies
   * @param {number} freq1 - First frequency
   * @param {number} freq2 - Second frequency
   */
  calculateHarmony(freq1, freq2) {
    const ratio = Math.max(freq1, freq2) / Math.min(freq1, freq2);
    const harmony = 100 - Math.abs(12 * Math.log2(ratio) - Math.round(12 * Math.log2(ratio))) * 50;
    return Math.max(0, harmony);
  }

  /**
   * Get resonance analysis of active beacons
   */
  getResonanceAnalysis() {
    const activeBeacons = this.getActiveBeacons();
    const activeFreqs = activeBeacons.map(b => b.frequency);

    if (activeFreqs.length < 2) {
      return {
        activeBeacons: activeBeacons.length,
        totalPower: activeBeacons.reduce((sum, b) => sum + b.power, 0),
        harmony: 100,
        analysis: 'Single or no beacons active'
      };
    }

    let totalHarmony = 0;
    for (let i = 0; i < activeFreqs.length; i++) {
      for (let j = i + 1; j < activeFreqs.length; j++) {
        totalHarmony += this.calculateHarmony(activeFreqs[i], activeFreqs[j]);
      }
    }

    const avgHarmony = totalHarmony / (activeFreqs.length * (activeFreqs.length - 1) / 2);
    const totalPower = activeBeacons.reduce((sum, b) => sum + b.power, 0);

    return {
      activeBeacons: activeBeacons.length,
      activeFrequencies: activeFreqs,
      totalPower,
      averageHarmony: Math.round(avgHarmony),
      beaconDetails: activeBeacons.map(b => ({
        name: b.name,
        frequency: b.frequency,
        power: b.power,
        chakra: b.chakra
      }))
    };
  }

  /**
   * Pulse a beacon (activate then deactivate)
   * @param {string} name - Beacon name
   * @param {number} pulseDuration - Pulse duration in ms
   */
  async pulse(name, pulseDuration = 1000) {
    this.activate(name);
    await new Promise(resolve => setTimeout(resolve, pulseDuration));
    return this.deactivate(name);
  }

  /**
   * Create a frequency ritual
   * @param {array} beaconNames - Array of beacon names
   * @param {number} duration - Ritual duration in seconds
   */
  async ritual(beaconNames, duration = 10) {
    const results = [];

    // Activate all beacons
    for (const name of beaconNames) {
      results.push(this.activate(name, duration));
    }

    return {
      ritual: 'active',
      beacons: beaconNames,
      duration,
      analysis: this.getResonanceAnalysis(),
      activationResults: results
    };
  }

  /**
   * Get resonance history
   * @param {number} limit - Max entries
   */
  getHistory(limit = 50) {
    return this.resonanceHistory.slice(-limit);
  }

  /**
   * Clear resonance history
   */
  clearHistory() {
    this.resonanceHistory = [];
  }

  /**
   * Get beacon statistics
   */
  stats() {
    const beaconArray = Array.from(this.beacons.values());
    return {
      totalBeacons: beaconArray.length,
      activeBeacons: beaconArray.filter(b => b.activated).length,
      totalActivations: beaconArray.reduce((sum, b) => sum + b.activationCount, 0),
      totalResonanceEvents: this.resonanceHistory.length,
      activePower: this.getResonanceAnalysis().totalPower
    };
  }
}

// Export for use in both browser and Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SoulBeacons;
}
