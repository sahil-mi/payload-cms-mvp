import React from 'react'

import type { SpacerBlock as SpacerBlockProps } from '@/payload-types'

const sizeClasses: Record<string, string> = {
  sm: 'h-8',
  md: 'h-16',
  lg: 'h-24',
  xl: 'h-40',
}

export const SpacerBlock: React.FC<SpacerBlockProps> = ({ size }) => {
  return <div className={sizeClasses[size || 'md']} />
}
