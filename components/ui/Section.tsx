import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'

interface SectionProps {
  children:   React.ReactNode
  /** "muted" uses the alternate band color so neighbouring sections read as separate */
  tone?:      'default' | 'muted'
  id?:        string
  className?: string
  /** Accessible name for the section, usually the id of its heading */
  labelledBy?: string
}

// A full-width band with a hairline on top, like the sections on the home page.
export function Section({ children, tone = 'default', id, className, labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'border-t border-border/[0.07] py-20 md:py-28',
        tone === 'muted' ? 'bg-muted' : 'bg-background',
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  )
}

interface SectionIntroProps {
  eyebrow:    string
  title:      string
  intro?:     React.ReactNode
  /** Link or control shown at the right on wide screens */
  action?:    React.ReactNode
  align?:     'left' | 'center'
  id?:        string
  /** Use h1 for page headers */
  as?:        'h1' | 'h2'
  className?: string
}

// Eyebrow, heavy heading and an optional short intro.
export function SectionIntro({
  eyebrow,
  title,
  intro,
  action,
  align = 'left',
  id,
  as: Heading = 'h2',
  className,
}: SectionIntroProps) {
  const centered = align === 'center'
  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn('max-w-3xl', centered && 'flex flex-col items-center')}>
        <p className="eyebrow">{eyebrow}</p>
        <Heading
          id={id}
          className={cn(
            'mt-4 text-foreground text-balance',
            Heading === 'h1'
              ? 'heading-display text-[clamp(2.5rem,5.4vw,3.875rem)]'
              : 'heading-section text-[clamp(2rem,4.2vw,2.75rem)]',
          )}
        >
          {title}
        </Heading>
        {intro && (
          <div className="mt-5 max-w-2xl text-[17px] leading-[1.7] text-foreground-2 text-pretty">{intro}</div>
        )}
      </div>
      {action && <div className="shrink-0 md:pb-1.5">{action}</div>}
    </div>
  )
}
