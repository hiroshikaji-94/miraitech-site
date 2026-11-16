'use client'

import { useEffect, useState } from 'react'
import { MapPin, Clock, Globe, Languages, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { SITE } from '@/lib/site'

/* ─── Live Tokyo clock ───────────────────────────────────────── */

function useTokyoTime() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: SITE.location.timeZone,
      hour:     '2-digit',
      minute:   '2-digit',
      hour12:   false,
    })
    const tick = () => setTime(formatter.format(new Date()))
    tick()
    const id = setInterval(tick, 15_000)
    return () => clearInterval(id)
  }, [])

  return time
}

/* ─── Section ────────────────────────────────────────────────── */

export function Studio() {
  const localTime = useTokyoTime()

  const facts = [
    { icon: MapPin,    label: 'Base',       value: `${SITE.location.area}, ${SITE.location.country}`, mono: false },
    { icon: Globe,     label: 'Time zone',  value: SITE.location.utc, mono: false },
    { icon: Clock,     label: 'Local time', value: localTime ?? '—', mono: true },
    { icon: Languages, label: 'Languages',  value: SITE.languages, mono: false },
  ]

  return (
    <section className="py-20 md:py-28 relative border-t border-border/8 bg-muted">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Copy */}
          <FadeIn>
            <span className="section-index block mb-3">05 — Studio</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Based in Tokyo,{' '}
              <span className="gradient-text">working everywhere</span>
            </h2>
            <p className="mt-5 text-lg text-foreground-2 leading-relaxed max-w-lg text-pretty">
              {SITE.name} is based in {SITE.location.area}. Most engagements are remote,
              run in Japanese or English, and aligned to the client&apos;s time zone —
              whether that is Tokyo, Singapore, Berlin, or San Francisco.
            </p>
            <a
              href={SITE.location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'mt-6 inline-flex items-center gap-1.5',
                'text-sm font-medium text-accent-warm',
                'hover:text-accent-violet transition-colors duration-200',
              )}
            >
              Open in Google Maps
              <ArrowUpRight size={14} />
            </a>
          </FadeIn>

          {/* Facts grid */}
          <FadeIn delay={0.1}>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/10 bg-border/10 shadow-card">
              {facts.map(({ icon: Icon, label, value, mono }) => (
                <div key={label} className="bg-surface p-5 md:p-7">
                  <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-foreground-3">
                    <Icon size={14} className="text-accent-warm" />
                    {label}
                  </dt>
                  <dd className={cn(
                    'mt-3 text-foreground font-semibold',
                    mono ? 'font-mono text-3xl tabular-nums tracking-tight' : 'text-base md:text-lg',
                  )}>
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
