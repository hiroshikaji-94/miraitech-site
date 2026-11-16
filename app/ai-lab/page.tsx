import { LabHeader } from '@/components/sections/ai-lab/LabHeader'
import { ExperimentGrid } from '@/components/sections/ai-lab/ExperimentGrid'

export const metadata = {
  title: 'AI Lab',
  description: 'AI experiments, LLM apps, RAG systems, multi-agent systems, and research — pushing the boundaries of what\'s possible.',
}

export default function AILabPage() {
  return (
    <>
      <LabHeader />

      <ExperimentGrid />
    </>
  )
}
