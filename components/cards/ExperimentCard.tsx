'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ExperimentData, ExperimentStatus } from '@/lib/data'

/* ─── Status config ──────────────────────────────────────────── */

const statusConfig: Record<ExperimentStatus, { label: string; dot: string; badge: string }> = {
  live: {
    label: 'Live',
    dot:   'bg-emerald-500',
    badge: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  },
  research: {
    label: 'Research',
    dot:   'bg-violet-500',
    badge: 'bg-violet-500/10 text-violet-700 dark:text-violet-400',
  },
}

/* ─── Card component ─────────────────────────────────────────── */

interface ExperimentCardProps {
  experiment: ExperimentData
  className?: string
}

export function ExperimentCard({ experiment, className }: ExperimentCardProps) {
  const { slug, title, summary, category, status, stack, models, metrics } = experiment
  const s = statusConfig[status]

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn('h-full', className)}
    >
      <Link
        href={`/ai-lab/${slug}`}
        className={cn(
          'group flex flex-col h-full rounded-2xl overflow-hidden',
          'bg-surface border border-border/10 shadow-card',
          'transition-[box-shadow,border-color] duration-300 ease-out',
          'hover:border-border/15 hover:shadow-card-hover',
        )}
      >
        {/* ── Header bar ───────────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border/10 bg-muted">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1" aria-hidden>
              <span className="w-2 h-2 rounded-full bg-foreground-3/25" />
              <span className="w-2 h-2 rounded-full bg-foreground-3/25" />
              <span className="w-2 h-2 rounded-full bg-foreground-3/25" />
            </span>
            <span className="text-xs font-mono font-medium text-foreground-3 uppercase tracking-wider">
              {category}
            </span>
          </div>
          <span className={cn('inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full', s.badge)}>
            <span className={cn('w-1.5 h-1.5 rounded-full', s.dot)} />
            {s.label}
          </span>
        </div>

        {/* ── Content ───────────────────────────────────────── */}
        <div className="flex flex-col flex-1 p-5">
          <h3 className="font-display font-semibold text-lg leading-snug tracking-tight text-foreground group-hover:text-accent-warm transition-colors duration-200">
            {title}
          </h3>

          <p className="mt-2 text-sm text-foreground-2 leading-relaxed line-clamp-2">
            {summary}
          </p>

          {/* Key results */}
          {metrics && metrics.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {metrics.slice(0, 3).map((metric) => (
                <li key={metric} className="flex items-center gap-2 text-sm text-foreground-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  {metric}
                </li>
              ))}
            </ul>
          )}

          {/* Models */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {models.map((model) => (
              <span
                key={model}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-accent-warm/[0.08] text-accent-warm"
              >
                {model}
              </span>
            ))}
          </div>

          {/* ── Footer ─────────────────────────────────────── */}
          <div className="mt-auto pt-5">
            <div className="pt-4 border-t border-border/10 flex items-center justify-between gap-3">
              <span className="text-xs text-foreground-3 truncate">
                {stack.slice(0, 3).join(' · ')}
              </span>
              <span className="shrink-0 inline-flex items-center gap-1 text-sm font-medium text-foreground-2 group-hover:text-accent-warm transition-colors duration-200">
                Explore
                <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
