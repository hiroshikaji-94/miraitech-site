'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS, isActivePath } from '@/lib/nav'
import { SITE } from '@/lib/site'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

interface MobileMenuProps {
  open:    boolean
  onClose: () => void
}

// Full-screen menu for small screens. It stays mounted and fades in and out.
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname()
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className={cn(
        'fixed inset-0 z-[60] flex flex-col bg-background md:hidden',
        'transition-[opacity,visibility] duration-200',
        open ? 'visible opacity-100' : 'invisible opacity-0',
      )}
    >
      <Container className="flex h-[4.5rem] shrink-0 items-center justify-between border-b border-border/[0.07]">
        <Logo onClick={onClose} />
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-10 w-10 items-center justify-center rounded-btn border border-border/10 text-foreground"
        >
          <X size={18} strokeWidth={2} />
        </button>
      </Container>

      <nav aria-label="Mobile" className="flex-1 overflow-y-auto">
        <Container className="pt-6">
          <p className="eyebrow">Menu</p>
          <ul className="mt-4">
            {NAV_LINKS.map((link) => {
              const active = isActivePath(pathname, link.href)
              return (
                <li key={link.href} className="border-b border-border/[0.07]">
                  <Link
                    href={link.href}
                    onClick={onClose}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex items-center justify-between py-4 text-[28px] font-extrabold leading-tight tracking-[-0.035em]',
                      active ? 'text-foreground' : 'text-foreground-2',
                    )}
                  >
                    {link.label}
                    {active ? (
                      <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
                    ) : (
                      <ArrowRight size={18} strokeWidth={2} aria-hidden className="text-foreground-3" />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </Container>
      </nav>

      <Container className="shrink-0 border-t border-border/[0.07] py-6">
        <Button href="/contact" size="lg" className="w-full" onClick={onClose}>
          Get in touch
          <ArrowRight size={16} strokeWidth={2} aria-hidden />
        </Button>
        <p className="mono-label mt-4 text-center text-foreground-3">
          {SITE.email}
        </p>
      </Container>
    </div>
  )
}
