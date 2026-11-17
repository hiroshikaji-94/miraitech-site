'use client'

import { cn } from '@/lib/utils'

interface FilterTabsProps<T extends string> {
  options:   readonly T[]
  active:    T
  onChange:  (value: T) => void
  /** Accessible name for the group, e.g. "Filter projects" */
  label:     string
  counts?:   Partial<Record<T, number>>
  format?:   (value: T) => string
  className?: string
}

// Rounded filter pills. The selected one is filled with a soft green.
export function FilterTabs<T extends string>({
  options,
  active,
  onChange,
  label,
  counts,
  format = (value) => value,
  className,
}: FilterTabsProps<T>) {
  return (
    <div role="group" aria-label={label} className={cn('flex flex-wrap gap-2', className)}>
      {options.map((option) => {
        const selected = option === active
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option)}
            className={cn(
              'inline-flex h-9 items-center gap-2 rounded-full border px-4 text-[13px] font-medium transition-colors duration-150',
              selected
                ? 'border-accent/40 bg-accent/10 text-accent-fg'
                : 'border-border/10 text-foreground-2 hover:border-border/25 hover:text-foreground',
            )}
          >
            {format(option)}
            {counts?.[option] !== undefined && (
              <span className={cn('font-mono text-[11px] tabular-nums', selected ? 'text-accent-fg/80' : 'text-foreground-3')}>
                {counts[option]}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
