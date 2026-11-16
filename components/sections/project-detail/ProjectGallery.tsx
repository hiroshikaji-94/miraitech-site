'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { StaggerContainer, StaggerItem } from '@/components/ui/FadeIn'

interface ProjectGalleryProps {
  images: string[]
  title:  string
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  if (!images.length) return null

  const openLightbox  = (i: number) => setLightbox(i)
  const closeLightbox = () => setLightbox(null)
  const goPrev = () => setLightbox((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null))
  const goNext = () => setLightbox((prev) => (prev !== null ? (prev + 1) % images.length : null))

  return (
    <>
      <section className="py-16 md:py-20 border-y border-border/8 relative overflow-hidden">
        {/* Subtle glow */}
        <div className="pointer-events-none absolute inset-0 bg-glow-violet opacity-20" />

        <Container className="relative z-10">
          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            stagger={0.1}
          >
            {images.map((src, i) => (
              <StaggerItem key={i}>
                <button
                  onClick={() => openLightbox(i)}
                  className={cn(
                    'group relative block w-full aspect-[16/10] rounded-xl overflow-hidden',
                    'bg-surface-high border border-border/8',
                    'hover:border-accent-violet/20 transition-all duration-300',
                    'cursor-zoom-in',
                  )}
                  aria-label={`View screenshot ${i + 1} of ${images.length}`}
                >
                  <Image
                    src={src}
                    alt={`${title} — screenshot ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── Lightbox ──────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-xl"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-surface border border-border/20 text-foreground-2 hover:text-foreground transition-colors"
              aria-label="Close lightbox"
            >
              <X size={18} />
            </button>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); goPrev() }}
                  className="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-surface border border-border/20 text-foreground-2 hover:text-foreground transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goNext() }}
                  className="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-surface border border-border/20 text-foreground-2 hover:text-foreground transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-[90vw] max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightbox]}
                alt={`${title} — screenshot ${lightbox + 1}`}
                fill
                className="object-contain rounded-xl"
                sizes="90vw"
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-foreground-3 bg-surface/80 backdrop-blur-sm px-3 py-1 rounded-full">
              {lightbox + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
