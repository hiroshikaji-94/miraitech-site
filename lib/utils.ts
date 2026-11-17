import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Join class names; later Tailwind classes win over earlier conflicting ones.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format a date-only ISO string such as "2026-02-20".
// These parse as UTC midnight, so they must also be formatted in UTC. Otherwise visitors
// west of UTC see the previous day and the server and browser render different text.
export function formatDate(date: string, options?: Intl.DateTimeFormatOptions): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
    timeZone: 'UTC',
  })
}

// "Tools we use most" -> "tools-we-use-most"
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
