'use client'

import { motion } from 'framer-motion'
import { MapPin, ShieldCheck, Languages } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { MeridianBackground } from '@/components/ui/MeridianBackground'
import { SITE } from '@/lib/site'

const ease = [0.21, 0.47, 0.32, 0.98] as const

const facts = [
  { icon: MapPin,      label: 'Where we work',      value: 'Tokyo' },
  { icon: ShieldCheck, label: 'How we staff',       value: 'Senior-only' },
  { icon: Languages,   label: 'How we communicate', value: 'JP / EN' },
]

export function TeamHero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <MeridianBackground intensity="subtle" lines={false} parallax={false} />


      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <span className="section-index block mb-6">TEAM — {SITE.name.toUpperCase()}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.02em] leading-[0.95]"
        >
          The engineers{' '}
          <span className="gradient-text">behind the work</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
          className="mt-5 text-lg text-foreground-2 max-w-2xl leading-relaxed text-pretty"
        >
          {SITE.name} is intentionally small. Senior engineers deliver every project —
          they write the code, review the deployments, and speak with clients directly.
          There is no handoff to a junior bench.
        </motion.p>

        {/* Key facts */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25, ease }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-px overflow-hidden rounded-2xl bg-border/10 border border-border/10 shadow-card max-w-3xl"
        >
          {facts.map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-surface p-5">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} className="text-accent-warm" />
                <span className="text-[11px] font-mono text-foreground-3 uppercase tracking-[0.12em]">
                  {label}
                </span>
              </div>
              <p className="font-display font-semibold text-foreground">{value}</p>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
