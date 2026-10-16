import fs from "fs";
import path from "path";
import sharp from "sharp";

const ORGAN_COORDS = {
  stomach: { x: 308, y: 305, system: "Digestive System", color: "#e8a33b" },
  gallbladder: { x: 278, y: 312, system: "Digestive System", color: "#7fb57a" },
  esophagus: { x: 295, y: 215, system: "Digestive System", color: "#d98b74" },
  tongue: { x: 295, y: 155, system: "Digestive System", color: "#d9665f" },
  spleen: { x: 322, y: 302, system: "Lymphatic System", color: "#b98cc9" },
  thymus: { x: 295, y: 232, system: "Lymphatic System", color: "#b98cc9" },
  "lymph-node": { x: 295, y: 205, system: "Lymphatic System", color: "#b98cc9" },
  thyroid: { x: 295, y: 185, system: "Endocrine System", color: "#c95fd0" },
  adrenal: { x: 282, y: 320, system: "Endocrine System", color: "#c95fd0" },
  pituitary: { x: 295, y: 118, system: "Endocrine System", color: "#c95fd0" },
  trachea: { x: 295, y: 210, system: "Respiratory System", color: "#5d9ce8" },
  larynx: { x: 295, y: 175, system: "Respiratory System", color: "#5d9ce8" },
  bladder: { x: 295, y: 395, system: "Urinary System", color: "#54b7c9" },
  uterus: { x: 295, y: 395, system: "Reproductive System", color: "#e07a9b" },
  ovary: { x: 284, y: 390, system: "Reproductive System", color: "#e07a9b" },
  testis: { x: 290, y: 425, system: "Reproductive System", color: "#e07a9b" },
  prostate: { x: 295, y: 408, system: "Reproductive System", color: "#e07a9b" },
  "spinal-cord": { x: 295, y: 255, system: "Nervous System", color: "#8d6bcc" },
  diaphragm: { x: 295, y: 285, system: "Musculoskeletal System", color: "#d9665f" },
  biceps: { x: 245, y: 275, system: "Musculoskeletal System", color: "#d9665f" },
  femur: { x: 268, y: 485, system: "Musculoskeletal System", color: "#cbb98c" },
  pelvis: { x: 295, y: 385, system: "Musculoskeletal System", color: "#cbb98c" },
  knee: { x: 266, y: 550, system: "Musculoskeletal System", color: "#cbb98c" },
  sternum: { x: 295, y: 245, system: "Musculoskeletal System", color: "#cbb98c" },
  manubrium: { x: 295, y: 228, system: "Musculoskeletal System", color: "#cbb98c" },
  "main-bronchus": { x: 295, y: 232, system: "Respiratory System", color: "#5d9ce8" },
  "palatine-tonsil": { x: 295, y: 165, system: "Lymphatic System", color: "#b98cc9" },
  "fallopian-tube": { x: 282, y: 386, system: "Reproductive System", color: "#e07a9b" },
  ureter: { x: 286, y: 365, system: "Urinary System", color: "#54b7c9" },
  urethra: { x: 295, y: 418, system: "Urinary System", color: "#54b7c9" },
  "renal-pelvis": { x: 282, y: 335, system: "Urinary System", color: "#54b7c9" },
  "large-intestine": { x: 295, y: 340, system: "Digestive System", color: "#e8a33b" },
  omentum: { x: 295, y: 325, system: "Digestive System", color: "#e8a33b" },
};

const lensCx = 552;
const lensCy = 196;
const lensR = 124;

async function generateLocationPlate(organId) {
  const meta = ORGAN_COORDS[organId];
  if (!meta) return;

  const color = meta.color;
  const targetX = meta.x;
  const targetY = meta.y;

  // Path from target point on body to the circular lens edge
  const endX = lensCx - lensR + 5;
  const endY = lensCy + 15;
  const cp1X = targetX + (endX - targetX) * 0.45;
  const cp1Y = targetY + (endY - targetY) * 0.1;
  const cp2X = targetX + (endX - targetX) * 0.8;
  const cp2Y = endY + 8;

  const overlaySvg = `<svg width="720" height="720" viewBox="0 0 720 720" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="parchmentPatch" cx="50%" cy="50%" r="50%">
        <stop offset="65%" stop-color="#faf5ec" />
        <stop offset="92%" stop-color="#f8efe0" />
        <stop offset="100%" stop-color="#f4e8d8" />
      </radialGradient>
      <radialGradient id="lensInterior" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="80%" stop-color="#fdfaf4" />
        <stop offset="100%" stop-color="#f3e8dc" />
      </radialGradient>
      <radialGradient id="organGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.95" />
        <stop offset="45%" stop-color="${color}" stop-opacity="0.5" />
        <stop offset="100%" stop-color="${color}" stop-opacity="0" />
      </radialGradient>
    </defs>

    <!-- 1. Seamlessly erase old lens from skin template -->
    <circle cx="552" cy="196" r="130" fill="url(#parchmentPatch)" />

    <!-- 3. Target organ indicator on body -->
    <path d="M ${targetX},${targetY} C ${cp1X},${cp1Y} ${cp2X},${cp2Y} ${endX},${endY}" stroke="#a8856c" stroke-width="2" stroke-dasharray="3.5,3.5" fill="none" opacity="0.88" />
    <circle cx="${targetX}" cy="${targetY}" r="14" fill="url(#organGlow)" />
    <circle cx="${targetX}" cy="${targetY}" r="4.5" fill="${color}" stroke="#ffffff" stroke-width="1.6" />

    <!-- 4. Specimen zoom lens frame with double brass/sepia rim -->
    <circle cx="${lensCx}" cy="${lensCy}" r="${lensR}" fill="url(#lensInterior)" stroke="#baa28c" stroke-width="2.8" />
    <circle cx="${lensCx}" cy="${lensCy}" r="${lensR + 3}" fill="none" stroke="#d8c4b2" stroke-width="1.2" opacity="0.75" />
    
    <!-- 5. System in-situ label below lens -->
    <text x="${lensCx}" y="${lensCy + lensR + 25}" font-family="serif" font-size="13" font-style="italic" fill="#8c6c58" text-anchor="middle">${meta.system} · In Situ</text>
  </svg>`;

  const overlayBuffer = await sharp(Buffer.from(overlaySvg)).png().toBuffer();

  const organImgPath = path.join("public/anatomy", organId, "organ.webp");
  const organZoom = await sharp(organImgPath)
    .resize(195, 195, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const organBody = await sharp(organImgPath)
    .resize(28, 28, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const outPath = path.join("public/anatomy", organId, "location.webp");
  await sharp("public/anatomy/skin/location.webp")
    .composite([
      { input: overlayBuffer, top: 0, left: 0 },
      { input: organZoom, top: lensCy - Math.round(195 / 2), left: lensCx - Math.round(195 / 2) },
      { input: organBody, top: targetY - 14, left: targetX - 14 },
    ])
    .webp({ quality: 90 })
    .toFile(outPath);

  console.log(`✓ Generated ${outPath}`);
}

async function main() {
  const organs = Object.keys(ORGAN_COORDS);
  console.log(`Generating location.webp for ${organs.length} organs...`);
  for (const organ of organs) {
    await generateLocationPlate(organ);
  }
  console.log("All location.webp generated successfully!");
}

main().catch(console.error);
