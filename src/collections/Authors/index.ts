import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { isAdminOrEditor } from '../../access/isAdminOrEditor'

export const Authors: CollectionConfig = {
  slug: 'authors',
  access: {
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
    read: anyone,
    update: isAdminOrEditor,
  },
  admin: {
    defaultColumns: ['name', 'role', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      admin: {
        description: 'Job title shown alongside the author byline, e.g. "Creative Director".',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bio',
      type: 'textarea',
    },
  ],
}
