import type { Metadata } from 'next'
import { ArrowUpRight, Mail } from 'lucide-react'
import { SITE } from '@/lib/site'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { LocalTime } from '@/components/ui/LocalTime'
import { ArrowLink } from '@/components/ui/ArrowLink'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Email the ${SITE.name} engineers in Tokyo about a project. We reply within one business day, in Japanese or English.`,
}

const MAIL_HREF = `mailto:${SITE.email}?subject=${encodeURIComponent(`Project inquiry for ${SITE.name}`)}`

const INCLUDE = [
  'A few sentences about the problem you want to solve.',
  'Your timeline, even a rough one.',
  'Constraints we should know about: your current stack, where the data has to stay, and a budget range.',
]

export default function ContactPage() {
  const studio = [
    { term: 'Address',       value: `${SITE.location.area}, ${SITE.location.country}` },
    { term: 'Local time',    value: <><LocalTime className="font-mono tabular-nums" /> · {SITE.location.utc}</> },
    { term: 'Languages',     value: SITE.languages },
    { term: 'Response time', value: SITE.responseTime },
  ]

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us what you are working on."
        intro={
          <p>
            Email is the best way to reach us. There is no form and no sales team. Your message goes
            straight to the engineers who would work on the project.
          </p>
        }
      />

      <section className="border-t border-border/[0.07] bg-muted py-12 pb-20 md:py-16 md:pb-28">
        <Container>
          <a
            href={MAIL_HREF}
            className="card card-hover group relative flex flex-col gap-6 overflow-hidden p-6 sm:p-8 md:flex-row md:items-center md:justify-between md:p-10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_0%_0%,rgb(var(--color-accent)/0.08),transparent_70%)]"
            />
            <div className="relative flex min-w-0 items-center gap-5">
              <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent-fg sm:flex">
                <Mail size={24} strokeWidth={1.75} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="eyebrow">Email us</p>
                <p className="mt-2 break-all text-[clamp(1.5rem,3.6vw,2.75rem)] font-extrabold leading-tight tracking-[-0.035em] text-foreground sm:break-normal">
                  {SITE.email}
                </p>
              </div>
            </div>
            <span className="relative inline-flex h-12 shrink-0 items-center justify-center gap-2 self-start rounded-btn bg-accent px-6 text-[15px] font-semibold text-on-accent shadow-[0_8px_24px_-10px_rgb(var(--color-accent)/0.55)] transition-[filter] group-hover:brightness-110 md:self-auto">
              Write to us
              <ArrowUpRight size={16} strokeWidth={2} aria-hidden />
            </span>
          </a>

          <div className="mt-5 grid gap-5 lg:grid-cols-12">
            <div className="card p-6 md:p-8 lg:col-span-7">
              <h2 className="eyebrow">What to include</h2>
              <ol className="mt-6 space-y-5">
                {INCLUDE.map((item, i) => (
                  <li key={item} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 font-mono text-xs font-semibold tabular-nums text-accent-fg">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="pt-1 text-[17px] leading-relaxed text-foreground-2">{item}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-8 border-t border-border/[0.07] pt-6 text-[15px] leading-relaxed text-foreground-2">
                New products, AI added to an existing system and longer partnerships are all welcome. If we
                are not the right team for the job, we will tell you.
              </p>
            </div>

            <div className="card p-6 md:p-8 lg:col-span-5">
              <h2 className="eyebrow">Studio</h2>
              <dl className="mt-6 divide-y divide-border/[0.07]">
                {studio.map(({ term, value }) => (
                  <div key={term} className="flex flex-col-reverse gap-1 py-4 first:pt-0">
                    <dt className="mono-label text-[10px] text-foreground-3">{term}</dt>
                    <dd className="text-[15px] font-semibold text-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-2 border-t border-border/[0.07] pt-5">
                <ArrowLink href={SITE.location.mapsUrl} external variant="mono">
                  Open in Google Maps
                </ArrowLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
