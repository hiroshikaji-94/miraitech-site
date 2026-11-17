import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
}

const SUGGESTIONS = [
  { href: '/projects', label: 'Work' },
  { href: '/ai-lab',   label: 'AI Lab' },
  { href: '/blog',     label: 'Writing' },
  { href: '/contact',  label: 'Contact' },
]

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pb-24 pt-36 md:pb-32 md:pt-48">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(ellipse_50%_60%_at_15%_0%,rgb(var(--color-accent)/0.07),transparent_70%)]"
      />
      <Container className="relative">
        <p className="eyebrow">Error 404</p>
        <h1 className="heading-display mt-5 max-w-[16ch] text-[clamp(2.5rem,5.4vw,3.875rem)] text-foreground">
          There is nothing at this address.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-2">
          The link may be old, or the page may have moved. One of these should get you back on track.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/" size="lg">
            Back to home
            <ArrowRight size={16} strokeWidth={2} aria-hidden />
          </Button>
          {SUGGESTIONS.map(({ href, label }) => (
            <Button key={href} href={href} variant="secondary" size="lg">
              {label}
            </Button>
          ))}
        </div>
      </Container>
    </section>
  )
}
