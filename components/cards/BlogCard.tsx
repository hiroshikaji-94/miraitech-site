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
  code:         { label: 'Code',         icon: Code2,      color: 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/8 border-emerald-500/10' },
  architecture: { label: 'Architecture', icon: Layers,     color: 'text-blue-600 dark:text-blue-400 bg-blue-500/8 border-blue-500/10' },
  diagram:      { label: 'Diagrams',     icon: GitBranch,  color: 'text-violet-600 dark:text-violet-400 bg-violet-500/8 border-violet-500/10' },
  tutorial:     { label: 'Tutorial',     icon: BookOpen,   color: 'text-amber-700 dark:text-amber-400 bg-amber-500/8 border-amber-500/10' },
  comparison:   { label: 'Comparison',   icon: Columns3,   color: 'text-rose-600 dark:text-rose-400 bg-rose-500/8 border-rose-500/10' },
  'deep-dive':  { label: 'Deep Dive',    icon: Microscope, color: 'text-cyan-700 dark:text-cyan-400 bg-cyan-500/8 border-cyan-500/10' },
}

/* ─── Blog Card ──────────────────────────────────────────────── */

interface BlogCardProps {
  post:       BlogPostData
  className?: string
}

export function BlogCard({ post, className }: BlogCardProps) {
  const {
    slug, title, summary, category,
    publishedAt, readingTime, contentBadges, tags,
  } = post

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn('h-full', className)}
    >
      <Link
        href={`/blog/${slug}`}
        className={cn(
          'group flex flex-col h-full p-5 rounded-xl',
          'bg-surface border border-border/8',
          'transition-colors duration-300 ease-out',
          'hover:border-accent-blue/15 hover:shadow-card-hover',
        )}
      >
        {/* ── Top row: category + meta ─────────────────────── */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-accent-blue">
            {category}
          </span>
          <div className="flex items-center gap-3 text-[11px] text-foreground-3 font-mono">
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {formatDate(publishedAt, { month: 'short', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {readingTime} min
            </span>
          </div>
        </div>

        {/* ── Title ─────────────────────────────────────────── */}
        <h3 className={cn(
          'font-display font-semibold text-lg leading-snug',
          'text-foreground group-hover:text-accent-blue',
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
                    'inline-flex items-center gap-1 text-[11px] font-semibold',
                    'px-2 py-0.5 rounded-full border',
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

        {/* ── Tags ──────────────────────────────────────────── */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-surface-high text-foreground-3 border border-border/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ── Footer — pushed to bottom ───────────────────── */}
        <div className="mt-auto pt-5">
          <div className="pt-4 border-t border-border/8 flex items-center justify-between">
            <span className="text-[11px] font-medium text-accent-blue flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
              Read Article
              <ArrowUpRight size={12} />
            </span>
            <span className="text-[11px] font-mono text-foreground-3">
              {readingTime > 10 ? 'Long read' : readingTime > 6 ? 'Medium read' : 'Quick read'}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
