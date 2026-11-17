import type { ProjectData } from '@/lib/data'
import type { ProjectDetailContent } from '@/lib/project-details'
import { Container } from '@/components/ui/Container'
import { LabeledSection, Prose } from '@/components/ui/LabeledSection'
import { Tag } from '@/components/ui/Tag'
import { ProjectGallery } from './ProjectGallery'

interface ProjectBodyProps {
  project: ProjectData
  details: ProjectDetailContent
}

export function ProjectBody({ project, details }: ProjectBodyProps) {
  const { problem, solution, features, architecture, techChoices, challenges, role } = details
  const screens = project.images.filter((src) => src !== project.coverImage)

  return (
    <Container className="mt-16 md:mt-24">
      <LabeledSection label="Results">
        <ul className="grid gap-4 sm:grid-cols-3">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="card p-5 font-mono text-[15px] font-medium leading-snug text-accent-fg">
              {highlight}
            </li>
          ))}
        </ul>
      </LabeledSection>

      <LabeledSection label="The problem">
        <Prose>
          <p>{problem}</p>
        </Prose>
      </LabeledSection>

      <LabeledSection label="What we built">
        <Prose>
          <p>{solution}</p>
        </Prose>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.title} className="card p-5 md:p-6">
              <dt className="font-bold tracking-[-0.015em] text-foreground">{feature.title}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-foreground-2">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </LabeledSection>

      <LabeledSection label="How it works">
        <Prose>
          <p>{architecture.description}</p>
        </Prose>
        <ol className="card mt-8 divide-y divide-border/[0.07]">
          {architecture.steps.map((step, i) => (
            <li key={step.label} className="flex gap-4 p-5 md:p-6">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 font-mono text-xs font-semibold tabular-nums text-accent-fg">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 pt-1">
                <p className="font-bold tracking-[-0.015em] text-foreground">{step.label}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-foreground-2">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </LabeledSection>

      {screens.length > 0 && (
        <LabeledSection label="Screens">
          <ProjectGallery images={screens} title={project.title} />
        </LabeledSection>
      )}

      <LabeledSection label="Decisions">
        <dl className="space-y-4">
          {techChoices.map((choice) => (
            <div key={choice.tech} className="card p-5 md:p-6">
              <dt className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-[17px] font-bold tracking-[-0.015em] text-foreground">{choice.tech}</span>
                <Tag tone="neutral">{choice.category}</Tag>
              </dt>
              <dd className="mt-3 max-w-[66ch] text-[15px] leading-relaxed text-foreground-2">{choice.reason}</dd>
            </div>
          ))}
        </dl>
      </LabeledSection>

      <LabeledSection label="What went wrong">
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div key={challenge.title} className="card p-5 md:p-7">
              <h3 className="text-lg font-bold tracking-[-0.02em] text-foreground">{challenge.title}</h3>
              <dl className="mt-5 space-y-4 text-[15px] leading-relaxed">
                {[
                  ['Problem', challenge.problem],
                  ['Fix', challenge.solution],
                  ['Result', challenge.outcome],
                ].map(([term, text]) => (
                  <div key={term} className="grid gap-x-5 gap-y-1 sm:grid-cols-[5.5rem_1fr]">
                    <dt className={`mono-label pt-1 text-[10px] font-semibold ${term === 'Result' ? 'text-accent-fg' : 'text-foreground-3'}`}>
                      {term}
                    </dt>
                    <dd className={term === 'Result' ? 'text-foreground' : 'text-foreground-2'}>{text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </LabeledSection>

      <LabeledSection label="Team and stack">
        <Prose>
          <p>{role}</p>
        </Prose>
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Tag tone="neutral">{tech}</Tag>
            </li>
          ))}
        </ul>
      </LabeledSection>
    </Container>
  )
}
