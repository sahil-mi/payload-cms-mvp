import type { Category, FAQBlock, Media, Page, Post, Project, SiteSetting } from '../payload-types'

import { getDocPath } from './getDocPath'
import { getImageURL } from './generateMeta'
import { getServerSideURL } from './getURL'

/**
 * Builders for schema.org JSON-LD. Entities reference each other by `@id`
 * (`<site>/#organization`, `<page url>#webpage`, …) so search engines can join
 * the site-wide graph from the root layout with each page's own graph.
 */

type Thing = Record<string, unknown>

const absoluteURL = (path: string) => `${getServerSideURL()}${path === '/' ? '' : path}`

const ids = {
  organization: () => `${getServerSideURL()}/#organization`,
  website: () => `${getServerSideURL()}/#website`,
  webpage: (url: string) => `${url}#webpage`,
  breadcrumb: (url: string) => `${url}#breadcrumb`,
}

const mediaURL = (image?: number | Media | null) =>
  image && typeof image === 'object' ? getImageURL(image) : undefined

const customJsonLd = (meta?: { jsonLd?: unknown } | null): Thing[] => {
  const value = meta?.jsonLd
  if (!value || typeof value !== 'object') return []

  return (Array.isArray(value) ? value : [value]).filter(
    (item): item is Thing => Boolean(item) && typeof item === 'object' && !Array.isArray(item),
  )
}

const breadcrumbList = (url: string, trail: { name: string; path: string }[]): Thing => ({
  '@type': 'BreadcrumbList',
  '@id': ids.breadcrumb(url),
  itemListElement: trail.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: absoluteURL(crumb.path),
  })),
})

const webPage = (args: {
  type?: string
  url: string
  name: string
  description?: string | null
  image?: string
  datePublished?: string | null
  dateModified?: string | null
}): Thing => ({
  '@type': args.type || 'WebPage',
  '@id': ids.webpage(args.url),
  url: args.url,
  name: args.name,
  description: args.description || undefined,
  isPartOf: { '@id': ids.website() },
  primaryImageOfPage: args.image ? { '@type': 'ImageObject', url: args.image } : undefined,
  datePublished: args.datePublished || undefined,
  dateModified: args.dateModified || undefined,
  breadcrumb: { '@id': ids.breadcrumb(args.url) },
  inLanguage: 'en',
})

export const siteJsonLd = (settings?: Partial<SiteSetting> | null): Thing[] => {
  const url = getServerSideURL()
  const name = settings?.siteName || 'Northbeam Studio'
  const logo = settings?.logo && typeof settings.logo === 'object' ? settings.logo.url : null

  return [
    {
      '@type': 'Organization',
      '@id': ids.organization(),
      name,
      url,
      description: settings?.siteDescription || undefined,
      logo: logo
        ? { '@type': 'ImageObject', url: logo.startsWith('http') ? logo : `${url}${logo}` }
        : undefined,
    },
    {
      '@type': 'WebSite',
      '@id': ids.website(),
      name,
      url,
      description: settings?.siteDescription || undefined,
      publisher: { '@id': ids.organization() },
      inLanguage: 'en',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${url}/search?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
  ]
}

export const pageJsonLd = (page: Partial<Page>): Thing[] => {
  const path = getDocPath('pages', page.slug)
  const url = absoluteURL(path)
  const name = page.title || page.meta?.title || ''
  const isHome = path === '/'

  // Nested-docs breadcrumbs include the page itself; fall back to just this page
  const trail = [
    { name: 'Home', path: '/' },
    ...(isHome
      ? []
      : page.breadcrumbs?.length
        ? page.breadcrumbs.map((crumb) => ({
            name: crumb.label || '',
            path: getDocPath('pages', crumb.url?.split('/').pop()),
          }))
        : [{ name, path }]),
  ]

  const faqs = (page.layout || [])
    .filter((block): block is FAQBlock => block.blockType === 'faq')
    .flatMap((block) => block.items || [])

  return [
    webPage({
      type: page.meta?.schemaType || undefined,
      url,
      name: page.meta?.title || name,
      description: page.meta?.description,
      image: mediaURL(page.meta?.image),
      datePublished: page.publishedAt,
      dateModified: page.updatedAt,
    }),
    breadcrumbList(url, trail),
    ...(faqs.length
      ? [
          {
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            isPartOf: { '@id': ids.webpage(url) },
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          },
        ]
      : []),
    ...customJsonLd(page.meta),
  ]
}

export const postJsonLd = (post: Partial<Post>): Thing[] => {
  const path = getDocPath('posts', post.slug)
  const url = absoluteURL(path)
  const image = mediaURL(post.meta?.image) || mediaURL(post.heroImage)

  const authors = (post.authors || [])
    .filter((author) => typeof author === 'object')
    .map((author) => ({
      '@type': 'Person',
      name: author.name,
      jobTitle: author.role || undefined,
      image: mediaURL(author.avatar),
    }))

  const categories = (post.categories || [])
    .filter((category): category is Category => typeof category === 'object')
    .map((category) => category.title)

  return [
    webPage({
      url,
      name: post.meta?.title || post.title || '',
      description: post.meta?.description,
      image,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
    }),
    breadcrumbList(url, [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/posts' },
      { name: post.title || '', path },
    ]),
    {
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: post.title,
      description: post.meta?.description || undefined,
      image,
      datePublished: post.publishedAt || undefined,
      dateModified: post.updatedAt || undefined,
      author: authors.length ? authors : { '@id': ids.organization() },
      publisher: { '@id': ids.organization() },
      mainEntityOfPage: { '@id': ids.webpage(url) },
      articleSection: categories.length ? categories : undefined,
      inLanguage: 'en',
    },
    ...customJsonLd(post.meta),
  ]
}

export const projectJsonLd = (project: Partial<Project>): Thing[] => {
  const path = getDocPath('projects', project.slug)
  const url = absoluteURL(path)
  const image = mediaURL(project.meta?.image) || mediaURL(project.coverImage)

  const services = (project.services || [])
    .filter((service): service is Category => typeof service === 'object')
    .map((service) => service.title)

  return [
    webPage({
      type: 'ItemPage',
      url,
      name: project.meta?.title || project.title || '',
      description: project.meta?.description,
      image,
      datePublished: project.publishedAt,
      dateModified: project.updatedAt,
    }),
    breadcrumbList(url, [
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: project.title || '', path },
    ]),
    {
      '@type': 'CreativeWork',
      '@id': `${url}#project`,
      name: project.title,
      description: project.meta?.description || undefined,
      image,
      dateCreated: project.year || undefined,
      creator: { '@id': ids.organization() },
      sponsor: project.client ? { '@type': 'Organization', name: project.client } : undefined,
      keywords: services.length ? services.join(', ') : undefined,
      mainEntityOfPage: { '@id': ids.webpage(url) },
    },
    ...customJsonLd(project.meta),
  ]
}
