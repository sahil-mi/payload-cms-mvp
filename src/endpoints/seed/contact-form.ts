import type { RequiredDataFromCollectionSlug } from 'payload'

import { lexicalHeading, lexicalParagraph, richText } from './lexical'

export const contactForm: RequiredDataFromCollectionSlug<'forms'> = {
  title: 'Project Inquiry',
  confirmationType: 'message',
  confirmationMessage: richText([
    lexicalHeading('h2', 'Thanks — we got it.'),
    lexicalParagraph(
      "A member of our team will follow up within one business day. If your timeline is urgent, mention it in your message and we'll prioritize accordingly.",
    ),
  ]),
  fields: [
    {
      name: 'full-name',
      blockName: 'full-name',
      blockType: 'text',
      label: 'Full Name',
      required: true,
      width: 50,
    },
    {
      name: 'company',
      blockName: 'company',
      blockType: 'text',
      label: 'Company',
      required: false,
      width: 50,
    },
    {
      name: 'email',
      blockName: 'email',
      blockType: 'email',
      label: 'Email',
      required: true,
      width: 50,
    },
    {
      name: 'budget',
      blockName: 'budget',
      blockType: 'select',
      label: 'Estimated Budget',
      required: false,
      width: 50,
      options: [
        { label: 'Under $25k', value: 'under-25k' },
        { label: '$25k – $75k', value: '25k-75k' },
        { label: '$75k – $150k', value: '75k-150k' },
        { label: '$150k+', value: '150k-plus' },
      ],
    },
    {
      name: 'message',
      blockName: 'message',
      blockType: 'textarea',
      label: 'Tell us about the project',
      required: true,
      width: 100,
    },
  ],
  submitButtonLabel: 'Send inquiry',
  emails: [
    {
      emailFrom: '"Northbeam Studio" <hello@northbeamstudio.com>',
      emailTo: '{{email}}',
      subject: 'We received your project inquiry',
      message: richText([
        lexicalParagraph(
          'Thanks for reaching out to Northbeam Studio. Your project inquiry was received and a member of our team will be in touch within one business day.',
        ),
      ]),
    },
  ],
}
