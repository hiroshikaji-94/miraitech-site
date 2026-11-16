import { CTAPanel } from '@/components/ui/CTAPanel'
import { SITE } from '@/lib/site'

export function TeamCTA() {
  return (
    <CTAPanel
      eyebrow="Next step"
      title="Want to work"
      highlight="with this team?"
      description={`Describe what you are building. ${SITE.name} will tell you honestly whether it is a good fit — and who would lead it.`}
      actions={[
        { label: 'Start a conversation', href: '/contact' },
        { label: 'See our work',         href: '/projects', variant: 'secondary' },
      ]}
    />
  )
}
