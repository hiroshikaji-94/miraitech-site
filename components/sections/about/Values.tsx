'use client'

import { Zap, Eye, Users, RefreshCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/FadeIn'
import { AmbientGlow } from '@/components/ui/AmbientGlow'

const values = [
  {
    icon: Zap,
    title: 'Ship with Purpose',
    description:
      'Every line of code should serve the product. Our team focuses on pragmatic solutions over clever abstractions, and working software over impressive demos.',
  },
  {
    icon: Eye,
    title: 'Think in Systems',
    description:
      'Good engineering means understanding the full picture — how components interact, where failures happen, and how to design for resilience. We hold each other to that standard.',
  },
  {
    icon: RefreshCcw,
    title: 'Iterate Relentlessly',
    description:
      'We ship early, measure ruthlessly, and improve with data. Evaluation is a core engineering discipline at MiraiTech, not an afterthought.',
  },
  {
    icon: Users,
    title: 'Communicate as a Team',
    description:
      'Technical depth means nothing if the team can\'t align. We document decisions, share context early, and explain our choices clearly — in Japanese or English, whichever your team works in.',
  },
]

export function Values() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <AmbientGlow preset="blue" intensity="whisper" />
      <Container className="relative z-10">
        <FadeIn className="text-center mb-12">
          <span className="section-index block mb-3">PRINCIPLES</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Our Principles
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.06}>
          {values.map(({ icon: Icon, title, description }) => (
            <StaggerItem key={title}>
              <div className={cn(
                'h-full p-5 rounded-xl text-center',
                'bg-surface border border-border/8',
                'transition-all duration-300',
                'hover:border-border/15 hover:shadow-card',
              )}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-violet/10 border border-accent-violet/15 mx-auto mb-4">
                  <Icon size={18} className="text-accent-violet" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-sm text-foreground-2 leading-relaxed">
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
