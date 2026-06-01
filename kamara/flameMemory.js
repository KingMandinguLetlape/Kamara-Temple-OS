/**
 * FLAME MEMORY
 * Persistent key/value memory system for Kamara OS
 * Stores consciousness state, symbolic mappings, asset evaluations
 */

class FlameMemory {
  constructor() {
    this.store = new Map();
    this.history = [];
    this.timestamps = new Map();
    this.load();
  }

  /**
   * Set a value in memory
   * @param {string} key - Memory key
   * @param {*} value - Value to store
   * @param {object} metadata - Optional metadata
   */
  set(key, value, metadata = {}) {
    const entry = {
      key,
      value,
      timestamp: Date.now(),
      metadata
    };

    this.store.set(key, value);
    this.timestamps.set(key, Date.now());
    this.history.push(entry);

    // Keep history to last 1000 entries
    if (this.history.length > 1000) {
      this.history.shift();
    }

    this.persist();
    return entry;
  }

  /**
   * Get a value from memory
   * @param {string} key - Memory key
   * @returns {*} Value or undefined
   */
  get(key) {
    return this.store.get(key);
  }

  /**
   * Check if key exists
   * @param {string} key - Memory key
   * @returns {boolean}
   */
  has(key) {
    return this.store.has(key);
  }

  /**
   * Delete a memory entry
   * @param {string} key - Memory key
   */
  delete(key) {
    this.store.delete(key);
    this.timestamps.delete(key);
    this.persist();
  }

  /**
   * Get all memory as object
   * @returns {object}
   */
  getAll() {
    const obj = {};
    for (const [key, value] of this.store) {
      obj[key] = value;
    }
    return obj;
  }

  /**
   * Clear all memory
   */
  clear() {
    this.store.clear();
    this.timestamps.clear();
    this.history = [];
    this.persist();
  }

  /**
   * Get memory history
   * @param {number} limit - Max entries to return
   * @returns {array}
   */
  getHistory(limit = 50) {
    return this.history.slice(-limit);
  }

  /**
   * Search memory by key pattern
   * @param {string} pattern - Regex or string pattern
   * @returns {array}
   */
  search(pattern) {
    const regex = new RegExp(pattern, 'i');
    const results = [];
    for (const [key, value] of this.store) {
      if (regex.test(key)) {
        results.push({ key, value, timestamp: this.timestamps.get(key) });
      }
    }
    return results;
  }

  /**
   * Persist memory to localStorage
   */
  persist() {
    try {
      const data = {
        store: Array.from(this.store.entries()),
        history: this.history
      };
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('flameMemory', JSON.stringify(data));
      }
    } catch (e) {
      console.warn('FlameMemory: Could not persist to localStorage', e);
    }
  }

  /**
   * Load memory from localStorage
   */
  load() {
    try {
      if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem('flameMemory');
        if (data) {
          const parsed = JSON.parse(data);
          this.store = new Map(parsed.store || []);
          this.history = parsed.history || [];
          
          // Rebuild timestamps
          for (const entry of this.history) {
            this.timestamps.set(entry.key, entry.timestamp);
          }
        }
      }
    } catch (e) {
      console.warn('FlameMemory: Could not load from localStorage', e);
    }
  }

  /**
   * Get statistics about memory usage
   * @returns {object}
   */
  stats() {
    return {
      totalKeys: this.store.size,
      historyEntries: this.history.length,
      oldestEntry: this.history.length > 0 ? this.history[0].timestamp : null,
      newestEntry: this.history.length > 0 ? this.history[this.history.length - 1].timestamp : null,
      memoryKeys: Array.from(this.store.keys())
    };
  }

  /**
   * Export memory state as JSON
   * @returns {string}
   */
  export() {
    return JSON.stringify({
      store: Object.fromEntries(this.store),
      history: this.history,
      exportDate: new Date().toISOString()
    }, null, 2);
  }

  /**
   * Import memory from JSON
   * @param {string} json - JSON data
   */
  import(json) {
    try {
      const data = JSON.parse(json);
      if (data.store) {
        this.store = new Map(Object.entries(data.store));
      }
      if (data.history) {
        this.history = data.history;
      }
      this.persist();
    } catch (e) {
      console.error('FlameMemory: Import error', e);
    }
  }
}

// Export for use in both browser and Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FlameMemory;
}
