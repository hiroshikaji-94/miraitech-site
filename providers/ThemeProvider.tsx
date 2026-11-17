'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'

// Dark by default. The header toggle switches to the light palette by setting
// the "light" class on <html>. The OS setting is ignored on purpose so the site
// looks the same for everyone on first visit.
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      value={{ dark: 'dark', light: 'light' }}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
