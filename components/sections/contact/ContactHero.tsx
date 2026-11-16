'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { MeridianBackground } from '@/components/ui/MeridianBackground'

const ease = [0.21, 0.47, 0.32, 0.98] as const

export function ContactHero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <MeridianBackground intensity="subtle" lines={false} parallax={false} />

      <Container size="md" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <span className="section-index block mb-6">CONTACT — MIRAITECH</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.02em] leading-[0.95]"
        >
          Let&apos;s build something{' '}
          <span className="gradient-text">great</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
          className="mt-5 text-lg text-foreground-2 max-w-2xl leading-relaxed text-pretty"
        >
          Tell us about a product idea, an AI initiative that needs engineering,
          or a partnership you have in mind. Every message is read by the
          engineers themselves — and answered in Japanese or English.
        </motion.p>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25, ease }}
          className="mt-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 tracking-wider uppercase">
              Accepting new projects
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
