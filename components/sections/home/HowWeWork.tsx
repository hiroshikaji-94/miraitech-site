import Image from 'next/image'
import { ArrowLeftRight, Check } from 'lucide-react'
import { HOW_WE_WORK, ALL_MEMBERS } from '@/lib/team'
import { Section, SectionIntro } from '@/components/ui/Section'

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-44 items-center justify-center rounded-[0.875rem] border border-border/[0.06] bg-background/70 px-6">
      {children}
    </div>
  )
}

// Small illustrations for the three cards, in the same order as HOW_WE_WORK.
function EngineersPanel() {
  return (
    <Panel>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          {ALL_MEMBERS.map((member) => (
            <span
              key={member.slug}
              className="relative h-12 w-12 overflow-hidden rounded-full border border-accent/30 bg-surface-high ring-4 ring-accent/[0.06]"
            >
              {member.avatar && <Image src={member.avatar} alt="" fill sizes="48px" className="object-cover" />}
            </span>
          ))}
        </div>
        <p className="mono-label text-[10px] text-foreground-3">No account manager in between</p>
      </div>
    </Panel>
  )
}

function LanguagePanel() {
  return (
    <Panel>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <span lang="ja" className="rounded-xl border border-border/10 bg-surface px-4 py-2.5 text-2xl font-bold text-foreground">
            日本語
          </span>
          <ArrowLeftRight size={18} strokeWidth={2} aria-hidden className="text-accent-fg" />
          <span className="rounded-xl border border-border/10 bg-surface px-4 py-2.5 text-2xl font-bold text-foreground">
            EN
          </span>
        </div>
        <p className="mono-label text-[10px] text-foreground-3">Docs · Standups · Code review</p>
      </div>
    </Panel>
  )
}

function ProductionPanel() {
  const steps = ['Deployed', 'Monitored', 'Handed over']
  return (
    <Panel>
      <ul className="w-full max-w-[13rem] space-y-2.5">
        {steps.map((step) => (
          <li key={step} className="flex items-center gap-3 rounded-lg border border-border/[0.08] bg-surface px-3 py-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-accent-fg">
              <Check size={12} strokeWidth={2.5} aria-hidden />
            </span>
            <span className="font-mono text-xs text-foreground-2">{step}</span>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

const PANELS = [EngineersPanel, LanguagePanel, ProductionPanel]

interface HowWeWorkProps {
  tone?: 'default' | 'muted'
}

export function HowWeWork({ tone = 'default' }: HowWeWorkProps) {
  return (
    <Section tone={tone} labelledBy="how-title">
      <SectionIntro
        id="how-title"
        eyebrow="How we work"
        title="The people you meet are the people who build it."
        intro="A small team keeps decisions close to the code. These three things hold on every project."
      />
      <ul className="mt-12 grid gap-5 md:mt-14 lg:grid-cols-3">
        {HOW_WE_WORK.map((item, i) => {
          const Visual = PANELS[i]
          return (
            <li key={item.title} className="card flex flex-col p-2">
              {Visual && <Visual />}
              <div className="px-4 pb-5 pt-6 md:px-5">
                <h3 className="text-xl font-bold tracking-[-0.02em] text-foreground">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground-2">{item.description}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
