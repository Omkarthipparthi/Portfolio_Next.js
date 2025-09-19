'use client'

import { motion } from 'framer-motion'
import { skills } from '@/content/data'
import { Palette, Zap, Sparkles, Database, Server, Code, Cpu, Globe } from 'lucide-react'

const getTechIcon = (category: string) => {
  switch (category) {
    case 'languages': return Code
    case 'frontend': return Palette
    case 'backend': return Server
    case 'databases': return Database
    case 'devops & tools': return Globe
    case 'blockchain': return Cpu
    case 'ai & ml': return Zap
    default: return Sparkles
  }
}

const categoryColors = {
  languages: 'from-blue-500 to-cyan-500',
  frontend: 'from-purple-500 to-pink-500',
  backend: 'from-green-500 to-teal-500',
  databases: 'from-orange-500 to-red-500',
  'devops & tools': 'from-indigo-500 to-purple-500',
  blockchain: 'from-yellow-500 to-orange-500',
  'ai & ml': 'from-pink-500 to-rose-500',
  other: 'from-gray-500 to-slate-500'
}

export function FeaturedTechnologies() {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Tech Stack</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {(Object.keys(skills) as Array<keyof typeof skills>).map((category, index) => {
          const IconComponent = getTechIcon(category)
          const color = categoryColors[category] || categoryColors.other

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${color} mb-4`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white capitalize">
                {category.replace(' & ', ' & ')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills[category].map((tech) => (
                  <span
                    key={tech}
                    className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${color} text-white`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
