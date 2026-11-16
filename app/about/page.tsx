import type { Metadata } from 'next'
import { AboutHero } from '@/components/sections/about/AboutHero'
import { Journey } from '@/components/sections/about/Journey'
import { CurrentFocus } from '@/components/sections/about/CurrentFocus'
import { Skills } from '@/components/sections/about/Skills'
import { Timeline } from '@/components/sections/about/Timeline'
import { Values } from '@/components/sections/about/Values'
import { AboutCTA } from '@/components/sections/about/AboutCTA'

export const metadata: Metadata = {
  title: 'About',
  description:
    'MiraiTech is a small senior engineering team in Tokyo building production AI, full-stack, and data systems for clients in Japan and abroad. Our story, practice areas, and principles.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Journey />
      <CurrentFocus />
      <Skills />
      <Timeline />
      <Values />
      <AboutCTA />
    </>
  )
}
