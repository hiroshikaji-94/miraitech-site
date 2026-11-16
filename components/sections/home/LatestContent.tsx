'use client'

import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/FadeIn'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
import { FlowLines } from '@/components/ui/FlowLines'
import { LATEST_POSTS, LATEST_EXPERIMENTS } from '@/lib/data'
import { formatDate } from '@/lib/utils'

/* ─── Blog Card ──────────────────────────────────────────────── */

function BlogPreviewCard({
  slug,
  title,
  summary,
  category,
  publishedAt,
  readingTime,
}: (typeof LATEST_POSTS)[number]) {
  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        'group block py-5 border-b border-border/6',
        'transition-colors duration-200',
        'hover:bg-surface/30',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 mb-1.5">
            <span className="text-[11px] font-mono text-accent-warm uppercase tracking-wider">
              {category}
            </span>
            <span className="text-[11px] font-mono text-foreground-3">
              {formatDate(publishedAt)}
            </span>
          </div>
          <h3 className={cn(
            'font-display font-semibold text-base leading-snug',
            'text-foreground group-hover:text-accent-warm transition-colors duration-200',
          )}>
            {title}
          </h3>
          <p className="text-sm text-foreground-2 leading-relaxed line-clamp-1 mt-1">
            {summary}
          </p>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono text-foreground-3 flex-shrink-0 mt-1">
          <Clock size={10} />
          {readingTime}m
        </div>
      </div>
    </Link>
  )
}

/* ─── Experiment Card ────────────────────────────────────────── */

function ExperimentPreviewCard({
  slug,
  title,
  summary,
  status,
  stack,
}: (typeof LATEST_EXPERIMENTS)[number]) {
  return (
    <Link
      href={`/ai-lab/${slug}`}
      className={cn(
        'group block py-5 border-b border-border/6',
        'transition-colors duration-200',
        'hover:bg-surface/30',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 mb-1.5">
            <span className="text-[11px] font-mono text-accent-blue uppercase tracking-wider">
              Experiment
            </span>
            <span className={cn(
              'text-[11px] font-mono px-1.5 py-0.5',
              status === 'live'
                ? 'text-emerald-700 dark:text-emerald-400'
                : 'text-amber-700 dark:text-amber-400',
            )}>
              {status}
            </span>
          </div>
          <h3 className={cn(
            'font-display font-semibold text-base leading-snug',
            'text-foreground group-hover:text-accent-blue transition-colors duration-200',
          )}>
            {title}
          </h3>
          <p className="text-sm text-foreground-2 leading-relaxed line-clamp-1 mt-1">
            {summary}
          </p>
        </div>
        <div className="flex flex-wrap gap-1 flex-shrink-0 mt-1">
          {stack.slice(0, 2).map((tech) => (
            <span key={tech} className="text-[11px] font-mono text-foreground-3 px-1.5 py-0.5 border border-border/8">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

/* ─── Section ────────────────────────────────────────────────── */

export function LatestContent() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Dual glow — warm left (Journal), blue right (Lab) */}
      <AmbientGlow preset="warm-blue" intensity="subtle" />
      {/* Subtle flow lines — very low opacity, adds depth */}
      <FlowLines accent="mixed" />

      <Container className="relative z-10">
        <FadeIn>
          <div className="mb-14">
            <span className="section-index block mb-3">04 — SIGNALS</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Writing & Experiments
            </h2>
            <p className="mt-3 text-foreground-2 max-w-lg">
              Insights from our engineering practice and experiments from the lab.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
          {/* Blog column */}
          <StaggerContainer stagger={0.06} delay={0.1}>
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-accent-warm/15">
                <h3 className="text-[11px] font-mono text-accent-warm uppercase tracking-[0.15em]">
                  Journal
                </h3>
                <Link
                  href="/blog"
                  className="flex items-center gap-1 text-[11px] font-mono text-foreground-3 hover:text-accent-warm transition-colors"
                >
                  View all <ArrowUpRight size={10} />
                </Link>
              </div>
              {LATEST_POSTS.map((post) => (
                <StaggerItem key={post.slug}>
                  <BlogPreviewCard {...post} />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {/* Experiments column */}
          <StaggerContainer stagger={0.06} delay={0.2}>
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-accent-blue/15">
                <h3 className="text-[11px] font-mono text-accent-blue uppercase tracking-[0.15em]">
                  Lab
                </h3>
                <Link
                  href="/ai-lab"
                  className="flex items-center gap-1 text-[11px] font-mono text-foreground-3 hover:text-accent-blue transition-colors"
                >
                  View all <ArrowUpRight size={10} />
                </Link>
              </div>
              {LATEST_EXPERIMENTS.map((exp) => (
                <StaggerItem key={exp.slug}>
                  <ExperimentPreviewCard {...exp} />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </Container>
    </section>
  )
}
