'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeInUp } from '@/lib/animations'

type SectionProps = {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function Section({ children, className, delay = 0 }: SectionProps) {
  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay }}
      className={cn('py-16 md:py-24', className)}
    >
      {children}
    </motion.section>
  )
}
