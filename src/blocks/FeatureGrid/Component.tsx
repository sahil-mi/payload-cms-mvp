import React from 'react'
import { Gauge, Layers, Palette, Rocket, Shield, Sparkles, Target, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import type { FeatureGridBlock as FeatureGridBlockProps } from '@/payload-types'

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Zap,
  Shield,
  Layers,
  Rocket,
  Target,
  Gauge,
  Palette,
}

const accentClasses = [
  'bg-brand-violet/10 text-brand-violet',
  'bg-brand-lime/10 text-brand-lime',
  'bg-brand-coral/10 text-brand-coral',
  'bg-brand-cyan/10 text-brand-cyan',
]

export const FeatureGridBlock: React.FC<FeatureGridBlockProps> = ({
  description,
  eyebrow,
  features,
  heading,
}) => {
  return (
    <div className="container my-16">
      {(eyebrow || heading || description) && (
        <div className="max-w-[48rem] mx-auto text-center mb-12 flex flex-col gap-4">
          {eyebrow && (
            <span className="text-sm font-medium uppercase tracking-wide text-brand-violet">
              {eyebrow}
            </span>
          )}
          {heading && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              {heading}
            </h2>
          )}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {(features || []).map((feature, i) => {
          const Icon = iconMap[feature.icon]
          return (
            <div
              key={i}
              className="rounded-card border border-border bg-card p-6 flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-1"
            >
              <div
                className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${accentClasses[i % accentClasses.length]}`}
              >
                {Icon && <Icon className="h-5 w-5" />}
              </div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
