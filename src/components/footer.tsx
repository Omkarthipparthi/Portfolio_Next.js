'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import Link from 'next/link'

const socialLinks = [
  {
    href: 'https://github.com/Omkarthipparthi',
    icon: Github,
    label: 'GitHub',
  },
  {
    href: 'https://linkedin.com/in/omkarthipparthi',
    icon: Linkedin,
    label: 'LinkedIn',
  },
  {
    href: 'https://twitter.com/omkarthipparthi',
    icon: Twitter,
    label: 'Twitter',
  },
  {
    href: 'mailto:othipparthi@gmail.com',
    icon: Mail,
    label: 'Email',
  },
]

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 py-8 dark:border-gray-800">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Omkar Thipparthi. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors hover:text-brand-600 dark:text-gray-400"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
