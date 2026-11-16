'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { MeridianBackground } from '@/components/ui/MeridianBackground'
import { ALL_EXPERIMENTS } from '@/lib/data'

const ease = [0.21, 0.47, 0.32, 0.98] as const

const codeLines = [
  'from langchain import Agent, Tool',
  'model = ChatAnthropic("claude-sonnet-4-6")',
  'embeddings = HuggingFaceEmbeddings()',
  'retriever = PineconeRetriever(index, k=5)',
  'chain = RetrievalQA.from_chain_type(model)',
  'result = await agent.ainvoke(query)',
  'metrics = evaluate(result, ground_truth)',
  'if metrics.f1 > 0.92: deploy()',
]

export function LabHeader() {
  const total    = ALL_EXPERIMENTS.length
  const live     = ALL_EXPERIMENTS.filter((e) => e.status === 'live').length
  const research = ALL_EXPERIMENTS.filter((e) => e.status === 'research').length

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <MeridianBackground intensity="subtle" lines={false} parallax={false} />

      {/* Accent lines */}
      <div className="pointer-events-none absolute top-0 left-0 w-px h-[30vh] bg-gradient-to-b from-accent-blue/15 to-transparent" />
      <div className="pointer-events-none absolute top-0 left-0 h-px w-[20vw] bg-gradient-to-r from-accent-blue/15 to-transparent" />

      {/* Floating code lines (right side) */}
      <div className="pointer-events-none absolute top-8 right-0 w-[500px] hidden lg:block opacity-[0.04]">
        {codeLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease }}
            className="font-mono text-sm text-foreground leading-loose whitespace-nowrap"
          >
            <span className="text-foreground-3 mr-3 select-none">{String(i + 1).padStart(2, '0')}</span>
            {line}
          </motion.div>
        ))}
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <span className="section-index block mb-6">LAB — EXPERIMENTS</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.02em] leading-[0.95]"
        >
          Experiments &{' '}
          <span className="gradient-text">Research</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
          className="mt-5 text-lg text-foreground-2 max-w-2xl leading-relaxed text-pretty"
        >
          Where we explore LLMs, multi-agent systems, retrieval architectures,
          and computer vision. Not every experiment ships — but every one informs our client work.
        </motion.p>

        {/* Stats — inline, monospace */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25, ease }}
          className="mt-8 flex flex-wrap items-center gap-6"
        >
          {[
            { label: 'Total',     value: total,    color: 'text-foreground' },
            { label: 'Live',      value: live,     color: 'text-emerald-700 dark:text-emerald-400' },
            { label: 'Research',  value: research, color: 'text-accent-blue' },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center gap-2">
              <span className={cn('font-mono font-bold text-sm', color)}>{value}</span>
              <span className="text-[11px] font-mono text-foreground-3 uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
