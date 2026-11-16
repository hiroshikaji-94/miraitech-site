import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ALL_PROJECTS } from '@/lib/data'
import { PROJECT_DETAILS } from '@/lib/project-details'

import { ProjectHero } from '@/components/sections/project-detail/ProjectHero'
import { ProjectContent } from '@/components/sections/project-detail/ProjectContent'
import { ProjectStack } from '@/components/sections/project-detail/ProjectStack'
import { ProjectArchitecture } from '@/components/sections/project-detail/ProjectArchitecture'
import { ProjectGallery } from '@/components/sections/project-detail/ProjectGallery'
import { ProjectChallenges } from '@/components/sections/project-detail/ProjectChallenges'
import { ProjectCTA } from '@/components/sections/project-detail/ProjectCTA'
import { ProjectNav } from '@/components/sections/project-detail/ProjectNav'

// ─── Static params for all known projects ────────────────────────

export function generateStaticParams() {
  return ALL_PROJECTS.map((p) => ({ slug: p.slug }))
}

// ─── Dynamic metadata ────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = ALL_PROJECTS.find((p) => p.slug === slug)

  if (!project) return { title: 'Project Not Found' }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.coverImage ? [{ url: project.coverImage }] : undefined,
    },
  }
}

// ─── Page ────────────────────────────────────────────────────────

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params

  const projectIndex = ALL_PROJECTS.findIndex((p) => p.slug === slug)
  const project = ALL_PROJECTS[projectIndex]
  const details = PROJECT_DETAILS[slug]

  if (!project || !details) notFound()

  // Prev / Next navigation
  const prev = projectIndex > 0 ? ALL_PROJECTS[projectIndex - 1] : null
  const next = projectIndex < ALL_PROJECTS.length - 1 ? ALL_PROJECTS[projectIndex + 1] : null

  return (
    <>
      <ProjectHero project={project} details={details} />
      <ProjectContent project={project} details={details} />
      <ProjectStack techChoices={details.techChoices} />
      <ProjectArchitecture architecture={details.architecture} />
      <ProjectGallery images={project.images ?? []} title={project.title} />
      <ProjectChallenges challenges={details.challenges} />
      <ProjectCTA />
      <ProjectNav prev={prev} next={next} />
    </>
  )
}
