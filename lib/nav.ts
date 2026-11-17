import type { NavLink } from '@/types'

export const NAV_LINKS: NavLink[] = [
  { href: '/projects', label: 'Work' },
  { href: '/ai-lab',   label: 'AI Lab' },
  { href: '/blog',     label: 'Writing' },
  { href: '/team',     label: 'Team' },
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
]

export function isActivePath(pathname: string, href: string) {
  return pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))
}
