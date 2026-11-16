'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Radio, Microscope } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ExperimentData, ExperimentStatus } from '@/lib/data'

/* ─── Status config ──────────────────────────────────────────── */

const statusConfig: Record<ExperimentStatus, {
  label: string
  icon: React.ElementType
  dot: string
  badge: string
}> = {
  live: {
    label: 'Live',
    icon: Radio,
    dot:   'bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]',
    badge: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
  },
  research: {
    label: 'Research',
    icon: Microscope,
    dot:   'bg-violet-500 dark:bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.5)]',
    badge: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
  },
}

/* ─── Card component ─────────────────────────────────────────── */

interface ExperimentCardProps {
  experiment: ExperimentData
  className?: string
}

export function ExperimentCard({ experiment, className }: ExperimentCardProps) {
  const {
    slug, title, summary, category, status,
    stack, models, metrics,
  } = experiment

  const s = statusConfig[status]

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        'group relative flex flex-col h-full rounded-xl overflow-hidden',
        'bg-surface border border-border/8',
        'transition-colors duration-300 ease-out',
        'hover:border-accent-violet/20 hover:shadow-card-hover',
        className,
      )}
    >
      {/* ── Terminal-style header bar ─────────────────────── */}
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-border/8 bg-surface-high/50">
        <div className="flex items-center gap-2">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-foreground-3/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-foreground-3/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-foreground-3/20" />
          </div>

          {/* Category tag */}
          <span className="ml-2 text-[11px] font-mono font-medium text-foreground-3 uppercase tracking-wider">
            {category}
          </span>
        </div>

        {/* Status badge */}
        <span className={cn(
          'flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full border',
          s.badge,
        )}>
          <span className={cn('w-1.5 h-1.5 rounded-full', s.dot)} />
          {s.label}
        </span>
      </div>

      {/* ── Content ───────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-5">
        {/* Title */}
        <Link href={`/ai-lab/${slug}`}>
          <h3 className={cn(
            'font-display font-semibold text-lg leading-snug',
            'text-foreground group-hover:text-accent-violet',
            'transition-colors duration-200',
          )}>
            {title}
          </h3>
        </Link>

        {/* Summary */}
        <p className="mt-2.5 text-sm text-foreground-2 leading-relaxed line-clamp-2">
          {summary}
        </p>

        {/* Models used */}
        <div className="mt-4">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-foreground-3 mb-2 block">
            Models
          </span>
          <div className="flex flex-wrap gap-1.5">
            {models.map((model) => (
              <span
                key={model}
                className={cn(
                  'text-[11px] font-mono font-medium px-2 py-0.5 rounded-md',
                  'bg-accent-violet/8 text-accent-violet',
                  'border border-accent-violet/10',
                )}
              >
                {model}
              </span>
            ))}
          </div>
        </div>

        {/* Key metrics */}
        {metrics && metrics.length > 0 && (
          <div className="mt-3">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-foreground-3 mb-2 block">
              Results
            </span>
            <div className="flex flex-wrap gap-1.5">
              {metrics.map((metric) => (
                <span
                  key={metric}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-500/8 text-emerald-700 dark:text-emerald-400 border border-emerald-500/10"
                >
                  {metric}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tech stack */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {stack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-surface-high text-foreground-3 border border-border/5"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* ── Footer — pushed to bottom ───────────────── */}
        <div className="mt-auto pt-5">
          <div className="pt-4 border-t border-border/8 flex items-center justify-between">
            <span className="text-[11px] font-mono text-foreground-3 uppercase tracking-wider">
              {category}
            </span>
            <span className={cn(
              'flex items-center gap-1.5',
              'text-[11px] font-medium text-foreground-3',
              'group-hover:text-accent-blue transition-colors duration-200',
            )}>
              Explore
              <ArrowUpRight size={11} />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
