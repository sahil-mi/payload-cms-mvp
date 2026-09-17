import type { Block } from 'payload'

export const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  admin: {
    images: {
      thumbnail: { url: '/block-previews/gallery.svg', alt: 'Gallery block preview' },
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
  ],
  labels: {
    plural: 'Galleries',
    singular: 'Gallery',
  },
}
