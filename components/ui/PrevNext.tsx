import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'

interface Item {
  href:  string
  title: string
}

interface PrevNextProps {
  prev?:  Item | null
  next?:  Item | null
  /** What the items are, used in the small label: "Next project" */
  noun:   string
  label:  string
}

function NavItem({ item, direction, noun }: { item: Item; direction: 'Previous' | 'Next'; noun: string }) {
  const isNext = direction === 'Next'
  const Icon = isNext ? ArrowRight : ArrowLeft
  return (
    <Link
      href={item.href}
      className={cn('card card-hover group flex flex-col p-6 md:p-8', isNext && 'md:col-start-2 md:items-end md:text-right')}
    >
      <span className="mono-label inline-flex items-center gap-2 font-semibold text-accent-fg">
        {!isNext && <Icon size={12} strokeWidth={2} aria-hidden />}
        {direction} {noun}
        {isNext && <Icon size={12} strokeWidth={2} aria-hidden />}
      </span>
      <span className="mt-3 text-xl font-bold leading-snug tracking-[-0.02em] text-foreground md:text-2xl">
        {item.title}
      </span>
    </Link>
  )
}

export function PrevNext({ prev, next, noun, label }: PrevNextProps) {
  if (!prev && !next) return null
  return (
    <nav aria-label={label} className="border-t border-border/[0.07] py-16 md:py-20">
      <Container>
        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {prev && <NavItem item={prev} direction="Previous" noun={noun} />}
          {next && <NavItem item={next} direction="Next" noun={noun} />}
        </div>
      </Container>
    </nav>
  )
}
