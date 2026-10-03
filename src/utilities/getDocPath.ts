export type SeoCollection = 'pages' | 'posts' | 'projects'

/** Public path of a document on the frontend, e.g. `/`, `/about`, `/posts/my-post`. */
export const getDocPath = (collection: SeoCollection, slug?: string | null): string => {
  if (collection === 'pages') return !slug || slug === 'home' ? '/' : `/${slug}`

  return slug ? `/${collection}/${slug}` : `/${collection}`
}
