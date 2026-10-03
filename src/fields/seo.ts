import type { Field } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

type SeoFieldsOptions = {
  /** Lets editors pick the schema.org page type (Pages only — posts/projects have a fixed type). */
  schemaTypeSelect?: boolean
}

/**
 * Fields for the `meta` (SEO) tab shared by Pages, Posts and Projects.
 * The plugin fields cover title/description/image; the rest adds social
 * overrides, robots, canonical and structured data (JSON-LD).
 */
export const seoFields = ({ schemaTypeSelect = false }: SeoFieldsOptions = {}): Field[] => [
  OverviewField({
    titlePath: 'meta.title',
    descriptionPath: 'meta.description',
    imagePath: 'meta.image',
  }),
  MetaTitleField({
    hasGenerateFn: true,
  }),
  MetaImageField({
    relationTo: 'media',
  }),
  MetaDescriptionField({}),
  PreviewField({
    // if the `generateUrl` function is configured
    hasGenerateFn: true,

    // field paths to match the target field for data
    titlePath: 'meta.title',
    descriptionPath: 'meta.description',
  }),
  {
    type: 'collapsible',
    label: 'Social sharing (Open Graph)',
    admin: {
      description:
        'Overrides for link previews on social platforms. Leave blank to reuse the meta title and description. The meta image above is used as the og:image.',
      initCollapsed: true,
    },
    fields: [
      {
        name: 'ogTitle',
        type: 'text',
        label: 'Social title (og:title)',
      },
      {
        name: 'ogDescription',
        type: 'textarea',
        label: 'Social description (og:description)',
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Indexing',
    admin: {
      initCollapsed: true,
    },
    fields: [
      {
        name: 'canonicalUrl',
        type: 'text',
        label: 'Canonical URL',
        admin: {
          description:
            "Preferred URL for this content. Leave blank to use this page's own URL. Accepts an absolute URL or a path like /services.",
        },
      },
      {
        type: 'row',
        fields: [
          {
            name: 'noIndex',
            type: 'checkbox',
            label: 'Hide from search engines (noindex)',
            defaultValue: false,
          },
          {
            name: 'noFollow',
            type: 'checkbox',
            label: "Don't follow links on this page (nofollow)",
            defaultValue: false,
          },
        ],
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Structured data (JSON-LD)',
    admin: {
      description:
        'Schema.org markup is generated automatically from the content (page type, breadcrumbs, FAQs, article/author details). Use the field below only to add extra markup.',
      initCollapsed: true,
    },
    fields: [
      ...(schemaTypeSelect
        ? [
            {
              name: 'schemaType',
              type: 'select',
              label: 'Page type',
              defaultValue: 'WebPage',
              options: [
                { label: 'Web page', value: 'WebPage' },
                { label: 'About page', value: 'AboutPage' },
                { label: 'Contact page', value: 'ContactPage' },
                { label: 'Collection / listing page', value: 'CollectionPage' },
              ],
            } satisfies Field,
          ]
        : []),
      {
        name: 'jsonLd',
        type: 'json',
        label: 'Additional JSON-LD',
        admin: {
          description:
            'A schema.org object (or array of objects), e.g. { "@type": "Service", "name": "Brand strategy" }. "@context" is added automatically.',
        },
        validate: (value: unknown) => {
          if (value === null || value === undefined || value === '') return true
          const items = Array.isArray(value) ? value : [value]
          const valid = items.every(
            (item) => item && typeof item === 'object' && !Array.isArray(item) && '@type' in item,
          )
          return valid || 'Must be an object (or array of objects) with an "@type" property.'
        },
      },
    ],
  },
]
