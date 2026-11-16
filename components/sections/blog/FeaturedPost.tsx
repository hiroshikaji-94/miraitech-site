'use client'

import Link from 'next/link'
import {
  Clock, Calendar, ArrowRight,
  Code2, Layers, GitBranch, BookOpen, Columns3, Microscope,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { formatDate } from '@/lib/utils'
import type { BlogPostData, ContentBadge } from '@/lib/data'

const badgeIcons: Record<ContentBadge, React.ElementType> = {
  code: Code2, architecture: Layers, diagram: GitBranch,
  tutorial: BookOpen, comparison: Columns3, 'deep-dive': Microscope,
}

const badgeLabels: Record<ContentBadge, string> = {
  code: 'Code', architecture: 'Architecture', diagram: 'Diagrams',
  tutorial: 'Tutorial', comparison: 'Comparison', 'deep-dive': 'Deep Dive',
}

interface FeaturedPostProps {
  post: BlogPostData
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <section className="pb-12 md:pb-16 relative overflow-hidden">
      <Container>
        <FadeIn>
          {/* Section label */}
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={14} className="text-accent-warm" />
            <span className="section-index">
              Featured article
            </span>
            <div className="h-px flex-1 bg-border/10" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Link
            href={`/blog/${post.slug}`}
            className={cn(
              'group block rounded-2xl overflow-hidden',
              'bg-surface border border-border/10 shadow-card',
              'transition-[box-shadow,border-color] duration-300 ease-out',
              'hover:border-border/15 hover:shadow-card-hover',
            )}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr]">
              {/* ── Left: Decorative gradient + content preview ── */}
              <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-surface-high">
                {/* Ambient gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/[0.08] via-accent-warm/[0.06] to-accent-end/[0.08]" />

                {/* Decorative grid */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px',
                  }}
                />

                {/* Content type preview */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-wrap items-center justify-center gap-3 p-6">
                    {post.contentBadges.map((badge) => {
                      const Icon = badgeIcons[badge]
                      return (
                        <div
                          key={badge}
                          className={cn(
                            'flex items-center gap-2 px-4 py-2.5 rounded-xl',
                            'bg-surface/90 backdrop-blur-sm border border-border/10 shadow-card',
                            'text-foreground-2',
                          )}
                        >
                          <Icon size={16} />
                          <span className="text-sm font-medium">{badgeLabels[badge]}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

              </div>

              {/* ── Right: Content ─────────────────────────── */}
              <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-xs text-foreground-3">
                  <span className="font-semibold text-accent-warm">
                    {post.category}
                  </span>
                  <time dateTime={post.publishedAt} className="inline-flex items-center gap-1 whitespace-nowrap">
                    <Calendar size={12} />
                    {formatDate(post.publishedAt)}
                  </time>
                  <span className="inline-flex items-center gap-1 whitespace-nowrap">
                    <Clock size={12} />
                    {post.readingTime} min read
                  </span>
                </div>

                {/* Title */}
                <h2 className={cn(
                  'font-display text-2xl md:text-3xl font-bold tracking-tight leading-snug',
                  'text-foreground group-hover:text-accent-warm',
                  'transition-colors duration-200',
                )}>
                  {post.title}
                </h2>

                {/* Summary */}
                <p className="mt-4 text-base text-foreground-2 leading-relaxed text-pretty">
                  {post.summary}
                </p>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-surface-high text-foreground-3 border border-border/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-6">
                  <span className={cn(
                    'inline-flex items-center gap-2 text-sm font-medium',
                    'text-accent-warm group-hover:gap-3 transition-all duration-200',
                  )}>
                    Read Full Article
                    <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </FadeIn>
      </Container>
    </section>
  )
}
