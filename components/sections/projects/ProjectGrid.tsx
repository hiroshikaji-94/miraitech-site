'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
import { ProjectFilters } from './ProjectFilters'
import { ALL_PROJECTS, type ProjectFilter } from '@/lib/data'

export function ProjectGrid() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('All')

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return ALL_PROJECTS
    return ALL_PROJECTS.filter((p) => p.category === activeFilter)
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
    <section className="py-16 md:py-20 relative overflow-hidden">
      <AmbientGlow preset="blue" intensity="whisper" />
      <Container className="relative z-10">
        {/* ── Filter header ───────────────────────────────── */}
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-medium text-foreground-3 uppercase tracking-wider">
                All Projects
              </span>
              <div className="h-px flex-1 bg-border/10 sm:hidden" />
            </div>

            <ProjectFilters
              active={activeFilter}
              onChange={setActiveFilter}
              counts={counts}
            />
          </div>
        </FadeIn>

        {/* ── Project grid ────────────────────────────────── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="h-full"
              >
                <ProjectCard project={project} priority={i < 3} />
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
