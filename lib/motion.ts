/**
 * Shared animation constants and variants for the MiraiTech site.
 * Single source of truth — no more duplicated ease curves.
 */

/* ─── Timing curves ─────────────────────────────────────────── */

/** Primary easing — smooth deceleration with slight overshoot */
export const ease = [0.21, 0.47, 0.32, 0.98] as const

/** Snappy easing — faster settle, good for micro-interactions */
export const easeSnap = [0.25, 0.1, 0.25, 1.0] as const

/** Dramatic easing — strong deceleration for hero elements */
export const easeDramatic = [0.16, 1, 0.3, 1] as const

/* ─── Reusable variants ─────────────────────────────────────── */

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease },
  }),
} as const

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay, ease },
  }),
} as const

export const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: easeDramatic },
  }),
} as const

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay, ease },
  }),
} as const

/* ─── Stagger orchestration ─────────────────────────────────── */

export const staggerContainer = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
})

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
} as const

/* ─── Text reveal — character/word split ────────────────────── */

export const textRevealContainer = (stagger = 0.03) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger },
  },
})

export const textRevealChar = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.4, ease },
  },
} as const

/* ─── Counter animation helper ──────────────────────────────── */

export const counterSpring = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 30,
  mass: 1,
}

/* ─── Line draw ─────────────────────────────────────────────── */

export const drawLine = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.2, delay, ease },
      opacity: { duration: 0.3, delay },
    },
  }),
} as const

/* ─── Viewport defaults ─────────────────────────────────────── */

export const viewport = {
  once: true,
  margin: '-80px' as const,
}
