import React from 'react'

import type { StatsBlock as StatsBlockProps } from '@/payload-types'

const accentTextClasses = ['text-brand-violet', 'text-brand-lime', 'text-brand-coral', 'text-brand-cyan']

export const StatsBlock: React.FC<StatsBlockProps> = ({ heading, stats }) => {
  return (
    <div className="container my-16">
      {heading && (
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-center mb-12">
          {heading}
        </h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {(stats || []).map((stat, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-2">
            <span className={`text-4xl md:text-5xl font-bold ${accentTextClasses[i % accentTextClasses.length]}`}>
              {stat.value}
            </span>
            <span className="text-sm uppercase tracking-wide text-muted-foreground">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
