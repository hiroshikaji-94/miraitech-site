import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { MeridianBackground } from '@/components/ui/MeridianBackground'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
}

const SUGGESTIONS = [
  { href: '/projects', label: 'Projects',  detail: 'Production systems we have shipped' },
  { href: '/ai-lab',   label: 'AI Lab',    detail: 'Experiments and research' },
  { href: '/blog',     label: 'Blog',      detail: 'Writing on AI and engineering' },
  { href: '/contact',  label: 'Contact',   detail: 'Talk to the engineers' },
]

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <MeridianBackground intensity="medium" parallax={false} />

      <Container size="md" className="relative z-10">
        <p className="section-index">Error 404</p>
        <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold tracking-tight text-foreground text-balance">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground-2">
          The link may be out of date, or the page has moved. Here are a few good places to continue.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/" size="lg">
            <ArrowLeft size={16} />
            Back to home
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Contact us
          </Button>
        </div>

        <ul className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SUGGESTIONS.map(({ href, label, detail }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex items-center justify-between gap-4 rounded-xl border border-border/10 bg-surface p-4 shadow-card transition-[box-shadow,border-color] hover:border-border/15 hover:shadow-card-hover"
              >
                <span>
                  <span className="block font-medium text-foreground group-hover:text-accent-warm transition-colors">
                    {label}
                  </span>
                  <span className="block text-sm text-foreground-3">{detail}</span>
                </span>
                <ArrowUpRight size={16} className="shrink-0 text-foreground-3 group-hover:text-accent-warm transition-colors" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
