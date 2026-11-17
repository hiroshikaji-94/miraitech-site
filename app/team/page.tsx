import type { Metadata } from 'next'
import { SITE } from '@/lib/site'
import { TEAM_SIZE_WORD } from '@/lib/team'
import { PageHeader } from '@/components/ui/PageHeader'
import { MemberList } from '@/components/sections/team/MemberList'
import { HowWeWork } from '@/components/sections/home/HowWeWork'

export const metadata: Metadata = {
  title: 'Team',
  description: `The ${TEAM_SIZE_WORD} engineers at ${SITE.name} in Tokyo, covering AI, backend, data and web, working in Japanese and English.`,
}

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="The team"
        title="Everyone here writes code."
        intro={
          <p>
            {SITE.name} is {TEAM_SIZE_WORD} engineers. The person you talk to about your project is one of
            the people building it.
          </p>
        }
      />
      <MemberList />
      <HowWeWork />
    </>
  )
}
