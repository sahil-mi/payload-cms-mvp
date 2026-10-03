import type { Metadata } from 'next'

import type { Media, Page, Post, Project, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { getDocPath, type SeoCollection } from './getDocPath'

export const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  collection: SeoCollection
  doc: Partial<Page> | Partial<Post> | Partial<Project> | null
}): Promise<Metadata> => {
  const { collection, doc } = args
  const meta = doc?.meta

  const ogImage = getImageURL(meta?.image)

  // `doc.meta.title` is already the final, complete title (either hand-authored or
  // generated via the SEO plugin's `generateTitle`, which already appends the site name)
  const title = meta?.title || 'Northbeam Studio'
  const description = meta?.description || undefined
  const ogTitle = meta?.ogTitle || title
  const ogDescription = meta?.ogDescription || description

  const path = getDocPath(collection, doc?.slug)
  // Relative canonicals are resolved against `metadataBase` set in the root layout.
  // No doc (unknown slug → 404): emit no canonical rather than pointing at the homepage.
  const canonical = meta?.canonicalUrl || (doc ? path : undefined)

  return {
    alternates: {
      canonical,
    },
    description,
    openGraph: mergeOpenGraph({
      description: ogDescription || '',
      images: [{ url: ogImage }],
      title: ogTitle,
      url: path,
      ...(collection === 'posts'
        ? {
            type: 'article',
            publishedTime: doc?.publishedAt || undefined,
            modifiedTime: doc?.updatedAt || undefined,
          }
        : {}),
    }),
    robots: {
      index: !meta?.noIndex,
      follow: !meta?.noFollow,
    },
    title,
    twitter: {
      card: 'summary_large_image',
      description: ogDescription,
      images: [ogImage],
      title: ogTitle,
    },
  }
}
