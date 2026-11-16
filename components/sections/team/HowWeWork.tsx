'use client'

import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/FadeIn'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
import { HOW_WE_WORK } from '@/lib/team'

export function HowWeWork() {
  return (
    <section className="py-20 md:py-28 relative border-t border-border/6 overflow-hidden">
      <AmbientGlow preset="blue" intensity="whisper" />

      <Container className="relative z-10">
        <FadeIn>
          <span className="section-index block mb-3">03 — HOW WE WORK</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-12">
            Small team, no handovers
          </h2>
        </FadeIn>

        <StaggerContainer className="border-t border-border/10" stagger={0.08}>
          {HOW_WE_WORK.map(({ title, description }, i) => (
            <StaggerItem key={title}>
              <div className={cn(
                'grid grid-cols-1 md:grid-cols-[auto_1fr_1.4fr] gap-3 md:gap-10',
                'py-7 md:py-9 border-b border-border/10',
              )}>
                <span className="text-[11px] font-mono text-foreground-3/60 tabular-nums md:w-8">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {title}
                </h3>
                <p className="text-sm md:text-base text-foreground-2 leading-relaxed">
                  {description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
