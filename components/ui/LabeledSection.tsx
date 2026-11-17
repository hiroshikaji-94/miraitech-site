import { cn, slugify } from '@/lib/utils'

interface LabeledSectionProps {
  label:      string
  children:   React.ReactNode
  className?: string
}

// Long-page layout: a mono label on the left, the content on the right.
export function LabeledSection({ label, children, className }: LabeledSectionProps) {
  const id = `section-${slugify(label)}`
  return (
    <section
      aria-labelledby={id}
      className={cn('grid gap-x-8 gap-y-6 border-t border-border/[0.07] py-12 md:grid-cols-12 md:py-16', className)}
    >
      <div className="md:col-span-3">
        <h2 id={id} className="eyebrow md:sticky md:top-28">
          {label}
        </h2>
      </div>
      <div className="min-w-0 md:col-span-9 lg:col-span-8 lg:col-start-5">{children}</div>
    </section>
  )
}

// Body text for the right-hand column.
export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('max-w-[66ch] space-y-4 text-[17px] leading-[1.75] text-foreground-2 text-pretty', className)}>
      {children}
    </div>
  )
}
