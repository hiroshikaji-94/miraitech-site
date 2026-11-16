'use client'

import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/ui/FadeIn'
import { MeridianBackground } from '@/components/ui/MeridianBackground'
import { SITE } from '@/lib/site'

export function AboutCTA() {
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
                Ready to build
                <br />
                <span className="gradient-text">with us?</span>
              </h2>
              <p className="mt-6 text-foreground-2 text-base md:text-lg max-w-md leading-relaxed text-pretty">
                Tell {SITE.name} what you are building. We will give you an honest
                recommendation on the approach — and introduce the engineer who
                would lead it.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button href="/contact" size="lg">
                Start a project
                <ArrowRight size={15} />
              </Button>
              <Button href="/team" variant="secondary" size="lg">
                Meet the engineers
              </Button>
              <Button href="/projects" variant="ghost" size="lg">
                View all projects
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
