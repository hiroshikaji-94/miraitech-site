'use client'

import { motion } from 'framer-motion'
import {
  Code2, Layers, GitBranch, BookOpen, Columns3, Microscope,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BLOG_CATEGORIES } from '@/lib/data'
import type { BlogCategory, ContentBadge } from '@/lib/data'

const contentBadgeConfig: Record<ContentBadge, { label: string; icon: React.ElementType }> = {
  code:         { label: 'Code',         icon: Code2 },
  architecture: { label: 'Architecture', icon: Layers },
  diagram:      { label: 'Diagrams',     icon: GitBranch },
  tutorial:     { label: 'Tutorial',     icon: BookOpen },
  comparison:   { label: 'Comparison',   icon: Columns3 },
  'deep-dive':  { label: 'Deep Dive',    icon: Microscope },
}

interface BlogFiltersProps {
  activeCategory: BlogCategory
  onCategoryChange: (cat: BlogCategory) => void
  activeContentType: ContentBadge | null
  onContentTypeChange: (type: ContentBadge | null) => void
  categoryCounts: Record<string, number>
}

export function BlogFilters({
  activeCategory,
  onCategoryChange,
  activeContentType,
  onContentTypeChange,
  categoryCounts,
}: BlogFiltersProps) {
  return (
    <aside className="space-y-8">
      {/* ── Category filters ─────────────────────────── */}
      <div>
        <h3 className="text-xs font-semibold text-foreground-3 uppercase tracking-wider mb-3">
          Categories
        </h3>
        <div className="flex flex-wrap lg:flex-col gap-1.5">
          {BLOG_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={cn(
                  'relative px-3 py-1.5 rounded-lg text-sm font-medium text-left',
                  'transition-colors duration-200',
                  isActive
                    ? 'text-accent-blue'
                    : 'text-foreground-3 hover:text-foreground-2',
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="blog-category"
                    className="absolute inset-0 rounded-lg bg-accent-blue/10 border border-accent-blue/15"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative flex items-center justify-between gap-3">
                  {cat}
                  <span className={cn(
                    'text-[11px] font-mono',
                    isActive ? 'text-accent-blue/70' : 'text-foreground-3/50',
                  )}>
                    {categoryCounts[cat] ?? 0}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Content type filters ─────────────────────── */}
      <div>
        <h3 className="text-xs font-semibold text-foreground-3 uppercase tracking-wider mb-3">
          Content Type
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {(Object.entries(contentBadgeConfig) as [ContentBadge, typeof contentBadgeConfig[ContentBadge]][]).map(
            ([badge, config]) => {
              const Icon = config.icon
              const isActive = activeContentType === badge
              return (
                <button
                  key={badge}
                  onClick={() => onContentTypeChange(isActive ? null : badge)}
                  className={cn(
                    'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium',
                    'border transition-all duration-200',
                    isActive
                      ? 'bg-accent-blue/10 border-accent-blue/20 text-accent-blue'
                      : 'bg-surface border-border/8 text-foreground-3 hover:text-foreground-2 hover:border-border/15',
                  )}
                >
                  <Icon size={12} />
                  {config.label}
                </button>
              )
            },
          )}
        </div>
      </div>
    </aside>
  )
}
