/**
 * FlowLines — Animated SVG curved paths that slowly draw across a section.
 *
 * Fully SSR-safe: all path data is hardcoded, animation is pure CSS
 * (stroke-dashoffset). No JS values, no Math.random, no client branching.
 *
 * Theme-aware: wrapper div uses opacity via --bg-glow-multiplier CSS variable.
 */

import { cn } from '@/lib/utils'

interface FlowLinesProps {
  /** Color accent: 'warm' | 'blue' | 'mixed' */
  accent?: 'warm' | 'blue' | 'mixed'
  /** Overall opacity */
  opacity?: number
  className?: string
}

const accentColors = {
  warm: 'rgb(var(--color-glow-warm))',
  blue: 'rgb(var(--color-glow-blue))',
  violet: 'rgb(var(--color-glow-violet))',
} as const

export function FlowLines({
  accent = 'mixed',
  opacity = 0.35,
  className,
}: FlowLinesProps) {
  const line1Color = accent === 'blue' ? accentColors.blue : accentColors.warm
  const line2Color = accent === 'warm' ? accentColors.warm : accentColors.blue
  const line3Color = accentColors.violet

  return (
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      style={{ opacity: 'var(--bg-glow-multiplier, 1)' } as React.CSSProperties}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Primary curve — sweeps from left to right with a gentle arc */}
        <path
          d="M -100 400 C 200 350, 400 150, 600 200 S 1000 350, 1300 180"
          className="flow-line flow-line-1"
          stroke={line1Color}
          strokeWidth="1.5"
          strokeOpacity={opacity}
        />

        {/* Secondary curve — counter-flowing, slightly offset */}
        <path
          d="M 1300 450 C 1000 380, 800 250, 550 320 S 150 180, -100 280"
          className="flow-line flow-line-2"
          stroke={line2Color}
          strokeWidth="1"
          strokeOpacity={opacity * 0.7}
        />

        {/* Tertiary curve — subtle, deeper in the composition */}
        <path
          d="M -50 150 C 250 200, 450 400, 700 350 S 950 150, 1250 250"
          className="flow-line flow-line-3"
          stroke={line3Color}
          strokeWidth="0.8"
          strokeOpacity={opacity * 0.5}
        />
      </svg>
    </div>
  )
}
