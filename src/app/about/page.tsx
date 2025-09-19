import type { Metadata } from 'next'
import { experiences, skills } from '@/content/data'
import { Section } from '@/components/section'
import { FeaturedTechnologies } from '@/components/featured-technologies'
import { ExperienceCards } from '@/components/experience-cards'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Omkar Thipparthi, an AI Full Stack Developer with expertise in modern web technologies, featured tools, and professional experience',
}

export default function AboutPage() {
  return (
    <div className="container">
      <Section>
        <h1 className="text-4xl font-bold md:text-5xl">About Me</h1>
        <div className="mt-8 space-y-8">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            I'm an AI Full Stack Developer with over 4 years of experience building scalable web applications
            and GenAI-powered solutions. Currently working at Ford Motor Company on high-performance visualization
            tools for EV programs, I specialize in Java, TypeScript, Python, and cloud-native architectures.
            I'm passionate about leveraging AI and modern web technologies to solve complex engineering challenges
            and create impactful software solutions.
          </p>

          <FeaturedTechnologies />

          <ExperienceCards />
        </div>
      </Section>
    </div>
  )
}

export const dynamic = 'error'
