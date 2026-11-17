'use client'

import { useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

const emptySubscribe = () => () => {}

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()

  // true only after hydration, so the icon never mismatches the server render
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false)

  if (!mounted) {
    return <span aria-hidden className={cn('block h-10 w-10', className)} />
  }

  const isDark = resolvedTheme !== 'light'
  const Icon = isDark ? Sun : Moon

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-btn text-foreground-3 transition-colors duration-150 hover:bg-foreground/[0.05] hover:text-foreground',
        className,
      )}
    >
      <Icon size={16} strokeWidth={1.75} />
    </button>
  )
}
