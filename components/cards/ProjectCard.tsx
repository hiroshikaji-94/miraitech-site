import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { label, type ProjectData } from '@/lib/data'
import { Tag } from '@/components/ui/Tag'

interface ProjectCardProps {
  project:   ProjectData
  /** Load the cover image eagerly (first row above the fold) */
  priority?: boolean
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const { slug, title, summary, year, category, coverImage, highlights } = project

  return (
    <Link href={`/projects/${slug}`} className="card card-hover group flex flex-col overflow-hidden p-2">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[0.875rem] border border-border/[0.06] bg-surface-high">
        <Image
          src={coverImage}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 620px"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-6 md:px-5 md:pb-5">
        {highlights[0] && (
          <p className="font-mono text-[15px] font-medium leading-snug text-accent-fg">{highlights[0]}</p>
        )}
        <h3 className="mt-3 text-[1.375rem] font-bold leading-snug tracking-[-0.025em] text-foreground">{title}</h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-foreground-2">{summary}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
          <span className="flex items-center gap-2.5">
            <Tag dot>{label(category)}</Tag>
            <span className="mono-label text-foreground-3">{year}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-fg">
            Read case study
            <ArrowRight size={15} strokeWidth={2} aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
