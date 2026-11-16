'use client'

import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { FlowLines } from '@/components/ui/FlowLines'
import { GitBranch, ArrowDown } from 'lucide-react'
import type { ProjectDetailContent } from '@/lib/project-details'

interface ProjectArchitectureProps {
  architecture: ProjectDetailContent['architecture']
}

export function ProjectArchitecture({ architecture }: ProjectArchitectureProps) {
  const { description, steps } = architecture

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <FlowLines accent="blue" />
      <Container size="lg" className="relative z-10">
        <FadeIn>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-blue/10">
              <GitBranch size={15} className="text-accent-blue" />
            </div>
            <span className="text-sm font-semibold text-accent-blue uppercase tracking-wider">
              Architecture
            </span>
          </div>
          <p className="text-foreground-2 max-w-xl mb-10">
            {description}
          </p>
        </FadeIn>

        {/* ── Flow diagram ────────────────────────────────── */}
        <FadeIn delay={0.1}>
          <div className="relative max-w-2xl mx-auto">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {/* Step card */}
                <div className={cn(
                  'relative flex items-start gap-4 p-5 rounded-xl',
                  'bg-surface border border-border/10',
                  'hover:border-accent-blue/15 transition-colors duration-200',
                )}>
                  {/* Step number */}
                  <div className={cn(
                    'flex-shrink-0 w-10 h-10 rounded-xl',
                    'bg-gradient-to-br from-accent-blue/15 to-accent-violet/15',
                    'border border-accent-blue/10',
                    'flex items-center justify-center',
                    'text-sm font-bold font-mono text-accent-blue',
                  )}>
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div>
                    <h4 className="font-display font-semibold text-sm text-foreground mb-1">
                      {step.label}
                    </h4>
                    <p className="text-sm text-foreground-2 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector arrow */}
                {i < steps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <div className="flex flex-col items-center">
                      <div className="w-px h-3 bg-gradient-to-b from-accent-blue/30 to-accent-violet/30" />
                      <ArrowDown size={14} className="text-foreground-3 -mt-0.5" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
