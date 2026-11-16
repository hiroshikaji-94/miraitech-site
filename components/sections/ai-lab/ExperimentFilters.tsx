'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { EXPERIMENT_FILTERS, type ExperimentFilter } from '@/lib/data'

interface ExperimentFiltersProps {
  active:   ExperimentFilter
  onChange: (filter: ExperimentFilter) => void
  counts:  Record<ExperimentFilter, number>
}

export function ExperimentFilters({ active, onChange, counts }: ExperimentFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {EXPERIMENT_FILTERS.map((filter) => {
        const isActive = active === filter

        return (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            className={cn(
              'relative px-3.5 py-2 rounded-lg text-sm font-mono font-medium',
              'transition-colors duration-200',
              isActive
                ? 'text-foreground'
                : 'text-foreground-3 hover:text-foreground-2 hover:bg-surface-high',
            )}
          >
            {isActive && (
              <motion.span
                layoutId="experiment-filter"
                className="absolute inset-0 rounded-lg bg-surface-high border border-accent-violet/15"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
              />
            )}

            <span className="relative z-10 flex items-center gap-2">
              {filter}
              <span className={cn(
                'text-[11px] tabular-nums px-1.5 py-0.5 rounded-full font-mono',
                isActive
                  ? 'bg-accent-violet/15 text-accent-violet'
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
