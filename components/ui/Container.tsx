import { cn } from '@/lib/utils'

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

interface ContainerProps {
  children:   React.ReactNode
  className?: string
  size?:      ContainerSize
  as?:        React.ElementType
}

// Widths include the side padding, so "xl" gives 80rem of content.
const maxWidths: Record<ContainerSize, string> = {
  sm:   'max-w-[52rem]',
  md:   'max-w-[60rem]',
  lg:   'max-w-[68rem]',
  xl:   'max-w-[84rem]',
  full: 'max-w-full',
}

export function Container({ children, className, size = 'xl', as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-5 sm:px-8', maxWidths[size], className)}>
      {children}
    </Tag>
  )
}
