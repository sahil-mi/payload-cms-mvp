import type { GalleryBlock as GalleryBlockProps } from '@/payload-types'

import React from 'react'
import { Lightbox } from '@/blocks/Gallery/Lightbox'

export const GalleryBlock: React.FC<GalleryBlockProps> = (props) => {
  const { heading, images } = props

  return (
    <div className="container my-16">
      {heading && (
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-8">
          {heading}
        </h2>
      )}
      {images && images.length > 0 && <Lightbox images={images} />}
    </div>
  )
}
