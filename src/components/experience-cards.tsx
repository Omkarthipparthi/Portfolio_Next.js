'use client'

import { motion } from 'framer-motion'
import { experiences } from '@/content/data'
import { MapPin, Calendar, Building, Code } from 'lucide-react'

const cardColors = [
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-green-500 to-teal-500',
  'from-orange-500 to-red-500'
]

export function ExperienceCards() {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Professional Experience</h2>
      <div className="grid gap-6">
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.company}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden`}
          >
            {/* Gradient border */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cardColors[index % cardColors.length]}`} />

            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {experience.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                  <Building className="h-4 w-4" />
                  <span className="font-medium">{experience.company}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{experience.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{experience.period}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <ul className="space-y-2">
                {experience.description.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${cardColors[index % cardColors.length]} mt-2 flex-shrink-0`} />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {experience.tech.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${cardColors[index % cardColors.length]} text-white shadow-sm`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
