'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { MeridianBackground } from '@/components/ui/MeridianBackground'
import { ALL_POSTS, BLOG_CATEGORIES } from '@/lib/data'

const ease = [0.21, 0.47, 0.32, 0.98] as const

export function BlogHeader() {
  const totalPosts   = ALL_POSTS.length
  const totalMinutes = ALL_POSTS.reduce((sum, p) => sum + p.readingTime, 0)
  const categories   = BLOG_CATEGORIES.length - 1

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <MeridianBackground intensity="subtle" lines={false} parallax={false} />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <span className="section-index block mb-6">JOURNAL — ENGINEERING</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.02em] leading-[0.95]"
        >
          Writing on{' '}
          <span className="gradient-text">AI & Engineering</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
          className="mt-5 text-lg text-foreground-2 max-w-2xl leading-relaxed text-pretty"
        >
          Deep dives from the MiraiTech team into AI engineering, full-stack architecture,
          system design, and the technical decisions behind production systems.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25, ease }}
          className="mt-8 flex flex-wrap items-center gap-6"
        >
          {[
            { value: totalPosts,       label: 'Articles' },
            { value: `${totalMinutes}+`, label: 'Min Reading' },
            { value: categories,       label: 'Topics' },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="font-mono font-bold text-foreground text-sm">{value}</span>
              <span className="text-[11px] font-mono text-foreground-3 uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
