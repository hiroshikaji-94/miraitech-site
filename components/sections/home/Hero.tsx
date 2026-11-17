import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, SendHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { LogoMark } from '@/components/ui/Logo'
import { SITE } from '@/lib/site'
import { ALL_MEMBERS, TEAM_SIZE_WORD } from '@/lib/team'

function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-foreground">{children}</strong>
}

function AssistantMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent-fg">
        <LogoMark className="h-4 w-4" />
      </span>
      <div className="min-w-0 pt-1 text-[15px] leading-[1.65] text-foreground-2">{children}</div>
    </div>
  )
}

// A short exchange that answers the first two questions people usually ask.
function ChatCard() {
  const firstNames = ALL_MEMBERS.map((m) => m.name.split(' ')[0])

  return (
    <div className="card relative overflow-hidden p-5 sm:p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(var(--color-border)/0.07)_1px,transparent_1px)] bg-[size:18px_18px] [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]"
      />
      <div className="relative space-y-6">
        <AssistantMessage>
          We build <Strong>search, support and document tools</Strong> on language models, plus the{' '}
          <Strong>data pipelines</Strong> and <Strong>web apps</Strong> around them.
        </AssistantMessage>

        <div className="flex items-start justify-end gap-3">
          <p className="rounded-2xl rounded-tr-md border border-border/10 bg-surface-high px-4 py-2.5 text-[15px] text-foreground">
            Who would we be working with?
          </p>
          <span className="mono-label flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/10 text-[9px] font-semibold tracking-[0.08em] text-foreground-2">
            You
          </span>
        </div>

        <AssistantMessage>
          <span className="capitalize">{TEAM_SIZE_WORD}</span> engineers in Tokyo. The person on your first
          call <Strong>writes the code</Strong>, and you can talk to us in <Strong>Japanese or English</Strong>.
          <span className="mt-4 flex items-center gap-3">
            <span className="flex -space-x-2">
              {ALL_MEMBERS.map((member) => (
                <span
                  key={member.slug}
                  className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-surface bg-surface-high"
                >
                  {member.avatar && (
                    <Image src={member.avatar} alt="" fill sizes="32px" className="object-cover" loading="eager" />
                  )}
                </span>
              ))}
            </span>
            <span className="mono-label text-foreground-3">{firstNames.join(' · ')}</span>
          </span>
        </AssistantMessage>

        <Link
          href="/contact"
          className="group flex items-center justify-between gap-3 rounded-[0.875rem] border border-border/10 bg-background/60 py-2 pl-4 pr-2 transition-colors hover:border-accent/40"
        >
          <span className="text-[15px] text-foreground-3 transition-colors group-hover:text-foreground-2">
            Tell us about your project
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-high text-foreground-2 transition-colors group-hover:bg-accent group-hover:text-on-accent">
            <SendHorizontal size={15} strokeWidth={2} aria-hidden />
          </span>
        </Link>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_50%_at_85%_10%,rgb(var(--color-accent)/0.07),transparent_70%)]"
      />
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">AI engineering team in Tokyo</p>
            <h1 className="heading-display mt-6 text-[clamp(2.75rem,6.2vw,4.5rem)] text-foreground">
              Language models,
              <br />
              <span className="text-accent-fg">put to work.</span>
            </h1>
            <p className="mt-7 max-w-[34rem] text-lg leading-[1.65] text-foreground-2 text-pretty">
              {SITE.name} is {TEAM_SIZE_WORD} engineers in Tokyo. Most of our projects are search, support
              and document tools built on large language models, along with the data pipelines and web apps
              they depend on. You work directly with the people who write the code.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/contact" size="lg">
                Get in touch
                <ArrowRight size={16} strokeWidth={2} aria-hidden />
              </Button>
              <Button href="/projects" variant="secondary" size="lg">
                See our work
              </Button>
            </div>

            <p className="mono-label mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-foreground-3">
              <span className="inline-flex items-center gap-2 font-semibold text-foreground">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                {SITE.status}
              </span>
              <span aria-hidden className="hidden h-px w-6 bg-border/20 sm:block" />
              <span>Replies within one business day</span>
            </p>
          </div>

          <ChatCard />
        </div>
      </Container>
    </section>
  )
}
