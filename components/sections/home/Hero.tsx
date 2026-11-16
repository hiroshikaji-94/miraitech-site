'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { MeridianBackground } from '@/components/ui/MeridianBackground'
import { ease, easeDramatic } from '@/lib/motion'
import { ALL_PROJECTS, ALL_EXPERIMENTS } from '@/lib/data'
import { SITE } from '@/lib/site'

/* ─── Animated counter ───────────────────────────────────────── */

function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const num = parseInt(value)
  const suffix = value.replace(/\d+/, '')

  return (
    <div ref={ref}>
      <div className="flex items-baseline">
        <motion.span
          className="text-3xl md:text-4xl font-display font-bold tracking-tight text-foreground tabular-nums"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay, ease }}
        >
          {isInView ? num : 0}
        </motion.span>
        <motion.span
          className="text-xl md:text-2xl font-display font-bold text-accent-warm ml-0.5"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: delay + 0.2 }}
        >
          {suffix}
        </motion.span>
      </div>
      <motion.p
        className="text-[11px] font-mono text-foreground-3 mt-1.5 tracking-[0.12em] uppercase"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.3 }}
      >
        {label}
      </motion.p>
    </div>
  )
}

/* ─── Stats derived from content ─────────────────────────────── */

const PROJECTS_SHIPPED = ALL_PROJECTS.length
const AI_SYSTEMS_LIVE =
  ALL_PROJECTS.filter((p) => p.category === 'AI' && p.status === 'live').length +
  ALL_EXPERIMENTS.filter((e) => e.status === 'live').length
const YEARS_ENGINEERING = 12 // combined senior experience across the team

/* ─── Hero ───────────────────────────────────────────────────── */

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh flex flex-col pt-16 overflow-hidden"
    >
      {/* Meridian background — the living coordinate system */}
      <MeridianBackground intensity="strong" />

      {/* Architectural accent lines — animated draw-in */}
      <motion.div
        className="pointer-events-none absolute top-0 left-0 w-px bg-gradient-to-b from-accent-warm/40 via-accent-warm/10 to-transparent"
        initial={{ height: 0 }}
        animate={{ height: '55vh' }}
        transition={{ duration: 1.4, delay: 0.3, ease: easeDramatic }}
      />
      <motion.div
        className="pointer-events-none absolute top-0 left-0 h-px bg-gradient-to-r from-accent-warm/40 via-accent-warm/10 to-transparent"
        initial={{ width: 0 }}
        animate={{ width: '40vw' }}
        transition={{ duration: 1.2, delay: 0.5, ease: easeDramatic }}
      />

      {/* Bottom-right architectural accent */}
      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 w-px bg-gradient-to-t from-accent-blue/20 to-transparent"
        initial={{ height: 0 }}
        animate={{ height: '25vh' }}
        transition={{ duration: 1.0, delay: 1.2, ease: easeDramatic }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 h-px bg-gradient-to-l from-accent-blue/20 to-transparent"
        initial={{ width: 0 }}
        animate={{ width: '20vw' }}
        transition={{ duration: 0.8, delay: 1.3, ease: easeDramatic }}
      />

      {/* Content — parallax on scroll */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col"
        style={{ y: contentY }}
      >
        <Container className="flex-1 flex flex-col justify-center py-24 md:py-32">
          {/* Top info line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
            className="flex items-center gap-6 mb-10 md:mb-14"
          >
            <span className="text-[11px] font-mono text-foreground-3 tracking-[0.15em] uppercase">
              {SITE.tagline}
            </span>
            <motion.div
              className="h-px flex-1 bg-border/8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.0, delay: 0.5, ease: easeDramatic }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>

          {/* Brand name — massive, cinematic reveal */}
          <div className="overflow-hidden">
            <motion.h1
              className="font-display text-[clamp(3rem,10vw,7rem)] font-bold tracking-[-0.04em] leading-[0.85] -ml-1 md:-ml-2"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.0, delay: 0.2, ease: easeDramatic }}
            >
              <span className="text-foreground">Mirai</span>
              <motion.span
                className="text-accent-warm inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease }}
              >
                Tech
              </motion.span>
            </motion.h1>
          </div>

          {/* Tagline — dramatic scale contrast */}
          <motion.p
            className="mt-5 md:mt-7 font-display text-xl md:text-2xl lg:text-[1.75rem] font-medium tracking-tight text-foreground-2 max-w-xl leading-[1.25]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease }}
          >
            A Tokyo engineering team building AI systems
            that run in production.
          </motion.p>

          {/* Divider — animated grow */}
          <motion.div
            className="mt-8 md:mt-12 flex items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <motion.div
              className="h-px w-16 bg-accent-warm/50"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: easeDramatic }}
              style={{ transformOrigin: 'left' }}
            />
            <motion.span
              className="text-[11px] font-mono text-foreground-3 tracking-[0.2em] uppercase"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.9, ease }}
            >
              {SITE.location.area} · JST
            </motion.span>
            <motion.div
              className="h-px flex-1 bg-border/6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.0, ease: easeDramatic }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>

          {/* Body + CTAs */}
          <motion.div
            className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-end"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease }}
          >
            <p className="text-base text-foreground-2 leading-[1.8] max-w-md">
              We turn hard problems into systems that hold up under real
              traffic — retrieval pipelines, agent architectures, and the
              full-stack products and data platforms around them.
            </p>

            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.95, ease }}
            >
              <Button href="/projects" size="lg">
                Our work
                <ArrowRight size={15} />
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Get in touch
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-14 md:mt-20 pt-5 border-t border-border/6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.0 }}
          >
            <div className="grid grid-cols-3 gap-6 max-w-lg">
              {[
                { value: `${PROJECTS_SHIPPED}+`,  label: 'Projects shipped' },
                { value: `${AI_SYSTEMS_LIVE}+`,   label: 'AI systems live' },
                { value: `${YEARS_ENGINEERING}+`, label: 'Years of engineering' },
              ].map(({ value, label }, i) => (
                <AnimatedStat key={label} value={value} label={label} delay={1.1 + i * 0.12} />
              ))}
            </div>
          </motion.div>
        </Container>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.span
          className="text-[10px] font-mono text-foreground-3/40 tracking-[0.2em] uppercase"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={13} className="text-foreground-3/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
