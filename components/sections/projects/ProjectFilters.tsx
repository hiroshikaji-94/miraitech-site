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
    <div className="flex flex-wrap items-center gap-2">
      {PROJECT_FILTERS.map((filter) => {
        const isActive = active === filter

        return (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            className={cn(
              'relative px-4 py-2 rounded-lg text-sm font-medium',
              'transition-colors duration-200',
              isActive
                ? 'text-foreground'
                : 'text-foreground-3 hover:text-foreground-2 hover:bg-surface-high',
            )}
          >
            {/* Active background pill */}
            {isActive && (
              <motion.span
                layoutId="project-filter"
                className="absolute inset-0 rounded-lg bg-surface-high border border-border/15"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
              />
            )}

            <span className="relative z-10 flex items-center gap-2">
              {filter}
              <span className={cn(
                'text-[11px] tabular-nums px-1.5 py-0.5 rounded-full',
                isActive
                  ? 'bg-accent-blue/15 text-accent-blue'
                  : 'bg-surface text-foreground-3',
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
