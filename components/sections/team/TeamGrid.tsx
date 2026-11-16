'use client'

import { Container } from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/FadeIn'
import { FlowLines } from '@/components/ui/FlowLines'
import { MemberCard } from './MemberCard'
import { TEAM } from '@/lib/team'

export function TeamGrid() {
  return (
    <section className="py-20 md:py-28 relative border-t border-border/6 bg-muted overflow-hidden">
      <FlowLines accent="mixed" />

      <Container className="relative z-10">
        <FadeIn>
          <span className="section-index block mb-3">02 — THE TEAM</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Engineers you will actually work with
          </h2>
          <p className="mt-3 text-foreground-2 max-w-lg">
            Three engineers covering AI, full-stack product, and data — each area owned by someone
            who has shipped it in production before.
          </p>
        </FadeIn>

        <StaggerContainer className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5" stagger={0.08}>
          {TEAM.map((member) => (
            <StaggerItem key={member.slug} className="h-full">
              <MemberCard member={member} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
