'use client'

import {
  Mail, MapPin, Clock, Globe, Languages, ArrowUpRight, Send,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/FadeIn'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
import { SITE } from '@/lib/site'

/* ─── Contact facts ─────────────────────────────────────────────── */

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    description: 'Best for project inquiries',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: `${SITE.location.area}, ${SITE.location.country}`,
    href: SITE.location.mapsUrl,
    description: 'Open in Google Maps',
  },
]

const facts = [
  { icon: Globe,     label: 'Time zone',     value: SITE.location.utc },
  { icon: Clock,     label: 'Response time', value: 'Usually within one business day' },
  { icon: Languages, label: 'Languages',     value: 'We reply in Japanese or English' },
]

const include = [
  'A short description of the problem you are solving',
  'Your timeline — even a rough one helps',
  'Any constraints: existing stack, data residency, budget range',
]

/* ─── Main section ──────────────────────────────────────────────── */

export function ContactContent() {
  const mailHref = `mailto:${SITE.email}?subject=${encodeURIComponent(`Project inquiry — ${SITE.name}`)}`

  return (
    <section className="pb-16 md:pb-24 relative overflow-hidden">
      <AmbientGlow preset="warm-blue" intensity="subtle" />
      <Container size="lg" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-14">
          {/* ── Left column: info ─────────────────────────── */}
          <div>
            <StaggerContainer className="space-y-4" stagger={0.06}>
              {contactLinks.map(({ icon: Icon, label, value, href, description }) => (
                <StaggerItem key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={cn(
                      'group flex items-start gap-4 p-4 rounded-xl',
                      'bg-surface border border-border/10 shadow-card',
                      'hover:border-accent-blue/15 hover:shadow-card-hover',
                      'transition-all duration-300',
                    )}
                  >
                    <div className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0',
                      'bg-surface-high border border-border/10',
                      'group-hover:bg-accent-blue/10 group-hover:border-accent-blue/15',
                      'transition-colors duration-200',
                    )}>
                      <Icon size={16} className="text-foreground-3 group-hover:text-accent-blue transition-colors" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-foreground-3 uppercase tracking-wider">
                          {label}
                        </span>
                        <ArrowUpRight size={12} className="text-foreground-3/50 group-hover:text-accent-blue transition-colors" />
                      </div>
                      <p className="text-sm font-medium text-foreground mt-0.5 group-hover:text-accent-blue transition-colors break-all">
                        {value}
                      </p>
                      <p className="text-xs text-foreground-3 mt-0.5">{description}</p>
                    </div>
                  </a>
                </StaggerItem>
              ))}

              {facts.map(({ icon: Icon, label, value }) => (
                <StaggerItem key={label}>
                  <div className={cn(
                    'flex items-center gap-3 p-4 rounded-xl',
                    'bg-surface border border-border/10 shadow-card',
                  )}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-high border border-border/10 flex-shrink-0">
                      <Icon size={16} className="text-foreground-3" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground-3 uppercase tracking-wider">
                        {label}
                      </p>
                      <p className="text-sm text-foreground-2 mt-0.5">
                        {value}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* ── Right column: email panel ─────────────────── */}
          <FadeIn delay={0.1} className="order-first lg:order-none">
            <div className={cn(
              'p-6 md:p-8 rounded-xl h-full',
              'bg-surface border border-border/10 shadow-card',
            )}>
              <div className="flex items-center gap-2 mb-4">
                <Mail size={16} className="text-accent-blue" />
                <h2 className="font-display font-semibold text-lg text-foreground">
                  Email us directly
                </h2>
              </div>

              <p className="text-sm text-foreground-2 leading-relaxed">
                There is no form here on purpose. A message to our inbox reaches the
                engineers who would actually work on your project — not a sales queue.
              </p>

              <h3 className="mt-6 text-xs font-semibold text-foreground-3 uppercase tracking-wider">
                Helpful to include
              </h3>
              <ul className="mt-3 space-y-2.5">
                {include.map((item, i) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground-2">
                    <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-md bg-accent-blue/10 text-accent-blue text-[11px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={mailHref}
                className={cn(
                  'mt-8 w-full inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg',
                  'text-sm font-medium text-white',
                  'bg-accent-warm hover:bg-accent-violet',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue/70',
                  'active:scale-[0.98] transition-all duration-200',
                )}
              >
                <Send size={15} />
                Write to {SITE.email}
              </a>

              <p className="mt-4 text-xs text-foreground-3 leading-relaxed">
                Full product build, adding AI to an existing system, or a long-term
                engineering partnership — all welcome.
              </p>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
