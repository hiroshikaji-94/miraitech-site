'use client'

import { motion } from 'framer-motion'
import { Users, MapPin } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { MeridianBackground } from '@/components/ui/MeridianBackground'
import { SITE } from '@/lib/site'

const ease = [0.21, 0.47, 0.32, 0.98] as const

export function AboutHero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <MeridianBackground intensity="subtle" lines={false} parallax={false} />


      <Container size="lg" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <span className="section-index block mb-6">ABOUT — {SITE.name.toUpperCase()}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-start">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.02em] leading-[0.95]"
            >
              We are {SITE.name}
              <br />
              <span className="gradient-text">AI engineering</span> from Tokyo
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
              className="mt-5 text-lg text-foreground-2 max-w-2xl leading-relaxed text-pretty"
            >
              {SITE.name} is a team of Japanese engineers in Tokyo that combines applied
              AI work — retrieval, agents, evaluation — with the full-stack and data
              engineering around it. We serve clients in Japan and abroad, in Japanese
              or English, and we only take on work we can ship to production.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25, ease }}
              className="mt-8 flex flex-wrap items-center gap-4 text-sm"
            >
              <span className="flex items-center gap-1.5 text-foreground-3 font-mono text-xs">
                <Users size={13} />
                Small senior team
              </span>
              <span className="w-px h-3 bg-border/15" />
              <span className="flex items-center gap-1.5 text-foreground-3 font-mono text-xs">
                <MapPin size={13} />
                Tokyo-based, clients in Japan and abroad
              </span>
            </motion.div>
          </div>

          {/* Monogram — right */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="hidden lg:flex items-center justify-center w-44 h-44 border border-border/8 bg-surface/50"
          >
            <span className="font-display text-5xl font-bold gradient-text">MT</span>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
