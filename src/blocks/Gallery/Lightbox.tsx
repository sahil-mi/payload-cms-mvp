'use client'

import type { GalleryBlock as GalleryBlockProps } from '@/payload-types'

import React, { useEffect, useState } from 'react'
import { Media } from '@/components/Media'

type LightboxProps = {
  images: NonNullable<GalleryBlockProps['images']>
}

export const Lightbox: React.FC<LightboxProps> = ({ images }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    if (openIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenIndex(null)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [openIndex])

  const active = openIndex !== null ? images[openIndex] : undefined

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((item, index) => (
          <button
            className="block w-full"
            key={index}
            onClick={() => setOpenIndex(index)}
            type="button"
          >
            <Media
              resource={item.image}
              imgClassName="rounded-card object-cover w-full aspect-square hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8 animate-in fade-in duration-200"
          onClick={() => setOpenIndex(null)}
        >
          <div className="flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            <Media
              resource={active.image}
              imgClassName="max-h-[85vh] w-auto object-contain rounded-card"
            />
            {active.caption && <p className="text-white text-center">{active.caption}</p>}
          </div>
        </div>
      )}
    </>
  )
}
