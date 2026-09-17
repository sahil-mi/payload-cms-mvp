import type { GlobalConfig } from 'payload'

import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
    },
    {
      name: 'siteDescription',
      type: 'textarea',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'defaultOgImage',
      type: 'upload',
      admin: {
        description: 'Used as the fallback Open Graph image when a page/post has none set.',
      },
      relationTo: 'media',
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}
