import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { ExperimentList } from '@/components/sections/ai-lab/ExperimentList'

export const metadata: Metadata = {
  title: 'AI Lab',
  description: 'Experiments MiraiTech runs between client projects: local models, agents, retrieval, vision and automation, with the numbers from our own benchmarks.',
}

export default function AILabPage() {
  return (
    <>
      <PageHeader
        eyebrow="AI Lab"
        title="Experiments between projects."
        intro={
          <p>
            Some ended up in client work, and some taught us what not to do. The numbers come from our
            own benchmarks, and each page explains how we measured them.
          </p>
        }
      />
      <ExperimentList />
    </>
  )
}
