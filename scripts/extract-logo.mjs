// Extrait les éléments du brand sheet ChatGPT (1536x1024).
// V2 — crops resserrés pour éviter les labels et centrer correctement.

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdir } from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const src = "C:/Users/jorda/Downloads/PAUL/ChatGPT Image May 12, 2026, 12_41_08 AM.png";
const outDir = join(root, "public", "brand");
await mkdir(outDir, { recursive: true });

// Régions resserrées (left, top, width, height) — calées sur les centres des éléments.
const regions = {
  // SYMBOL : très tight pour ne capturer QUE l'hexagone PD
  "symbol":         { left:  90, top:  60, width: 320, height: 280 },
  // WORDMARK : "PAUL DENA" texte seul, cellule 2, sous le label
  "wordmark":       { left: 530, top: 120, width: 460, height: 150 },
  // LOCKUP horizontal — cellule 3, sous le label
  "lockup":         { left: 1040, top: 130, width: 450, height: 150 },
  // LOCKUP version NOIR (4A) — bande horizontale sous le label "VERSION NOIR"
  "lockup-dark":    { left:   40, top: 440, width: 450, height: 110 },
  // LOCKUP version ROUGE (4C)
  "lockup-red":     { left: 1040, top: 440, width: 450, height: 110 },
  // KIMONO application
  "kimono":         { left:  530, top: 620, width: 470, height: 260 },
  // HERO BANNER — sous le label "7. HERO BANNER"
  "hero-banner":    { left: 1040, top: 640, width: 470, height: 240 },
};

const meta = await sharp(src).metadata();
console.log(`Source ${meta.width}x${meta.height}`);

for (const [name, r] of Object.entries(regions)) {
  await sharp(src).extract(r).png().toFile(join(outDir, `${name}.png`));
  console.log(`✓ ${name}.png  ${r.width}x${r.height}`);
}

// Planche complète (asset téléchargeable)
await sharp(src).png({ compressionLevel: 8 }).toFile(join(outDir, "paul-dena-brand-sheet.png"));
console.log(`✓ paul-dena-brand-sheet.png (full)`);

// === DÉRIVÉS ===

// SYMBOL → carré 512x512 transparent
// 1) extract → trim → center → resize → flatten on #fafaf9
const symbolBigBuf = await sharp(src).extract(regions.symbol).toBuffer();
const symbolTrimmed = await sharp(symbolBigBuf)
  .trim({ background: "#fafaf9", threshold: 30 })
  .toBuffer();
const stm = await sharp(symbolTrimmed).metadata();
const trimSide = Math.max(stm.width, stm.height);
const padX = Math.round((trimSide - stm.width) / 2);
const padY = Math.round((trimSide - stm.height) / 2);
const margin = Math.round(trimSide * 0.12);
const symbolCenteredBuf = await sharp(symbolTrimmed)
  .extend({
    top: padY + margin,
    bottom: padY + margin,
    left: padX + margin,
    right: padX + margin,
    background: "#fafaf9",
  })
  .resize(512, 512, { kernel: "lanczos3", fit: "contain", background: "#fafaf9" })
  .raw()
  .ensureAlpha()
  .toBuffer({ resolveWithObject: true });

// 2) Conversion : pixels clairs → transparent (chroma-key sur le blanc).
//    On utilise une luminosité pondérée pour décider; alpha proportionnel.
function whiteToTransparent(buf, opts = {}) {
  const { keepBlackThreshold = 100, fadeStart = 200, fadeEnd = 250 } = opts;
  const data = Buffer.from(buf.data); // copie modifiable
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (lum <= keepBlackThreshold) {
      // pixel sombre : opaque, on garde sa couleur
      data[i + 3] = 255;
    } else if (lum >= fadeEnd) {
      // pixel quasi-blanc : transparent
      data[i + 3] = 0;
    } else if (lum >= fadeStart) {
      // pixel clair en zone de fondu : alpha décroissant
      const t = (lum - fadeStart) / (fadeEnd - fadeStart);
      data[i + 3] = Math.round((1 - t) * 255);
    } else {
      // pixel intermédiaire : alpha plein
      data[i + 3] = 255;
    }
  }
  return data;
}

const transparentBlackOnAlpha = whiteToTransparent(symbolCenteredBuf);
await sharp(transparentBlackOnAlpha, {
  raw: { width: symbolCenteredBuf.info.width, height: symbolCenteredBuf.info.height, channels: 4 },
}).png().toFile(join(outDir, "symbol-square.png"));
console.log(`✓ symbol-square.png 512x512 (transparent bg, dark ink)`);

// 3) Version blanche pour fonds sombres : on inverse les pixels visibles puis re-key.
const invertedBuf = await sharp(symbolBigBuf)
  .trim({ background: "#fafaf9", threshold: 30 })
  .extend({
    top: padY + margin,
    bottom: padY + margin,
    left: padX + margin,
    right: padX + margin,
    background: "#fafaf9",
  })
  .resize(512, 512, { kernel: "lanczos3", fit: "contain", background: "#fafaf9" })
  .negate({ alpha: false })
  .raw()
  .ensureAlpha()
  .toBuffer({ resolveWithObject: true });

// Sur l'image inversée, le fond est noir (lum ~ 0). On veut le rendre transparent.
function blackToTransparent(buf, opts = {}) {
  const { keepWhiteThreshold = 155, fadeStart = 55, fadeEnd = 5 } = opts;
  const data = Buffer.from(buf.data);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (lum >= keepWhiteThreshold) {
      data[i + 3] = 255;
    } else if (lum <= fadeEnd) {
      data[i + 3] = 0;
    } else if (lum <= fadeStart) {
      const t = (fadeStart - lum) / (fadeStart - fadeEnd);
      data[i + 3] = Math.round((1 - t) * 255);
    } else {
      data[i + 3] = 255;
    }
  }
  return data;
}

const transparentWhiteOnAlpha = blackToTransparent(invertedBuf);
await sharp(transparentWhiteOnAlpha, {
  raw: { width: invertedBuf.info.width, height: invertedBuf.info.height, channels: 4 },
}).png().toFile(join(outDir, "symbol-square-inv.png"));
console.log(`✓ symbol-square-inv.png 512x512 (transparent bg, white ink)`);

// Garde un buffer "symbol centré sur fond blanc" pour les favicons (fond uni nécessaire pour les OS)
const symbolCentered = await sharp(symbolCenteredBuf.data, {
  raw: { width: symbolCenteredBuf.info.width, height: symbolCenteredBuf.info.height, channels: 4 },
}).png().toBuffer();

// OG IMAGE 1200x630 → hero-banner crop, étiré proprement
const heroBuf = await sharp(src).extract(regions["hero-banner"]).toBuffer();
const heroResized = await sharp(heroBuf)
  .resize({ width: 1200, height: 630, fit: "cover", position: "centre" })
  .toBuffer();
await sharp(heroResized).jpeg({ quality: 92 }).toFile(join(root, "public", "og.jpg"));
console.log(`✓ og.jpg 1200x630`);

// FAVICONS PNG aux tailles standards
for (const size of [16, 32, 48, 180]) {
  await sharp(symbolCentered)
    .resize(size, size, { kernel: "lanczos3" })
    .png()
    .toFile(join(root, "public", `favicon-${size}.png`));
}
console.log(`✓ favicon-16/32/48/180.png`);
