import { CTAPanel } from '@/components/ui/CTAPanel'

export function HomeCTA() {
  return (
    <CTAPanel
      eyebrow="06 — Next"
      title="Ready to move"
      highlight="together?"
      description="We work with teams and founders who need AI and full-stack systems built properly the first time."
      actions={[
        { label: 'Start a project', href: '/contact' },
        { label: 'Meet the team',   href: '/team',  variant: 'secondary' },
        { label: 'About MiraiTech', href: '/about', variant: 'link' },
      ]}
    />
  )
}
