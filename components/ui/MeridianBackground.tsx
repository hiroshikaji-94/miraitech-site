'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Meridian — A living coordinate background system.
 *
 * Three layers:
 * 1. Slow-moving gradient orbs that create depth and atmosphere
 * 2. Fine coordinate lines that shift with scroll
 * 3. Subtle radial vignette for spatial grounding
 *
 * All visual styles live in CSS classes (globals.css) to prevent
 * hydration mismatches from inline style decomposition. Parallax
 * tracks viewport scroll (no target ref) to avoid the framer-motion
 * "non-static position" warning.
 */

interface MeridianBackgroundProps {
  /** Intensity of gradient orbs: 'subtle' | 'medium' | 'strong' */
  intensity?: 'subtle' | 'medium' | 'strong'
  /** Show coordinate lines */
  lines?: boolean
  /** Enable scroll-linked parallax */
  parallax?: boolean
}

const opacityMap = {
  subtle: { orb: 0.06, line: 0.03 },
  medium: { orb: 0.1, line: 0.04 },
  strong: { orb: 0.25, line: 0.06 },
} as const

export function MeridianBackground({
  intensity = 'medium',
  lines = true,
  parallax = true,
}: MeridianBackgroundProps) {
  // Track viewport scroll — no target ref needed, avoids the
  // "non-static position" warning entirely.
  const { scrollYProgress } = useScroll()

  const orbY = useTransform(scrollYProgress, [0, 1], [0, parallax ? 80 : 0])
  const lineY = useTransform(scrollYProgress, [0, 1], [0, parallax ? -30 : 0])

  const o = opacityMap[intensity]

  // Line grid: solid-color gradients with element-level opacity.
  // Cannot use rgb(var() / alpha) — browsers reject it.
  const lineGridStyle = {
    backgroundImage: [
      `linear-gradient(to right, rgb(var(--color-border)) 1px, transparent 1px)`,
      `linear-gradient(to right, rgb(var(--color-border)) 1px, transparent 1px)`,
      `linear-gradient(to bottom, rgb(var(--color-border)) 1px, transparent 1px)`,
      `linear-gradient(to bottom, rgb(var(--color-border)) 1px, transparent 1px)`,
    ].join(', '),
    opacity: o.line,
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Layer 1: Gradient orbs — slow CSS animation for organic movement */}
      <motion.div className="absolute inset-0" style={{ y: orbY }}>
        {/* Primary warm orb — upper left */}
        <div
          className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full animate-meridian-drift meridian-orb-warm"
          style={{ '--meridian-orb-opacity': String(o.orb) } as React.CSSProperties}
        />
        {/* Secondary blue orb — lower right */}
        <div
          className="absolute -bottom-[15%] -right-[10%] w-[50vw] h-[50vw] rounded-full animate-meridian-drift-reverse meridian-orb-blue"
          style={{ '--meridian-orb-opacity': String(o.orb * 0.7) } as React.CSSProperties}
        />
        {/* Tertiary accent — center, very subtle */}
        <div
          className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full animate-meridian-pulse meridian-orb-violet"
          style={{ '--meridian-orb-opacity': String(o.orb * 0.3) } as React.CSSProperties}
        />
      </motion.div>

      {/* Layer 2: Coordinate lines — fine meridian grid */}
      {lines && (
        <motion.div className="absolute inset-0" style={{ y: lineY }}>
          <div
            className="absolute inset-0 meridian-lines"
            style={lineGridStyle}
          />
          {/* Diagonal accent line */}
          <div
            className="absolute inset-0 meridian-diagonal"
            style={{ '--meridian-line-opacity': String(o.line * 0.8) } as React.CSSProperties}
          />
        </motion.div>
      )}

      {/* Layer 3: Vignette — spatial grounding */}
      <div className="absolute inset-0 meridian-vignette" />
    </div>
  )
}
