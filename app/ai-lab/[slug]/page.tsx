import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ALL_EXPERIMENTS } from '@/lib/data'
import { EXPERIMENT_DETAILS } from '@/lib/experiment-details'
import { ExperimentDetail } from '@/components/sections/ai-lab/ExperimentDetail'
import { PrevNext } from '@/components/ui/PrevNext'

const EXPERIMENTS = [...ALL_EXPERIMENTS].sort((a, b) => a.order - b.order)

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return EXPERIMENTS.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const experiment = EXPERIMENTS.find((e) => e.slug === slug)
  if (!experiment) return { title: 'Experiment not found' }

  return {
    title: experiment.title,
    description: experiment.summary,
    openGraph: { title: experiment.title, description: experiment.summary },
  }
}

const link = (e: (typeof EXPERIMENTS)[number] | undefined) =>
  e ? { href: `/ai-lab/${e.slug}`, title: e.title } : null

export default async function ExperimentPage({ params }: PageProps) {
  const { slug } = await params
  const index = EXPERIMENTS.findIndex((e) => e.slug === slug)
  const experiment = EXPERIMENTS[index]
  const details = EXPERIMENT_DETAILS[slug]
  if (!experiment || !details) notFound()

  return (
    <article>
      <ExperimentDetail experiment={experiment} details={details} />
      <PrevNext
        label="More experiments"
        noun="experiment"
        prev={link(EXPERIMENTS[index - 1])}
        next={link(EXPERIMENTS[index + 1])}
      />
    </article>
  )
}
