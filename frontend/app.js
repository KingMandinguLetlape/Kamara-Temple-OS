/**
 * APP.JS - Frontend Application Logic
 * Connects UI to Kamara Temple OS + ORA System
 */

import { SystemBootstrap } from '../system/bootstrap.js';

class KamaraApp {
  constructor() {
    this.engine = null;
    this.bridge = null;
    this.ui = {};
  }

  async initialize() {
    console.log('🟣 Initializing Kamara App...');
    const { engine, bridge } = await SystemBootstrap.initialize();
    this.engine = engine;
    this.bridge = bridge;
    
    this.setupUIReferences();
    this.setupEventListeners();
    this.render();
    
    return this;
  }

  setupUIReferences() {
    this.ui = {
      emissaryButtons: document.getElementById('emissaryButtons'),
      assetSelect: document.getElementById('assetSelect'),
      commandInput: document.getElementById('commandInput'),
      outputLog: document.getElementById('outputLog'),
      analysisResult: document.getElementById('analysisResult'),
    };
  }

  setupEventListeners() {
    // Command input
    if (this.ui.commandInput) {
      this.ui.commandInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.executeCommand();
      });
    }
  }

  render() {
    this.renderEmissaries();
    this.renderAssets();
  }

  renderEmissaries() {
    const emissaries = this.engine.run('listEmissaries');
    this.ui.emissaryButtons.innerHTML = emissaries.map(name =>
      `<button class="emissary-btn" onclick="app.selectEmissary('${name}')">${name}</button>`
    ).join('');
  }

  renderAssets() {
    const assets = this.engine.oraSystem.listAssets();
    this.ui.assetSelect.innerHTML = '<option value="">-- Select Asset --</option>' +
      assets.map(asset =>
        `<option value="${asset.id}">${asset.id} - ${asset.name}</option>`
      ).join('');
  }

  selectEmissary(name) {
    this.selectedEmissary = name;
    document.querySelectorAll('.emissary-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent === name);
    });
    this.log(`✨ ${name} activated`, 'success');
  }

  async analyzeAsset() {
    if (!this.selectedEmissary) {
      this.log('❌ Select an emissary', 'error');
      return;
    }

    const assetId = this.ui.assetSelect.value;
    if (!assetId) {
      this.log('❌ Select an asset', 'error');
      return;
    }

    try {
      this.log(`🔮 Analyzing...`, 'system');
      const analysis = await this.engine.analyzeAssetThroughEmissary(
        this.selectedEmissary,
        assetId
      );
      
      this.displayAnalysis(analysis);
      this.log(`✅ ${analysis.verdict}`, 'success');
    } catch (error) {
      this.log(`❌ ${error.message}`, 'error');
    }
  }

  displayAnalysis(analysis) {
    this.ui.analysisResult.innerHTML = `
      <div class="analysis-result">
        <div><strong>${analysis.asset.id}</strong> - ${analysis.asset.name}</div>
        <div><strong>Role:</strong> ${analysis.emissaryRole}</div>
        <div class="verdict">🎯 ${analysis.verdict}</div>
        <div>Score: ${analysis.valuation.score}/100</div>
      </div>
    `;
  }

  async executeCommand() {
    const cmd = this.ui.commandInput.value.trim();
    if (!cmd) return;

    this.log(`> ${cmd}`, 'system');
    
    try {
      const result = eval(`this.engine.${cmd}`);
      this.log(`✅ ${JSON.stringify(result)}`, 'success');
    } catch (error) {
      this.log(`❌ ${error.message}`, 'error');
    }

    this.ui.commandInput.value = '';
  }

  log(message, type = 'system') {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = message;
    this.ui.outputLog.appendChild(entry);
    this.ui.outputLog.scrollTop = this.ui.outputLog.scrollHeight;
  }
}

// Export for use
export { KamaraApp };

// Auto-initialize if in browser
if (typeof window !== 'undefined') {
  window.KamaraApp = KamaraApp;
  window.app = new KamaraApp();
  window.app.initialize().catch(console.error);
}
