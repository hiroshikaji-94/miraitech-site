'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight, ClipboardList, Code2, FlaskConical, Activity, Check,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { MeridianBackground } from '@/components/ui/MeridianBackground'
import { ease, easeDramatic } from '@/lib/motion'
import { ALL_PROJECTS, ALL_EXPERIMENTS } from '@/lib/data'
import { ALL_MEMBERS, LEAD } from '@/lib/team'
import { SITE } from '@/lib/site'

/* ─── Stats derived from content ─────────────────────────────── */

const STATS = [
  { value: `${ALL_PROJECTS.length}+`, label: 'Projects shipped' },
  {
    value: String(
      ALL_PROJECTS.filter((p) => p.category === 'AI' && p.status === 'live').length +
      ALL_EXPERIMENTS.filter((e) => e.status === 'live').length,
    ),
    label: 'AI systems live',
  },
  { value: '12+', label: 'Years of engineering' }, // combined senior experience
]

/* ─── How an engagement runs ─────────────────────────────────── */

const STEPS = [
  { icon: ClipboardList, title: 'Scope',    detail: 'Problem, data audit, success metrics', tag: 'Week 1' },
  { icon: Code2,         title: 'Build',    detail: 'Retrieval, agents, APIs and interface', tag: 'Weeks 2–8' },
  { icon: FlaskConical,  title: 'Evaluate', detail: 'Eval suites gate every deployment',     tag: 'In CI' },
  { icon: Activity,      title: 'Operate',  detail: 'Tracing, cost and latency alerts',      tag: 'Ongoing', live: true },
]

function DeliveryCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.35, ease: easeDramatic }}
      className="relative"
    >
      {/* Floating availability chip */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.1, ease }}
        className={cn(
          'absolute -top-4 right-6 z-10 inline-flex items-center gap-2',
          'rounded-full border border-emerald-500/20 bg-surface px-3 py-1.5 shadow-card',
          'text-xs font-medium text-emerald-700 dark:text-emerald-400',
        )}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
        {SITE.status}
      </motion.div>

      <div className="rounded-2xl border border-border/10 bg-surface shadow-float overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-5 sm:px-6 pt-6 pb-4">
          <div>
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.12em] text-accent-warm">
              How we deliver
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-foreground">
              From scope to production
            </p>
          </div>
          <span className="shrink-0 rounded-md border border-border/10 bg-surface-high px-2 py-1 font-mono text-[11px] font-medium text-foreground-2">
            JP / EN
          </span>
        </div>

        {/* Steps */}
        <ol className="relative px-5 sm:px-6 pb-2">
          {/* Connector line */}
          <span aria-hidden className="absolute left-[2.35rem] sm:left-[2.6rem] top-5 bottom-8 w-px bg-border/10" />
          {STEPS.map(({ icon: Icon, title, detail, tag, live }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.6 + i * 0.12, ease }}
              className="relative flex items-center gap-4 py-3"
            >
              <span className={cn(
                'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border',
                live
                  ? 'border-accent-warm/20 bg-accent-warm text-white shadow-sm'
                  : 'border-border/10 bg-surface text-accent-warm',
              )}>
                <Icon size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="text-sm text-foreground-3 leading-snug sm:truncate">{detail}</p>
              </div>
              <span className={cn(
                'shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
                live
                  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                  : 'bg-surface-high text-foreground-2',
              )}>
                {live ? (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                ) : (
                  <Check size={12} className="text-foreground-3" />
                )}
                {tag}
              </span>
            </motion.li>
          ))}
        </ol>

        {/* Team footer */}
        <div className="mt-2 flex items-center justify-between gap-4 border-t border-border/10 bg-muted px-5 sm:px-6 py-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex -space-x-2.5">
              {ALL_MEMBERS.map((m) => (
                <span
                  key={m.slug}
                  className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-surface bg-surface-high"
                >
                  {m.avatar && (
                    <Image src={m.avatar} alt={m.name} fill sizes="36px" className="object-cover" loading="eager" />
                  )}
                </span>
              ))}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">Senior engineers only</p>
              <p className="text-xs text-foreground-3">Led by {LEAD.name}</p>
            </div>
          </div>
          <Link
            href="/team"
            className="hidden sm:inline shrink-0 text-sm font-medium text-accent-warm hover:text-accent-violet transition-colors"
          >
            Meet the team
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Hero ───────────────────────────────────────────────────── */

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 lg:min-h-[88vh] lg:flex lg:items-center">
      <MeridianBackground intensity="strong" parallax={false} />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-16 xl:gap-24 items-center">
          {/* ── Copy ─────────────────────────────────────── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="inline-flex items-center gap-2.5 rounded-full border border-border/10 bg-surface/80 py-1 pl-1 pr-3.5 shadow-card backdrop-blur"
            >
              <span className="rounded-full bg-accent-warm/10 px-2.5 py-0.5 text-xs font-semibold text-accent-warm">
                {SITE.name}
              </span>
              <span className="text-xs font-medium text-foreground-2">
                AI-focused software engineering · Tokyo
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: easeDramatic }}
              className="mt-7 font-display text-[clamp(2.5rem,4.6vw,4rem)] font-bold leading-[1.04] tracking-[-0.03em] text-foreground"
            >
              AI systems that <br className="hidden md:block" />
              <span className="gradient-text">run in production.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-2 text-pretty"
            >
              {SITE.name} is a senior engineering team in Tokyo. We turn hard problems into
              systems that hold up under real traffic — retrieval pipelines, agent
              architectures, and the full-stack products and data platforms around them.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Button href="/contact" size="lg">
                Start a project
                <ArrowRight size={16} />
              </Button>
              <Button href="/projects" variant="secondary" size="lg">
                View our work
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-12 grid max-w-lg grid-cols-3 divide-x divide-border/10 border-t border-border/10 pt-6"
            >
              {STATS.map(({ value, label }, i) => (
                <div key={label} className={cn('flex flex-col-reverse', i > 0 && 'pl-5 sm:pl-6')}>
                  <dt className="mt-1 text-sm text-foreground-3 leading-snug">{label}</dt>
                  <dd className="font-display text-3xl font-bold tracking-tight text-foreground tabular-nums">
                    {value}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ── Visual ───────────────────────────────────── */}
          <div className="lg:pl-4">
            <DeliveryCard />
          </div>
        </div>
      </Container>
    </section>
  )
}
