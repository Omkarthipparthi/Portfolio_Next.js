'use client'

import { motion } from 'framer-motion'
import { cardTiltHover } from '@/lib/animations'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { type Project } from '@/content/data'

type ProjectCardProps = {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <motion.article
      whileHover="hover"
      variants={cardTiltHover}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900',
        className
      )}
    >
      <div className="aspect-video overflow-hidden rounded-lg">
        <Image
          src={project.images[0].src}
          alt={project.images[0].alt}
          width={600}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <span className="text-sm text-gray-500">{project.year}</span>
        </div>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-brand-50 px-3 py-1 text-sm text-brand-600 dark:bg-brand-900/20"
            >
              {tech}
            </span>
          ))}
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-4 inline-block text-brand-600 hover:underline"
        >
          View Project →
        </Link>
      </div>
    </motion.article>
  )
}
