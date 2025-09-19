'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export default function NotFound() {
  return (
    <div className="container">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6 text-center"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-4xl font-bold sm:text-5xl md:text-6xl"
        >
          404 - Page Not Found
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="max-w-[42rem] text-xl text-gray-600 dark:text-gray-300"
        >
          Sorry, the page you&apos;re looking for doesn&apos;t exist.
        </motion.p>
        <motion.div variants={fadeInUp}>
          <Link
            href="/"
            className="rounded-lg bg-brand-600 px-6 py-3 font-medium text-white hover:bg-brand-700"
          >
            Return Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
