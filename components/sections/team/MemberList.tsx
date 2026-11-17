import Image from 'next/image'
import { ALL_MEMBERS } from '@/lib/team'
import { ArrowLink } from '@/components/ui/ArrowLink'
import { Container } from '@/components/ui/Container'
import { Tag } from '@/components/ui/Tag'

export function MemberList() {
  return (
    <section aria-label="Engineers" className="border-t border-border/[0.07] bg-muted py-12 md:py-16">
      <Container className="space-y-5">
        {ALL_MEMBERS.map((member) => (
          <article
            key={member.slug}
            aria-labelledby={`member-${member.slug}`}
            className="card grid gap-x-10 gap-y-6 p-6 md:grid-cols-12 md:p-8"
          >
            <div className="md:col-span-4 lg:col-span-3">
              <div className="relative aspect-square w-32 overflow-hidden rounded-2xl border border-border/10 bg-surface-high sm:w-40 md:w-full md:max-w-[240px]">
                {member.avatar && (
                  <Image
                    src={member.avatar}
                    alt={`Photo of ${member.name}`}
                    fill
                    sizes="(max-width: 768px) 160px, 240px"
                    className="object-cover"
                  />
                )}
              </div>
            </div>

            <div className="min-w-0 md:col-span-8 lg:col-span-9">
              <p className="mono-label font-semibold text-accent-fg">{member.role}</p>
              <h2
                id={`member-${member.slug}`}
                className="mt-2 text-[2rem] font-extrabold leading-tight tracking-[-0.035em] text-foreground"
              >
                {member.name}
              </h2>
              <p className="mt-5 max-w-[66ch] text-[17px] leading-[1.75] text-foreground-2 text-pretty">{member.bio}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <li key={skill}>
                    <Tag tone="neutral">{skill}</Tag>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-border/[0.07] pt-5">
                {member.links.map((link) => (
                  <ArrowLink key={link.href} href={link.href} external={link.href.startsWith('http')} variant="mono">
                    {link.label}
                  </ArrowLink>
                ))}
              </div>
            </div>
          </article>
        ))}
      </Container>
    </section>
  )
}
