import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ScrollProgress } from '@/components/scroll-progress'
import { JsonLd } from '@/components/json-ld'
import { generatePersonSchema } from '@/lib/schema'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-two-lime-88.vercel.app'),
  title: {
    default: 'Omkar Thipparthi - AI Full Stack Developer',
    template: '%s | Omkar Thipparthi',
  },
  description: 'AI Full Stack Developer specializing in Java, TypeScript, Python, and GenAI technologies. Building scalable web applications and AI-powered solutions.',
  keywords: ['AI Full Stack Developer', 'Java', 'TypeScript', 'Python', 'GenAI', 'Spring Boot', 'Angular', 'React', 'AWS'],
  authors: [{ name: 'Omkar Thipparthi' }],
  creator: 'Omkar Thipparthi',
  publisher: 'Omkar Thipparthi',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio-two-lime-88.vercel.app',
    siteName: 'Omkar Thipparthi - Portfolio',
    title: 'Omkar Thipparthi - AI Full Stack Developer',
    description: 'AI Full Stack Developer specializing in Java, TypeScript, Python, and GenAI technologies. Building scalable web applications and AI-powered solutions.',
    images: [
      {
        url: '/og/home.jpg',
        width: 1200,
        height: 630,
        alt: 'Omkar Thipparthi - AI Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Omkar Thipparthi - AI Full Stack Developer',
    description: 'AI Full Stack Developer specializing in Java, TypeScript, Python, and GenAI technologies. Building scalable web applications and AI-powered solutions.',
    images: ['/og/home.jpg'],
    creator: '@omkarthipparthi',
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  other: {
    'google-site-verification': 'your-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <ScrollProgress />
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <JsonLd
          data={generatePersonSchema([
            { name: 'GitHub', url: 'https://github.com/Omkarthipparthi' },
            { name: 'LinkedIn', url: 'https://linkedin.com/in/omkarthipparthi' },
            { name: 'Twitter', url: 'https://twitter.com/omkarthipparthi' },
          ])}
        />
      </body>
    </html>
  )
}

export const dynamic = 'error'
