import type { ImageTextBlock as ImageTextBlockProps } from '@/payload-types'

import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

export const ImageTextBlock: React.FC<ImageTextBlockProps> = (props) => {
  const { media, mediaPosition, eyebrow, richText, enableLink, link } = props

  const imageEl = (
    <div className="relative aspect-4/5 lg:aspect-square">
      <Media
        resource={media}
        imgClassName="rounded-card object-cover w-full h-full"
        fill
      />
    </div>
  )

  const textEl = (
    <div className="flex flex-col gap-6">
      {eyebrow && (
        <span className="text-sm font-medium uppercase tracking-wide text-brand-violet">
          {eyebrow}
        </span>
      )}
      {richText && <RichText data={richText} enableGutter={false} />}
      {enableLink && link && <CMSLink {...link} />}
    </div>
  )

  return (
    <div className="container my-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {mediaPosition === 'left' ? (
          <>
            {imageEl}
            {textEl}
          </>
        ) : (
          <>
            {textEl}
            {imageEl}
          </>
        )}
      </div>
    </div>
  )
}
