import type { Block } from 'payload'

import { link } from '@/fields/link'

export const Pricing: Block = {
  slug: 'pricing',
  interfaceName: 'PricingBlock',
  admin: {
    images: {
      thumbnail: { url: '/block-previews/pricing.svg', alt: 'Pricing block preview' },
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'tiers',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
          required: true,
        },
        {
          name: 'interval',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'features',
          type: 'array',
          admin: {
            initCollapsed: false,
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
        },
        link({ appearances: ['default', 'outline'] }),
      ],
    },
  ],
  labels: {
    plural: 'Pricing Tables',
    singular: 'Pricing',
  },
}
