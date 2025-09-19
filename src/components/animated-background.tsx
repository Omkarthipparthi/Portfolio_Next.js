'use client'

import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Particle = {
  x: number
  y: number
  size: number
  color: string
  speed: number
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * (3 - 1) + 1,
    color: `rgba(${Math.random() * 50 + 150}, ${Math.random() * 50 + 150}, 255, ${
      Math.random() * 0.3 + 0.1
    })`,
    speed: Math.random() * (0.15 - 0.05) + 0.05,
  }))
}

export function AnimatedBackground() {
  const shouldReduceMotion = useReducedMotion()
  const particles = useRef<Particle[]>(generateParticles(20))

  useEffect(() => {
    if (shouldReduceMotion) return
    
    const interval = setInterval(() => {
      particles.current = particles.current.map((particle) => ({
        ...particle,
        y: particle.y - particle.speed,
        x: particle.x + Math.sin(particle.y * 0.1) * 0.2,
      })).map((particle) => 
        particle.y < -10 ? { ...particle, y: 110 } : particle
      )
    }, 1000 / 60)

    return () => clearInterval(interval)
  }, [shouldReduceMotion])

  if (shouldReduceMotion) {
    return (
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-brand-50 dark:from-gray-950 dark:to-gray-900" />
      </div>
    )
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-brand-50 dark:from-gray-950 dark:to-gray-900" />
      <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_50%,rgba(99,92,255,0.1),transparent)] dark:bg-[radial-gradient(40%_40%_at_50%_50%,rgba(99,92,255,0.05),transparent)]" />
      {particles.current.map((particle, i) => (
        <motion.div
          key={i}
          animate={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
          }}
          transition={{
            duration: 0,
            ease: 'linear',
          }}
          className="absolute"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: '50%',
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  )
}
