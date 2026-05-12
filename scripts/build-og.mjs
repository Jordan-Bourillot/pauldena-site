// Génère public/og.jpg en 1200x630 à partir d'une photo source.
// Usage : node scripts/build-og.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const src = join(root, "public", "photos", "hero-portrait.jpg");
const out = join(root, "public", "og.jpg");

const W = 1200;
const H = 630;

const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0a0a0a" stop-opacity="0.95"/>
      <stop offset="55%" stop-color="#0a0a0a" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0.15"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.2" cy="0.85" r="0.7">
      <stop offset="0%" stop-color="#dc2626" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#dc2626" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#veil)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <g font-family="Bebas Neue, Oswald, Arial Black, sans-serif" fill="#f5f5f5">
    <text x="80" y="180" font-size="44" fill="#dc2626" letter-spacing="6">MMA · BOXE · GRAPPLING</text>
    <text x="80" y="340" font-size="168" font-weight="900" letter-spacing="2">PAUL DENA</text>
    <text x="84" y="410" font-size="36" fill="#a3a3a3" font-family="Inter, system-ui, sans-serif">Combattant MMA professionnel</text>
    <text x="84" y="455" font-size="36" fill="#a3a3a3" font-family="Inter, system-ui, sans-serif">Mentalité d'entrepreneur</text>
    <text x="80" y="560" font-size="32" fill="#dc2626" letter-spacing="4">3-0-0 · 100% KO/TKO</text>
  </g>
</svg>`);

await sharp(src)
  .resize(W, H, { fit: "cover", position: "top" })
  .composite([{ input: overlay, top: 0, left: 0 }])
  .jpeg({ quality: 88 })
  .toFile(out);

console.log(`✓ ${out} (${W}x${H})`);
