'use client'

import { motion } from 'framer-motion'
import { ease, viewport as vpDefaults } from '@/lib/motion'

/* ─── Direction offsets for entrance animations ──────────────── */

const offsets = {
  up:    { y: 24 },
  down:  { y: -24 },
  left:  { x: 24 },
  right: { x: -24 },
  none:  {},
} as const

type Direction = keyof typeof offsets

/* ─── FadeIn — single element entrance ──────────────────────── */

interface FadeInProps {
  children:   React.ReactNode
  className?: string
  delay?:     number
  duration?:  number
  direction?: Direction
  once?:      boolean
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  once = true,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: vpDefaults.margin }}
      transition={{ duration, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Stagger container + item ──────────────────────────────── */

interface StaggerContainerProps {
  children:   React.ReactNode
  className?: string
  stagger?:   number
  delay?:     number
  once?:      boolean
}

export function StaggerContainer({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  once = true,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: vpDefaults.margin }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children:   React.ReactNode
  className?: string
  direction?: Direction
}

export function StaggerItem({
  children,
  className,
  direction = 'up',
}: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden:  { opacity: 0, ...offsets[direction] },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.5, ease },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
