'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ALL_POSTS, BLOG_CATEGORIES, label, type BlogCategory } from '@/lib/data'
import { formatDate } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { FilterTabs } from '@/components/ui/FilterTabs'
import { Tag } from '@/components/ui/Tag'

const POSTS = [...ALL_POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

const COUNTS = Object.fromEntries(
  BLOG_CATEGORIES.map((category) => [
    category,
    category === 'All' ? POSTS.length : POSTS.filter((p) => p.category === category).length,
  ]),
) as Record<BlogCategory, number>

export function PostList() {
  const [category, setCategory] = useState<BlogCategory>('All')
  const posts = category === 'All' ? POSTS : POSTS.filter((p) => p.category === category)

  return (
    <section className="border-t border-border/[0.07] bg-muted pb-20 pt-10 md:pb-28 md:pt-12">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <FilterTabs
            label="Filter posts by topic"
            options={BLOG_CATEGORIES}
            active={category}
            onChange={setCategory}
            counts={COUNTS}
            format={label}
          />
          <p aria-live="polite" className="mono-label text-foreground-3">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </p>
        </div>

        <ul className="mt-8 grid gap-5 md:mt-10 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="card card-hover group flex h-full flex-col p-6 md:p-7">
                <div className="flex items-center justify-between gap-3">
                  <Tag>{label(post.category)}</Tag>
                  <time dateTime={post.publishedAt} className="mono-label text-foreground-3">
                    {formatDate(post.publishedAt, { month: 'short' })}
                  </time>
                </div>
                <h2 className="mt-6 text-xl font-bold leading-snug tracking-[-0.025em] text-foreground">
                  {post.title}
                </h2>
                <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-foreground-2">{post.summary}</p>
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-border/[0.07] pt-4">
                  <span className="text-sm text-foreground-3">{post.readingTime} min read</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-fg">
                    Read
                    <ArrowRight size={15} strokeWidth={2} aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
