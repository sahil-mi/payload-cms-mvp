import type { Block } from 'payload'

export const HtmlEmbed: Block = {
  slug: 'htmlEmbed',
  interfaceName: 'HtmlEmbedBlock',
  admin: {
    images: {
      thumbnail: { url: '/block-previews/htmlEmbed.svg', alt: 'HTML embed block preview' },
    },
  },
  fields: [
    {
      name: 'html',
      type: 'code',
      label: 'HTML',
      required: true,
      admin: {
        language: 'html',
        description:
          'Embed code from a third-party service (video, map, calendar, form, widget). It is added to the page as-is, including any <script> tags, so only paste code from sources you trust.',
      },
    },
    {
      name: 'width',
      type: 'select',
      defaultValue: 'container',
      required: true,
      options: [
        { label: 'Content width', value: 'container' },
        { label: 'Narrow', value: 'narrow' },
        { label: 'Full width', value: 'full' },
      ],
    },
  ],
  labels: {
    plural: 'HTML Embeds',
    singular: 'HTML Embed',
  },
}
