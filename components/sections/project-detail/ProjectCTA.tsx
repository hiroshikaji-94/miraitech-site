'use client'

import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/ui/FadeIn'
import { AmbientGlow } from '@/components/ui/AmbientGlow'

export function ProjectCTA() {
  return (
    <section className="py-20 md:py-28 border-t border-border/6 relative overflow-hidden">
      <AmbientGlow preset="center-violet" intensity="subtle" />
      <Container size="sm" className="text-center relative z-10">
        <FadeIn>
          <span className="section-index block mb-4">NEXT</span>
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-3">
            Interested in working with{' '}
            <span className="gradient-text">MiraiTech?</span>
          </h2>
          <p className="text-foreground-2 mb-8 max-w-md mx-auto">
            We build production systems like this for teams and founders who value quality engineering.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href="/contact" size="lg">
              Start a Conversation
              <ArrowRight size={15} />
            </Button>
            <Button href="/projects" variant="secondary" size="lg">
              More Projects
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
