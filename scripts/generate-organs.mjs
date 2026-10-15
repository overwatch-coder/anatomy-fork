/**
 * Generates stylised 3D models (GLB) for the organs that have no painted
 * asset set, using Three.js primitives. The shapes are simplified but
 * recognisable anatomical forms, exported into the same normalized space the
 * app uses (FIT_SIZE = 3.8 along the longest axis, centred on the origin), so
 * hotspot coordinates authored here land on the right features.
 *
 * Run:  node scripts/generate-organs.mjs
 * Output: public/models/<id>.glb  +  printed hotspot coordinates (paste into
 *         anatomy-data.ts) + scripts/organs-hotspots.json
 */
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The exporter reads Blobs via FileReader, which does not exist in Node —
// provide a minimal polyfill backed by Blob.arrayBuffer().
if (typeof globalThis.FileReader === "undefined") {
  globalThis.FileReader = class FileReader {
    result = null;
    onloadend = null;
    readAsArrayBuffer(blob) {
      blob.arrayBuffer().then((buffer) => {
        this.result = buffer;
        this.onloadend?.();
      });
    }
  };
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const FIT = 3.8;
const exporter = new GLTFExporter();

function mat(color) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0 });
}

function mesh(geo, material, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) {
  const m = new THREE.Mesh(geo, material);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz);
  m.scale.set(sx, sy, sz);
  m.geometry.computeVertexNormals();
  return m;
}

function sphere(r, x, y, z, sx = 1, sy = 1, sz = 1, material) {
  return mesh(new THREE.SphereGeometry(r, 32, 20), material, x, y, z, 0, 0, 0, sx, sy, sz);
}

function cyl(rTop, rBottom, h, x, y, z, rx = 0, rz = 0, material) {
  return mesh(new THREE.CylinderGeometry(rTop, rBottom, h, 24, 1), material, x, y, z, rx, 0, rz);
}

function tube(points, radius, material, tubularSegments = 40, radialSegments = 10) {
  const curve = new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
  const geo = new THREE.TubeGeometry(curve, tubularSegments, radius, radialSegments, false);
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, material);
}

function lathe(profile, material, segments = 40) {
  const points = profile.map(([x, y]) => new THREE.Vector2(x, y));
  const geo = new THREE.LatheGeometry(points, segments);
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, material);
}

/** Fits the group into the FIT cube, then snaps every hotspot onto the nearest
 *  mesh vertex so the authored dots sit exactly on the surface the viewer will
 *  render (the app's own snapping finds the same vertex). */
function finalize(group, hotspots, color) {
  const material = mat(color);
  group.traverse((child) => {
    if (child.isMesh) child.material = material;
  });
  const box = new THREE.Box3().setFromObject(group);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const max = Math.max(size.x, size.y, size.z, 0.001);
  const s = FIT / max;
  group.scale.setScalar(s);
  group.position.copy(center.clone().multiplyScalar(-s));
  group.updateMatrixWorld(true);

  // All mesh vertices in world (pivot) space, after the fit transform.
  const verts = [];
  group.traverse((child) => {
    if (!child.isMesh) return;
    const pos = child.geometry.getAttribute("position");
    for (let i = 0; i < pos.count; i += 1) {
      verts.push(new THREE.Vector3().fromBufferAttribute(pos, i).applyMatrix4(child.matrixWorld));
    }
  });

  const round = (value) => Math.round(value * 100) / 100;
  const mapped = hotspots.map((h) => {
    const target = new THREE.Vector3(h.x - center.x, h.y - center.y, h.z - center.z).multiplyScalar(s);
    let best = verts[0];
    let bestDistance = Infinity;
    for (const v of verts) {
      const distance = v.distanceToSquared(target);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = v;
      }
    }
    return { id: h.id, position: [round(best.x), round(best.y), round(best.z)] };
  });
  return { group, hotspots: mapped };
}

// ------------------------------------------------------------------ organs

function buildStomach() {
  const g = new THREE.Group();
  // J-shaped pouch: cardia → body → pylorus.
  g.add(tube(
    [[-1.1, 1.45, 0], [-1.55, 0.9, 0], [-1.35, 0.1, 0], [-0.7, -0.45, 0], [0.3, -0.75, 0], [1.2, -0.6, 0], [1.55, -0.1, 0], [1.35, 0.55, 0]],
    0.55, null, 48, 12,
  ));
  g.add(sphere(0.62, -1.35, 1.25, 0, 1.0, 1.05, 1.0)); // fundus
  g.add(sphere(0.45, 1.55, 0.9, 0, 1.0, 1.0, 1.0)); // pyloric antrum hint
  const hot = [
    { id: "fundus", x: -1.4, y: 1.35, z: 0.3 },
    { id: "body", x: 0.1, y: 0.1, z: 0.35 },
    { id: "pylorus", x: 1.55, y: 0.35, z: 0.25 },
  ];
  return { g, hot, color: 0xd98b74 };
}

function buildGallbladder() {
  const g = new THREE.Group();
  g.add(lathe([[0.02, -1.1], [0.4, -1.02], [0.62, -0.78], [0.72, -0.4], [0.7, 0.05], [0.62, 0.45], [0.48, 0.8], [0.3, 1.02], [0.12, 1.12], [0.02, 1.14]], null));
  g.add(cyl(0.12, 0.12, 0.35, 0, 1.28, 0, null)); // cystic duct
  const hot = [
    { id: "fundus", x: 0.5, y: -0.85, z: 0.15 },
    { id: "body", x: 0.55, y: -0.05, z: 0.15 },
    { id: "neck", x: 0.3, y: 0.95, z: 0.12 },
  ];
  return { g, hot, color: 0x8fbf7f };
}

function buildEsophagus() {
  const g = new THREE.Group();
  g.add(tube([[0.35, 1.9, 0], [0.2, 1.0, 0], [-0.15, 0.2, 0], [0.15, -0.6, 0], [0.35, -1.3, 0], [0.5, -1.9, 0]], 0.32, null, 32, 10));
  const hot = [
    { id: "cervical", x: 0.35, y: 1.55, z: 0.2 },
    { id: "thoracic", x: -0.05, y: 0.2, z: 0.22 },
    { id: "les", x: 0.42, y: -1.6, z: 0.2 },
  ];
  return { g, hot, color: 0xc98b7f };
}

function buildTongue() {
  const g = new THREE.Group();
  const shape = new THREE.Shape();
  shape.moveTo(-1.55, 0);
  shape.absarc(0, 0, 1.55, Math.PI * 0.5, -Math.PI * 0.5, true);
  shape.absarc(-0.1, 0, 1.25, -Math.PI * 0.5, Math.PI * 0.5, false);
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.45, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.1, bevelSegments: 3, curveSegments: 24 });
  geo.translate(0, 0, -0.25);
  geo.computeVertexNormals();
  const tongue = new THREE.Mesh(geo, null);
  tongue.rotation.x = -0.25; // slight upward tilt towards the tip
  g.add(tongue);
  const hot = [
    { id: "tip", x: 1.45, y: 0.35, z: 0.15 },
    { id: "dorsum", x: 0.25, y: 0.5, z: 0.2 },
    { id: "root", x: -1.45, y: 0.1, z: 0.1 },
  ];
  return { g, hot, color: 0xe29a8a };
}

function buildSpleen() {
  const g = new THREE.Group();
  g.add(sphere(1.0, 0.15, 0, 0, 1.35, 0.7, 0.45));
  g.add(cyl(0.16, 0.2, 0.5, -0.9, 0, 0.2, 0, 0.25)); // hilum hint
  const hot = [
    { id: "capsule", x: 1.15, y: 0.35, z: 0.2 },
    { id: "red-pulp", x: 0.2, y: -0.25, z: 0.3 },
    { id: "hilum", x: -1.0, y: 0.05, z: 0.3 },
  ];
  return { g, hot, color: 0xc2655f };
}

function buildThymus() {
  const g = new THREE.Group();
  g.add(sphere(0.75, -0.6, 0.15, 0, 1.0, 1.25, 0.6));
  g.add(sphere(0.75, 0.6, 0.15, 0, 1.0, 1.25, 0.6));
  g.add(sphere(0.4, 0, -0.15, 0, 1.0, 0.9, 0.6));
  const hot = [
    { id: "left-lobe", x: -1.05, y: 0.5, z: 0.15 },
    { id: "right-lobe", x: 1.05, y: 0.5, z: 0.15 },
    { id: "cortex", x: 0.35, y: -0.75, z: 0.2 },
  ];
  return { g, hot, color: 0xd8a7b1 };
}

function buildLymphNode() {
  const g = new THREE.Group();
  g.add(sphere(0.72, -0.28, 0, 0, 1.0, 1.05, 1.0));
  g.add(sphere(0.62, 0.38, -0.05, 0, 0.95, 0.85, 1.0));
  const hot = [
    { id: "capsule", x: -0.55, y: 0.45, z: 0.35 },
    { id: "cortex", x: 0.25, y: 0.2, z: 0.45 },
    { id: "hilum", x: 0.85, y: -0.2, z: 0.25 },
  ];
  return { g, hot, color: 0xc9a0b8 };
}

function buildThyroid() {
  const g = new THREE.Group();
  g.add(sphere(0.8, -0.95, 0.1, 0, 1.05, 1.3, 0.55));
  g.add(sphere(0.8, 0.95, 0.1, 0, 1.05, 1.3, 0.55));
  g.add(mesh(new THREE.BoxGeometry(1.35, 0.4, 0.5), null, 0, -0.25, 0.05, 0, 0, 0.25)); // isthmus
  const hot = [
    { id: "left-lobe", x: -1.45, y: 0.55, z: 0.15 },
    { id: "right-lobe", x: 1.45, y: 0.55, z: 0.15 },
    { id: "isthmus", x: 0.05, y: -0.35, z: 0.3 },
  ];
  return { g, hot, color: 0xc98bb8 };
}

function buildAdrenal() {
  const g = new THREE.Group();
  g.add(sphere(0.62, -0.85, 0.1, 0, 1.0, 0.85, 0.55)); // right gland
  g.add(sphere(0.68, 0.9, -0.05, 0, 0.9, 1.05, 0.55)); // left gland
  const hot = [
    { id: "right-gland", x: -1.15, y: 0.4, z: 0.15 },
    { id: "left-gland", x: 1.2, y: 0.55, z: 0.15 },
    { id: "medulla", x: 0.9, y: -0.25, z: 0.15 },
  ];
  return { g, hot, color: 0xc9a95f };
}

function buildPituitary() {
  const g = new THREE.Group();
  g.add(sphere(0.5, 0, -0.35, 0, 1.0, 0.95, 0.75));
  g.add(cyl(0.14, 0.18, 0.8, 0, 0.45, 0)); // infundibulum
  g.add(mesh(new THREE.BoxGeometry(1.5, 0.25, 1.0), null, 0, 0.95, 0)); // hypothalamus plate
  const hot = [
    { id: "anterior", x: 0.35, y: -0.3, z: 0.3 },
    { id: "posterior", x: -0.4, y: -0.3, z: 0.3 },
    { id: "stalk", x: 0, y: 0.55, z: 0.15 },
  ];
  return { g, hot, color: 0xb78cc9 };
}

function buildTrachea() {
  const g = new THREE.Group();
  g.add(cyl(0.52, 0.52, 3.0, 0, 0.1, 0));
  for (let i = 0; i < 9; i++) {
    g.add(mesh(new THREE.TorusGeometry(0.52, 0.09, 10, 24), null, 0, 1.35 - i * 0.33, 0, Math.PI / 2, 0));
  }
  // Carina: two short bronchi.
  g.add(cyl(0.3, 0.24, 0.7, -0.42, -1.4, 0.05, 0.5, 0));
  g.add(cyl(0.3, 0.24, 0.7, 0.42, -1.4, -0.05, -0.5, 0));
  const hot = [
    { id: "rings", x: 0.6, y: 0.75, z: 0.1 },
    { id: "carina", x: 0.35, y: -1.35, z: 0.2 },
    { id: "membranous", x: 0, y: 0.1, z: 0.55 },
  ];
  return { g, hot, color: 0xdd9f9b };
}

function buildLarynx() {
  const g = new THREE.Group();
  // Thyroid cartilage shield.
  const shape = new THREE.Shape();
  shape.moveTo(-0.6, -1.1);
  shape.lineTo(0.6, -1.1);
  shape.absarc(0, -0.45, 0.62, Math.PI * 1.05, -Math.PI * 0.05, false);
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.7, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.08, bevelSegments: 2 });
  geo.rotateY(Math.PI / 2);
  geo.translate(0, 0, -0.35);
  geo.computeVertexNormals();
  g.add(new THREE.Mesh(geo, null));
  // Epiglottis leaf.
  g.add(sphere(0.35, 0.15, 1.05, 0.1, 1.0, 0.75, 0.5));
  g.add(cyl(0.3, 0.34, 1.1, 0, -1.15, 0)); // trachea below
  const hot = [
    { id: "thyroid-cartilage", x: 0.05, y: 0.3, z: 0.55 },
    { id: "vocal-folds", x: 0.05, y: -0.35, z: 0.4 },
    { id: "epiglottis", x: 0.2, y: 1.15, z: 0.35 },
  ];
  return { g, hot, color: 0xd9b48f };
}

function buildBladder() {
  const g = new THREE.Group();
  g.add(sphere(1.05, 0, -0.15, 0, 1.0, 0.85, 1.0));
  g.add(cyl(0.16, 0.2, 1.1, -0.75, 1.15, 0.15, -0.35, 0)); // left ureter
  g.add(cyl(0.16, 0.2, 1.1, 0.75, 1.15, 0.15, -0.35, 0)); // right ureter
  g.add(cyl(0.16, 0.2, 0.8, 0, -1.5, 0)); // urethra
  const hot = [
    { id: "apex", x: 0.05, y: 0.85, z: 0.35 },
    { id: "body", x: -0.7, y: -0.1, z: 0.45 },
    { id: "trigone", x: 0.45, y: -0.55, z: 0.4 },
  ];
  return { g, hot, color: 0x8fb7c9 };
}

function buildUterus() {
  const g = new THREE.Group();
  g.add(lathe([[0.02, -1.3], [0.3, -1.25], [0.52, -1.05], [0.66, -0.7], [0.7, -0.25], [0.66, 0.25], [0.55, 0.7], [0.4, 1.05], [0.2, 1.3], [0.02, 1.35]], null));
  // Fallopian tubes (horns).
  g.add(cyl(0.09, 0.16, 0.9, -0.75, 1.25, 0.1, -0.6, 0.3));
  g.add(cyl(0.09, 0.16, 0.9, 0.75, 1.25, -0.1, -0.6, -0.3));
  const hot = [
    { id: "fundus", x: 0.05, y: 1.2, z: 0.3 },
    { id: "body", x: 0.5, y: 0.1, z: 0.3 },
    { id: "cervix", x: 0.2, y: -1.25, z: 0.25 },
  ];
  return { g, hot, color: 0xc98b9b };
}

function buildOvary() {
  const g = new THREE.Group();
  g.add(sphere(0.85, 0, 0, 0, 0.55, 1.0, 0.4));
  g.add(sphere(0.2, -0.3, 0.45, 0.1, 1, 1, 1)); // follicle bump
  g.add(sphere(0.16, 0.35, -0.35, 0.05, 1, 1, 1));
  const hot = [
    { id: "cortex", x: -0.3, y: 0.5, z: 0.25 },
    { id: "medulla", x: 0.15, y: -0.35, z: 0.15 },
    { id: "hilum", x: 0.45, y: 0.05, z: 0.3 },
  ];
  return { g, hot, color: 0xc99b8b };
}

function buildTestis() {
  const g = new THREE.Group();
  g.add(sphere(0.85, 0, 0, 0, 0.72, 1.0, 0.6));
  // Epididymis on the back.
  g.add(tube([[0.15, 0.75, -0.55], [-0.25, 0.6, -0.62], [-0.45, 0.2, -0.6], [-0.4, -0.4, -0.55], [-0.1, -0.7, -0.5]], 0.13, null, 24, 8));
  g.add(cyl(0.1, 0.1, 0.8, 0, 1.3, -0.1)); // ductus deferens stub
  const hot = [
    { id: "tunica", x: 0.5, y: 0.55, z: 0.35 },
    { id: "tubules", x: -0.15, y: -0.1, z: 0.45 },
    { id: "epididymis", x: -0.5, y: 0.25, z: -0.55 },
  ];
  return { g, hot, color: 0xd8a58f };
}

function buildProstate() {
  const g = new THREE.Group();
  g.add(lathe([[0.02, -0.85], [0.5, -0.8], [0.78, -0.55], [0.88, -0.15], [0.8, 0.25], [0.6, 0.55], [0.3, 0.75], [0.02, 0.8]], null));
  g.add(cyl(0.16, 0.2, 1.7, 0, 0.05, 0)); // urethra through it
  const hot = [
    { id: "peripheral", x: 0.65, y: -0.35, z: 0.3 },
    { id: "transition", x: 0.15, y: 0.05, z: 0.4 },
    { id: "capsule", x: 0.35, y: 0.6, z: 0.35 },
  ];
  return { g, hot, color: 0xb89bc9 };
}

function buildSpinalCord() {
  const g = new THREE.Group();
  g.add(cyl(0.4, 0.4, 3.4, 0, 0, 0));
  // Paired nerve roots.
  for (let i = 0; i < 5; i++) {
    const y = 1.35 - i * 0.6;
    g.add(cyl(0.1, 0.16, 0.5, -0.65, y, 0, 0, 0, -0.6));
    g.add(cyl(0.1, 0.16, 0.5, 0.65, y, 0, 0, 0, 0.6));
  }
  const hot = [
    { id: "grey", x: 0.05, y: 0.35, z: 0.42 },
    { id: "white", x: 0.42, y: -0.3, z: 0.3 },
    { id: "roots", x: 0.85, y: 0.85, z: 0.1 },
  ];
  return { g, hot, color: 0xd9cfb8 };
}

function buildDiaphragm() {
  const g = new THREE.Group();
  g.add(sphere(1.7, 0, -0.25, 0, 1.0, 0.42, 1.0)); // dome
  g.add(mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.16, 24), null, 0, 0.42, 0)); // central tendon
  const hot = [
    { id: "tendon", x: 0.05, y: 0.55, z: 0.35 },
    { id: "muscle", x: -0.95, y: -0.05, z: 0.6 },
    { id: "hiatus", x: 0.75, y: 0.15, z: 0.55 },
  ];
  return { g, hot, color: 0xc9655f };
}

function buildBiceps() {
  const g = new THREE.Group();
  // Shoulder origin at top; elbow insertion at bottom.
  g.add(sphere(0.5, -0.4, 1.3, 0, 0.85, 1.35, 0.7, 0, 0, 0.4)); // short head
  g.add(sphere(0.46, 0.4, 1.25, 0, 0.85, 1.3, 0.7, 0, 0, -0.4)); // long head
  g.add(cyl(0.18, 0.26, 1.3, 0, 0.55, 0)); // distal tendon
  g.add(cyl(0.12, 0.12, 0.8, -0.42, 1.6, 0.15, 0, 0, 0.3));
  g.add(cyl(0.12, 0.12, 0.8, 0.42, 1.6, -0.15, 0, 0, -0.3));
  const hot = [
    { id: "short-head", x: -0.7, y: 1.35, z: 0.3 },
    { id: "long-head", x: 0.7, y: 1.25, z: 0.25 },
    { id: "tendon", x: 0.1, y: -0.55, z: 0.25 },
  ];
  return { g, hot, color: 0xd9665f };
}

function buildFemur() {
  const g = new THREE.Group();
  g.add(cyl(0.24, 0.24, 2.4, 0, -0.15, 0)); // shaft
  g.add(sphere(0.55, 0.55, 1.25, 0.05, 1, 1, 1)); // head
  g.add(cyl(0.3, 0.32, 0.75, 0.42, 0.85, 0.05, 0, 0, 0.9)); // neck
  g.add(sphere(0.42, -0.25, 0.6, 0.3, 1, 1.1, 1)); // greater trochanter
  g.add(sphere(0.5, 0.32, -1.35, 0.05, 0.95, 1, 1)); // lateral condyle
  g.add(sphere(0.5, -0.32, -1.35, 0.05, 0.95, 1, 1)); // medial condyle
  const hot = [
    { id: "head", x: 0.75, y: 1.3, z: 0.25 },
    { id: "neck", x: 0.55, y: 0.8, z: 0.25 },
    { id: "shaft", x: 0.15, y: -0.1, z: 0.25 },
    { id: "condyles", x: 0.35, y: -1.35, z: 0.3 },
  ];
  return { g, hot, color: 0xd9c9a8 };
}

// ------------------------------------------------------------------- run

const builders = {
  stomach: buildStomach,
  gallbladder: buildGallbladder,
  esophagus: buildEsophagus,
  tongue: buildTongue,
  spleen: buildSpleen,
  thymus: buildThymus,
  "lymph-node": buildLymphNode,
  thyroid: buildThyroid,
  adrenal: buildAdrenal,
  pituitary: buildPituitary,
  trachea: buildTrachea,
  larynx: buildLarynx,
  bladder: buildBladder,
  uterus: buildUterus,
  ovary: buildOvary,
  testis: buildTestis,
  prostate: buildProstate,
  "spinal-cord": buildSpinalCord,
  diaphragm: buildDiaphragm,
  biceps: buildBiceps,
  femur: buildFemur,
};

const outDir = join(ROOT, "public", "models");
mkdirSync(outDir, { recursive: true });

const manifest = {};
for (const [id, build] of Object.entries(builders)) {
  const { g, hot, color } = build();
  const { group, hotspots } = finalize(g, hot, color);
  const buffer = await exporter.parseAsync(group, { binary: true });
  writeFileSync(join(outDir, `${id}.glb`), Buffer.from(buffer));
  manifest[id] = hotspots;
  console.log(id, "->", hotspots.map((h) => `${h.id}@[${h.position.join(",")}]`).join(" "));
}
writeFileSync(join(ROOT, "scripts", "organs-hotspots.json"), JSON.stringify(manifest, null, 2));
console.log("Wrote", Object.keys(manifest).length, "models to", outDir);
