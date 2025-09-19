'use client'

import { motion } from 'framer-motion'
import { AnimatedBackground } from '@/components/animated-background'
import { ProjectCarousel } from '@/components/project-carousel'
import { projects } from '@/content/data'
import { Section } from '@/components/section'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import dynamic from 'next/dynamic'

const EarthScene = dynamic(() => import('@/components/earth/EarthScene'), {
  ssr: false,
  loading: () => <div className="h-80">Loading globe…</div>,
})

export default function MainContent() {
  return (
    <>
      <AnimatedBackground />
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex min-h-[calc(100vh-16rem)] flex-col items-center justify-center gap-6 text-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-bold sm:text-5xl md:text-6xl"
          >
            Hi, I&apos;m{' '}
            <span className="bg-gradient-to-r from-brand-600 to-blue-600 bg-clip-text text-transparent">
              Omkar Thipparthi
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="max-w-[42rem] text-xl text-gray-600 dark:text-gray-300"
          >
            An AI Full Stack Developer building scalable web applications and GenAI-powered solutions
          </motion.p>
          <motion.div variants={fadeInUp} className="flex gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/projects"
              className="rounded-lg bg-brand-600 px-6 py-3 font-medium text-white hover:bg-brand-700"
            >
              View Projects
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="rounded-lg border border-gray-300 px-6 py-3 font-medium hover:border-brand-600 hover:text-brand-600 dark:border-gray-700"
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-6 mb-12"
        >
          <EarthScene className="mx-auto h-80 w-full max-w-3xl rounded-2xl border border-gray-200 dark:border-gray-800" />
        </motion.div>

        <Section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Check out some of my recent work
            </p>
          </div>
          <ProjectCarousel projects={projects.slice(0, 3)} />
        </Section>
      </div>
    </>
  )
}
