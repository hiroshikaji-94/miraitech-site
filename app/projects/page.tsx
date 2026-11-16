import { ProjectsHeader } from '@/components/sections/projects/ProjectsHeader'
import { FeaturedShowcase } from '@/components/sections/projects/FeaturedShowcase'
import { ProjectGrid } from '@/components/sections/projects/ProjectGrid'

export const metadata = {
  title: 'Projects',
  description: 'A collection of production-grade AI agents, RAG systems, trading platforms, and developer tools.',
}

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHeader />
      <FeaturedShowcase />

      {/* Divider between featured and full grid */}
      <div className="w-full border-t border-border/8" />

      <ProjectGrid />
    </>
  )
}
