import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Form } from '@/payload-types'

import { lexicalHeading, lexicalParagraph, richText } from './lexical'

type ContactArgs = {
  contactForm: Form
}

export const contact = ({ contactForm }: ContactArgs): RequiredDataFromCollectionSlug<'pages'> => {
  return {
    slug: 'contact',
    title: 'Contact',
    _status: 'published',
    publishedAt: '2026-01-05T09:00:00.000Z',
    hero: {
      type: 'lowImpact',
      richText: richText([
        lexicalHeading('h1', "Let's talk"),
        lexicalParagraph(
          'Tell us about the project. We reply to every inquiry personally, usually within one business day.',
        ),
      ]),
    },
    layout: [
      {
        blockType: 'formBlock',
        blockName: 'Contact form',
        form: contactForm.id,
        enableIntro: true,
        introContent: richText([
          lexicalHeading('h3', 'Start a project'),
          lexicalParagraph(
            'Share a few details and the right person on our team will follow up directly — no account manager in between.',
          ),
        ]),
      },
      {
        blockType: 'content',
        blockName: 'Office details',
        columns: [
          {
            size: 'half',
            enableLink: false,
            richText: richText([
              lexicalHeading('h3', 'Studio'),
              lexicalParagraph('148 Alder Street, Suite 400'),
              lexicalParagraph('Portland, OR 97209'),
            ]),
          },
          {
            size: 'half',
            enableLink: false,
            richText: richText([
              lexicalHeading('h3', 'Prefer email?'),
              lexicalParagraph('hello@northbeamstudio.com'),
              lexicalParagraph('For press inquiries: press@northbeamstudio.com'),
            ]),
          },
        ],
      },
    ],
    meta: {
      title: 'Contact | Northbeam Studio',
      description: 'Start a project with Northbeam Studio. Tell us what you’re building and we’ll follow up within one business day.',
    },
  }
}
