/**
 * AmbientGlow — A lightweight atmospheric background with 1-2 orbs.
 *
 * Lighter than MeridianBackground: no scroll tracking, no coordinate
 * lines, no vignette. Just soft drifting color to give a section depth.
 *
 * SSR-safe: all visual styles are CSS classes + CSS custom properties.
 * No inline shorthand styles, no Math.random, no browser-only APIs.
 */

import { cn } from '@/lib/utils'

type GlowPreset =
  | 'warm'          // single warm orb, bottom-right
  | 'blue'          // single blue orb, top-left
  | 'warm-blue'     // warm left, blue right — dual column feel
  | 'blue-warm'     // blue left, warm right
  | 'center-violet' // subtle violet center

type GlowIntensity = 'whisper' | 'subtle' | 'gentle' | 'medium'

const intensityMap: Record<GlowIntensity, number> = {
  whisper: 0.12,
  subtle:  0.18,
  gentle:  0.24,
  medium:  0.32,
}

interface AmbientGlowProps {
  preset?: GlowPreset
  /** Named intensity level (preferred) */
  intensity?: GlowIntensity
  /** Direct opacity override — takes precedence over intensity */
  opacity?: number
  className?: string
}

/* Preset definitions: position classes + orb type + animation */
const presets: Record<GlowPreset, Array<{
  position: string
  size: string
  orb: string
  animation: string
}>> = {
  warm: [
    {
      position: '-bottom-[20%] -right-[10%]',
      size: 'w-[50vw] h-[50vw]',
      orb: 'ambient-orb-warm',
      animation: 'animate-ambient-drift',
    },
  ],
  blue: [
    {
      position: '-top-[20%] -left-[10%]',
      size: 'w-[50vw] h-[50vw]',
      orb: 'ambient-orb-blue',
      animation: 'animate-ambient-drift',
    },
  ],
  'warm-blue': [
    {
      position: '-top-[15%] -left-[10%]',
      size: 'w-[45vw] h-[45vw]',
      orb: 'ambient-orb-warm',
      animation: 'animate-ambient-drift',
    },
    {
      position: '-bottom-[15%] -right-[10%]',
      size: 'w-[40vw] h-[40vw]',
      orb: 'ambient-orb-blue',
      animation: 'animate-ambient-drift-reverse',
    },
  ],
  'blue-warm': [
    {
      position: '-top-[15%] -left-[10%]',
      size: 'w-[45vw] h-[45vw]',
      orb: 'ambient-orb-blue',
      animation: 'animate-ambient-drift',
    },
    {
      position: '-bottom-[15%] -right-[10%]',
      size: 'w-[40vw] h-[40vw]',
      orb: 'ambient-orb-warm',
      animation: 'animate-ambient-drift-reverse',
    },
  ],
  'center-violet': [
    {
      position: 'top-[30%] left-[25%]',
      size: 'w-[50vw] h-[50vw]',
      orb: 'ambient-orb-violet',
      animation: 'animate-ambient-drift',
    },
  ],
}

export function AmbientGlow({
  preset = 'warm',
  intensity,
  opacity,
  className,
}: AmbientGlowProps) {
  const resolvedOpacity = opacity ?? (intensity ? intensityMap[intensity] : 0.10)
  const orbs = presets[preset]

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={cn(
            'ambient-orb',
            orb.position,
            orb.size,
            orb.orb,
            orb.animation,
          )}
          style={{ '--ambient-opacity': String(resolvedOpacity) } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
