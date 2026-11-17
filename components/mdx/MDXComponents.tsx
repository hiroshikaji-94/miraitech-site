import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { MDXComponents as MDXComponentsType } from 'mdx/types'

// Custom components available inside articles

const CALLOUT_LABELS = { info: 'Note', tip: 'Tip', warning: 'Warning', success: 'Result' } as const

function Callout({
  type = 'info',
  title,
  children,
}: {
  type?: keyof typeof CALLOUT_LABELS
  title?: string
  children: React.ReactNode
}) {
  const accent = type === 'tip' || type === 'success'
  return (
    <aside
      className={cn(
        'card my-8 border-l-2 p-5 md:px-6',
        type === 'warning' ? 'border-l-amber-400/70' : accent ? 'border-l-accent' : 'border-l-foreground/30',
      )}
    >
      <p className="flex flex-wrap items-baseline gap-x-2 text-[15px] font-semibold text-foreground">
        <span className={cn('mono-label text-[10px]', accent ? 'text-accent-fg' : 'text-foreground-3')}>
          {CALLOUT_LABELS[type]}
        </span>
        {title}
      </p>
      <div className="mt-2 text-[15px] leading-relaxed text-foreground-2 [&>p+p]:mt-3 [&>p]:my-0">{children}</div>
    </aside>
  )
}

function KeyTakeaway({ title = 'In short', children }: { title?: string; children: React.ReactNode }) {
  return (
    <aside className="card my-10 border-accent/20 bg-accent/[0.04] p-6">
      <p className="eyebrow">{title}</p>
      <div className="mt-3 text-[15px] leading-relaxed text-foreground-2 [&>p+p]:mt-3 [&>p]:my-0 [&_li]:text-[15px] [&_ul]:my-2">
        {children}
      </div>
    </aside>
  )
}

function Figure({ src, alt, caption, wide = false }: { src: string; alt: string; caption?: string; wide?: boolean }) {
  return (
    <figure className={cn('my-10', wide && 'lg:-mx-16')}>
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        sizes={wide ? '(max-width: 1024px) 100vw, 900px' : '(max-width: 768px) 100vw, 720px'}
        className="h-auto w-full rounded-xl border border-border/10"
      />
      {caption && <figcaption className="mt-3 text-sm text-foreground-3">{caption}</figcaption>}
    </figure>
  )
}

function Diagram({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="card my-8 p-6">
      {title && <p className="mono-label mb-4 border-b border-border/[0.07] pb-3 font-semibold text-foreground-3">{title}</p>}
      <div className="text-foreground-2">{children}</div>
    </div>
  )
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="my-6 flex gap-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 font-mono text-xs font-semibold tabular-nums text-accent-fg">
        {String(number).padStart(2, '0')}
      </span>
      <div className="min-w-0 pt-1">
        <p className="font-bold text-foreground">{title}</p>
        <div className="mt-1 text-[15px] leading-relaxed text-foreground-2 [&>p]:my-0">{children}</div>
      </div>
    </div>
  )
}

function CodeFile({ filename, children }: { filename: string; children: React.ReactNode }) {
  return (
    <div className="card my-6 overflow-hidden">
      <p className="border-b border-border/[0.07] px-4 py-2.5 font-mono text-xs text-foreground-3">{filename}</p>
      <div className="[&_figure]:my-0 [&_figure]:rounded-none [&_figure]:border-0">{children}</div>
    </div>
  )
}

function ComparisonTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="card my-8 overflow-x-auto">
      <table className="w-full border-collapse text-[15px]">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} className="mono-label border-b border-border/10 px-4 py-3 text-left text-[10px] font-semibold text-foreground-3">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border/[0.07] last:border-b-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={cn('px-4 py-3 align-top', j === 0 ? 'font-medium text-foreground' : 'text-foreground-2')}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const isExternal = (href?: string) => Boolean(href?.startsWith('http'))

export const mdxComponents: MDXComponentsType = {
  Callout,
  KeyTakeaway,
  Figure,
  Diagram,
  Step,
  CodeFile,
  ComparisonTable,

  h2: (props) => (
    <h2 {...props} className="mb-4 mt-14 scroll-mt-24 text-[1.75rem] font-extrabold leading-tight tracking-[-0.03em] text-foreground" />
  ),
  h3: (props) => (
    <h3 {...props} className="mb-3 mt-10 scroll-mt-24 text-xl font-bold tracking-[-0.02em] text-foreground" />
  ),
  h4: (props) => <h4 {...props} className="mb-2 mt-8 scroll-mt-24 text-base font-bold text-foreground" />,
  p: (props) => <p {...props} className="my-5 text-[17px] leading-[1.75] text-foreground-2 text-pretty" />,
  a: (props) => (
    <a
      {...props}
      className="link text-foreground"
      target={isExternal(props.href) ? '_blank' : undefined}
      rel={isExternal(props.href) ? 'noopener noreferrer' : undefined}
    />
  ),
  ul: (props) => <ul {...props} className="my-5 list-disc space-y-2 pl-5 marker:text-accent-fg" />,
  ol: (props) => <ol {...props} className="my-5 list-decimal space-y-2 pl-5 marker:font-mono marker:text-sm marker:text-accent-fg" />,
  li: (props) => <li {...props} className="pl-1 text-[17px] leading-[1.7] text-foreground-2" />,
  strong: (props) => <strong {...props} className="font-semibold text-foreground" />,
  blockquote: (props) => (
    <blockquote {...props} className="my-8 border-l-2 border-accent pl-5 text-foreground-2 [&>p]:my-2" />
  ),
  hr: () => <hr className="my-12 border-t border-border/10" />,
  table: (props) => (
    <div className="card my-8 overflow-x-auto">
      <table {...props} className="w-full border-collapse text-[15px]" />
    </div>
  ),
  th: (props) => (
    <th {...props} className="mono-label border-b border-border/10 px-4 py-3 text-left text-[10px] font-semibold text-foreground-3" />
  ),
  td: (props) => <td {...props} className="border-b border-border/[0.07] px-4 py-3 align-top text-foreground-2" />,
  code: (props) => {
    // Block code is highlighted by rehype-pretty-code and styled in globals.css
    const isBlock =
      'data-language' in props ||
      'data-theme' in props ||
      (typeof props.children === 'string' && props.children.includes('\n'))
    if (isBlock) return <code {...props} />
    return (
      <code
        {...props}
        className="rounded-md border border-border/10 bg-foreground/[0.05] px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
      />
    )
  },
  img: (props) => (
    <span className="my-10 block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...props} alt={props.alt ?? ''} loading="lazy" className="w-full rounded-xl border border-border/10" />
    </span>
  ),
}
