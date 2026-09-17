import type { Block } from 'payload'

export const LogoCloud: Block = {
  slug: 'logoCloud',
  interfaceName: 'LogoCloudBlock',
  admin: {
    images: {
      thumbnail: { url: '/block-previews/logoCloud.svg', alt: 'Logo Cloud block preview' },
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'logos',
      type: 'array',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Logo Clouds',
    singular: 'Logo Cloud',
  },
}
