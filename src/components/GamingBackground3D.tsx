import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Pre-allocated vectors outside animation loop (zero per-frame GC)
const _pointerTarget = new THREE.Vector2(0, 0);
const _pointerCurrent = new THREE.Vector2(0, 0);

function detectSoftwareWebGL(): boolean {
  try {
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

function createParticleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.35, 'rgba(147, 197, 253, 0.7)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Builds a composite 3D geometric node (obsidian faceted core + metallic wireframe + orbital ring)
 */
function createCompositeCore(
  radius: number,
  wireColor: number,
  ringColor: number
): THREE.Group {
  const group = new THREE.Group();

  const coreGeo = new THREE.IcosahedronGeometry(radius, 0);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x0b0f19,
    metalness: 0.85,
    roughness: 0.22,
    flatShading: true,
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  group.add(coreMesh);

  const wireGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(radius * 1.18, 0));
  const wireMat = new THREE.LineBasicMaterial({
    color: wireColor,
    transparent: true,
    opacity: 0.55,
  });
  const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
  group.add(wireMesh);

  const ringGeo = new THREE.TorusGeometry(radius * 1.55, radius * 0.035, 12, 64);
  const ringMat = new THREE.MeshStandardMaterial({
    color: ringColor,
    emissive: ringColor,
    emissiveIntensity: 0.35,
    metalness: 0.7,
    roughness: 0.3,
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = Math.PI * 0.38;
  group.add(ringMesh);

  return group;
}

export default function GamingBackground3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isSoftwareGl = detectSoftwareWebGL();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: false,
      });
    } catch {
      setWebglUnavailable(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x050507, 1);

    const canvas = renderer.domElement;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050507);
    scene.fog = new THREE.FogExp2(0x050507, 0.042);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.set(0, 2.2, 13);

    // Studio reflection environment for dark brushed obsidian & metallic surfaces
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTexture = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    scene.environment = envTexture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    // Lighting rig (Key + Cool Hemisphere Fill + Electric Blue Rim)
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x050507, 0.55);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xe2e8f0, 1.4);
    keyLight.position.set(8, 12, 10);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x2563eb, 18, 40, 1.5);
    rimLight.position.set(-6, 4, -4);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0x38bdf8, 12, 35, 1.5);
    accentLight.position.set(7, -2, 4);
    scene.add(accentLight);

    // 1. Tactical Gaming Grid Terrain (infinite-feeling floor receding into black fog)
    const gridGroup = new THREE.Group();
    const primaryGrid = new THREE.GridHelper(90, 48, 0x2563eb, 0x111827);
    primaryGrid.position.y = -4.2;
    const primaryMats = Array.isArray(primaryGrid.material)
      ? primaryGrid.material
      : [primaryGrid.material];
    primaryMats.forEach((m) => {
      m.transparent = true;
      m.opacity = 0.5;
    });
    gridGroup.add(primaryGrid);

    const upperGrid = new THREE.GridHelper(90, 24, 0x1d4ed8, 0x0b101d);
    upperGrid.position.y = 11.5;
    const upperMats = Array.isArray(upperGrid.material)
      ? upperGrid.material
      : [upperGrid.material];
    upperMats.forEach((m) => {
      m.transparent = true;
      m.opacity = 0.18;
    });
    gridGroup.add(upperGrid);
    scene.add(gridGroup);

    // 2. Composite Obsidian Hero Nodes (placed off-center so they frame content naturally)
    const nodesGroup = new THREE.Group();

    const mainNode = createCompositeCore(1.65, 0x3b82f6, 0x38bdf8);
    mainNode.position.set(5.4, 1.1, -2.5);
    nodesGroup.add(mainNode);

    const secondaryNode = createCompositeCore(0.95, 0x38bdf8, 0x2563eb);
    secondaryNode.position.set(-5.8, -1.3, -4.5);
    nodesGroup.add(secondaryNode);

    const distantNode = createCompositeCore(0.65, 0x60a5fa, 0x1d4ed8);
    distantNode.position.set(-2.4, 3.6, -9.5);
    nodesGroup.add(distantNode);

    scene.add(nodesGroup);

    // 3. Instanced Floating Obsidian Cubes (for spatial depth)
    const cubeCount = 28;
    const cubeGeo = new THREE.BoxGeometry(0.28, 0.28, 0.28);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.85,
      roughness: 0.28,
    });
    const instancedCubes = new THREE.InstancedMesh(cubeGeo, cubeMat, cubeCount);
    const dummy = new THREE.Object3D();
    const cubeSeeds: { x: number; y: number; z: number; speed: number; phase: number }[] = [];

    for (let i = 0; i < cubeCount; i++) {
      const x = (Math.random() - 0.5) * 28;
      const y = (Math.random() - 0.5) * 14;
      const z = -3 - Math.random() * 18;
      cubeSeeds.push({
        x,
        y,
        z,
        speed: 0.4 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2,
      });
      dummy.position.set(x, y, z);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      dummy.scale.setScalar(0.65 + Math.random() * 0.9);
      dummy.updateMatrix();
      instancedCubes.setMatrixAt(i, dummy.matrix);
    }
    instancedCubes.instanceMatrix.needsUpdate = true;
    instancedCubes.frustumCulled = false;
    scene.add(instancedCubes);

    // 4. Procedural Particle Field
    const particleCount = 420;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const colorBlue = new THREE.Color(0x3b82f6);
    const colorCyan = new THREE.Color(0x38bdf8);
    const colorSilver = new THREE.Color(0xcbd5e1);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 38;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 4;

      const pick = i % 5 === 0 ? colorCyan : i % 2 === 0 ? colorBlue : colorSilver;
      colors[i * 3] = pick.r;
      colors[i * 3 + 1] = pick.g;
      colors[i * 3 + 2] = pick.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleTex = createParticleTexture();
    const particleMat = new THREE.PointsMaterial({
      size: 0.16,
      map: particleTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Pointer & scroll parallax tracking
    let scrollFraction = 0;
    const handlePointerMove = (e: PointerEvent) => {
      _pointerTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      _pointerTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      scrollFraction = window.scrollY / maxScroll;
    };

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    };

    let contextLost = false;
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      contextLost = true;
    };
    const handleContextRestored = () => {
      contextLost = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);

    const clock = new THREE.Clock();
    let frameId = 0;
    let disposed = false;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function updateScene(elapsed: number, delta: number) {
      // Smooth exponential damping on pointer parallax
      const dampFactor = 1 - Math.exp(-3.5 * delta);
      _pointerCurrent.x += (_pointerTarget.x - _pointerCurrent.x) * dampFactor;
      _pointerCurrent.y += (_pointerTarget.y - _pointerCurrent.y) * dampFactor;

      // Subtle camera drift driven by pointer and page scroll
      camera.position.x = _pointerCurrent.x * 1.1;
      camera.position.y = 2.2 + _pointerCurrent.y * 0.65 - scrollFraction * 2.4;
      camera.position.z = 13 - scrollFraction * 2.8;
      camera.lookAt(0, -scrollFraction * 1.6, -2);

      // Slow tactical grid forward travel
      gridGroup.position.z = (elapsed * 0.85) % 1.875;

      // Rotate composite geometric cores
      mainNode.rotation.y = elapsed * 0.22;
      mainNode.rotation.x = Math.sin(elapsed * 0.3) * 0.18;
      mainNode.children[2].rotation.z = elapsed * 0.35;

      secondaryNode.rotation.y = -elapsed * 0.28;
      secondaryNode.rotation.z = Math.cos(elapsed * 0.25) * 0.2;

      distantNode.rotation.x = elapsed * 0.18;
      distantNode.rotation.y = elapsed * 0.15;

      // Drift instanced obsidian cubes gently
      for (let i = 0; i < cubeCount; i++) {
        const seed = cubeSeeds[i];
        dummy.position.set(
          seed.x,
          seed.y + Math.sin(elapsed * seed.speed + seed.phase) * 0.45,
          seed.z
        );
        dummy.rotation.set(
          elapsed * 0.3 * seed.speed + seed.phase,
          elapsed * 0.25 * seed.speed,
          0
        );
        dummy.scale.setScalar(0.85);
        dummy.updateMatrix();
        instancedCubes.setMatrixAt(i, dummy.matrix);
      }
      instancedCubes.instanceMatrix.needsUpdate = true;

      // Slow rotation of star/particle dust
      particles.rotation.y = elapsed * 0.025;
      particles.rotation.x = _pointerCurrent.y * 0.05;
    }

    function tick() {
      if (disposed) return;
      if (contextLost) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();
      updateScene(elapsed, delta);

      renderer.render(scene, camera);

      if (prefersReducedMotion) {
        return;
      }

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);

      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);

      // Dispose all GPU resources cleanly
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).geometry) {
          (obj as THREE.Mesh).geometry.dispose();
        }
        const mat = (obj as THREE.Mesh).material;
        if (Array.isArray(mat)) {
          mat.forEach((m) => m.dispose());
        } else if (mat) {
          mat.dispose();
        }
      });

      particleTex.dispose();
      envTexture.dispose();
      renderer.dispose();

      if (canvas.parentElement === container) {
        container.removeChild(canvas);
      }
    };
  }, []);

  if (webglUnavailable) {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_#0f172a_0%,_#050507_65%)]"
      />
    );
  }

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none bg-[#050507]"
    />
  );
}
