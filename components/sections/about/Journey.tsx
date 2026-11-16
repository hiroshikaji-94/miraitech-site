'use client'

import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
import { SITE } from '@/lib/site'

export function Journey() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <AmbientGlow preset="warm" intensity="subtle" />
      <Container size="md" className="relative z-10">
        <FadeIn>
          <span className="section-index block mb-3">ORIGIN STORY</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Why {SITE.name} exists
          </h2>
        </FadeIn>

        <div className="space-y-6 text-foreground-2 leading-[1.8]">
          <FadeIn delay={0.05}>
            <p>
              {SITE.name} started from a simple observation: the best AI products were
              not coming from teams that only understood models, nor from teams that
              only understood software. They came from people who could think across
              both — designing agent and retrieval architectures while also shipping the
              APIs, frontends, and deployment pipelines around them.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p>
              Our founders spent years building web applications and data systems for
              Japanese companies in logistics, manufacturing, and finance — learning how
              to structure codebases, design APIs, keep databases honest, and ship
              products people actually use. When the team came together in Tokyo in{' '}
              {SITE.founded} and moved into AI engineering, that foundation became the
              point. Production AI is not just the model. It is the whole system
              around it.
            </p>
          </FadeIn>

          {/* Pull quote */}
          <FadeIn delay={0.15}>
            <blockquote className={cn(
              'my-8 border-l-2 border-accent-blue/30 pl-6 py-2',
              'text-lg md:text-xl font-display font-medium text-foreground italic',
            )}>
              &ldquo;We don&apos;t just prototype. We ship production systems that
              handle real traffic, real data, and real stakes.&rdquo;
            </blockquote>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p>
              Today, {SITE.name} is a small senior team based in {SITE.location.area}.
              We build retrieval pipelines, multi-agent systems, and LLM applications —
              and the APIs, databases, deployment pipelines, and monitoring that keep
              them running. Every engagement is led by an engineer who writes code on
              it, and every client can reach that engineer directly, in Japanese or
              English.
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
