'use client'

import { Sparkles } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/FadeIn'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
import { FEATURED_PROJECTS } from '@/lib/data'

export function FeaturedShowcase() {
  return (
    <section className="pb-16 md:pb-20 relative overflow-hidden">
      <AmbientGlow preset="warm-blue" intensity="gentle" />
      <Container className="relative z-10">
        {/* Section label */}
        <FadeIn className="flex items-center gap-2 mb-8">
          <Sparkles size={14} className="text-accent-blue" />
          <span className="text-sm font-semibold text-foreground-2 uppercase tracking-wider">
            Featured
          </span>
          <div className="h-px flex-1 bg-border/10" />
        </FadeIn>

        {/* Featured grid — 2 columns on desktop for larger cards */}
        <StaggerContainer
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6"
          stagger={0.12}
        >
          {FEATURED_PROJECTS.slice(0, 4).map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} featured />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
