import type {
  ArrayField,
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeChangeHook,
  CollectionBeforeValidateHook,
  Field,
  Tab,
  TextFieldSingleValidation,
} from 'payload'

import { slugField, ValidationError } from 'payload'

import { getDocPath } from '@/utilities/getDocPath'

/**
 * "URL & Redirects" for pages, made for non-technical editors: the current URL, the editable
 * URL name (slug) and a list of old URLs that should open the page.
 *
 * Old URLs are pasted in any form and normalised to a site path. When the page is published,
 * each becomes a 301 in the Redirects collection (marked with `managedKey`); removed entries
 * are deleted. Changing the slug of a published page adds its previous URL to the list.
 */

type OldUrlRow = { id?: string | null; url?: string | null }

/** Top-level paths owned by the app: a page cannot take them as its URL name. */
const RESERVED_SEGMENTS = ['admin', 'api', 'next', '_next', 'posts', 'projects', 'search']
/** Never valid as an old URL (old blog or project URLs are fine, unless still live). */
const RESERVED = /^\/(admin|api|next|_next)(\/|$)/

/**
 * Turns whatever an editor pastes into a site path, without a trailing slash (this site's
 * URL style): "https://example.com/old-page/?utm_source=x" -> "/old-page".
 * Returns null for something that is not a usable page address.
 */
export const toSitePath = (input: string | null | undefined): string | null => {
  const value = (input ?? '').trim()
  if (!value) return null

  let pathname: string
  try {
    // Any domain (live site, localhost, preview) is accepted: only the path matters
    const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(value)
      ? value
      : /^[^/\s]+\.[a-z]{2,}(:\d+)?(\/|$)/i.test(value) || /^localhost(:\d+)?(\/|$)/i.test(value)
        ? `https://${value}`
        : null
    pathname = withScheme
      ? new URL(withScheme).pathname
      : new URL(value.startsWith('/') ? value : `/${value}`, 'https://site.invalid').pathname
  } catch {
    return null
  }

  try {
    pathname = decodeURI(pathname)
  } catch {
    return null // malformed percent-encoding, e.g. "/old%E0"
  }
  pathname = pathname.replace(/\/{2,}/g, '/').replace(/\/$/, '')
  if (!pathname || /\.[a-z0-9]{2,5}$/i.test(pathname)) return null
  return pathname
}

export const managedKeyFor = (collection: string, id: number | string) => `${collection}:${id}`

const describe = (doc: { title?: string | null }, path: string) =>
  `“${doc.title ?? path}” (${path})`

/** The live (published) document at a path, if any. */
const findLiveDocAt = async (
  req: Parameters<TextFieldSingleValidation>[1]['req'],
  path: string,
  exclude?: { collection?: string; id?: number | string },
) => {
  const candidates: { collection: 'pages' | 'posts' | 'projects'; slug: string }[] = []
  if (path === '/') candidates.push({ collection: 'pages', slug: 'home' })
  const posts = /^\/(posts|projects)\/([^/]+)$/.exec(path)
  if (posts) candidates.push({ collection: posts[1] as 'posts' | 'projects', slug: posts[2]! })
  else if (/^\/[^/]+$/.test(path)) candidates.push({ collection: 'pages', slug: path.slice(1) })

  for (const { collection, slug } of candidates) {
    const { docs } = await req.payload.find({
      collection,
      depth: 0,
      limit: 1,
      overrideAccess: true,
      where: {
        and: [
          { slug: { equals: slug } },
          { _status: { equals: 'published' } },
          ...(exclude?.collection === collection && exclude.id
            ? [{ id: { not_equals: exclude.id } }]
            : []),
        ],
      },
    })
    if (docs[0]) return docs[0] as { title?: string | null }
  }
  return null
}

/**
 * Validation with messages an editor can act on. The format is checked while typing; the
 * database checks run when the page is saved.
 */
export const validateOldUrl: TextFieldSingleValidation = async (value, options) => {
  const { req, id, collectionSlug, event, data } = options
  if (!value) return 'Paste the old address, e.g. https://example.com/old-page'

  const path = toSitePath(value)
  if (!path || path === '/')
    return 'This is not a page address. Paste a link like https://example.com/old-page'
  if (RESERVED.test(path)) return `${path} is used by the website itself and cannot be an old URL.`
  if (event === 'onChange') return true

  if (path === (data as { path?: string | null })?.path) {
    return 'This is the page’s current URL, so it cannot also be an old URL.'
  }

  const live = await findLiveDocAt(req, path, { collection: collectionSlug, id })
  if (live)
    return `${path} is another live page: ${describe(live, path)}. Change that page’s URL first.`

  const ownKey = id && collectionSlug ? managedKeyFor(collectionSlug, id) : null
  const { docs } = await req.payload.find({
    collection: 'redirects',
    depth: 1,
    limit: 1,
    overrideAccess: true,
    where: { from: { in: [path, `${path}/`] } },
  })
  const existing = docs[0]
  if (existing && existing.managedKey !== ownKey) {
    const reference = existing.to?.reference
    const target =
      existing.to?.type === 'custom'
        ? existing.to.url
        : reference && typeof reference.value === 'object' && 'slug' in reference.value
          ? getDocPath(reference.relationTo, reference.value.slug)
          : 'another page'
    return `${path} already redirects to ${target}. Remove it there first.`
  }

  return true
}

export const oldUrlsField: ArrayField = {
  name: 'oldUrls',
  label: 'Old URLs that should open this page',
  type: 'array',
  labels: { singular: 'Old URL', plural: 'Old URLs' },
  admin: {
    description:
      'Paste any old link to this page (the full address is fine). After you publish, visitors and Google are sent here automatically. When you change the URL name above, the previous URL is added here for you.',
  },
  fields: [
    {
      name: 'url',
      type: 'text',
      label: 'Old URL',
      required: true,
      admin: { placeholder: 'https://example.com/old-page' },
      validate: validateOldUrl,
    },
  ],
}

/** Path of the last published version; a change to it adds the old URL to the list. */
export const lastPublishedPathField: Field = {
  name: 'lastPublishedPath',
  type: 'text',
  admin: { hidden: true },
}

export const urlRedirectsTab = (): Tab => ({
  label: 'URL & Redirects',
  fields: [
    {
      name: 'path',
      label: 'Current URL',
      type: 'text',
      index: true,
      admin: {
        readOnly: true,
        description:
          'The address of this page on the website. It changes when you publish a new URL name.',
      },
    },
    slugField({
      position: undefined,
      overrides: (row) => {
        const slug = row.fields.find((field) => 'name' in field && field.name === 'slug')
        if (slug && slug.type === 'text') {
          slug.label = 'URL name (slug)'
          slug.admin = {
            ...slug.admin,
            description:
              'The last part of the address, e.g. about-us. To change it, click Unlock, type lowercase words separated by hyphens, then publish. The old address keeps working and sends visitors here.',
          }
        }
        return row
      },
    }),
    oldUrlsField,
  ],
})

/** Normalises pasted links and drops duplicates before validation. */
export const normalizeOldUrlsHook: CollectionBeforeValidateHook = ({ data }) => {
  if (!data || !Array.isArray(data.oldUrls)) return data
  const seen = new Set<string>()
  data.oldUrls = (data.oldUrls as OldUrlRow[]).flatMap((row) => {
    const path = toSitePath(row.url)
    if (!path) return [row] // left as typed, so validation can explain the problem
    if (seen.has(path)) return []
    seen.add(path)
    return [{ ...row, url: path }]
  })
  return data
}

/**
 * Sets `path` from the slug, protects the homepage and app-owned URLs, and keeps the Old URLs
 * list in step: the previous published URL is added, the current URL removed.
 */
export const computePagePathHook: CollectionBeforeChangeHook = ({ data, originalDoc }) => {
  const slug: string | undefined = data.slug ?? originalDoc?.slug
  if (!slug) return data

  if (originalDoc?.slug === 'home' && slug !== 'home') {
    throw new ValidationError({
      errors: [{ path: 'slug', message: 'This is the homepage: its URL name must stay “home”.' }],
    })
  }
  if (RESERVED_SEGMENTS.includes(slug)) {
    throw new ValidationError({
      errors: [
        {
          path: 'slug',
          message: `“${slug}” is used by the website itself. Choose another URL name.`,
        },
      ],
    })
  }

  const path = getDocPath('pages', slug)
  data.path = path

  const previousPath = data._status === 'published' ? originalDoc?.lastPublishedPath : undefined
  const rows: OldUrlRow[] = ((data.oldUrls ?? originalDoc?.oldUrls ?? []) as OldUrlRow[]).filter(
    (row) => toSitePath(row.url) !== path,
  )
  if (
    previousPath &&
    previousPath !== path &&
    !rows.some((row) => toSitePath(row.url) === previousPath)
  ) {
    rows.push({ url: previousPath })
  }
  data.oldUrls = rows

  if (data._status === 'published') data.lastPublishedPath = path
  return data
}

/** On publish, makes the Redirects collection match the page's Old URLs. */
export const syncOldUrlsHook =
  (collection: 'pages'): CollectionAfterChangeHook =>
  async ({ doc, req, context }) => {
    if (doc._status !== 'published' || !doc.path) return doc

    const key = managedKeyFor(collection, doc.id)
    const to = { type: 'reference', reference: { relationTo: collection, value: doc.id } } as const
    const nested = { ...context }

    const wanted = new Set(
      ((doc.oldUrls ?? []) as OldUrlRow[])
        .map((row) => toSitePath(row.url))
        .filter((path): path is string => Boolean(path) && path !== doc.path),
    )

    // A redirect away from the page's own URL would now loop
    await req.payload.delete({
      collection: 'redirects',
      req,
      overrideAccess: true,
      context: nested,
      where: { from: { in: [doc.path, `${doc.path}/`] } },
    })

    const { docs: managed } = await req.payload.find({
      collection: 'redirects',
      depth: 0,
      limit: 0,
      pagination: false,
      req,
      overrideAccess: true,
      where: { managedKey: { equals: key } },
    })

    for (const redirect of managed) {
      if (!wanted.has(redirect.from)) {
        await req.payload.delete({
          collection: 'redirects',
          id: redirect.id,
          req,
          overrideAccess: true,
          context: nested,
        })
      }
    }

    const existing = new Set(managed.map((redirect) => redirect.from))
    for (const from of wanted) {
      if (existing.has(from)) continue
      await req.payload.create({
        collection: 'redirects',
        req,
        overrideAccess: true,
        context: nested,
        data: { from, to, managedKey: key },
      })
      req.payload.logger.info(`Created 301 ${from} -> ${doc.path}`)
    }

    return doc
  }

/** Deleting a page removes the redirects it managed. */
export const deleteManagedRedirectsHook =
  (collection: 'pages'): CollectionAfterDeleteHook =>
  async ({ doc, req, context }) => {
    await req.payload.delete({
      collection: 'redirects',
      req,
      overrideAccess: true,
      context: { ...context },
      where: { managedKey: { equals: managedKeyFor(collection, doc.id) } },
    })
    return doc
  }
