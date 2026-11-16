'use client'

import { useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

const emptySubscribe = () => () => {}

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()

  // Hydration-safe mount detection without useEffect + setState
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,   // client
    () => false,  // server
  )

  if (!mounted) {
    return <div className={cn('h-9 w-9', className)} aria-hidden />
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative flex h-9 w-9 items-center justify-center rounded-lg',
        'text-foreground-2 transition-all duration-200',
        'hover:text-foreground hover:bg-surface-high',
        'border border-transparent hover:border-border/40',
        className,
      )}
    >
      <span className="sr-only">{isDark ? 'Light mode' : 'Dark mode'}</span>

      {/* Sun icon — shown in dark mode to switch to light */}
      <Sun
        size={16}
        className={cn(
          'absolute transition-all duration-300',
          isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75',
        )}
      />

      {/* Moon icon — shown in light mode to switch to dark */}
      <Moon
        size={16}
        className={cn(
          'absolute transition-all duration-300',
          isDark ? 'opacity-0 -rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100',
        )}
      />
    </button>
  )
}
