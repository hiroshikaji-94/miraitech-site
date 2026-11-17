import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?:   ButtonVariant
  size?:      ButtonSize
  className?: string
  children:   React.ReactNode
}

interface ButtonAsButton extends ButtonBaseProps,
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  href?:     never
  external?: never
}

interface ButtonAsLink extends ButtonBaseProps,
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps | 'href'> {
  href:      string
  external?: boolean
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-on-accent shadow-[0_8px_24px_-10px_rgb(var(--color-accent)/0.55)] hover:brightness-110',
  secondary:
    'border border-border/15 bg-transparent text-foreground hover:border-border/30 hover:bg-foreground/[0.04]',
  ghost:
    'text-foreground-2 hover:text-foreground',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-[13px] gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-12 px-6 text-[15px] gap-2',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-btn font-semibold whitespace-nowrap',
    'transition-[filter,background-color,border-color,color] duration-150',
    'disabled:pointer-events-none disabled:opacity-50',
    variantStyles[variant],
    sizeStyles[size],
    className,
  )

  if ('href' in props && props.href) {
    const { href, external, ...rest } = props as ButtonAsLink
    if (external || href.startsWith('mailto:')) {
      return (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className={classes}
          {...rest}
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

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  )
}
