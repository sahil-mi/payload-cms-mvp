import React from 'react'

import type { LogoCloudBlock as LogoCloudBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'

export const LogoCloudBlock: React.FC<LogoCloudBlockProps> = ({ heading, logos }) => {
  return (
    <div className="container my-16">
      {heading && (
        <p className="text-sm uppercase text-muted-foreground text-center mb-8">{heading}</p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {(logos || []).map((item, i) => (
          <div key={i} className="h-8 flex items-center">
            <Media
              resource={item.logo}
              imgClassName="h-8 w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
