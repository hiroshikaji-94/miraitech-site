'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProjectData } from '@/lib/data'

interface ProjectCardProps {
  project:    ProjectData
  className?: string
  /** Larger card layout for featured section */
  featured?:  boolean
  /** Mark cover image as high priority (LCP) */
  priority?:  boolean
}

export function ProjectCard({ project, className, featured = false, priority = false }: ProjectCardProps) {
  const {
    slug, title, summary, category, stack,
    coverImage, highlights,
  } = project

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        'group relative flex flex-col h-full rounded-xl overflow-hidden',
        'bg-surface border border-border/8',
        'transition-colors duration-300 ease-out',
        'hover:border-accent-blue/20 hover:shadow-card-hover',
        className,
      )}
    >
      {/* ── Image area ────────────────────────────────────── */}
      <Link href={`/projects/${slug}`} className="block flex-shrink-0">
        <div className={cn(
          'relative overflow-hidden bg-surface-high',
          featured ? 'aspect-[16/9]' : 'aspect-[16/10]',
        )}>
          {coverImage ? (
            <Image
              src={coverImage}
              alt={title}
              fill
              priority={priority}
              loading={priority ? 'eager' : 'lazy'}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes={featured
                ? '(max-width: 768px) 100vw, 50vw'
                : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              }
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/8 via-transparent to-accent-violet/8" />
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category badge */}
          <span className={cn(
            'absolute top-3 left-3 z-10',
            'text-[11px] font-semibold px-2.5 py-1 rounded-full',
            'bg-background/70 backdrop-blur-md border border-border/10',
            'text-foreground-2',
          )}>
            {category}
          </span>

          {/* Hover arrow */}
          <div className={cn(
            'absolute top-3 right-3 z-10',
            'flex h-7 w-7 items-center justify-center rounded-full',
            'bg-background/70 backdrop-blur-md border border-border/10',
            'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0',
            'transition-all duration-300',
          )}>
            <ArrowUpRight size={13} className="text-foreground-2" />
          </div>
        </div>
      </Link>

      {/* ── Content area ──────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-5">
        {/* Title */}
        <Link href={`/projects/${slug}`}>
          <h3 className={cn(
            'font-display font-semibold leading-snug',
            'text-foreground group-hover:text-accent-blue',
            'transition-colors duration-200',
            featured ? 'text-xl' : 'text-lg',
          )}>
            {title}
          </h3>
        </Link>

        {/* Summary */}
        <p className={cn(
          'mt-2.5 text-sm text-foreground-2 leading-relaxed',
          featured ? 'line-clamp-3' : 'line-clamp-2',
        )}>
          {summary}
        </p>

        {/* Tech stack */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {stack.slice(0, featured ? 6 : 4).map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-surface-high text-foreground-3 border border-border/5"
            >
              {tech}
            </span>
          ))}
          {stack.length > (featured ? 6 : 4) && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-surface-high text-foreground-3">
              +{stack.length - (featured ? 6 : 4)}
            </span>
          )}
        </div>

        {/* ── Footer — pushed to bottom ───────────────── */}
        <div className="mt-auto pt-5">
          <div className="pt-4 border-t border-border/8 flex items-center justify-between">
            <span className="text-[11px] font-mono text-foreground-3 uppercase tracking-wider">
              {category}
            </span>
            <span className={cn(
              'flex items-center gap-1.5',
              'text-[11px] font-medium text-foreground-3',
              'group-hover:text-accent-warm transition-colors duration-200',
            )}>
              View Project
              <ArrowUpRight size={11} />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
