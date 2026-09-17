import type { Project, ProjectGridBlock as ProjectGridBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export const ProjectGridBlock: React.FC<
  ProjectGridBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, introContent, limit: limitFromProps, populateBy, selectedDocs, services } = props

  const limit = limitFromProps || 6

  let projects: Project[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedServices = services?.map((service) => {
      if (typeof service === 'object') return service.id
      else return service
    })

    const fetchedProjects = await payload.find({
      collection: 'projects',
      depth: 1,
      limit,
      ...(flattenedServices && flattenedServices.length > 0
        ? {
            where: {
              services: {
                in: flattenedServices,
              },
            },
          }
        : {}),
    })

    projects = fetchedProjects.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedProjects = selectedDocs.map((project) => {
        if (typeof project.value === 'object') return project.value
      }) as Project[]

      projects = filteredSelectedProjects
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      {projects && projects.length > 0 && (
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Link
                className="group rounded-card overflow-hidden border border-border bg-card transition-transform duration-300 hover:-translate-y-1"
                href={`/projects/${project.slug}`}
                key={index}
              >
                <Media
                  resource={project.coverImage}
                  imgClassName="aspect-4/3 object-cover w-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-6">
                  {project.client && (
                    <span className="block text-sm uppercase tracking-wide text-muted-foreground mb-1">
                      {project.client}
                    </span>
                  )}
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
