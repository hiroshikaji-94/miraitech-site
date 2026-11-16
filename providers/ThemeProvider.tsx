'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'

/**
 * Wraps next-themes with site-specific defaults.
 * - defaultTheme: "light"  — light mode is the primary experience
 * - attribute: "class"     — adds "dark" or "light" class to <html>
 * - enableSystem: false    — explicit choice, ignores OS preference
 * - value mapping          — maps to our :root (light) / .dark CSS tokens
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
      value={{ dark: 'dark', light: 'light' }}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
