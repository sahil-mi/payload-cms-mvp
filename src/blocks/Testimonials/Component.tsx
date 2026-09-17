import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'

import React from 'react'
import { Quote } from 'lucide-react'
import { Media } from '@/components/Media'

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = (props) => {
  const { heading, testimonials } = props

  return (
    <div className="container my-16">
      {heading && (
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-center mb-12">
          {heading}
        </h2>
      )}
      {testimonials && testimonials.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => {
            const { quote, name, role, avatar } = testimonial

            return (
              <div
                className="rounded-card border border-border bg-card p-8 flex flex-col gap-6"
                key={index}
              >
                <Quote className="text-brand-coral/40 size-8" />
                <p className="text-lg leading-relaxed">{quote}</p>
                <div className="flex items-center gap-3 mt-auto">
                  {avatar && (
                    <Media
                      resource={avatar}
                      imgClassName="size-10 rounded-full object-cover"
                      className="size-10 shrink-0"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="font-semibold">{name}</span>
                    {role && <span className="text-sm text-muted-foreground">{role}</span>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
