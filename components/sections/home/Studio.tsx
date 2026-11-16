'use client'

import { useEffect, useState } from 'react'
import { MapPin, Clock, Globe, Languages, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/FadeIn'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
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
    <section className="py-20 md:py-28 relative border-t border-border/6 overflow-hidden">
      <AmbientGlow preset="blue" intensity="whisper" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Copy */}
          <FadeIn>
            <span className="section-index block mb-3">05 — STUDIO</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Based in Tokyo,
              <br />
              <span className="gradient-text">working everywhere</span>
            </h2>
            <p className="mt-5 text-foreground-2 leading-relaxed max-w-md text-pretty">
              MiraiTech is based in {SITE.location.area}. Most engagements are remote,
              run in Japanese or English, and aligned to the client&apos;s time zone —
              whether that is Tokyo, Singapore, Berlin, or San Francisco.
            </p>
            <a
              href={SITE.location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'mt-6 inline-flex items-center gap-1.5',
                'text-sm font-medium text-accent-blue',
                'hover:text-accent-violet transition-colors duration-200',
              )}
            >
              Open in Google Maps
              <ArrowUpRight size={14} />
            </a>
          </FadeIn>

          {/* Facts grid */}
          <StaggerContainer className="grid grid-cols-2 gap-px bg-border/8 border border-border/8" stagger={0.06}>
            {facts.map(({ icon: Icon, label, value, mono }) => (
              <StaggerItem key={label} className="h-full">
                <div className="bg-background p-5 md:p-6 h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon size={13} className="text-foreground-3" />
                    <span className="text-[11px] font-mono text-foreground-3 uppercase tracking-[0.12em]">
                      {label}
                    </span>
                  </div>
                  <p className={cn(
                    'text-foreground font-medium',
                    mono ? 'font-mono text-2xl tabular-nums' : 'text-base',
                  )}>
                    {value}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  )
}
