'use client'

import { usePathname } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { SITE } from '@/lib/site'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

// Closing call to action above the footer. Hidden on /contact, which says the same thing.
export function FooterContact() {
  const pathname = usePathname()
  if (pathname === '/contact') return null

  return (
    <section
      aria-labelledby="footer-cta-title"
      className="relative overflow-hidden border-t border-border/[0.07] bg-muted py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_55%_at_50%_45%,rgb(var(--color-accent)/0.08),transparent_70%)]"
      />
      <Container className="relative flex flex-col items-center text-center">
        <p className="eyebrow">Start a project</p>
        <h2
          id="footer-cta-title"
          className="heading-section mt-5 max-w-[17ch] text-[clamp(2.25rem,5vw,3.5rem)] text-foreground text-balance"
        >
          Tell us what you are working on.
        </h2>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-foreground-2 text-pretty">
          Write a few lines about the problem and your timeline. We reply within one business day,
          in Japanese or English.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" size="lg">
            Get in touch
            <ArrowRight size={16} strokeWidth={2} aria-hidden />
          </Button>
          <Button href={`mailto:${SITE.email}`} variant="secondary" size="lg">
            {SITE.email}
          </Button>
        </div>
      </Container>
    </section>
  )
}
