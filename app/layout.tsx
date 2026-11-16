import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

/* ─────────────────────────────────────────────────────────────────
   Fonts
───────────────────────────────────────────────────────────────── */

const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-inter',
  display:  'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets:  ['latin'],
  variable: '--font-space-grotesk',
  display:  'swap',
  weight:   ['400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets:  ['latin'],
  variable: '--font-jetbrains-mono',
  display:  'swap',
  weight:   ['400', '500'],
})

/* ─────────────────────────────────────────────────────────────────
   Metadata
───────────────────────────────────────────────────────────────── */

const SITE_URL  = 'https://mirai-tech.net'
const SITE_NAME = 'MiraiTech'
const SITE_DESC = 'An AI-focused software engineering team in Tokyo, building production systems across AI, full-stack, and data.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:  `${SITE_NAME} — AI Engineering from Tokyo`,
    template: `%s · ${SITE_NAME}`,
  },

  description: SITE_DESC,

  keywords: [
    'Tokyo', 'Japan', 'AI Engineering Team', 'Machine Learning',
    'Next.js', 'React', 'TypeScript', 'LLM', 'RAG',
    'Software Engineering', 'Multi-Agent Systems',
  ],

  authors:  [{ name: SITE_NAME }],
  creator:  SITE_NAME,

  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         SITE_URL,
    siteName:    SITE_NAME,
    title:       `${SITE_NAME} — AI Engineering from Tokyo`,
    description: SITE_DESC,
  },

  twitter: {
    card:        'summary_large_image',
    title:       `${SITE_NAME} — AI Engineering from Tokyo`,
    description: SITE_DESC,
  },

  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      'max-image-preview': 'large',
    },
  },

  // Icons handled by app/icon.svg file convention
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#04040C' },
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
  ],
  width:        'device-width',
  initialScale: 1,
}

/* ─────────────────────────────────────────────────────────────────
   Root Layout
───────────────────────────────────────────────────────────────── */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      // "light" / "dark" class is set by ThemeProvider after hydration.
      // Default CSS variables already define light colors on :root,
      // so there is no flash before hydration.
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={[
        inter.variable,
        spaceGrotesk.variable,
        jetbrainsMono.variable,
      ].join(' ')}
    >
      <body className="flex min-h-dvh flex-col antialiased">
        <ThemeProvider>
          {/* Skip-to-content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-surface focus:text-foreground focus:text-sm focus:font-medium focus:border focus:border-border/20"
          >
            Skip to content
          </a>

          <Header />

          <main
            id="main-content"
            className="relative flex-1"
          >
            {children}
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
