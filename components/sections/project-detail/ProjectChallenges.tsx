'use client'

import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/FadeIn'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
import { ShieldAlert, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react'
import type { ProjectDetailContent } from '@/lib/project-details'

interface ProjectChallengesProps {
  challenges: ProjectDetailContent['challenges']
}

export function ProjectChallenges({ challenges }: ProjectChallengesProps) {
  if (!challenges.length) return null

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <AmbientGlow preset="warm" intensity="whisper" />
      <Container className="relative z-10">
        <FadeIn>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
              <ShieldAlert size={15} className="text-amber-700 dark:text-amber-400" />
            </div>
            <span className="text-sm font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              Challenges &amp; Learnings
            </span>
          </div>
          <p className="text-foreground-2 max-w-xl mb-10">
            Key technical challenges the team faced and how we solved them.
          </p>
        </FadeIn>

        <StaggerContainer className="space-y-6" stagger={0.12}>
          {challenges.map((challenge, i) => (
            <StaggerItem key={i}>
              <div className={cn(
                'rounded-xl overflow-hidden',
                'bg-surface border border-border/8',
                'hover:border-border/15 transition-colors duration-200',
              )}>
                {/* Header */}
                <div className="px-6 pt-6 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-foreground-3 uppercase tracking-widest">
                      Challenge {i + 1}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground">
                    {challenge.title}
                  </h3>
                </div>

                {/* Content grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/8">
                  {/* Problem */}
                  <div className="bg-surface p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle size={14} className="text-rose-600 dark:text-rose-400" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                        Problem
                      </span>
                    </div>
                    <p className="text-sm text-foreground-2 leading-relaxed">
                      {challenge.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="bg-surface p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 size={14} className="text-accent-blue" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-accent-blue">
                        Solution
                      </span>
                    </div>
                    <p className="text-sm text-foreground-2 leading-relaxed">
                      {challenge.solution}
                    </p>
                  </div>

                  {/* Outcome */}
                  <div className="bg-surface p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp size={14} className="text-emerald-700 dark:text-emerald-400" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        Outcome
                      </span>
                    </div>
                    <p className="text-sm text-foreground-2 leading-relaxed font-medium">
                      {challenge.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
