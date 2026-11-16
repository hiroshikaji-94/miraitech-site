import type { Metadata } from 'next'
import { TeamHero } from '@/components/sections/team/TeamHero'
import { Leadership } from '@/components/sections/team/Leadership'
import { TeamGrid } from '@/components/sections/team/TeamGrid'
import { HowWeWork } from '@/components/sections/team/HowWeWork'
import { TeamCTA } from '@/components/sections/team/TeamCTA'

export const metadata: Metadata = {
  title: 'Team',
  description:
    'The senior engineers behind MiraiTech — a small Tokyo team covering AI, full-stack product, and data engineering, working in Japanese and English.',
}

export default function TeamPage() {
  return (
    <>
      <TeamHero />
      <Leadership />
      <TeamGrid />
      <HowWeWork />
      <TeamCTA />
    </>
  )
}
