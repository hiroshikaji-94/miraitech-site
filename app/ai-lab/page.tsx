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

      {/* Divider with gradient line */}
      <div className="relative">
        <div className="w-full border-t border-border/8" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-accent-violet/30 to-transparent" />
      </div>

      <ExperimentGrid />
    </>
  )
}
