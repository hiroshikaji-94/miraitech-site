import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ALL_PROJECTS } from '@/lib/data'
import { PROJECT_DETAILS } from '@/lib/project-details'
import { ProjectHero } from '@/components/sections/project-detail/ProjectHero'
import { ProjectBody } from '@/components/sections/project-detail/ProjectBody'
import { PrevNext } from '@/components/ui/PrevNext'

const PROJECTS = [...ALL_PROJECTS].sort((a, b) => a.order - b.order)

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.slug === slug)
  if (!project) return { title: 'Project not found' }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.coverImage }],
    },
  }
}

const link = (p: (typeof PROJECTS)[number] | undefined) =>
  p ? { href: `/projects/${p.slug}`, title: p.title } : null

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const index = PROJECTS.findIndex((p) => p.slug === slug)
  const project = PROJECTS[index]
  const details = PROJECT_DETAILS[slug]
  if (!project || !details) notFound()

  return (
    <article>
      <ProjectHero project={project} details={details} />
      <ProjectBody project={project} details={details} />
      <PrevNext
        label="More projects"
        noun="project"
        prev={link(PROJECTS[index - 1])}
        next={link(PROJECTS[index + 1])}
      />
    </article>
  )
}
