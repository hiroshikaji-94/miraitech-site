'use client'

import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/FadeIn'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { FEATURED_PROJECTS } from '@/lib/data'

export function FeaturedProjects() {
  const projects = FEATURED_PROJECTS.slice(0, 4)

  return (
    <section className="py-20 md:py-28 relative border-t border-border/8">
      <Container>
        {/* Section header */}
        <FadeIn>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-12 md:mb-14">
            <div className="max-w-2xl">
              <span className="section-index block mb-3">02 — Work</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                Selected work
              </h2>
              <p className="mt-4 text-lg text-foreground-2 leading-relaxed">
                Production systems we&apos;ve designed, built, and shipped end to end.
              </p>
            </div>
            <Button href="/projects" variant="secondary" className="self-start sm:self-auto">
              All projects
              <ArrowRight size={15} />
            </Button>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" stagger={0.1}>
          {projects.map((project) => (
            <StaggerItem key={project.slug} className="h-full">
              <ProjectCard project={project} featured />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
