import { CTAPanel } from '@/components/ui/CTAPanel'

export function ProjectCTA() {
  return (
    <CTAPanel
      eyebrow="Next"
      title="Need something like this"
      highlight="built properly?"
      description="We design, build and operate production systems like this for teams and founders who value quality engineering."
      actions={[
        { label: 'Start a conversation', href: '/contact' },
        { label: 'More projects',        href: '/projects', variant: 'secondary' },
      ]}
    />
  )
}
