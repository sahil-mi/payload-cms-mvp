import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media, Page } from '@/payload-types'

import { lexicalHeading, lexicalParagraph, richText } from './lexical'

type AboutArgs = {
  contactPage: Page
  media: Record<string, Media>
}

export const about = ({ contactPage, media }: AboutArgs): RequiredDataFromCollectionSlug<'pages'> => {
  return {
    slug: 'about',
    title: 'About',
    _status: 'published',
    publishedAt: '2026-01-05T09:00:00.000Z',
    hero: {
      type: 'mediumImpact',
      media: media.aboutHero.id,
      richText: richText([
        lexicalHeading('h1', 'A small studio, on purpose.'),
        lexicalParagraph(
          'We stayed intentionally small so the people who pitch the work are the same people who do it.',
        ),
      ]),
    },
    layout: [
      {
        blockType: 'imageText',
        blockName: 'Our story',
        media: media.aboutStory.id,
        mediaPosition: 'left',
        eyebrow: 'Our story',
        enableLink: false,
        richText: richText([
          lexicalHeading('h2', 'Started by people tired of watching good work die in handoff'),
          lexicalParagraph(
            'Northbeam Studio was founded in 2014 by a small group of designers and engineers who kept landing on the same complaint from opposite sides of the table: agencies handed off beautiful decks that never survived engineering, and dev shops shipped functional products no one wanted to use. We built the studio to close that gap — one team, accountable for a project from strategy through the code that ships it.',
          ),
          lexicalParagraph(
            'A decade later the shape of the work has changed — more product, more systems, more data — but the founding complaint is still the operating principle: design and engineering are not two disciplines that hand off to each other. They are one discipline with two sets of tools.',
          ),
        ]),
      },
      {
        blockType: 'stats',
        blockName: 'The studio in brief',
        heading: 'The studio in brief',
        stats: [
          { value: '2014', label: 'Founded' },
          { value: '22', label: 'People on the team' },
          { value: '6', label: 'Disciplines under one roof' },
          { value: '85+', label: 'Clients since founding' },
        ],
      },
      {
        blockType: 'imageText',
        blockName: 'Culture',
        media: media.aboutCulture.id,
        mediaPosition: 'right',
        eyebrow: 'Culture',
        enableLink: false,
        richText: richText([
          lexicalHeading('h2', 'Opinionated, not precious'),
          lexicalParagraph(
            'We push back on briefs that don’t hold up, and we expect clients to push back on us. The work gets better when both sides are willing to have that argument early, instead of discovering the disagreement in a launch retro.',
          ),
          lexicalParagraph(
            'Every project is staffed by senior people. We don’t run a junior bench that learns on client work, and we don’t believe in account managers who relay information between the client and the team actually doing it.',
          ),
        ]),
      },
      {
        blockType: 'faq',
        blockName: 'About FAQ',
        heading: 'Questions we get asked often',
        items: [
          {
            question: 'How big is the team that would work on our project?',
            answer:
              'Typically three to five people: a creative or product lead, one to two designers, and one to two engineers, depending on scope. You work directly with them, not through an account manager.',
          },
          {
            question: 'Do you work with early-stage startups?',
            answer:
              'Selectively. We take on a small number of pre-seed and seed-stage engagements each year, usually where the founding team has a clear point of view we can sharpen rather than invent from scratch.',
          },
          {
            question: 'Is the team remote?',
            answer:
              'Yes, distributed across North America, with the whole studio gathering in person twice a year. Most client collaboration happens over video and async written docs.',
          },
        ],
      },
      {
        blockType: 'cta',
        blockName: 'About CTA',
        richText: richText([
          lexicalHeading('h2', 'Interested in working with us?'),
          lexicalParagraph('We take on a limited number of engagements each quarter. Tell us what you’re building.'),
        ]),
        links: [
          {
            link: {
              type: 'reference',
              appearance: 'default',
              label: 'Get in touch',
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
      title: 'About | Northbeam Studio',
      description:
        'Northbeam Studio is a small, senior design and engineering studio founded in 2014. Learn how we work and who we are.',
      image: media.aboutHero.id,
    },
  }
}
