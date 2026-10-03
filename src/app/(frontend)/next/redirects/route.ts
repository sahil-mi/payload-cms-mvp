import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Redirect } from '@/payload-types'
import { getDocPath } from '@/utilities/getDocPath'

export type RedirectRule = { from: string; to: string }

/** Paths are compared without a trailing slash (this site's URL style). */
export const stripSlash = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path)

const destinationOf = (redirect: Redirect): string | null => {
  const to = redirect.to
  if (!to) return null
  if (to.type === 'custom') return to.url || null

  const value = to.reference?.value
  if (!to.reference || !value || typeof value !== 'object' || !('slug' in value)) return null
  return getDocPath(to.reference.relationTo, value.slug)
}

export const dynamic = 'force-dynamic'

/**
 * The redirect list for src/proxy.ts, read fresh from the database on every call (the proxy
 * keeps each result for a few seconds). Next's data cache is avoided on purpose: it survives
 * restarts while tag invalidations do not, which could send visitors to a URL that no longer
 * exists.
 */
export async function GET() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'redirects',
    depth: 1,
    limit: 0,
    pagination: false,
    overrideAccess: true,
  })

  const rules = docs
    .map((redirect) => {
      const to = destinationOf(redirect)
      return redirect.from && to ? { from: stripSlash(redirect.from), to } : null
    })
    .filter((rule): rule is RedirectRule => rule !== null)

  return Response.json({ rules })
}
