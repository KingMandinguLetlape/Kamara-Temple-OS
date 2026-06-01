/**
 * BOOTSTRAP - System Initialization
 * Loads and starts Kamara Temple OS + ORA Bridge
 */

import { KamaraEngine } from '../core/engine.js';
import { BridgeSystem } from '../core/bridge.js';

class SystemBootstrap {
  static async initialize() {
    console.log('🟣 KAMARA TEMPLE OS - INITIALIZATION SEQUENCE');
    console.log('═══════════════════════════════════════════');
    
    // Create engine
    const engine = new KamaraEngine();
    await engine.init();
    
    // Create bridge
    const bridge = new BridgeSystem(engine);
    
    // Expose to global scope
    window.System = engine;
    window.Bridge = bridge;
    window.KamaraEngine = KamaraEngine;
    
    console.log('✨ System Ready');
    console.log('Available: window.System, window.Bridge');
    
    return { engine, bridge };
  }
}

export { SystemBootstrap };
