'use client'

import { useState } from 'react'
import { ALL_PROJECTS, PROJECT_FILTERS, label, type ProjectFilter } from '@/lib/data'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { Container } from '@/components/ui/Container'
import { FilterTabs } from '@/components/ui/FilterTabs'

const PROJECTS = [...ALL_PROJECTS].sort((a, b) => a.order - b.order)

const COUNTS = Object.fromEntries(
  PROJECT_FILTERS.map((filter) => [
    filter,
    filter === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.category === filter).length,
  ]),
) as Record<ProjectFilter, number>

export function ProjectGrid() {
  const [filter, setFilter] = useState<ProjectFilter>('All')
  const projects = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)

  return (
    <section className="border-t border-border/[0.07] bg-muted pb-20 pt-10 md:pb-28 md:pt-12">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <FilterTabs
            label="Filter projects by type"
            options={PROJECT_FILTERS}
            active={filter}
            onChange={setFilter}
            counts={COUNTS}
            format={label}
          />
          <p aria-live="polite" className="mono-label text-foreground-3">
            {projects.length} {projects.length === 1 ? 'project' : 'projects'}
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:mt-10 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} priority={i < 2} />
          ))}
        </div>
      </Container>
    </section>
  )
}
