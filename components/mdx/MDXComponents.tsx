import Image from 'next/image'
import { cn } from '@/lib/utils'
import {
  Lightbulb, AlertTriangle, Info, CheckCircle2,
  FileCode2, Terminal,
} from 'lucide-react'
import type { MDXComponents as MDXComponentsType } from 'mdx/types'

/* ─── Callout ───────────────────────────────────────────────────── */

const calloutConfig = {
  info:    { icon: Info,           border: 'border-accent-blue/20',   bg: 'bg-accent-blue/5',   iconColor: 'text-accent-blue',   label: 'Note' },
  tip:     { icon: Lightbulb,     border: 'border-emerald-500/20',  bg: 'bg-emerald-500/5',   iconColor: 'text-emerald-700 dark:text-emerald-400',   label: 'Tip' },
  warning: { icon: AlertTriangle, border: 'border-amber-500/20',    bg: 'bg-amber-500/5',     iconColor: 'text-amber-700 dark:text-amber-400',     label: 'Warning' },
  success: { icon: CheckCircle2,  border: 'border-emerald-500/20',  bg: 'bg-emerald-500/5',   iconColor: 'text-emerald-700 dark:text-emerald-400',   label: 'Success' },
} as const

function Callout({
  type = 'info',
  title,
  children,
}: {
  type?: keyof typeof calloutConfig
  title?: string
  children: React.ReactNode
}) {
  const config = calloutConfig[type]
  const Icon = config.icon

  return (
    <div className={cn(
      'my-6 rounded-xl border-l-4 p-5',
      config.border, config.bg,
    )}>
      <div className="flex items-start gap-3">
        <Icon size={18} className={cn('mt-0.5 flex-shrink-0', config.iconColor)} />
        <div className="min-w-0 flex-1">
          {title && (
            <p className={cn('text-sm font-semibold mb-1', config.iconColor)}>{title}</p>
          )}
          <div className="text-sm text-foreground-2 leading-relaxed [&>p]:my-0">{children}</div>
        </div>
      </div>
    </div>
  )
}

/* ─── Key Takeaway / Summary Box ────────────────────────────────── */

function KeyTakeaway({
  title = 'Key Takeaway',
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn(
      'my-8 rounded-xl border border-accent-blue/15 p-6',
      'bg-gradient-to-br from-accent-blue/5 via-accent-violet/3 to-transparent',
    )}>
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={16} className="text-accent-blue" />
        <span className="text-sm font-semibold text-accent-blue">{title}</span>
      </div>
      <div className="text-foreground-2 leading-relaxed [&>p]:my-0 [&>ul]:my-2">{children}</div>
    </div>
  )
}

/* ─── Figure / Image with Caption ───────────────────────────────── */

function Figure({
  src,
  alt,
  caption,
  wide = false,
}: {
  src: string
  alt: string
  caption?: string
  wide?: boolean
}) {
  return (
    <figure className={cn(
      'my-8',
      wide && 'lg:-mx-16 xl:-mx-24',
    )}>
      <div className="overflow-hidden rounded-xl border border-border/8 bg-surface">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={675}
          className="w-full h-auto"
          sizes={wide ? '100vw' : '(max-width: 768px) 100vw, 720px'}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-foreground-3 font-mono">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/* ─── Architecture Diagram (styled container) ───────────────────── */

function Diagram({
  title,
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <div className="my-8 rounded-xl border border-border/10 bg-surface p-6 md:p-8">
      {title && (
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/8">
          <FileCode2 size={14} className="text-accent-violet" />
          <span className="text-sm font-semibold text-foreground-2">{title}</span>
        </div>
      )}
      <div className="text-foreground-2">{children}</div>
    </div>
  )
}

/* ─── Step list ─────────────────────────────────────────────────── */

function Step({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="my-6 flex gap-4">
      <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-accent-blue/10 border border-accent-blue/15 text-sm font-mono font-bold text-accent-blue">
        {number}
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <h4 className="font-display font-semibold text-foreground mb-1">{title}</h4>
        <div className="text-sm text-foreground-2 leading-relaxed [&>p]:my-0">{children}</div>
      </div>
    </div>
  )
}

/* ─── File Header (for code blocks with filename) ───────────────── */

function CodeFile({
  filename,
  children,
}: {
  filename: string
  children: React.ReactNode
}) {
  return (
    <div className="my-6 rounded-xl overflow-hidden border border-border/10">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-surface-high border-b border-border/8">
        <Terminal size={12} className="text-foreground-3" />
        <span className="text-xs font-mono text-foreground-3">{filename}</span>
      </div>
      <div className="[&>pre]:my-0 [&>pre]:rounded-none [&>pre]:border-0">{children}</div>
    </div>
  )
}

/* ─── Comparison Table ──────────────────────────────────────────── */

function ComparisonTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: string[][]
}) {
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-border/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface-high">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left font-semibold text-foreground-2 border-b border-border/8 first:rounded-tl-xl last:rounded-tr-xl"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border/5 last:border-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    'px-4 py-3 text-foreground-2',
                    j === 0 && 'font-medium text-foreground',
                  )}
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

/* ─── Export mapping ────────────────────────────────────────────── */

export const mdxComponents: MDXComponentsType = {
  // Custom components
  Callout,
  KeyTakeaway,
  Figure,
  Diagram,
  Step,
  CodeFile,
  ComparisonTable,

  // Override default elements
  h2: (props) => (
    <h2
      {...props}
      className="group font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-12 mb-4 scroll-mt-24"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className="group font-display text-xl md:text-2xl font-semibold tracking-tight text-foreground mt-10 mb-3 scroll-mt-24"
    />
  ),
  h4: (props) => (
    <h4
      {...props}
      className="font-display text-lg font-semibold text-foreground mt-8 mb-2 scroll-mt-24"
    />
  ),
  p: (props) => (
    <p {...props} className="text-foreground-2 leading-[1.8] my-4 text-pretty" />
  ),
  a: (props) => (
    <a
      {...props}
      className="text-accent-blue hover:text-accent-blue/80 underline underline-offset-4 decoration-accent-blue/30 hover:decoration-accent-blue/60 transition-colors"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    />
  ),
  ul: (props) => (
    <ul {...props} className="my-4 ml-1 space-y-2 list-none [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.6em] [&>li]:before:h-1.5 [&>li]:before:w-1.5 [&>li]:before:rounded-full [&>li]:before:bg-accent-blue/50" />
  ),
  ol: (props) => (
    <ol {...props} className="my-4 ml-1 space-y-2 list-none counter-reset-item [&>li]:relative [&>li]:pl-8 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-0 [&>li]:before:flex [&>li]:before:h-6 [&>li]:before:w-6 [&>li]:before:items-center [&>li]:before:justify-center [&>li]:before:rounded-md [&>li]:before:bg-accent-blue/10 [&>li]:before:text-xs [&>li]:before:font-mono [&>li]:before:font-semibold [&>li]:before:text-accent-blue [&>li]:counter-increment-item [&>li]:before:content-counter-item" />
  ),
  li: (props) => (
    <li {...props} className="text-foreground-2 leading-relaxed" />
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className="my-6 border-l-2 border-accent-violet/30 pl-5 text-foreground-2 italic [&>p]:my-2"
    />
  ),
  hr: () => (
    <hr className="my-10 border-0 h-px bg-gradient-to-r from-transparent via-border/15 to-transparent" />
  ),
  table: (props) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-border/10">
      <table {...props} className="w-full text-sm" />
    </div>
  ),
  thead: (props) => <thead {...props} className="bg-surface-high" />,
  th: (props) => (
    <th
      {...props}
      className="px-4 py-3 text-left font-semibold text-foreground-2 border-b border-border/8"
    />
  ),
  td: (props) => (
    <td {...props} className="px-4 py-3 text-foreground-2 border-b border-border/5" />
  ),
  code: (props) => {
    // Inline code only — block code is handled by rehype-pretty-code
    const isBlock = typeof props.children === 'string' && props.children.includes('\n')
    if (isBlock || props['data-rehype-pretty-code-figure' as keyof typeof props]) return <code {...props} />
    return (
      <code
        {...props}
        className="text-[0.9em] font-mono px-1.5 py-0.5 rounded-md bg-surface-high text-accent-blue border border-border/8"
      />
    )
  },
  img: (props) => (
    <span className="block my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...props}
        alt={props.alt ?? ''}
        className="rounded-xl border border-border/8 w-full"
        loading="lazy"
      />
    </span>
  ),
}
