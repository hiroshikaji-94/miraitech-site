'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { PROJECT_FILTERS, type ProjectFilter } from '@/lib/data'

interface ProjectFiltersProps {
  active:   ProjectFilter
  onChange: (filter: ProjectFilter) => void
  counts:  Record<ProjectFilter, number>
}

export function ProjectFilters({ active, onChange, counts }: ProjectFiltersProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter projects by category"
      className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-border/10 bg-surface p-1 shadow-card"
    >
      {PROJECT_FILTERS.map((filter) => {
        const isActive = active === filter

        return (
          <button
            key={filter}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(filter)}
            className={cn(
              'relative px-3.5 py-1.5 rounded-lg text-sm font-medium',
              'transition-colors duration-200',
              isActive
                ? 'text-white'
                : 'text-foreground-2 hover:text-foreground hover:bg-surface-high',
            )}
          >
            {/* Active background pill */}
            {isActive && (
              <motion.span
                layoutId="project-filter"
                className="absolute inset-0 rounded-lg bg-accent-warm shadow-sm"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
              />
            )}

            <span className="relative z-10 flex items-center gap-2">
              {filter}
              <span className={cn(
                'text-[11px] tabular-nums px-1.5 py-px rounded-full',
                isActive ? 'bg-white/20 text-white' : 'bg-surface-high text-foreground-3',
              )}>
                {counts[filter]}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
