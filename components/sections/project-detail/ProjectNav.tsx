'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import type { ProjectData } from '@/lib/data'

interface ProjectNavProps {
  prev: ProjectData | null
  next: ProjectData | null
}

function NavCard({
  project,
  direction,
}: {
  project: ProjectData
  direction: 'prev' | 'next'
}) {
  const isPrev = direction === 'prev'

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        'group flex items-center gap-4 p-4 rounded-xl',
        'bg-surface border border-border/8',
        'hover:border-accent-blue/20 hover:shadow-card-hover',
        'transition-all duration-300',
        isPrev ? 'flex-row' : 'flex-row-reverse text-right',
      )}
    >
      {/* Arrow */}
      <div className={cn(
        'flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg',
        'bg-surface-high border border-border/10',
        'group-hover:bg-accent-blue/10 group-hover:border-accent-blue/15',
        'transition-colors duration-200',
      )}>
        {isPrev
          ? <ArrowLeft size={16} className="text-foreground-3 group-hover:text-accent-blue transition-colors" />
          : <ArrowRight size={16} className="text-foreground-3 group-hover:text-accent-blue transition-colors" />
        }
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-3">
          {isPrev ? 'Previous' : 'Next'} Project
        </span>
        <h4 className={cn(
          'font-display font-semibold text-sm mt-0.5 truncate',
          'text-foreground group-hover:text-accent-blue transition-colors duration-200',
        )}>
          {project.title}
        </h4>
      </div>

      {/* Thumbnail */}
      <div className="flex-shrink-0 w-16 h-10 rounded-lg overflow-hidden relative bg-surface-high hidden sm:block">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
    </Link>
  )
}

export function ProjectNav({ prev, next }: ProjectNavProps) {
  if (!prev && !next) return null

  return (
    <section className="py-12 md:py-16 border-t border-border/8">
      <Container>
        <FadeIn>
          <div className={cn(
            'grid gap-4',
            prev && next ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-md',
            !prev && next && 'ml-auto',
          )}>
            {prev && <NavCard project={prev} direction="prev" />}
            {next && <NavCard project={next} direction="next" />}
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
