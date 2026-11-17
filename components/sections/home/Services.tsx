import { AppWindow, Database, FileSearch, Workflow } from 'lucide-react'
import { SERVICES } from '@/lib/data'
import { Section, SectionIntro } from '@/components/ui/Section'

// One icon per entry in SERVICES, in the same order
const ICONS = [FileSearch, Workflow, Database, AppWindow]

export function Services() {
  return (
    <Section id="what-we-do" labelledBy="services-title">
      <SectionIntro
        id="services-title"
        eyebrow="What we do"
        title="Four kinds of work."
        intro="Most projects fall into one or more of these areas. The larger ones touch all four."
      />
      <ul className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2">
        {SERVICES.map((service, i) => {
          const Icon = ICONS[i] ?? FileSearch
          return (
            <li key={service.title} className="card flex flex-col p-6 md:p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent-fg">
                <Icon size={20} strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-6 text-xl font-bold tracking-[-0.02em] text-foreground">{service.title}</h3>
              <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-foreground-2">{service.description}</p>
              <p className="mono-label mt-auto pt-6 text-[10px] text-foreground-3">{service.tools.join(' · ')}</p>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
