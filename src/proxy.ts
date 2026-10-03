import { NextResponse, type NextRequest } from 'next/server'

import type { RedirectRule } from '@/app/(frontend)/next/redirects/route'

// Keep the redirect list for a few seconds per server instead of fetching it on every request.
// A redirect added in the admin therefore takes up to this long to apply.
const MAP_TTL_MS = 10_000
let cached: { rules: RedirectRule[]; expires: number } | null = null
// Shared by concurrent requests so a cold instance fetches the list once, not once per request
let inFlight: Promise<RedirectRule[] | null> | null = null

const stripSlash = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path)

const fetchRules = async (origin: string): Promise<RedirectRule[] | null> => {
  try {
    const headers: HeadersInit = {}
    // Vercel preview deployments with Deployment Protection reject this request unless it
    // carries the automation bypass secret (Project Settings → Deployment Protection)
    if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
      headers['x-vercel-protection-bypass'] = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
    }
    const res = await fetch(`${origin}/next/redirects`, { headers, cache: 'no-store' })
    if (!res.ok) return cached?.rules ?? null
    const { rules } = (await res.json()) as { rules: RedirectRule[] }
    cached = { rules, expires: Date.now() + MAP_TTL_MS }
    return rules
  } catch {
    return cached?.rules ?? null
  }
}

const loadRules = (origin: string): Promise<RedirectRule[] | null> => {
  if (cached && cached.expires > Date.now()) return Promise.resolve(cached.rules)
  inFlight ??= fetchRules(origin).finally(() => {
    inFlight = null
  })
  return inFlight
}

/** Old URLs are stored decoded ("/über-uns"); the request path is percent-encoded. */
const decodePath = (path: string) => {
  try {
    return decodeURI(path)
  } catch {
    return path
  }
}

/**
 * Old URLs from Payload's Redirects collection (including those managed from a page's
 * "URL & Redirects" tab) answered with a permanent 301 before any page renders, at any depth.
 * If the list cannot be loaded, the request continues and PayloadRedirects still applies.
 */
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const rules = await loadRules(request.nextUrl.origin)
  const path = stripSlash(pathname)
  const decoded = decodePath(path)
  const hit = rules?.find((rule) => rule.from === decoded)

  if (hit && stripSlash(hit.to) !== decoded) {
    const url = new URL(hit.to, request.nextUrl.origin)
    if (!url.search && search) url.search = search
    return NextResponse.redirect(url, 301)
  }

  // URLs have no trailing slash. Next's own slash redirect is switched off
  // (skipTrailingSlashRedirect) so that an old URL with a slash takes one hop, not two.
  if (path !== pathname) {
    return NextResponse.redirect(new URL(`${path}${search}`, request.nextUrl.origin), 308)
  }

  return NextResponse.next()
}

export const config = {
  // Frontend pages only: skip Payload admin/API, Next internals, preview routes and files
  matcher: ['/((?!(?:admin|api|_next|next)(?:/|$)|.*\\..*).*)'],
}
