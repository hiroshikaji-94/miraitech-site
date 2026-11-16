'use client'

import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/FadeIn'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
import { Target, Lightbulb, Zap, User } from 'lucide-react'
import type { ProjectData } from '@/lib/data'
import type { ProjectDetailContent } from '@/lib/project-details'

interface ProjectContentProps {
  project: ProjectData
  details: ProjectDetailContent
}

/* ─── Section label ──────────────────────────────────────────── */
function SectionLabel({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-blue/10">
        <Icon size={15} className="text-accent-blue" />
      </div>
      <span className="text-sm font-semibold text-accent-blue uppercase tracking-wider">
        {label}
      </span>
    </div>
  )
}

export function ProjectContent({ project, details }: ProjectContentProps) {
  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      <AmbientGlow preset="blue" intensity="whisper" />
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-16">

          {/* ── Sidebar (metadata) ─────────────────────────── */}
          <FadeIn className="lg:order-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Role */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground-3 mb-2">
                  Team Role
                </h3>
                <p className="text-sm text-foreground-2 leading-relaxed">
                  {details.role}
                </p>
              </div>

              {/* Duration */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground-3 mb-2">
                  Duration
                </h3>
                <p className="text-sm text-foreground-2">{details.duration}</p>
              </div>

              {/* Year */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground-3 mb-2">
                  Year
                </h3>
                <p className="text-sm text-foreground-2">{project.year}</p>
              </div>

              {/* Tech Stack list */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground-3 mb-3">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className={cn(
                        'text-[11px] font-medium px-2 py-1 rounded-md',
                        'bg-surface-high text-foreground-2',
                        'border border-border/8',
                      )}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="hidden lg:block h-px bg-border/10" />

              {/* Status */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground-3 mb-2">
                  Status
                </h3>
                <span className={cn(
                  'inline-flex items-center gap-1.5 text-sm font-medium',
                  project.status === 'live' ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400',
                )}>
                  <span className={cn(
                    'w-2 h-2 rounded-full',
                    project.status === 'live' ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-amber-500 dark:bg-amber-400',
                  )} />
                  {project.status === 'live' ? 'Live in Production' : 'In Progress'}
                </span>
              </div>
            </div>
          </FadeIn>

          {/* ── Main content ───────────────────────────────── */}
          <div className="lg:order-2 space-y-16">

            {/* Overview */}
            <FadeIn>
              <SectionLabel icon={User} label="Overview" />
              <p className="text-base text-foreground-2 leading-[1.8] max-w-prose">
                {project.overview}
              </p>
            </FadeIn>

            {/* The Challenge */}
            <FadeIn>
              <SectionLabel icon={Target} label="The Challenge" />
              <p className="text-base text-foreground-2 leading-[1.8] max-w-prose">
                {details.problem}
              </p>
            </FadeIn>

            {/* The Approach */}
            <FadeIn>
              <SectionLabel icon={Lightbulb} label="The Approach" />
              <p className="text-base text-foreground-2 leading-[1.8] max-w-prose">
                {details.solution}
              </p>
            </FadeIn>

            {/* Key Features */}
            <div>
              <FadeIn>
                <SectionLabel icon={Zap} label="Key Features" />
              </FadeIn>

              <StaggerContainer
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2"
                stagger={0.08}
              >
                {details.features.map((feature, i) => (
                  <StaggerItem key={i}>
                    <div className={cn(
                      'p-5 rounded-xl h-full',
                      'bg-surface border border-border/10 shadow-card',
                      'hover:border-accent-blue/15 transition-colors duration-200',
                    )}>
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 mt-1 w-6 h-6 rounded-md bg-accent-blue/10 text-accent-blue text-xs font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <div>
                          <h4 className="font-display font-semibold text-sm text-foreground mb-1.5">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-foreground-2 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

          </div>
        </div>
      </Container>
    </section>
  )
}
