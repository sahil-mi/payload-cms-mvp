import React from 'react'
import { Check } from 'lucide-react'

import type { PricingBlock as PricingBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

export const PricingBlock: React.FC<PricingBlockProps> = ({ heading, tiers }) => {
  return (
    <div className="container my-16">
      {heading && (
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-center mb-12">
          {heading}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {(tiers || []).map((tier, i) => (
          <div
            key={i}
            className={cn(
              'rounded-card border p-8 flex flex-col gap-6',
              tier.featured ? 'border-brand-violet bg-brand-violet/5' : 'border-border bg-card',
            )}
          >
            {tier.featured && (
              <span className="self-start bg-brand-violet text-white text-xs px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-xl">{tier.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.interval && (
                  <span className="text-sm text-muted-foreground">{tier.interval}</span>
                )}
              </div>
              {tier.description && (
                <p className="text-muted-foreground">{tier.description}</p>
              )}
            </div>
            {tier.features && tier.features.length > 0 && (
              <ul className="flex flex-col gap-2">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-brand-violet shrink-0" />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            )}
            {tier.link && (
              <CMSLink
                {...tier.link}
                className="mt-auto"
                appearance={tier.featured ? 'default' : 'outline'}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
