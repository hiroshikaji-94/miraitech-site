import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { LATEST_POSTS, LATEST_EXPERIMENTS, label } from '@/lib/data'
import { formatDate } from '@/lib/utils'
import { ArrowLink } from '@/components/ui/ArrowLink'
import { Section, SectionIntro } from '@/components/ui/Section'
import { Tag } from '@/components/ui/Tag'

const rowClass = 'group flex items-start justify-between gap-6 py-5'
const titleClass =
  'block text-[17px] font-semibold leading-snug tracking-[-0.015em] text-foreground transition-colors duration-150 group-hover:text-accent-fg'
const arrowClass =
  'mt-1 shrink-0 text-foreground-3 transition-[color,transform] duration-200 group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-accent-fg'

function Panel({ title, action, children }: { title: string; action: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="card flex flex-col p-6 md:p-8">
      <div className="flex items-center justify-between gap-4 border-b border-border/[0.07] pb-5">
        <h3 className="eyebrow">{title}</h3>
        {action}
      </div>
      <ul className="-mb-5 divide-y divide-border/[0.07]">{children}</ul>
    </div>
  )
}

export function Notes() {
  return (
    <Section tone="muted" labelledBy="notes-title">
      <SectionIntro
        id="notes-title"
        eyebrow="Writing and research"
        title="Notes from the work."
        intro="We write up what we learn on client projects, and run experiments between them."
      />
      <div className="mt-12 grid gap-5 md:mt-14 lg:grid-cols-2">
        <Panel title="Writing" action={<ArrowLink href="/blog" variant="mono">All posts</ArrowLink>}>
          {LATEST_POSTS.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className={rowClass}>
                <span className="min-w-0">
                  <span className="mono-label block text-foreground-3">
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, { month: 'short' })}</time>
                    {' · '}
                    {label(post.category)}
                  </span>
                  <span className={`${titleClass} mt-2`}>{post.title}</span>
                  <span className="mt-1.5 block text-sm text-foreground-3">{post.readingTime} min read</span>
                </span>
                <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden className={arrowClass} />
              </Link>
            </li>
          ))}
        </Panel>

        <Panel title="AI Lab" action={<ArrowLink href="/ai-lab" variant="mono">All experiments</ArrowLink>}>
          {LATEST_EXPERIMENTS.map((experiment) => (
            <li key={experiment.slug}>
              <Link href={`/ai-lab/${experiment.slug}`} className={rowClass}>
                <span className="min-w-0">
                  <Tag dot tone={experiment.status === 'live' ? 'accent' : 'neutral'}>
                    {experiment.status === 'live' ? 'Live' : 'Research'}
                  </Tag>
                  <span className={`${titleClass} mt-3`}>{experiment.title}</span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-foreground-3">{experiment.summary}</span>
                </span>
                <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden className={arrowClass} />
              </Link>
            </li>
          ))}
        </Panel>
      </div>
    </Section>
  )
}
