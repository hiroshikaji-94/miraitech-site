import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SITE } from '@/lib/site'
import './globals.css'

const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-sans',
  display:  'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets:  ['latin'],
  variable: '--font-mono',
  display:  'swap',
})

const DEFAULT_TITLE = `${SITE.name} · AI engineering in Tokyo`

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default:  DEFAULT_TITLE,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'Tokyo', 'Japan', 'AI engineering', 'LLM', 'RAG', 'AI agents',
    'data engineering', 'Next.js', 'TypeScript', 'Python',
  ],
  authors:  [{ name: SITE.name }],
  creator:  SITE.name,
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         SITE.url,
    siteName:    SITE.name,
    title:       DEFAULT_TITLE,
    description: SITE.description,
  },
  twitter: {
    card:        'summary_large_image',
    title:       DEFAULT_TITLE,
    description: SITE.description,
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#0E0E10' },
    { media: '(prefers-color-scheme: light)', color: '#0E0E10' },
  ],
  width:        'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col antialiased">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-btn focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-accent"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
