import { Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { SITE } from '@/lib/site'

export function AuthorCard() {
  return (
    <Container size="md">
      <div className={cn(
        'my-12 rounded-xl border border-border/8 p-6 md:p-8',
        'bg-surface',
      )}>
        <div className="flex items-start gap-5">
          {/* Avatar */}
          <div className="flex-shrink-0 w-12 h-12 bg-accent-warm flex items-center justify-center text-background font-mono font-bold text-xs">
            MT
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-display font-semibold text-foreground">
              {SITE.name} Team
            </h3>
            <p className="text-sm text-foreground-3 mt-0.5">
              {SITE.tagline}
            </p>
            <p className="text-sm text-foreground-2 leading-relaxed mt-3">
              We build production AI systems and full-stack applications from Tokyo.
              Writing about the technical decisions, architecture patterns,
              and engineering practices behind real client work.
            </p>

            <div className="flex items-center gap-3 mt-4">
              <a
                href={`mailto:${SITE.email}`}
                aria-label="Email"
                className="flex items-center gap-1.5 text-xs text-foreground-3 hover:text-accent-blue transition-colors"
              >
                <Mail className="w-4 h-4" />
                {SITE.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
