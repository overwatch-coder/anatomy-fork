import puppeteer from "puppeteer-core";
import http from "http";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { extraOrgans } from "../app/lib/organs-extra.ts";

const mimes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".glb": "model/gltf-binary",
  ".json": "application/json"
};

// HTML renderer page template
const renderHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      margin: 0;
      background: #faf7f2;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 720px;
      height: 720px;
      overflow: hidden;
    }
    #stage {
      position: relative;
      width: 720px;
      height: 720px;
    }
    canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 720px;
      height: 720px;
    }
  </style>
</head>
<body>
<div id="stage"></div>
<script type="importmap">
{
  "imports": {
    "three": "/node_modules/three/build/three.module.js",
    "three/examples/jsm/loaders/GLTFLoader.js": "/node_modules/three/examples/jsm/loaders/GLTFLoader.js",
    "three/examples/jsm/libs/meshopt_decoder.module.js": "/node_modules/three/examples/jsm/libs/meshopt_decoder.module.js"
  }
}
</script>
<script type="module">
  import * as THREE from "three";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
  import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

  const stage = document.getElementById("stage");
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0.15, 7.2);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setSize(720, 720);
  renderer.setPixelRatio(1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  stage.appendChild(renderer.domElement);

  // Gallery studio lighting
  const ambient = new THREE.AmbientLight(0xfff5ea, 1.8);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xffeedd, 2.0);
  keyLight.position.set(4, 5, 5);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xddeeff, 1.2);
  fillLight.position.set(-4, -2, 4);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xffdfc4, 1.4);
  rimLight.position.set(0, 4, -4);
  scene.add(rimLight);

  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);

  let currentModel = null;

  window.renderOrgan = function(modelUrl, accentColor) {
    return new Promise((resolve, reject) => {
      stage.style.background = \`radial-gradient(circle at 48% 48%, color-mix(in srgb, \${accentColor}, white 60%) 0%, color-mix(in srgb, \${accentColor}, white 88%) 42%, #faf7f2 72%)\`;

      if (currentModel) {
        scene.remove(currentModel);
        currentModel = null;
      }

      loader.load(modelUrl, (gltf) => {
        currentModel = gltf.scene;
        const box = new THREE.Box3().setFromObject(currentModel);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const scale = 3.8 / Math.max(size.x, size.y, size.z, 0.001);
        currentModel.scale.setScalar(scale);
        currentModel.position.copy(center.multiplyScalar(-scale));
        scene.add(currentModel);

        renderer.render(scene, camera);
        resolve(renderer.domElement.toDataURL("image/png"));
      }, undefined, reject);
    });
  };

  window.INIT_DONE = true;
</script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  const urlPath = req.url.split("?")[0];
  if (urlPath === "/renderer.html") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(renderHtml);
    return;
  }

  let p = path.join(".", urlPath);
  if (!fs.existsSync(p)) p = path.join("public", urlPath);
  if (fs.existsSync(p) && fs.statSync(p).isFile()) {
    const ext = path.extname(p);
    res.writeHead(200, { "Content-Type": mimes[ext] || "application/octet-stream" });
    fs.createReadStream(p).pipe(res);
  } else {
    res.writeHead(404);
    res.end();
  }
});

const PORT = 4588;
server.listen(PORT, async () => {
  console.log(`Server listening on ${PORT}`);

  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--use-gl=angle"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 720, height: 720, deviceScaleFactor: 1 });
  await page.goto(`http://localhost:${PORT}/renderer.html`);
  await page.waitForFunction(() => window.INIT_DONE === true);

  console.log("Renderer ready in Chrome! Rendering organs...");

  for (const organ of extraOrgans) {
    // If stomach already has custom illustration, skip re-rendering unless missing
    const outDir = path.join("public", "anatomy", organ.id);
    fs.mkdirSync(outDir, { recursive: true });
    const thumbPath = path.join(outDir, "thumb.webp");
    const organPath = path.join(outDir, "organ.webp");

    if (organ.id === "stomach" && fs.existsSync(thumbPath)) {
      console.log(`Stomach already has watercolor art, skipping.`);
      continue;
    }

    const modelUrl = organ.model;
    console.log(`Rendering ${organ.id} from ${modelUrl}...`);

    try {
      const dataUrl = await page.evaluate(
        (url, accent) => window.renderOrgan(url, accent),
        modelUrl,
        organ.accent
      );

      const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
      const pngBuffer = Buffer.from(base64Data, "base64");

      // Save 720x720 organ.webp and 180x180 thumb.webp
      await sharp(pngBuffer)
        .resize(720, 720)
        .webp({ quality: 85 })
        .toFile(organPath);

      await sharp(pngBuffer)
        .resize(180, 180)
        .webp({ quality: 85 })
        .toFile(thumbPath);

      console.log(`✔ Finished ${organ.id}: thumb.webp & organ.webp generated.`);
    } catch (err) {
      console.error(`Failed ${organ.id}:`, err);
    }
  }

  await browser.close();
  server.close();
  console.log("ALL THUMBNAILS AND ORGAN ART RENDERED SUCCESSFULLY!");
  process.exit(0);
});
