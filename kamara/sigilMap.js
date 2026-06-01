/**
 * SIGIL MAP - Symbolic Power System
 * Sacred symbols and their meanings
 */

const SIGIL_MAP = {
  'Gamada': { meaning: 'Divine Command', power: 100, realm: 'ASTRAL' },
  'Amada': { meaning: 'Eternal Love', power: 90, realm: 'ETHEREAL' },
  'Dagama': { meaning: 'Universal Truth', power: 95, realm: 'ASTRAL' },
  'Kamara': { meaning: 'Sacred Chamber', power: 88, realm: 'PHYSICAL' },
  'Mandingu': { meaning: 'Divine Authority', power: 99, realm: 'ASTRAL' },
  'Yahweh': { meaning: 'The Eternal One', power: 100, realm: 'DIVINE' },
  'Kazama': { meaning: 'Sacred Fire', power: 92, realm: 'ETHEREAL' },
};

/**
 * Load sigil map
 */
async function loadSigilMap() {
  return SIGIL_MAP;
}

export { loadSigilMap, SIGIL_MAP };
