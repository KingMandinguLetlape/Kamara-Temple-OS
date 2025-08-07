import { loadKamaraCore } from '../scripts/kamaraLoader';

const kamaraCore = loadKamaraCore();

if (kamaraCore) {
  console.log("🧬 Temple Core:", kamaraCore.name);
  console.log("🔐 Seals Activated:", Object.entries(kamaraCore.seals));
  console.log("📌 Anchor:", kamaraCore.anchor);
  console.log("🎯 Purpose:", kamaraCore.purpose);
}
