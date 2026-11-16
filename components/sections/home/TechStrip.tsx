'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/FadeIn'
import { FlowLines } from '@/components/ui/FlowLines'
import { TECH_AI, TECH_FULLSTACK } from '@/lib/data'
import { ease } from '@/lib/motion'

function TechTag({ tech, accent }: { tech: string; accent: 'warm' | 'blue' }) {
  return (
    <motion.span
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease }}
      className={cn(
        'text-[11px] font-mono text-foreground-2 px-2.5 py-1',
        'border border-border/8 bg-surface/50',
        'transition-colors duration-200 cursor-default',
        accent === 'warm'
          ? 'hover:text-accent-warm hover:border-accent-warm/25 hover:bg-accent-warm/5'
          : 'hover:text-accent-blue hover:border-accent-blue/25 hover:bg-accent-blue/5',
      )}
    >
      {tech}
    </motion.span>
  )
}

export function TechStrip() {
  return (
    <section className="py-20 md:py-28 relative border-y border-border/6 bg-surface/30 overflow-hidden">
      {/* Flowing curved lines — reinforces the precision/coordinate identity */}
      <FlowLines accent="mixed" />

      <Container className="relative z-10">
        <FadeIn>
          <div className="flex items-start justify-between mb-12">
            <div>
              <span className="section-index block mb-3">03 — STACK</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                Our Technology Stack
              </h2>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {/* AI & ML column */}
          <StaggerContainer stagger={0.02} delay={0.1}>
            <div>
              <h3 className="text-[11px] font-mono text-accent-warm uppercase tracking-[0.15em] mb-5 pb-2.5 border-b border-accent-warm/15">
                AI & Machine Learning
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {TECH_AI.map((tech) => (
                  <StaggerItem key={tech} direction="up">
                    <TechTag tech={tech} accent="warm" />
                  </StaggerItem>
                ))}
              </div>
            </div>
          </StaggerContainer>

          {/* Full Stack column */}
          <StaggerContainer stagger={0.02} delay={0.2}>
            <div>
              <h3 className="text-[11px] font-mono text-accent-blue uppercase tracking-[0.15em] mb-5 pb-2.5 border-b border-accent-blue/15">
                Full-Stack Engineering
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {TECH_FULLSTACK.map((tech) => (
                  <StaggerItem key={tech} direction="up">
                    <TechTag tech={tech} accent="blue" />
                  </StaggerItem>
                ))}
              </div>
            </div>
          </StaggerContainer>
        </div>
      </Container>
    </section>
  )
}
