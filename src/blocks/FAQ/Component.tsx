'use client'

import type { FAQBlock as FAQBlockProps } from '@/payload-types'

import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/utilities/ui'

export const FAQBlock: React.FC<FAQBlockProps> = (props) => {
  const { heading, items } = props
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="container my-16">
      {heading && (
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-center mb-12">
          {heading}
        </h2>
      )}
      {items && items.length > 0 && (
        <div className="max-w-3xl mx-auto">
          {items.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <div className="border-b border-border" key={index}>
                <button
                  className="flex w-full items-center justify-between py-6 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  type="button"
                >
                  <span className="font-medium pr-8">{item.question}</span>
                  <Plus
                    className={cn(
                      'size-5 shrink-0 transition-transform duration-300',
                      isOpen && 'rotate-45',
                    )}
                  />
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 text-muted-foreground leading-relaxed">{item.answer}</p>
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
