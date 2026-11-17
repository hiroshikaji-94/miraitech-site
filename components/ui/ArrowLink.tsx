import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ArrowLinkProps {
  href:       string
  children:   React.ReactNode
  /** Opens in a new tab and uses a diagonal arrow */
  external?:  boolean
  /** "text" is a green sentence-case link, "mono" is a small uppercase label link */
  variant?:   'text' | 'mono' | 'plain'
  className?: string
}

const variants = {
  text:  'gap-1.5 text-sm font-medium text-accent-fg hover:brightness-125',
  mono:  'mono-label gap-1.5 font-semibold text-accent-fg hover:brightness-125',
  plain: 'gap-1.5 text-sm font-medium text-foreground hover:text-accent-fg',
} as const

// A link followed by an arrow that nudges forward on hover.
export function ArrowLink({ href, children, external, variant = 'text', className }: ArrowLinkProps) {
  const Icon = external ? ArrowUpRight : ArrowRight
  const classes = cn('group inline-flex items-center transition-[color,filter] duration-150', variants[variant], className)
  const inner = (
    <>
      {children}
      <Icon
        size={variant === 'mono' ? 12 : 15}
        strokeWidth={2}
        aria-hidden
        className={cn(
          'shrink-0 transition-transform duration-200',
          external ? 'group-hover:-translate-y-px group-hover:translate-x-px' : 'group-hover:translate-x-0.5',
        )}
      />
    </>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    )
  }
  if (href.startsWith('mailto:')) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  )
}
