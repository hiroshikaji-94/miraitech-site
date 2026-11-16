'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProjectData } from '@/lib/data'

interface ProjectCardProps {
  project:    ProjectData
  className?: string
  /** Larger card layout for featured section */
  featured?:  boolean
  /** Load the cover image eagerly (above-the-fold cards) */
  priority?:  boolean
}

export function ProjectCard({ project, className, featured = false, priority = false }: ProjectCardProps) {
  const {
    slug, title, summary, category, stack,
    coverImage, highlights, year,
  } = project

  const maxTags = featured ? 5 : 4
  const headline = highlights[0]

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn('h-full', className)}
    >
      <Link
        href={`/projects/${slug}`}
        className={cn(
          'group relative flex flex-col h-full rounded-2xl overflow-hidden',
          'bg-surface border border-border/10 shadow-card',
          'transition-[box-shadow,border-color] duration-300 ease-out',
          'hover:border-border/15 hover:shadow-card-hover',
        )}
      >
        {/* ── Cover ─────────────────────────────────────────── */}
        <div className={cn(
          'relative overflow-hidden bg-surface-high border-b border-border/10',
          featured ? 'aspect-[16/9]' : 'aspect-[16/10]',
        )}>
          {coverImage ? (
            <Image
              src={coverImage}
              alt={`${title} — product screenshot`}
              fill
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : 'auto'}
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.025]"
              sizes={featured
                ? '(max-width: 1024px) 100vw, 50vw'
                : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              }
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-warm/10" />
          )}

          {/* Category badge */}
          <span className={cn(
            'absolute top-3 left-3 z-10',
            'text-[11px] font-semibold px-2.5 py-1 rounded-full',
            'bg-surface/90 backdrop-blur-md border border-border/10 shadow-sm',
            'text-foreground-2',
          )}>
            {category}
          </span>
        </div>

        {/* ── Content ───────────────────────────────────────── */}
        <div className={cn('flex flex-col flex-1', featured ? 'p-6' : 'p-5')}>
          <h3 className={cn(
            'font-display font-semibold leading-snug tracking-tight',
            'text-foreground group-hover:text-accent-warm',
            'transition-colors duration-200',
            featured ? 'text-xl' : 'text-lg',
          )}>
            {title}
          </h3>

          <p className={cn(
            'mt-2 text-sm text-foreground-2 leading-relaxed',
            featured ? 'line-clamp-2' : 'line-clamp-2',
          )}>
            {summary}
          </p>

          {headline && (
            <p className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
              <TrendingUp size={12} />
              {headline}
            </p>
          )}

          {/* Tech stack */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {stack.slice(0, maxTags).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-surface-high text-foreground-2"
              >
                {tech}
              </span>
            ))}
            {stack.length > maxTags && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-md text-foreground-3">
                +{stack.length - maxTags}
              </span>
            )}
          </div>

          {/* ── Footer ─────────────────────────────────────── */}
          <div className="mt-auto pt-5">
            <div className="pt-4 border-t border-border/10 flex items-center justify-between">
              <span className="text-xs text-foreground-3 tabular-nums">{year}</span>
              <span className={cn(
                'inline-flex items-center gap-1 text-sm font-medium',
                'text-foreground-2 group-hover:text-accent-warm transition-colors duration-200',
              )}>
                View case study
                <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
