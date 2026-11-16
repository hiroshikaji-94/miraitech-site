import { ProjectsHeader } from '@/components/sections/projects/ProjectsHeader'
import { ProjectGrid } from '@/components/sections/projects/ProjectGrid'

export const metadata = {
  title: 'Projects',
  description: 'Production engagements from the MiraiTech team in Tokyo: AI agents, enterprise RAG, computer vision, real-time platforms, and developer tools.',
}

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHeader />
      <ProjectGrid />
    </>
  )
}
