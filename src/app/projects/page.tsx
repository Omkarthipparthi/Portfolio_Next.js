'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '@/content/data'
import { ProjectCard } from '@/components/project-card'
import { Section } from '@/components/section'
import { staggerContainer } from '@/lib/animations'

const allTags = Array.from(
  new Set(projects.flatMap((project) => project.tags))
).sort()

export default function ProjectsPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredProjects = selectedTag
    ? projects.filter((project) => project.tags.includes(selectedTag))
    : projects

  return (
    <div className="container">
      <Section>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <h1 className="text-4xl font-bold md:text-5xl">Projects</h1>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`rounded-full px-4 py-2 text-sm ${
                selectedTag === null
                  ? 'bg-brand-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`rounded-full px-4 py-2 text-sm ${
                  selectedTag === tag
                    ? 'bg-brand-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>
      </Section>
    </div>
  )
}

export const dynamic = 'error'
