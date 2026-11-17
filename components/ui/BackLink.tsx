import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

// "← All work" link at the top of detail pages.
export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="mono-label group inline-flex items-center gap-2 font-semibold text-foreground-3 transition-colors hover:text-accent-fg"
    >
      <ArrowLeft size={13} strokeWidth={2} aria-hidden className="transition-transform duration-200 group-hover:-translate-x-0.5" />
      {children}
    </Link>
  )
}
