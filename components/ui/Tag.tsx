import { cn } from '@/lib/utils'

interface TagProps {
  children:   React.ReactNode
  /** "accent" is the green outlined pill, "neutral" is grey */
  tone?:      'accent' | 'neutral'
  /** Show a small dot before the text */
  dot?:       boolean
  className?: string
}

// Small mono pill used for categories and status.
export function Tag({ children, tone = 'accent', dot = false, className }: TagProps) {
  return (
    <span
      className={cn(
        'mono-label inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold leading-none',
        tone === 'accent'
          ? 'border-accent/30 bg-accent/[0.08] text-accent-fg'
          : 'border-border/10 bg-foreground/[0.03] text-foreground-3',
        className,
      )}
    >
      {dot && (
        <span
          aria-hidden
          className={cn('h-1.5 w-1.5 rounded-full', tone === 'accent' ? 'bg-accent' : 'bg-foreground-3')}
        />
      )}
      {children}
    </span>
  )
}
