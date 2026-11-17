import { label, type ExperimentData } from '@/lib/data'
import type { ExperimentDetailContent } from '@/lib/experiment-details'
import { ArrowLink } from '@/components/ui/ArrowLink'
import { BackLink } from '@/components/ui/BackLink'
import { Container } from '@/components/ui/Container'
import { FactStrip } from '@/components/ui/FactStrip'
import { LabeledSection, Prose } from '@/components/ui/LabeledSection'
import { Tag } from '@/components/ui/Tag'

const STATUS = { live: 'Live', research: 'Research' } as const

interface ExperimentDetailProps {
  experiment: ExperimentData
  details:    ExperimentDetailContent
}

export function ExperimentDetail({ experiment, details }: ExperimentDetailProps) {
  const facts = [
    { term: 'Type', value: label(experiment.category) },
    {
      term:  'Status',
      value: (
        <span className="inline-flex items-center gap-2">
          {experiment.status === 'live' && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />}
          {STATUS[experiment.status]}
        </span>
      ),
    },
    { term: 'Models', value: experiment.models.join(', ') },
  ]

  return (
    <>
      <header className="relative overflow-hidden pt-32 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(ellipse_50%_60%_at_15%_0%,rgb(var(--color-accent)/0.07),transparent_70%)]"
        />
        <Container className="relative">
          <BackLink href="/ai-lab">AI Lab</BackLink>

          <p className="eyebrow mt-10">Experiment · {label(experiment.category)}</p>
          <h1 className="heading-display mt-5 max-w-[20ch] text-[clamp(2.5rem,5.4vw,3.875rem)] text-foreground text-balance">
            {experiment.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-[1.7] text-foreground-2 text-pretty">{experiment.description}</p>
          {(experiment.github || experiment.liveUrl) && (
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              {experiment.liveUrl && <ArrowLink href={experiment.liveUrl} external>Live demo</ArrowLink>}
              {experiment.github && <ArrowLink href={experiment.github} external>Source code</ArrowLink>}
            </div>
          )}

          <FactStrip facts={facts} className="mt-10" />
        </Container>
      </header>

      <Container className="mt-16 md:mt-24">
        {experiment.metrics && experiment.metrics.length > 0 && (
          <LabeledSection label="Results">
            <ul className="grid gap-4 sm:grid-cols-3">
              {experiment.metrics.map((metric) => (
                <li key={metric} className="card p-5 font-mono text-[15px] font-medium leading-snug text-accent-fg">
                  {metric}
                </li>
              ))}
            </ul>
            <Prose className="mt-8">
              <p>{details.results}</p>
            </Prose>
          </LabeledSection>
        )}

        <LabeledSection label="What we tested">
          <Prose>
            <p>{details.overview}</p>
          </Prose>
        </LabeledSection>

        <LabeledSection label="Method">
          <Prose>
            <p>{details.methodology}</p>
          </Prose>
        </LabeledSection>

        <LabeledSection label="Findings">
          <ol className="card divide-y divide-border/[0.07]">
            {details.keyFindings.map((finding, i) => (
              <li key={finding.title} className="flex gap-4 p-5 md:p-6">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 font-mono text-xs font-semibold tabular-nums text-accent-fg">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 pt-1">
                  <p className="font-bold tracking-[-0.015em] text-foreground">{finding.title}</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-foreground-2">{finding.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </LabeledSection>

        <LabeledSection label="How it is built">
          <Prose>
            <p>{details.architecture}</p>
            <p>{details.techStack}</p>
          </Prose>
          <ul className="mt-6 flex flex-wrap gap-2">
            {experiment.stack.map((tech) => (
              <li key={tech}>
                <Tag tone="neutral">{tech}</Tag>
              </li>
            ))}
          </ul>
        </LabeledSection>

        <LabeledSection label="Problems we hit">
          <div className="space-y-4">
            {details.challenges.map((challenge) => (
              <div key={challenge.title} className="card p-5 md:p-6">
                <h3 className="text-lg font-bold leading-snug tracking-[-0.02em] text-foreground">{challenge.title}</h3>
                <p className="mt-2 max-w-[66ch] text-[15px] leading-relaxed text-foreground-2">{challenge.description}</p>
              </div>
            ))}
          </div>
        </LabeledSection>
      </Container>
    </>
  )
}
