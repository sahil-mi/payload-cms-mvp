import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateRedirects: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc

  payload.logger.info(`Revalidating redirects`)

  revalidateTag('redirects', 'max')

  return doc
}

export const revalidateRedirectsOnDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { context },
}) => {
  if (context.disableRevalidate) return doc

  revalidateTag('redirects', 'max')

  return doc
}
