import type { CollectionSlug, File, Payload, PayloadRequest } from 'payload'
import type { Author, Category, Media, Page } from '@/payload-types'

import { about } from './about'
import { authorSeeds } from './authors'
import { categoryTitles, slugify, type CategoryTitle } from './categories'
import { contact as contactPageData } from './contact-page'
import { contactForm as contactFormData } from './contact-form'
import { home } from './home'
import { clientLogoSvgs, studioLogoSvg } from './logos'
import { mediaLibrary } from './media-library'
import { buildPosts } from './posts'
import { buildProjects } from './projects'
import { services } from './services'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'projects',
  'authors',
  'forms',
  'form-submissions',
  'search',
]

// Only header/footer need their `navItems` cleared before reseeding — siteSettings has
// no array fields to clear and is fully overwritten by `updateGlobal` at the end anyway.
// Narrowly typed (rather than `GlobalSlug[]`) so `data` below type-checks against the
// specific shape of each of these two globals.
const globals: ('header' | 'footer')[] = ['header', 'footer']

const DEMO_ADMIN_EMAIL = 'admin@northbeamstudio.com'

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  payload.logger.info(`— Clearing collections and globals...`)

  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  // Sequential, not `Promise.all` — concurrent deletes across collections that reference
  // each other via foreign keys (e.g. pages.hero_media_id -> media) can deadlock in Postgres.
  for (const collection of collections) {
    await payload.db.deleteMany({ collection, req, where: {} })
  }

  for (const collection of collections) {
    if (payload.collections[collection].config.versions) {
      await payload.db.deleteVersions({ collection, req, where: {} })
    }
  }

  payload.logger.info(`— Seeding demo admin user...`)

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: DEMO_ADMIN_EMAIL,
      },
    },
  })

  await payload.create({
    collection: 'users',
    data: {
      name: 'Demo Admin',
      email: DEMO_ADMIN_EMAIL,
      password: 'password',
      roles: ['admin'],
    },
  })

  payload.logger.info(`— Seeding media...`)

  const mediaDocsList = await Promise.all(
    mediaLibrary.map(async (descriptor) => {
      const file = await fetchFileByURL(descriptor.url)
      const doc = await payload.create({
        collection: 'media',
        data: { alt: descriptor.alt },
        file,
      })
      return [descriptor.key, doc] as const
    }),
  )
  const media: Record<string, Media> = Object.fromEntries(mediaDocsList)

  const logoDocs = await Promise.all(
    clientLogoSvgs.map(({ name, buffer }) =>
      payload.create({
        collection: 'media',
        data: { alt: `${name} logo` },
        file: svgFile(`${slugify(name)}-logo.svg`, buffer),
      }),
    ),
  )

  const studioLogoDoc = await payload.create({
    collection: 'media',
    data: { alt: 'Northbeam Studio wordmark' },
    file: svgFile('northbeam-studio-logo.svg', studioLogoSvg()),
  })

  payload.logger.info(`— Seeding categories...`)

  const categoryEntries = await Promise.all(
    categoryTitles.map(async (title) => {
      const doc = await payload.create({
        collection: 'categories',
        data: {
          title,
          slug: slugify(title),
        },
      })
      return [title, doc] as const
    }),
  )
  const categories = Object.fromEntries(categoryEntries) as Record<CategoryTitle, Category>

  payload.logger.info(`— Seeding authors...`)

  const authorEntries = await Promise.all(
    authorSeeds.map(async (seedAuthor) => {
      const doc = await payload.create({
        collection: 'authors',
        data: seedAuthor.data(media[`avatar${capitalize(seedAuthor.key)}`]),
      })
      return [seedAuthor.key, doc] as const
    }),
  )
  const authors = Object.fromEntries(authorEntries) as Record<
    'mara' | 'theo' | 'priya' | 'owen',
    Author
  >

  payload.logger.info(`— Seeding projects...`)

  const projectsData = buildProjects({ categories, media })
  await Promise.all(
    projectsData.map((data) =>
      payload.create({
        collection: 'projects',
        depth: 0,
        context: { disableRevalidate: true },
        data,
      }),
    ),
  )

  payload.logger.info(`— Seeding posts...`)

  const postsData = buildPosts({ authors, categories, media })

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const postDocs = []
  for (const data of postsData) {
    const doc = await payload.create({
      collection: 'posts',
      depth: 0,
      context: { disableRevalidate: true },
      data,
    })
    postDocs.push(doc)
  }
  const [rebrandsPost, fintechTrustPost, designSystemsPost, aiFeaturesPost, motionPost, retainerPost] =
    postDocs

  // Sequential, not `Promise.all` — concurrent updates that cross-reference
  // each other's rows in the same join table can deadlock in Postgres.
  const relatedPostsUpdates = [
    { id: rebrandsPost.id, relatedPosts: [retainerPost.id, fintechTrustPost.id] },
    { id: fintechTrustPost.id, relatedPosts: [rebrandsPost.id, designSystemsPost.id] },
    { id: designSystemsPost.id, relatedPosts: [aiFeaturesPost.id, fintechTrustPost.id] },
    { id: aiFeaturesPost.id, relatedPosts: [designSystemsPost.id, retainerPost.id] },
    { id: motionPost.id, relatedPosts: [designSystemsPost.id, rebrandsPost.id] },
    { id: retainerPost.id, relatedPosts: [rebrandsPost.id, aiFeaturesPost.id] },
  ]

  for (const { id, relatedPosts } of relatedPostsUpdates) {
    await payload.update({
      id,
      collection: 'posts',
      context: { disableRevalidate: true },
      data: { relatedPosts },
    })
  }

  payload.logger.info(`— Seeding contact form...`)

  const contactFormDoc = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  payload.logger.info(`— Seeding pages...`)

  const contactPage: Page = await payload.create({
    collection: 'pages',
    depth: 0,
    context: { disableRevalidate: true },
    data: contactPageData({ contactForm: contactFormDoc }),
  })

  const [aboutPage, servicesPage] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      context: { disableRevalidate: true },
      data: about({ contactPage, media }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      context: { disableRevalidate: true },
      data: services({ contactPage }),
    }),
  ])

  await payload.create({
    collection: 'pages',
    depth: 0,
    context: { disableRevalidate: true },
    data: home({ contactPage, logoDocs, media }),
  })

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      context: { disableRevalidate: true },
      data: {
        navItems: [
          {
            link: { type: 'custom', label: 'Work', url: '/projects' },
          },
          {
            link: { type: 'custom', label: 'Insights', url: '/posts' },
          },
          {
            link: {
              type: 'reference',
              label: 'Services',
              reference: { relationTo: 'pages', value: servicesPage.id },
            },
          },
          {
            link: {
              type: 'reference',
              label: 'About',
              reference: { relationTo: 'pages', value: aboutPage.id },
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Contact',
              reference: { relationTo: 'pages', value: contactPage.id },
            },
          },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      context: { disableRevalidate: true },
      data: {
        navItems: [
          {
            link: { type: 'custom', label: 'Work', url: '/projects' },
          },
          {
            link: { type: 'custom', label: 'Insights', url: '/posts' },
          },
          {
            link: {
              type: 'reference',
              label: 'About',
              reference: { relationTo: 'pages', value: aboutPage.id },
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Contact',
              reference: { relationTo: 'pages', value: contactPage.id },
            },
          },
          {
            link: { type: 'custom', label: 'Admin', url: '/admin' },
          },
        ],
        socialLinks: [
          { platform: 'Instagram', url: '#' },
          { platform: 'LinkedIn', url: '#' },
          { platform: 'X', url: '#' },
          { platform: 'Dribbble', url: '#' },
        ],
        copyrightText: '© 2026 Northbeam Studio. All rights reserved.',
      },
    }),
    payload.updateGlobal({
      slug: 'siteSettings',
      context: { disableRevalidate: true },
      data: {
        siteName: 'Northbeam Studio',
        siteDescription:
          'A design and engineering studio building brand systems and digital products for ambitious companies.',
        logo: studioLogoDoc.id,
        defaultOgImage: media.homeHero.id,
      },
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: 'image/jpeg',
    size: data.byteLength,
  }
}

function svgFile(name: string, buffer: Buffer): File {
  return {
    name,
    data: buffer,
    mimetype: 'image/svg+xml',
    size: buffer.length,
  }
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
