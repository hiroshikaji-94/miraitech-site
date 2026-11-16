'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './ThemeToggle'
import { MobileMenu } from './MobileMenu'
import { Container } from '@/components/ui/Container'
import type { NavLink } from '@/types'

const NAV_LINKS: NavLink[] = [
  { href: '/projects', label: 'Projects' },
  { href: '/ai-lab',   label: 'AI Lab' },
  { href: '/blog',     label: 'Blog' },
  { href: '/team',     label: 'Team' },
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
]

export function Header() {
  const pathname    = usePathname()
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Detect scroll for header background
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    handler() // check on mount
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <header
        role="banner"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-16',
          'transition-all duration-500 ease-in-out',
          scrolled
            ? 'bg-background/80 backdrop-blur-2xl border-b border-border/8 shadow-[0_1px_8px_rgb(0_0_0/0.08)]'
            : 'bg-background/40 backdrop-blur-md',
        )}
      >
        <Container className="h-full flex items-center justify-between gap-6">
          {/* ── Logo ──────────────────────────────────────────── */}
          <Link
            href="/"
            aria-label="Home"
            className="flex items-center gap-2.5 group flex-shrink-0"
          >
            {/* Logo mark */}
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
                <linearGradient id="logo-grad" x1="178.908" y1="303.638" x2="441.039" y2="303.638" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4B7FF7"/>
                  <stop offset="1" stopColor="#A36AFE"/>
                </linearGradient>
                <linearGradient id="logo-dot-grad" x1="390.942" y1="182.475" x2="425.893" y2="182.475" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4B7FF7"/>
                  <stop offset="1" stopColor="#A36AFE"/>
                </linearGradient>
              </defs>
              <path d="M306.841 194.125H306.318C300.997 194.125 296.066 196.917 293.328 201.48L188.871 375.576C183.344 384.786 186.234 396.727 195.36 402.392C204.828 408.268 217.281 405.109 222.802 395.43L307.061 247.717L328.032 282.668L262.228 388.352C257.396 396.113 262.976 406.16 272.118 406.16H420.725C429.723 406.16 435.325 396.393 430.78 388.627L376.963 296.648L354.827 331.599L375.026 367.743C375.893 369.296 374.771 371.21 372.992 371.21H319.182C317.404 371.21 316.281 369.298 317.147 367.745L391.892 233.613C396.405 225.515 393.058 215.289 384.63 211.426C377.528 208.171 369.114 210.559 364.781 217.059L350.603 238.325C348.758 241.093 344.673 241.037 342.904 238.22L319.67 201.218C316.899 196.805 312.053 194.125 306.841 194.125Z" fill="url(#logo-grad)"/>
              <circle cx="408.418" cy="182.475" r="17.4754" fill="url(#logo-dot-grad)"/>
            </svg>

            <span className="font-display font-bold text-lg tracking-tight leading-none">
              MiraiTech
            </span>
          </Link>

          {/* ── Desktop Navigation ───────────────────────────── */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-1"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href))

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-3 py-2 rounded-lg text-sm font-medium',
                    'transition-colors duration-200',
                    isActive
                      ? 'text-foreground'
                      : 'text-foreground-2 hover:text-foreground',
                  )}
                >
                  {/* Sliding background pill for active state */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-bg"
                      className="absolute inset-0 rounded-lg bg-surface-high"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {link.label}
                    {link.badge && (
                      <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded-full bg-accent-blue/15 text-accent-blue">
                        {link.badge}
                      </span>
                    )}
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* ── Right Controls ───────────────────────────────── */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <ThemeToggle />

            {/* CTA button — desktop only */}
            <Link
              href="/contact"
              className={cn(
                'hidden md:inline-flex items-center gap-2',
                'px-4 py-2 text-sm font-medium',
                'bg-accent-warm text-white',
                'hover:bg-accent-violet',
                'transition-colors duration-200',
              )}
            >
              Work With Us
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className={cn(
                'flex md:hidden h-9 w-9 items-center justify-center rounded-lg',
                'text-foreground-2 hover:text-foreground',
                'hover:bg-surface-high transition-colors',
              )}
            >
              <Menu size={18} />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile drawer */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={NAV_LINKS}
      />
    </>
  )
}
