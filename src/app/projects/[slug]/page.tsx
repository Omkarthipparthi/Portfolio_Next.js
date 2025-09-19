import { notFound } from 'next/navigation'
import Image from 'next/image'
import { projects } from '@/content/data'
import { Section } from '@/components/section'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}

  return {
    title: project.title,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  return (
    <div className="container">
      <Section>
        <div className="grid gap-12 lg:grid-cols-[2fr,1fr]">
          <div>
            <h1 className="text-4xl font-bold md:text-5xl">{project.title}</h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              {project.description}
            </p>
            <div className="mt-8 space-y-8">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={900}
                    height={600}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold">Project Details</h2>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="text-gray-500 dark:text-gray-400">Role</dt>
                  <dd className="mt-1">{project.role}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 dark:text-gray-400">Year</dt>
                  <dd className="mt-1">{project.year}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 dark:text-gray-400">Stack</dt>
                  <dd className="mt-2">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-brand-50 px-3 py-1 text-sm text-brand-600 dark:bg-brand-900/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Key Highlights</h2>
              <ul className="mt-4 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
            <div className="flex gap-4">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-brand-600 px-6 py-3 font-medium text-white hover:bg-brand-700"
                >
                  View Live
                </a>
              )}
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-gray-300 px-6 py-3 font-medium hover:border-brand-600 hover:text-brand-600 dark:border-gray-700"
                >
                  View Code
                </a>
              )}
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

export const dynamic = 'error'
