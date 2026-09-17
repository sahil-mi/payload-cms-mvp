import type { Block } from 'payload'

export const Spacer: Block = {
  slug: 'spacer',
  interfaceName: 'SpacerBlock',
  admin: {
    images: {
      thumbnail: { url: '/block-previews/spacer.svg', alt: 'Spacer block preview' },
    },
  },
  fields: [
    {
      name: 'size',
      type: 'select',
      required: true,
      defaultValue: 'md',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
    },
  ],
  labels: {
    plural: 'Spacers',
    singular: 'Spacer',
  },
}
