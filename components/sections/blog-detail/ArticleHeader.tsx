'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Calendar, Clock,
  Code2, Layers, GitBranch, BookOpen, Columns3, Microscope,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
import { formatDate } from '@/lib/utils'
import type { BlogPostData, ContentBadge } from '@/lib/data'

const ease = [0.21, 0.47, 0.32, 0.98] as const

const badgeConfig: Record<ContentBadge, { label: string; icon: React.ElementType; color: string }> = {
  code:         { label: 'Code',         icon: Code2,      color: 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/8 border-emerald-500/10' },
  architecture: { label: 'Architecture', icon: Layers,     color: 'text-blue-600 dark:text-blue-400 bg-blue-500/8 border-blue-500/10' },
  diagram:      { label: 'Diagrams',     icon: GitBranch,  color: 'text-violet-600 dark:text-violet-400 bg-violet-500/8 border-violet-500/10' },
  tutorial:     { label: 'Tutorial',     icon: BookOpen,   color: 'text-amber-700 dark:text-amber-400 bg-amber-500/8 border-amber-500/10' },
  comparison:   { label: 'Comparison',   icon: Columns3,   color: 'text-rose-600 dark:text-rose-400 bg-rose-500/8 border-rose-500/10' },
  'deep-dive':  { label: 'Deep Dive',    icon: Microscope, color: 'text-cyan-700 dark:text-cyan-400 bg-cyan-500/8 border-cyan-500/10' },
}

interface ArticleHeaderProps {
  post: BlogPostData
}

export function ArticleHeader({ post }: ArticleHeaderProps) {
  return (
    <section className="relative pt-24 pb-10 md:pt-32 md:pb-14 overflow-hidden">
      <AmbientGlow preset="blue" intensity="subtle" />
      {/* Accent line */}
      <div className="pointer-events-none absolute top-0 left-0 w-px h-[30vh] bg-gradient-to-b from-accent-warm/15 to-transparent" />

      <Container size="md">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-foreground-3 hover:text-accent-blue transition-colors mb-8 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Category + Content badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
          className="flex flex-wrap items-center gap-2 mb-5"
        >
          <span className="text-[11px] font-semibold uppercase tracking-wider text-accent-blue bg-accent-blue/8 px-3 py-1 rounded-full border border-accent-blue/15">
            {post.category}
          </span>
          {post.contentBadges.map((badge) => {
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
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.12] text-balance"
        >
          {post.title}
        </motion.h1>

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14, ease }}
          className="mt-5 text-lg md:text-xl text-foreground-2 leading-relaxed max-w-2xl text-pretty"
        >
          {post.summary}
        </motion.p>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease }}
          className="mt-6 flex flex-wrap items-center gap-4 text-sm text-foreground-3"
        >
          <span className="flex items-center gap-1.5 font-mono">
            <Calendar size={13} />
            {formatDate(post.publishedAt, { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="w-1 h-1 rounded-full bg-foreground-3/50" />
          <span className="flex items-center gap-1.5 font-mono">
            <Clock size={13} />
            {post.readingTime} min read
          </span>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.26, ease }}
          className="mt-5 flex flex-wrap gap-1.5"
        >
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-surface-high text-foreground-3 border border-border/5"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10 h-px bg-gradient-to-r from-transparent via-border/15 to-transparent"
        />
      </Container>
    </section>
  )
}
