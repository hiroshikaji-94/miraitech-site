'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

interface ProjectGalleryProps {
  images: string[]
  title:  string
}

// Screens shown at column width. Clicking one opens it larger in a native <dialog>.
export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState(0)

  if (images.length === 0) return null

  const open = (i: number) => {
    setIndex(i)
    dialog.current?.showModal()
  }
  const step = (delta: number) => setIndex((i) => (i + delta + images.length) % images.length)

  return (
    <>
      <div className="grid gap-5">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => open(i)}
            aria-label={`Enlarge screen ${i + 1} of ${images.length}`}
            className="card card-hover group block w-full cursor-zoom-in p-2"
          >
            <span className="relative block aspect-[16/9] overflow-hidden rounded-[0.875rem] bg-surface-high">
              <Image
                src={src}
                alt={`${title}, screen ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.015]"
              />
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialog}
        aria-label={`${title} screens`}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close()
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
        className="m-auto w-[min(92vw,1600px)] bg-transparent p-0 text-white backdrop:bg-black/85"
      >
        <Image
          src={images[index]}
          alt={`${title}, screen ${index + 1}`}
          width={1600}
          height={900}
          sizes="92vw"
          className="h-auto max-h-[82vh] w-full rounded-xl object-contain"
        />
        <div className="mt-3 flex items-center justify-between text-sm text-white/75">
          <span className="font-mono text-xs tabular-nums">
            {index + 1} / {images.length}
          </span>
          <div className="flex items-center gap-5">
            {images.length > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} className="hover:text-white">
                  Previous
                </button>
                <button type="button" onClick={() => step(1)} className="hover:text-white">
                  Next
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="Close"
              className="flex h-8 w-8 items-center justify-center hover:text-white"
            >
              <X size={18} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
