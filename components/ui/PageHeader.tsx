import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { SectionIntro } from '@/components/ui/Section'

interface PageHeaderProps {
  eyebrow:    string
  title:      string
  /** Short paragraph under the title */
  intro?:     React.ReactNode
  /** Extra content under the header, such as filters */
  children?:  React.ReactNode
  className?: string
}

// Top of an inner page: eyebrow, large heading, intro. A faint green wash sits behind it.
export function PageHeader({ eyebrow, title, intro, children, className }: PageHeaderProps) {
  return (
    <section className={cn('relative overflow-hidden pb-14 pt-36 md:pb-20 md:pt-44', className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_50%_60%_at_15%_0%,rgb(var(--color-accent)/0.07),transparent_70%)]"
      />
      <Container className="relative">
        <SectionIntro as="h1" eyebrow={eyebrow} title={title} intro={intro} />
        {children}
      </Container>
    </section>
  )
}
