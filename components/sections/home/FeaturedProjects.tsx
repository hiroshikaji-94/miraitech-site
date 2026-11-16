'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/FadeIn'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
import { FEATURED_PROJECTS } from '@/lib/data'

export function FeaturedProjects() {
  const projects = FEATURED_PROJECTS.slice(0, 4)

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Warm glow bleeding down from Hero — connects the two sections */}
      <AmbientGlow preset="warm" intensity="gentle" />

      <Container className="relative z-10">
        {/* Section header */}
        <FadeIn>
          <div className="flex items-start justify-between mb-14 md:mb-20">
            <div>
              <span className="section-index block mb-3">02 — WORK</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Selected Work
              </h2>
              <p className="mt-3 text-foreground-2 max-w-md">
                Production systems we&apos;ve designed, built, and shipped.
              </p>
            </div>
            <Button href="/projects" variant="secondary" size="sm" className="hidden md:inline-flex mt-2">
              All Projects
              <ArrowRight size={13} />
            </Button>
          </div>
        </FadeIn>

        {/* Project list — editorial index */}
        <StaggerContainer stagger={0.08}>
          <div className="border-t border-border/10">
            {projects.map((project, i) => (
              <StaggerItem key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className={cn(
                    'group block py-8 md:py-10 border-b border-border/10',
                    'transition-colors duration-300',
                    'hover:bg-surface/40',
                  )}
                >
                  <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 md:gap-10 items-center">
                    {/* Index number */}
                    <span className="text-[11px] font-mono text-foreground-3/60 tabular-nums md:w-8">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Content */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                        <h3 className={cn(
                          'font-display text-xl md:text-2xl font-semibold',
                          'text-foreground group-hover:text-accent-warm',
                          'transition-colors duration-200',
                        )}>
                          {project.title}
                        </h3>
                        <span className="text-[11px] font-mono text-foreground-3 uppercase tracking-wider">
                          {project.category}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-foreground-2 line-clamp-1 max-w-2xl leading-relaxed">
                        {project.summary}
                      </p>
                      {/* Tech tags */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.stack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-mono text-foreground-3 px-2 py-0.5 border border-border/8 transition-colors duration-200 group-hover:border-border/15"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow with hover animation */}
                    <motion.div
                      className="hidden md:flex items-center justify-center h-10 w-10 border border-border/8 text-foreground-3 group-hover:border-accent-warm/30 group-hover:text-accent-warm transition-all duration-300"
                    >
                      <ArrowUpRight
                        size={16}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                      />
                    </motion.div>
                  </div>

                  {/* Hover progress line */}
                  <div className="relative mt-6 h-px bg-transparent overflow-hidden">
                    <div className="absolute inset-0 bg-accent-warm/30 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {/* Mobile view all */}
        <FadeIn delay={0.3} className="md:hidden mt-8">
          <Button href="/projects" variant="secondary" size="md" className="w-full justify-center">
            View All Projects
            <ArrowRight size={15} />
          </Button>
        </FadeIn>
      </Container>
    </section>
  )
}
