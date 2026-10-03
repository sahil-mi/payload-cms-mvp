import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { s3Storage } from '@payloadcms/storage-s3'
import { Plugin } from 'payload'
import { revalidateRedirects, revalidateRedirectsOnDelete } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post, Project } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { getDocPath, type SeoCollection } from '@/utilities/getDocPath'

const generateTitle: GenerateTitle<Post | Page | Project> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Northbeam Studio` : 'Northbeam Studio'
}

const generateURL: GenerateURL<Post | Page | Project> = ({ collectionSlug, doc }) => {
  const path = getDocPath(collectionSlug as SeoCollection, doc?.slug)

  return `${getServerSideURL()}${path === '/' ? '' : path}`
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts', 'projects'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return [
          ...defaultFields.map((field) => {
            if ('name' in field && field.name === 'from') {
              return {
                ...field,
                admin: {
                  description:
                    'The old path, e.g. /old-page. For a page, it is easier to add old URLs in the page’s “URL & Redirects” tab.',
                },
              }
            }
            return field
          }),
          {
            name: 'managedKey',
            type: 'text',
            index: true,
            admin: {
              position: 'sidebar',
              readOnly: true,
              description:
                'Set when this redirect comes from a page’s “URL & Redirects” tab. Change it there, not here.',
            },
          },
        ]
      },
      hooks: {
        afterChange: [revalidateRedirects],
        afterDelete: [revalidateRedirectsOnDelete],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['pages', 'categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  // Supabase Storage exposes an S3-compatible API, so uploads go through the
  // standard S3 adapter rather than Payload's local filesystem storage —
  // required since Vercel's serverless filesystem is ephemeral.
  s3Storage({
    collections: {
      media: true,
    },
    bucket: process.env.SUPABASE_S3_BUCKET,
    config: {
      endpoint: process.env.SUPABASE_S3_ENDPOINT,
      region: process.env.SUPABASE_S3_REGION,
      credentials: {
        accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY,
      },
      forcePathStyle: true,
    },
  }),
]
