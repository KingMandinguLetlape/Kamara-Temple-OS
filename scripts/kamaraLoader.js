import fs from 'fs';

export const loadKamaraCore = () => {
  try {
    const raw = fs.readFileSync('kamara-core.json', 'utf-8');
    const core = JSON.parse(raw);
    console.log('⚡ Kamara Core Loaded:', core);
    return core;
  } catch (error) {
    console.error('❌ Error loading Kamara Core:', error);
    return null;
  }
};
