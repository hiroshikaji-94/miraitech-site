'use client'

import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { MeridianBackground } from '@/components/ui/MeridianBackground'
import { ALL_PROJECTS } from '@/lib/data'

export function ProjectsHeader() {
  const count = ALL_PROJECTS.length

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <MeridianBackground intensity="subtle" lines={false} parallax={false} />

      <div className="pointer-events-none absolute top-0 left-0 w-px h-[30vh] bg-gradient-to-b from-accent-blue/15 to-transparent" />
      <div className="pointer-events-none absolute top-0 left-0 h-px w-[20vw] bg-gradient-to-r from-accent-blue/15 to-transparent" />

      <Container className="relative z-10">
        <FadeIn>
          <span className="section-index block mb-6">PROJECTS — {count} TOTAL</span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.02em] leading-[0.95]">
            Built for{' '}
            <span className="gradient-text">Production</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-5 text-lg text-foreground-2 max-w-2xl leading-relaxed text-pretty">
            {count} engagements spanning autonomous AI agents, enterprise RAG,
            real-time platforms, and developer tooling — each designed by the Tokyo team for production load.
          </p>
        </FadeIn>
      </Container>
    </section>
  )
}
