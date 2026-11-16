'use client'

import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
import { MemberCard } from './MemberCard'
import { LEAD } from '@/lib/team'

export function Leadership() {
  return (
    <section className="py-20 md:py-28 relative border-t border-border/6 overflow-hidden">
      <AmbientGlow preset="warm" intensity="subtle" />

      <Container className="relative z-10">
        <FadeIn>
          <span className="section-index block mb-3">01 — LEADERSHIP</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-10">
            Who leads the work
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <MemberCard member={LEAD} featured />
        </FadeIn>
      </Container>
    </section>
  )
}
