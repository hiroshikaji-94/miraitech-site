import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?:  ButtonVariant
  size?:     ButtonSize
  className?: string
  children:  React.ReactNode
}

interface ButtonAsButton extends ButtonBaseProps,
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  href?: never
  external?: never
}

interface ButtonAsLink extends ButtonBaseProps {
  href:      string
  external?: boolean
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-accent-warm text-white',
    'hover:bg-accent-violet',
    'transition-colors',
  ].join(' '),
  secondary: [
    'border border-border/15 bg-transparent text-foreground',
    'hover:bg-surface-high hover:border-border/30',
  ].join(' '),
  ghost: 'text-foreground-2 hover:text-foreground hover:bg-surface-high',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8  px-3   text-xs  gap-1.5',
  md: 'h-10 px-5   text-sm  gap-2',
  lg: 'h-12 px-6   text-sm  gap-2.5',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center font-medium',
    'transition-all duration-200 ease-out',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue/70',
    'disabled:opacity-50 disabled:pointer-events-none',
    'active:scale-[0.98]',
    variantStyles[variant],
    sizeStyles[size],
    className,
  )

  // Link variant
  if ('href' in props && props.href) {
    const { href, external, ...rest } = props as ButtonAsLink

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      )
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  // Button variant
  const { ...buttonProps } = props as ButtonAsButton
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  )
}
