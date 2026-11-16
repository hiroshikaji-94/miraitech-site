'use client'

import { useMemo, useState } from 'react'
import { Container } from '@/components/ui/Container'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
import { BlogHeader } from '@/components/sections/blog/BlogHeader'
import { FeaturedPost } from '@/components/sections/blog/FeaturedPost'
import { BlogFilters } from '@/components/sections/blog/BlogFilters'
import { BlogTimeline } from '@/components/sections/blog/BlogTimeline'
import { ALL_POSTS, BLOG_CATEGORIES } from '@/lib/data'
import type { BlogCategory, ContentBadge } from '@/lib/data'

const featuredPost = ALL_POSTS.find((p) => p.featured) ?? ALL_POSTS[0]
const restPosts = ALL_POSTS.filter((p) => p.slug !== featuredPost.slug)

export default function BlogPage() {
  const [category, setCategory] = useState<BlogCategory>('All')
  const [contentType, setContentType] = useState<ContentBadge | null>(null)

  const filteredPosts = useMemo(() => {
    return restPosts.filter((p) => {
      if (category !== 'All' && p.category !== category) return false
      if (contentType && !p.contentBadges.includes(contentType)) return false
      return true
    })
  }, [category, contentType])

  // Category counts (from restPosts, unaffected by content type filter)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const cat of BLOG_CATEGORIES) {
      counts[cat] = cat === 'All'
        ? restPosts.length
        : restPosts.filter((p) => p.category === cat).length
    }
    return counts
  }, [])

  return (
    <>
      <BlogHeader />

      {/* Featured post */}
      <FeaturedPost post={featuredPost} />

      {/* Divider */}
      <Container>
        <div className="h-px bg-gradient-to-r from-transparent via-border/15 to-transparent" />
      </Container>

      {/* Filters + Timeline */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <AmbientGlow preset="warm" intensity="whisper" />
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-12">
            <BlogFilters
              activeCategory={category}
              onCategoryChange={setCategory}
              activeContentType={contentType}
              onContentTypeChange={setContentType}
              categoryCounts={categoryCounts}
            />
            <BlogTimeline posts={filteredPosts} />
          </div>
        </Container>
      </section>
    </>
  )
}
