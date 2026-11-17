'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS, isActivePath } from '@/lib/nav'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ThemeToggle } from './ThemeToggle'
import { MobileMenu } from './MobileMenu'

// Contact gets the button on the right, so the inline nav leaves it out.
const INLINE_LINKS = NAV_LINKS.filter((link) => link.href !== '/contact')

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 h-[4.5rem] border-b border-border/[0.07] transition-colors duration-200',
          scrolled ? 'bg-background/85 backdrop-blur-xl' : 'bg-background',
        )}
      >
        <Container className="flex h-full items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {INLINE_LINKS.map((link) => {
              const active = isActivePath(pathname, link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative rounded-lg px-3.5 py-2 text-[15px] font-medium transition-colors duration-150',
                    active ? 'text-foreground' : 'text-foreground-2 hover:text-foreground',
                  )}
                >
                  {link.label}
                  {active && (
                    <span aria-hidden className="absolute inset-x-3.5 -bottom-[17px] h-0.5 rounded-full bg-accent" />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button href="/contact" size="sm" className="hidden h-10 px-5 md:inline-flex">
              Get in touch
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 items-center justify-center rounded-btn border border-border/10 text-foreground md:hidden"
            >
              <Menu size={18} strokeWidth={2} />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
