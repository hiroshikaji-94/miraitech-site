'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Mail, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SITE } from '@/lib/site'
import type { NavLink } from '@/types'

interface MobileMenuProps {
  isOpen:   boolean
  onClose:  () => void
  links:    NavLink[]
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const pathname = usePathname()

  // Close on route change
  useEffect(() => {
    onClose()
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  // Lock body scroll and allow Escape to close while open
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm md:hidden"
            onClick={onClose}
            aria-hidden
          />

          {/* Menu panel */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={cn(
              'fixed right-0 top-0 bottom-0 z-50 w-80 max-w-[86vw] md:hidden',
              'flex flex-col',
              'bg-surface border-l border-border/10 shadow-float',
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-5 border-b border-border/10">
              <span className="font-display font-bold text-lg tracking-tight">{SITE.name}</span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-lg',
                  'text-foreground-2 hover:text-foreground',
                  'hover:bg-surface-high transition-colors',
                )}
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation links */}
            <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="space-y-1">
                {links.map((link, i) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== '/' && pathname.startsWith(link.href))

                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 + i * 0.04, duration: 0.25 }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'flex items-center justify-between gap-3 px-4 py-3 rounded-xl',
                          'text-[15px] font-medium transition-colors duration-150',
                          isActive
                            ? 'text-accent-warm bg-accent-warm/[0.07]'
                            : 'text-foreground-2 hover:text-foreground hover:bg-surface-high',
                        )}
                      >
                        {link.label}
                        <ChevronRight size={16} className={isActive ? 'text-accent-warm' : 'text-foreground-3/60'} />
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>
            </nav>

            {/* Footer — primary action + direct contact */}
            <div className="px-5 py-5 border-t border-border/10 space-y-3">
              <Link
                href="/contact"
                onClick={onClose}
                className={cn(
                  'flex items-center justify-center gap-2 h-11 rounded-lg',
                  'bg-accent-warm text-white text-sm font-medium',
                  'hover:bg-accent-violet transition-colors',
                )}
              >
                Work With Us
                <ArrowRight size={15} />
              </Link>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center justify-center gap-2 text-sm text-foreground-2 hover:text-foreground transition-colors"
              >
                <Mail size={14} className="text-foreground-3" />
                {SITE.email}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
