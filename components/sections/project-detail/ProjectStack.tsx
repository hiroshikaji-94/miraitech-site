'use client'

import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/FadeIn'
import { FlowLines } from '@/components/ui/FlowLines'
import { Cpu } from 'lucide-react'
import type { ProjectDetailContent } from '@/lib/project-details'

interface ProjectStackProps {
  techChoices: ProjectDetailContent['techChoices']
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  'Frontend':       { bg: 'bg-blue-500/8',    text: 'text-blue-600 dark:text-blue-400',    border: 'border-blue-500/10' },
  'Backend':        { bg: 'bg-emerald-500/8',  text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-500/10' },
  'AI / ML':        { bg: 'bg-violet-500/8',   text: 'text-violet-600 dark:text-violet-400',  border: 'border-violet-500/10' },
  'Infrastructure': { bg: 'bg-amber-500/8',    text: 'text-amber-700 dark:text-amber-400',   border: 'border-amber-500/10' },
  'Data':           { bg: 'bg-rose-500/8',     text: 'text-rose-600 dark:text-rose-400',    border: 'border-rose-500/10' },
}

export function ProjectStack({ techChoices }: ProjectStackProps) {
  return (
    <section className="py-16 md:py-20 border-y border-border/8 relative overflow-hidden">
      <FlowLines accent="mixed" />
      <Container className="relative z-10">
        <FadeIn>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-violet/10">
              <Cpu size={15} className="text-accent-violet" />
            </div>
            <span className="text-sm font-semibold text-accent-violet uppercase tracking-wider">
              Technical Decisions
            </span>
          </div>
          <p className="text-foreground-2 max-w-xl mb-10">
            Key technology choices and the reasoning behind each decision.
          </p>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          stagger={0.1}
        >
          {techChoices.map(({ tech, reason, category }) => {
            const color = categoryColors[category] || categoryColors['Backend']
            return (
              <StaggerItem key={tech}>
                <div className={cn(
                  'group p-5 rounded-xl h-full',
                  'bg-surface border border-border/8',
                  'hover:border-border/20 transition-colors duration-200',
                )}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-display font-semibold text-base text-foreground">
                      {tech}
                    </h4>
                    <span className={cn(
                      'text-[11px] font-semibold px-2 py-0.5 rounded-full border',
                      color.bg, color.text, color.border,
                    )}>
                      {category}
                    </span>
                  </div>
                  <p className="text-sm text-foreground-2 leading-relaxed">
                    {reason}
                  </p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </Container>
    </section>
  )
}
