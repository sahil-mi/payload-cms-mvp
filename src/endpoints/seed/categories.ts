// Categories double as Posts categories and Projects "services" — both collections
// relate to the same `categories` collection.

export const categoryTitles = [
  'Product Design',
  'Brand Identity',
  'Web Engineering',
  'Growth & Strategy',
  'Motion & Animation',
  'AI & Data',
] as const

export type CategoryTitle = (typeof categoryTitles)[number]

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
