'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, CircleDot } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { MeridianBackground } from '@/components/ui/MeridianBackground'
import type { ProjectData } from '@/lib/data'
import type { ProjectDetailContent } from '@/lib/project-details'

const ease = [0.21, 0.47, 0.32, 0.98] as const

interface ProjectHeroProps {
  project: ProjectData
  details: ProjectDetailContent
}

export function ProjectHero({ project, details }: ProjectHeroProps) {
  const statusColor = {
    live:     'text-emerald-700 dark:text-emerald-400 bg-emerald-500 dark:bg-emerald-400/10',
    wip:      'text-amber-700 dark:text-amber-400 bg-amber-500 dark:bg-amber-400/10',
    archived: 'text-foreground-3 bg-foreground-3/10',
  }[project.status]

  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
      <MeridianBackground intensity="subtle" lines={false} parallax={false} />
      <Container className="relative z-10">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <Button href="/projects" variant="ghost" size="sm" className="mb-6">
            <ArrowLeft size={14} />
            All Projects
          </Button>
        </motion.div>

        {/* Meta badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease }}
          className="flex flex-wrap items-center gap-2 mb-4"
        >
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/10">
            {project.category}
          </span>
          <span className={cn('text-[11px] font-semibold px-2.5 py-1 rounded-full', statusColor)}>
            <CircleDot size={10} className="inline mr-1 -mt-px" />
            {project.status === 'live' ? 'Live' : project.status === 'wip' ? 'In Progress' : 'Archived'}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-balance leading-[1.15] max-w-3xl"
        >
          {project.title}
        </motion.h1>

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
          className="mt-4 text-lg text-foreground-2 max-w-2xl leading-relaxed text-pretty"
        >
          {project.overview}
        </motion.p>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease }}
          className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground-3"
        >
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {project.year}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {details.duration}
          </span>
        </motion.div>

        {/* Key highlights */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25, ease }}
          className="mt-6 flex flex-wrap gap-2"
        >
          {project.highlights.map((h) => (
            <span
              key={h}
              className="text-sm font-medium px-3 py-1.5 rounded-lg bg-surface border border-border/10 text-foreground-2"
            >
              {h}
            </span>
          ))}
        </motion.div>

        {/* ── Cover screenshot — full-width, prominent ─────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mt-10 md:mt-14"
        >
          <div className={cn(
            'relative w-full aspect-[16/9] rounded-xl overflow-hidden',
            'border border-border/10',
            'bg-surface-high',
            'shadow-card-hover',
          )}>
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
              quality={90}
            />
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
