'use client'

import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/ui/FadeIn'
import { MeridianBackground } from '@/components/ui/MeridianBackground'
import { SITE } from '@/lib/site'

export function TeamCTA() {
  return (
    <section className="py-24 md:py-36 relative border-t border-border/6 overflow-hidden">
      <MeridianBackground intensity="subtle" lines={false} parallax={false} />
      <div className="pointer-events-none absolute top-0 right-0 w-px h-32 bg-gradient-to-b from-accent-warm/20 to-transparent" />
      <div className="pointer-events-none absolute top-0 right-0 h-px w-32 bg-gradient-to-l from-accent-warm/20 to-transparent" />

      <Container className="relative z-10">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-20 items-end">
            <div>
              <span className="section-index block mb-4">NEXT STEP</span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[0.95]">
                Want to work
                <br />
                <span className="gradient-text">with this team?</span>
              </h2>
              <p className="mt-6 text-foreground-2 text-base md:text-lg max-w-md leading-relaxed text-pretty">
                Describe what you are building. {SITE.name} will tell you honestly
                whether it is a good fit — and who would lead it.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button href="/contact" size="lg">
                Start a conversation
                <ArrowRight size={15} />
              </Button>
              <Button href="/projects" variant="secondary" size="lg">
                See our work
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
