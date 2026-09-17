import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Project } from '@/payload-types'

import { Media } from '@/components/Media'
import { ProjectHero } from '@/heros/ProjectHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const projects = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = projects.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Project({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/projects/' + decodedSlug
  const project = await queryProjectBySlug({ slug: decodedSlug })

  if (!project) return <PayloadRedirects url={url} />

  const hasStats = project.stats && project.stats.length > 0
  const hasGallery = project.gallery && project.gallery.length > 0

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <ProjectHero project={project} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          {hasStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-[48rem] mx-auto mb-12">
              {project.stats?.map((stat, index) => (
                <div className="flex flex-col items-center text-center gap-1" key={index}>
                  <span className="text-4xl md:text-5xl font-bold text-brand-violet">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground uppercase">{stat.label}</span>
                </div>
              ))}
            </div>
          )}

          {project.content && (
            <RichText className="max-w-[48rem] mx-auto" data={project.content} enableGutter={false} />
          )}

          {hasGallery && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
              {project.gallery?.map((item, index) => {
                const { image } = item

                if (!image || typeof image === 'string') return null

                return (
                  <Media
                    key={index}
                    resource={image}
                    imgClassName="rounded-card transition-transform duration-300 hover:scale-[1.02]"
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const project = await queryProjectBySlug({ slug: decodedSlug })

  return generateMeta({ doc: project })
}

const queryProjectBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
