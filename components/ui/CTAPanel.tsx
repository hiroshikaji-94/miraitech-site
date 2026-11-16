import Link from 'next/link'
import { ArrowRight, Clock, Languages } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'

export interface CTAAction {
  label:    string
  href:     string
  variant?: 'primary' | 'secondary' | 'link'
}

interface CTAPanelProps {
  eyebrow?:     string
  title:        string
  /** Second line of the heading, rendered with the brand gradient */
  highlight?:   string
  description:  string
  actions:      CTAAction[]
  /** Hide the response-time / language reassurance row */
  hideNote?:    boolean
  className?:   string
}

const actionStyles: Record<NonNullable<CTAAction['variant']>, string> = {
  primary:   'h-11 px-5 rounded-lg bg-white text-slate-900 shadow-sm hover:bg-slate-100',
  secondary: 'h-11 px-5 rounded-lg border border-white/20 text-white hover:bg-white/10 hover:border-white/30',
  link:      'h-11 px-2 text-white/70 hover:text-white',
}

/**
 * Closing call-to-action used at the bottom of pages.
 * A deep slate panel gives the light theme a confident full stop;
 * in dark mode it becomes an elevated surface.
 */
export function CTAPanel({
  eyebrow,
  title,
  highlight,
  description,
  actions,
  hideNote = false,
  className,
}: CTAPanelProps) {
  return (
    <section className={cn('pt-12 pb-20 md:pt-16 md:pb-28', className)}>
      <Container>
        <FadeIn>
          <div className={cn(
            'relative overflow-hidden rounded-3xl',
            'bg-slate-950 dark:bg-surface-high',
            'border border-white/5 dark:border-border/10',
            'px-6 py-12 sm:px-10 md:px-14 md:py-16',
          )}>
            {/* Brand glow + fading grid */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_90%_at_100%_0%,rgb(99_102_241/0.32),transparent_65%),radial-gradient(ellipse_40%_70%_at_0%_100%,rgb(37_99_235/0.18),transparent_65%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_80%_at_80%_10%,#000_10%,transparent_70%)]"
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-end">
              <div>
                {eyebrow && (
                  <span className="block mb-4 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-indigo-300">
                    {eyebrow}
                  </span>
                )}
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] text-white text-balance">
                  {title}
                  {highlight && (
                    <>
                      <br />
                      <span className="bg-gradient-to-r from-sky-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent">
                        {highlight}
                      </span>
                    </>
                  )}
                </h2>
                <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-slate-300 text-pretty">
                  {description}
                </p>

                {!hideNote && (
                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
                    <span className="inline-flex items-center gap-2">
                      <Clock size={14} className="text-slate-500" />
                      Replies within one business day
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Languages size={14} className="text-slate-500" />
                      Japanese or English
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 sm:items-center lg:items-stretch">
                {actions.map(({ label, href, variant = 'primary' }) => (
                  <Link
                    key={href + label}
                    href={href}
                    className={cn(
                      'inline-flex items-center justify-center gap-2 text-sm font-medium whitespace-nowrap',
                      'transition-colors duration-200',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70',
                      actionStyles[variant],
                    )}
                  >
                    {label}
                    {variant === 'primary' && <ArrowRight size={15} />}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
