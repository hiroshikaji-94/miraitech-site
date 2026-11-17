'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface Heading {
  id:    string
  text:  string
  level: number
}

// Distance from the top of the viewport at which a heading counts as "current"
const READING_LINE = 140

// "On this page" list for wide screens. Highlights the section being read.
export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (headings.length === 0) return
    let frame = 0

    const update = () => {
      frame = 0
      let current = ''
      for (const { id } of headings) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= READING_LINE) current = id
      }
      setActiveId(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav aria-label="On this page" className="sticky top-28">
      <p className="eyebrow">On this page</p>
      <ul className="mt-4 space-y-0.5 border-l border-border/10">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={activeId === id ? 'location' : undefined}
              className={cn(
                '-ml-px block border-l py-1.5 text-[13px] leading-snug transition-colors duration-150',
                level === 3 ? 'pl-6' : 'pl-4',
                activeId === id
                  ? 'border-accent text-foreground'
                  : 'border-transparent text-foreground-3 hover:text-foreground',
              )}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
