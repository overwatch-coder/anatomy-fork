import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import type { Hotspot } from "../../i18n/merge";
import { AnatomyAssetManager, FIT_SIZE, type LoadedOrgan } from "./loaders";
import { HotspotLayer } from "./hotspots";

type ViewerCallbacks = {
  onLoading: (loading: boolean, progress: number) => void;
  onSelect: (hotspot: Hotspot | null) => void;
  /** Quiz mode: every dot press is reported, with no selection toggling. */
  onPick?: (hotspot: Hotspot) => void;
  /** Authoring mode: a point on the mesh surface, in pivot space. */
  onAuthorPoint?: (point: { x: number; y: number; z: number }) => void;
};

/** Which way the cutting plane faces, in the organ's own space. */
export type SectionAxis = "sagittal" | "coronal" | "axial" | "free";

const DOT_PIXELS = 34;
const CAMERA_FOV = 34;
const DEPTH_PREPASS = "depth-prepass";
/**
 * Anatomical planes, as normals in organ space. Each points along the
 * direction the discarded half lies in, so the default cut opens towards a
 * viewer at the home camera rather than presenting its intact back.
 */
const SECTION_NORMALS: Record<Exclude<SectionAxis, "free">, [number, number, number]> = {
  sagittal: [-1, 0, 0],
  coronal: [0, 0, -1],
  axial: [0, -1, 0],
};
/** Depth at which the specimen is still whole — one end of the slider. */
const SECTION_OPEN = -1;
/**
 * How much of the specimen's half-extent the slider actually spans. Held under
 * 1 so the ends of the travel still leave anatomy on screen instead of an empty
 * frame that reads as a broken tool.
 */
const SECTION_TRAVEL = 0.92;
/** Gap between the underside of the specimen and its contact shadow. */
const SHADOW_DROP = 0.16;
const SHADOW_OPACITY = 0.62;
/** Studio dressing level while Isolate is on: present, but out of the way. */
const ISOLATED_DRESSING = 0.12;
/** The specimen floats free, so the camera sits nearly level with it — there is
 *  no longer a plinth that needs to read as a disc rather than an edge-on band. */
const HOME_CAMERA = { x: 0, y: 0.3, z: 8.2 };
const HOME_TARGET = { x: 0, y: 0.02, z: 0 };

export class AnatomyViewer {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(CAMERA_FOV, 1, 0.1, 100);
  private controls: OrbitControls;
  private assets: AnatomyAssetManager;
  private hotspots = new HotspotLayer();
  private callbacks: ViewerCallbacks;
  private container: HTMLElement;
  private organ: LoadedOrgan | null = null;
  private contactShadow!: THREE.Mesh;
  private particles!: THREE.Points;
  private glow!: THREE.PointLight;

  private frame = 0;
  private clock = new THREE.Clock();
  private resizeObserver: ResizeObserver;
  private intersectionObserver: IntersectionObserver;
  /**
   * The cut, held in the organ's own space — which is what makes "sagittal"
   * mean sagittal. `clipPlane` is this plane pushed out to world space, because
   * that is the only space three.js will clip in.
   */
  private localPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0);
  private clipPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0);
  private sectionAxis: SectionAxis = "free";
  /** Where the user has parked the plane, -1 (whole) to 1 (fully cut away). */
  private sectionDepth = 0;
  private sectionFlip = false;
  /** What is actually on screen — sweeps to `sectionDepth` when the tool opens. */
  private sweep = { depth: SECTION_OPEN };
  /** Camera direction captured in organ space when "free" is chosen. */
  private freeNormal = new THREE.Vector3(0, 0, -1);
  /**
   * A ghost of the cutting plane — a tinted pane with an outlined rim — so the
   * cut reads as a tool with an orientation rather than a mystery bite. Held in
   * organ space via `helperPose` and pushed to world alongside the clip plane.
   */
  private sectionHelper!: THREE.Group;
  private sectionHelperFill!: THREE.MeshBasicMaterial;
  private sectionHelperRim!: THREE.LineBasicMaterial;
  /** Whether the user wants the plane drawn while the tool is open. */
  private sectionPlaneShown = true;
  private readonly helperPose = new THREE.Matrix4();
  private readonly helperPosition = new THREE.Vector3();
  private readonly helperQuaternion = new THREE.Quaternion();
  private readonly helperScale = new THREE.Vector3();
  private static readonly PLANE_FORWARD = new THREE.Vector3(0, 0, 1);
  private readonly boundsCenter = new THREE.Vector3();
  private readonly boundsHalf = new THREE.Vector3();
  private readonly planeNormal = new THREE.Vector3();
  /**
   * Writes depth only — used to resolve a fading organ to one surface.
   * Double-sided so that a cut organ still lays down depth for the interior
   * surfaces its clipped-away front faces would otherwise have covered.
   */
  private depthMaterial = new THREE.MeshBasicMaterial({
    colorWrite: false,
    depthWrite: true,
    depthTest: true,
    side: THREE.DoubleSide,
  });
  private crossSection = false;
  private isolated = false;
  private wireframe = false;

  /** Y of the contact shadow plane, re-derived from each organ's footprint. */
  private shadowY = -2.1;
  /** Facing fade of the shadow, 0 once the camera drops to its plane. */
  private shadowFade = 1;
  /** Studio dressing level: 1 normally, near-0 while Isolate is on. */
  private dressing = { value: 1 };

  private width = 1;
  private quizMode = false;
  private authoring = false;
  private authorRaycaster = new THREE.Raycaster();

  /** Procedural function animation (heartbeat, breathing, peristalsis…). */
  private functionAnimation = false;
  private animationTime = 0;
  private animationKey: string | null = null;

  private height = 1;
  private isVisible = true;
  private isPageVisible = true;

  // Render-on-demand bookkeeping: the loop only draws when something moved.
  private dirty = true;
  private busyUntil = 0;
  private loadRequest = 0;

  private basePixelRatio: number;

  private autoRotateWanted = true;
  private interactionUntil = 0;
  private selectedId: string | null = null;
  private hoveredId: string | null = null;
  private hoverProbe: { x: number; y: number } | null = null;
  private pointerId: number | null = null;
  private pointerStart = { x: 0, y: 0 };
  private dragged = false;
  private calloutEl: HTMLElement | null = null;
  private fadeTween: gsap.core.Tween | null = null;
  private disposed = false;

  constructor(container: HTMLElement, callbacks: ViewerCallbacks) {
    this.container = container;
    this.callbacks = callbacks;

    const lowPower = window.matchMedia("(max-width: 780px)").matches || (navigator.hardwareConcurrency ?? 8) < 6;
    // Fixed, decided once. A dynamic controller used to live here and it was a
    // net negative: frame *intervals* are vsync-quantised, so a brief hitch read
    // as GPU load, dropped the buffer, and — because a vsync-locked 16.7ms never
    // met the step-up threshold — never recovered. The scene renders in ~2ms, so
    // there is nothing to adapt away from.
    this.basePixelRatio = Math.min(window.devicePixelRatio, lowPower ? 1.5 : 2);

    this.renderer = new THREE.WebGLRenderer({
      antialias: !lowPower,
      alpha: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: true,
    });
    this.renderer.setPixelRatio(this.basePixelRatio);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.02;
    // Shadow mapping would render every organ twice per frame; a baked contact
    // shadow gives the same read for free.
    this.renderer.shadowMap.enabled = false;
    this.renderer.localClippingEnabled = true;
    this.renderer.domElement.setAttribute(
      "aria-label",
      "Interactive 3D anatomy model. Drag to rotate, scroll to zoom, and click a dot to read about that structure.",
    );
    this.renderer.domElement.tabIndex = 0;
    container.appendChild(this.renderer.domElement);

    this.camera.position.set(HOME_CAMERA.x, HOME_CAMERA.y, HOME_CAMERA.z);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.055;
    this.controls.enablePan = false;
    this.controls.minDistance = 4.8;
    this.controls.maxDistance = 12;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.65;
    this.controls.target.set(HOME_TARGET.x, HOME_TARGET.y, HOME_TARGET.z);

    this.assets = new AnatomyAssetManager(this.renderer);
    this.buildEnvironment();
    this.buildSectionHelper();

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        this.isVisible = entry.isIntersecting;
        if (this.isVisible) this.dirty = true;
      },
      { rootMargin: "120px" },
    );
    this.intersectionObserver.observe(container);

    document.addEventListener("visibilitychange", this.onVisibilityChange);
    this.controls.addEventListener("start", this.onControlStart);
    const canvas = this.renderer.domElement;
    canvas.addEventListener("pointerdown", this.onPointerDown);
    canvas.addEventListener("pointermove", this.onPointerMove);
    canvas.addEventListener("pointerup", this.onPointerUp);
    canvas.addEventListener("pointerleave", this.onPointerLeave);
    canvas.addEventListener("keydown", this.onKeyDown);

    this.resize();
    this.animate();
  }

  // ---------------------------------------------------------------- scene

  private buildEnvironment() {
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.42));
    this.scene.add(new THREE.HemisphereLight(0xfff8ee, 0x33252d, 0.72));

    const key = new THREE.DirectionalLight(0xfff3e7, 3.5);
    key.position.set(4.8, 6.5, 6.8);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xe6ecff, 1.12);
    fill.position.set(-4.5, 1.2, 5.2);
    this.scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffb7a5, 1.6);
    rim.position.set(-4, 3.5, -5.5);
    this.scene.add(rim);
    const warm = new THREE.PointLight(0xff8d70, 0.72, 11, 2);
    warm.position.set(-3, -1.4, 3.5);
    this.scene.add(warm);
    this.glow = new THREE.PointLight(0xee7c6a, 0.5, 8, 2);
    this.glow.name = "organ-glow";
    this.glow.position.set(2.8, 0.4, 2.8);
    this.scene.add(this.glow);

    this.scene.environment = this.buildEnvironmentMap();

    // The specimen floats: a solid plinth used to sit here, and it walled off
    // the underside of every organ from a full 360° orbit. What is left is a
    // soft shadow disc that grounds the organ from ordinary viewing angles and
    // fades out before the camera can pass through it.
    this.contactShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(4.2, 4.2),
      new THREE.MeshBasicMaterial({
        map: contactShadowTexture(),
        transparent: true,
        depthWrite: false,
        opacity: SHADOW_OPACITY,
        toneMapped: false,
      }),
    );
    this.contactShadow.rotation.x = -Math.PI / 2;
    this.contactShadow.position.y = this.shadowY;
    this.contactShadow.renderOrder = 1;
    this.scene.add(this.contactShadow);

    const positions = new Float32Array(48 * 3);
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 9;
      positions[i + 1] = (Math.random() - 0.5) * 6;
      positions[i + 2] = (Math.random() - 0.5) * 5 - 2;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    this.particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: 0xe7a18e, size: 0.013, transparent: true, opacity: 0.16 }),
    );
    this.scene.add(this.particles);
  }

  /** A tiny warm-to-cool gradient probe: better material response than a bare
   *  light rig, and it costs one PMREM bake instead of per-frame work. */
  private buildEnvironmentMap() {
    const width = 16;
    const height = 32;
    const data = new Uint8Array(width * height * 4);
    const top = new THREE.Color(0xfff3e4);
    const bottom = new THREE.Color(0x6b4f45);
    const mixed = new THREE.Color();
    for (let y = 0; y < height; y += 1) {
      mixed.copy(bottom).lerp(top, Math.pow(1 - y / (height - 1), 0.7));
      for (let x = 0; x < width; x += 1) {
        const i = (y * width + x) * 4;
        data[i] = mixed.r * 255;
        data[i + 1] = mixed.g * 255;
        data[i + 2] = mixed.b * 255;
        data[i + 3] = 255;
      }
    }
    const source = new THREE.DataTexture(data, width, height);
    source.mapping = THREE.EquirectangularReflectionMapping;
    source.colorSpace = THREE.SRGBColorSpace;
    source.needsUpdate = true;

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const environment = pmrem.fromEquirectangular(source).texture;
    pmrem.dispose();
    source.dispose();
    return environment;
  }

  /**
   * A unit quad, posed and scaled per organ by `helperPose`. The fill is nearly
   * transparent so the anatomy behind it stays legible; the rim carries the
   * orientation. Neither material clips, so the pane spans the whole cut even
   * where the specimen has been carved away.
   */
  private buildSectionHelper() {
    const geometry = new THREE.PlaneGeometry(1, 1);
    this.sectionHelperFill = new THREE.MeshBasicMaterial({
      color: 0xee7c6a,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      depthWrite: false,
      toneMapped: false,
    });
    this.sectionHelperRim = new THREE.LineBasicMaterial({
      color: 0xee7c6a,
      transparent: true,
      opacity: 0.55,
      toneMapped: false,
    });
    this.sectionHelper = new THREE.Group();
    this.sectionHelper.add(new THREE.Mesh(geometry, this.sectionHelperFill));
    this.sectionHelper.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry), this.sectionHelperRim));
    // Posed straight from the organ's world matrix — local maths stays local.
    this.sectionHelper.matrixAutoUpdate = false;
    this.sectionHelper.visible = false;
    this.sectionHelper.renderOrder = 2;
    this.scene.add(this.sectionHelper);
  }

  // ---------------------------------------------------------------- organs

  prefetch(url: string) {
    this.assets.prefetch(url);
  }

  async setOrgan(modelUrl: string, hotspots: Hotspot[], accent: string, animationKey: string | null = null) {
    this.animationKey = animationKey;
    this.animationTime = 0;
    const request = ++this.loadRequest;
    this.select(null);
    this.callbacks.onLoading(true, 0);

    const outgoing = this.organ;
    if (outgoing) {
      // Switching mid-fade would otherwise leave the tween running and the
      // depth proxies attached to a released organ.
      this.fadeTween?.kill();
      this.fadeTween = null;
      this.setDepthPrepass(outgoing, false);
      this.hotspots.clear();
    this.quizMode = false;
    this.authoring = false;
    this.hotspots.clearFlash();
    this.setFunctionAnimation(false);
      this.busy(0.8);
      await gsap.to(outgoing.pivot.scale, {
        x: 0.72, y: 0.72, z: 0.72,
        duration: 0.34,
        ease: "power2.in",
        onUpdate: () => (this.dirty = true),
      });
      this.assets.release(outgoing);
      this.organ = null;
      // Nothing left to cut — the pane comes back with the next organ's clip.
      this.sectionHelper.visible = false;
      this.dirty = true;
    }

    this.tween(this.camera.position, { z: 9.2, duration: 0.42, ease: "power2.inOut" });

    let organ: LoadedOrgan;
    try {
      organ = await this.assets.load(modelUrl, (progress) => {
        if (request === this.loadRequest) this.callbacks.onLoading(true, progress);
      });
    } catch (error) {
      if (request === this.loadRequest) this.callbacks.onLoading(false, 0);
      throw error;
    }
    if (request !== this.loadRequest || this.disposed) return;

    this.organ = organ;
    organ.pivot.scale.setScalar(1);
    organ.pivot.position.set(0, 0, 0);
    this.scene.add(organ.pivot);
    organ.pivot.updateWorldMatrix(true, true);

    // Measured before the dots are parented in, so their billboards cannot
    // inflate the box the shadow is placed against.
    this.anchorContactShadow(organ);

    // Anchor the dots while the organ is still invisible, then play the intro.
    this.hotspots.attach(organ.pivot, hotspots, organ.meshes);
    this.hotspots.setPixelSize(DOT_PIXELS, this.height, CAMERA_FOV);
    // Tools are viewer state, not organ state — carry them onto the new organ.
    // The plane is re-derived because travel is measured per organ.
    if (this.crossSection) {
      this.updateSectionPlane();
      this.applyClipping(true);
    }
    if (this.wireframe) this.applyWireframe();

    this.glow.color.set(accent);
    this.sectionHelperFill.color.set(accent);
    this.sectionHelperRim.color.set(accent);

    organ.pivot.scale.setScalar(0.58);
    organ.pivot.position.z = -1.3;
    this.busy(1.4);
    this.fade(organ, 1, 0.72);
    // The organ is on screen from here on, so the load is over as far as the UI
    // is concerned — the intro animation should play in the open, not behind a
    // loading panel.
    this.callbacks.onLoading(false, 1);
    gsap.timeline({ onUpdate: () => (this.dirty = true) })
      .to(organ.pivot.scale, { x: 1, y: 1, z: 1, duration: 0.9, ease: "back.out(1.25)" }, 0)
      .to(organ.pivot.position, { z: 0, duration: 0.85, ease: "power3.out" }, 0)
      .to(this.camera.position, { z: 8.2, duration: 0.9, ease: "power2.out" }, 0.08);
  }

  /**
   * Drops the shadow just under the specimen. Organs are normalised into a
   * FIT_SIZE cube by their longest axis, so a flat organ like the skin sits far
   * shallower than the eyeball — a fixed height would leave its shadow adrift.
   * Measured at full scale, before the intro animation shrinks the pivot.
   */
  private anchorContactShadow(organ: LoadedOrgan) {
    const bounds = new THREE.Box3().setFromObject(organ.pivot);
    if (bounds.isEmpty()) return;
    this.shadowY = bounds.min.y - SHADOW_DROP;
    this.contactShadow.position.y = this.shadowY;
    this.dirty = true;
  }

  /**
   * Fades the shadow out as the camera drops towards its plane. Without this,
   * orbiting under the organ — the whole point of removing the plinth — would
   * put a dark disc between the viewer and the specimen.
   */
  private updateContactShadow() {
    const fade = THREE.MathUtils.smoothstep(this.camera.position.y - this.shadowY, 0.25, 1.7);
    if (Math.abs(fade - this.shadowFade) < 0.002) return false;
    this.shadowFade = fade;
    this.applyDressing();
    return true;
  }

  /** Applies the Isolate level (and the shadow's facing fade) to everything in
   *  the scene that is staging rather than specimen. */
  private applyDressing() {
    const shadow = this.contactShadow.material as THREE.MeshBasicMaterial;
    shadow.opacity = SHADOW_OPACITY * this.shadowFade * this.dressing.value;
    this.contactShadow.visible = shadow.opacity > 0.004;
    (this.particles.material as THREE.PointsMaterial).opacity = 0.16 * this.dressing.value;
    this.glow.intensity = 0.5 * this.dressing.value;
  }

  private materials(organ: LoadedOrgan) {
    const list: THREE.Material[] = [];
    organ.meshes.forEach((mesh) => {
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((material) => list.includes(material) || list.push(material));
    });
    return list;
  }

  /**
   * Fades an organ in. Depth writing stays ON throughout: these are solid,
   * closed meshes, and letting them blend in draw order instead of depth order
   * makes the far side and interior show through the front for the length of
   * the tween. A depth prepass keeps the result identical to the opaque pass —
   * only the nearest surface is ever shaded.
   */
  private fade(organ: LoadedOrgan, to: number, duration: number) {
    const materials = this.materials(organ);
    const state = { value: to >= 1 ? 0 : 1 };
    materials.forEach((material) => {
      material.transparent = true;
      material.opacity = state.value;
      material.depthWrite = true;
    });
    this.setDepthPrepass(organ, true);
    this.busy(duration + 0.1);
    this.fadeTween = gsap.to(state, {
      value: to,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        materials.forEach((material) => (material.opacity = state.value));
        this.dirty = true;
      },
      onComplete: () => {
        if (to >= 1) {
          materials.forEach((material) => {
            material.transparent = false;
            material.opacity = 1;
            material.depthWrite = true;
          });
        }
        this.setDepthPrepass(organ, false);
        this.fadeTween = null;
        this.dirty = true;
      },
    });
  }

  /**
   * Lays down depth for the organ before it is shaded, so a partly transparent
   * mesh still resolves to a single nearest surface per pixel. The proxy is
   * parented to the mesh it mirrors, so it inherits the intro animation for
   * free. Opaque, therefore drawn before anything transparent. Alive only while
   * an organ fades; it costs one depth-only pass over ~120k triangles.
   */
  private setDepthPrepass(organ: LoadedOrgan, enabled: boolean) {
    organ.meshes.forEach((mesh) => {
      const existing = mesh.children.find((child) => child.name === DEPTH_PREPASS);
      if (!enabled) {
        existing?.removeFromParent();
        return;
      }
      if (existing) return;
      const proxy = new THREE.Mesh(mesh.geometry, this.depthMaterial);
      proxy.name = DEPTH_PREPASS;
      proxy.frustumCulled = mesh.frustumCulled;
      mesh.add(proxy);
    });
  }

  // ---------------------------------------------------------------- loop

  private animate = () => {
    this.frame = requestAnimationFrame(this.animate);
    if (!this.isVisible || !this.isPageVisible) return;

    const delta = Math.min(this.clock.getDelta(), 0.05);
    const now = performance.now();

    this.applyAutoRotate(now);
    if (this.controls.update(delta)) this.dirty = true;
    if (this.updateContactShadow()) this.dirty = true;
    // The pivot moves under the intro and reset tweens, and the cut is anchored
    // to the organ rather than the world, so the world plane is re-derived.
    if (this.crossSection) this.syncWorldPlane();
    if (this.assets.hasAnimation) {
      this.assets.update(delta);
      this.dirty = true;
    }
    if (this.functionAnimation) this.applyFunctionAnimation(delta);
    if (this.hoverProbe) this.resolveHover();
    if (!this.dirty && now >= this.busyUntil) return;

    const clip = this.crossSection ? this.localPlane : null;
    if (!this.hotspots.update(this.camera, delta, this.selectedId, this.hoveredId, clip)) this.dirty = true;
    else this.dirty = false;
    if (now < this.busyUntil) this.dirty = true;

    this.positionCallout();
    this.renderer.render(this.scene, this.camera);
  };

  private busy(seconds: number) {
    this.busyUntil = Math.max(this.busyUntil, performance.now() + seconds * 1000);
    this.dirty = true;
  }

  private tween(target: object, vars: gsap.TweenVars) {
    this.busy((vars.duration as number) ?? 0.5);
    return gsap.to(target, { ...vars, onUpdate: () => (this.dirty = true) });
  }

  private applyAutoRotate(now: number) {
    // Opening a cut turns rotation off through the normal control rather than
    // overriding it here, so the toggle never claims to be on while nothing
    // moves — and someone who does want to turn a sectioned specimen can.
    this.controls.autoRotate = this.autoRotateWanted && !this.selectedId && now >= this.interactionUntil;
  }

  private onVisibilityChange = () => {
    this.isPageVisible = !document.hidden;
    if (this.isPageVisible) {
      this.clock.start();
      this.dirty = true;
    }
  };

  private resize() {
    this.width = Math.max(this.container.clientWidth, 1);
    this.height = Math.max(this.container.clientHeight, 1);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height, false);
    this.hotspots.setPixelSize(DOT_PIXELS, this.height, CAMERA_FOV);
    this.dirty = true;
  }

  // ---------------------------------------------------------------- input

  private onControlStart = () => {
    this.interactionUntil = performance.now() + 3000;
    this.dirty = true;
  };

  private onPointerDown = (event: PointerEvent) => {
    this.pointerId = event.pointerId;
    this.pointerStart = { x: event.clientX, y: event.clientY };
    this.dragged = false;
  };

  private onPointerMove = (event: PointerEvent) => {
    if (this.pointerId !== null) {
      if (Math.hypot(event.clientX - this.pointerStart.x, event.clientY - this.pointerStart.y) > 5) this.dragged = true;
      return;
    }
    this.hoverProbe = { x: event.offsetX, y: event.offsetY };
    this.dirty = true;
  };

  private onPointerUp = (event: PointerEvent) => {
    const wasDragging = this.dragged;
    this.pointerId = null;
    this.dragged = false;
    if (wasDragging) return;
    // Authoring takes precedence: it wants a point on the mesh, not a marker.
    if (this.authoring) {
      this.captureAuthorPoint(event.offsetX, event.offsetY);
      return;
    }

    const marker = this.hotspots.pick(event.offsetX, event.offsetY, this.camera, this.width, this.height);
    if (this.quizMode) {
      // Every press counts as an answer, so no toggling and no sticky selection.
      if (marker) this.callbacks.onPick?.(marker.hotspot);
      return;
    }
    this.select(marker && marker.hotspot.id !== this.selectedId ? marker.hotspot.id : null);
  };

  private onPointerLeave = () => {
    this.pointerId = null;
    this.hoverProbe = null;
    if (this.hoveredId) {
      this.hoveredId = null;
      this.dirty = true;
    }
  };

  private resolveHover() {
    const probe = this.hoverProbe;
    this.hoverProbe = null;
    if (!probe) return;
    const marker = this.hotspots.pick(probe.x, probe.y, this.camera, this.width, this.height);
    const id = marker?.hotspot.id ?? null;
    if (id === this.hoveredId) return;
    this.hoveredId = id;
    this.renderer.domElement.style.cursor = id ? "pointer" : "";
    this.dirty = true;
  }

  private select(id: string | null) {
    if (this.selectedId === id) return;
    this.selectedId = id;
    this.busy(0.4);
    const marker = this.hotspots.list.find((item) => item.hotspot.id === id);
    this.callbacks.onSelect(marker?.hotspot ?? null);
  }

  clearSelection() {
    this.select(null);
  }

  /** The callout is positioned imperatively so tracking a spinning model never
   *  triggers a React render. */
  attachCallout(element: HTMLElement | null) {
    this.calloutEl = element;
    this.positionCallout();
    this.dirty = true;
  }

  private positionCallout() {
    if (!this.calloutEl || !this.selectedId) return;
    const point = this.hotspots.screenPosition(this.selectedId, this.camera, this.width, this.height);
    if (!point) return;
    this.calloutEl.style.transform = `translate3d(${Math.round(point.x)}px, ${Math.round(point.y)}px, 0)`;
    this.calloutEl.dataset.side = point.x > this.width * 0.6 ? "left" : "right";
    this.calloutEl.dataset.behind = point.opacity < 0.3 ? "true" : "false";
  }

  private onKeyDown = (event: KeyboardEvent) => {
    const pivot = this.organ?.pivot;
    if (event.key === "ArrowLeft" && pivot) pivot.rotation.y -= 0.08;
    if (event.key === "ArrowRight" && pivot) pivot.rotation.y += 0.08;
    if (event.key === "+") this.camera.position.z = Math.max(4.8, this.camera.position.z - 0.35);
    if (event.key === "-") this.camera.position.z = Math.min(12, this.camera.position.z + 0.35);
    if (event.key === "Escape") this.select(null);
    this.dirty = true;
  };

  // ---------------------------------------------------------------- tools

  setAutoRotate(enabled: boolean) {
    this.autoRotateWanted = enabled;
    if (enabled) this.interactionUntil = 0;
    this.dirty = true;
  }

  /** Returns the viewer to its home framing *and* clears every tool, so the
   *  toolbar can never disagree with what is on screen. */
  reset() {
    this.select(null);
    this.setIsolate(false);
    this.setCrossSection(false);
    this.setWireframe(false);
    this.sectionAxis = "free";
    this.sectionDepth = 0;
    this.sectionFlip = false;
    this.sectionPlaneShown = true;
    this.tween(this.camera.position, { ...HOME_CAMERA, duration: 0.8, ease: "power3.out" });
    this.tween(this.controls.target, { ...HOME_TARGET, duration: 0.8, ease: "power3.out" });
    if (this.organ) this.tween(this.organ.pivot.rotation, { x: 0.05, y: -0.28, z: 0, duration: 0.8, ease: "power3.out" });
  }

  zoom(direction: 1 | -1) {
    this.tween(this.camera.position, {
      z: THREE.MathUtils.clamp(this.camera.position.z + direction * 1.2, 4.8, 12),
      duration: 0.5,
      ease: "power2.out",
    });
  }

  toggleIsolate() {
    return this.setIsolate(!this.isolated);
  }

  /** Isolate strips the staging — shadow, drifting particles, accent glow —
   *  down to almost nothing, leaving the specimen alone in the frame. */
  setIsolate(enabled: boolean) {
    if (this.isolated === enabled) return this.isolated;
    this.isolated = enabled;
    gsap.killTweensOf(this.dressing);
    this.busy(0.5);
    gsap.to(this.dressing, {
      value: enabled ? ISOLATED_DRESSING : 1,
      duration: 0.45,
      ease: "power2.out",
      onUpdate: () => {
        this.applyDressing();
        this.dirty = true;
      },
    });
    return this.isolated;
  }

  toggleCrossSection() {
    return this.setCrossSection(!this.crossSection);
  }

  /**
   * Sweeps the cutting plane through the specimen. Enabling starts from whole
   * and wipes in to wherever the depth control is parked; disabling wipes back
   * out and only then drops the planes, so the organ never snaps back together.
   */
  setCrossSection(enabled: boolean) {
    if (this.crossSection === enabled) return this.crossSection;
    this.crossSection = enabled;
    gsap.killTweensOf(this.sweep);
    if (enabled) {
      if (this.sectionAxis === "free") this.captureFreeNormal();
      this.sweep.depth = SECTION_OPEN;
      this.updateSectionPlane();
      this.applyClipping(true);
    }
    gsap.to(this.sweep, {
      depth: enabled ? this.sectionDepth : SECTION_OPEN,
      duration: 0.85,
      ease: "power2.inOut",
      onUpdate: () => this.updateSectionPlane(),
      onComplete: () => {
        if (!this.crossSection) this.applyClipping(false);
        this.dirty = true;
      },
    });
    this.busy(0.95);
    return this.crossSection;
  }

  /** Sagittal, coronal, axial — or a plane square to how you are looking now. */
  setSectionAxis(axis: SectionAxis) {
    if (this.sectionAxis === axis && axis !== "free") return;
    this.sectionAxis = axis;
    if (axis === "free") this.captureFreeNormal();
    this.updateSectionPlane();
    this.busy(0.2);
  }

  /** -1 leaves the specimen whole, 0 halves it, 1 takes almost all of it. */
  setSectionDepth(depth: number) {
    this.sectionDepth = THREE.MathUtils.clamp(depth, -1, 1);
    if (!this.crossSection) return;
    // Direct, not tweened: a slider that lags behind the thumb feels broken.
    gsap.killTweensOf(this.sweep);
    this.sweep.depth = this.sectionDepth;
    this.updateSectionPlane();
  }

  /** Shows or hides the ghost of the cutting plane itself. */
  setSectionPlaneVisible(shown: boolean) {
    this.sectionPlaneShown = shown;
    this.sectionHelper.visible = shown && this.crossSection && !!this.organ;
    this.dirty = true;
    return this.sectionPlaneShown;
  }

  /** Swaps which half is discarded, so both faces are reachable without orbiting. */
  toggleSectionFlip() {
    this.sectionFlip = !this.sectionFlip;
    this.updateSectionPlane();
    this.busy(0.2);
    return this.sectionFlip;
  }

  private sectionNormal() {
    if (this.sectionAxis === "free") this.planeNormal.copy(this.freeNormal);
    else this.planeNormal.fromArray(SECTION_NORMALS[this.sectionAxis]);
    return this.sectionFlip ? this.planeNormal.negate() : this.planeNormal;
  }

  /**
   * Rebuilds the organ-space plane from the current axis, flip and sweep, then
   * pushes it out to world space. Travel is measured against this organ's own
   * box projected onto the plane normal, so the same slider position means
   * "halfway through" whether the specimen is an eyeball or a set of lungs —
   * and every position lands inside the specimen rather than sailing past it.
   */
  private updateSectionPlane() {
    const normal = this.sectionNormal();
    const bounds = this.organ?.bounds;
    let mid = 0;
    let radius = FIT_SIZE / 2;
    if (bounds && !bounds.isEmpty()) {
      bounds.getCenter(this.boundsCenter);
      bounds.getSize(this.boundsHalf).multiplyScalar(0.5);
      mid = normal.dot(this.boundsCenter);
      radius =
        Math.abs(normal.x) * this.boundsHalf.x +
        Math.abs(normal.y) * this.boundsHalf.y +
        Math.abs(normal.z) * this.boundsHalf.z;
    } else {
      this.boundsCenter.set(0, 0, 0);
      this.boundsHalf.setScalar(FIT_SIZE / 2);
    }
    this.localPlane.normal.copy(normal);
    this.localPlane.constant = -(mid + this.sweep.depth * radius * SECTION_TRAVEL);

    // The ghost pane rides the same plane: centred over the specimen, facing
    // the normal, wide enough to cover the largest cut this box can produce.
    const travel = this.sweep.depth * radius * SECTION_TRAVEL;
    this.helperPosition.copy(this.boundsCenter).addScaledVector(normal, travel);
    this.helperQuaternion.setFromUnitVectors(AnatomyViewer.PLANE_FORWARD, normal);
    this.helperScale.setScalar(this.boundsHalf.length() * 2 * 1.08);
    this.helperPose.compose(this.helperPosition, this.helperQuaternion, this.helperScale);

    this.syncWorldPlane();
    this.dirty = true;
  }

  /** three.js clips in world space, so the organ-space plane is carried through
   *  the pivot each frame — the cut then rides with the specimen. */
  private syncWorldPlane() {
    const pivot = this.organ?.pivot;
    if (!pivot) {
      this.clipPlane.copy(this.localPlane);
      this.sectionHelper.matrix.copy(this.helperPose);
      this.sectionHelper.matrixWorldNeedsUpdate = true;
      return;
    }
    pivot.updateWorldMatrix(true, false);
    this.clipPlane.copy(this.localPlane).applyMatrix4(pivot.matrixWorld);
    // The pane inherits the pivot's whole transform, so it scales and settles
    // with the intro animation just like the specimen it cuts.
    this.sectionHelper.matrix.multiplyMatrices(pivot.matrixWorld, this.helperPose);
    this.sectionHelper.matrixWorldNeedsUpdate = true;
  }

  /** Snapshots the current view direction into organ space, so a "free" cut
   *  opens towards the viewer and then stays put while they orbit around it. */
  private captureFreeNormal() {
    const direction = new THREE.Vector3().subVectors(this.controls.target, this.camera.position);
    direction.y = 0;
    if (direction.lengthSq() < 1e-6) direction.set(0, 0, -1);
    direction.normalize();
    const pivot = this.organ?.pivot;
    if (pivot) {
      pivot.updateWorldMatrix(true, false);
      direction.applyMatrix3(new THREE.Matrix3().setFromMatrix4(pivot.matrixWorld).invert()).normalize();
    }
    this.freeNormal.copy(direction);
  }

  /**
   * The organs are front-face-only shells, which a cut would otherwise reveal
   * as a hole straight through to the background. Rendering both sides while
   * clipped is what actually exposes the chambers, lobes, and inner walls.
   */
  private applyClipping(enabled: boolean) {
    if (!this.organ) return;
    // The pane lives and dies with the actual clip, not the toggle's state —
    // so it stays on screen while the disable sweep carries it out of the
    // specimen, and vanishes only once the cut itself is gone.
    this.sectionHelper.visible = enabled && this.sectionPlaneShown;
    const planes = enabled ? [this.clipPlane] : null;
    this.materials(this.organ).forEach((material) => {
      material.clippingPlanes = planes;
      material.side = enabled ? THREE.DoubleSide : THREE.FrontSide;
      material.needsUpdate = true;
    });
    this.depthMaterial.clippingPlanes = planes;
    this.depthMaterial.needsUpdate = true;
    this.dirty = true;
  }

  toggleWireframe() {
    return this.setWireframe(!this.wireframe);
  }

  toggleLayers() {
    return this.toggleWireframe();
  }

  setWireframe(enabled: boolean) {
    if (this.wireframe === enabled) return this.wireframe;
    this.wireframe = enabled;
    this.applyWireframe();
    return this.wireframe;
  }

  private applyWireframe() {
    if (!this.organ) return;
    this.materials(this.organ).forEach((material) => {
      if (material instanceof THREE.MeshStandardMaterial) material.wireframe = this.wireframe;
    });
    this.dirty = true;
  }

  // ----------------------------------------------------------- quiz & authoring

  /**
   * Raycasts the actual mesh and reports the hit in pivot space — the same
   * coordinate system hotspots are authored in.
   */
  private captureAuthorPoint(px: number, py: number) {
    if (!this.organ) return;
    const ndc = new THREE.Vector2((px / this.width) * 2 - 1, -(py / this.height) * 2 + 1);
    this.authorRaycaster.setFromCamera(ndc, this.camera);
    const hit = this.authorRaycaster.intersectObjects(this.organ.meshes, false)[0];
    if (!hit) return;
    const local = this.organ.pivot.worldToLocal(hit.point.clone());
    this.callbacks.onAuthorPoint?.({
      x: +local.x.toFixed(2),
      y: +local.y.toFixed(2),
      z: +local.z.toFixed(2),
    });
  }

  /** Where a dot currently sits, as a 0–1 fraction of the viewport height. */
  hotspotScreenY(id: string): number | null {
    const point = this.hotspots.screenPosition(id, this.camera, this.width, this.height);
    return point ? point.y / this.height : null;
  }

  setQuizMode(enabled: boolean) {
    this.quizMode = enabled;
    this.select(null);
    this.hotspots.clearFlash();
    this.dirty = true;
  }

  setAuthoring(enabled: boolean) {
    this.authoring = enabled;
    this.renderer.domElement.style.cursor = enabled ? "crosshair" : "";
    this.dirty = true;
  }

  /** Green/red ring on a dot after a quiz answer. */
  flash(id: string, correct: boolean) {
    this.hotspots.flash(id, correct);
    this.busy(1.1);
  }

  setCanvasLabel(label: string) {
    this.renderer.domElement.setAttribute("aria-label", label);
  }

  setAriaLabel(label: string) {
    this.setCanvasLabel(label);
  }

  // ----------------------------------------------------- function animation

  /**
   * Turns procedural function animation on or off. The motion is applied
   * to the whole pivot (organ + hotspot dots), so the dots stay glued to the
   * surface.
   */
  setFunctionAnimation(enabled: boolean) {
    this.functionAnimation = enabled;
    this.animationTime = 0;
    if (!enabled && this.organ) {
      const pivot = this.organ.pivot;
      pivot.rotation.set(0.05, -0.28, 0);
      pivot.scale.setScalar(1);
      pivot.position.set(0, 0, 0);
    }
    this.dirty = true;
  }

  private applyFunctionAnimation(delta: number) {
    const pivot = this.organ?.pivot;
    if (!pivot) return;
    this.animationTime += delta;
    const t = this.animationTime;
    switch (this.animationKey) {
      case "heart": {
        const phase = (t * 1.1) % 1;
        const systole = phase < 0.16 ? Math.sin((phase / 0.16) * Math.PI) : 0;
        const echo = phase >= 0.34 && phase < 0.5 ? Math.sin(((phase - 0.34) / 0.16) * Math.PI) * 0.5 : 0;
        pivot.scale.setScalar(1 + (systole + echo) * 0.045);
        break;
      }
      case "lungs": {
        const breath = Math.sin(t * Math.PI * 2 * 0.22);
        pivot.scale.setScalar(1 + 0.04 * breath);
        pivot.position.y = 0.03 * breath;
        break;
      }
      case "brain":
      case "liver":
      case "kidneys": {
        pivot.scale.setScalar(1 + 0.018 * Math.sin(t * Math.PI * 2 * 0.9));
        break;
      }
      case "eyeball": {
        pivot.rotation.x = 0.02 + 0.05 * Math.sin(t * Math.PI * 2 * 0.25);
        pivot.rotation.z = 0.02 * Math.sin(t * Math.PI * 2 * 0.35);
        pivot.scale.setScalar(1 + 0.01 * Math.sin(t * Math.PI * 2 * 1.1));
        break;
      }
      case "intestine": {
        pivot.scale.setScalar(1 + 0.025 * Math.sin(t * Math.PI * 2 * 0.7));
        pivot.rotation.z = 0.015 * Math.sin(t * Math.PI * 2 * 0.5);
        break;
      }
      case "pancreas":
      case "skin":
      default: {
        pivot.position.y = 0.04 * Math.sin(t * Math.PI * 2 * 0.4);
        pivot.scale.setScalar(1 + 0.008 * Math.sin(t * Math.PI * 2 * 0.8));
        break;
      }
    }
    this.dirty = true;
  }

  /** Re-labels the dots without reloading the model. */
  updateHotspots(hotspots: Hotspot[]) {
    if (!this.organ) return;
    this.hotspots.attach(this.organ.pivot, hotspots, this.organ.meshes);
    this.hotspots.setPixelSize(DOT_PIXELS, this.height, CAMERA_FOV);
    if (this.crossSection) this.applyClipping(true);
    this.dirty = true;
  }

  dispose() {
    this.disposed = true;
    this.loadRequest += 1;
    cancelAnimationFrame(this.frame);
    gsap.killTweensOf(this.camera.position);
    gsap.killTweensOf(this.sweep);
    gsap.killTweensOf(this.dressing);
    this.controls.removeEventListener("start", this.onControlStart);
    this.controls.dispose();
    this.resizeObserver.disconnect();
    this.intersectionObserver.disconnect();
    document.removeEventListener("visibilitychange", this.onVisibilityChange);

    const canvas = this.renderer.domElement;
    canvas.removeEventListener("pointerdown", this.onPointerDown);
    canvas.removeEventListener("pointermove", this.onPointerMove);
    canvas.removeEventListener("pointerup", this.onPointerUp);
    canvas.removeEventListener("pointerleave", this.onPointerLeave);
    canvas.removeEventListener("keydown", this.onKeyDown);

    this.hotspots.dispose();
    this.depthMaterial.dispose();
    this.sectionHelper.children.forEach((child) => {
      if (child instanceof THREE.Mesh || child instanceof THREE.LineSegments) child.geometry.dispose();
    });
    this.sectionHelperFill.dispose();
    this.sectionHelperRim.dispose();
    this.assets.dispose();
    this.scene.environment?.dispose();
    const shadowMaterial = this.contactShadow.material as THREE.MeshBasicMaterial;
    shadowMaterial.map?.dispose();
    shadowMaterial.dispose();
    this.contactShadow.geometry.dispose();
    this.particles.geometry.dispose();
    (this.particles.material as THREE.PointsMaterial).dispose();
    this.renderer.dispose();
    canvas.remove();
  }
}

function contactShadowTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, size * 0.04, size / 2, size / 2, size * 0.5);
  gradient.addColorStop(0, "rgba(94, 62, 42, 0.62)");
  gradient.addColorStop(0.45, "rgba(94, 62, 42, 0.26)");
  gradient.addColorStop(1, "rgba(94, 62, 42, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
