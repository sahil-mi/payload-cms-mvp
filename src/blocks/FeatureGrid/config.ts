import type { Block } from 'payload'

export const FeatureGrid: Block = {
  slug: 'featureGrid',
  interfaceName: 'FeatureGridBlock',
  admin: {
    images: {
      thumbnail: { url: '/block-previews/featureGrid.svg', alt: 'Feature Grid block preview' },
    },
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
    },
    {
      name: 'heading',
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
        initCollapsed: true,
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Sparkles', value: 'Sparkles' },
            { label: 'Zap', value: 'Zap' },
            { label: 'Shield', value: 'Shield' },
            { label: 'Layers', value: 'Layers' },
            { label: 'Rocket', value: 'Rocket' },
            { label: 'Target', value: 'Target' },
            { label: 'Gauge', value: 'Gauge' },
            { label: 'Palette', value: 'Palette' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Feature Grids',
    singular: 'Feature Grid',
  },
}
