import React from 'react'

import type { Project } from '@/payload-types'

import { Media } from '@/components/Media'

export const ProjectHero: React.FC<{
  project: Project
}> = ({ project }) => {
  const { client, coverImage, services, title, year } = project

  return (
    <div className="relative -mt-[10.4rem] flex items-end">
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="uppercase text-sm mb-6">
            {services?.map((service, index) => {
              if (typeof service === 'object' && service !== null) {
                const { title: serviceTitle } = service

                const titleToUse = serviceTitle || 'Untitled category'

                const isLast = index === services.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            {client && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Client</p>

                <p>{client}</p>
              </div>
            )}
            {year && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Year</p>

                <p>{year}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {coverImage && typeof coverImage !== 'string' && (
          <Media fill priority imgClassName="-z-10 object-cover" resource={coverImage} />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-linear-to-t from-black to-transparent" />
      </div>
    </div>
  )
}
