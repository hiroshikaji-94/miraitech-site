import { FEATURED_PROJECTS } from '@/lib/data'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { ArrowLink } from '@/components/ui/ArrowLink'
import { Section, SectionIntro } from '@/components/ui/Section'

export function SelectedWork() {
  return (
    <Section tone="muted" labelledBy="work-title">
      <SectionIntro
        id="work-title"
        eyebrow="Recent work"
        title="Recent projects, all in production."
        action={<ArrowLink href="/projects">All case studies</ArrowLink>}
      />
      <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2">
        {FEATURED_PROJECTS.slice(0, 4).map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  )
}
