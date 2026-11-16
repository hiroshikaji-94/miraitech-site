import { notFound } from 'next/navigation'
import { ALL_POSTS } from '@/lib/data'
import { getPostContent, getPostHeadings } from '@/lib/mdx'
import { Container } from '@/components/ui/Container'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
import { ArticleHeader } from '@/components/sections/blog-detail/ArticleHeader'
import { TableOfContents } from '@/components/sections/blog-detail/TableOfContents'
import { AuthorCard } from '@/components/sections/blog-detail/AuthorCard'
import { ArticleNav } from '@/components/sections/blog-detail/ArticleNav'

/* ─── Static params ────────────────────────────────────────────── */

export function generateStaticParams() {
  return ALL_POSTS.map((post) => ({ slug: post.slug }))
}

/* ─── Metadata ─────────────────────────────────────────────────── */

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = ALL_POSTS.find((p) => p.slug === slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
  }
}

/* ─── Page ─────────────────────────────────────────────────────── */

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = ALL_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  const idx = ALL_POSTS.indexOf(post)
  const prev = idx < ALL_POSTS.length - 1 ? ALL_POSTS[idx + 1] : null
  const next = idx > 0 ? ALL_POSTS[idx - 1] : null

  // Load MDX content & headings
  const [mdxResult, headings] = await Promise.all([
    getPostContent(slug),
    getPostHeadings(slug),
  ])

  return (
    <>
      <ArticleHeader post={post} />

      {/* Article body with optional TOC sidebar */}
      <section className="pb-12 md:pb-16 relative overflow-hidden">
        <AmbientGlow preset="warm" intensity="whisper" />
        <Container size="lg" className="relative z-10">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_200px] gap-10 xl:gap-16">
            {/* Main article */}
            <article className="max-w-3xl mx-auto xl:mx-0 w-full min-w-0">
              {mdxResult ? (
                <div className="article-prose">
                  {mdxResult.content}
                </div>
              ) : (
                /* Placeholder when MDX file doesn't exist yet */
                <ArticlePlaceholder post={post} />
              )}
            </article>

            {/* Table of contents */}
            <TableOfContents headings={headings} />
          </div>
        </Container>
      </section>

      <AuthorCard />
      <ArticleNav prev={prev} next={next} />
    </>
  )
}

/* ─── Placeholder content for posts without MDX files ──────────── */

import {
  Code2, Layers, GitBranch, BookOpen, Columns3, Microscope,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BlogPostData, ContentBadge } from '@/lib/data'

const badgeIcons: Record<ContentBadge, React.ElementType> = {
  code: Code2, architecture: Layers, diagram: GitBranch,
  tutorial: BookOpen, comparison: Columns3, 'deep-dive': Microscope,
}

const badgeLabels: Record<ContentBadge, string> = {
  code: 'Code Examples', architecture: 'Architecture Patterns', diagram: 'Visual Diagrams',
  tutorial: 'Step-by-Step Tutorial', comparison: 'Comparison Analysis', 'deep-dive': 'In-Depth Analysis',
}

function ArticlePlaceholder({ post }: { post: BlogPostData }) {
  return (
    <div className="article-prose">
      <p className="text-foreground-2 leading-[1.8] text-pretty">
        {post.summary}
      </p>

      <hr className="my-10 border-0 h-px bg-gradient-to-r from-transparent via-border/15 to-transparent" />

      {/* Content preview */}
      <div className="rounded-xl border border-border/10 bg-surface p-8 text-center">
        <p className="text-sm text-foreground-3 mb-5">
          This article will include:
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {post.contentBadges.map((badge) => {
            const Icon = badgeIcons[badge]
            return (
              <div
                key={badge}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-xl',
                  'bg-surface-high border border-border/10 text-foreground-2',
                )}
              >
                <Icon size={16} className="text-accent-blue" />
                <span className="text-sm font-medium">{badgeLabels[badge]}</span>
              </div>
            )
          })}
        </div>
        <p className="mt-6 text-xs text-foreground-3 font-mono">
          Full article coming soon
        </p>
      </div>
    </div>
  )
}
