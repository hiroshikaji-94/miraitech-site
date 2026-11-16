'use client'

import { Briefcase, Award, Rocket } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/FadeIn'
import { AmbientGlow } from '@/components/ui/AmbientGlow'

type TimelineType = 'work' | 'milestone' | 'growth'

interface TimelineEntry {
  type: TimelineType
  period: string
  title: string
  organization: string
  description: string
  highlights?: string[]
}

const iconMap: Record<TimelineType, React.ElementType> = {
  work: Briefcase,
  milestone: Award,
  growth: Rocket,
}

const colorMap: Record<TimelineType, string> = {
  work: 'bg-accent-blue/10 border-accent-blue/20 text-accent-blue',
  milestone: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400',
  growth: 'bg-accent-violet/10 border-accent-violet/20 text-accent-violet',
}

const dotColor: Record<TimelineType, string> = {
  work: 'bg-accent-blue border-accent-blue/30',
  milestone: 'bg-emerald-500 dark:bg-emerald-400 border-emerald-400/30',
  growth: 'bg-accent-violet border-accent-violet/30',
}

const timeline: TimelineEntry[] = [
  {
    type: 'growth',
    period: '2026 — Present',
    title: 'Agentic Systems in Production',
    organization: 'MiraiTech',
    description:
      'Agent infrastructure now runs daily inside client organizations — with evaluation and monitoring layers that catch regressions before users do. The team spends as much time on observability as on prompts.',
    highlights: ['Agent Infrastructure', 'Evaluation', 'Observability'],
  },
  {
    type: 'work',
    period: '2025',
    title: 'Multi-Agent Architectures',
    organization: 'MiraiTech',
    description:
      'Moved from single-model features to orchestrated multi-agent systems for support, sales, and internal tooling. Documented the review, testing, and handover practices that every engagement now follows.',
    highlights: ['Multi-Agent Systems', 'LLM Orchestration', 'Review Practice'],
  },
  {
    type: 'milestone',
    period: '2024',
    title: 'AI Lab & Longer Engagements',
    organization: 'MiraiTech',
    description:
      'Opened the AI Lab to keep research running alongside delivery, and signed the first multi-year partnership — a manufacturing client whose vision QA pipeline is still in production today.',
    highlights: ['AI Lab', 'Applied Research', 'Long-Term Partnerships'],
  },
  {
    type: 'work',
    period: '2023',
    title: 'First AI Product Shipped',
    organization: 'MiraiTech',
    description:
      'Released the first AI-powered product to real users: a bilingual support agent for a Japanese retailer. AI/ML and data engineering joined the full-stack practice for good.',
    highlights: ['First AI Product', 'RAG', 'Full-Stack + AI'],
  },
  {
    type: 'milestone',
    period: '2022',
    title: 'Founded in Tokyo',
    organization: 'MiraiTech',
    description:
      'Hiroshi Kaji and two engineers with web and data backgrounds started MiraiTech in Nakano, Tokyo — applying the same rigor they used for production web systems to AI.',
    highlights: ['Founded in Tokyo', 'Senior Engineers', 'Shared Standards'],
  },
]

export function Timeline() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-muted border-y border-border/8">
      <AmbientGlow preset="center-violet" intensity="subtle" />

      <Container className="relative z-10">
        <FadeIn className="mb-12 max-w-2xl">
          <span className="section-index block mb-3">TIMELINE</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            The MiraiTech journey
          </h2>
          <p className="mt-4 text-lg text-foreground-2 leading-relaxed">
            Key milestones that shaped the team and how we work with clients.
          </p>
        </FadeIn>

        <div className="max-w-3xl">
          <StaggerContainer className="relative" stagger={0.08}>
            {/* Vertical line */}
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border/10" />

            {timeline.map((entry, i) => {
              const Icon = iconMap[entry.type]
              return (
                <StaggerItem key={i}>
                  <div className="relative pl-14 pb-10 last:pb-0 group">
                    {/* Dot on timeline */}
                    <div className={cn(
                      'absolute left-[12px] top-1.5 w-[15px] h-[15px] rounded-full border-2',
                      dotColor[entry.type],
                    )}>
                      <div className={cn(
                        'absolute inset-0 rounded-full opacity-0 group-hover:opacity-100',
                        'transition-opacity duration-300',
                        dotColor[entry.type],
                        'blur-md',
                      )} />
                    </div>

                    {/* Card */}
                    <div className={cn(
                      'p-5 rounded-xl',
                      'bg-surface border border-border/10 shadow-card',
                      'transition-all duration-300',
                      'hover:border-border/15 hover:shadow-card',
                    )}>
                      {/* Header row */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <div className={cn(
                          'flex h-6 w-6 items-center justify-center rounded-md border',
                          colorMap[entry.type],
                        )}>
                          <Icon size={12} />
                        </div>
                        <span className="text-xs font-mono text-foreground-3">{entry.period}</span>
                      </div>

                      <h3 className="font-display font-semibold text-foreground">
                        {entry.title}
                      </h3>
                      <p className="text-sm text-foreground-3 mt-0.5">
                        {entry.organization}
                      </p>

                      <p className="text-sm text-foreground-2 leading-relaxed mt-3">
                        {entry.description}
                      </p>

                      {entry.highlights && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {entry.highlights.map((h) => (
                            <span
                              key={h}
                              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-surface-high text-foreground-3 border border-border/5"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  )
}
