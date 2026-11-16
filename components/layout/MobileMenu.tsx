'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
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

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

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
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={onClose}
            aria-hidden
          />

          {/* Menu panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className={cn(
              'fixed right-0 top-0 bottom-0 z-50 w-72 md:hidden',
              'flex flex-col',
              'bg-surface border-l border-border/10',
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-border/10">
              <span className="font-display font-bold text-lg">Menu</span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-lg',
                  'text-foreground-2 hover:text-foreground',
                  'hover:bg-surface-high transition-colors',
                )}
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 px-4 py-6">
              <ul className="space-y-1">
                {links.map((link, i) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== '/' && pathname.startsWith(link.href))

                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.25 }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 rounded-xl',
                          'text-sm font-medium transition-all duration-150',
                          isActive
                            ? 'text-foreground bg-surface-high'
                            : 'text-foreground-2 hover:text-foreground hover:bg-surface-high',
                        )}
                      >
                        {isActive && (
                          <span className="w-1 h-1 rounded-full bg-gradient-accent flex-shrink-0" />
                        )}
                        <span className={isActive ? '' : 'ml-4'}>{link.label}</span>
                        {link.badge && (
                          <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>
            </nav>

            {/* Footer */}
            <div className="px-6 py-6 border-t border-border/10">
              <p className="text-xs text-foreground-3">
                AI-Focused Software Engineering — Tokyo
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
