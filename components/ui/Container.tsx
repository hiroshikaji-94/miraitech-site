import { cn } from '@/lib/utils'

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

interface ContainerProps {
  children:   React.ReactNode
  className?: string
  size?:      ContainerSize
  as?:        React.ElementType
}

const maxWidths: Record<ContainerSize, string> = {
  sm:   'max-w-3xl',   // ~768px  — blog reader, about
  md:   'max-w-4xl',   // ~896px  — focused content
  lg:   'max-w-5xl',   // ~1024px — project detail
  xl:   'max-w-7xl',   // ~1280px — main grid pages
  full: 'max-w-full',
}

/**
 * Responsive page container.
 * Default size "xl" is used for most pages.
 * Use "sm" for prose-heavy pages like blog posts.
 */
export function Container({
  children,
  className,
  size = 'xl',
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        maxWidths[size],
        className,
      )}
    >
      {children}
    </Tag>
  )
}
