'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { Section } from '@/components/section'

const socialLinks = [
  {
    name: 'Email',
    href: 'mailto:othipparthi@gmail.com',
    icon: Mail,
    color: 'text-red-600',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/Omkarthipparthi',
    icon: Github,
    color: 'text-gray-900 dark:text-white',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/omkarthipparthi',
    icon: Linkedin,
    color: 'text-blue-600',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/omkarthipparthi',
    icon: Twitter,
    color: 'text-sky-500',
  },
]

export default function ContactPage() {
  const [copied, setCopied] = useState(false)
  const email = 'othipparthi@gmail.com'

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container">
      <Section>
        <h1 className="text-4xl font-bold md:text-5xl">Get in Touch</h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          I&apos;m always open to discussing new projects, opportunities, or just having
          a chat about technology and development.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Contact Details</h2>
            <div className="mt-6 space-y-6">
              {socialLinks.map(({ name, href, icon: Icon, color }) => (
                <motion.a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition-colors hover:border-brand-600 dark:border-gray-800"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className={`h-6 w-6 ${color}`} />
                  <span className="font-medium">{name}</span>
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Quick Email</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Click the button below to copy my email address.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={copyEmail}
              className="mt-4 w-full rounded-lg border border-gray-200 p-4 text-left transition-colors hover:border-brand-600 dark:border-gray-800"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{email}</span>
                <span className="text-sm text-gray-500">
                  {copied ? 'Copied!' : 'Click to copy'}
                </span>
              </div>
            </motion.button>
            <p className="mt-4 text-sm text-gray-500">
              Your privacy is important. This form doesn&apos;t store any data.
            </p>
          </div>
        </div>
      </Section>
    </div>
  )
}

export const dynamic = 'error'
