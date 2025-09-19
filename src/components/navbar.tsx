'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.8)']
  )
  const backdropBlur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(8px)'])

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 border-b border-transparent"
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
      }}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Portfolio
        </Link>
        <nav className="flex items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'relative text-sm font-medium transition-colors hover:text-brand-600',
                pathname === href ? 'text-brand-600' : 'text-gray-600 dark:text-gray-300'
              )}
            >
              {label}
              {pathname === href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-brand-600"
                  animate
                />
              )}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </motion.header>
  )
}
