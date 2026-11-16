'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BookOpen, Clock, FlaskConical } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/FadeIn'
import { LATEST_POSTS, LATEST_EXPERIMENTS } from '@/lib/data'
import { formatDate } from '@/lib/utils'

/* ─── Row: blog post ─────────────────────────────────────────── */

function PostRow({ slug, title, summary, category, publishedAt, readingTime }: (typeof LATEST_POSTS)[number]) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block rounded-xl p-4 -mx-4 transition-colors duration-200 hover:bg-surface-high/60"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground-3">
        <span className="font-semibold text-accent-warm">{category}</span>
        <span aria-hidden>·</span>
        <time dateTime={publishedAt}>{formatDate(publishedAt, { month: 'short' })}</time>
        <span aria-hidden>·</span>
        <span className="inline-flex items-center gap-1">
          <Clock size={11} />
          {readingTime} min read
        </span>
      </div>
      <h3 className="mt-2 font-display text-base md:text-lg font-semibold leading-snug text-foreground group-hover:text-accent-warm transition-colors">
        {title}
      </h3>
      <p className="mt-1.5 text-sm text-foreground-2 leading-relaxed line-clamp-2">{summary}</p>
    </Link>
  )
}

/* ─── Row: experiment ────────────────────────────────────────── */

function ExperimentRow({ slug, title, summary, status, stack }: (typeof LATEST_EXPERIMENTS)[number]) {
  const live = status === 'live'
  return (
    <Link
      href={`/ai-lab/${slug}`}
      className="group block rounded-xl p-4 -mx-4 transition-colors duration-200 hover:bg-surface-high/60"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold',
          live
            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
            : 'bg-violet-500/10 text-violet-700 dark:text-violet-400',
        )}>
          <span className={cn('h-1.5 w-1.5 rounded-full', live ? 'bg-emerald-500' : 'bg-violet-500')} />
          {live ? 'Live' : 'Research'}
        </span>
        {stack.slice(0, 3).map((tech) => (
          <span key={tech} className="rounded-md bg-surface-high px-1.5 py-0.5 text-[11px] text-foreground-3">
            {tech}
          </span>
        ))}
      </div>
      <h3 className="mt-2 font-display text-base md:text-lg font-semibold leading-snug text-foreground group-hover:text-accent-warm transition-colors">
        {title}
      </h3>
      <p className="mt-1.5 text-sm text-foreground-2 leading-relaxed line-clamp-2">{summary}</p>
    </Link>
  )
}

/* ─── Column card ────────────────────────────────────────────── */

function Column({
  icon: Icon, title, href, linkLabel, children,
}: {
  icon: React.ElementType
  title: string
  href: string
  linkLabel: string
  children: React.ReactNode
}) {
  return (
    <div className="card h-full p-6 md:p-8 flex flex-col">
      <div className="flex items-center justify-between gap-4 pb-4 mb-2 border-b border-border/10">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-warm/10 text-accent-warm">
            <Icon size={17} />
          </span>
          <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
        </div>
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm font-medium text-foreground-2 hover:text-accent-warm transition-colors"
        >
          {linkLabel}
          <ArrowUpRight size={14} />
        </Link>
      </div>
      <div className="divide-y divide-border/8">{children}</div>
    </div>
  )
}

/* ─── Section ────────────────────────────────────────────────── */

export function LatestContent() {
  return (
    <section className="py-20 md:py-28 relative">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-12">
            <div className="max-w-2xl">
              <span className="section-index block mb-3">04 — Signals</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Writing &amp; experiments
              </h2>
              <p className="mt-4 text-lg text-foreground-2 leading-relaxed">
                Notes from our engineering practice, and research from the lab that feeds back into client work.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-warm hover:text-accent-violet transition-colors self-start sm:self-auto"
            >
              Read the journal
              <ArrowRight size={15} />
            </Link>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6" stagger={0.1}>
          <StaggerItem className="h-full">
            <Column icon={BookOpen} title="Journal" href="/blog" linkLabel="All articles">
              {LATEST_POSTS.map((post) => (
                <div key={post.slug} className="py-2">
                  <PostRow {...post} />
                </div>
              ))}
            </Column>
          </StaggerItem>
          <StaggerItem className="h-full">
            <Column icon={FlaskConical} title="AI Lab" href="/ai-lab" linkLabel="All experiments">
              {LATEST_EXPERIMENTS.map((exp) => (
                <div key={exp.slug} className="py-2">
                  <ExperimentRow {...exp} />
                </div>
              ))}
            </Column>
          </StaggerItem>
        </StaggerContainer>
      </Container>
    </section>
  )
}
