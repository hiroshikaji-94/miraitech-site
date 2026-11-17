import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SITE } from '@/lib/site'

// The mark is drawn in the current text color; the dot carries the accent.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="175 162 260 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn('h-6 w-6 shrink-0', className)}
    >
      <path
        fill="currentColor"
        d="M306.841 194.125H306.318C300.997 194.125 296.066 196.917 293.328 201.48L188.871 375.576C183.344 384.786 186.234 396.727 195.36 402.392C204.828 408.268 217.281 405.109 222.802 395.43L307.061 247.717L328.032 282.668L262.228 388.352C257.396 396.113 262.976 406.16 272.118 406.16H420.725C429.723 406.16 435.325 396.393 430.78 388.627L376.963 296.648L354.827 331.599L375.026 367.743C375.893 369.296 374.771 371.21 372.992 371.21H319.182C317.404 371.21 316.281 369.298 317.147 367.745L391.892 233.613C396.405 225.515 393.058 215.289 384.63 211.426C377.528 208.171 369.114 210.559 364.781 217.059L350.603 238.325C348.758 241.093 344.673 241.037 342.904 238.22L319.67 201.218C316.899 196.805 312.053 194.125 306.841 194.125Z"
      />
      <circle cx="408.418" cy="182.475" r="17.4754" className="fill-accent" />
    </svg>
  )
}

interface LogoProps {
  className?: string
  onClick?:   () => void
  /** Larger version for the footer */
  size?:      'md' | 'lg'
}

export function Logo({ className, onClick, size = 'md' }: LogoProps) {
  const large = size === 'lg'
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${SITE.name} home`}
      className={cn('inline-flex items-center text-foreground', large ? 'gap-3' : 'gap-2.5', className)}
    >
      <LogoMark className={large ? 'h-10 w-10' : 'h-[26px] w-[26px]'} />
      <span className={cn('font-bold tracking-[-0.03em]', large ? 'text-[2.5rem] leading-none' : 'text-[20px]')}>
        {SITE.name}
      </span>
    </Link>
  )
}
