'use client'

import Image from 'next/image'
import { ArrowUpRight, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TeamMember } from '@/lib/team'

interface MemberCardProps {
  member:    TeamMember
  /** Larger layout for the leadership card */
  featured?: boolean
  className?: string
}

export function MemberCard({ member, featured = false, className }: MemberCardProps) {
  const { name, role, initials, avatar, tagline, bio, skills, links } = member

  return (
    <article
      className={cn(
        'h-full rounded-2xl bg-surface border border-border/10 shadow-card',
        'transition-all duration-300',
        'hover:border-border/15 hover:shadow-card-hover',
        featured ? 'p-6 md:p-10' : 'p-6',
        className,
      )}
    >
      <div className={cn(
        'flex gap-5',
        featured ? 'flex-col md:flex-row md:gap-10' : 'flex-col',
      )}>
        {/* Avatar — photo when available, monogram fallback */}
        <div className={cn(
          'relative flex-shrink-0 flex items-center justify-center overflow-hidden',
          'rounded-2xl border border-border/10 bg-surface-high',
          featured ? 'w-28 h-28 md:w-40 md:h-40' : 'w-20 h-20',
        )}>
          {avatar ? (
            <Image
              src={avatar}
              alt={name}
              fill
              sizes={featured ? '160px' : '80px'}
              className="object-cover"
              loading="eager"
            />
          ) : (
            <span className={cn(
              'font-display font-bold gradient-text',
              featured ? 'text-3xl md:text-4xl' : 'text-lg',
            )}>
              {initials}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className={cn(
            'font-display font-bold text-foreground tracking-tight',
            featured ? 'text-2xl md:text-3xl' : 'text-lg',
          )}>
            {name}
          </h3>
          <p className={cn(
            'font-mono font-semibold text-accent-warm uppercase tracking-wider mt-1',
            featured ? 'text-xs' : 'text-[11px]',
          )}>
            {role}
          </p>

          {tagline && (
            <p className="mt-3 font-display font-medium text-foreground-2 italic">
              {tagline}
            </p>
          )}

          <p className={cn(
            'text-foreground-2 leading-relaxed mt-3',
            featured ? 'text-base max-w-prose' : 'text-sm',
          )}>
            {bio}
          </p>

          {/* Skills */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill}
                className={cn(
                  'text-xs px-2 py-0.5 rounded-md',
                  'bg-surface-high text-foreground-2',
                )}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Links */}
          {links.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-4">
              {links.map(({ label, href }) => {
                const isMail = href.startsWith('mailto:')
                return (
                  <a
                    key={href}
                    href={href}
                    target={isMail ? undefined : '_blank'}
                    rel={isMail ? undefined : 'noopener noreferrer'}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:text-accent-violet transition-colors"
                  >
                    {isMail ? <Mail size={13} /> : <ArrowUpRight size={13} />}
                    {label}
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
