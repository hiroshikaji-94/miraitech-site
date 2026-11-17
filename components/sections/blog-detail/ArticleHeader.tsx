import { label, type BlogPostData } from '@/lib/data'
import { formatDate } from '@/lib/utils'
import { BackLink } from '@/components/ui/BackLink'
import { Container } from '@/components/ui/Container'
import { Tag } from '@/components/ui/Tag'

export function ArticleHeader({ post }: { post: BlogPostData }) {
  return (
    <header className="relative overflow-hidden pt-32 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(ellipse_50%_60%_at_15%_0%,rgb(var(--color-accent)/0.07),transparent_70%)]"
      />
      <Container className="relative">
        <BackLink href="/blog">All writing</BackLink>

        <div className="mt-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Tag>{label(post.category)}</Tag>
            <p className="mono-label text-foreground-3">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              {' · '}
              {post.readingTime} min read
            </p>
          </div>
          <h1 className="heading-display mt-6 text-[clamp(2.25rem,4.8vw,3.5rem)] text-foreground text-balance">
            {post.title}
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg leading-[1.7] text-foreground-2 text-pretty">{post.summary}</p>
        </div>
      </Container>
    </header>
  )
}
