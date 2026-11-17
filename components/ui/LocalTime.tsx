'use client'

import { useEffect, useState } from 'react'
import { SITE } from '@/lib/site'

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: SITE.location.timeZone,
  hour:     '2-digit',
  minute:   '2-digit',
  hour12:   false,
})

// Current time in Tokyo. Renders a placeholder on the server, then updates every 15 seconds.
export function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()))
    tick()
    const id = setInterval(tick, 15_000)
    return () => clearInterval(id)
  }, [])

  return <span className={className}>{time ?? '--:--'}</span>
}
