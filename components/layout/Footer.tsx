import Link from 'next/link'
import { Mail, MapPin, ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'
import { SITE } from '@/lib/site'

const NAV_LINKS = [
  { href: '/projects', label: 'Projects' },
  { href: '/ai-lab',   label: 'AI Lab' },
  { href: '/blog',     label: 'Blog' },
  { href: '/team',     label: 'Team' },
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      className="mt-auto border-t border-border/10"
    >
      <div className="h-px w-full bg-gradient-to-r from-accent-warm/20 via-accent-blue/10 to-transparent" />

      <Container>
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* ── Brand column ──────────────────────────────────── */}
          <div className="md:col-span-1 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 w-fit group"
            >
              <svg
                width="28"
                height="28"
                viewBox="175 162 260 250"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="footer-logo-grad" x1="178.908" y1="303.638" x2="441.039" y2="303.638" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4B7FF7"/>
                    <stop offset="1" stopColor="#A36AFE"/>
                  </linearGradient>
                  <linearGradient id="footer-logo-dot" x1="390.942" y1="182.475" x2="425.893" y2="182.475" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4B7FF7"/>
                    <stop offset="1" stopColor="#A36AFE"/>
                  </linearGradient>
                </defs>
                <path d="M306.841 194.125H306.318C300.997 194.125 296.066 196.917 293.328 201.48L188.871 375.576C183.344 384.786 186.234 396.727 195.36 402.392C204.828 408.268 217.281 405.109 222.802 395.43L307.061 247.717L328.032 282.668L262.228 388.352C257.396 396.113 262.976 406.16 272.118 406.16H420.725C429.723 406.16 435.325 396.393 430.78 388.627L376.963 296.648L354.827 331.599L375.026 367.743C375.893 369.296 374.771 371.21 372.992 371.21H319.182C317.404 371.21 316.281 369.298 317.147 367.745L391.892 233.613C396.405 225.515 393.058 215.289 384.63 211.426C377.528 208.171 369.114 210.559 364.781 217.059L350.603 238.325C348.758 241.093 344.673 241.037 342.904 238.22L319.67 201.218C316.899 196.805 312.053 194.125 306.841 194.125Z" fill="url(#footer-logo-grad)"/>
                <circle cx="408.418" cy="182.475" r="17.4754" fill="url(#footer-logo-dot)"/>
              </svg>
              <span className="font-display font-bold text-lg tracking-tight">
                {SITE.name}
              </span>
            </Link>

            <p className="text-sm text-foreground-3 leading-relaxed max-w-[30ch]">
              {SITE.description}
            </p>

            <div className="space-y-2 pt-1">
              <a
                href={SITE.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-2 text-sm text-foreground-2',
                  'hover:text-foreground transition-colors duration-200',
                )}
              >
                <MapPin size={14} className="text-foreground-3" />
                {SITE.location.short}
                <ArrowUpRight size={11} className="text-foreground-3/60" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className={cn(
                  'flex items-center gap-2 text-sm text-foreground-2',
                  'hover:text-foreground transition-colors duration-200',
                )}
              >
                <Mail size={14} className="text-foreground-3" />
                {SITE.email}
              </a>
            </div>
          </div>

          {/* ── Navigation column ─────────────────────────────── */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground-3 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-sm text-foreground-2',
                      'hover:text-foreground transition-colors duration-200',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact / CTA column ──────────────────────────── */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground-3 mb-4">
              Work With Us
            </h3>
            <p className="text-sm text-foreground-2 leading-relaxed mb-4">
              Open to partnerships, collaborations, and ambitious projects.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className={cn(
                'inline-flex items-center gap-2',
                'text-sm font-medium text-accent-blue',
                'hover:text-accent-violet transition-colors duration-200',
              )}
            >
              <Mail size={14} />
              {SITE.email}
            </a>

            <div className="mt-5 flex">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 tracking-wider uppercase">
                  {SITE.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────── */}
        <div className="py-5 border-t border-border/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-foreground-3">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className="text-xs text-foreground-3 font-mono">
            {SITE.location.short} · {SITE.location.utc}
          </p>
        </div>
      </Container>
    </footer>
  )
}
