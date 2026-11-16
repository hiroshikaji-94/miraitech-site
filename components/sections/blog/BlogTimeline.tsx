'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { BlogCard } from '@/components/cards/BlogCard'
import type { BlogPostData } from '@/lib/data'

interface BlogTimelineProps {
  posts: BlogPostData[]
}

/** Group posts by year, preserving order (newest first). */
function groupByYear(posts: BlogPostData[]) {
  const groups: { year: string; posts: BlogPostData[] }[] = []
  let currentYear = ''

  for (const post of posts) {
    const year = post.publishedAt.slice(0, 4)
    if (year !== currentYear) {
      currentYear = year
      groups.push({ year, posts: [] })
    }
    groups[groups.length - 1].posts.push(post)
  }
  return groups
}

export function BlogTimeline({ posts }: BlogTimelineProps) {
  const groups = groupByYear(posts)

  if (posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16 text-foreground-3"
      >
        <p className="text-lg font-medium">No articles found</p>
        <p className="text-sm mt-1">Try adjusting your filters.</p>
      </motion.div>
    )
  }

  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border/10 hidden lg:block" />

      <AnimatePresence mode="popLayout">
        {groups.map(({ year, posts: yearPosts }) => (
          <div key={year} className="relative mb-10 last:mb-0">
            {/* Year marker */}
            <div className="flex items-center gap-3 mb-5 lg:pl-6 relative">
              {/* Timeline dot */}
              <div className="hidden lg:block absolute left-0 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent-blue border-2 border-background" />
              <span className="text-sm font-mono font-bold text-accent-blue">{year}</span>
              <div className="h-px flex-1 bg-border/8" />
            </div>

            {/* Posts grid */}
            <div className="lg:pl-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {yearPosts.map((post) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
