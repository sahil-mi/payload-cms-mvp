import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media, Page } from '@/payload-types'

import { lexicalHeading, lexicalParagraph, richText } from './lexical'
import { fictionalClients } from './logos'

type HomeArgs = {
  contactPage: Page
  logoDocs: Media[]
  media: Record<string, Media>
}

export const home = ({ contactPage, logoDocs, media }: HomeArgs): RequiredDataFromCollectionSlug<'pages'> => {
  return {
    slug: 'home',
    title: 'Home',
    _status: 'published',
    publishedAt: '2026-01-05T09:00:00.000Z',
    hero: {
      type: 'highImpact',
      media: media.homeHero.id,
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: 'See our work',
            url: '/projects',
          },
        },
        {
          link: {
            type: 'reference',
            appearance: 'outline',
            label: 'Start a project',
            reference: {
              relationTo: 'pages',
              value: contactPage.id,
            },
          },
        },
      ],
      richText: richText([
        lexicalHeading('h1', 'We build brands and products that hold up under scrutiny.'),
        lexicalParagraph(
          'Northbeam Studio is a design and engineering studio for ambitious companies. We build brand systems, digital products, and the sites that carry them — precise, considered, and built to last past launch day.',
        ),
      ]),
    },
    layout: [
      {
        blockType: 'stats',
        blockName: 'Company stats',
        heading: 'Northbeam by the numbers',
        stats: [
          { value: '12', label: 'Years in business' },
          { value: '85+', label: 'Clients served' },
          { value: '9.4', label: 'Average client NPS' },
          { value: '140+', label: 'Projects shipped' },
        ],
      },
      {
        blockType: 'projectGrid',
        blockName: 'Featured work',
        populateBy: 'collection',
        relationTo: 'projects',
        limit: 3,
        introContent: richText([
          lexicalHeading('h2', 'Featured work'),
          lexicalParagraph(
            'A small sample of the brands, products, and platforms we have shipped recently.',
          ),
        ]),
      },
      {
        blockType: 'featureGrid',
        blockName: 'What we do',
        eyebrow: 'What we do',
        heading: 'Four disciplines, one team',
        description:
          'We don’t hand you off between departments. The same core team carries a project from strategy through launch.',
        features: [
          {
            icon: 'Palette',
            title: 'Brand Identity',
            description: 'Visual and verbal systems built to survive contact with a real organization.',
          },
          {
            icon: 'Layers',
            title: 'Product Design',
            description: 'Interfaces designed around how people actually decide, not how org charts are drawn.',
          },
          {
            icon: 'Zap',
            title: 'Web Engineering',
            description: 'Fast, maintainable builds on modern stacks, handed off with documentation that holds up.',
          },
          {
            icon: 'Target',
            title: 'Growth & Strategy',
            description: 'Positioning and go-to-market work grounded in real usage data, not guesswork.',
          },
        ],
      },
      {
        blockType: 'imageText',
        blockName: 'How we work',
        media: media.homeHowWeWork.id,
        mediaPosition: 'right',
        eyebrow: 'How we work',
        enableLink: false,
        richText: richText([
          lexicalHeading('h2', 'We embed, not consult.'),
          lexicalParagraph(
            'Every engagement starts with time inside your actual workflow — in the support queue, on sales calls, in the codebase — before a single pixel moves. We’d rather spend week one understanding the problem than showing you a mood board that misses it.',
          ),
          lexicalParagraph(
            'Small senior team, direct access to the people doing the work, no account-management layer between you and the decisions being made.',
          ),
        ]),
      },
      {
        blockType: 'testimonials',
        blockName: 'What clients say',
        heading: 'What clients say',
        testimonials: [
          {
            quote:
              'Northbeam rebuilt our brand and our sales deck stopped needing a five-minute credibility preamble. That alone changed our close rate.',
            name: 'Dana Okafor',
            role: 'VP of Sales, Meridian Robotics',
            avatar: media.avatarClient1.id,
          },
          {
            quote:
              'They shortened our support queue by redesigning a single flow. Most agencies would have redesigned everything and fixed nothing.',
            name: 'Marcus Webb',
            role: 'Head of Product, Palisade Health',
            avatar: media.avatarClient2.id,
          },
          {
            quote:
              'The team pushed back on our first brief in the best possible way. What we ended up building was the thing we actually needed.',
            name: 'Elena Cho',
            role: 'CMO, Vesper & Co',
            avatar: media.avatarClient3.id,
          },
          {
            quote:
              'Six weeks ahead of a fundraise with a site that made LPs assume we were three years further along than we were.',
            name: 'Grant Ashford',
            role: 'Managing Partner, Tidewater Capital',
            avatar: media.avatarClient4.id,
          },
        ],
      },
      {
        blockType: 'logoCloud',
        blockName: 'Trusted by',
        heading: 'Trusted by teams at',
        logos: fictionalClients.map((name, i) => ({
          logo: logoDocs[i].id,
          name,
        })),
      },
      {
        blockType: 'archive',
        blockName: 'From the blog',
        populateBy: 'collection',
        relationTo: 'posts',
        limit: 3,
        categories: [],
        introContent: richText([
          lexicalHeading('h2', 'From the blog'),
          lexicalParagraph('Notes on design, engineering, and running a studio, written by the people doing the work.'),
        ]),
      },
      {
        blockType: 'cta',
        blockName: 'Closing CTA',
        richText: richText([
          lexicalHeading('h2', 'Let’s build something worth talking about.'),
          lexicalParagraph(
            'Tell us what you’re working on. We’ll tell you honestly whether we’re the right studio for it.',
          ),
        ]),
        links: [
          {
            link: {
              type: 'reference',
              appearance: 'default',
              label: 'Start a project',
              reference: {
                relationTo: 'pages',
                value: contactPage.id,
              },
            },
          },
        ],
      },
    ],
    meta: {
      title: 'Northbeam Studio — Design & Engineering Studio',
      description:
        'Northbeam Studio builds brand systems and digital products for ambitious companies. See our recent work.',
      image: media.homeHero.id,
    },
  }
}
