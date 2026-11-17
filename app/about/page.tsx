import type { Metadata } from 'next'
import { SITE } from '@/lib/site'
import { PRINCIPLES, TIMELINE, TOOLS } from '@/lib/about'
import { PageHeader } from '@/components/ui/PageHeader'
import { Prose } from '@/components/ui/LabeledSection'
import { ArrowLink } from '@/components/ui/ArrowLink'
import { Section, SectionIntro } from '@/components/ui/Section'
import { Tag } from '@/components/ui/Tag'

export const metadata: Metadata = {
  title: 'About',
  description: `${SITE.name} is a small engineering team in Tokyo building AI systems, and the software around them, for companies in Japan and abroad.`,
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A small team that ships to production."
        intro={
          <p>
            {SITE.name} is a small engineering team in {SITE.location.area}. We build AI systems for
            companies in Japan and abroad, and we only take on work we expect to put into production.
          </p>
        }
      />

      <Section tone="muted" labelledBy="background-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionIntro id="background-title" eyebrow="Background" title="Web and data first, then AI." />
          </div>
          <div className="lg:col-span-7">
            <Prose>
              <p>
                The team came together in Tokyo in {SITE.founded}. Before that we spent years building web
                applications and data systems for Japanese companies in logistics, manufacturing and
                finance.
              </p>
              <p>
                When we moved into AI work, that background mattered more than we expected. The language
                model is a small part of a working system. The rest is APIs, interfaces, data pipelines,
                deployment and monitoring, and that is where most projects succeed or fail.
              </p>
              <p>
                Today we build retrieval systems, agents and LLM features, together with the software they
                need to run. Every project is led by an engineer who writes code on it, and clients talk to
                that engineer directly, in Japanese or English.
              </p>
            </Prose>
            <div className="mt-8">
              <ArrowLink href="/team">Meet the team</ArrowLink>
            </div>
          </div>
        </div>
      </Section>

      <Section labelledBy="principles-title">
        <SectionIntro id="principles-title" eyebrow="Principles" title="Four rules we work by." />
        <ol className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2">
          {PRINCIPLES.map((item, i) => (
            <li key={item.title} className="card p-6 md:p-8">
              <span className="font-mono text-sm font-semibold tabular-nums text-accent-fg">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-[-0.02em] text-foreground">{item.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-foreground-2">{item.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="muted" labelledBy="timeline-title">
        <SectionIntro id="timeline-title" eyebrow="Timeline" title={`Since ${SITE.founded}.`} />
        <ol className="card mt-12 divide-y divide-border/[0.07] md:mt-14">
          {[...TIMELINE].reverse().map((entry) => (
            <li key={entry.year} className="grid gap-x-8 gap-y-2 p-6 sm:grid-cols-[7rem_1fr] md:p-8">
              <span className="font-mono text-2xl font-medium tracking-[-0.03em] text-accent-fg">{entry.year}</span>
              <div>
                <p className="text-lg font-bold leading-snug tracking-[-0.02em] text-foreground">{entry.title}</p>
                <p className="mt-2 max-w-[66ch] text-[15px] leading-relaxed text-foreground-2">{entry.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="tools-title">
        <SectionIntro id="tools-title" eyebrow="Stack" title="Tools we use most." />
        <dl className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2">
          {TOOLS.map((group) => (
            <div key={group.area} className="card p-6 md:p-7">
              <dt className="text-lg font-bold tracking-[-0.02em] text-foreground">{group.area}</dt>
              <dd className="mt-4">
                <ul className="flex flex-wrap gap-2">
                  {group.tools.map((tool) => (
                    <li key={tool}>
                      <Tag tone="neutral">{tool}</Tag>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  )
}
