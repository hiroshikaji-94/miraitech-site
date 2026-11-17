import { cn } from '@/lib/utils'

interface Fact {
  term:  string
  value: React.ReactNode
}

// A bordered row of small facts (year, status, models...) used in detail page headers.
export function FactStrip({ facts, className }: { facts: Fact[]; className?: string }) {
  return (
    <dl
      className={cn(
        'card grid grid-cols-2 gap-px overflow-hidden bg-border/[0.07] p-0',
        facts.length >= 4 ? 'md:grid-cols-4' : 'md:grid-cols-3',
        className,
      )}
    >
      {facts.map(({ term, value }, i) => (
        <div
          key={term}
          className={cn(
            'flex flex-col-reverse justify-end gap-2 bg-surface px-5 py-5 md:px-6',
            // With an odd count the last fact fills the second column on small screens
            facts.length % 2 === 1 && i === facts.length - 1 && 'col-span-2 md:col-span-1',
          )}
        >
          <dt className="mono-label text-[10px] text-foreground-3">{term}</dt>
          <dd className="text-[15px] font-semibold leading-snug text-foreground">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
