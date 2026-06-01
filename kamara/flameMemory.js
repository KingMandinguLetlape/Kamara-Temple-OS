/**
 * FLAME MEMORY - Kamara OS Persistent Memory System
 * Key/value store with symbolic encoding
 */

class FlameMemory {
  constructor() {
    this.store = new Map();
    this.history = [];
    this.locks = new Set();
  }

  /**
   * Set a value with symbolic encoding
   */
  set(key, value) {
    if (this.locks.has(key)) throw new Error(`Memory locked: ${key}`);
    
    this.store.set(key, value);
    this.history.push({
      action: 'SET',
      key,
      value,
      timestamp: Date.now(),
    });
    
    return value;
  }

  /**
   * Get a value
   */
  get(key) {
    return this.store.get(key);
  }

  /**
   * Delete a value
   */
  delete(key) {
    const existed = this.store.has(key);
    this.store.delete(key);
    
    if (existed) {
      this.history.push({
        action: 'DELETE',
        key,
        timestamp: Date.now(),
      });
    }
    
    return existed;
  }

  /**
   * Lock memory location
   */
  lock(key) {
    this.locks.add(key);
    return true;
  }

  /**
   * Unlock memory location
   */
  unlock(key) {
    this.locks.delete(key);
    return true;
  }

  /**
   * Get memory size
   */
  size() {
    return this.store.size;
  }

  /**
   * Get memory history
   */
  getHistory(limit = 10) {
    return this.history.slice(-limit);
  }

  /**
   * Clear all memory
   */
  clear() {
    this.store.clear();
    this.locks.clear();
    return true;
  }
}

export { FlameMemory };
