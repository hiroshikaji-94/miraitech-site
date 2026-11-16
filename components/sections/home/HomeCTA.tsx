'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/ui/FadeIn'
import { MeridianBackground } from '@/components/ui/MeridianBackground'

export function HomeCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  })

  const lineWidth = useTransform(scrollYProgress, [0, 0.6], ['0%', '100%'])

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-36 relative border-t border-border/6 overflow-hidden"
    >
      {/* Meridian — matching hero atmosphere */}
      <MeridianBackground intensity="subtle" lines={false} parallax={false} />

      {/* Accent lines — top-right corner */}
      <motion.div
        className="pointer-events-none absolute top-0 right-0 w-px bg-gradient-to-b from-accent-warm/20 to-transparent"
        style={{ height: lineWidth }}
      />
      <motion.div
        className="pointer-events-none absolute top-0 right-0 h-px bg-gradient-to-l from-accent-warm/20 to-transparent"
        style={{ width: lineWidth }}
      />

      <Container className="relative z-10">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-20 items-end">
            <div>
              <span className="section-index block mb-3">06 — NEXT</span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95]">
                Ready to move
                <br />
                <span className="gradient-text">together?</span>
              </h2>
              <p className="mt-6 text-foreground-2 text-base md:text-lg max-w-md leading-relaxed text-pretty">
                We work with teams and founders who need AI and full-stack
                systems built properly the first time.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button href="/contact" size="lg">
                Start a project
                <ArrowRight size={15} />
              </Button>
              <Button href="/team" variant="secondary" size="lg">
                Meet the team
              </Button>
              <Button href="/about" variant="ghost" size="lg">
                About MiraiTech
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
