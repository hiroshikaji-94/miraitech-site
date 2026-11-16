'use client'

import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { AmbientGlow } from '@/components/ui/AmbientGlow'

export function ContactCTA() {
  return (
    <section className="pb-20 md:pb-28 relative overflow-hidden">
      <AmbientGlow preset="center-violet" intensity="whisper" />
      <Container size="sm" className="relative z-10">
        <FadeIn>
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent-warm/20" />
              <span className="text-[11px] font-mono text-foreground-3 tracking-[0.2em] uppercase">MiraiTech — Tokyo</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent-warm/20" />
            </div>
            <p className="text-sm text-foreground-3 leading-relaxed max-w-md mx-auto">
              Whether it&apos;s a full product build, adding AI to an existing system,
              or a long-term engineering partnership — we&apos;re glad to talk with teams
              and founders who want it built properly the first time.
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
