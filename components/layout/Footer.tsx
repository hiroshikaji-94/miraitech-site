import Link from 'next/link'
import { ArrowUp, Clock, Mail, MapPin } from 'lucide-react'
import { SITE } from '@/lib/site'
import { NAV_LINKS } from '@/lib/nav'
import { FEATURED_PROJECTS } from '@/lib/data'
import { TEAM_SIZE_WORD } from '@/lib/team'
import { Logo } from '@/components/ui/Logo'
import { Container } from '@/components/ui/Container'
import { LocalTime } from '@/components/ui/LocalTime'
import { FooterContact } from './FooterContact'

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="eyebrow text-foreground-3">{children}</h2>
}

const linkClass = 'text-[15px] text-foreground-2 transition-colors duration-150 hover:text-foreground'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto">
      <FooterContact />

      <div className="border-t border-border/[0.07] bg-background">
        <Container>
          {/* Meta row */}
          <div className="flex items-center justify-between gap-4 py-5">
            <p className="mono-label flex items-center gap-2 text-foreground-3">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              Est. {SITE.founded} · {SITE.location.area} · JST
            </p>
            <a href="#main-content" className="mono-label inline-flex items-center gap-1.5 text-foreground-3 transition-colors hover:text-foreground">
              <ArrowUp size={12} strokeWidth={2} aria-hidden />
              Back to top
            </a>
          </div>

          {/* Brand row */}
          <div className="grid gap-8 border-t border-border/[0.07] pb-12 pt-14 md:grid-cols-2 md:gap-12">
            <div>
              <Logo size="lg" />
              <p className="eyebrow mt-5">{SITE.tagline}</p>
            </div>
            <p className="max-w-md text-lg leading-relaxed text-foreground-3 md:justify-self-end">
              <span className="font-semibold capitalize text-foreground">{TEAM_SIZE_WORD}</span>
              <span className="font-semibold text-foreground"> engineers in {SITE.location.short}.</span>{' '}
              We build software on top of language models, along with the data pipelines and web apps it
              depends on.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid gap-x-8 gap-y-12 border-t border-border/[0.07] py-14 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <ColumnTitle>Selected work</ColumnTitle>
              <ul className="mt-5 space-y-3">
                {FEATURED_PROJECTS.slice(0, 4).map((project) => (
                  <li key={project.slug}>
                    <Link href={`/projects/${project.slug}`} className={linkClass}>
                      {project.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <ColumnTitle>Company</ColumnTitle>
              <ul className="mt-5 space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <ColumnTitle>Connect</ColumnTitle>
              <ul className="mt-5 space-y-3">
                <li>
                  <a href={`mailto:${SITE.email}`} className={`${linkClass} inline-flex items-center gap-2.5`}>
                    <Mail size={16} strokeWidth={1.75} aria-hidden className="text-foreground-3" />
                    {SITE.email}
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClass} inline-flex items-center gap-2.5`}
                  >
                    <MapPin size={16} strokeWidth={1.75} aria-hidden className="text-foreground-3" />
                    {SITE.location.area}, {SITE.location.country}
                  </a>
                </li>
                <li className="inline-flex items-center gap-2.5 text-[15px] text-foreground-2">
                  <Clock size={16} strokeWidth={1.75} aria-hidden className="text-foreground-3" />
                  <span>
                    <LocalTime className="font-mono text-sm tabular-nums" /> in Tokyo
                  </span>
                </li>
              </ul>
              <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-border/10 px-3.5 py-2 text-[13px] text-foreground-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                {SITE.status}
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col gap-2 border-t border-border/[0.07] py-6 sm:flex-row sm:justify-between">
            <p className="mono-label text-foreground-3">© {year} {SITE.name}. All rights reserved.</p>
            <p className="mono-label text-foreground-3">{SITE.languages}</p>
          </div>
        </Container>
      </div>
    </footer>
  )
}
