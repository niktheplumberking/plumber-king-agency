"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Bobo in live 3D (public/bobo/bobo.glb). three.js is about 600 KB, so it is fetched only when this component mounts,
 * and it mounts only after the visitor opens Bobo's panel: page loads never pay for it. Until the model is ready, and
 * for visitors who ask for reduced motion, the still `poster` shows instead. Drag to spin; otherwise he turns slowly.
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
      const box = new THREE.Box3().setFromObject(model);
      const dims = box.getSize(new THREE.Vector3());
      model.position.sub(box.getCenter(new THREE.Vector3()));
      const pivot = new THREE.Group();
      pivot.add(model);
      scene.add(pivot);
      const dist = Math.max(dims.x, dims.y, dims.z) * 2.2;
      camera.position.set(0, dims.y * 0.12, dist);
      camera.lookAt(0, 0, 0);
      el.appendChild(renderer.domElement);
      setReady(true);

      // Drag to spin, with a little momentum; idle turn when untouched.
      let angle = 0, vel = 0, dragging = false, lastX = 0, raf = 0;
      const down = (e: PointerEvent) => { dragging = true; lastX = e.clientX; el.setPointerCapture(e.pointerId); };
      const move = (e: PointerEvent) => { if (!dragging) return; vel = (e.clientX - lastX) * 0.01; angle += vel; lastX = e.clientX; };
      const up = () => { dragging = false; };
      el.addEventListener("pointerdown", down);
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerup", up);
      el.addEventListener("pointercancel", up);
      const tick = () => {
        if (!dragging) { vel *= 0.94; angle += vel + 0.006; }
        pivot.rotation.y = angle;
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
        renderer.dispose();
        renderer.domElement.remove();
      };
    })().catch(() => { /* no WebGL or the file failed: the poster stays */ });
    return () => { dead = true; stop(); };
  }, []);

  return (
    <div ref={host} className={`relative aspect-square cursor-grab touch-pan-y active:cursor-grabbing ${className}`} aria-label="Bobo the duck in 3D. Drag to spin him." role="img">
      {!ready && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" className="absolute inset-0 h-full w-full object-contain" />
      )}
    </div>
  );
}
