import type { Metadata } from 'next'
import { Hero } from '@/components/sections/home/Hero'
import { FeaturedProjects } from '@/components/sections/home/FeaturedProjects'
import { TechStrip } from '@/components/sections/home/TechStrip'
import { LatestContent } from '@/components/sections/home/LatestContent'
import { Studio } from '@/components/sections/home/Studio'
import { HomeCTA } from '@/components/sections/home/HomeCTA'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: `${SITE.name} — AI Engineering from Tokyo`,
  description:
    'A Tokyo engineering team building AI systems that run in production — retrieval pipelines, agent architectures, and the full-stack products and data platforms around them.',
  openGraph: {
    title: `${SITE.name} — AI Engineering from Tokyo`,
    description:
      'A Tokyo engineering team building AI systems that run in production.',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <TechStrip />
      <LatestContent />
      <Studio />
      <HomeCTA />
    </>
  )
}
