'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ALL_EXPERIMENTS, EXPERIMENT_FILTERS, label, type ExperimentFilter } from '@/lib/data'
import { Container } from '@/components/ui/Container'
import { FilterTabs } from '@/components/ui/FilterTabs'
import { Tag } from '@/components/ui/Tag'

const EXPERIMENTS = [...ALL_EXPERIMENTS].sort((a, b) => a.order - b.order)

const COUNTS = Object.fromEntries(
  EXPERIMENT_FILTERS.map((filter) => [
    filter,
    filter === 'All' ? EXPERIMENTS.length : EXPERIMENTS.filter((e) => e.category === filter).length,
  ]),
) as Record<ExperimentFilter, number>

const STATUS = { live: 'Live', research: 'Research' } as const

export function ExperimentList() {
  const [filter, setFilter] = useState<ExperimentFilter>('All')
  const experiments = filter === 'All' ? EXPERIMENTS : EXPERIMENTS.filter((e) => e.category === filter)

  return (
    <section className="border-t border-border/[0.07] bg-muted pb-20 pt-10 md:pb-28 md:pt-12">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <FilterTabs
            label="Filter experiments by type"
            options={EXPERIMENT_FILTERS}
            active={filter}
            onChange={setFilter}
            counts={COUNTS}
            format={label}
          />
          <p aria-live="polite" className="mono-label text-foreground-3">
            {experiments.length} {experiments.length === 1 ? 'experiment' : 'experiments'}
          </p>
        </div>

        <ul className="mt-8 grid gap-5 md:mt-10 md:grid-cols-2 xl:grid-cols-3">
          {experiments.map((experiment) => (
            <li key={experiment.slug}>
              <Link href={`/ai-lab/${experiment.slug}`} className="card card-hover group flex h-full flex-col p-6 md:p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="mono-label text-foreground-3">{label(experiment.category)}</span>
                  <Tag dot tone={experiment.status === 'live' ? 'accent' : 'neutral'}>
                    {STATUS[experiment.status]}
                  </Tag>
                </div>
                {experiment.metrics?.[0] && (
                  <p className="mt-6 font-mono text-[15px] font-medium leading-snug text-accent-fg">
                    {experiment.metrics[0]}
                  </p>
                )}
                <h2 className="mt-3 text-xl font-bold leading-snug tracking-[-0.025em] text-foreground">
                  {experiment.title}
                </h2>
                <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-foreground-2">{experiment.summary}</p>
                <div className="pt-6">
                  <p className="border-t border-border/[0.07] pt-4 text-sm leading-relaxed text-foreground-3">
                    {experiment.models.join(', ')}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-fg">
                    Read the write-up
                    <ArrowRight size={15} strokeWidth={2} aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
