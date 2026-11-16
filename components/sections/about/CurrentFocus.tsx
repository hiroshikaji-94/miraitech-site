'use client'

import { Brain, Layers, Rocket } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/FadeIn'
import { AmbientGlow } from '@/components/ui/AmbientGlow'

const focuses = [
  {
    icon: Brain,
    title: 'AI Engineering',
    description:
      'Production RAG systems, multi-agent architectures, and LLM-powered applications with robust evaluation and deployment pipelines.',
    tags: ['LangGraph', 'RAG', 'PydanticAI', 'Agentic AI'],
    color: 'text-accent-blue bg-accent-blue/10 border-accent-blue/15',
  },
  {
    icon: Layers,
    title: 'Full-Stack Architecture',
    description:
      'Scalable web applications with modern frameworks — type-safe APIs, real-time systems, and performance-first frontend experiences.',
    tags: ['Next.js', 'TypeScript', 'tRPC', 'Drizzle'],
    color: 'text-accent-violet bg-accent-violet/10 border-accent-violet/15',
  },
  {
    icon: Rocket,
    title: 'Production Delivery',
    description:
      'Closing the gap between prototypes and production — CI/CD for AI, observability, cost optimization, and operational rigor at every layer.',
    tags: ['Docker', 'CI/CD', 'Monitoring', 'MLOps'],
    color: 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/15',
  },
]

export function CurrentFocus() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <AmbientGlow preset="blue-warm" intensity="subtle" />

      <Container className="relative z-10">
        <FadeIn className="text-center mb-12">
          <span className="section-index block mb-3">CAPABILITIES</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Our Practice Areas
          </h2>
          <p className="mt-4 text-foreground-2 max-w-lg mx-auto">
            Three disciplines we bring together to deliver end-to-end digital products.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {focuses.map(({ icon: Icon, title, description, tags, color }) => (
            <StaggerItem key={title}>
              <div className={cn(
                'h-full p-6 rounded-xl',
                'bg-surface border border-border/8',
                'transition-all duration-300',
                'hover:border-border/15 hover:shadow-card-hover hover:-translate-y-0.5',
              )}>
                <div className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-xl border mb-4',
                  color,
                )}>
                  <Icon size={20} />
                </div>

                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {title}
                </h3>

                <p className="text-sm text-foreground-2 leading-relaxed mb-4">
                  {description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-surface-high text-foreground-3 border border-border/5"
                    >
                      {tag}
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
