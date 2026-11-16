import { CTAPanel } from '@/components/ui/CTAPanel'
import { SITE } from '@/lib/site'

export function AboutCTA() {
  return (
    <CTAPanel
      eyebrow="Next step"
      title="Ready to build"
      highlight="with us?"
      description={`Tell ${SITE.name} what you are building. We will give you an honest recommendation on the approach — and introduce the engineer who would lead it.`}
      actions={[
        { label: 'Start a project',    href: '/contact' },
        { label: 'Meet the engineers', href: '/team',     variant: 'secondary' },
        { label: 'View all projects',  href: '/projects', variant: 'link' },
      ]}
    />
  )
}
