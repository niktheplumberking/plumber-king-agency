"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Bobo in live 3D (public/bobo/bobo.glb). three.js is about 600 KB, so it is fetched only when this component mounts,
 * and it mounts only after the visitor opens Bobo's panel: page loads never pay for it. Until the model is ready, and
 * for visitors who ask for reduced motion, the still `poster` shows instead. He bobs, sways, swings his wrench and looks at the cursor; drag to spin him, tap to make him hop.
 */
export function BoboModel({ poster, className = "" }: { poster: string; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let stop = () => {};
    let dead = false;
    (async () => {
      const [THREE, { GLTFLoader }, { MeshoptDecoder }] = await Promise.all([
        import("three"),
        import("three/examples/jsm/loaders/GLTFLoader.js"),
        import("three/examples/jsm/libs/meshopt_decoder.module.js"),
      ]);
      if (dead) return;
      const size = el.clientWidth;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(size, size);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      const scene = new THREE.Scene();
      scene.add(new THREE.HemisphereLight(0xffffff, 0xffd6e7, 2.2));
      const sun = new THREE.DirectionalLight(0xffffff, 2);
      sun.position.set(2, 3, 4);
      scene.add(sun);
      const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 100);
      const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
      const gltf = await loader.loadAsync("/bobo/bobo.glb");
      if (dead) { renderer.dispose(); return; }
      const model = gltf.scene;
      // The wrench swing: a tiny vertex-shader bend that turns the hand and wrench (left edge of the model, above the
      // belt) around the wrist. The numbers are fractions of this model's own bounding box (bobo.glb, 2026-10-15).
      const arm = { value: 0 };
      model.traverse((o) => {
        const mesh = o as import("three").Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry.computeBoundingBox();
        const bb = mesh.geometry.boundingBox!, sz = bb.getSize(new THREE.Vector3());
        const u = { uArm: arm, uMin: { value: new THREE.Vector2(bb.min.x, bb.min.y) }, uSize: { value: new THREE.Vector2(sz.x, sz.y) }, uPivot: { value: new THREE.Vector2(bb.min.x + 0.13 * sz.x, bb.min.y + 0.44 * sz.y) } };
        (mesh.material as import("three").Material).onBeforeCompile = (sh) => {
          Object.assign(sh.uniforms, u);
          sh.vertexShader = "uniform float uArm; uniform vec2 uMin, uSize, uPivot;\nmat2 pkRot(vec3 p){vec2 n=(p.xy-uMin)/uSize;float a=uArm*smoothstep(.27,.19,n.x)*smoothstep(.30,.36,n.y);float c=cos(a),s=sin(a);return mat2(c,s,-s,c);}\n" + sh.vertexShader
            .replace("#include <beginnormal_vertex>", "#include <beginnormal_vertex>\nmat2 pkR=pkRot(position);objectNormal.xy=pkR*objectNormal.xy;")
            .replace("#include <begin_vertex>", "#include <begin_vertex>\ntransformed.xy=uPivot+pkR*(transformed.xy-uPivot);");
        };
      });
      const box = new THREE.Box3().setFromObject(model);
      const dims = box.getSize(new THREE.Vector3());
      model.position.sub(box.getCenter(new THREE.Vector3()));
      const body = new THREE.Group(); // bob, squash and sway
      body.add(model);
      const pivot = new THREE.Group(); // turn (drag, cursor, hop spin)
      pivot.add(body);
      scene.add(pivot);
      const dist = Math.max(dims.x, dims.y, dims.z) * 2.3;
      camera.position.set(0, dims.y * 0.12, dist);
      camera.lookAt(0, 0, 0);
      el.appendChild(renderer.domElement);
      setReady(true);

      // He is alive: breathes and bobs, sways, swings his wrench every few seconds, turns to look at the cursor,
      // spins when dragged and hops when tapped. Everything eases, nothing snaps.
      let angle = 0, vel = 0, dragging = false, moved = 0, lastX = 0, raf = 0, look = 0, lookY = 0, hop = -1, spin = 0, last = 0;
      const t0 = performance.now();
      const down = (e: PointerEvent) => { dragging = true; moved = 0; lastX = e.clientX; el.setPointerCapture(e.pointerId); };
      const move = (e: PointerEvent) => { if (!dragging) return; const dx = e.clientX - lastX; moved += Math.abs(dx); vel = dx * 0.01; angle += vel; lastX = e.clientX; };
      const up = () => { if (dragging && moved < 6 && hop < 0) hop = 0; dragging = false; };
      const aim = (e: PointerEvent) => { const r = el.getBoundingClientRect(); look = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / 400)); lookY = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / 400)); };
      el.addEventListener("pointerdown", down);
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerup", up);
      el.addEventListener("pointercancel", up);
      window.addEventListener("pointermove", aim, { passive: true });
      const tick = () => {
        const t = (performance.now() - t0) / 1000, dt = Math.min(t - last, 0.05);
        last = t;
        if (!dragging) { vel *= 0.92; angle += vel; angle += (look * 0.55 - angle) * 0.04; }
        // hop: 0.7 s up and down with a full turn
        let lift = 0;
        if (hop >= 0) { hop += dt; const k = Math.min(hop / 0.7, 1); lift = Math.sin(k * Math.PI) * dims.y * 0.18; spin = k * Math.PI * 2; if (k >= 1) { hop = -1; spin = 0; } }
        pivot.rotation.y = angle + spin;
        pivot.rotation.x += (lookY * 0.12 - pivot.rotation.x) * 0.05;
        const beat = Math.sin(t * 3.2);
        body.position.y = Math.abs(beat) * dims.y * 0.025 + lift;
        body.scale.set(1 - beat * 0.012, 1 + beat * 0.02, 1 - beat * 0.012);
        body.rotation.z = Math.sin(t * 1.4) * 0.05;
        // wrench swing: a short burst every 4 s, a slight idle wobble otherwise
        const phase = t % 4, burst = phase < 1.4 ? Math.sin((phase / 1.4) * Math.PI) : 0;
        arm.value = Math.sin(t * 9) * 0.28 * burst + Math.sin(t * 2.1) * 0.04;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      tick();
      stop = () => {
        cancelAnimationFrame(raf);
        el.removeEventListener("pointerdown", down);
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerup", up);
        el.removeEventListener("pointercancel", up);
        window.removeEventListener("pointermove", aim);
        renderer.dispose();
        renderer.domElement.remove();
      };
    })().catch(() => { /* no WebGL or the file failed: the poster stays */ });
    return () => { dead = true; stop(); };
  }, []);

  return (
    <div ref={host} className={`relative aspect-square cursor-grab touch-pan-y active:cursor-grabbing ${className}`} aria-label="Bobo the duck in 3D. Drag to spin him, tap to make him hop." role="img">
      {!ready && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" className="absolute inset-0 h-full w-full object-contain" />
      )}
    </div>
  );
}
