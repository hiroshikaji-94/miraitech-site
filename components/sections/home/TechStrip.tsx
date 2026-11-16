'use client'

import { Brain, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/FadeIn'
import { TECH_AI, TECH_FULLSTACK } from '@/lib/data'

const GROUPS = [
  {
    icon:  Brain,
    title: 'AI & machine learning',
    blurb: 'Retrieval, agents, evaluation and model operations.',
    items: TECH_AI,
  },
  {
    icon:  Layers,
    title: 'Full-stack engineering',
    blurb: 'Typed APIs, data stores, interfaces and infrastructure.',
    items: TECH_FULLSTACK,
  },
]

export function TechStrip() {
  return (
    <section className="py-20 md:py-28 relative border-y border-border/8 bg-muted">
      <Container>
        <FadeIn>
          <div className="max-w-2xl mb-12">
            <span className="section-index block mb-3">03 — Stack</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Our technology stack
            </h2>
            <p className="mt-4 text-lg text-foreground-2 leading-relaxed">
              A deliberately boring core — proven tools we know deeply — so the hard
              problems get our attention, not the plumbing.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.1}>
          {GROUPS.map(({ icon: Icon, title, blurb, items }) => (
            <StaggerItem key={title} className="h-full">
              <div className="card h-full p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-warm/10 text-accent-warm">
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
                    <p className="mt-1 text-sm text-foreground-3">{blurb}</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {items.map((tech) => (
                    <span
                      key={tech}
                      className={cn(
                        'rounded-lg border border-border/10 bg-surface px-3 py-1.5',
                        'text-sm text-foreground-2',
                        'transition-colors duration-200 hover:border-accent-warm/30 hover:text-accent-warm',
                      )}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
