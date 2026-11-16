'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  CircleDot,
  FlaskConical,
  Microscope,
  Lightbulb,
  Cpu,
  GitBranch,
  BarChart3,
  ShieldAlert,
  AlertTriangle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/FadeIn'
import { CTAPanel } from '@/components/ui/CTAPanel'
import type { ExperimentData } from '@/lib/data'
import type { ExperimentDetailContent } from '@/lib/experiment-details'

const ease = [0.21, 0.47, 0.32, 0.98] as const

interface Props {
  experiment: ExperimentData
  details: ExperimentDetailContent
  prev: ExperimentData | null
  next: ExperimentData | null
}

/* ─── Section label (reusable) ─────────────────────────────────── */

function SectionLabel({ icon: Icon, label, color = 'text-accent-blue', bg = 'bg-accent-blue/10' }: {
  icon: React.ElementType
  label: string
  color?: string
  bg?: string
}) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg', bg)}>
        <Icon size={15} className={color} />
      </div>
      <span className={cn('text-sm font-semibold uppercase tracking-wider', color)}>
        {label}
      </span>
    </div>
  )
}

/* ─── Main component ──────────────────────────────────────────── */

export function ExperimentDetailClient({ experiment, details, prev, next }: Props) {
  const statusConfig = {
    live:      { label: 'Live',      color: 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10' },
    research:  { label: 'Research',  color: 'text-violet-600 dark:text-violet-400 bg-violet-500/10' },
  }[experiment.status]

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════ */}
      <section className="relative pt-28 md:pt-36 pb-12 md:pb-16">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/[0.03] via-transparent to-transparent pointer-events-none" />

        <Container className="relative z-10">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <Button href="/ai-lab" variant="ghost" size="sm" className="mb-6">
              <ArrowLeft size={14} />
              AI Lab
            </Button>
          </motion.div>

          {/* Meta badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease }}
            className="flex flex-wrap items-center gap-2 mb-4"
          >
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/10">
              {experiment.category}
            </span>
            <span className={cn('text-[11px] font-semibold px-2.5 py-1 rounded-full', statusConfig.color)}>
              <CircleDot size={10} className="inline mr-1 -mt-px" />
              {statusConfig.label}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-balance leading-[1.15] max-w-3xl"
          >
            {experiment.title}
          </motion.h1>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
            className="mt-4 text-lg text-foreground-2 max-w-2xl leading-relaxed text-pretty"
          >
            {experiment.description}
          </motion.p>

          {/* Models + Metrics row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {experiment.models.map((m) => (
              <span
                key={m}
                className="text-sm font-medium px-3 py-1.5 rounded-lg bg-accent-violet/10 text-accent-violet border border-accent-violet/10"
              >
                {m}
              </span>
            ))}
          </motion.div>

          {experiment.metrics && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25, ease }}
              className="mt-3 flex flex-wrap gap-2"
            >
              {experiment.metrics.map((h) => (
                <span
                  key={h}
                  className="text-sm font-medium px-3 py-1.5 rounded-lg bg-surface border border-border/10 text-foreground-2"
                >
                  {h}
                </span>
              ))}
            </motion.div>
          )}

          {/* Links */}
          {(experiment.github || experiment.liveUrl) && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease }}
              className="mt-6 flex flex-wrap gap-3"
            >
              {experiment.github && (
                <Button href={experiment.github} variant="secondary" size="sm">
                  Source Code
                </Button>
              )}
              {experiment.liveUrl && (
                <Button href={experiment.liveUrl} variant="secondary" size="sm">
                  Live Demo
                </Button>
              )}
            </motion.div>
          )}
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════
          OVERVIEW + SIDEBAR
      ════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-16">

            {/* Sidebar */}
            <FadeIn className="lg:order-1">
              <div className="lg:sticky lg:top-24 space-y-6">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground-3 mb-2">
                    Category
                  </h3>
                  <p className="text-sm text-foreground-2">{experiment.category}</p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground-3 mb-2">
                    Status
                  </h3>
                  <span className={cn(
                    'inline-flex items-center gap-1.5 text-sm font-medium',
                    experiment.status === 'live' ? 'text-emerald-700 dark:text-emerald-400' : 'text-violet-600 dark:text-violet-400',
                  )}>
                    <span className={cn(
                      'w-2 h-2 rounded-full',
                      experiment.status === 'live' ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-violet-500 dark:bg-violet-400',
                    )} />
                    {statusConfig.label}
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground-3 mb-3">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {experiment.stack.map((tech) => (
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

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground-3 mb-3">
                    Models
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {experiment.models.map((model) => (
                      <span
                        key={model}
                        className={cn(
                          'text-[11px] font-medium px-2 py-1 rounded-md',
                          'bg-accent-violet/10 text-accent-violet',
                          'border border-accent-violet/10',
                        )}
                      >
                        {model}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hidden lg:block h-px bg-border/10" />
              </div>
            </FadeIn>

            {/* Main content */}
            <div className="lg:order-2 space-y-16">

              {/* Overview */}
              <FadeIn>
                <SectionLabel icon={FlaskConical} label="Overview" />
                <p className="text-base text-foreground-2 leading-[1.8] max-w-prose">
                  {details.overview}
                </p>
              </FadeIn>

              {/* Methodology */}
              <FadeIn>
                <SectionLabel icon={Microscope} label="Methodology" />
                <p className="text-base text-foreground-2 leading-[1.8] max-w-prose">
                  {details.methodology}
                </p>
              </FadeIn>

              {/* Tech Stack Description */}
              <FadeIn>
                <SectionLabel icon={Cpu} label="Tech Stack" />
                <p className="text-base text-foreground-2 leading-[1.8] max-w-prose">
                  {details.techStack}
                </p>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════
          KEY FINDINGS
      ════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20">
        <Container>
          <FadeIn>
            <SectionLabel icon={Lightbulb} label="Key Findings" />
            <p className="text-foreground-2 max-w-xl mb-10">
              The most important insights from this experiment.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4" stagger={0.08}>
            {details.keyFindings.map((finding, i) => (
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
                        {finding.title}
                      </h4>
                      <p className="text-sm text-foreground-2 leading-relaxed">
                        {finding.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════
          ARCHITECTURE
      ════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20">
        <Container size="lg">
          <FadeIn>
            <SectionLabel icon={GitBranch} label="Architecture" />
            <p className="text-base text-foreground-2 leading-[1.8] max-w-prose">
              {details.architecture}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════
          RESULTS
      ════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20">
        <Container>
          <FadeIn>
            <SectionLabel icon={BarChart3} label="Results" />
            <p className="text-base text-foreground-2 leading-[1.8] max-w-prose">
              {details.results}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CHALLENGES
      ════════════════════════════════════════════════════════════ */}
      {details.challenges.length > 0 && (
        <section className="py-16 md:py-20">
          <Container>
            <FadeIn>
              <SectionLabel
                icon={ShieldAlert}
                label="Challenges"
                color="text-amber-700 dark:text-amber-400"
                bg="bg-amber-500/10"
              />
              <p className="text-foreground-2 max-w-xl mb-10">
                Key technical challenges encountered during this experiment.
              </p>
            </FadeIn>

            <StaggerContainer className="space-y-4" stagger={0.1}>
              {details.challenges.map((challenge, i) => (
                <StaggerItem key={i}>
                  <div className={cn(
                    'p-6 rounded-xl',
                    'bg-surface border border-border/10 shadow-card',
                    'hover:border-border/15 transition-colors duration-200',
                  )}>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle size={14} className="text-amber-700 dark:text-amber-400" />
                      <span className="text-xs font-bold text-foreground-3 uppercase tracking-widest">
                        Challenge {i + 1}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-2">
                      {challenge.title}
                    </h3>
                    <p className="text-sm text-foreground-2 leading-relaxed">
                      {challenge.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Container>
        </section>
      )}

      <CTAPanel
        eyebrow="Next"
        title="Want research like this"
        highlight="turned into a product?"
        description="We run experiments like this to inform client work, then build the production version with the evaluation and monitoring it needs."
        actions={[
          { label: 'Start a conversation', href: '/contact' },
          { label: 'More experiments',     href: '/ai-lab', variant: 'secondary' },
        ]}
      />

      {/* ════════════════════════════════════════════════════════════
          EXPERIMENT NAVIGATION
      ════════════════════════════════════════════════════════════ */}
      {(prev || next) && (
        <section className="py-12 md:py-16 border-t border-border/8">
          <Container>
            <FadeIn>
              <div className={cn(
                'grid gap-4',
                prev && next ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-md',
                !prev && next && 'ml-auto',
              )}>
                {prev && <ExperimentNavCard experiment={prev} direction="prev" />}
                {next && <ExperimentNavCard experiment={next} direction="next" />}
              </div>
            </FadeIn>
          </Container>
        </section>
      )}
    </>
  )
}

/* ─── Nav card ────────────────────────────────────────────────── */

function ExperimentNavCard({
  experiment,
  direction,
}: {
  experiment: ExperimentData
  direction: 'prev' | 'next'
}) {
  const isPrev = direction === 'prev'

  return (
    <Link
      href={`/ai-lab/${experiment.slug}`}
      className={cn(
        'group flex items-center gap-4 p-4 rounded-xl',
        'bg-surface border border-border/10 shadow-card',
        'hover:border-accent-blue/20 hover:shadow-card-hover',
        'transition-all duration-300',
        isPrev ? 'flex-row' : 'flex-row-reverse text-right',
      )}
    >
      {/* Arrow */}
      <div className={cn(
        'flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg',
        'bg-surface-high border border-border/10',
        'group-hover:bg-accent-blue/10 group-hover:border-accent-blue/15',
        'transition-colors duration-200',
      )}>
        {isPrev
          ? <ArrowLeft size={16} className="text-foreground-3 group-hover:text-accent-blue transition-colors" />
          : <ArrowRight size={16} className="text-foreground-3 group-hover:text-accent-blue transition-colors" />
        }
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-3">
          {isPrev ? 'Previous' : 'Next'} Experiment
        </span>
        <h4 className={cn(
          'font-display font-semibold text-sm mt-0.5 truncate',
          'text-foreground group-hover:text-accent-blue transition-colors duration-200',
        )}>
          {experiment.title}
        </h4>
      </div>
    </Link>
  )
}
