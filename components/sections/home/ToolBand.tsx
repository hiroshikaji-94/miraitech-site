import { Container } from '@/components/ui/Container'

// Tools that show up in most of our projects (see lib/about.ts for the full list).
const TOOLS = [
  { name: 'Claude',    area: 'Models' },
  { name: 'OpenAI',    area: 'Models' },
  { name: 'LangGraph', area: 'Agents' },
  { name: 'pgvector',  area: 'Retrieval' },
  { name: 'dbt',       area: 'Data' },
  { name: 'BigQuery',  area: 'Data' },
  { name: 'Next.js',   area: 'Product' },
  { name: 'AWS',       area: 'Cloud' },
]

export function ToolBand() {
  return (
    <section aria-labelledby="tools-title" className="pb-20 md:pb-28">
      <Container>
        <h2 id="tools-title" className="text-center text-lg font-semibold tracking-[-0.01em] text-foreground-2 md:text-xl">
          The tools behind most of our projects.
        </h2>
      </Container>
      {/* The 1px gaps over a border-colored background draw the dividers at every breakpoint */}
      <div className="mt-8 border-y border-border/[0.07] bg-muted">
        <Container className="px-0 sm:px-8">
          <ul className="grid grid-cols-2 gap-px bg-border/[0.07] sm:grid-cols-4 lg:grid-cols-8">
            {TOOLS.map((tool) => (
              <li key={tool.name} className="flex flex-col items-center justify-center gap-2 bg-muted py-7 text-center">
                <span className="text-xl font-bold tracking-[-0.03em] text-foreground-2">{tool.name}</span>
                <span className="mono-label text-[10px] text-foreground-3">{tool.area}</span>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  )
}
