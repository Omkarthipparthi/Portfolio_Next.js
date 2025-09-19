'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { type Project } from '@/content/data'
import Image from 'next/image'
import Link from 'next/link'

type ProjectCarouselProps = {
  projects: Project[]
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const controls = useAnimation()
  const constraintsRef = useRef<HTMLDivElement>(null)
  const autoplayRef = useRef<NodeJS.Timeout>()

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  }

  const navigate = useCallback(
    (direction: number) => {
      setCurrentIndex((prev) => {
        const next = prev + direction
        if (next >= projects.length) return 0
        if (next < 0) return projects.length - 1
        return next
      })
    },
    [projects.length]
  )

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigate(-1)
      if (e.key === 'ArrowRight') navigate(1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])

  // Autoplay
  useEffect(() => {
    const startAutoplay = () => {
      autoplayRef.current = setInterval(() => {
        navigate(1)
      }, 5000)
    }

    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }

    startAutoplay()

    return () => stopAutoplay()
  }, [navigate])

  const handleDragEnd = useCallback(
    (
      e: MouseEvent | TouchEvent | PointerEvent,
      { offset, velocity }: { offset: { x: number }; velocity: { x: number } }
    ) => {
      setIsDragging(false)

      if (Math.abs(velocity.x) > 500 || Math.abs(offset.x) > 100) {
        const direction = offset.x < 0 ? 1 : -1
        navigate(direction)
      } else {
        controls.start({ x: 0 })
      }
    },
    [controls, navigate]
  )

  const project = projects[currentIndex]

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <motion.div
        ref={constraintsRef}
        className="relative aspect-video cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence initial={false} custom={1}>
          <motion.div
            key={currentIndex}
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={project.images[0].src}
              alt={project.images[0].alt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <p className="mt-2 text-gray-200">{project.description}</p>
                {!isDragging && (
                  <Link
                    href={`/projects/${project.slug}`}
                    className="mt-4 inline-block rounded-lg bg-white px-6 py-3 font-medium text-gray-900 hover:bg-gray-100"
                  >
                    View Project
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/40"
        aria-label="Previous project"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={() => navigate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/40"
        aria-label="Next project"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 w-2 rounded-full transition-all ${
              i === currentIndex
                ? 'w-4 bg-white'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
