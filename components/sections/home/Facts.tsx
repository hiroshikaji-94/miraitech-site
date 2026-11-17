import { ALL_PROJECTS } from '@/lib/data'
import { SITE } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { LocalTime } from '@/components/ui/LocalTime'

export function Facts() {
  const facts = [
    {
      value: String(ALL_PROJECTS.length),
      unit:  'projects',
      label: 'Case studies on this site, all in production',
    },
    {
      value: String(SITE.founded),
      label: `Founded in ${SITE.location.area}`,
    },
    {
      value: 'JST',
      unit:  'UTC+9',
      label: <>Tokyo time, now <LocalTime className="font-mono tabular-nums text-foreground-2" /></>,
    },
    {
      value: 'JP/EN',
      label: 'Docs, standups and code review in either language',
    },
  ]

  return (
    <section aria-labelledby="facts-title" className="relative overflow-hidden border-t border-border/[0.07] bg-muted py-20 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_40%_100%_at_50%_0%,rgb(var(--color-accent)/0.06),transparent_70%)]"
      />
      <Container className="relative">
        <h2 id="facts-title" className="eyebrow mx-auto">At a glance</h2>
        <dl className="card mt-10 grid overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact, i) => (
            <div
              key={fact.value}
              className={cn(
                'relative flex flex-col-reverse justify-end gap-3 border-border/[0.07] p-7 md:p-8',
                // 1 column: rules between rows. 2 columns: a 2x2 grid. 4 columns: one row.
                i === 1 && 'border-t sm:border-t-0',
                i >= 2 && 'border-t lg:border-t-0',
                i % 2 === 1 && 'sm:border-l',
                i === 2 && 'lg:border-l',
              )}
            >
              {i === 0 && <span aria-hidden className="absolute inset-y-6 left-0 w-0.5 rounded-full bg-accent" />}
              <dt className="text-[15px] leading-snug text-foreground-3">{fact.label}</dt>
              <dd className="font-mono text-[2.5rem] font-medium leading-none tracking-[-0.04em] text-foreground">
                {fact.value}
                {fact.unit && <span className="ml-1.5 text-lg tracking-normal text-foreground-3">{fact.unit}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
