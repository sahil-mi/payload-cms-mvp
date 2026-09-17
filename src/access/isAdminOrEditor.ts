import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type IsAdminOrEditor = (args: AccessArgs<User>) => boolean

export const isAdminOrEditor: IsAdminOrEditor = ({ req: { user } }) => {
  if (!user) return false
  return Boolean(user.roles?.includes('admin') || user.roles?.includes('editor'))
}
