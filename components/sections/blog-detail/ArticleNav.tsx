'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import type { BlogPostData } from '@/lib/data'

function NavCard({
  post,
  direction,
}: {
  post: BlogPostData
  direction: 'prev' | 'next'
}) {
  const isPrev = direction === 'prev'

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'group flex items-center gap-4 p-5 rounded-xl',
        'bg-surface border border-border/10 shadow-card',
        'hover:border-accent-blue/20 hover:shadow-card-hover',
        'transition-all duration-300',
        isPrev ? 'flex-row' : 'flex-row-reverse text-right',
      )}
    >
      <div className={cn(
        'flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg',
        'bg-surface-high border border-border/10',
        'group-hover:bg-accent-blue/10 group-hover:border-accent-blue/15',
        'transition-colors duration-200',
      )}>
        {isPrev
          ? <ArrowLeft size={16} className="text-foreground-3 group-hover:text-accent-blue transition-colors" />
          : <ArrowRight size={16} className="text-foreground-3 group-hover:text-accent-blue transition-colors" />
        }
      </div>

      <div className="min-w-0 flex-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-3">
          {isPrev ? 'Previous' : 'Next'} Article
        </span>
        <h4 className={cn(
          'font-display font-semibold text-sm mt-0.5 line-clamp-1',
          'text-foreground group-hover:text-accent-blue transition-colors duration-200',
        )}>
          {post.title}
        </h4>
      </div>
    </Link>
  )
}

interface ArticleNavProps {
  prev: BlogPostData | null
  next: BlogPostData | null
}

export function ArticleNav({ prev, next }: ArticleNavProps) {
  if (!prev && !next) return null

  return (
    <section className="py-10 md:py-14 border-t border-border/8">
      <Container size="lg">
        <div className="max-w-3xl mx-auto xl:mx-0">
        <FadeIn>
          <div className={cn(
            'grid gap-4',
            prev && next ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-md',
            !prev && next && 'ml-auto',
          )}>
            {prev && <NavCard post={prev} direction="prev" />}
            {next && <NavCard post={next} direction="next" />}
          </div>
        </FadeIn>
        </div>
      </Container>
    </section>
  )
}
