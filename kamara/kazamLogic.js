/**
 * KAZAM LOGIC
 * Command registry and execution system for Kamara OS
 * Manages symbolic commands, operations, and control flow
 */

class KazamLogic {
  constructor() {
    this.commands = new Map();
    this.operations = new Map();
    this.history = [];
    this.registerDefaultCommands();
  }

  /**
   * Register a command in the system
   * @param {string} name - Command name
   * @param {function} fn - Command function
   * @param {object} metadata - Command metadata
   */
  registerCommand(name, fn, metadata = {}) {
    this.commands.set(name, {
      name,
      fn,
      metadata,
      registered: Date.now()
    });
    return { registered: true, command: name };
  }

  /**
   * Register an operation (core symbolic operation)
   * @param {string} name - Operation name
   * @param {function} fn - Operation function
   */
  registerOperation(name, fn) {
    this.operations.set(name, fn);
    return { registered: true, operation: name };
  }

  /**
   * Execute a command
   * @param {string} name - Command name
   * @param {...args} args - Command arguments
   */
  async execute(name, ...args) {
    const cmd = this.commands.get(name);
    if (!cmd) {
      return {
        success: false,
        error: `Command not found: ${name}`,
        timestamp: Date.now()
      };
    }

    try {
      const result = await cmd.fn(...args);
      const execution = {
        command: name,
        args,
        result,
        timestamp: Date.now(),
        success: true
      };
      this.history.push(execution);
      return execution;
    } catch (error) {
      const execution = {
        command: name,
        args,
        error: error.message,
        timestamp: Date.now(),
        success: false
      };
      this.history.push(execution);
      return execution;
    }
  }

  /**
   * Execute an operation
   * @param {string} name - Operation name
   * @param {...args} args - Operation arguments
   */
  async executeOp(name, ...args) {
    const op = this.operations.get(name);
    if (!op) {
      return { success: false, error: `Operation not found: ${name}` };
    }

    try {
      const result = await op(...args);
      return { success: true, result, timestamp: Date.now() };
    } catch (error) {
      return { success: false, error: error.message, timestamp: Date.now() };
    }
  }

  /**
   * List all registered commands
   * @returns {array}
   */
  listCommands() {
    return Array.from(this.commands.entries()).map(([name, cmd]) => ({
      name,
      metadata: cmd.metadata,
      registered: cmd.registered
    }));
  }

  /**
   * List all registered operations
   * @returns {array}
   */
  listOperations() {
    return Array.from(this.operations.keys());
  }

  /**
   * Get command details
   * @param {string} name - Command name
   * @returns {object}
   */
  getCommand(name) {
    const cmd = this.commands.get(name);
    if (!cmd) return null;
    return {
      name: cmd.name,
      metadata: cmd.metadata,
      registered: cmd.registered
    };
  }

  /**
   * Get execution history
   * @param {number} limit - Max entries
   * @returns {array}
   */
  getHistory(limit = 50) {
    return this.history.slice(-limit);
  }

  /**
   * Clear execution history
   */
  clearHistory() {
    this.history = [];
  }

  /**
   * Register default system commands
   */
  registerDefaultCommands() {
    // Mathematical operations
    this.registerCommand('quickAdd', (a, b) => {
      return a + b;
    }, { type: 'math', description: 'Quick addition' });

    this.registerCommand('quickMult', (a, b) => {
      return a * b;
    }, { type: 'math', description: 'Quick multiplication' });

    this.registerCommand('quickDiv', (a, b) => {
      if (b === 0) throw new Error('Division by zero');
      return a / b;
    }, { type: 'math', description: 'Quick division' });

    // System operations
    this.registerCommand('status', () => {
      return { status: 'ONLINE', mode: 'ACTIVE', timestamp: Date.now() };
    }, { type: 'system', description: 'Get system status' });

    this.registerCommand('info', () => {
      return {
        system: 'KAMARA TEMPLE OS',
        version: '1.0.0',
        layer: 'consciousness',
        commands: this.commands.size,
        operations: this.operations.size
      };
    }, { type: 'system', description: 'Get system info' });

    // Symbolic operations
    this.registerCommand('invoke', (emissaryName) => {
      return { invoked: emissaryName, timestamp: Date.now() };
    }, { type: 'symbolic', description: 'Invoke an emissary' });

    this.registerCommand('resonance', (frequency) => {
      return {
        frequency,
        resonating: true,
        harmonic: frequency * 2,
        timestamp: Date.now()
      };
    }, { type: 'frequency', description: 'Activate frequency resonance' });
  }

  /**
   * Get system statistics
   * @returns {object}
   */
  stats() {
    return {
      totalCommands: this.commands.size,
      totalOperations: this.operations.size,
      totalExecutions: this.history.length,
      successfulExecutions: this.history.filter(h => h.success).length,
      failedExecutions: this.history.filter(h => !h.success).length
    };
  }
}

// Export for use in both browser and Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KazamLogic;
}
