'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'

// Dynamically import components
const BlackHoleLanding = dynamic(() => import('@/components/black-hole-eht'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-black flex items-center justify-center text-white">
      Loading experience...
    </div>
  ),
})

const MainContent = dynamic(() => import('@/components/main-content'), {
  ssr: false,
})

export default function HomePage() {
  const [showBlackHole, setShowBlackHole] = useState(true)
  const [showMainContent, setShowMainContent] = useState(false)

  useEffect(() => {
    // Start transition after 12 seconds
    const timer = setTimeout(() => {
      setShowBlackHole(false)
      // Show main content after black hole fade out
      setTimeout(() => setShowMainContent(true), 1000)
    }, 12000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {showBlackHole && (
          <motion.div
            className="fixed inset-0 z-50"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <BlackHoleLanding onTransitionComplete={() => setShowBlackHole(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMainContent && (
          <motion.div
            className="min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <MainContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading state when neither component is ready */}
      {!showBlackHole && !showMainContent && (
        <div className="fixed inset-0 bg-black flex items-center justify-center text-white">
          <div className="text-2xl">Entering another dimension...</div>
        </div>
      )}
    </>
  )
}