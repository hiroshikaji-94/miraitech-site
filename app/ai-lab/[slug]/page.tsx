import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ALL_EXPERIMENTS } from '@/lib/data'
import { EXPERIMENT_DETAILS } from '@/lib/experiment-details'
import { ExperimentDetailClient } from './ExperimentDetailClient'

// ─── Static params for all known experiments ────────────────────

export function generateStaticParams() {
  return ALL_EXPERIMENTS.map((e) => ({ slug: e.slug }))
}

// ─── Dynamic metadata ────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const experiment = ALL_EXPERIMENTS.find((e) => e.slug === slug)

  if (!experiment) return { title: 'Experiment Not Found' }

  return {
    title: `${experiment.title} — AI Lab`,
    description: experiment.summary,
    openGraph: {
      title: experiment.title,
      description: experiment.summary,
    },
  }
}

// ─── Page ────────────────────────────────────────────────────────

export default async function ExperimentDetailPage({ params }: PageProps) {
  const { slug } = await params

  const experimentIndex = ALL_EXPERIMENTS.findIndex((e) => e.slug === slug)
  const experiment = ALL_EXPERIMENTS[experimentIndex]
  const details = EXPERIMENT_DETAILS[slug]

  if (!experiment || !details) notFound()

  const prev = experimentIndex > 0 ? ALL_EXPERIMENTS[experimentIndex - 1] : null
  const next = experimentIndex < ALL_EXPERIMENTS.length - 1 ? ALL_EXPERIMENTS[experimentIndex + 1] : null

  return (
    <ExperimentDetailClient
      experiment={experiment}
      details={details}
      prev={prev}
      next={next}
    />
  )
}
