import Image from 'next/image'
import { label, type ProjectData } from '@/lib/data'
import type { ProjectDetailContent } from '@/lib/project-details'
import { BackLink } from '@/components/ui/BackLink'
import { Container } from '@/components/ui/Container'
import { FactStrip } from '@/components/ui/FactStrip'

const STATUS = { live: 'In production', wip: 'In progress', archived: 'Archived' } as const

interface ProjectHeroProps {
  project: ProjectData
  details: ProjectDetailContent
}

export function ProjectHero({ project, details }: ProjectHeroProps) {
  const facts = [
    { term: 'Year',     value: project.year },
    { term: 'Duration', value: details.duration },
    { term: 'Type',     value: label(project.category) },
    {
      term:  'Status',
      value: (
        <span className="inline-flex items-center gap-2">
          {project.status === 'live' && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />}
          {STATUS[project.status]}
        </span>
      ),
    },
  ]

  return (
    <header className="relative overflow-hidden pt-32 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(ellipse_50%_60%_at_15%_0%,rgb(var(--color-accent)/0.07),transparent_70%)]"
      />
      <Container className="relative">
        <BackLink href="/projects">All work</BackLink>

        <p className="eyebrow mt-10">
          Case study · {label(project.category)}
        </p>
        <h1 className="heading-display mt-5 max-w-[20ch] text-[clamp(2.5rem,5.4vw,3.875rem)] text-foreground text-balance">
          {project.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-[1.7] text-foreground-2 text-pretty">{project.overview}</p>

        <FactStrip facts={facts} className="mt-10" />

        <div className="card mt-6 p-2">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[0.875rem] bg-surface-high">
            <Image
              src={project.coverImage}
              alt={`${project.title}, main screen`}
              fill
              loading="eager"
              fetchPriority="high"
              quality={90}
              sizes="(max-width: 1344px) 100vw, 1264px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </Container>
    </header>
  )
}
