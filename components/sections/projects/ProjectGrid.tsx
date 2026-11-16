'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { ProjectFilters } from './ProjectFilters'
import { ALL_PROJECTS, type ProjectFilter } from '@/lib/data'

/** Featured engagements first, then by the curated order. */
const SORTED_PROJECTS = [...ALL_PROJECTS].sort(
  (a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order,
)

export function ProjectGrid() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('All')

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return SORTED_PROJECTS
    return SORTED_PROJECTS.filter((p) => p.category === activeFilter)
  }, [activeFilter])

  // Pre-compute counts for filter badges
  const counts = useMemo(() => {
    const c: Record<ProjectFilter, number> = {
      All:          ALL_PROJECTS.length,
      AI:           ALL_PROJECTS.filter((p) => p.category === 'AI').length,
      'Full Stack': ALL_PROJECTS.filter((p) => p.category === 'Full Stack').length,
      Tools:        ALL_PROJECTS.filter((p) => p.category === 'Tools').length,
    }
    return c
  }, [])

  return (
    <section className="pb-20 md:pb-28 relative">
      <Container>
        {/* ── Filter header ───────────────────────────────── */}
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-border/10">
            <p className="text-sm text-foreground-3" aria-live="polite">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span>{' '}
              {activeFilter === 'All' ? 'projects' : `${activeFilter} projects`}
            </p>

            <ProjectFilters
              active={activeFilter}
              onChange={setActiveFilter}
              counts={counts}
            />
          </div>
        </FadeIn>

        {/* ── Project grid ────────────────────────────────── */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="h-full"
              >
                <ProjectCard project={project} featured priority={i < 2} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-foreground-3">No projects in this category yet.</p>
          </div>
        )}
      </Container>
    </section>
  )
}
