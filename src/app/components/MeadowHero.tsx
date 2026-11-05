"use client";

import { useEffect, useRef, type ReactNode } from "react";
import * as THREE from "three";

const COLORS = {
  green: 0x244b27,
  sage: 0x8faa7c,
  fog: 0xf6ebd0,
  ground: 0x3d5a33,
  seedHead: 0xe0d39e,
  pollen: 0xc9a65a,
};

/** Deterministic PRNG so the field looks the same on every load. */
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function leafGeometry(len: number, w: number, curl: number) {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.bezierCurveTo(w, len * 0.2, w * 0.9, len * 0.75, 0, len);
  s.bezierCurveTo(-w * 0.9, len * 0.75, -w, len * 0.2, 0, 0);
  const g = new THREE.ExtrudeGeometry(s, {
    depth: 0.025,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 2,
    curveSegments: 18,
  });
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const y = p.getY(i);
    p.setZ(i, p.getZ(i) + ((curl * (x * x)) / (w * w)) * 0.5 - curl * Math.pow(y / len, 2) * 0.9);
  }
  g.computeVertexNormals();
  return g;
}

const GRASS_VERT = /* glsl */ `
  uniform float uTime;
  uniform vec3 uMouse;
  uniform float uPush;
  attribute float aRand;
  varying float vH;
  varying float vRand;
  varying float vDist;
  void main() {
    vec4 world = modelMatrix * instanceMatrix * vec4(position, 1.0);
    vec4 base = modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    float h = position.y;
    float bend = h * h;
    float wind = sin(uTime * 1.2 + base.x * 0.32 + base.z * 0.18) * 0.22
               + sin(uTime * 2.6 + base.x * 1.3 + aRand * 6.0) * 0.06;
    world.x += wind * bend;
    world.z += wind * 0.35 * bend;
    vec2 d = world.xz - uMouse.xz;
    float push = smoothstep(2.4, 0.0, length(d)) * uPush;
    world.xz += normalize(d + 0.0001) * push * bend * 1.1;
    world.y -= push * bend * 0.35;
    vH = h;
    vRand = aRand;
    vec4 mv = viewMatrix * world;
    vDist = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const GRASS_FRAG = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uTip;
  uniform vec3 uSeed;
  uniform vec3 uFog;
  varying float vH;
  varying float vRand;
  varying float vDist;
  void main() {
    vec3 col = mix(uBase * (0.75 + vRand * 0.3), uTip * (0.9 + vRand * 0.2), smoothstep(0.0, 1.0, vH));
    col = mix(col, uSeed, step(0.93, vRand) * vH * 0.6);
    col = mix(col, uFog, smoothstep(7.0, 42.0, vDist));
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

const GROUND_VERT = /* glsl */ `
  varying float vD;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vD = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const GROUND_FRAG = /* glsl */ `
  uniform vec3 uA;
  uniform vec3 uFog;
  varying float vD;
  void main() {
    gl_FragColor = vec4(mix(uA, uFog, smoothstep(7.0, 42.0, vD)), 1.0);
    #include <colorspace_fragment>
  }
`;

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Hero backdrop: a 3D meadow of instanced grass and seedlings swaying in the
 * wind, fading into a cream sky. The grass parts around the cursor.
 * Children render on top of the scene.
 */
export default function MeadowHero({ children, className = "" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // No WebGL: the CSS sky gradient stays as the backdrop.
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 700;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 120);
    camera.position.set(0, 1.9, 9);

    scene.add(new THREE.HemisphereLight(0xfff8e8, 0x7a5a36, 1.0 * Math.PI));
    const key = new THREE.DirectionalLight(0xfff0d8, 0.9 * Math.PI);
    key.position.set(4, 8, 6);
    scene.add(key);

    const rand = rng(3);
    const disposables: { dispose: () => void }[] = [];

    // Grass: one instanced mesh, animated entirely in the vertex shader.
    const N = small ? 5000 : 11000;
    const blade = new THREE.PlaneGeometry(0.1, 1, 1, 6);
    blade.translate(0, 0.5, 0);
    const bp = blade.attributes.position;
    for (let i = 0; i < bp.count; i++) {
      const y = bp.getY(i);
      bp.setX(i, bp.getX(i) * (1 - y * 0.9));
      bp.setZ(i, y * y * 0.18);
    }
    const aRand = new Float32Array(N);
    const grassMat = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector3(0, 0, 100) },
        uPush: { value: 0 },
        uBase: { value: new THREE.Color(COLORS.green) },
        uTip: { value: new THREE.Color(COLORS.sage) },
        uSeed: { value: new THREE.Color(COLORS.seedHead) },
        uFog: { value: new THREE.Color(COLORS.fog) },
      },
      vertexShader: GRASS_VERT,
      fragmentShader: GRASS_FRAG,
    });
    const grass = new THREE.InstancedMesh(blade, grassMat, N);
    const m4 = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const e = new THREE.Euler();
    const pos = new THREE.Vector3();
    const sc = new THREE.Vector3();
    for (let i = 0; i < N; i++) {
      const z = 7 - Math.pow(rand(), 1.5) * 55;
      const spread = 14 + (7 - z) * 0.9;
      pos.set((rand() * 2 - 1) * spread, 0, z);
      e.set((rand() - 0.5) * 0.25, rand() * Math.PI * 2, (rand() - 0.5) * 0.25);
      q.setFromEuler(e);
      sc.set(0.8 + rand() * 0.7, 0.55 + rand() * 0.75, 1);
      m4.compose(pos, q, sc);
      grass.setMatrixAt(i, m4);
      aRand[i] = rand();
    }
    blade.setAttribute("aRand", new THREE.InstancedBufferAttribute(aRand, 1));
    grass.frustumCulled = false;
    scene.add(grass);
    disposables.push(blade, grassMat);

    // Ground plane that fades into the sky like the grass does.
    const groundGeo = new THREE.PlaneGeometry(200, 120);
    const groundMat = new THREE.ShaderMaterial({
      uniforms: { uA: { value: new THREE.Color(COLORS.ground) }, uFog: { value: new THREE.Color(COLORS.fog) } },
      vertexShader: GROUND_VERT,
      fragmentShader: GROUND_FRAG,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.z = -40;
    scene.add(ground);
    disposables.push(groundGeo, groundMat);

    // A few two-leaf seedlings among the grass.
    const leafGeo = leafGeometry(0.55, 0.22, 0.35);
    const stemGeo = new THREE.CylinderGeometry(0.025, 0.035, 0.9, 8);
    stemGeo.translate(0, 0.45, 0);
    const sageMat = new THREE.MeshStandardMaterial({ color: COLORS.sage, roughness: 0.6, side: THREE.DoubleSide });
    const greenMat = new THREE.MeshStandardMaterial({ color: COLORS.green, roughness: 0.55, side: THREE.DoubleSide });
    disposables.push(leafGeo, stemGeo, sageMat, greenMat);
    const sprouts: THREE.Group[] = [];
    for (let i = 0; i < 16; i++) {
      const g = new THREE.Group();
      // Keep seedlings mid-field and off-center so they never crowd the copy.
      const z = 1 - rand() * 12;
      const side = rand() < 0.5 ? -1 : 1;
      g.position.set(side * (3 + rand() * (5 + (1 - z) * 0.6)), 0, z);
      g.add(new THREE.Mesh(stemGeo, greenMat));
      const a = new THREE.Mesh(leafGeo, sageMat);
      a.position.y = 0.85;
      a.rotation.z = -1.1;
      g.add(a);
      const b = new THREE.Mesh(leafGeo, greenMat);
      b.position.y = 0.85;
      b.rotation.z = 1.1;
      b.rotation.y = Math.PI;
      g.add(b);
      g.rotation.y = rand() * Math.PI;
      g.scale.setScalar(0.7 + rand() * 0.35);
      g.userData.phase = rand() * 6;
      scene.add(g);
      sprouts.push(g);
    }

    // Drifting pollen.
    const PN = small ? 140 : 260;
    const pp = new Float32Array(PN * 3);
    for (let i = 0; i < PN; i++) {
      pp[i * 3] = (rand() * 2 - 1) * 16;
      pp[i * 3 + 1] = rand() * 5;
      pp[i * 3 + 2] = 6 - rand() * 26;
    }
    const pollenGeo = new THREE.BufferGeometry();
    pollenGeo.setAttribute("position", new THREE.BufferAttribute(pp, 3));
    const pollenMat = new THREE.PointsMaterial({ color: COLORS.pollen, size: 0.06, transparent: true, opacity: 0.75, depthWrite: false });
    const pollen = new THREE.Points(pollenGeo, pollenMat);
    scene.add(pollen);
    disposables.push(pollenGeo, pollenMat);

    // Pointer: project onto the ground so the grass parts under the cursor.
    const ray = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hit = new THREE.Vector3();
    const ndc = new THREE.Vector2();
    let pushTarget = 0;
    let mouseX = 0;
    let camX = 0;
    // Camera pitches up so the horizon sits in the lower part of the hero,
    // leaving the sky clear for the headline, copy and buttons.
    let lookY = 4.6;

    const onMove = (ev: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      ndc.set(((ev.clientX - r.left) / r.width) * 2 - 1, -(((ev.clientY - r.top) / r.height) * 2 - 1));
      mouseX = ndc.x;
      ray.setFromCamera(ndc, camera);
      if (ray.ray.intersectPlane(plane, hit)) {
        grassMat.uniforms.uMouse.value.copy(hit);
        pushTarget = 1;
      }
    };
    const onLeave = () => {
      pushTarget = 0;
      mouseX = 0;
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    const resize = () => {
      const { width, height } = wrap.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      const narrow = width < 700;
      camera.fov = narrow ? 55 : 42;
      camera.updateProjectionMatrix();
      // Horizon target in NDC (-1 = bottom edge): lower on phones, where the copy is taller.
      const horizon = narrow ? -0.5 : -0.4;
      const pitch = Math.atan(-horizon * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
      lookY = camera.position.y + Math.tan(pitch) * 21;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    // Only animate while the hero is on screen.
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(wrap);

    const clock = new THREE.Clock();
    let raf = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!visible) return;
      const t = clock.elapsedTime * (reduceMotion ? 0.15 : 1);

      const u = grassMat.uniforms;
      u.uTime.value = t;
      u.uPush.value = lerp(u.uPush.value, pushTarget, 0.08);

      camX = lerp(camX, mouseX * 0.7, 0.04);
      camera.position.x = camX;
      camera.lookAt(camX * 0.4, lookY, -12);

      for (const g of sprouts) {
        g.rotation.z = Math.sin(t * 1.2 + g.position.x * 0.3 + g.userData.phase) * 0.08;
      }

      if (!reduceMotion) {
        const pa = pollenGeo.attributes.position;
        for (let i = 0; i < pa.count; i++) {
          let y = pa.getY(i) + dt * 0.12;
          if (y > 5) y = 0;
          pa.setY(i, y);
          pa.setX(i, pa.getX(i) + Math.sin(t * 0.5 + i) * dt * 0.08);
        }
        pa.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      disposables.forEach((d) => d.dispose());
      grass.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden ${className}`}
      style={{ background: "linear-gradient(180deg, #FFF8E8 0%, #FBF1DA 55%, #F3E6C6 100%)" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="A meadow of grass and seedlings swaying in the wind"
      />
      <div className="relative z-10">{children}</div>
      {/* Soft hand-off from the meadow into the cream page below */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20"
        style={{ background: "linear-gradient(to bottom, transparent, #FFF8E8)" }}
      />
    </div>
  );
}
