import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ALL_POSTS } from '@/lib/data'
import { getPostContent, getPostHeadings } from '@/lib/mdx'
import { Container } from '@/components/ui/Container'
import { PrevNext } from '@/components/ui/PrevNext'
import { ArticleHeader } from '@/components/sections/blog-detail/ArticleHeader'
import { ArticleFooter } from '@/components/sections/blog-detail/ArticleFooter'
import { TableOfContents } from '@/components/sections/blog-detail/TableOfContents'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return ALL_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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

const link = (post: (typeof ALL_POSTS)[number] | undefined) =>
  post ? { href: `/blog/${post.slug}`, title: post.title } : null

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const index = ALL_POSTS.findIndex((p) => p.slug === slug)
  const post = ALL_POSTS[index]
  if (!post) notFound()

  const [mdx, headings] = await Promise.all([getPostContent(slug), getPostHeadings(slug)])
  if (!mdx) notFound()

  // ALL_POSTS is newest first, so the previous post is the next item in the array
  return (
    <article>
      <ArticleHeader post={post} />
      <Container className="mt-12 pb-8 md:mt-16">
        <div className="grid gap-x-8 border-t border-border/[0.07] pt-6 md:pt-10 xl:grid-cols-12">
          <div className="min-w-0 xl:col-span-8">
            <div className="article-prose max-w-[68ch]">{mdx.content}</div>
            <ArticleFooter />
          </div>
          <aside className="hidden xl:col-span-3 xl:col-start-10 xl:block">
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </Container>
      <PrevNext
        label="More posts"
        noun="post"
        prev={link(ALL_POSTS[index + 1])}
        next={link(ALL_POSTS[index - 1])}
      />
    </article>
  )
}
