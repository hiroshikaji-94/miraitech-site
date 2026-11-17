import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { PostList } from '@/components/sections/blog/PostList'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Notes from MiraiTech on running language models in production, and on the web and data systems around them.',
}

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Notes from client work and the lab."
        intro={
          <p>
            Mostly about running language models in production, sometimes about the web and data
            systems around them.
          </p>
        }
      />
      <PostList />
    </>
  )
}
