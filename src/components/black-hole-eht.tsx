'use client'

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

// GLSL Shaders from black_hole_landing_eht_style_react_three.jsx
const ringVertex = `
uniform float time;
varying vec2 vUv;
varying float vAngle;
void main() {
  vUv = uv;
  vAngle = atan(position.y, position.x);
  vec3 pos = position;
  // tiny turbulent wobble
  pos.x += 0.02 * sin(time * 0.6 + vAngle * 10.0);
  pos.y += 0.02 * cos(time * 0.6 + vAngle * 10.0);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const ringFragment = `
precision highp float;
uniform float time;
varying vec2 vUv;
varying float vAngle;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }

void main(){
  float radial = vUv.x;

  // thin, hot disk with soft edges
  float innerEdge = smoothstep(0.00, 0.10, radial);
  float outerEdge = 1.0 - smoothstep(0.86, 0.99, radial);
  float edge = innerEdge * outerEdge;

  // filaments & turbulence
  float fil = sin(vAngle * 30.0 + time * 1.2 + radial * 14.0);
  float grain = hash(vec2(radial * 3.0, vAngle * 0.5 + time * 0.2));
  float structure = 0.65 + 0.35 * fil + 0.15 * grain;

  // Relativistic Doppler beaming (approx): brighten approaching side, dim receding
  float beaming = 0.55 + 0.45 * clamp(cos(vAngle - 0.35), -1.0, 1.0);
  beaming = pow(beaming, 2.2);

  // Orangish-yellow false-color palette (EHT-like)
  vec3 cold = vec3(0.95, 0.48, 0.10); // deep orange
  vec3 hot  = vec3(1.0, 0.93, 0.58);  // pale yellow
  vec3 col = mix(cold, hot, clamp(structure * beaming, 0.0, 1.0));

  float intensity = edge * (1.2 + 0.2 * sin(time * 3.0));
  gl_FragColor = vec4(col * intensity * 1.35, edge);
}
`;

// Removed unused tunnel shaders

interface BlackHoleEHTProps {
  onTransitionComplete: () => void;
}

export default function BlackHoleEHT({ onTransitionComplete }: BlackHoleEHTProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    let renderer: THREE.WebGLRenderer;
    let animationId: number;

    const getSize = () => ({ w: mountRef.current!.clientWidth, h: mountRef.current!.clientHeight });

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    } catch (e) {
      setWebglOk(false);
      return;
    }

    const { w, h } = getSize();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(w, h, true);
    renderer.domElement.style.display = "block";
    mountRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 2000);
    camera.position.set(0, 0, 35);
    camera.lookAt(0, 0, 35);

    // === Background stars ===
    const starGeo = new THREE.BufferGeometry();
    const starCount = 3500;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 80 + Math.random() * 160;
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(theta);
      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    starGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    const starMat = new THREE.PointsMaterial({ size: 0.028, sizeAttenuation: true, color: 0xffffff, transparent: true, opacity: 0.75 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // === Black hole shadow core ===
    const coreMat = new THREE.MeshPhysicalMaterial({ color: 0x000000, roughness: 1.0, transmission: 0.0 });
    const bh = new THREE.Mesh(new THREE.SphereGeometry(1.12, 128, 128), coreMat);
    scene.add(bh);

    // subtle lensing halo
    const halo = new THREE.Mesh(
      new THREE.RingGeometry(1.18, 1.22, 256),
      new THREE.MeshBasicMaterial({ color: 0xffbb55, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false })
    );
    halo.rotateX(Math.PI / 2);
    scene.add(halo);

    // === Accretion disk (orangish-yellow, asymmetric brightness) ===
    const ringGeo = new THREE.RingGeometry(1.35, 3.05, 512, 1);
    ringGeo.rotateX(Math.PI / 2.2); // slight tilt
    const ringMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: ringVertex,
      fragmentShader: ringFragment,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.z = -0.05;
    scene.add(ring);

    // === Photon ring: thin bright arc from lensed light ===
    const photonGeo = new THREE.RingGeometry(1.05, 1.18, 320, 1);
    photonGeo.rotateX(Math.PI / 2.0);
    const photonMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.0, 0.78, 0.28), transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false });
    const photonRing = new THREE.Mesh(photonGeo, photonMat);
    photonRing.position.y = -0.25; // brighter lower arc
    scene.add(photonRing);

    // === Postprocessing ===
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 1.35, 0.6, 0.0);
    composer.addPass(bloomPass);

    // (Removed wormhole tunnel to keep only the orange black hole)

    // === Animation state ===
    const start = performance.now();
    let transitionTriggered = false;

    function animate(now: number) {
      const t = (now - start) / 1000;

      stars.rotation.z += 0.0004;
      ring.rotation.y += 0.001;

      ringMat.uniforms.time.value = t;

      // Approach animation only; tunnel removed
      const duration = 9.0;
      const u = Math.min(t / duration, 1.0);
      const ease = u < 0.5 ? 2.0 * u * u : -1.0 + (4.0 - 2.0 * u) * u;
      camera.position.z = 35 * (1.0 - ease) + 2.35 * ease;
      camera.fov = 60 + 12 * ease;
      camera.updateProjectionMatrix();

      // Still trigger transition at the same time, without showing a tunnel
      if (!transitionTriggered && t > 9.5) {
        transitionTriggered = true;
        onTransitionComplete();
      }

      composer.render();
      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!mountRef.current) return;
      const { w: nw, h: nh } = getSize();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(nw, nh, true);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      composer.setSize(nw, nh);
      bloomPass.setSize(nw, nh);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);

      composer?.dispose();
      renderer?.dispose?.();
      if (renderer?.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry?.dispose?.();
        if ((obj as THREE.Mesh).material) {
          if (Array.isArray((obj as THREE.Mesh).material)) {
            ((obj as THREE.Mesh).material as THREE.Material[]).forEach((m) => m.dispose?.());
          } else {
            ((obj as THREE.Mesh).material as THREE.Material).dispose?.();
          }
        }
      });
    };
  }, [onTransitionComplete]);

  return (
    <div ref={mountRef} className="fixed inset-0 bg-black">
      {!webglOk && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          Your browser doesn&apos;t support WebGL.
        </div>
      )}
    </div>
  );
}
