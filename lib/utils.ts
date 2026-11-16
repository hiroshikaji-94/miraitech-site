import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes safely — handles conflicts and conditional classes. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format an ISO date string ("2026-02-20") to a readable format.
 *
 * Date-only ISO strings parse as UTC midnight, so formatting must also use
 * UTC. Otherwise visitors west of UTC see the previous day, and the server
 * (UTC) and browser render different text, causing a hydration mismatch.
 */
export function formatDate(date: string, options?: Intl.DateTimeFormatOptions): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
    timeZone: 'UTC',
  })
}

/** Estimate reading time in minutes from raw text content. */
export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

/** Slugify a string — used for dynamic routes. */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
