'use client'

import React, { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

type Props = {
  className?: string
}

function Pin({ lat = 39.7783, lng = -119.4179, radius, center }:{ lat?: number; lng?: number; radius?: number; center?: THREE.Vector3 | null }) {
  // Convert lat/lng to 3D coordinates on sphere of radius 1 using standard formula
  // phi = (90 - lat), theta = (lng + 180)
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)

  // Standard mapping
  const sinPhi = Math.sin(phi)
  const xUnit = sinPhi * Math.cos(theta)
  const yUnit = Math.cos(phi)
  const zUnit = sinPhi * Math.sin(theta)

  // Use provided radius (bounding sphere) if available, otherwise fall back
  const globeRadius = (radius && radius > 0) ? radius : 0.8
  const offset = 0.02
  const x = xUnit * (globeRadius + offset)
  const y = yUnit * (globeRadius + offset)
  const z = zUnit * (globeRadius + offset)

  // Read CSS accent color
  let accent = 'rgb(99,92,255)'
  try {
    const root = typeof window !== 'undefined' ? window.getComputedStyle(document.documentElement) : null
    if (root) {
      const val = root.getPropertyValue('--accent') || ''
      if (val) accent = `rgb(${val.trim()})`
      else {
        const hex = root.getPropertyValue('--accent-hex')
        if (hex) accent = hex.trim()
      }
    }
  } catch (e) {
    // ignore
  }

  const groupRef = React.useRef<THREE.Group | null>(null)
  React.useEffect(() => {
    if (groupRef.current) {
      // Orient the pin so it points outward from globe center
      if (center) groupRef.current.lookAt(center)
      else groupRef.current.lookAt(0, 0, 0)
      groupRef.current.rotateX(Math.PI)
    }
  }, [])

  return (
    <group ref={groupRef} position={[x, y, z] as unknown as [number, number, number]}>
      <mesh>
        <coneGeometry args={[0.015, 0.08, 12]} />
        <meshStandardMaterial color={accent} />
      </mesh>
      <mesh position={[0, -0.04, 0]}>
        <sphereGeometry args={[0.016, 12, 12]} />
        <meshStandardMaterial color={accent} />
      </mesh>
    </group>
  )
}

function Globe() {
  const ref = useRef<THREE.Group | null>(null)
  // Load the provided low-poly glTF
  const gltf = useGLTF('/og/low_poly_earth.gltf') as any
  const radiusRef = useRef<number>(0)
  const centerRef = useRef<THREE.Vector3 | null>(null)

  // compute bounding sphere once
  React.useEffect(() => {
    if (!gltf) return
    try {
      const box = new THREE.Box3().setFromObject(gltf.scene)
      const sphere = box.getBoundingSphere(new THREE.Sphere())
      radiusRef.current = sphere.radius
      centerRef.current = sphere.center
    } catch (e) {
      // fallback radius
      radiusRef.current = 0.8
      centerRef.current = new THREE.Vector3(0, 0, 0)
    }
  }, [gltf])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.12
  })

  return (
    <group ref={ref} scale={[1.2, 1.2, 1.2]}>
      {gltf && <primitive object={gltf.scene || gltf.scene} />}
      {/* Attach pin as child so it follows model transforms and orientation */}
      <Pin
        // pass computed radius so Pin positions itself using model bounds
        // default lat/lng will place it in California
        lat={36.7783}
        lng={-119.4179}
      />
    </group>
  )
}

export function EarthScene({ className }: Props) {
  // Respect reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className={className}>
      {prefersReducedMotion ? (
        <div className="flex h-80 items-center justify-center">3D globe disabled (reduced motion)</div>
      ) : (
        <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 3, 5]} intensity={0.8} />
          <Suspense fallback={<Html>Loading globe...</Html>}>
            <Globe />
            <Pin />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
        </Canvas>
      )}
    </div>
  )
}

export default EarthScene
