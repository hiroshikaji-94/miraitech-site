import Image from 'next/image'
import { ALL_MEMBERS } from '@/lib/team'
import { ArrowLink } from '@/components/ui/ArrowLink'
import { Section, SectionIntro } from '@/components/ui/Section'

export function People() {
  return (
    <Section labelledBy="people-title">
      <SectionIntro
        id="people-title"
        eyebrow="The team"
        title="Who you will work with."
        action={<ArrowLink href="/team">About the team</ArrowLink>}
      />
      <ul className="mt-12 grid gap-5 md:mt-14 md:grid-cols-3">
        {ALL_MEMBERS.map((member) => {
          const link = member.links.find((l) => l.href.startsWith('http'))
          return (
            <li key={member.slug} className="card flex flex-col p-6 md:p-7">
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border/10 bg-surface-high">
                  {member.avatar && (
                    <Image src={member.avatar} alt="" fill sizes="56px" className="object-cover" />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold tracking-[-0.02em] text-foreground">{member.name}</h3>
                  <p className="mono-label mt-1 text-[10px] font-semibold text-accent-fg">{member.role}</p>
                </div>
              </div>
              <p className="mt-6 flex-1 text-[15px] leading-relaxed text-foreground-2">{member.summary}</p>
              {link && (
                <div className="mt-6 border-t border-border/[0.07] pt-5">
                  <ArrowLink href={link.href} external variant="mono">
                    {link.label}
                  </ArrowLink>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
