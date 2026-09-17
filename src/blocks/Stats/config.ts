import type { Block } from 'payload'

export const Stats: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  admin: {
    images: {
      thumbnail: { url: '/block-previews/stats.svg', alt: 'Stats block preview' },
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Stats',
    singular: 'Stats',
  },
}
