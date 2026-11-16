'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { ExperimentCard } from '@/components/cards/ExperimentCard'
import { ExperimentFilters } from './ExperimentFilters'
import {
  ALL_EXPERIMENTS,
  EXPERIMENT_FILTERS,
  type ExperimentFilter,
} from '@/lib/data'

export function ExperimentGrid() {
  const [activeFilter, setActiveFilter] = useState<ExperimentFilter>('All')

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return ALL_EXPERIMENTS
    return ALL_EXPERIMENTS.filter((e) => e.category === activeFilter)
  }, [activeFilter])

  const counts = useMemo(() => {
    const c = {} as Record<ExperimentFilter, number>
    c['All'] = ALL_EXPERIMENTS.length
    EXPERIMENT_FILTERS.slice(1).forEach((f) => {
      c[f] = ALL_EXPERIMENTS.filter((e) => e.category === f).length
    })
    return c
  }, [])

  return (
    <section className="pb-20 md:pb-28 relative">
      <Container>
        {/* ── Filter bar ──────────────────────────────────── */}
        <FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8 pb-6 border-b border-border/10">
            <p className="text-sm text-foreground-3" aria-live="polite">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span>{' '}
              {activeFilter === 'All' ? 'experiments' : `${activeFilter} experiments`}
            </p>
            <ExperimentFilters
              active={activeFilter}
              onChange={setActiveFilter}
              counts={counts}
            />
          </div>
        </FadeIn>

        {/* ── Grid ────────────────────────────────────────── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((experiment) => (
              <motion.div
                key={experiment.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="h-full"
              >
                <ExperimentCard experiment={experiment} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-foreground-3 text-sm">
              No experiments in this category yet.
            </p>
          </div>
        )}
      </Container>
    </section>
  )
}
