import type { Metadata } from 'next'
import { ALL_PROJECTS } from '@/lib/data'
import { PageHeader } from '@/components/ui/PageHeader'
import { ProjectGrid } from '@/components/sections/projects/ProjectGrid'

const years = ALL_PROJECTS.map((p) => p.year)
const firstYear = Math.min(...years)
const lastYear = Math.max(...years)

export const metadata: Metadata = {
  title: 'Work',
  description: 'Case studies from MiraiTech in Tokyo: document search, support agents, factory inspection, automation and the web apps around them.',
}

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case studies"
        title="Work we have shipped."
        intro={
          <p>
            Projects from {firstYear} to {lastYear}, all running in production. Each case study covers
            the problem, what we built, the decisions behind it and what went wrong along the way.
          </p>
        }
      />
      <ProjectGrid />
    </>
  )
}
