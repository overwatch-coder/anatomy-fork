import fs from "fs";
import path from "path";
import sharp from "sharp";

const NATURAL_COMPARE = {
  stomach: "intestine",
  gallbladder: "liver",
  esophagus: "stomach",
  tongue: "esophagus",
  spleen: "lymph-node",
  thymus: "spleen",
  "lymph-node": "spleen",
  thyroid: "pituitary",
  adrenal: "kidneys",
  pituitary: "brain",
  trachea: "lungs",
  larynx: "trachea",
  bladder: "kidneys",
  uterus: "ovary",
  ovary: "uterus",
  testis: "prostate",
  prostate: "bladder",
  "spinal-cord": "brain",
  diaphragm: "lungs",
  biceps: "femur",
  femur: "pelvis",
  pelvis: "femur",
  knee: "femur",
  sternum: "lungs",
  manubrium: "sternum",
  "main-bronchus": "trachea",
  "palatine-tonsil": "tongue",
  "fallopian-tube": "uterus",
  ureter: "kidneys",
  urethra: "bladder",
  "renal-pelvis": "kidneys",
  "large-intestine": "intestine",
  omentum: "stomach",
};

const bgSvg = `<svg width="720" height="720" viewBox="0 0 720 720" xmlns="http://www.w3.org/2000/svg">
  <rect width="720" height="720" fill="#fbf5ec" />
  <defs>
    <radialGradient id="bloom1" cx="30%" cy="35%" r="45%">
      <stop offset="0%" stop-color="#eddcd4" stop-opacity="0.6" />
      <stop offset="60%" stop-color="#f5e8df" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#fbf5ec" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="bloom2" cx="75%" cy="30%" r="40%">
      <stop offset="0%" stop-color="#dfdce8" stop-opacity="0.5" />
      <stop offset="65%" stop-color="#ede9f2" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#fbf5ec" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="badgeGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="720" height="720" fill="url(#bloom1)" />
  <rect width="720" height="720" fill="url(#bloom2)" />
  
  <circle cx="360" cy="360" r="42" fill="url(#badgeGlow)" />
  <line x1="360" y1="120" x2="360" y2="320" stroke="#dfd2c4" stroke-width="1" stroke-dasharray="3,3" opacity="0.6" />
  <line x1="360" y1="400" x2="360" y2="600" stroke="#dfd2c4" stroke-width="1" stroke-dasharray="3,3" opacity="0.6" />
  
  <circle cx="360" cy="360" r="24" fill="#ffffff" stroke="#dfcfc0" stroke-width="1.5" />
  <text x="360" y="365" font-family="serif" font-size="13" font-style="italic" font-weight="600" fill="#a07a68" text-anchor="middle">VS</text>
</svg>`;

async function main() {
  const bgBuffer = await sharp(Buffer.from(bgSvg)).png().toBuffer();
  const organs = Object.keys(NATURAL_COMPARE);
  console.log(`Generating compare.webp for ${organs.length} organs...`);

  for (const organ of organs) {
    const ref = NATURAL_COMPARE[organ];
    const leftPath = path.join("public/anatomy", organ, "organ.webp");
    const rightPath = path.join("public/anatomy", ref, "organ.webp");

    if (!fs.existsSync(leftPath) || !fs.existsSync(rightPath)) {
      console.warn(`Missing organ.webp for ${organ} or ${ref}`);
      continue;
    }

    const leftImg = await sharp(leftPath)
      .resize(320, 320, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();

    const rightImg = await sharp(rightPath)
      .resize(320, 320, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();

    const outPath = path.join("public/anatomy", organ, "compare.webp");
    await sharp(bgBuffer)
      .composite([
        { input: leftImg, top: 200, left: 30 },
        { input: rightImg, top: 200, left: 370 },
      ])
      .webp({ quality: 90 })
      .toFile(outPath);

    console.log(`✓ Generated ${outPath}`);
  }
  console.log("All compare.webp generated successfully!");
}

main().catch(console.error);
