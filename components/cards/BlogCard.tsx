'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Clock, Calendar, Code2, Layers, GitBranch,
  BookOpen, Columns3, Microscope, ArrowUpRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import type { BlogPostData, ContentBadge } from '@/lib/data'

/* ─── Content badge config ───────────────────────────────────── */

const badgeConfig: Record<ContentBadge, { label: string; icon: React.ElementType; color: string }> = {
  code:         { label: 'Code',         icon: Code2,      color: 'text-foreground-2 bg-surface-high border-transparent' },
  architecture: { label: 'Architecture', icon: Layers,     color: 'text-foreground-2 bg-surface-high border-transparent' },
  diagram:      { label: 'Diagrams',     icon: GitBranch,  color: 'text-foreground-2 bg-surface-high border-transparent' },
  tutorial:     { label: 'Tutorial',     icon: BookOpen,   color: 'text-foreground-2 bg-surface-high border-transparent' },
  comparison:   { label: 'Comparison',   icon: Columns3,   color: 'text-foreground-2 bg-surface-high border-transparent' },
  'deep-dive':  { label: 'Deep Dive',    icon: Microscope, color: 'text-foreground-2 bg-surface-high border-transparent' },
}

/* ─── Blog Card ──────────────────────────────────────────────── */

interface BlogCardProps {
  post:       BlogPostData
  className?: string
}

export function BlogCard({ post, className }: BlogCardProps) {
  const {
    slug, title, summary, category,
    publishedAt, readingTime, contentBadges,
  } = post

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn('h-full', className)}
    >
      <Link
        href={`/blog/${slug}`}
        className={cn(
          'group flex flex-col h-full p-6 rounded-2xl',
          'bg-surface border border-border/10 shadow-card',
          'transition-[box-shadow,border-color] duration-300 ease-out',
          'hover:border-border/15 hover:shadow-card-hover',
        )}
      >
        {/* ── Top row: category + meta ─────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 mb-4">
          <span className="text-xs font-semibold text-accent-warm">
            {category}
          </span>
          <div className="flex items-center gap-3 text-xs text-foreground-3">
            <time dateTime={publishedAt} className="flex items-center gap-1 whitespace-nowrap">
              <Calendar size={12} />
              {formatDate(publishedAt, { month: 'short' })}
            </time>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <Clock size={12} />
              {readingTime} min
            </span>
          </div>
        </div>

        {/* ── Title ─────────────────────────────────────────── */}
        <h3 className={cn(
          'font-display font-semibold text-lg leading-snug',
          'text-foreground group-hover:text-accent-warm',
          'transition-colors duration-200',
        )}>
          {title}
        </h3>

        {/* ── Summary ───────────────────────────────────────── */}
        <p className="mt-2.5 text-sm text-foreground-2 leading-relaxed line-clamp-2">
          {summary}
        </p>

        {/* ── Content badges ────────────────────────────────── */}
        {contentBadges.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {contentBadges.map((badge) => {
              const config = badgeConfig[badge]
              const Icon = config.icon
              return (
                <span
                  key={badge}
                  className={cn(
                    'inline-flex items-center gap-1 text-[11px] font-medium',
                    'px-2 py-0.5 rounded-md border',
                    config.color,
                  )}
                >
                  <Icon size={10} />
                  {config.label}
                </span>
              )
            })}
          </div>
        )}


        {/* ── Footer — pushed to bottom ───────────────────── */}
        <div className="mt-auto pt-5">
          <div className="pt-4 border-t border-border/10 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground-2 group-hover:text-accent-warm flex items-center gap-1 transition-colors duration-200">
              Read article
              <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <span className="text-xs text-foreground-3">
              {readingTime > 10 ? 'Long read' : readingTime > 6 ? 'Medium read' : 'Quick read'}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
