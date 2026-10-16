import fs from "fs";
import path from "path";
import sharp from "sharp";

const cx = 360, cy = 360, r = 295;

function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function wrapSVG(content, filter = "watercolor") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="720" viewBox="0 0 720 720">
    <rect width="720" height="720" fill="#fbf4e8" />
    <defs>
      <clipPath id="circleClip">
        <circle cx="${cx}" cy="${cy}" r="${r}" />
      </clipPath>
      <radialGradient id="vignette" cx="50%" cy="50%" r="50%">
        <stop offset="70%" stop-color="#000" stop-opacity="0" />
        <stop offset="97%" stop-color="#4a1824" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#38101a" stop-opacity="0.55" />
      </radialGradient>
      <filter id="watercolor">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="slightTexture">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
    <g clip-path="url(#circleClip)">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="#f6dce0" />
      <g filter="url(#${filter})">
        ${content}
      </g>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#vignette)" mix-blend-mode="multiply" />
    </g>
    <!-- Double archival border rim -->
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#dfc7b0" stroke-width="3" />
    <circle cx="${cx}" cy="${cy}" r="${r + 2}" fill="none" stroke="#cfb49e" stroke-width="1" opacity="0.65" />
  </svg>`;
}

// 1. Thyroid: Colloid follicles with follicular epithelial nuclei
function renderThyroid(seed = 101) {
  const rand = rng(seed);
  let elements = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#f4d4da" />`;
  for (let x = cx - r - 20; x <= cx + r + 20; x += 48) {
    for (let y = cy - r - 20; y <= cy + r + 20; y += 48) {
      const dx = x - cx + (rand() - 0.5) * 24;
      const dy = y - cy + (rand() - 0.5) * 24;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < r + 30) {
        const px = cx + dx;
        const py = cy + dy;
        const rad = 16 + rand() * 26;
        const ry = rad * (0.82 + rand() * 0.36);
        elements += `<ellipse cx="${px}" cy="${py}" rx="${rad}" ry="${ry}" fill="#eb889b" opacity="0.9" />`;
        elements += `<ellipse cx="${px - 1.5}" cy="${py - 1}" rx="${rad * 0.84}" ry="${ry * 0.84}" fill="#f29cb0" opacity="0.95" />`;
        const numCells = Math.floor(rad * 1.1);
        for (let i = 0; i < numCells; i++) {
          const angle = (i / numCells) * Math.PI * 2 + rand() * 0.15;
          const crx = px + Math.cos(angle) * (rad + 2);
          const cry = py + Math.sin(angle) * (ry + 2);
          elements += `<circle cx="${crx.toFixed(1)}" cy="${cry.toFixed(1)}" r="${(2.3 + rand() * 1.1).toFixed(1)}" fill="#4a2266" opacity="0.88" />`;
        }
      }
    }
  }
  return wrapSVG(elements);
}

// 2. Stomach: Gastric mucosa pits & tubular glands
function renderStomach(seed = 102) {
  const rand = rng(seed);
  let elements = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#f5ced5" />`;
  // Tubular pits running vertically
  for (let x = cx - r - 20; x <= cx + r + 20; x += 32) {
    const ox = x + (rand() - 0.5) * 16;
    elements += `<path d="M${ox},${cy - r} Q${ox + (rand() - 0.5) * 40},${cy} ${ox + (rand() - 0.5) * 30},${cy + r}" stroke="#eb8597" stroke-width="${14 + rand() * 10}" fill="none" stroke-linecap="round" />`;
    elements += `<path d="M${ox},${cy - r} Q${ox + (rand() - 0.5) * 40},${cy} ${ox + (rand() - 0.5) * 30},${cy + r}" stroke="#fbf4f0" stroke-width="${4 + rand() * 4}" fill="none" />`;
  }
  // Glandular parietal and chief cells lining the pits
  for (let i = 0; i < 650; i++) {
    const rx = cx + (rand() - 0.5) * r * 2.1;
    const ry = cy + (rand() - 0.5) * r * 2.1;
    const isParietal = rand() > 0.45;
    const col = isParietal ? "#d94a6a" : "#451e5e"; // Pink parietal vs deep purple chief
    elements += `<circle cx="${rx.toFixed(1)}" cy="${ry.toFixed(1)}" r="${(isParietal ? 3.8 + rand() * 2 : 2.5 + rand() * 1.5).toFixed(1)}" fill="${col}" opacity="0.88" />`;
  }
  return wrapSVG(elements);
}

// 3. Gallbladder / Large-Intestine: Folded mucosal crypts with columnar/goblet cells
function renderMucosaCrypts(seed = 103, isColonic = false) {
  const rand = rng(seed);
  let elements = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#f3d0d8" />`;
  const step = isColonic ? 42 : 50;
  for (let x = cx - r - 20; x <= cx + r + 20; x += step) {
    for (let y = cy - r - 20; y <= cy + r + 20; y += step) {
      const px = x + (rand() - 0.5) * 20;
      const py = y + (rand() - 0.5) * 20;
      const rad = isColonic ? 16 + rand() * 10 : 20 + rand() * 14;
      elements += `<ellipse cx="${px}" cy="${py}" rx="${rad}" ry="${rad * (0.8 + rand() * 0.4)}" fill="#e97e93" opacity="0.85" />`;
      // Crypt lumen
      elements += `<ellipse cx="${px}" cy="${py}" rx="${rad * 0.45}" ry="${rad * 0.45}" fill="#fdfaf6" />`;
      // Goblet vacuoles / columnar nuclei
      const n = Math.floor(rad * 0.85);
      for (let k = 0; k < n; k++) {
        const a = (k / n) * Math.PI * 2;
        const nx = px + Math.cos(a) * (rad * 0.8);
        const ny = py + Math.sin(a) * (rad * 0.8);
        elements += `<circle cx="${nx.toFixed(1)}" cy="${ny.toFixed(1)}" r="2.4" fill="#3d1b54" opacity="0.9" />`;
        if (isColonic && rand() > 0.4) {
          // Pale clear mucus droplets
          elements += `<circle cx="${(px + Math.cos(a) * (rad * 0.55)).toFixed(1)}" cy="${(py + Math.sin(a) * (rad * 0.55)).toFixed(1)}" r="2.8" fill="#ffffff" opacity="0.85" />`;
        }
      }
    }
  }
  return wrapSVG(elements);
}

// 4. Bone / Osteons: Haversian canals with concentric lamellae (Femur, Pelvis, Sternum, Manubrium)
function renderBone(seed = 104) {
  const rand = rng(seed);
  let elements = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#f0d5c0" />`;
  // Several major osteon centers
  for (let x = cx - r + 30; x <= cx + r + 30; x += 110) {
    for (let y = cy - r + 30; y <= cy + r + 30; y += 110) {
      const ox = x + (rand() - 0.5) * 36;
      const oy = y + (rand() - 0.5) * 36;
      // Concentric rings (lamellae)
      for (let ring = 16; ring <= 72; ring += 11) {
        elements += `<ellipse cx="${ox}" cy="${oy}" rx="${ring}" ry="${ring * (0.9 + rand() * 0.2)}" fill="none" stroke="#d4ab8a" stroke-width="2.2" opacity="0.75" />`;
        // Osteocyte lacunae along lamellar rings
        const count = Math.floor(ring * 0.4);
        for (let i = 0; i < count; i++) {
          const a = (i / count) * Math.PI * 2 + rand() * 0.2;
          const lx = ox + Math.cos(a) * ring;
          const ly = oy + Math.sin(a) * ring;
          elements += `<ellipse cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" rx="2.8" ry="1.4" transform="rotate(${((a * 180) / Math.PI).toFixed(1)} ${lx.toFixed(1)} ${ly.toFixed(1)})" fill="#4d2b24" opacity="0.85" />`;
        }
      }
      // Central Haversian canal with capillary
      elements += `<circle cx="${ox}" cy="${oy}" r="9" fill="#fcf9f4" stroke="#c09472" stroke-width="2" />`;
      elements += `<circle cx="${ox + 1}" cy="${oy}" r="4" fill="#c94444" opacity="0.85" />`;
    }
  }
  return wrapSVG(elements, "slightTexture");
}

// 5. Cartilage: Hyaline matrix with chondrocyte lacunae (Trachea, Larynx, Knee, Main-Bronchus)
function renderCartilage(seed = 105) {
  const rand = rng(seed);
  let elements = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#cbd6e8" />`;
  // Glassy basophilic matrix waves
  for (let i = 0; i < 18; i++) {
    elements += `<path d="M${cx - r},${cy - r + i * 40} Q${cx + (rand() - 0.5) * 80},${cy - r + i * 40 + 20} ${cx + r},${cy - r + i * 40}" stroke="#b2c4dc" stroke-width="18" fill="none" opacity="0.45" />`;
  }
  // Chondrocyte isogenous groups in lacunae
  for (let i = 0; i < 280; i++) {
    const px = cx + (rand() - 0.5) * r * 1.95;
    const py = cy + (rand() - 0.5) * r * 1.95;
    const rad = 7 + rand() * 6;
    // Lacuna (clear halo)
    elements += `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" rx="${rad.toFixed(1)}" ry="${(rad * 0.85).toFixed(1)}" fill="#fdfbf8" stroke="#8fa8cc" stroke-width="1.8" />`;
    // Chondrocyte cell body + purple nucleus
    elements += `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" rx="${(rad * 0.65).toFixed(1)}" ry="${(rad * 0.55).toFixed(1)}" fill="#b597c4" />`;
    elements += `<circle cx="${(px + 0.8).toFixed(1)}" cy="${(py - 0.5).toFixed(1)}" r="${(rad * 0.35).toFixed(1)}" fill="#44225e" />`;
  }
  return wrapSVG(elements);
}

// 6. Muscle: Cross-striated fibers with peripheral nuclei (Biceps, Diaphragm, Tongue)
function renderMuscle(seed = 106) {
  const rand = rng(seed);
  let elements = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ec8a9c" />`;
  // Longitudinal bundles / fibers
  for (let y = cy - r - 20; y <= cy + r + 20; y += 22) {
    const fy = y + (rand() - 0.5) * 6;
    elements += `<rect x="${cx - r - 20}" y="${fy}" width="${r * 2 + 40}" height="19" fill="#ea778b" stroke="#e05f77" stroke-width="1.2" />`;
    // Fine cross-striations (A and I bands)
    for (let x = cx - r - 10; x <= cx + r + 10; x += 7) {
      elements += `<line x1="${x}" y1="${fy}" x2="${x}" y2="${fy + 19}" stroke="#d64962" stroke-width="1.4" opacity="0.6" />`;
    }
    // Peripheral flattened nuclei
    for (let k = 0; k < 6; k++) {
      const nx = cx - r + rand() * r * 2;
      const topOrBottom = rand() > 0.5 ? fy + 2 : fy + 17;
      elements += `<ellipse cx="${nx.toFixed(1)}" cy="${topOrBottom.toFixed(1)}" rx="5" ry="2" fill="#3b1754" opacity="0.9" />`;
    }
  }
  return wrapSVG(elements);
}

// 7. Lymphoid: Spleen, Thymus, Lymph-Node, Palatine-Tonsil
function renderLymphoid(seed = 107, type = "lymph") {
  const rand = rng(seed);
  let elements = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#e8c2ce" />`;
  // Germinal centers (pale rounded nodules surrounded by dense dark mantle)
  const centers = [
    { x: cx - 120, y: cy - 90, rad: 80 },
    { x: cx + 110, y: cy - 70, rad: 95 },
    { x: cx - 60, y: cy + 120, rad: 85 },
    { x: cx + 120, y: cy + 110, rad: 75 },
    { x: cx, y: cy, rad: 65 },
  ];
  centers.forEach((c) => {
    // Mantle zone (dense dark purple)
    elements += `<circle cx="${c.x}" cy="${c.y}" r="${c.rad + 20}" fill="#542468" opacity="0.8" />`;
    // Germinal center (pale active centroblasts)
    elements += `<circle cx="${c.x}" cy="${c.y}" r="${c.rad}" fill="#d49db3" opacity="0.95" />`;
    // Central arteriole (in spleen)
    if (type === "spleen") {
      elements += `<circle cx="${c.x + 22}" cy="${c.y - 18}" r="8" fill="#f8f4f0" stroke="#b83848" stroke-width="2.5" />`;
      elements += `<circle cx="${c.x + 22}" cy="${c.y - 18}" r="3.5" fill="#c82838" />`;
    }
  });
  // Dense sheet of lymphocytes (small purple dots)
  for (let i = 0; i < 900; i++) {
    const lx = cx + (rand() - 0.5) * r * 2.1;
    const ly = cy + (rand() - 0.5) * r * 2.1;
    elements += `<circle cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="${(1.8 + rand() * 1.4).toFixed(1)}" fill="#381048" opacity="0.85" />`;
  }
  return wrapSVG(elements);
}

// 8. Transitional Urothelium: Bladder, Ureter, Urethra, Renal-Pelvis
function renderUrothelium(seed = 108) {
  const rand = rng(seed);
  let elements = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#f5cbd3" />`;
  // Star/folded lumen in center
  elements += `<path d="M${cx},${cy - 80} Q${cx + 70},${cy - 20} ${cx + 100},${cy} Q${cx + 60},${cy + 70} ${cx},${cy + 85} Q${cx - 70},${cy + 55} ${cx - 95},${cy} Q${cx - 50},${cy - 65} ${cx},${cy - 80}" fill="#fcf9f5" stroke="#e86884" stroke-width="6" />`;
  // Large dome-shaped umbrella cells lining lumen
  for (let a = 0; a < Math.PI * 2; a += 0.22) {
    const lx = cx + Math.cos(a) * (85 + Math.sin(a * 4) * 22);
    const ly = cy + Math.sin(a) * (80 + Math.cos(a * 4) * 20);
    elements += `<ellipse cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" rx="8" ry="5.5" fill="#e88599" stroke="#501a62" stroke-width="1.6" />`;
    elements += `<circle cx="${(lx - 1).toFixed(1)}" cy="${ly.toFixed(1)}" r="2.8" fill="#441258" />`;
  }
  // Intersecting smooth muscle bundles in detrusor wall
  for (let i = 0; i < 400; i++) {
    const mx = cx + (rand() - 0.5) * r * 2.05;
    const my = cy + (rand() - 0.5) * r * 2.05;
    const dist = Math.hypot(mx - cx, my - cy);
    if (dist > 110 && dist < r) {
      elements += `<ellipse cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" rx="6" ry="2.2" fill="#d95874" opacity="0.8" transform="rotate(${(rand() * 180).toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)})" />`;
    }
  }
  return wrapSVG(elements);
}

// 9. Neural / Spinal Cord: Multipolar motor neurons with Nissl granules
function renderNeural(seed = 109) {
  const rand = rng(seed);
  let elements = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ecd8cf" />`;
  // Neuropil fibrillary background
  for (let i = 0; i < 60; i++) {
    elements += `<path d="M${cx - r},${cy - r + rand() * r * 2} Q${cx + (rand() - 0.5) * 100},${cy + (rand() - 0.5) * 100} ${cx + r},${cy - r + rand() * r * 2}" stroke="#dfc2b2" stroke-width="2.5" fill="none" opacity="0.55" />`;
  }
  // Large multipolar motor neuron cell bodies with dendrites
  const neurons = [
    { x: cx - 80, y: cy - 70, s: 42 },
    { x: cx + 90, y: cy - 40, s: 48 },
    { x: cx - 40, y: cy + 90, s: 44 },
    { x: cx + 75, y: cy + 105, s: 39 },
    { x: cx + 10, y: cy + 10, s: 46 },
  ];
  neurons.forEach((n) => {
    // Radiating dendrites
    for (let a = 0; a < Math.PI * 2; a += 0.8) {
      elements += `<line x1="${n.x}" y1="${n.y}" x2="${n.x + Math.cos(a) * (n.s + 35)}" y2="${n.y + Math.sin(a) * (n.s + 35)}" stroke="#4d2568" stroke-width="4.5" stroke-linecap="round" opacity="0.9" />`;
    }
    // Soma
    elements += `<polygon points="${n.x},${n.y - n.s * 0.7} ${n.x + n.s * 0.65},${n.y - n.s * 0.2} ${n.x + n.s * 0.5},${n.y + n.s * 0.65} ${n.x - n.s * 0.5},${n.y + n.s * 0.65} ${n.x - n.s * 0.7},${n.y - n.s * 0.2}" fill="#562874" stroke="#3b1652" stroke-width="2" />`;
    // Large pale vesicular nucleus + prominent dark nucleolus
    elements += `<circle cx="${n.x}" cy="${n.y}" r="${n.s * 0.32}" fill="#d8bfe8" />`;
    elements += `<circle cx="${n.x + 1}" cy="${n.y - 1}" r="${n.s * 0.12}" fill="#240836" />`;
  });
  // Surrounding glial cell nuclei
  for (let i = 0; i < 350; i++) {
    elements += `<circle cx="${(cx + (rand() - 0.5) * r * 1.95).toFixed(1)}" cy="${(cy + (rand() - 0.5) * r * 1.95).toFixed(1)}" r="2.2" fill="#3f1a56" opacity="0.8" />`;
  }
  return wrapSVG(elements);
}

// 10. Reproductive / Glandular: Ovary, Testis, Prostate, Uterus
function renderReproductive(seed = 110, subtype = "testis") {
  const rand = rng(seed);
  let elements = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#f4d0d8" />`;
  if (subtype === "testis") {
    // Seminiferous tubules cross-sections
    for (let x = cx - r + 40; x <= cx + r + 40; x += 115) {
      for (let y = cy - r + 40; y <= cy + r + 40; y += 115) {
        const ox = x + (rand() - 0.5) * 28;
        const oy = y + (rand() - 0.5) * 28;
        const rad = 46 + rand() * 12;
        elements += `<circle cx="${ox}" cy="${oy}" r="${rad}" fill="#eb8ea2" stroke="#501a66" stroke-width="2.5" opacity="0.9" />`;
        elements += `<circle cx="${ox}" cy="${oy}" r="${rad * 0.38}" fill="#fcf9f5" />`;
        // Spermatogenic cell layers
        for (let k = 0; k < 60; k++) {
          const a = rand() * Math.PI * 2;
          const dist = rad * (0.45 + rand() * 0.5);
          elements += `<circle cx="${(ox + Math.cos(a) * dist).toFixed(1)}" cy="${(oy + Math.sin(a) * dist).toFixed(1)}" r="${(2.2 + rand() * 1.2).toFixed(1)}" fill="#3e1454" />`;
        }
        // Interstitial Leydig cells
        elements += `<circle cx="${ox + rad + 14}" cy="${oy + 12}" r="7" fill="#d8526a" opacity="0.9" />`;
      }
    }
  } else if (subtype === "ovary") {
    // Ovarian cortex with developing follicles & antrum
    elements += `<circle cx="${cx - 80}" cy="${cy - 60}" r="85" fill="#f8dfe6" stroke="#48185c" stroke-width="3" />`;
    elements += `<circle cx="${cx - 95}" cy="${cy - 75}" r="38" fill="#fdfaf7" />`; // Antrum fluid
    elements += `<circle cx="${cx - 55}" cy="${cy - 45}" r="22" fill="#eb7c94" />`; // Cumulus oophorus
    elements += `<circle cx="${cx - 55}" cy="${cy - 45}" r="11" fill="#feeef2" stroke="#b43452" stroke-width="2" />`; // Oocyte
    // Multiple smaller primordial follicles
    for (let i = 0; i < 22; i++) {
      const a = rand() * Math.PI * 2;
      const d = 110 + rand() * 140;
      elements += `<circle cx="${(cx + Math.cos(a) * d).toFixed(1)}" cy="${(cy + Math.sin(a) * d).toFixed(1)}" r="12" fill="#ea8098" stroke="#481458" stroke-width="1.8" />`;
      elements += `<circle cx="${(cx + Math.cos(a) * d).toFixed(1)}" cy="${(cy + Math.sin(a) * d).toFixed(1)}" r="4.5" fill="#fcf4f6" />`;
    }
  } else {
    // Prostate / Uterus tubuloalveolar glands with fibromuscular stroma
    for (let x = cx - r + 30; x <= cx + r + 30; x += 75) {
      for (let y = cy - r + 30; y <= cy + r + 30; y += 75) {
        const ox = x + (rand() - 0.5) * 25;
        const oy = y + (rand() - 0.5) * 25;
        elements += `<path d="M${ox - 25},${oy} Q${ox - 10},${oy - 30} ${ox + 20},${oy - 20} Q${ox + 35},${oy + 15} ${ox},${oy + 28} Z" fill="#fcf9f5" stroke="#e0627e" stroke-width="4" />`;
        // Epithelial nuclei
        for (let k = 0; k < 18; k++) {
          const a = (k / 18) * Math.PI * 2;
          elements += `<circle cx="${(ox + Math.cos(a) * 26).toFixed(1)}" cy="${(oy + Math.sin(a) * 22).toFixed(1)}" r="2.5" fill="#441656" />`;
        }
      }
    }
  }
  return wrapSVG(elements);
}

// 11. Adipose / Omentum: Signet-ring fat cells
function renderAdipose(seed = 111) {
  const rand = rng(seed);
  let elements = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#faf2e4" />`;
  // Hexagonal/rounded adipocyte honeycomb
  for (let x = cx - r - 20; x <= cx + r + 20; x += 36) {
    for (let y = cy - r - 20; y <= cy + r + 20; y += 36) {
      const px = x + (rand() - 0.5) * 12;
      const py = y + (rand() - 0.5) * 12;
      const rad = 17 + rand() * 8;
      // Clear lipid vacuole
      elements += `<circle cx="${px}" cy="${py}" r="${rad}" fill="#fffdfa" stroke="#d8bfa2" stroke-width="1.8" />`;
      // Peripheral crescent nucleus (signet ring)
      const a = rand() * Math.PI * 2;
      elements += `<ellipse cx="${(px + Math.cos(a) * (rad - 1)).toFixed(1)}" cy="${(py + Math.sin(a) * (rad - 1)).toFixed(1)}" rx="3.5" ry="1.6" fill="#662248" />`;
    }
  }
  return wrapSVG(elements);
}

// 12. Adrenal / Pituitary: Endocrine cords & sinusoids
function renderEndocrineCords(seed = 112) {
  const rand = rng(seed);
  let elements = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#f3ccd6" />`;
  // Parallel columns of cells (Zona fasciculata)
  for (let x = cx - r - 20; x <= cx + r + 20; x += 28) {
    const ox = x + (rand() - 0.5) * 10;
    elements += `<line x1="${ox}" y1="${cy - r}" x2="${ox}" y2="${cy + r}" stroke="#e8788e" stroke-width="18" opacity="0.85" />`;
    // Sinusoidal capillaries between cords
    elements += `<line x1="${ox + 14}" y1="${cy - r}" x2="${ox + 14}" y2="${cy + r}" stroke="#e44848" stroke-width="2.2" opacity="0.75" />`;
    // Foamy cells with nuclei along cords
    for (let y = cy - r; y <= cy + r; y += 14) {
      elements += `<circle cx="${(ox - 2 + (rand() - 0.5) * 6).toFixed(1)}" cy="${y}" r="2.8" fill="#441656" />`;
    }
  }
  return wrapSVG(elements);
}

// Map each organ to its specialized renderer
const RENDERERS = {
  stomach: (seed) => renderStomach(seed),
  gallbladder: (seed) => renderMucosaCrypts(seed, false),
  esophagus: (seed) => renderMucosaCrypts(seed, false),
  tongue: (seed) => renderMuscle(seed),
  spleen: (seed) => renderLymphoid(seed, "spleen"),
  thymus: (seed) => renderLymphoid(seed, "thymus"),
  "lymph-node": (seed) => renderLymphoid(seed, "lymph"),
  thyroid: (seed) => renderThyroid(seed),
  adrenal: (seed) => renderEndocrineCords(seed),
  pituitary: (seed) => renderEndocrineCords(seed + 1),
  trachea: (seed) => renderCartilage(seed),
  larynx: (seed) => renderCartilage(seed + 2),
  bladder: (seed) => renderUrothelium(seed),
  uterus: (seed) => renderReproductive(seed, "uterus"),
  ovary: (seed) => renderReproductive(seed, "ovary"),
  testis: (seed) => renderReproductive(seed, "testis"),
  prostate: (seed) => renderReproductive(seed, "prostate"),
  "spinal-cord": (seed) => renderNeural(seed),
  diaphragm: (seed) => renderMuscle(seed + 5),
  biceps: (seed) => renderMuscle(seed + 6),
  femur: (seed) => renderBone(seed),
  pelvis: (seed) => renderBone(seed + 1),
  knee: (seed) => renderCartilage(seed + 8),
  sternum: (seed) => renderBone(seed + 2),
  manubrium: (seed) => renderBone(seed + 3),
  "main-bronchus": (seed) => renderCartilage(seed + 4),
  "palatine-tonsil": (seed) => renderLymphoid(seed + 7, "tonsil"),
  "fallopian-tube": (seed) => renderMucosaCrypts(seed + 9, false),
  ureter: (seed) => renderUrothelium(seed + 3),
  urethra: (seed) => renderUrothelium(seed + 4),
  "renal-pelvis": (seed) => renderUrothelium(seed + 5),
  "large-intestine": (seed) => renderMucosaCrypts(seed + 12, true),
  omentum: (seed) => renderAdipose(seed),
};

async function main() {
  const organs = Object.keys(RENDERERS);
  console.log(`Generating microscopic.webp for ${organs.length} organs...`);
  let seed = 300;
  for (const organ of organs) {
    seed += 7;
    const svg = RENDERERS[organ](seed);
    const dir = path.join("public/anatomy", organ);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const outPath = path.join(dir, "microscopic.webp");
    await sharp(Buffer.from(svg))
      .webp({ quality: 90 })
      .toFile(outPath);
    console.log(`✓ Generated ${outPath}`);
  }
  console.log("All microscopic.webp files generated successfully!");
}

main().catch(console.error);
